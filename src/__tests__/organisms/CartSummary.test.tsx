import CartSummary from "@/components/organisms/CartSummary";
import { Product } from "@/types";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

const initialState = {
  cart: {
    cart: {
      items: [{ qty: 1 } as Product],
    },
    shippingCost: "",
    paymentMethod: "",
  },
};

describe("CartSummary", () => {
  it("should render correctly", async () => {
    renderWithProviders(<CartSummary />, { preloadedState: initialState });

    const summaryText = screen.getByRole("heading", { name: "Summary" });
    const subtotalText = screen.getByText("Subtotal");
    const shippingCostText = screen.getByText("Shipping");
    const totalText = screen.getByText("Total");
    const processToCheckoutLink = screen.getByRole("link", { name: "Process to Checkout" });

    expect(summaryText).toBeInTheDocument();
    expect(subtotalText).toBeInTheDocument();
    expect(shippingCostText).toBeInTheDocument();
    expect(totalText).toBeInTheDocument();
    expect(processToCheckoutLink).toBeInTheDocument();
    expect(processToCheckoutLink).toHaveAttribute("href", "/checkout");
  });
});
