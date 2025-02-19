import { getCookie } from "cookies-next/client";
import { LoginSchemaType } from "./schemas";
import { DashboardSummaryType } from "./globalTypes";

const API_URL = "https://dummy-1.hiublue.com/api";

const getTokenInHeaders = () => {
  const token = getCookie("token") ?? "";

  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

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
