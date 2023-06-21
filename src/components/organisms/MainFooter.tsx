import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Logo from "../atoms/Logo";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(4),
  height: 296,
}));

const Divider = styled("div")({
  height: 2,
  width: "100%",
  marginTop: 12,
  marginBottom: 20,
});

const MainFooter = () => {
  return (
    <Footer component="footer">
      <div style={{ margin: "auto" }}>
        <Logo width={260} height={64} />
      </div>

      <Typography variant="body1" align="center" gutterBottom>
        support@craftify.lk
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        +94 713771735
      </Typography>

      <Box mt={1} mx="auto">
        <IconButton aria-label="WhatsApp" color="inherit">
          <WhatsAppIcon />
        </IconButton>
        <IconButton aria-label="Facebook" color="inherit" sx={{ mx: 1 }}>
          <FacebookOutlinedIcon />
        </IconButton>
        <IconButton aria-label="Twitter" color="inherit">
          <TwitterIcon />
        </IconButton>
      </Box>

      <Divider className="fade-out-divider" />

      <Typography textAlign="center" variant="caption" component="h6">
        {new Date().getFullYear()} - <strong>Craftify</strong>
      </Typography>
    </Footer>
  );
};

export default MainFooter;
