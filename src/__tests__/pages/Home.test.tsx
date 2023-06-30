import { ProductCategory } from "@/constants";
import Home from "@/pages";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

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
      category: "",
    },
    submit: {
      loading: false,
      success: false,
    },
  },
};

describe("Home", () => {
  it("should render correctly", async () => {
    renderWithProviders(<Home />, { preloadedState: initialState });

    const bannerComponent = screen.getByTestId("banner");
    const latestCollectionSectionHeader = screen.getByRole("heading", { name: "Our Latest Collection" });
    const productComponents = screen.getAllByTestId("product-card");
    const findByCategoriesSectionHeader = screen.getByRole("heading", { name: "Find by Categories" });
    const categoryComponents = screen.getAllByLabelText("category link");

    expect(bannerComponent).toBeInTheDocument();
    expect(latestCollectionSectionHeader).toBeInTheDocument();
    expect(productComponents).toHaveLength(1);
    expect(findByCategoriesSectionHeader).toBeInTheDocument();
    expect(categoryComponents).toHaveLength(3);
  });
});
