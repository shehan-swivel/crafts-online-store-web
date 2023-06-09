import ProductCard from "@/components/molecules/ProductCard";
import SearchBar from "@/components/molecules/SearchBar";
import MainLayout from "@/components/templates/MainLayout";
import useAppSelector from "@/hooks/useAppSelector";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

const TopBar = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  position: "relative",
  height: 80,
  display: "flex",
  justifyContent: "center",
}));

const SearchBarWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: -32,
}));

const Shop = () => {
  const products = useAppSelector((state) => state.products.all.data);

  const search = (searchText: string, category: string) => {
    console.log(searchText, category);
  };

  return (
    <>
      <TopBar>
        <SearchBarWrapper>
          <SearchBar onSearch={search} />
        </SearchBarWrapper>
      </TopBar>

      <Container sx={{ pt: 10, pb: 8 }}>
        <Grid container spacing={4} rowGap={1}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <ProductCard name={product.name} description={product.description} price={product.price} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

Shop.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Shop;
