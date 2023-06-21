import { formatPrice } from "@/utils/common-utils";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type SummaryRowProps = {
  label: string;
  value: string | number;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
  <Box display="flex" justifyContent="space-between" mb={1}>
    <Typography variant="body1" color="initial">
      {label}
    </Typography>
    <Typography variant="body1" color="initial" fontWeight="bold">
      {typeof value === "number" ? formatPrice(value) : value}
    </Typography>
  </Box>
);

export default SummaryRow;
