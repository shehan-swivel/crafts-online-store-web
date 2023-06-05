import { Paper, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Paper
      component="footer"
      square
      sx={{ height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Typography textAlign="center" variant="caption" component="h6">
        {new Date().getFullYear()} - <strong>Crafts Online Store</strong>
      </Typography>
    </Paper>
  );
};

export default Footer;
