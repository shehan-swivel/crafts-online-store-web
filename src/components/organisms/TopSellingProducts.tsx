import { Product } from "@/types";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React from "react";
import EmptyResult from "../molecules/EmptyResult";

type TopSellingProductsProps = {
  products: Product[];
};

const TopSellingProducts = ({ products }: TopSellingProductsProps) => {
  const theme = useTheme();

  return (
    <Card className="shadow">
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          Top Selling Products
        </Typography>
      </CardContent>
      <Divider />

      {products?.length ? (
        <List>
          {products?.map((product, index) => (
            <React.Fragment key={product.name}>
              <ListItem
                secondaryAction={
                  <Typography variant="h6">
                    {product.qty}{" "}
                    <span style={{ fontSize: 12, color: theme.palette.text.secondary }}>units</span>
                  </Typography>
                }
              >
                <ListItemAvatar>
                  <Avatar src={product.image as string} alt="product image" />
                </ListItemAvatar>
                <ListItemText primary={product.name} />
              </ListItem>
              {products.length - 1 > index && <Divider variant="fullWidth" component="li" />}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Box py={14} maxHeight={299}>
          <EmptyResult />
        </Box>
      )}
    </Card>
  );
};

export default TopSellingProducts;
