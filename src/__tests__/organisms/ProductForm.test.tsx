import ProductForm from "@/components/organisms/ProductForm";
import { Product } from "@/types";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { act, fireEvent, screen } from "@testing-library/react";

describe("ProductForm", () => {
  let productNameInput: HTMLElement,
    descriptionInput: HTMLElement,
    priceInput: HTMLElement,
    quantityInput: HTMLElement,
    categoryInput: HTMLElement,
    fileInput: HTMLElement,
    cancelButton: HTMLElement,
    saveButton: HTMLElement;

  const isEdit = false;
  const defaultValues: Product = {
    name: "",
    description: "",
    price: 0,
    qty: 0,
    category: "",
    image: undefined,
  };
  const onCloseMock = jest.fn();

  beforeEach(() => {
    renderWithProviders(
      <ProductForm isEdit={isEdit} defaultValues={defaultValues} onClose={onCloseMock} />
    );

    productNameInput = screen.getByRole("textbox", { name: "Product Name" });
    descriptionInput = screen.getByRole("textbox", { name: "Description" });
    priceInput = screen.getByRole("spinbutton", { name: "Price" });
    quantityInput = screen.getByRole("spinbutton", { name: "Quantity" });
    categoryInput = screen.getByLabelText("Category");
    fileInput = screen.getByRole("button", { name: "Select Product image" });
    cancelButton = screen.getByRole("button", { name: "Cancel" });
    saveButton = screen.getByRole("button", { name: "Save" });
  });

  it("should render the form correctly", async () => {
    expect(productNameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(quantityInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  it("should display validation error when product name is empty", async () => {
    await act(async () => {
      fireEvent.change(productNameInput, { target: { value: "" } });
      fireEvent.click(saveButton);
    });

    expect(productNameInput).toBeInvalid();
  });

  it("should display validation error when product price is empty", async () => {
    await act(async () => {
      fireEvent.change(productNameInput, { target: { value: "" } });
      fireEvent.click(saveButton);
    });

    expect(productNameInput).toBeInvalid();
  });

  it("should display validation error when product quantityInput is empty or zero", async () => {
    await act(async () => {
      fireEvent.change(quantityInput, { target: { value: "" } });
      fireEvent.click(saveButton);
    });

    expect(quantityInput).toBeInvalid();
  });

  it("should display validation error when product category is empty", async () => {
    await act(async () => {
      fireEvent.click(saveButton);
    });

    const errorMessage = screen.getByText("Product category is required");
    expect(errorMessage).toBeInTheDocument();
  });
});
