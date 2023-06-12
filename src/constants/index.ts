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
  CART: "cart",
  ACCESS_TOKEN: "access_token",
};

export const DEFAULT_IMAGE = "https://via.placeholder.com/300x200?text=Image";
