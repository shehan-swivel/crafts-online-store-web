import TopSellingProducts from "@/components/organisms/TopSellingProducts";
import { ProductCategory } from "@/constants";
import { Product } from "@/types";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("TopSellingProducts", () => {
  const products: Product[] = [
    {
      _id: "1",
      name: "Product 1",
      description: "product description",
      qty: 10,
      price: 100,
      category: ProductCategory.CLAY,
      image: "",
    },
  ];

  it("should render correctly", async () => {
    render(<TopSellingProducts products={products} />);

    const titleText = screen.getByRole("heading", { name: "Top Selling Products" });
    const productListItems = screen.getAllByRole("listitem");

    expect(titleText).toBeInTheDocument();
    expect(productListItems).toHaveLength(1);
  });
});
