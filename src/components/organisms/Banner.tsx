import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import Image from "next/image";
import SearchBar from "../molecules/SearchBar";
import { useRouter } from "next/router";

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

const Banner = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleSearch = (searchText: string, category: string) => {
    router.push({ pathname: "/shop", query: { search: searchText, category } });
  };

  return (
    <div style={{ width: "100%", height: 440, position: "relative" }}>
      <Image src="/image.jpg" alt="banner" fill style={{ objectFit: "cover" }} />

      <ContentWrapper>
        <div style={{ display: "flex" }}>
          <Typography
            variant="h3"
            color="primary.contrastText"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Welcome to <span style={{ color: theme.palette.error.main }}>Craftify.lk</span>
          </Typography>
        </div>

        <Typography variant="h6" mb={4} color="primary.contrastText" maxWidth={600} align="center">
          Discover handmade wonders! Find unique gifts and beautiful decor at our craft store. Step into a
          world of creativity and craftsmanship. Explore now!
        </Typography>

        <SearchBar onSearch={handleSearch} />
      </ContentWrapper>
    </div>
  );
};

export default Banner;
