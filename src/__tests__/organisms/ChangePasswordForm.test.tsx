import ChangePasswordForm from "@/components/organisms/ChangePasswordForm";
import { renderWithProviders } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { act, fireEvent, screen } from "@testing-library/react";

const changePasswordMock = jest.fn().mockResolvedValue({ data: {} });

jest.mock("../../hooks/useAuth", () => {
  return jest.fn(() => ({
    changePassword: changePasswordMock,
  }));
});

describe("ChangePasswordForm", () => {
  let currentPasswordInput: HTMLElement,
    newPasswordInput: HTMLElement,
    confirmPasswordInput: HTMLElement,
    saveButton: HTMLElement;

  beforeEach(() => {
    renderWithProviders(<ChangePasswordForm />);

    currentPasswordInput = screen.getByRole("textbox", { name: "Current Password" });
    newPasswordInput = screen.getByRole("textbox", { name: "New Password" });
    confirmPasswordInput = screen.getByRole("textbox", { name: "Confirm Password" });
    saveButton = screen.getByRole("button", { name: "Change Password" });
  });

  it("should render the form correctly", async () => {
    expect(currentPasswordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  it("should display validation error when current password is empty", async () => {
    await act(async () => {
      fireEvent.change(currentPasswordInput, { target: { value: "" } });
      fireEvent.click(saveButton);
    });

    expect(currentPasswordInput).toBeInvalid();
  });

  it("should display validation error when new password is empty", async () => {
    await act(async () => {
      fireEvent.change(newPasswordInput, { target: { value: "" } });
      fireEvent.click(saveButton);
    });

    expect(newPasswordInput).toBeInvalid();
  });

  it("should display validation error when confirm password is empty", async () => {
    await act(async () => {
      fireEvent.change(confirmPasswordInput, { target: { value: "" } });
      fireEvent.click(saveButton);
    });

    expect(confirmPasswordInput).toBeInvalid();
  });

  it("should pass all the validations when form is filled correctly", async () => {
    await act(async () => {
      fireEvent.change(currentPasswordInput, { target: { value: "1234" } });
      fireEvent.change(newPasswordInput, { target: { value: "12345" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "12345" } });
      fireEvent.click(saveButton);
    });

    expect(changePasswordMock).toBeCalled();
  });
});
