import Logo from "@/components/atoms/Logo";
import AuthLayout from "@/components/templates/AuthLayout";
import { Login } from "@/types";
import { loginFormSchema } from "@/utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React, { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";

const defaultValues = {
  username: "",
  password: "",
};

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const submitForm = (values: Login) => {
    console.log(values);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom mb={4} fontWeight="bold">
        Login
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit(submitForm)} maxWidth={400}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label="Username"
                  autoFocus
                  error={!!errors.username?.message}
                  helperText={errors.username?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label="Password"
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Button fullWidth type="submit" variant="contained" disableElevation sx={{ mt: 3 }}>
          Login
        </Button>
      </Box>
    </>
  );
};

Login.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
