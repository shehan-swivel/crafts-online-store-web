import OrdersTable from "@/components/organisms/OrdersTable";
import { OrderStatus } from "@/constants";
import { Address } from "@/types";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

const initialState = {
  orders: {
    all: {
      data: [
        {
          _id: "1",
          amount: 100,
          status: OrderStatus.PENDING,
          items: [],
          customerName: "John",
          phoneNumber: "0791021001",
          billingAddress: {} as Address,
          createdAt: "2023-06-10T03:39:12.166+00:00",
        },
      ],
      loading: false,
    },
    query: {
      orderNumber: "",
      status: "",
      orderBy: "",
      order: "",
    },
    submit: {
      loading: false,
      success: false,
    },
  },
};

describe("OrdersTable", () => {
  let tableElement: HTMLElement,
    tableRowElements: HTMLElement[],
    orderStatusButton: HTMLElement,
    expandItemsButton: HTMLElement,
    expandCustomerDetailsButton: HTMLElement,
    expandNoteButton: HTMLElement,
    deleteButton: HTMLElement;

  beforeEach(() => {
    renderWithProviders(<OrdersTable />, { preloadedState: initialState });

    tableElement = screen.getByRole("table", { name: "orders table" });
    tableRowElements = screen.getAllByLabelText("orders table row");
    orderStatusButton = screen.getByRole("button", { name: "order status" });
    expandItemsButton = screen.getByRole("button", { name: "Expand items" });
    expandCustomerDetailsButton = screen.getByRole("button", { name: "Expand customer details" });
    expandNoteButton = screen.getByRole("button", { name: "Expand note" });
    deleteButton = screen.getByRole("button", { name: "Delete" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    expect(tableElement).toBeInTheDocument();
    expect(tableRowElements).toHaveLength(1);
    expect(orderStatusButton).toBeInTheDocument();
    expect(expandItemsButton).toBeInTheDocument();
    expect(expandCustomerDetailsButton).toBeInTheDocument();
    expect(expandNoteButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});
