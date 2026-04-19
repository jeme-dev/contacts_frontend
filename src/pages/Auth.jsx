import React, { useState } from "react";
import { loginUser, registerUser } from "../services/api"; // Ensure these are imported
import { Navigate, useNavigate } from "react-router-dom";
import { getValidToken } from "../services/auth";
import "../css/all.css";

function Auth() {
  const navigate = useNavigate();
  const [hasAccount, setHasAccount] = useState(true); 
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (getValidToken()) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser(formData.email, formData.password);
      navigate("/");    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(formData.name, formData.email, formData.password);
      return <Navigate to="/" replace />;
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="auth">
      <div className="auth-box">
        <h3>{hasAccount ? "Log In" : "Register"}</h3>
        
        <form  className="auth-form">
          {!hasAccount && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email" 
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          {error && <p className="error">{error}</p>}
          
          <button type="submit" className="primary-btn" onClick={
            hasAccount ? handleLogin : handleRegister
            }>
            {hasAccount ? "Log In" : "Create Account"}
          </button>
        </form>

        <button 
          className="toggle-btn" 
          onClick={() => {
            setHasAccount(!hasAccount);
            setError(""); 
          }}
        >
          {hasAccount ? "Need an account? Register" : "Already have an account? Log In"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
