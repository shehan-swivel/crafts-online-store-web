import Checkout from "@/pages/checkout";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

describe("Checkout", () => {
  it("should render correctly", async () => {
    renderWithProviders(<Checkout />);

    const billingDetailsText = screen.getByRole("heading", { name: "Billing details", level: 5 });
    const yourOrderText = screen.getByRole("heading", { name: "Your Order", level: 5 });
    const paymentMethodText = screen.getByText("Payment Method");
    const totalPriceText = screen.getByText("Total");
    const placeOrderButton = screen.getByRole("button", { name: "Place Order" });

    expect(billingDetailsText).toBeInTheDocument();
    expect(yourOrderText).toBeInTheDocument();
    expect(paymentMethodText).toBeInTheDocument();
    expect(totalPriceText).toBeInTheDocument();
    expect(placeOrderButton).toBeInTheDocument();
  });
});
