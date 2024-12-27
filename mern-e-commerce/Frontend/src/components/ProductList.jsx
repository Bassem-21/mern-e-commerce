import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import { useCart } from "./CartContext"; // Import useCart hook
import useStore from "../store/store"; // Import Zustand store
import { ToastContainer, toast } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const ProductList = () => {
  const navigate = useNavigate();
  // Access Zustand store for products, error, fetching state
  const { products, error, isFetching, fetchProducts, resetError } = useStore();
  const { addToCart } = useCart(); // Get addToCart function from context

  const loginStatus = localStorage.getItem('isLoggedIn');
  

  // for images to be shown
  const host = "http://localhost:3000/";

  // Fetch product data on mount if products are empty
  useEffect(() => {
    if (products.length === 0 && !isFetching) {
      fetchProducts(); // Fetch products from the API
    }
  }, [products, isFetching, fetchProducts]);

  // Handle image change logic
  const [currentImages, setCurrentImages] = React.useState({});
  const handleImageChange = (productId, direction) => {
    setCurrentImages((prevState) => {
      const currentProductImage = prevState[productId] || 0;
      const images =
        products.find((item) => item._id === productId)?.pictures || [];
      const newImageIndex =
        direction === "next"
          ? (currentProductImage + 1) % images.length
          : (currentProductImage - 1 + images.length) % images.length;
      return {
        ...prevState,
        [productId]: newImageIndex,
      };
    });
  };

  // Handle quantity change
  const [quantities, setQuantities] = React.useState({});
  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  // Handle liking a product
    const [likedProducts, setLikedProductsState] = React.useState([]);
    const setLikedProductsInStore = useStore((state) => state.setLikedProducts);
  
    const handleLikeProduct = (product) => {
      const updatedLikedProducts = likedProducts.includes(product)
        ? likedProducts.filter((id) => id !== product) // Remove product from liked list
        : [...likedProducts, product]; // Add product to liked list
  
      setLikedProductsState(updatedLikedProducts); // Update local state
      setLikedProductsInStore(updatedLikedProducts); // Update Zustand store
    }

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error} <button onClick={resetError}>Try Again</button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-16 bg-primary">
        {products.map((item) => {
          const images = Array.isArray(item.pictures)
            ? item.pictures
            : [item.pictures];
          const currentImage = currentImages[item._id] || 0;

          return (
            <div
              key={item._id}
              className="bg-secondary shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto mb-4 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
            >
              {/* Image Carousel */}
              <div className="relative w-full h-56">
                <img
                  src={host + images[currentImage]} // Use the current image in the carousel
                  alt="Product"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
                />

                {/* Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageChange(item._id, "prev")}
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={() => handleImageChange(item._id, "next")}
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
                    >
                      &gt;
                    </button>
                  </>
                )}

              
              </div>

             {/* Product Details */}
             <div className="p-5 ">
                {/* Name and Link */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold cursor-pointer text-text">
                    {item.name}
                  </h3>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleLikeProduct(item); }}
                    className={`ml-1 text-lg ${likedProducts.includes(item) ? 'text-red-500' : 'text-black'}`}
                  >
                    <i className={`fa-heart ${likedProducts.includes(item) ? 'fa-solid' : 'fa-regular'}`}></i>
                  </a>
                </div>

                {/* Description */}
                <p className="text-text text-sm mb-4">{item.description}</p>

                {/* Price */}
                <p className="text-lg text-text mb-4">${item.price}</p>

                {/* Quantity */}
                <div className="mb-4">
                  <label htmlFor={`quantity-${item._id}`} className="block text-sm font-medium text-text">
                    Quantity
                  </label>
                  <input
                    id={`quantity-${item._id}`}
                    type="number"
                    min="1"
                    value={quantities[item._id] || 1}
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Add to Cart Button */}
                <div>
                  <button
                    onClick={() => {
                      const quantity = quantities[item._id] || 1; // Get the quantity or default to 1
                      if(loginStatus){

                        addToCart(item, quantity); // Pass the selected quantity here
                      }else{
                        navigate("/sign-up")
                      }
                      toast.success(`${item.name} has been added to your cart!`); // Show toast message
                    }}
                    className="w-full bg-button text-white py-2 px-5 rounded-lg hover:bg-[#D67502] transform hover:scale-105 transition-all duration-300 focus:outline-none cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar={true} />
    </>
  );
};

export default ProductList;
