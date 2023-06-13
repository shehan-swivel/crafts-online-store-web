import { DEFAULT_IMAGE } from "@/constants";
import { formatPrice } from "@/utils/common-utiils";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import RoundedButton from "../atoms/RoundedButton";

type ProductCardProps = {
  name: string;
  description?: string;
  price: number;
  image?: string;
  onAdd: () => void;
};

const ProductCard = ({ name, description, price, image, onAdd }: ProductCardProps) => {
  return (
    <div>
      <Card elevation={0}>
        <CardMedia sx={{ height: 140 }} image={image || DEFAULT_IMAGE} />
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
