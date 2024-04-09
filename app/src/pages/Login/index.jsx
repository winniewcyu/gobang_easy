import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'
import Cookies from "universal-cookie";

function LoginPage() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  
  // State to manage login form inputs
  const [userType, setUserType] = useState("user"); // ["user", "admin"]
  const [name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // check if the email is valid
    if (!name) {
      setError("Please enter a username");
      return;
    }
    // check if password is empty
    if (!password) {
      setError("Please enter a password");
      return;
    }

    // Perform API call to login the user
    fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, userType, password }), 
})

      .then((res) => {
        if (!res.ok){throw new Error(res.statusText);
        }
        return res.json();})
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // Store the JWT token in the browser's cookies
          cookies.set("auth", data.accessToken, { path: "/" });
          navigate(`${userType}`);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="login-page">
      <div className="container">
      
      <form onSubmit={handleLogin} autoComplete="on" className="form">
        <div className="header">Login</div>
        <div className = "form_setup">
          <label>Usertype:
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          </label>
          <br />
          <label>
          Username:
          <input
            type="name"
            value={name}
            placeholder="Type your userName" 
            onChange={(e) => setUserName(e.target.value)}
          />
          </label>
          <br />
          <label>
          Password:
          <input
            type="password"
            value={password}
            placeholder="Type your password" 
            onChange={(e) => setPassword(e.target.value)}
          />
          </label>
          <br />
          <button onClick={handleLogin}>Login</button>
          <button type="button" onClick={() => navigate(`/register/${userType}`)}>
          Register
          </button>
          <br />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <br/>
          <a className="login-page-link" href="your-password-reset-url">Forgot your password?</a>
        </div></form></div></div>
  );
}

export default LoginPage;