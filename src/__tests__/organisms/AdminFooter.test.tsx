import AdminFooter from "@/components/organisms/AdminFooter";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("AdminFooter", () => {
  it("should render correctly", () => {
    render(<AdminFooter />);

    const footerComponent = screen.getByTestId("admin-footer");
    expect(footerComponent).toBeInTheDocument();
  });
});
