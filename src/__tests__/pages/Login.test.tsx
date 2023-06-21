import LoginPage from "@/pages/login";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { act, fireEvent, screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

describe("Login", () => {
  let usernameInput: HTMLElement,
    passwordInput: HTMLElement,
    headerText: HTMLElement,
    loginButton: HTMLElement;

  beforeEach(() => {
    renderWithProviders(<LoginPage />);

    headerText = screen.getByRole("heading", { name: "Login" });
    usernameInput = screen.getByRole("textbox", { name: "Username" });
    passwordInput = screen.getByRole("textbox", { name: "Password" });
    loginButton = screen.getByRole("button", { name: "Login" });
  });

  it("should render correctly", async () => {
    expect(headerText).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should display validation error when username is empty", async () => {
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "" } });
      fireEvent.click(loginButton);
    });

    expect(usernameInput).toBeInvalid();
  });

  it("should display validation error when password is empty", async () => {
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "" } });
      fireEvent.click(loginButton);
    });

    expect(passwordInput).toBeInvalid();
  });
});
