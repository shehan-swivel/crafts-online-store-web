import Orders from "@/pages/dashboard/orders";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";

jest.mock("../../services/order-service");

describe("Orders", () => {
  let ordersText: HTMLElement, ordersTable: HTMLElement;

  it("should render correctly", async () => {
    renderWithProviders(<Orders />);

    await waitFor(() => {
      ordersText = screen.getByRole("heading", { name: "Orders" });
      ordersTable = screen.getByRole("table", { name: "orders table" });
    });

    expect(ordersText).toBeInTheDocument();
    expect(ordersTable).toBeInTheDocument();
  });
});
