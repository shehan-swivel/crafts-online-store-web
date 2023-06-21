import Cart from "@/pages/cart";
import { Product } from "@/types";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

const initialState = {
  cart: {
    cart: {
      items: [{ _id: "1", qty: 1 } as Product],
    },
    shippingCost: "",
    paymentMethod: "",
  },
};

describe("Cart", () => {
  it("should render cart content when cart is not empty", () => {
    renderWithProviders(<Cart />, { preloadedState: initialState });

    const cartTable = screen.getByRole("table", { name: "cart items table" });
    const cartSummaryComponent = screen.getByLabelText("cart summary");

    expect(cartTable).toBeInTheDocument();
    expect(cartSummaryComponent).toBeInTheDocument();
  });

  it("should display 'no data' message when cart is empty", () => {
    initialState.cart.cart.items = [];

    renderWithProviders(<Cart />, { preloadedState: initialState });

    const emptyResultComponent = screen.getByLabelText("empty result");
    const messageText = screen.getByText("Your cart is empty");
    const continueShoppingButton = screen.getByRole("link", { name: "Continue Shopping" });

    expect(emptyResultComponent).toBeInTheDocument();
    expect(messageText).toBeInTheDocument();
    expect(continueShoppingButton).toBeInTheDocument();
  });
});
