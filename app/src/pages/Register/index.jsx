import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  // get the userType from the URL path
  const { userType } = useParams();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  //const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validation

    // Check if the userType is admin
    if (userType === "admin") {
      setError("Registration for admin is not allowed");
      return;
    }

    // check if the email is valid
    //let emailRegex = /\S+@\S+\.\S+/;
    //if (!emailRegex.test(email)) {
    //  setError("Please enter a valid email");
    //  return;
    //}

    // Check if password exist
    if (!password || !confirmPassword) {
      setError("No Passwords");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Construct the user object based on the selected userType
    const user = {
      userType,
      name,
      //email,
      password,
    };

    // Perform API call to register the user
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => res.json());

    if (response.success) {
      alert("User registered successfully");
      navigate("/");
    } else {
      setError(response.error);
    }
  };

  return (
    <div className="registerPage">
      <div className="container">
        <div className="img-container"></div>
        <form onSubmit={handleSubmit} autoComplete="on" className="form">
          <div className="header">Register</div>
          <div className="form-grid">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Type your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              placeholder="Type your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="formBtn"
              type="button"
              onClick={() => window.history.back()}
            >
              Back
            </button>
            <button className="formBtn">Submit</button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
    
  );
};

export default RegistrationForm;
