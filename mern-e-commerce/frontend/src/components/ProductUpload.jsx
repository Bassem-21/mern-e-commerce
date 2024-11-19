import React, { useState } from "react";
import Header from "./Header";

const ProductUpload = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    if (currentImageIndex >= newImages.length) {
      setCurrentImageIndex(newImages.length - 1); // Adjust the index if the last image is removed
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Submitted:", {
      name: productName,
      description: productDescription,
      price,
      category,
      images,
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
        <Header />
      </div>
      <div className="flex space-x-10 p-[50px] pb-[105px] mt-[53px] bg-[#15100C]  ">
        {/* Left: Product Form */}
        <div className="w-2/5 space-y-6">
          <h2 className="text-2xl font-semibold text-center text-[#FCAB2E]">
            Add New Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-[#FCAB2E] mb-2">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-sm font-medium text-[#FCAB2E] mb-2">
                Product Description
              </label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md resize-none"
                rows="2"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-[#FCAB2E] mb-2">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                min="0"
                step="0.01"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-[#FCAB2E] mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Choose one category</option>
                <option value="cars">cars</option>
                <option value="pets">pets</option>
                <option value="devices">devices</option>
                <option value="shoes">shoes</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="w-full p-2 border border-gray-300 rounded-md text-[#FCAB2E]">
              <label
                htmlFor="productImages"
                className="block text-sm font-medium cursor-pointer"
              >
               Add Product Images 
              </label>
              <input
                type="file"
                id="productImages"
                accept="image/*"
                onChange={handleImageChange}
                multiple
                className="hidden"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-[#ff9c08] text-white rounded-md hover:text-black"
            >
              Submit Product
            </button>
          </form>
        </div>





        {/* Right: Product Preview */}
        <div className="w-1/4 p-4 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold text-center text-[#FCAB2E] border-b">Product Preview</h2>

          {/* Image Carousel */}
          {images.length > 0 && (
            <div className="relative mt-4">
              {/* Remove Button (X) on the main image */}
              <button
                onClick={() => handleRemoveImage(currentImageIndex)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full text-xs"
              >
                X
              </button>

              <div className="flex items-center justify-center">
                {/* Previous Button */}
                <button
                  onClick={prevImage}
                  className="absolute left-0 bg-gray-700 text-white p-2 rounded-full"
                >
                  &lt;
                </button>
                {/* Display Current Image */}
                <img
                  src={URL.createObjectURL(images[currentImageIndex])}
                  alt={`Product Image ${currentImageIndex + 1}`}
                  className="w-[170px] h-[170px] object-cover rounded-md"
                />
                {/* Next Button */}
                <button
                  onClick={nextImage}
                  className="absolute right-0 bg-gray-700 text-white p-2 rounded-full"
                >
                  &gt;
                </button>
              </div>
              {/* <div className="flex justify-center mt-2 space-x-2"> */}
                {/* Thumbnail Previews */}
                {/* {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-[30px] h-[30px] p-1 rounded-md ${
                      currentImageIndex === index
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </button>
                ))}
              </div> */}
            </div>
          )}

          <div className="mt-4 flex flex-col items-center border-2 border-solid border-gray-400 p-4">
            {/* Product Name */}
            {productName && (
              <div className="mb-2 border-b-2">
                <strong className="text-sm text-[#FCAB2E]">Name:</strong>
                <p className="text-lg text-[#FCAB2E]">{productName}</p>
              </div>
            )}

            {/* Product Description */}
            {productDescription && (
              <div className="mb-2 flex flex-col items-center border-b-2">
                <strong className="text-sm text-[#FCAB2E]">Description:</strong>
                <p className="text-sm text-[#FCAB2E] ">{productDescription}</p>
              </div>
            )}

            {/* Price */}
            {price && (
              <div className="mb-2 flex flex-col items-center border-b-2">
                <strong className="text-sm text-[#FCAB2E]">Price:</strong>
                <p className="text-lg font-semibold text-[#FCAB2E]">
                  ${parseFloat(price).toFixed(2)}
                </p>
              </div>
            )}

            {/* Category */}
            {category && (
              <div className="mb-2 flex flex-col items-center border-b-2">
                <strong className="text-sm text-[#FCAB2E]">Category:</strong>
                <p className="text-sm text-[#FCAB2E]">{category}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
