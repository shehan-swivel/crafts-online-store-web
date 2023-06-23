export enum ProductCategory {
  CLAY = "CLAY",
  TEXTILES = "TEXTILES",
  WOOD = "WOOD",
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum Role {
  ADMIN = "ADMIN",
}

export const StorageKeys = {
  CART: "c_cart",
  ACCESS_TOKEN: "c_at",
  REFRESH_TOKEN: "c_rt",
  REQUIRE_PASSWORD_CHANGE: "c_req_pass",
};

export const DEFAULT_IMAGE = "https://via.placeholder.com/300x200?text=Image";

export const CATEGORIES = Object.values(ProductCategory).map((category) => {
  let description, image;

  switch (category) {
    case ProductCategory.CLAY:
      description = "Embrace the art of molding and sculpting";
      image = "/clay.jpg";
      break;
    case ProductCategory.TEXTILES:
      description = "Dive into endless fabric creativity";
      image = "/textiles.jpg";
      break;
    case ProductCategory.WOOD:
      description = "Discover the beauty of woodworking";
      image = "/wood.jpg";
      break;
    default:
      break;
  }

  return {
    name: category,
    description,
    image,
  };
});
