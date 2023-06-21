import Title from "@/components/molecules/Title";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Title", () => {
  it("should render correctly", () => {
    const title = "Test title";
    const subtitle = "Test subtitle";

    render(<Title title={title} subtitle={subtitle} />);

    const titleText = screen.getByRole("heading", { name: title });
    const subtitleText = screen.getByText(subtitle);

    expect(titleText).toBeInTheDocument();
    expect(subtitleText).toBeInTheDocument();
  });
});
