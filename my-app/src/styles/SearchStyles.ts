import { IconButton, InputBase, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: 600,
  borderRadius: theme.spacing(3),
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  "&.focused": {
    boxShadow: "0 4px 20px rgba(25,118,210,0.3)",
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: "1rem",
    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 0.7,
    },
  },
}));

export const SearchButton = styled(IconButton)(({ theme }) => ({
  padding: 10,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginLeft: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "scale(1.05)",
  },
  transition: "all 0.2s ease-in-out",
}));