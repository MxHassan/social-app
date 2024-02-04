import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = () => {
  const { user } = useContext(AuthContext);

  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
