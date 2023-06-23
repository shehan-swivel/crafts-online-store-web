import { TableHeaderCell } from "@/types";
import { Box, SortDirection, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

type EnhancedTableHeadProps = {
  headerCells: TableHeaderCell[];
  orderBy?: string;
  order?: string;
  onSort: (orderBy: string, order: string) => void;
};

const EnhancedTableHead = ({ headerCells, orderBy, order, onSort }: EnhancedTableHeadProps) => {
  // Update orderBy and order values when click on the table headers
  const createSortHandler = (property: string) => () => {
    const isAsc = orderBy === property && order === "asc";
    onSort(property, isAsc ? "desc" : "asc");
  };

  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headerCell) => {
          if (headerCell.disableSort) {
            return (
              <TableCell key={headerCell.id} align={headerCell.align}>
                {headerCell.label}
              </TableCell>
            );
          } else {
            return (
              <TableCell
                key={headerCell.id}
                align={headerCell.align}
                sortDirection={orderBy === headerCell.id ? (order as SortDirection) : false}
              >
                <TableSortLabel
                  active={orderBy === headerCell.id}
                  direction={orderBy === headerCell.id ? order : ("asc" as any)}
                  onClick={createSortHandler(headerCell.id)}
                >
                  {headerCell.label}
                  {orderBy === headerCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc" ? "sorted descending" : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
