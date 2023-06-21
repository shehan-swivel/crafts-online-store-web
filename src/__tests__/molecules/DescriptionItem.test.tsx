import DescriptionItem from "@/components/molecules/DescriptionItem";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("DescriptionItem", () => {
  it("should render label and value correctly", async () => {
    const labelMock = "Test label";
    const valueMock = 10;

    render(<DescriptionItem label={labelMock} value={valueMock} />);

    const labelText = screen.getByText(labelMock);
    const valueText = screen.getByText(valueMock);

    expect(labelText).toBeInTheDocument();
    expect(valueText).toBeInTheDocument();
  });
});
