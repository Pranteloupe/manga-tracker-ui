import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ForgotPassword from "./ForgotPassword";
import { GoogleIcon, FacebookIcon } from "./CustomIcons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Card } from "../styles/CardStyles";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

export default function SignIn({
  handleCloseDialog,
}: {
  handleCloseDialog: () => void;
}) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email") as string;
    const password = data.get("password") as string;
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

    handleCloseDialog();
    navigate("/");
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Sign in
        </Button>
        <Link
          component="button"
          type="button"
          onClick={handleClickOpen}
          variant="body2"
          sx={{ alignSelf: "center" }}
        >
          Forgot your password?
        </Link>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Google")}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Facebook")}
          startIcon={<FacebookIcon />}
        >
          Sign in with Facebook
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <Link
            href="/material-ui/getting-started/templates/sign-in/"
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}
