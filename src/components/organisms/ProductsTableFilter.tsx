import { ProductCategory } from "@/constants";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { updateProductQuery } from "@/store/slices/product-slice";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import SearchField from "../molecules/SearchField";

const ProductsTableFilter = () => {
  const dispatch = useAppDispatch();

  const query = useAppSelector((state) => state.products.query);

  const handleChange = (field: string, value: string) => {
    dispatch(updateProductQuery({ ...query, [field]: value }));
  };

  return (
    <Toolbar>
      <SearchField
        onChangeValue={(value) => handleChange("name", value)}
        size="small"
        sx={{ flex: 2 }}
        placeholder="Search by product name"
      />

      <Select
        id="category-filter"
        labelId="category-filter-label"
        value={query.category}
        size="small"
        placeholder="Select"
        fullWidth
        displayEmpty
        sx={{ textTransform: "capitalize", flex: 1, ml: 3 }}
        renderValue={(value) => (value !== "" ? value?.toLowerCase() : "Category")}
        onChange={(e) => handleChange("category", e.target.value)}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {Object.entries(ProductCategory).map(([key, value]) => (
          <MenuItem key={key} value={key} sx={{ textTransform: "capitalize" }}>
            {value?.toLowerCase()}
          </MenuItem>
        ))}
      </Select>
      <div style={{ flexGrow: 3 }} />
    </Toolbar>
  );
};

export default ProductsTableFilter;
