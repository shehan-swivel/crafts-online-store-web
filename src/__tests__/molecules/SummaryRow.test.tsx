import SummaryRow from "@/components/molecules/SummaryRow";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("SummaryRow", () => {
  it("should render correctly", async () => {
    const label = "Test label";
    const value = 100;

    render(<SummaryRow label={label} value={value} />);

    const labelText = screen.getByText(label);
    const valueText = screen.getByText("LKR 100.00");

    expect(labelText).toBeInTheDocument();
    expect(valueText).toBeInTheDocument();
  });
});
