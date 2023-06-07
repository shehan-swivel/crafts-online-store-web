import useAppSelector from "@/hooks/useAppSelector";
import useConfirm from "@/hooks/useConfirm";
import { Product, TableHeaderCell } from "@/types";
import { formatPrice } from "@/utils/common-utiils";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import KeyboardArrowUpTwoToneIcon from "@mui/icons-material/KeyboardArrowUpTwoTone";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useState } from "react";

type ProductsTableProps = {
  onEdit: (row: Product) => void;
};

type RowProps = {
  row: Product;
  onEdit: (row: Product) => void;
};

const headerCells: TableHeaderCell[] = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "qty",
    label: "Stock",
    align: "right",
  },
  {
    id: "price",
    label: "Price",
    align: "right",
  },
  {
    id: "category",
    label: "Category",
    align: "center",
  },
  {
    id: "description",
    label: "Description",
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    align: "right",
  },
];

const ProductsTable = ({ onEdit }: ProductsTableProps) => {
  const products = useAppSelector((state) => state.products.all.data);

  return (
    <TableContainer className="shadow" component={Paper}>
      <Table sx={{ minHeight: 200 }} aria-label="products table">
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
          {products.map((product) => (
            <Row key={product._id} row={product} onEdit={onEdit} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Row = ({ row, onEdit }: RowProps) => {
  const { confirm } = useConfirm();

  const [showDescription, setShowDescription] = useState(false);

  // Get user confirmation before delete
  const confirmDelete = async (product: Product): Promise<void> => {
    const isConfirmed = await confirm("Are you sure you want to delete this record ?");

    if (isConfirmed) {
      console.log("Delete product");
    }
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Image
              src={row.image as string}
              alt="product image"
              loading="lazy"
              height={80}
              width={80}
              className="rounded"
              style={{ objectFit: "cover" }}
            />
            <Typography component="span" variant="body2" sx={{ ml: 2 }}>
              {row.name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell align="right">
          <Chip label={row.qty} color="secondary" />
        </TableCell>
        <TableCell align="right">
          <Typography variant="body2" color="error">
            {formatPrice(row.price)}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2" color="primary">
            {row.category}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setShowDescription(!showDescription)}
          >
            {showDescription ? <KeyboardArrowUpTwoToneIcon /> : <KeyboardArrowDownTwoToneIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton color="primary" sx={{ mr: 1 }} aria-label="Edit" onClick={() => onEdit(row)}>
            <EditTwoToneIcon />
          </IconButton>
          <IconButton color="error" aria-label="Delete" onClick={() => confirmDelete(row)}>
            <DeleteTwoToneIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={12}>
          <Collapse in={showDescription} timeout="auto" unmountOnExit>
            <Box sx={{ mx: 1, my: 2 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Description
              </Typography>
              <Typography variant="body2">{row.description}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ProductsTable;
