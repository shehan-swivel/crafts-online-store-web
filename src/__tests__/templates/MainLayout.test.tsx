import MainLayout from "@/components/templates/MainLayout";
import { cartService } from "@/services";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { act, screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

jest.mock("../../services/cart-service");

describe("MainLayout", () => {
  let appBarComponent: HTMLElement, mainElement: HTMLElement, footerComponent: HTMLElement;

  it("should render correctly", async () => {
    (cartService.getCart as jest.Mock).mockResolvedValueOnce({ items: [] });

    renderWithProviders(<MainLayout>Content</MainLayout>);

    await act(async () => {
      appBarComponent = screen.getByRole("banner");
      mainElement = screen.getByRole("main");
      footerComponent = screen.getByRole("contentinfo");
    });

    expect(appBarComponent).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
    expect(footerComponent).toBeInTheDocument();
  });
});
