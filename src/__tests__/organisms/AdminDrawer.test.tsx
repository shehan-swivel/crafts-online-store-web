import AdminDrawer from "@/components/organisms/AdminDrawer";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

describe("AdminDrawer", () => {
  let toggleButton: HTMLElement;

  const onToggleDrawerMock = jest.fn();

  beforeEach(() => {
    render(<AdminDrawer open={true} drawerWidth={200} onToggleDrawer={onToggleDrawerMock} />);

    toggleButton = screen.getByLabelText("toggle drawer");
  });

  it("should render correctly", async () => {
    const menuItems = screen.getAllByRole("listitem");

    expect(toggleButton).toBeInTheDocument();
    expect(menuItems).toHaveLength(4);
  });

  it("should call onToggleDrawer function on toggle button click", () => {
    fireEvent.click(toggleButton);
    expect(onToggleDrawerMock).toBeCalled();
  });
});
