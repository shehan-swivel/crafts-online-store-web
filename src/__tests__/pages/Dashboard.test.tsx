import Dashboard from "@/pages/dashboard";
import { statService } from "@/services";
import { renderWithProviders } from "@/utils/test-utils";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("../../services/stat-service");

const initialState = {
  stats: {
    analytics: {
      data: {
        totalOrders: 10,
        pendingOrders: 2,
        totalProducts: 20,
        totalRevenue: 12400,
        orderCountPerDay: [],
        topSellingProducts: [],
      },
      loading: false,
    },
  },
};

describe("Dashboard", () => {
  let totalOrdersText: HTMLElement,
    pendingOrdersText: HTMLElement,
    totalProductsText: HTMLElement,
    totalRevenueText: HTMLElement,
    recentOrdersText: HTMLElement,
    topSellingProductsText: HTMLElement;

  beforeAll(() => {
    jest.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(100);
    jest.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(100);
  });

  it("should render correctly", async () => {
    const getAnalyticsMock = statService.getAnalytics as jest.Mock;

    const themeMock = createTheme({
      gradients: {},
    });

    renderWithProviders(
      <ThemeProvider theme={themeMock}>
        <Dashboard />
      </ThemeProvider>,
      { preloadedState: initialState }
    );

    await waitFor(() => {
      totalOrdersText = screen.getByText("Total Orders");
      pendingOrdersText = screen.getByText("Pending Orders");
      totalProductsText = screen.getByText("Total Products");
      totalRevenueText = screen.getByText("Total Revenue");
      recentOrdersText = screen.getByText("Recent Orders");
      topSellingProductsText = screen.getByText("Top Selling Products");
    });

    expect(getAnalyticsMock).toHaveBeenCalled();
    expect(totalOrdersText).toBeInTheDocument();
    expect(pendingOrdersText).toBeInTheDocument();
    expect(totalProductsText).toBeInTheDocument();
    expect(totalRevenueText).toBeInTheDocument();
    expect(recentOrdersText).toBeInTheDocument();
    expect(topSellingProductsText).toBeInTheDocument();
  });
});
