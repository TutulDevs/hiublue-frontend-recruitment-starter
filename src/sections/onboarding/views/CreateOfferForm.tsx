"use client";

import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm, useWatch } from "react-hook-form";
import { OfferTypes, SnackbarDataType, User } from "@/lib/globalTypes";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOfferSchema, CreateOfferSchemaType } from "@/lib/schemas";
import { createOffer, getUsersList } from "@/lib/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useDebounce } from "use-debounce";
import dayjs from "dayjs";

const planTypes = [
  { label: "Pay As You Go", value: OfferTypes.PAY_AS_YOU_GO },
  { label: "Monthly", value: OfferTypes.MONTHLY },
  { label: "Yearly", value: OfferTypes.YEARLY },
];

const additions = [
  { label: "Refundable", value: "refundable" },
  { label: "On demand", value: "on_demand" },
  { label: "Negotiable", value: "negotiable" },
];

export default function CreateOfferForm() {
  const router = useRouter();

  const [toast, setToast] = React.useState<SnackbarDataType>({
    open: false,
    message: "",
    severity: undefined,
  });

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setToast({ open: false, message: "", severity: undefined });
  };

  // search users
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [users, setUsers] = React.useState<{ id: number; label: string }[]>([]);

  // Add debounced value
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // Update effect to use debounced value
  React.useEffect(() => {
    setLoading(true);
    getUsersList(debouncedSearchTerm)
      .then((list) =>
        setUsers(!list ? [] : list.map((x) => ({ id: x.id, label: x.name }))),
      )
      .finally(() => setLoading(false));
  }, [debouncedSearchTerm]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(createOfferSchema),
  });

  const userId = useWatch({ control, name: "user_id" });

  const onSubmit = async (data: CreateOfferSchemaType) => {
    try {
      const res = await createOffer({
        ...data,
        expired: dayjs(data.expired).format("YYYY-MM-DD"),
      });

      if (!res?.ok) throw new Error(res?.statusText);

      const resData = await res.json();

      router.push("/dashboard");
      setToast({
        open: true,
        message: resData?.message ?? "Offer created successfully!",
        severity: "success",
      });
    } catch (error: any) {
      setToast({
        open: true,
        message: error?.message ?? "Login failed!",
        severity: "error",
      });
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2.5,
          py: 3,
          px: { xs: 2, md: 3 },
        }}
      >
        {/* plan type */}
        <FormControl error={!!errors.plan_type}>
          <Typography variant="subtitle2">Plan Type</Typography>
          <RadioGroup
            aria-labelledby="plan-type-radio-group"
            sx={{
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 0, md: 2 },
            }}
            onChange={(e, value) =>
              setValue("plan_type", value as any, { shouldValidate: true })
            }
          >
            {planTypes.map((plan) => (
              <FormControlLabel
                key={plan.value}
                value={plan.value}
                label={plan.label}
                control={<Radio color="success" />}
              />
            ))}
          </RadioGroup>
          {errors.plan_type && (
            <Typography color="error" variant="caption" sx={{ mt: 1 }}>
              {errors.plan_type.message}
            </Typography>
          )}
        </FormControl>

        {/* additions */}
        <FormControl error={!!errors.additions}>
          <Typography variant="subtitle2">Additions</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 0, md: 2 },
            }}
          >
            {additions.map((plan) => (
              <FormControlLabel
                key={plan.value}
                control={
                  <Checkbox
                    color="success"
                    onChange={(e) => {
                      const currentValues = Array.isArray(
                        control._formValues.additions,
                      )
                        ? control._formValues.additions
                        : [];

                      if (e.target.checked) {
                        setValue("additions", [...currentValues, plan.value]);
                      } else {
                        setValue(
                          "additions",
                          currentValues.filter(
                            (value: string) => value !== plan.value,
                          ),
                        );
                      }
                    }}
                  />
                }
                label={plan.label}
              />
            ))}
          </Box>
          {errors.additions && (
            <Typography color="error" variant="caption" sx={{ mt: 1 }}>
              {errors.additions.message}
            </Typography>
          )}
        </FormControl>

        {/* user */}
        <FormControl error={!!errors.user_id}>
          <Typography variant="subtitle2" mb={1}>
            User
          </Typography>

          <Autocomplete
            disablePortal
            options={users}
            loading={loading}
            inputValue={searchTerm}
            onInputChange={(_, value) => setSearchTerm(value)}
            value={users.find((x) => x.id == userId)}
            onChange={(_, value) =>
              setValue("user_id", value?.id || 0, { shouldValidate: true })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="User"
                error={!!errors.user_id}
                helperText={errors.user_id?.message}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  },
                }}
              />
            )}
          />
        </FormControl>

        {/* expired */}
        <FormControl error={!!errors.expired}>
          <Typography variant="subtitle2" mb={1}>
            Expired
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disablePast
              format="YYYY-MM-DD"
              onChange={(value) =>
                setValue("expired", value ? value.toDate() : new Date(), {
                  shouldValidate: true,
                })
              }
              slotProps={{
                textField: {
                  error: !!errors.expired,
                  helperText: errors.expired?.message,
                },
              }}
            />
          </LocalizationProvider>
        </FormControl>

        {/* price */}
        <FormControl error={!!errors.price}>
          <Typography variant="subtitle2" mb={1}>
            Price
          </Typography>

          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            placeholder="Enter Price"
            type="number"
            onChange={(e) => {
              const value = e.target.value ? parseFloat(e.target.value) : 0;
              setValue("price", value, { shouldValidate: true });
            }}
            error={!!errors.price}
          />
          {errors.price && (
            <FormHelperText error>{errors.price.message}</FormHelperText>
          )}
        </FormControl>

        {/* submit */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="inherit"
          >
            {isSubmitting ? "Sending Offer..." : "Send Offer"}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity ?? "info"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}
