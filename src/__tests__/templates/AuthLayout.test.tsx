import AuthLayout from "@/components/templates/AuthLayout";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

describe("AuthLayout", () => {
  it("should render correctly", async () => {
    render(<AuthLayout>Content</AuthLayout>);

    const mainElement = screen.getByRole("main");
    const homeLink = screen.getByRole("link");

    expect(mainElement).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
