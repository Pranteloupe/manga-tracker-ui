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
  IconButton,
  Divider,
  Dialog,
} from "@mui/material";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  ManageSearch,
} from "@mui/icons-material";
import axios from "axios";
import type { Manga, MangaSearch } from "./types/MangaSearch.ts";
import MangaCard from "./components/MangaCard";
import {
  SearchButton,
  SearchContainer,
  StyledInputBase,
} from "./styles/SearchStyles";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

interface SignInDialogProps {
  open: boolean;
  handleClose: () => void;
}

const SignInDialog = ({ open, handleClose }: SignInDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { width: "500px" } }}
    >
      <SignIn />
    </Dialog>
  );
};

const SignUpDialog = ({ open, handleClose }: SignInDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { width: "500px" } }}
    >
      <SignUp handleClose={handleClose} />
    </Dialog>
  );
};

export default function App() {
  const theme = useTheme();
  const [data, setData] = useState<MangaSearch | null>(null);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);

  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  const handleOpenSignUp = () => {
    axios.get("https://api.jikan.moe/v4/manga").then((response) => {
      setData(response.data);
    });
    setOpenSignUp(true);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  const handleSearch = () => {
    axios
      .get("https://api.jikan.moe/v4/manga?q=" + searchValue)
      .then((response) => {
        setData(response.data);
      });
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/manga").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
        {/* Navigation */}
        <AppBar
          position="static"
          elevation={0}
          sx={{ bgcolor: "white", color: "text.primary" }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                color: theme.palette.primary.main,
              }}
            >
              MangaTracker
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                sx={{ ml: 2 }}
                onClick={handleOpenSignIn}
              >
                Login
              </Button>
              <Button color="inherit" onClick={handleOpenSignUp}>
                Sign up
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <SignInDialog open={openSignIn} handleClose={handleCloseSignIn} />
        <SignUpDialog open={openSignUp} handleClose={handleCloseSignUp} />

        {/* Search Bar */}
        <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", p: 3 }}>
          <SearchContainer className={isFocused ? "focused" : ""}>
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>

            <StyledInputBase
              placeholder="Search anything..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              inputProps={{ "aria-label": "search" }}
            />

            {searchValue && (
              <IconButton
                onClick={clearSearch}
                sx={{ p: "10px" }}
                aria-label="clear search"
              >
                <ClearIcon />
              </IconButton>
            )}

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <IconButton sx={{ p: "10px" }} aria-label="filter">
              <FilterIcon />
            </IconButton>

            <SearchButton onClick={handleSearch} aria-label="search">
              <SearchIcon />
            </SearchButton>
          </SearchContainer>
        </Box>

        {/* Hero Section
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            py: { xs: 8, md: 12 },
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant={"h2"}
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              Build Something Amazing
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}
            >
              Transform your ideas into reality with our cutting-edge solutions
              and expert guidance
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "white",
                  color: theme.palette.primary.main,
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Container>
        </Box> */}

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