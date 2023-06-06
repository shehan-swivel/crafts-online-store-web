import { Product } from "@/types";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import KeyboardArrowUpTwoToneIcon from "@mui/icons-material/KeyboardArrowUpTwoTone";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Image from "next/image";
import { useState } from "react";
import { formatPrice } from "@/utils/common-utiils";

type EnhancedTableRowProps = {
  row: Product;
  onEdit: (row: Product) => void;
  onDelete: (row: Product) => void;
};

const EnhancedTableRow = ({ row, onEdit, onDelete }: EnhancedTableRowProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Image
              src={row.image ?? ""}
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
          <IconButton aria-label="expand row" size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? <KeyboardArrowUpTwoToneIcon /> : <KeyboardArrowDownTwoToneIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton color="primary" sx={{ mr: 1 }} aria-label="Edit" onClick={() => onEdit(row)}>
            <EditTwoToneIcon />
          </IconButton>
          <IconButton color="error" aria-label="Delete" onClick={() => onDelete(row)}>
            <DeleteTwoToneIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={12}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant="body2" sx={{ mx: 1, my: 2 }}>
              {row.description}
            </Typography>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default EnhancedTableRow;
