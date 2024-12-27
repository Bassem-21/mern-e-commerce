import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

const Order = () => {
  const location = useLocation();
  const { cart } = location.state || {}; // Get cart data passed through navigation state

  return (
   <>
   <Header/>
   <div className="p-16 bg-primary h-screen">
      <h2 className="text-2xl font-semibold text-text mb-6">Order Confirmation</h2>
      {cart && cart.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-text mb-4">You have ordered:</h3>
          {cart.map((item) => (
            <div key={item._id} className="bg-secondary p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                <p className="text-white">${item.price} x {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xl font-bold text-white">
              Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </p>
          </div>
        </div>
      ) : (
        <p>Your cart is empty. Please add items to your cart first.</p>
      )}
    </div>
   </>
  );
};

export default Order;
