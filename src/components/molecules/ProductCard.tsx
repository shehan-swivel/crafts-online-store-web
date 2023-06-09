import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { formatPrice } from "@/utils/common-utiils";
import Button from "@mui/material/Button";
import RoundedButton from "../atoms/RoundedButton";

type ProductCardProps = {
  name: string;
  description?: string;
  price: number;
};

const ProductCard = ({ name, description, price }: ProductCardProps) => {
  return (
    <div>
      <Card elevation={0}>
        <CardMedia sx={{ height: 140 }} image="/image.jpg" />
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

      <RoundedButton variant="outlined" color="primary" sx={{ mt: 2 }}>
        Add to Cart
      </RoundedButton>
    </div>
  );
};

export default ProductCard;
