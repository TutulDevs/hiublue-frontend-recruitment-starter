import { AlertProps } from "@mui/material";

export type SnackbarDataType = {
  open: boolean;
  message: string;
  severity: AlertProps["severity"];
};
