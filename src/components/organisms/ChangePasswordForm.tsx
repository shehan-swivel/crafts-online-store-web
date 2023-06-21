import useAuth from "@/hooks/useAuth";
import { ChangePassword } from "@/types";
import { passwordChangeFormSchema } from "@/utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SpinnerIcon from "../atoms/SpinnerIcon";
import { showSnackbar } from "@/store/slices/ui-slice";
import useAppDispatch from "@/hooks/useAppDispatch";

type ChangePasswordFormProps = {
  onSuccess?: () => void;
};

const defaultValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordForm = ({ onSuccess }: ChangePasswordFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePassword>({
    defaultValues,
    resolver: yupResolver(passwordChangeFormSchema),
  });

  const auth = useAuth();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (values: ChangePassword) => {
    try {
      setIsSubmitting(true);
      const response = await auth.changePassword(values);
      reset(); // Reset form

      if (onSuccess) {
        onSuccess();
      }

      dispatch(showSnackbar({ message: response.data.message, severity: "success" }));
    } catch (error: any) {
      dispatch(showSnackbar({ message: error.response?.data?.message, severity: "error" }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitForm)} aria-label="change password form">
      <Grid container>
        <Grid item xs={12}>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Current Password"
                autoFocus
                error={!!errors.currentPassword?.message}
                helperText={errors.currentPassword?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="New Password"
                error={!!errors.newPassword?.message}
                helperText={errors.newPassword?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Confirm Password"
                error={!!errors.confirmPassword?.message}
                helperText={errors.confirmPassword?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Box mt={1} display="flex" justifyContent="flex-end">
        <Button fullWidth type="submit" variant="contained" disableElevation disabled={isSubmitting}>
          {isSubmitting ? <SpinnerIcon /> : "Change Password"}
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePasswordForm;
