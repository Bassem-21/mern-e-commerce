import React, { useState } from 'react';
import localhost from './LocalHost';
// import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(''); // Reset success message

    try {
      // Replace with your backend API URL
      const response = await fetch(`${localhost}/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // get item from local storage
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setSuccess('Your password has been successfully reset.');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Reset Password</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        <div className="mt-4 text-center">
          <span className="text-sm">Remembered your password? </span>
          <a href="/login" className="text-sm text-blue-500 hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
