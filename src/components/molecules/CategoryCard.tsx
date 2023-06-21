import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import NextImage from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  name: string;
  description?: string;
  image?: string;
};

const CategoryCardWrapper = styled(Link)({
  width: "100%",
  height: 200,
  position: "relative",
  overflow: "hidden",
  display: "block",
});

const Image = styled(NextImage)({
  transition: "all 0.5s ease",
  ":hover": {
    transform: "scale(1.4)",
  },
});

const ContentWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  top: 0,
  position: "absolute",
  transition: "all 0.5s ease",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: 8,
  pointerEvents: "none",
});

const CategoryCard = ({ name, description, image }: CategoryCardProps) => {
  return (
    <CategoryCardWrapper
      className="rounded"
      aria-label="category link"
      href={{ pathname: "/shop", query: { category: name } }}
    >
      <Image className="rounded" alt="category" src={image!} fill style={{ objectFit: "cover" }} />
      <ContentWrapper>
        <Typography variant="h5" fontWeight="bold" color="primary.contrastText" textTransform="capitalize">
          {name.toLowerCase()}
        </Typography>
        <Typography variant="subtitle1" color="secondary.contrastText" textAlign="center">
          {description}
        </Typography>
      </ContentWrapper>
    </CategoryCardWrapper>
  );
};

export default CategoryCard;
