import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/material/styles";
import { ReactNode } from "react";

type AdminHeaderProps = {
  title: string;
  sx?: SxProps;
  extra?: ReactNode;
};

const AdminHeader = ({ title, sx, extra }: AdminHeaderProps) => {
  return (
    <Box display="flex" justifyContent="space-between" sx={sx}>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <div>{extra}</div>
    </Box>
  );
};

export default AdminHeader;
