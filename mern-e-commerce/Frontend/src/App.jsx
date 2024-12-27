import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductUpload from './components/ProductUpload';
import SignUp from './components/SignUp';
import ProductList from './components/ProductList';
import Login from './components/Login';
import ForgotPassword from './components/ForgetPassword';
import Cart from './components/Cart';
import Order from './components/Order';
import Likes from './components/Likes';
import { CartProvider } from "./components/CartContext";
function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignUp = () => {
    setIsSignedUp(true); // Set login state to true when user successfully signs up
  };
  const handleLogIn = () => {
    setIsLoggedIn(true); // Set login state to false when user
  }
  return (
    <CartProvider>
    <Router>
      <Routes>
        {/* Route to Sign Up page */}
        <Route path="/sign-up" element={<SignUp onSignUp={handleSignUp} />} />

        {/* Main route - displays ProductList or redirects to sign-up */}
        <Route path="/" element={<ProductList />} />

        {/* Route to Login page */}
        <Route path="/login" element={<Login  onLogIn={handleLogIn}/>} />

        {/* Route to Forgot Password page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route path="/cart" element={<Cart />} />

        <Route path="/order" element={< Order/>} />


        <Route path="/likes" element={<Likes />} />
        
        {/* Redirects to ProductList if the user is signed in */}
        <Route path="/product-upload" element= {<ProductUpload /> }/>
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
