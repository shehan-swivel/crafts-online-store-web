import MainFooter from "@/components/organisms/MainFooter";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("MainFooter", () => {
  it("should render correctly", async () => {
    render(<MainFooter />);

    const footerComponent = screen.getByRole("contentinfo");
    const logo = screen.getByRole("img", { name: "logo" });

    expect(footerComponent).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });
});
