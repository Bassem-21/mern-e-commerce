import React, { createContext, useState, useContext, useEffect } from "react";
import useStore from "../store/store";

// Create the CartContext
const CartContext = createContext();

// Cart Provider component to wrap around the App
export const CartProvider = ({ children }) => {
  const { updateCart } = useStore(); // Assuming `updateCart` updates the Zustand store
  const [cart, setCart] = useState([]);

  // Sync cart with Zustand store on component mount
  useEffect(() => {
    // Initialize the cart from Zustand store if it exists
    const storedCart = useStore.getState().cart;
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  

  // Add to cart function that also accepts quantity
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        // Update quantity if product already exists in the cart
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      return updatedCart;
    });
  };

  // Clear all items in the cart
  const clearCart = () => {
    setCart([]);
  };

  // Update Zustand store whenever cart changes
  useEffect(() => {
    updateCart(cart); // This will sync the cart with the Zustand store
  }, [cart, updateCart,removeFromCart,clearCart]);
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);
