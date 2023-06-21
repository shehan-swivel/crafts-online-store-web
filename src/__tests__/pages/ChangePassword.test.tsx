import ChangePassword from "@/pages/change-password";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

describe("ChangePassword", () => {
  it("should render correctly", async () => {
    renderWithProviders(<ChangePassword />);

    const changePasswordText = screen.getByRole("heading", { name: "Change Password", level: 5 });
    const changePasswordForm = screen.getByLabelText("change password form");
    const skipButton = screen.getByRole("link", { name: "Skip for Now" });

    expect(changePasswordText).toBeInTheDocument();
    expect(changePasswordForm).toBeInTheDocument();
    expect(skipButton).toBeInTheDocument();
  });
});
