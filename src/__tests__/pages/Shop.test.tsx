import { ProductCategory } from "@/constants";
import Shop from "@/pages/shop";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

const initialState = {
  products: {
    all: {
      data: [
        {
          _id: "1",
          name: "Product 1",
          description: "product description",
          qty: 10,
          price: 100,
          category: ProductCategory.CLAY,
          image: "",
        },
      ],
      loading: false,
    },
    query: {
      name: "",
      category: null,
    },
    submit: {
      loading: false,
      success: false,
    },
  },
};

describe("Shop", () => {
  const search = "";
  const category = ProductCategory.CLAY;

  it("should render correctly", async () => {
    renderWithProviders(<Shop search={search} category={category} />, { preloadedState: initialState });

    const searchBarWrapper = screen.getByTestId("searchbar-wrapper");
    const productComponents = screen.getAllByTestId("product-card");

    expect(searchBarWrapper).toBeInTheDocument();
    expect(productComponents).toHaveLength(1);
  });
});
