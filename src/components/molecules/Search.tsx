import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { useState } from "react";

type SearchProps = OutlinedInputProps & {
  onSearch: (value: string) => void;
};

const Search = ({ sx, onSearch, ...inputProps }: SearchProps) => {
  const [search, setSearch] = useState("");

  return (
    <OutlinedInput
      {...inputProps}
      sx={{ ...sx, borderRadius: 50 }}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      endAdornment={
        <InputAdornment position="end">
          <IconButton aria-label="Search" edge="end" disabled={!search} onClick={() => onSearch(search)}>
            <SearchTwoToneIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default Search;
