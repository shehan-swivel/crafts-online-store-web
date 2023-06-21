import AdminHeader from "@/components/molecules/AdminHeader";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Logo", () => {
  let title: HTMLElement, extra: HTMLElement;

  beforeEach(async () => {
    render(<AdminHeader title="Test header" extra={<button>Test Button</button>} />);

    title = screen.getByRole("heading", { name: "Test header" });
    extra = screen.getByRole("button", { name: "Test Button" });
  });

  it("should render title correctly", async () => {
    expect(title).toBeInTheDocument();
  });

  it("should render extra contents correctly", async () => {
    expect(extra).toBeInTheDocument();
  });
});
