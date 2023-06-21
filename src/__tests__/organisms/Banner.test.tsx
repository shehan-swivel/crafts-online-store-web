import Banner from "@/components/organisms/Banner";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

describe("Banner", () => {
  it("should render correctly", async () => {
    render(<Banner />);

    const bannerImage = screen.getByRole("img", { name: "banner" });
    const heading = screen.getByRole("heading", { level: 3 });

    expect(bannerImage).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
