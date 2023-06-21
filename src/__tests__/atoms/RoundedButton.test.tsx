import RoundedButton from "@/components/atoms/RoundedButton";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("RoundedButton", () => {
  it("should render with the correct label", async () => {
    render(<RoundedButton>Test</RoundedButton>);

    const button = screen.getByRole("button", { name: "Test" });
    expect(button).toBeInTheDocument();
  });
});
