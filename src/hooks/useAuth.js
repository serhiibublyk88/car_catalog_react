import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, login, logout } = context;

  const isAdmin = user?.role === "admin";
  const isGuest = !user;

  return { user, login, logout, isAdmin, isGuest };
};
