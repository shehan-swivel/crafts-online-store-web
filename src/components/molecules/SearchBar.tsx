import { ProductCategory } from "@/constants";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import RoundedButton from "../atoms/RoundedButton";

type SearchBarProps = {
  search?: string;
  category?: ProductCategory;
  onSearch: (searchValue: string, category: string) => void;
};

const SearchBarWrapper = styled(Paper)({
  display: "flex",
  padding: 16,
  margin: "4px 12px",
  borderRadius: 50,
  maxWidth: 470,
  height: 64,
});

const SearchBar = ({ search, category, onSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState<ProductCategory | string>("");

  useEffect(() => {
    if (search) setSearchValue(search);
    if (category) setCategoryValue(category);
  }, [category, search]);

  return (
    <SearchBarWrapper className="shadow">
      <InputBase
        startAdornment={
          <InputAdornment position="start">
            <SearchTwoToneIcon />
          </InputAdornment>
        }
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

      <Select
        value={categoryValue}
        variant="standard"
        disableUnderline
        displayEmpty
        sx={{ textTransform: "capitalize" }}
        renderValue={(value) => (value !== "" ? value.toLowerCase() : "Category")}
        onChange={(e) => setCategoryValue(e.target.value)}
        aria-label="category"
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {Object.entries(ProductCategory).map(([key, value]) => (
          <MenuItem key={value} value={value} sx={{ textTransform: "capitalize" }}>
            {value.toLowerCase()}
          </MenuItem>
        ))}
      </Select>

      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

      <RoundedButton
        variant="contained"
        disableElevation
        onClick={() => onSearch(searchValue, categoryValue)}
      >
        Search
      </RoundedButton>
    </SearchBarWrapper>
  );
};

export default SearchBar;
