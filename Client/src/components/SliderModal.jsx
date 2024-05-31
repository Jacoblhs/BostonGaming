import React, { useState, useEffect, useCallback } from "react";
import useRequestData from "../hooks/useRequestData";

const EditProductModal = ({ product, onClose }) => {
  const { data: categories = [], makeRequest } = useRequestData();
  const predefinedImages = ["paavej.jpg", "pc1.jpg"];
  const [editedProduct, setEditedProduct] = useState({
    title: product.title,
    content: product.content,
    category: product.category,
    productimage: product.productimage,
  });
  const [newImageFile, setNewImageFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(predefinedImages);

  useEffect(() => {
    makeRequest("http://localhost:5039/category", "GET");
  }, [makeRequest]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productimage" && files) {
      setNewImageFile(files[0]);
    } else {
      setEditedProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setEditedProduct((prevState) => ({
      ...prevState,
      category: checked ? value : null,
    }));
  };

  const handleSave = async () => {
    try {
      let imageUrl = editedProduct.productimage;

      if (newImageFile) {
        const formData = new FormData();
        formData.append("productimage", newImageFile);

        const response = await fetch("http://localhost:5039/images/product", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          imageUrl = data.imageUrl;
          setUploadedImages((prevImages) => [...prevImages, data.imageUrl]);
        } else {
          throw new Error("Image upload failed");
        }
      }

      const updatedProduct = {
        ...editedProduct,
        productimage: imageUrl,
      };

      await makeRequest(
        `http://localhost:5039/product/admin/${product._id}`,
        "PUT",
        updatedProduct
      );

      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-3/4 max-w-lg">
        <h2 className="text-white text-xl mb-4">Edit Product</h2>
        <div className="mb-4">
          <label className="text-gray-300 block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={editedProduct.title}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300 block mb-2">Content</label>
          <input
            type="text"
            name="content"
            value={editedProduct.content}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300 block mb-2">Product Image</label>
          <input
            type="file"
            name="productimage"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 mb-2"
          />
          <label className="text-gray-300 block mb-2">Or select from existing images</label>
          <select
            name="productimage"
            value={editedProduct.productimage}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          >
            <option value="">Select an image</option>
            {uploadedImages.map((image) => (
              <option key={image} value={image}>{image}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-gray-300 block mb-2">Category</label>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <div key={category._id} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  value={category._id}
                  checked={editedProduct.category === category._id}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-indigo-600 bg-gray-700 border-gray-600"
                />
                <span className="text-gray-300">{category.title}</span>
              </div>
            ))}
        </div>
        <div className="flex justify-between">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
