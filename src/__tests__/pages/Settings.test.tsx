import Settings from "@/pages/dashboard/settings";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

describe("Settings", () => {
  it("should render correctly", () => {
    renderWithProviders(<Settings />);

    const settingsText = screen.getByRole("heading", { name: "Settings" });
    const securitySettingsText = screen.getByRole("heading", { name: "Security" });
    const changePasswordText = screen.getByRole("heading", { name: "Change Password" });
    const changePasswordForm = screen.getByLabelText("change password form");

    expect(settingsText).toBeInTheDocument();
    expect(securitySettingsText).toBeInTheDocument();
    expect(changePasswordText).toBeInTheDocument();
    expect(changePasswordForm).toBeInTheDocument();
  });
});
