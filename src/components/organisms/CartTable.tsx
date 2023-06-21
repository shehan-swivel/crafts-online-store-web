import useAppDispatch from "@/hooks/useAppDispatch";
import useConfirm from "@/hooks/useConfirm";
import { removeFromCart, updateCart } from "@/store/slices/cart-slice";
import { Product, TableHeaderCell } from "@/types";
import { formatPrice } from "@/utils/common-utils";
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

type CartTableProps = {
  data: Product[];
};

type RowProps = {
  row: Product;
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

const CartTable = ({ data }: CartTableProps) => {
  return (
    <TableContainer className="shadow" component={Paper}>
      <Table aria-label="cart items table">
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
          {data?.map((item) => (
            <Row key={item._id} row={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Row = ({ row }: RowProps) => {
  const dispatch = useAppDispatch();
  const { confirm } = useConfirm();

  const [quantity, setQuantity] = useState(row.qty);

  const updateQuantity = (value: number) => {
    setQuantity(value);
    dispatch(updateCart({ id: row._id as string, qty: value }));
  };

  // Get user confirmation before remove from cart
  const confirmDelete = async (): Promise<void> => {
    const isConfirmed = await confirm("Are you sure you want to remove this from cart ?");

    if (isConfirmed) {
      dispatch(removeFromCart(row._id as string));
    }
  };

  return (
    <TableRow
      key={row._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      aria-label="cart table row"
    >
      <TableCell>{row.name}</TableCell>
      <TableCell align="right"> {formatPrice(row.price)}</TableCell>
      <TableCell align="right">
        <TextField
          name="quantity"
          variant="outlined"
          color="primary"
          size="small"
          type="number"
          value={quantity}
          sx={{ width: 72 }}
          onChange={(e) => updateQuantity(+e.target.value)}
        />
      </TableCell>
      <TableCell align="right">{formatPrice(row.price * row.qty)}</TableCell>
      <TableCell align="right">
        <IconButton color="error" aria-label="remove" onClick={confirmDelete}>
          <CloseTwoToneIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartTable;
