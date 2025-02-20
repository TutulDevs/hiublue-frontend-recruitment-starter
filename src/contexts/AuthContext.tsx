"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, deleteCookie } from "cookies-next/client";
import { LOCALSTORAGE_KEYS } from "@/lib/globalTypes";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  onLoginSuccess: (user: User, token: string) => void;
  logoutHandler: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCALSTORAGE_KEYS.USER_INFO);
    const storedToken = localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN);
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const onLoginSuccess = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem(LOCALSTORAGE_KEYS.USER_INFO, JSON.stringify(user));
    localStorage.setItem(LOCALSTORAGE_KEYS.TOKEN, token);
    setCookie("token", token);
  };

  const logoutHandler = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(LOCALSTORAGE_KEYS.USER_INFO);
    localStorage.removeItem(LOCALSTORAGE_KEYS.TOKEN);
    deleteCookie("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, onLoginSuccess, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
