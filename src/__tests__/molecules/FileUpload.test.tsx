import FileUpload from "@/components/molecules/FileUpload";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("FileUpload", () => {
  const label = "Test label";
  const onChangeMock = jest.fn();

  describe("When image url is not provided", () => {
    it("should render the upload button with given label", async () => {
      render(<FileUpload label={label} onChange={onChangeMock} />);

      const fileInput = screen.getByRole("button", { name: label });
      expect(fileInput).toBeInTheDocument();
    });
  });

  describe("When image url is provided", () => {
    it("should render the image", async () => {
      render(<FileUpload label={label} imageUrl="/cray.jpg" onChange={onChangeMock} />);

      const imageElement = screen.getByRole("img", { name: "image" });
      expect(imageElement).toBeInTheDocument();
    });
  });
});
