import ProductsTable from "@/components/organisms/ProductsTable";
import { ProductCategory } from "@/constants";
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
      category: "",
      orderBy: "",
      order: "",
    },
    submit: {
      loading: false,
      success: false,
    },
  },
};

describe("ProductsTable", () => {
  let tableElement: HTMLElement,
    tableRowElements: HTMLElement[],
    editButton: HTMLElement,
    expandDescriptionButton: HTMLElement,
    deleteButton: HTMLElement,
    searchInput: HTMLElement;

  const onEditMock = jest.fn();

  beforeEach(() => {
    renderWithProviders(<ProductsTable onEdit={onEditMock} />, { preloadedState: initialState });

    searchInput = screen.getByPlaceholderText("Search by product name");
    tableElement = screen.getByRole("table", { name: "products table" });
    tableRowElements = screen.getAllByLabelText("products table row");
    expandDescriptionButton = screen.getByRole("button", { name: "expand description" });
    editButton = screen.getByRole("button", { name: "Edit" });
    deleteButton = screen.getByRole("button", { name: "Delete" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    expect(searchInput).toBeInTheDocument();
    expect(tableElement).toBeInTheDocument();
    expect(tableRowElements).toHaveLength(1);
    expect(expandDescriptionButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});
