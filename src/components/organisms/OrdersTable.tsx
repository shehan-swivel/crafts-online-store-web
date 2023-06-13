import { OrderStatus } from "@/constants";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import useConfirm from "@/hooks/useConfirm";
import { deleteOrder, updateOrderStatus } from "@/store/slices/order-slice";
import { Address, Order, OrderItem, TableHeaderCell } from "@/types";
import { capitalizeText, formatPrice } from "@/utils/common-utiils";
import { formatDate } from "@/utils/date-time-utils";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import KeyboardArrowUpTwoToneIcon from "@mui/icons-material/KeyboardArrowUpTwoTone";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import DescriptionItem from "../molecules/DescriptionItem";
import EmptyResult from "../molecules/EmptyResult";

type OrderItemProps = {
  items: OrderItem[];
};

type RowProps = {
  row: Order;
};

type CustomerDetailsProps = {
  customerName: string;
  phoneNumber: string;
  email?: string;
  billingAddress: Address;
  shippingAddress?: Address;
};

type OrderNoteProps = {
  note?: string;
};

const headerCells: TableHeaderCell[] = [
  {
    id: "createdAt",
    label: "Date",
  },
  {
    id: "amount",
    label: "Total Amount",
    align: "right",
  },
  {
    id: "status",
    label: "Status",
    align: "center",
  },
  {
    id: "items",
    label: "Items",
    align: "center",
  },
  {
    id: "customer",
    label: "Customer Details",
    align: "center",
  },
  {
    id: "note",
    label: "Note",
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    align: "right",
  },
];

const OrdersTable = () => {
  const orders = useAppSelector((state) => state.orders.all.data);

  return (
    <TableContainer className="shadow" component={Paper}>
      <Table aria-label="orders table">
        <TableHead>
          <TableRow>
            {headerCells.map((cell) => (
              <TableCell key={cell.id} align={cell.align}>
                {cell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.length ? (
            orders.map((order) => <Row key={order._id} row={order} />)
          ) : (
            <TableRow>
              <TableCell colSpan={12}>
                <EmptyResult />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Row = ({ row }: RowProps) => {
  const { confirm } = useConfirm();
  const dispatch = useAppDispatch();

  const [showItems, setShowItems] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClickStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = async (value: OrderStatus) => {
    const isConfirmed = await confirm(
      `Are you sure you want to update status to ${capitalizeText(value)} ?`
    );

    if (isConfirmed) {
      dispatch(updateOrderStatus({ id: row._id!, status: value }));
    }

    setAnchorEl(null);
  };

  // Get user confirmation before delete
  const confirmDelete = async (order: Order) => {
    const isConfirmed = await confirm("Are you sure you want to delete this record ?");

    if (isConfirmed) {
      dispatch(deleteOrder(order._id!));
    }
  };

  const statusColor = useMemo(() => {
    const colorMap = {
      [OrderStatus.PENDING]: "primary",
      [OrderStatus.PROCESSING]: "warning",
      [OrderStatus.COMPLETED]: "success",
      [OrderStatus.CANCELLED]: "error",
    };

    if (row.status) {
      return colorMap[row.status];
    } else {
      return "default";
    }
  }, [row]);

  const open = Boolean(anchorEl);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{formatDate(row.createdAt!)}</TableCell>
        <TableCell align="right">
          <Typography variant="body2" fontWeight="bold" color="error">
            {formatPrice(row.amount!)}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Chip
            label={row.status?.toLowerCase()}
            color={statusColor}
            component={Typography}
            textTransform="capitalize"
            aria-haspopup="listbox"
            aria-controls="order-status-menu"
            aria-label="order status"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickStatus}
          />
          <Menu
            id="order-status-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ role: "listbox" }}
          >
            {Object.values(OrderStatus).map((option) => (
              <MenuItem
                key={option}
                selected={option === row.status}
                onClick={() => handleMenuItemClick(option)}
              >
                {capitalizeText(option)}
              </MenuItem>
            ))}
          </Menu>
        </TableCell>

        <TableCell align="center">
          <IconButton aria-label="Expand items" size="small" onClick={() => setShowItems(!showItems)}>
            {showItems ? <KeyboardArrowUpTwoToneIcon /> : <KeyboardArrowDownTwoToneIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="center">
          <IconButton
            aria-label="Expand customer details"
            size="small"
            onClick={() => setShowCustomerDetails(!showCustomerDetails)}
          >
            {showCustomerDetails ? <KeyboardArrowUpTwoToneIcon /> : <KeyboardArrowDownTwoToneIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="center">
          <IconButton aria-label="Expand note" size="small" onClick={() => setShowNote(!showNote)}>
            {showNote ? <KeyboardArrowUpTwoToneIcon /> : <KeyboardArrowDownTwoToneIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="right">
          <IconButton color="error" aria-label="Delete" onClick={() => confirmDelete(row)}>
            <DeleteTwoToneIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={12}>
          {/* Order items */}
          <Collapse in={showItems} timeout="auto" unmountOnExit>
            <OrderItems items={row.items} />
          </Collapse>

          {/* Customer details */}
          <Collapse in={showCustomerDetails} timeout="auto" unmountOnExit>
            <CustomerDetails
              customerName={row.customerName}
              phoneNumber={row.phoneNumber}
              email={row.email}
              billingAddress={row.billingAddress}
              shippingAddress={row.shippingAddress}
            />
          </Collapse>

          {/* Order note */}
          <Collapse in={showNote} timeout="auto" unmountOnExit>
            <OrderNote note={row.note} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const OrderItems = ({ items }: OrderItemProps) => (
  <Box sx={{ mx: 1, my: 2 }}>
    <Typography variant="subtitle1" gutterBottom fontWeight="bold">
      Order Items
    </Typography>

    <Table size="small" aria-label="Order items table">
      <TableHead>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell align="right">Quantity</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((orderItem) => (
          <TableRow key={orderItem.product._id!}>
            <TableCell>{orderItem.product.name}</TableCell>
            <TableCell align="right">{orderItem.qty}</TableCell>
            <TableCell align="right">{formatPrice(orderItem.product.price)}</TableCell>
            <TableCell align="right">{formatPrice(orderItem.product.price * orderItem.qty)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);

const CustomerDetails = (props: CustomerDetailsProps) => {
  const { customerName, phoneNumber, email, billingAddress, shippingAddress } = props;

  const billingAdrs = useMemo(
    () =>
      `${billingAddress.street}, ${billingAddress.city}, ${billingAddress.state}, ${billingAddress.postalCode}`,
    [billingAddress]
  );

  const shippingAdrs = useMemo(() => {
    if (shippingAddress) {
      return `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postalCode}`;
    } else {
      return billingAdrs;
    }
  }, [billingAdrs, shippingAddress]);

  return (
    <Box sx={{ mx: 1, my: 2 }}>
      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
        Customer details
      </Typography>

      <DescriptionItem label="Customer name" value={customerName} />
      <DescriptionItem label="Phone number" value={phoneNumber} />
      <DescriptionItem label="Email address" value={email} />
      <DescriptionItem label="Billing address" value={billingAdrs} />
      <DescriptionItem label="Shipping address" value={shippingAdrs} />
    </Box>
  );
};

const OrderNote = ({ note }: OrderNoteProps) => (
  <Box sx={{ mx: 1, my: 2 }}>
    <Typography variant="subtitle1" gutterBottom fontWeight="bold">
      Note
    </Typography>
    <Typography variant="body2">{note}</Typography>
  </Box>
);

export default OrdersTable;
