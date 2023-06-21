import CartTable from "@/components/organisms/CartTable";
import { ProductCategory } from "@/constants";
import { cartService } from "@/services/cart-service";
import { Product } from "@/types";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { act, fireEvent, screen } from "@testing-library/react";

jest.mock("../../hooks/useConfirm", () => {
  return jest.fn(() => ({
    confirm: jest.fn().mockResolvedValueOnce(true),
  }));
});

const data: Product[] = [
  {
    _id: "1",
    name: "Product 1",
    description: "Product 1 description",
    category: ProductCategory.CLAY,
    price: 100,
    qty: 10,
    image: "/clay.jpg",
  },
];

describe("CartTable", () => {
  let tableElement: HTMLElement,
    tableRowElements: HTMLElement[],
    quantityInput: HTMLElement,
    removeButton: HTMLElement;

  beforeEach(() => {
    renderWithProviders(<CartTable data={data} />);

    tableElement = screen.getByRole("table", { name: "cart items table" });
    tableRowElements = screen.getAllByLabelText("cart table row");
    quantityInput = screen.getByRole("spinbutton");
    removeButton = screen.getByRole("button", { name: "remove" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    expect(tableElement).toBeInTheDocument();
    expect(tableRowElements).toHaveLength(1);
    expect(quantityInput).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });

  it("should call updateCart service function when quantity is changed", () => {
    const updateCartSpy = jest
      .spyOn(cartService, "updateCart")
      .mockImplementationOnce(() => Promise.resolve() as any);

    fireEvent.change(quantityInput, { target: { value: 20 } });

    expect(updateCartSpy).toHaveBeenCalledTimes(1);
  });

  it("should call removeFromCart service function when click on remove button", async () => {
    const removeFromCartSpy = jest
      .spyOn(cartService, "removeFromCart")
      .mockImplementationOnce(() => Promise.resolve() as any);

    await act(async () => {
      fireEvent.click(removeButton);
    });

    expect(removeFromCartSpy).toHaveBeenCalledTimes(1);
  });
});
