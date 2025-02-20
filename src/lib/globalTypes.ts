import { AlertProps } from "@mui/material";

export enum LOCALSTORAGE_KEYS {
  USER_INFO = "userInfo",
  TOKEN = "token",
}

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

type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type DeviceVisits = {
  desktop: number;
  mobile: number;
};

type WebsiteVisits = {
  [key in DayOfWeek]: DeviceVisits;
};

type OffersSent = {
  [key in DayOfWeek]: number;
};

export type DashboardStatsType = {
  website_visits: WebsiteVisits;
  offers_sent: OffersSent;
};

export type OfferStatus = "accepted" | "rejected" | "pending";
export enum OfferTypes {
  YEARLY = "yearly",
  MONTHLY = "monthly",
  PAY_AS_YOU_GO = "pay_as_you_go",
}

export type Offer = {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: OfferStatus;
  type: OfferTypes;
  price: number;
};

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type PaginatedResponse = {
  data: Offer[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

export type User = {
  id: number;
  name: string;
  email: string;
};
