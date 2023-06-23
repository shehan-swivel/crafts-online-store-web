import { OrderStatus } from "@/constants";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { updateOrderQuery } from "@/store/slices/order-slice";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import SearchField from "../molecules/SearchField";

const OrdersTableFilter = () => {
  const dispatch = useAppDispatch();

  const query = useAppSelector((state) => state.orders.query);

  const handleChange = (field: string, value: string) => {
    dispatch(updateOrderQuery({ ...query, [field]: value }));
  };

  return (
    <Toolbar>
      <SearchField
        onChangeValue={(value) => handleChange("orderNumber", value)}
        size="small"
        sx={{ flex: 2 }}
        placeholder="Search by order number"
      />

      <Select
        id="order-status-filter"
        labelId="order-status-filter-label"
        value={query.status}
        size="small"
        placeholder="Select"
        fullWidth
        displayEmpty
        sx={{ textTransform: "capitalize", flex: 1, ml: 3 }}
        renderValue={(value) => (value !== "" ? value?.toLowerCase() : "Status")}
        onChange={(e) => handleChange("status", e.target.value)}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {Object.entries(OrderStatus).map(([key, value]) => (
          <MenuItem key={key} value={key} sx={{ textTransform: "capitalize" }}>
            {value?.toLowerCase()}
          </MenuItem>
        ))}
      </Select>
      <div style={{ flexGrow: 3 }} />
    </Toolbar>
  );
};

export default OrdersTableFilter;
