import Products from "@/pages/dashboard/products";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";

jest.mock("../../services/product-service");

describe("Products", () => {
  let ordersText: HTMLElement, productsTable: HTMLElement, addProductButton: HTMLElement;

  beforeEach(async () => {
    renderWithProviders(<Products />);

    await waitFor(() => {
      ordersText = screen.getByRole("heading", { name: "Products" });
      productsTable = screen.getByRole("table", { name: "products table" });
      addProductButton = screen.getByRole("button", { name: "Add Product" });
    });
  });

  it("should render correctly", async () => {
    expect(ordersText).toBeInTheDocument();
    expect(productsTable).toBeInTheDocument();
    expect(addProductButton).toBeInTheDocument();
  });

  it("should display product form dialog when click on Add Product button", async () => {
    fireEvent.click(addProductButton);

    const formDialog = screen.getByRole("dialog");

    expect(formDialog).toBeInTheDocument();
  });
});
