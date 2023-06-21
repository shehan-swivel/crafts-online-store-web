import ProductCard from "@/components/molecules/ProductCard";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("ProductCard", () => {
  const name = "Test product";
  const description = "Test description";
  const price = 1000;
  const image = "/clay.jpg";
  const onAddMock = jest.fn();

  let nameText: HTMLElement,
    descriptionText: HTMLElement,
    priceText: HTMLElement,
    imageElement: HTMLElement,
    addButton: HTMLElement;

  beforeEach(() => {
    render(
      <ProductCard name={name} description={description} price={price} image={image} onAdd={onAddMock} />
    );

    nameText = screen.getByText(name);
    descriptionText = screen.getByText(description);
    priceText = screen.getByText("LKR 1,000.00");
    imageElement = screen.getByRole("img");
    addButton = screen.getByRole("button", { name: "Add to Cart" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the card correctly", () => {
    expect(nameText).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
    expect(priceText).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it("should call onAdd function on button click", () => {
    fireEvent.click(addButton);
    expect(onAddMock).toBeCalled();
  });
});
