import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import localhost from "../components/LocalHost";
const SignUp = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(''); // Reset error before making the request

    try {
      // Replace with your backend API URL
      const response = await fetch(`${localhost}/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      // Check for a successful response
      if (response.ok) {
        const data = await response.json();
        // Call the onSignUp callback to handle successful sign-up
        onSignUp(data); // Pass the response data (e.g., token or user data) if necessary
        localStorage.setItem('authToken', data.data);
        localStorage.setItem("isLoggedIn", "true");
        navigate('/'); // Navigate to the home page after sign-up
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Sign-up failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-primary">
        <div className="bg-secondary p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-text mb-6">Sign Up</h2>

          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-button"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-button"
          />
          
          {/* Password field with toggle visibility */}
          <div className="relative mb-4">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-button"
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

          {/* Confirm Password field with toggle visibility */}
          <div className="relative mb-6">
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-button"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} // Toggle confirm password visibility
            >
              {confirmPasswordVisible ? (
                <i className="fa fa-eye text-gray-500"></i>
              ) : (
                <i className="fa fa-eye-slash text-gray-500"></i>
              )}
            </span>
          </div>

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full p-3 bg-button text-white rounded-md hover:bg-[#D67502] focus:outline-none focus:ring-2 focus:ring-button"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          <div className="mt-2 text-center">
            <span className="text-m text-white">Already have an account? </span>
            <a href="/login" className="text-m text-text font-bold underline" onClick={() => navigate('/login')}>
              Log in
            </a>
          </div>
          
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default SignUp;
