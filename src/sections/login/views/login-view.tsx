"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SnackbarDataType } from "@/lib/globalTypes";
import { login } from "@/lib/api";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { loginSchema, LoginSchemaType } from "@/lib/schemas";
import { useAuth } from "@/contexts/AuthContext";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn() {
  const { onLoginSuccess } = useAuth();

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

  const form = useForm({
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const { rememberMe, ...rest } = data;

      const res = await login(rest);

      if (!res?.ok) throw new Error(res?.statusText);

      const resData = await res.json();

      onLoginSuccess(resData.user, resData.token);

      setToast({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
      router.push("/");
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
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            {/* email */}
            <FormControl error={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                type="email"
                {...register("email")}
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </FormControl>

            {/* password */}
            <FormControl error={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                {...register("password")}
                type="password"
                placeholder="••••••"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </FormControl>

            {/* remember me */}
            <FormControlLabel
              control={<Checkbox {...register("rememberMe")} color="primary" />}
              label="Remember me"
            />

            {/* submit btn */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>

            {/* forgot password */}
            <Link
              component="button"
              type="button"
              onClick={() => {}}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Forgot your password?
            </Link>
          </Box>
        </Card>
      </SignInContainer>

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
