import CheckoutForm from "@/components/organisms/CheckoutForm";
import { Product } from "@/types";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

const initialState = {
  cart: {
    cart: {
      items: [{ qty: 1 } as Product],
    },
    shippingCost: "",
    paymentMethod: "",
  },
};

describe("CheckoutForm", () => {
  it("should render the form correctly", () => {
    renderWithProviders(<CheckoutForm />, { preloadedState: initialState });

    const customerNameInput = screen.getByRole("textbox", { name: "Name" });
    const phoneNumberInput = screen.getByRole("textbox", { name: "Phone Number" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const billingAddressStreetInput = screen.getByRole("textbox", { name: "Street" });
    const billingAddressCityInput = screen.getByRole("textbox", { name: "City" });
    const billingAddressStateInput = screen.getByRole("textbox", { name: "State" });
    const billingAddressPostalCodeInput = screen.getByRole("textbox", { name: "Postal Code" });
    const shipToDifferentAddressCheckbox = screen.getByRole("checkbox", {
      name: "Ship to a different address?",
    });
    const noteInput = screen.getByRole("textbox", { name: "Note" });

    expect(customerNameInput).toBeInTheDocument();
    expect(phoneNumberInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(billingAddressStreetInput).toBeInTheDocument();
    expect(billingAddressCityInput).toBeInTheDocument();
    expect(billingAddressStateInput).toBeInTheDocument();
    expect(billingAddressPostalCodeInput).toBeInTheDocument();
    expect(shipToDifferentAddressCheckbox).toBeInTheDocument();
    expect(noteInput).toBeInTheDocument();

    // Simulate click on checkbox
    fireEvent.click(shipToDifferentAddressCheckbox);

    const streetInputs = screen.getAllByRole("textbox", { name: "Street" });
    const cityInputs = screen.getAllByRole("textbox", { name: "City" });
    const stateInputs = screen.getAllByRole("textbox", { name: "State" });
    const postalCodeInputs = screen.getAllByRole("textbox", { name: "Postal Code" });

    expect(streetInputs).toHaveLength(2);
    expect(cityInputs).toHaveLength(2);
    expect(stateInputs).toHaveLength(2);
    expect(postalCodeInputs).toHaveLength(2);
  });
});
