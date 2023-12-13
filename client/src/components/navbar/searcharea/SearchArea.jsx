
import { styled, alpha } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";


const CustomSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "24px",
  color: "initial",
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: "#e6e6e6",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("xl")]: {
      width: "88ch",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      width: "64ch",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "25ch",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "30ch",
    },
    [theme.breakpoints.down("sm")]: {
      width: "25ch",
    },
  },
}));
function SearchArea() {

  return (
    <CustomSearch>
      <SearchIconWrapper>
        <Search />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search for friend, post or video"
        inputProps={{ "aria-label": "search" }}
      />
    </CustomSearch>
  );
}

export default SearchArea;
