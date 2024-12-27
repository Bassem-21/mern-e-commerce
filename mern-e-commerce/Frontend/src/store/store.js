import { create } from 'zustand'
import localhost from "../components/LocalHost";
import toast from 'react-hot-toast';

const useStore = create((set) => ({
  products: [],
  cart:[],
  error: null, // For storing any error message
  isFetching: false, // To track if data is being fetched
  likedProducts: [],
  

  setLikedProducts: (newLikedProducts) => set({ likedProducts: newLikedProducts }),
  

  fetchProducts: async () => {
    set({ isFetching: true, error: null }); // Set isFetching to true when starting to fetch data
    try {
      const response = await fetch(`${localhost}/product/all-products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });  
      if (response.ok) {
        const data = await response.json();
        set({ products: data.data, isFetching: false }); // Update products and set isFetching to false after success
      } else {
        const errorData = await response.json();
        set({ error: errorData.message || "Failed to fetch data.", isFetching: false }); // Set error and set isFetching to false
      }
    } catch (err) {
      set({ error: "An error occurred. Please try again later.", isFetching: false }); // Set error and set isFetching to false in case of network error
    }
  },
  
    // Method to reset error state if needed
    resetError: () => set({ error: null }),

    updateCart: async (cart) => {
      // Ensure the cart is an array and not empty
      if (!Array.isArray(cart) || cart.length === 0) {
        // console.log("Cart is empty, no request sent.");
        return; // Exit early if the cart is empty
      }
    
      // Check if the token exists
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      if (!token) {
        toast.error('Please log in to add items to your cart.');
        return;
      }
    
      // Map over the cart and validate each item
      const cartUpdate = cart.reduce((acc, item) => {
        if (!item || !item._id || item.quantity === undefined) {
          toast.error('Invalid cart item.');
          return acc; // Skip invalid items
        }
        acc[item._id] = item.quantity; // Add the item to the object using _id as key
        return acc;
      }, {});
    
      // If cartUpdate is empty after processing, exit early
      if (Object.keys(cartUpdate).length === 0) {
        toast.error('No valid items to update.');
        return;
      }
    
      try {
        const response = await fetch(`${localhost}/cart/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cart: cartUpdate }), // Send the cart object with productId as key
        });
    
        const result = await response.json();
        if (response.ok) {
          toast.success('Cart updated successfully!');
          return;
        }
        toast.error(result.message || 'Failed to update cart.');
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while updating the cart.');
        return { success: false, message: 'An error occurred while updating the cart.' };
      }
    }
    
}));

export default useStore;
