import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  boxShadow: "none",
  marginRight: "20px",
  textTransform: "none",
  fontSize: 16,
  fontWeight: 500,
  padding: "6px 12px",
  "&:hover": {
    backgroundColor: theme.palette.success,
  },
}));
export default StyledButton;
