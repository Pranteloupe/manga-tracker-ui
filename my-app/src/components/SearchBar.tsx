import { Box, Divider, IconButton } from "@mui/material";
import {
  SearchButton,
  SearchContainer,
  StyledInputBase,
} from "../styles/SearchStyles";
import { useState } from "react";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  ManageSearch,
} from "@mui/icons-material";

interface SearchBarProps {
  handleSearch: (searchValue: string) => void;
}

export default function SearchBar({ handleSearch }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSearch(searchValue);
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
  return (
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

        <SearchButton
          onClick={() => handleSearch(searchValue)}
          aria-label="search"
        >
          <SearchIcon />
        </SearchButton>
      </SearchContainer>
    </Box>
  );
}
