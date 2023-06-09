import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import RoundedButton from "../atoms/RoundedButton";

const ContentWrapper = styled("div")({
  position: "absolute",
  top: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.6)",
});

const Banner = () => (
  <div style={{ width: "100%", height: 440, position: "relative" }}>
    <Image src="/image.jpg" alt="banner" fill style={{ objectFit: "cover" }} />

    <ContentWrapper>
      <Typography variant="h3" color="primary.contrastText" fontWeight="bold" align="center" gutterBottom>
        Welcome to Craftify.lk
      </Typography>
      <Typography variant="h6" color="primary.contrastText" maxWidth={600} align="center">
        Discover handmade wonders! Find unique gifts and beautiful decor at our craft store. Step into a
        world of creativity and craftsmanship. Explore now!
      </Typography>

      <RoundedButton
        variant="contained"
        color="error"
        disableElevation
        size="large"
        sx={{ mx: "auto", mt: 4 }}
      >
        Shop Now
      </RoundedButton>
    </ContentWrapper>
  </div>
);

export default Banner;
