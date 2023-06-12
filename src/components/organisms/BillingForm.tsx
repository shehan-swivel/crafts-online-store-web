import { Address, Order } from "@/types";
import { checkoutFormSchema } from "@/utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";

const defaultValues: Order = {
  items: [],
  customerName: "",
  phoneNumber: "",
  email: "",
  billingAddress: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
  },
  shipToDifferentAddress: false,
  shippingAddress: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
  },
  note: "",
};

const CheckoutForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Order>({
    defaultValues,
    resolver: yupResolver(checkoutFormSchema),
  });

  const shipToDifferentAddress = watch("shipToDifferentAddress");

  const onSubmitForm = (values: Order) => {
    // TODO: make API request and redirect to the home page
    console.log(values);
  };

  return (
    <Box component="form" id="billing-form" onSubmit={handleSubmit(onSubmitForm)}>
      <Grid container columnSpacing={4} rowSpacing={1}>
        <Grid item xs={12}>
          <Controller
            name="customerName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Name"
                autoFocus
                error={!!errors.customerName?.message}
                helperText={errors.customerName?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone Number"
                error={!!errors.phoneNumber?.message}
                helperText={errors.phoneNumber?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="billingAddress.street"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Street"
                error={!!errors.billingAddress?.street?.message}
                helperText={errors.billingAddress?.street?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="billingAddress.city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="City"
                error={!!errors.billingAddress?.city?.message}
                helperText={errors.billingAddress?.city?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="billingAddress.state"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="State"
                error={!!errors.billingAddress?.state?.message}
                helperText={errors.billingAddress?.state?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="billingAddress.postalCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Postal Code"
                error={!!errors.billingAddress?.postalCode?.message}
                helperText={errors.billingAddress?.postalCode?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Controller
        name="shipToDifferentAddress"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} />}
            label={
              <Typography variant="h5" fontWeight="bold">
                Ship to a different address?
              </Typography>
            }
            sx={{ my: 3 }}
          />
        )}
      />

      {/* Shipping address components */}
      {shipToDifferentAddress && (
        <Grid container columnSpacing={4} rowSpacing={1}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="shippingAddress.street"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Street"
                  error={!!errors.shippingAddress?.street?.message}
                  helperText={errors.shippingAddress?.street?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="shippingAddress.city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="City"
                  error={!!errors.shippingAddress?.city?.message}
                  helperText={errors.shippingAddress?.city?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="shippingAddress.state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="State"
                  error={!!errors.shippingAddress?.state?.message}
                  helperText={errors.shippingAddress?.state?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="shippingAddress.postalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Postal Code"
                  error={!!errors.shippingAddress?.postalCode?.message}
                  helperText={errors.shippingAddress?.postalCode?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid>
        </Grid>
      )}

      <Divider sx={{ mt: 2, mb: 3 }} />
      <Controller
        name="note"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            minRows={2}
            placeholder="Notes about your order"
            fullWidth
            label="Note"
          />
        )}
      />
    </Box>
  );
};

export default CheckoutForm;
