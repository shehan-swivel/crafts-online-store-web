import useAppSelector from "@/hooks/useAppSelector";
import { Product, TableHeaderCell } from "@/types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EnhancedTableRow from "../molecules/EnhancedTableRow";
import useConfirm from "@/hooks/useConfirm";

type ProductsTableProps = {
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
  const { confirm } = useConfirm();

  const products = useAppSelector((state) => state.products.all.data);

  // Get user confirmation before delete
  const confirmDelete = async (row: Product) => {
    const isConfirmed = await confirm("Are you sure you want to delete this record ?");

    if (isConfirmed) {
      console.log("Delete product");
    }
  };

  return (
    <TableContainer className="shadow" component={Paper} aria-label="employee-table">
      <Table sx={{ minHeight: 200 }} aria-label="simple table">
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
            <EnhancedTableRow key={product._id} row={product} onEdit={onEdit} onDelete={confirmDelete} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
