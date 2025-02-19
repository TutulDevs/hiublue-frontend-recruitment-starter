import { LoginSchemaType } from "./schemas";

const API_URL = "https://dummy-1.hiublue.com/api";

export const login = async (data: LoginSchemaType) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res;
};
