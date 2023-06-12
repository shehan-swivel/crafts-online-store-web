import * as yup from "yup";

export const checkoutFormSchema = yup.object().shape({
  customerName: yup.string().required("Customer name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  email: yup.string().email("Email is invalid"),
  billingAddress: yup.object().shape({
    street: yup.string().required("Street is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postalCode: yup.string().required("Postal code is required"),
  }),
  shipToDifferentAddress: yup.boolean(),
  shippingAddress: yup.object().when("shipToDifferentAddress", {
    is: true,
    then: () =>
      yup.object().shape({
        street: yup.string().required("Street is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        postalCode: yup.string().required("Postal code is required"),
      }),
  }),
});
