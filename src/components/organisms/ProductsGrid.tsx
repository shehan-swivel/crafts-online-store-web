import { Product } from "@/types";
import Grid from "@mui/material/Grid";
import EmptyResult from "../molecules/EmptyResult";
import ProductCard from "../molecules/ProductCard";

type ProductsGridProps = {
  products: Product[];
  onAdd: (product: Product) => void;
};

const ProductsGrid = ({ products, onAdd }: ProductsGridProps) => {
  if (products?.length) {
    return (
      <Grid container spacing={4} rowGap={1}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <ProductCard
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image as string}
              onAdd={() => onAdd(product)}
            />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return <EmptyResult message="No items found" />;
  }
};

export default ProductsGrid;
