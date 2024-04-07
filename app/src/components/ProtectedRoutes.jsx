import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRoutes = () => {
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  if (!auth) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
