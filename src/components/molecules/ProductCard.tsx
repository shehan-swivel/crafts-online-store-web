import { DEFAULT_IMAGE } from "@/constants";
import { formatPrice } from "@/utils/common-utils";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import RoundedButton from "../atoms/RoundedButton";

type ProductCardProps = {
  name: string;
  description?: string;
  price: number;
  image?: string;
  onAdd: () => void;
};

const ProductCard = ({ name, description, price, image, onAdd }: ProductCardProps) => {
  const imageSrc = useMemo(() => {
    if (image) {
      return image;
    } else {
      return DEFAULT_IMAGE;
    }
  }, [image]);

  return (
    <div data-testid="product-card">
      <Card elevation={0}>
        <CardMedia sx={{ height: 140 }} image={imageSrc} />
      </Card>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Box minWidth={0}>
          <Typography variant="subtitle1" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2" title={description} noWrap>
            {description}
          </Typography>
        </Box>

        <Typography variant="h6" color="error" pl={3}>
          {formatPrice(price)}
        </Typography>
      </Box>

      <RoundedButton variant="outlined" color="primary" sx={{ mt: 2 }} onClick={onAdd}>
        Add to Cart
      </RoundedButton>
    </div>
  );
};

export default ProductCard;
