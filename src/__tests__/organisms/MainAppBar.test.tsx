import MainAppBar from "@/components/organisms/MainAppBar";
import { cartService } from "@/services";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { act, screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

jest.mock("../../services/cart-service");

jest.mock("../../hooks/useAuth", () => {
  return jest.fn(() => ({
    isAuthenticated: true,
  }));
});

describe("MainAppBar", () => {
  let logoLink: HTMLElement, homeLink: HTMLElement, shopLink: HTMLElement;

  beforeEach(async () => {
    (cartService.getCart as jest.Mock).mockResolvedValueOnce({ items: [] });

    renderWithProviders(<MainAppBar />);

    await act(async () => {
      logoLink = screen.getByRole("link", { name: "logo link" });
      homeLink = screen.getByRole("link", { name: "Home" });
      shopLink = screen.getByRole("link", { name: "Shop" });
    });
  });

  it("should render correctly", () => {
    expect(logoLink).toHaveAttribute("href", `/`);
    expect(homeLink).toHaveAttribute("href", `/`);
    expect(shopLink).toHaveAttribute("href", `/shop`);
  });

  it("should render dashboard link if user is logged in", () => {
    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });

    expect(dashboardLink).toHaveAttribute("href", `/dashboard`);
  });
});
