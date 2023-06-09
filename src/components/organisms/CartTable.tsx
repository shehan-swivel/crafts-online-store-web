import useAppSelector from "@/hooks/useAppSelector";
import { TableHeaderCell } from "@/types";
import { CartItem } from "@/types/cart-types";
import { formatPrice } from "@/utils/common-utiils";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { useState } from "react";

type RowProps = {
  row: CartItem;
};

const headerCells: TableHeaderCell[] = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "price",
    label: "Price",
    align: "right",
  },
  {
    id: "quantity",
    label: "Quantity",
    align: "right",
  },
  {
    id: "subtotal",
    label: "Subtotal",
    align: "right",
  },
  {
    id: "actions",
    label: "Actions",
    align: "right",
  },
];

const CartTable = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <TableContainer className="shadow" component={Paper}>
      <Table sx={{ minHeight: 200 }} aria-label="cart items table">
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
          {cartItems.map((item) => (
            <Row key={item._id} row={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Row = ({ row }: RowProps) => {
  const [quantity, setQuantity] = useState(row.qty);

  return (
    <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{row.name}</TableCell>
      <TableCell align="right"> {formatPrice(row.price)}</TableCell>
      <TableCell align="right">
        <TextField
          variant="outlined"
          color="primary"
          size="small"
          type="number"
          value={quantity}
          sx={{ width: 72 }}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </TableCell>
      <TableCell align="right">{formatPrice(row.price * row.qty)}</TableCell>
      <TableCell align="right">
        <IconButton color="error" aria-label="Remove">
          <CloseTwoToneIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartTable;
