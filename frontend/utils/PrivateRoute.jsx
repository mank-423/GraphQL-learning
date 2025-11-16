import Cookies from 'js-cookie'
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const token = Cookies.get("sb_token");
    return token ? children : <Navigate to="/login" replace />;
};