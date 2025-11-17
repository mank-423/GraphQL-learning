import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const token = Cookies.get("sb_token");
  return token ? <Navigate to="/" replace /> : children;
};
