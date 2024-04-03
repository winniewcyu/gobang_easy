import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Logout() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  // Remove the JWT token from the browser's cookies
  cookies.remove("auth", { path: "/" });

  // Redirect the user to the login page
  navigate("/login");

  return null;
}

export default Logout;
