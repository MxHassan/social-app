import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="signup" />;
};

export default PrivateRoutes;
