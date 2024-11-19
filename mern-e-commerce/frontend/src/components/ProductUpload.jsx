import React, { useState } from 'react';

const ProductUpload = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
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
    console.log('Product Submitted:', {
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
    <div className="flex space-x-10 p-10">
      {/* Left: Product Form */}
      <div className="w-1/2 space-y-6">
        <h2 className="text-2xl font-semibold text-center">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium">Product Name</label>
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
            <label className="block text-sm font-medium">Product Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium">Price ($)</label>
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
            <label className="block text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Choose one category</option>
              <option value="electronics">cars</option>
              <option value="clothing">pets</option>
              <option value="furniture">devices</option>
              <option value="beauty">shoes</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium">Product Images</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Product
          </button>
        </form>
      </div>

      {/* Right: Product Preview */}
      <div className="w-1/2 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-xl font-semibold text-center">Product Preview</h2>
        
        {/* Image Carousel */}
        {images.length > 0 && (
          <div className="relative mt-4">
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
                className="w-64 h-64 object-cover rounded-md"
              />
              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-0 bg-gray-700 text-white p-2 rounded-full"
              >
                &gt;
              </button>
            </div>
            <div className="flex justify-center mt-2 space-x-2">
              {/* Thumbnail Previews */}
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 p-1 rounded-md ${
                    currentImageIndex === index ? 'border-2 border-blue-500' : ''
                  }`}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          {/* Product Name */}
          {productName && (
            <div className="mb-2">
              <strong className="text-sm">Name:</strong>
              <p className="text-lg">{productName}</p>
            </div>
          )}

          {/* Product Description */}
          {productDescription && (
            <div className="mb-2">
              <strong className="text-sm">Description:</strong>
              <p className="text-sm text-gray-600">{productDescription}</p>
            </div>
          )}

          {/* Price */}
          {price && (
            <div className="mb-2">
              <strong className="text-sm">Price:</strong>
              <p className="text-lg font-semibold">${parseFloat(price).toFixed(2)}</p>
            </div>
          )}

          {/* Category */}
          {category && (
            <div className="mb-2">
              <strong className="text-sm">Category:</strong>
              <p className="text-sm text-gray-600">{category}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
