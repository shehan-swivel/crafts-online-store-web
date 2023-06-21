import Snackbar from "@/components/organisms/Snackbar";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

const initialState = {
  ui: {
    snackbar: {
      show: true,
      message: "Test message",
      severity: "info" as any,
    },
  },
};

describe("Snackbar", () => {
  it("should render correctly", async () => {
    renderWithProviders(<Snackbar />, { preloadedState: initialState });

    const snackbarComponent = screen.getByRole("presentation");
    const alertComponent = screen.getByRole("alert");
    const messageText = screen.getByText("Test message");

    expect(snackbarComponent).toBeInTheDocument();
    expect(alertComponent).toBeInTheDocument();
    expect(messageText).toBeInTheDocument();
  });
});
