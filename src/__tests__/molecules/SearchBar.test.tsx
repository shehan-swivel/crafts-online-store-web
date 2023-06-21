import SearchBar from "@/components/molecules/SearchBar";
import { ProductCategory } from "@/constants";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("SearchBar", () => {
  const search = "Test";
  const category = ProductCategory.CLAY;
  const onSearchMock = jest.fn();

  let searchInput: HTMLElement, searchButton: HTMLElement, categoryInput: HTMLElement;

  beforeEach(() => {
    render(<SearchBar search={search} category={category} onSearch={onSearchMock} />);

    searchInput = screen.getByPlaceholderText("Search");
    categoryInput = screen.getByLabelText("category");
    searchButton = screen.getByRole("button", { name: "Search" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render search component correctly", async () => {
    expect(searchInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("should call onSearch function on button click", () => {
    fireEvent.click(searchButton);
    expect(onSearchMock).toBeCalledWith(search, category);
  });
});
