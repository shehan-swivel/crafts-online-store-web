import AdminAppBar from "@/components/organisms/AdminAppBar";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const onToggleDrawerMock = jest.fn();
const logoutMock = jest.fn();

jest.mock("next/router", () => require("next-router-mock"));

jest.mock("../../hooks/useConfirm", () => {
  return jest.fn(() => ({
    confirm: jest.fn().mockResolvedValueOnce(true),
  }));
});

jest.mock("../../hooks/useAuth", () => {
  return jest.fn(() => ({
    logout: logoutMock,
  }));
});

describe("AdminAppBar", () => {
  let toggleButton: HTMLElement, logoutButton: HTMLElement;

  beforeEach(() => {
    render(<AdminAppBar open={true} drawerWidth={200} onToggleDrawer={onToggleDrawerMock} />);

    toggleButton = screen.getByLabelText("toggle drawer");
    logoutButton = screen.getByLabelText("logout");
  });

  it("should render correctly", async () => {
    expect(toggleButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it("should call onToggleDrawer function on toggle button click", () => {
    fireEvent.click(toggleButton);
    expect(onToggleDrawerMock).toBeCalled();
  });

  it("should call logout function on logout button click", async () => {
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(logoutMock).toBeCalled();
    });
  });
});
