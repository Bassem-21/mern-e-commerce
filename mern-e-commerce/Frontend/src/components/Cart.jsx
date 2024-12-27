import React from "react";
import { useCart } from "./CartContext";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();


  const navigate = useNavigate();

  const handleOrderNow = () => {
    // Navigate to the Order page and clear the cart
    // clearCart();
    navigate("/order", { state: { cart } });
  };

  return (
   <>
   <Header/>
    <div className="p-16 bg-primary h-screen ">
      <h2 className="text-2xl font-semibold text-text mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-white">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="bg-secondary p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-xl text-white font-semibold ">{item.name}</h3>
                <p className="text-white">${item.price} x {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-text font-bold hover:text-red-700 "
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="text-text hover:text-red-700 font-bold"
            >
              Clear Cart
            </button>
            <button
              onClick={handleOrderNow} // This will navigate to the Order page
              className="bg-button text-white p-2 rounded-2xl  cursor-pointer hover:bg-[#D67502]"
            >
              Order Now
            </button>
            <p className="text-xl font-bold text-white">
              Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </p>
          </div>
        </div>
      )}
    </div>
   </>
  );
};

export default Cart;
