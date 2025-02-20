import { getCookie } from "cookies-next/client";
import { LoginSchemaType } from "./schemas";
import { DashboardStatsType, DashboardSummaryType } from "./globalTypes";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const getTokenInHeaders = () => {
  const token = getCookie("token") ?? "";

  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  return myHeaders;
};

export const login = async (data: LoginSchemaType) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res;
};

export const getDashboardSummary = async (
  filter: string
): Promise<DashboardSummaryType | null> => {
  try {
    const res = await fetch(`${API_URL}/dashboard/summary?filter=${filter}`, {
      method: "GET",
      headers: getTokenInHeaders(),
      redirect: "follow",
    });

    if (!res?.ok) throw new Error(res?.statusText);

    const data = await res.json();

    return !data ? null : data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getDashboardStats = async (
  filter: string
): Promise<DashboardStatsType | null> => {
  try {
    const res = await fetch(`${API_URL}/dashboard/stat?filter=${filter}`, {
      method: "GET",
      headers: getTokenInHeaders(),
      redirect: "follow",
    });

    if (!res?.ok) throw new Error(res?.statusText);

    const data = await res.json();

    return !data ? null : data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getOffersList = async ({
  page = 1,
  per_page = 5,
  search = "",
  type = "",
  status = "",
}: {
  page?: number;
  per_page?: number;
  search?: string;
  type?: string;
  status?: string;
}): Promise<any | null> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      per_page: per_page.toString(),
      ...(search && { search }),
      ...(type && { type }),
      ...(status && { status }),
    });

    const res = await fetch(`${API_URL}/offers?${queryParams}`, {
      method: "GET",
      headers: getTokenInHeaders(),
      redirect: "follow",
    });

    if (!res?.ok) throw new Error(res?.statusText);

    const data = await res.json();

    return !data ? null : data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
