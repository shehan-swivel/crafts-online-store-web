import { ChangePassword } from "@/types";
import { passwordChangeFormSchema } from "@/utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";

const defaultValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePassword>({
    defaultValues,
    resolver: yupResolver(passwordChangeFormSchema),
  });

  const submitForm = (values: ChangePassword) => {
    console.log({ values });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitForm)}>
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
        <Button fullWidth type="submit" variant="contained" disableElevation>
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePasswordForm;
