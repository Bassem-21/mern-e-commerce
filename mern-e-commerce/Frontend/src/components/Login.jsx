import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import localhost from "../components/LocalHost";
const Login = ({ onLogIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // state to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${localhost}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        onLogIn(data);
        localStorage.setItem("authToken", data.data);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-primary">
        <div className="bg-secondary p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-text mb-6">
            Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text "
          />
          <div className="relative mb-6">
            <input
              type={passwordVisible ? "text" : "password"} // Toggle between text and password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-text "
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
            >
              {passwordVisible ? (
                <i className="fa fa-eye text-gray-500"></i>
              ) : (
                <i className="fa fa-eye-slash text-gray-500"></i>
              )}
            </span>
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full p-3 bg-button text-white rounded-md hover:bg-[#D67502] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="mt-4 text-center">
            <a
              href="/forgot-password"
              className="text-m font-bold text-text underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </a>
          </div>
          <div className="mt-2 text-center">
            <span className="text-m text-white">Don't have an account? </span>
            <a
              href="/sign-up"
              className="text-m font-bold text-text underline "
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </a>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
