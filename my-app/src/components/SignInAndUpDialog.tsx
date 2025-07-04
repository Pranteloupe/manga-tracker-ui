import { Dialog } from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface SignInDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const SignInDialog = ({ open, handleClose }: SignInDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { width: "500px" } }}
    >
      <SignIn handleCloseDialog={handleClose} />
    </Dialog>
  );
};

export const SignUpDialog = ({ open, handleClose }: SignInDialogProps) => {
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
