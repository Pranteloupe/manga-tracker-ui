import { AppBar, Box, Button, Theme, Toolbar, Typography } from "@mui/material";

interface AppHeaderProps {
  theme: Theme;
  user: string | null;
  username: string | null;
  handleOpenSignIn: () => void;
  handleOpenSignUp: () => void;
  handleLogOut: () => void;
}

export default function AppHeader({
  theme,
  user,
  username,
  handleOpenSignIn,
  handleOpenSignUp,
  handleLogOut,
}: AppHeaderProps) {
  return (
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
        {user ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography sx={{ alignContent: "center" }}>
              Welcome {username}!
            </Typography>
            <Button variant="contained" sx={{ ml: 2 }} onClick={handleLogOut}>
              Log Out
            </Button>
          </Box>
        ) : (
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
        )}
      </Toolbar>
    </AppBar>
  );
}
