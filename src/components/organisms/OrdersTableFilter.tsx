import { OrderStatus } from "@/constants";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { updateOrderQuery } from "@/store/slices/order-slice";
import Grid from "@mui/material/Grid";
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
      <Grid container columnSpacing={2}>
        <Grid item xs={6} md={4}>
          <SearchField
            fullWidth
            onChangeValue={(value) => handleChange("orderNumber", value)}
            size="small"
            placeholder="Search by order number"
          />
        </Grid>
        <Grid item xs={6} md={3} lg={2}>
          <Select
            id="order-status-filter"
            labelId="order-status-filter-label"
            value={query.status}
            size="small"
            placeholder="Select"
            fullWidth
            displayEmpty
            sx={{ textTransform: "capitalize" }}
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
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default OrdersTableFilter;
