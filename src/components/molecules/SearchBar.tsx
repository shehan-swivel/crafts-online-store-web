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
  value?: string;
  onSearch: (searchValue: string, category: string) => void;
};

const SearchBar = ({ value = "", onSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setSearchValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        value={category}
        variant="standard"
        disableUnderline
        displayEmpty
        renderValue={(value) => (value !== "" ? value : "Category")}
        onChange={(e) => setCategory(e.target.value)}
      >
        <MenuItem value="All">All</MenuItem>
        {Object.entries(ProductCategory).map(([key, value]) => (
          <MenuItem key={value} value={value}>
            {key}
          </MenuItem>
        ))}
      </Select>

      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

      <RoundedButton variant="contained" disableElevation onClick={() => onSearch(searchValue, category)}>
        Search
      </RoundedButton>
    </Paper>
  );
};

export default SearchBar;
