import CartButton from "@/components/molecules/CartButton";
import { cartService } from "@/services";
import { Product } from "@/types";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

jest.mock("../../services/cart-service");

const initialState = {
  cart: {
    cart: {
      items: [{ qty: 1 } as Product],
    },
    shippingCost: "",
    paymentMethod: "",
  },
};

describe("CartButton", () => {
  let cartButton: HTMLElement, badgeLabel: HTMLElement;

  beforeEach(async () => {
    (cartService.getCart as jest.Mock).mockResolvedValueOnce({ items: [] });

    renderWithProviders(<CartButton />, { preloadedState: initialState });

    await act(async () => {
      cartButton = screen.getByLabelText("cart");
      badgeLabel = screen.getByText("1");
    });
  });

  it("should render the cart button", async () => {
    expect(cartButton).toBeInTheDocument();
  });

  it("should show the number of items in the cart", async () => {
    expect(badgeLabel).toBeInTheDocument();
  });
});
