import * as yup from "yup";

export const passwordChangeFormSchema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is required"),
  newPassword: yup.string().required("New Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match"),
});
