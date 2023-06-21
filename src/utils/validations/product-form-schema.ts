import * as yup from "yup";

export const productFormSchema = yup.object().shape({
  name: yup.string().required("Product Name is required"),
  price: yup.number().required("Product price is required"),
  qty: yup.number().required("Product quantity is required").moreThan(0, "Quantity should not be zero"),
  category: yup.string().required("Product category is required"),
});
