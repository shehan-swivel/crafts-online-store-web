import CategoryCard from "@/components/molecules/CategoryCard";
import ProductCard from "@/components/molecules/ProductCard";
import Banner from "@/components/organisms/Banner";
import MainLayout from "@/components/templates/MainLayout";
import useAppSelector from "@/hooks/useAppSelector";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { wrapper } from "@/store";
import { getProducts } from "@/store/slices/product-slice";
import { addToCart } from "@/store/slices/cart-slice";
import { Product } from "@/types";
import useAppDispatch from "@/hooks/useAppDispatch";

export default function Home() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.all.data);

  const categories = [
    {
      name: "Clay",
      description: "Embrace the art of molding and sculpting",
    },
    {
      name: "Textiles",
      description: "Dive into endless fabric creativity",
    },
    {
      name: "Wood",
      description: "Discover the beauty of woodworking",
    },
  ];

  const handleAdd = (item: Product) => {
    dispatch(addToCart(item));
  };

  return (
    <>
      {/* Banner section */}
      <Banner />

      <Container sx={{ py: 4 }}>
        {/* Latest collection section */}
        <Typography variant="h4" mb={5} mt={8} fontWeight="bold" align="center">
          Out Latest Collection
        </Typography>
        <Grid container spacing={4} rowGap={1}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <ProductCard
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image as string}
                onAdd={() => handleAdd(product)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Find by Categories section */}
        <Typography variant="h4" mb={5} mt={10} fontWeight="bold" align="center">
          Find by Categories
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item key={category.name} xs={12} sm={6} md={4}>
              <CategoryCard name={category.name} description={category.description} />
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
