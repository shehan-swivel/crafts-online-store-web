import AppDialog from "@/components/molecules/AppDialog";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("AppDialog", () => {
  it("should render the dialog with correct data", async () => {
    const onCloseMock = jest.fn();
    const title = "Test";
    const subtitle = "Subtitle test";
    const content = "Dialog content";

    render(
      <AppDialog open={true} title={title} subtitle={subtitle} onClose={onCloseMock}>
        {content}
      </AppDialog>
    );

    const titleText = screen.getByRole("heading", { name: title });
    const subtitleText = screen.getByText(subtitle);
    const dialogContent = screen.getByText(content);

    expect(titleText).toBeInTheDocument();
    expect(subtitleText).toBeInTheDocument();
    expect(dialogContent).toBeInTheDocument();
  });
});
