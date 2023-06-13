import { ProductCategory } from "@/constants";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Divider from "@mui/material/Divider";
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

const SearchBar = ({ search, category, onSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState<ProductCategory | string>("");

  useEffect(() => {
    if (search) setSearchValue(search);
    if (category) setCategoryValue(category);
  }, [category, search]);

  return (
    <Paper className="shadow" sx={{ display: "flex", p: 2, borderRadius: 50, maxWidth: 470, height: 64 }}>
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
    </Paper>
  );
};

export default SearchBar;
