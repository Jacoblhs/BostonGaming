import React, { useState, useEffect } from "react";
import useRequestData from "../hooks/useRequestData";

const EditProductModal = ({ product, onClose }) => {
  const { data: categories = [], makeRequest } = useRequestData();
  const [editedProduct, setEditedProduct] = useState({
    title: product.title,
    content: product.content,
    category: product.category,
    productimage: product.productimage,
  });
  const [newImageFile, setNewImageFile] = useState(null);

  useEffect(() => {
    makeRequest("http://localhost:5039/category", "GET");
  }, [makeRequest]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setEditedProduct((prevState) => ({
      ...prevState,
      category: checked ? value : null,
    }));
  };

  const handleFileChange = (e) => {
    setNewImageFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editedProduct.title);
      formData.append("content", editedProduct.content);
      formData.append("category", editedProduct.category);

      // If a new image file is selected, upload it
      if (newImageFile) {
        formData.append("productimage", newImageFile);
      } else {
        formData.append("productimage", editedProduct.productimage);
      }

      const response = await fetch(`http://localhost:5039/product/admin/${product._id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg w-3/4 max-w-lg">
        <h2 className="text-white text-xl mb-4">Edit Product</h2>
        <div className="mb-4">
          <label className="text-gray-300 block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={editedProduct.title}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-zinc-600"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300 block mb-2">Content</label>
          <input
            type="text"
            name="content"
            value={editedProduct.content}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300 block mb-2">Product Image</label>
          <input
            type="file"
            name="productimage"
            onChange={handleFileChange}
            className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 mb-2"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300 block mb-2">Category</label>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <div
                key={category._id}
                className="flex items-center space-x-2 mb-2"
              >
                <input
                  type="checkbox"
                  value={category._id}
                  checked={editedProduct.category === category._id}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-indigo-600 bg-zinc-700 border-zinc-600"
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
