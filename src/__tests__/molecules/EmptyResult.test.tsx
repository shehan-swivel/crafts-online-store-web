import EmptyResult from "@/components/molecules/EmptyResult";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("EmptyResult", () => {
  it("should render the message correctly", () => {
    const message = "Test message";

    render(<EmptyResult message={message} />);

    const messageText = screen.getByText(message);
    expect(messageText).toBeInTheDocument();
  });
});
