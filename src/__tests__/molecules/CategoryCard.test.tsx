import CategoryCard from "@/components/molecules/CategoryCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("CategoryCard", () => {
  it("should render the card correctly", async () => {
    const name = "Test category";
    const description = "Test description";

    render(<CategoryCard name={name} description={description} image="/cray.jpg" />);

    const categoryCard = screen.getByRole("link", { name: "category link" });

    expect(categoryCard).toBeInTheDocument();
    expect(categoryCard).toHaveAttribute("href", `/shop?category=Test+category`);
  });
});
