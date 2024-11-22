import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }


    setLoading(true);
    setError('');

    try {
      // Replace with your backend API URL
      const response = await fetch('http://localhost:3000/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check for a successful response
      if (response.ok) {
        const data = await response.json();
        onLogIn(data);
       localStorage.setItem('token', data.data);
        navigate('/product-upload');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
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
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-sm text-blue-500 hover:underline" onClick={() => navigate('/forget-password')}>Forgot Password?</a>
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm">Don't have an account? </span>
          <a href="/sign-up" className="text-sm text-blue-500 hover:underline" onClick={() => navigate('/sign-up')}>Sign Up</a>
          
        </div>
        
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      </div>
    </div>
  );
};

export default Login;
