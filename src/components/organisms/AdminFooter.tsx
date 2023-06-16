import { Paper, Typography } from "@mui/material";

const AdminFooter = () => {
  return (
    <Paper
      component="footer"
      square
      sx={{ height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Typography textAlign="center" variant="caption" component="h6">
        {new Date().getFullYear()} - <strong>Craftify.lk</strong>
      </Typography>
    </Paper>
  );
};

export default AdminFooter;
