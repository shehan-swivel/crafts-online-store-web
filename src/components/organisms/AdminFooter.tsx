import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const AdminFooter = () => {
  return (
    <Paper
      component="footer"
      square
      sx={{ height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}
      data-testid="admin-footer"
    >
      <Typography textAlign="center" variant="caption" component="h6">
        {new Date().getFullYear()} - <strong>Craftify.lk</strong>
      </Typography>
    </Paper>
  );
};

export default AdminFooter;
