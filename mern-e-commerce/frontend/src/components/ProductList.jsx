import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import localhost from "./LocalHost";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [currentImages, setCurrentImages] = useState({}); // Object to store current image for each product
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const host = 'http://localhost:3000/';

  const handleProductData = async () => {
    if (isFetching || product.length > 0) return;

    setIsFetching(true);
    try {
      const response = await fetch(
        `${localhost}/product/all-products`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProduct(data.data); // Assuming the array of products is inside `data.data`
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch data.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (product.length === 0) {
      handleProductData();
    }
  }, [product]);

  const handleImageChange = (productId, direction) => {
    setCurrentImages((prevState) => {
      const currentProductImage = prevState[productId] || 0;
      const images = product.find(item => item._id === productId)?.pictures || [];
      const newImageIndex = direction === "next" 
        ? (currentProductImage + 1) % images.length
        : (currentProductImage - 1 + images.length) % images.length;
      return {
        ...prevState,
        [productId]: newImageIndex,
      };
    });
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-16">
        {product.map((item) => {
          const images = Array.isArray(item.pictures) ? item.pictures : [item.pictures];
          const currentImage = currentImages[item._id] || 0; // Get the current image for this product

          return (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto mb-4"
            >
              {/* Image Carousel */}
              <div className="relative">
                <img
                  src={host + images[currentImage]} // Use the current image in the carousel
                  alt="Product"
                  className="w-full h-56 object-cover transition-transform duration-300 ease-in-out"
                />

                {/* Only show arrows if more than one image */}
                {images.length > 1 && (
                  <>
                    {/* Previous Button */}
                    <button
                      onClick={() => handleImageChange(item._id, "prev")}
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
                    >
                      &lt;
                    </button>
                    {/* Next Button */}
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
              <div className="p-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Product Name */}
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                    {/* Product Price */}
                    <p className="text-lg text-gray-600">${item.price}</p>
                  </div>

                  {/* Product Description */}
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                </div>
                <div>
                  {/* Add to Cart Button */}
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-5 rounded-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 focus:outline-none">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
