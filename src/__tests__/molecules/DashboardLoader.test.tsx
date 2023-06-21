import DashboardLoader from "@/components/molecules/DashboardLoader";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("DashboardLoader", () => {
  it("should render the loading spinner", async () => {
    render(<DashboardLoader />);

    const loader = screen.getByTestId("dashboard-loader");
    expect(loader).toBeInTheDocument();
  });
});
