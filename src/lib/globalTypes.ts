import { AlertProps } from "@mui/material";

export type SnackbarDataType = {
  open: boolean;
  message: string;
  severity: AlertProps["severity"];
};

type MetricValue = {
  active_users: number;
  clicks: number;
  appearance: number;
};

export type DashboardSummaryType = {
  current: MetricValue;
  previous: MetricValue;
};
