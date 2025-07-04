import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  useTheme,
  Fab,
  ThemeProvider,
  Grid,
  Dialog,
} from "@mui/material";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";
import axios from "axios";
import type { Manga, MangaSearch } from "../types/MangaSearch.ts";
import MangaCard from "../components/MangaCard";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import SearchBar from "../components/SearchBar.js";
import AppHeader from "../components/AppHeader.js";
import { SignInDialog, SignUpDialog } from "../components/SignInAndUpDialog.js";

export default function Home() {
  const theme = useTheme();
  const [data, setData] = useState<MangaSearch | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);

  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  const handleLogOut = () => {
    signOut(auth);
    setUser(null);
    setUsername(null);
  };

  const handleSearch = (searchValue: string) => {
    axios
      .get("https://api.jikan.moe/v4/manga?q=" + searchValue)
      .then((response) => {
        setData(response.data);
      });
  };

  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/manga").then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(uid);
        setUsername(user.displayName);
        console.log("logged in");
        // ...
      } else {
        // User is signed out
        console.log("logged out");
        // ...
      }
    });
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
        <AppHeader
          theme={theme}
          user={user}
          username={username}
          handleLogOut={handleLogOut}
          handleOpenSignIn={handleOpenSignIn}
          handleOpenSignUp={handleOpenSignUp}
        />

        <SignInDialog open={openSignIn} handleClose={handleCloseSignIn} />
        <SignUpDialog open={openSignUp} handleClose={handleCloseSignUp} />

        <SearchBar handleSearch={handleSearch} />

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ mb: 4, fontWeight: 600 }}
          >
            Popular Manga
          </Typography>

          <Grid container spacing={3}>
            {data ? (
              data.data.map((manga: Manga) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={manga.mal_id}>
                  <MangaCard manga={manga} />
                </Grid>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            bgcolor: "grey.900",
            color: "white",
            py: 4,
            textAlign: "center",
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © 2025 YourBrand. All rights reserved.
            </Typography>
          </Container>
        </Box>

        {/* Scroll to Top Button */}
        <Fab
          color="primary"
          size="small"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            opacity: 0.8,
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </ThemeProvider>
  );
}
