import ConfirmationDialog from "@/components/organisms/ConfirmationDialog";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const onConfirmMock = jest.fn();
const onCancelMock = jest.fn();

jest.mock("../../hooks/useConfirm", () => {
  return jest.fn(() => ({
    message: "Test message",
    show: true,
    onConfirm: onConfirmMock,
    onCancel: onCancelMock,
  }));
});

describe("ConfirmationDialog", () => {
  let messageText: HTMLElement, noButton: HTMLElement, yesButton: HTMLElement;

  beforeEach(() => {
    render(<ConfirmationDialog />);

    messageText = screen.getByText("Test message");
    noButton = screen.getByRole("button", { name: "No" });
    yesButton = screen.getByRole("button", { name: "Yes" });
  });

  it("should render correctly", async () => {
    expect(messageText).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();
    expect(yesButton).toBeInTheDocument();
  });

  it("should call onConfirm function when click on Yes button", () => {
    fireEvent.click(yesButton);
    expect(onConfirmMock).toBeCalled();
  });

  it("should call onCancel function when click on No button", () => {
    fireEvent.click(noButton);
    expect(onConfirmMock).toBeCalled();
  });
});
