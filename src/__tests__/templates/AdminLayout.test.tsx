import AdminLayout from "@/components/templates/AdminLayout";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

describe("AdminLayout", () => {
  it("should render correctly", async () => {
    render(<AdminLayout>Content</AdminLayout>);

    const appBarComponent = screen.getByRole("banner");
    const mainElement = screen.getByRole("main");
    const footerComponent = screen.getByRole("contentinfo");

    expect(appBarComponent).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
    expect(footerComponent).toBeInTheDocument();
  });
});
