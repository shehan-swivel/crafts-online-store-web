import StatCard from "@/components/molecules/StatCard";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("StatCard", () => {
  it("should render the given statistics", async () => {
    const label = "Test label";
    const value = 1;
    const icon = ShoppingBagTwoToneIcon;
    const color = "";
    const subtitle = "Test subtitle";

    render(<StatCard label={label} value={value} icon={icon} color={color} subtitle={subtitle} />);

    const labelText = screen.getByText(label);
    const valueText = screen.getByText(value);
    const subtitleText = screen.getByText(subtitle);
    const iconElement = screen.getByLabelText("statistic icon");

    expect(labelText).toBeInTheDocument();
    expect(valueText).toBeInTheDocument();
    expect(subtitleText).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });
});
