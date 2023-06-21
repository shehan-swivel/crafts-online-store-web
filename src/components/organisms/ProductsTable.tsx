import { DEFAULT_IMAGE } from "@/constants";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import useConfirm from "@/hooks/useConfirm";
import { deleteProduct, getProducts } from "@/store/slices/product-slice";
import { Product, TableHeaderCell } from "@/types";
import { formatPrice } from "@/utils/common-utils";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import KeyboardArrowUpTwoToneIcon from "@mui/icons-material/KeyboardArrowUpTwoTone";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import debounce from "lodash.debounce";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import EmptyResult from "../molecules/EmptyResult";
import SearchField from "../molecules/SearchField";

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
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.all.data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (value: string) => {
    dispatch(getProducts({ name: value }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleSearch = useMemo(() => debounce(handleSearch, 300), []);

  const visibleRows = useMemo(
    () => products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, products, rowsPerPage]
  );

  useEffect(() => {
    return () => {
      debouncedHandleSearch.cancel();
    };
  });

  return (
    <Paper className="shadow">
      <Toolbar>
        <SearchField
          onChangeValue={debouncedHandleSearch}
          size="small"
          placeholder="Search by product name"
        />
      </Toolbar>
      <Divider />
      <TableContainer>
        <Table aria-label="products table">
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
            {visibleRows.length ? (
              visibleRows.map((product) => <Row key={product._id} row={product} onEdit={onEdit} />)
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
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const Row = ({ row, onEdit }: RowProps) => {
  const { confirm } = useConfirm();
  const dispatch = useAppDispatch();

  const [showDescription, setShowDescription] = useState(false);

  // Get user confirmation before delete
  const confirmDelete = async (product: Product): Promise<void> => {
    const isConfirmed = await confirm("Are you sure you want to delete this record ?");

    if (isConfirmed) {
      dispatch(deleteProduct(product._id as string));
    }
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} aria-label="products table row">
        <TableCell>
          <Box display="flex" alignItems="center">
            <Image
              src={(row.image as string) || DEFAULT_IMAGE}
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
            aria-label="expand description"
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
