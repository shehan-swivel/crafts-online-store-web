import Logo from "@/components/atoms/Logo";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Logo", () => {
  it("should render the logo", async () => {
    render(<Logo height={100} width={300} />);

    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
  });
});
