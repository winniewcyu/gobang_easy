import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Logout() {
  const cookies = new Cookies();
  const userName = cookies.get('auth',{ path: "/" });
  // Remove the JWT token from the browser's cookies
  cookies.remove("auth", { path: "/" });

  fetch("http://localhost:8080/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userName}),
    })
    .then((data) => {})

  return <Navigate to="/" />;
}

export default Logout;
