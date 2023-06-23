import CategoryCard from "@/components/molecules/CategoryCard";
import Banner from "@/components/organisms/Banner";
import ProductsGrid from "@/components/organisms/ProductsGrid";
import MainLayout from "@/components/templates/MainLayout";
import { CATEGORIES } from "@/constants";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { wrapper } from "@/store";
import { addToCart } from "@/store/slices/cart-slice";
import { getProducts } from "@/store/slices/product-slice";
import { Product } from "@/types";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { ReactNode } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.all.data);

  const handleAdd = (item: Product) => {
    dispatch(addToCart(item));
  };

  return (
    <>
      <Head>
        <title>Craftify | Home</title>
      </Head>

      {/* Banner section */}
      <Banner />

      <Container sx={{ py: 4 }}>
        {/* Latest collection section */}
        <Typography variant="h4" mb={5} mt={8} fontWeight="bold" align="center">
          Out Latest Collection
        </Typography>
        <ProductsGrid products={products} onAdd={handleAdd} />

        {/* Find by Categories section */}
        <Typography variant="h4" mb={5} mt={10} fontWeight="bold" align="center">
          Find by Categories
        </Typography>
        <Grid container spacing={4}>
          {CATEGORIES.map((category) => (
            <Grid item key={category.name} xs={12} sm={6} md={4}>
              <CategoryCard
                name={category.name}
                description={category.description}
                image={category.image}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(getProducts({ limit: 6 }));

  return {
    props: {},
  };
});
