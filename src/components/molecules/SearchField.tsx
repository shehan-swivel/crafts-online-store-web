import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";

type SearchFieldProps = OutlinedInputProps & {
  onChangeValue: (value: string) => void;
};

const SearchField = ({ onChangeValue, ...inputProps }: SearchFieldProps) => {
  return (
    <OutlinedInput
      onChange={(e) => onChangeValue(e.target.value)}
      startAdornment={
        <InputAdornment position="start">
          <SearchTwoToneIcon />
        </InputAdornment>
      }
      {...inputProps}
    />
  );
};

export default SearchField;
