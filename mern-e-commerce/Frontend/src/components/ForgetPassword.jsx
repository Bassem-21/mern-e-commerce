import React, { useState } from 'react';
import localhost from './LocalHost';
import Header from './Header';
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
      setError('Please fill in all fields');
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
   <>
   <Header/>
   <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="bg-secondary p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-text mb-6">Reset Password</h2>


        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-button"
          />

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-button"
          />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-button"
          />

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full p-3 bg-button text-white rounded-md hover:bg-[#D67502] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        <div className="mt-4 text-center">
          <span className="text-m text-white">Remembered your password? </span>
          <a href="/login" className="text-m text-text font-bold underline">Login</a>
        </div>
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    {success && <p className="text-green-500 text-center mb-4">{success}</p>} 
      </div>
    </div>
   </>
  );
};

export default ForgotPassword;
