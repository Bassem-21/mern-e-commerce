import React, { useState } from "react";
import Header from "./Header";
import localhost from "./LocalHost";

const ProductUpload = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [pictures, setPictures] = useState([]);
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(false); 

  const handlePictureChange = (e) => { 
    const newPictures = Array.from(e.target.files); 
    setPictures((prevPictures) => [...prevPictures, ...newPictures]); 
  };

  const handleRemovePicture = (index) => { 
    const newPictures = pictures.filter((_, i) => i !== index); 
    setPictures(newPictures); 
    if (currentPictureIndex >= newPictures.length) {
      setCurrentPictureIndex(newPictures.length - 1); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send data to the backend
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", price);
    formData.append("category", category);

    // Append pictures to FormData
    pictures.forEach((picture) => { 
      formData.append("pictures", picture); 
    });

    try {
      setLoading(true);
      setError(null); // Clear any previous error
      setSuccess(false); // Reset success state before making a request

      // POST request to upload the product
      const response = await fetch(`${localhost}/product/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload product");
      }

      // If successful, set success state
      setSuccess(true);
      setLoading(false);
      // Reset form after successful upload
      setProductName("");
      setProductDescription("");
      setPrice("");
      setCategory("");
      setPictures([]); 
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const nextPicture = () => { // Changed 'image' to 'picture'
    setCurrentPictureIndex((prevIndex) =>
      prevIndex === pictures.length - 1 ? 0 : prevIndex + 1 
    );
  };

  const prevPicture = () => { // Changed 'image' to 'picture'
    setCurrentPictureIndex((prevIndex) =>
      prevIndex === 0 ? pictures.length - 1 : prevIndex - 1 
    );
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
        <Header />
      </div>
      <div className="flex space-x-10 p-[50px] pb-[105px] mt-[53px] bg-primary">
        {/* Left: Product Form */}
        <div className="w-2/5 space-y-6 bg-secondary p-4 rounded">
          <h2 className="text-2xl font-semibold text-center text-text">
            Add New Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">Product Name</label>
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
              <label className="block text-sm font-medium text-text mb-2">
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
              <label className="block text-sm font-medium text-text mb-2">Price ($)</label>
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
              <label className="block text-sm font-medium text-text mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Choose one category</option>
                <option value="cars">cars</option>
                <option value="gadgets">gadgets</option>
                <option value="devices">devices</option>
                <option value="shoes">shoes</option>
              </select>
            </div>

            {/* Picture Upload */}
            <div className="w-full p-2 border border-gray-300 rounded-md text-text">
              <label
                htmlFor="productPictures"
                className="block text-sm font-medium cursor-pointer"
              >
               Add Product Pictures  {/* Changed 'Images' to 'Pictures' */}
              </label>
              <input
                type="file"
                id="productPictures" // Changed 'productImages' to 'productPictures'
                accept="image/*"
                onChange={handlePictureChange} // Changed 'handleImageChange' to 'handlePictureChange'
                multiple
                className="hidden"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-text text-white rounded-md hover:bg-[#ff4d2d]"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Uploading..." : "Submit Product"}
            </button>

            {/* Error and Success Messages */}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {success && <div className="text-green-500 text-sm mt-2">Product uploaded successfully!</div>}
          </form>
        </div>

        {/* Right: Product Preview */}
        <div className="w-1/4 p-4 border border-gray-300 rounded-lg bg-secondary">
          <h2 className="text-xl font-semibold text-center text-text border-b">Product Preview</h2>

          {/* Picture Carousel */}
          {pictures.length > 0 && ( // Changed 'images' to 'pictures'
            <div className="relative mt-4">
              <button
                onClick={() => handleRemovePicture(currentPictureIndex)} // Changed 'handleRemoveImage' to 'handleRemovePicture'
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full text-xs"
              >
                X
              </button>

              <div className="flex items-center justify-center">
                <button
                  onClick={prevPicture} // Changed 'prevImage' to 'prevPicture'
                  className="absolute left-0 bg-gray-700 text-white p-2 rounded-full"
                >
                  &lt;
                </button>
                <img
                  src={URL.createObjectURL(pictures[currentPictureIndex])} // Changed 'images' to 'pictures'
                  alt={`Product Picture ${currentPictureIndex + 1}`} // Changed 'image' to 'picture'
                  className="w-[170px] h-[170px] object-cover rounded-md"
                />
                <button
                  onClick={nextPicture} // Changed 'nextImage' to 'nextPicture'
                  className="absolute right-0 bg-gray-700 text-white p-2 rounded-full"
                >
                  &gt;
                </button>
              </div>
              <div className="flex justify-center mt-2 space-x-2">
                {pictures.map((picture, index) => ( // Changed 'images' to 'pictures'
                  <button
                    key={index}
                    onClick={() => setCurrentPictureIndex(index)} // Changed 'setCurrentImageIndex' to 'setCurrentPictureIndex'
                    className={`w-[30px] h-[30px] p-1 rounded-md ${
                      currentPictureIndex === index ? "border-2 border-blue-500" : ""
                    }`}
                  >
                    <img
                      src={URL.createObjectURL(picture)} // Changed 'image' to 'picture'
                      alt={`Thumbnail ${index + 1}`} // Changed 'image' to 'picture'
                      className="w-full h-full object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-col items-center border-2 border-solid border-gray-400 p-4">
            {productName && (
              <div className="mb-2 border-b-2">
                <strong className="text-sm text-text">Name:</strong>
                <p className="text-lg text-text">{productName}</p>
              </div>
            )}
            {productDescription && (
              <div className="mb-2 flex flex-col items-center border-b-2">
                <strong className="text-sm text-text">Description:</strong>
                <p className="text-sm text-text ">{productDescription}</p>
              </div>
            )}
            {price && (
              <div className="mb-2 flex flex-col items-center border-b-2">
                <strong className="text-sm text-text">Price:</strong>
                <p className="text-lg font-semibold text-text">
                  ${parseFloat(price).toFixed(2)}
                </p>
              </div>
            )}
            {category && (
              <div className="mb-2 flex flex-col items-center border-b-2">
                <strong className="text-sm text-text">Category:</strong>
                <p className="text-sm text-text">{category}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
