import React from 'react';

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-zinc-800 text-white p-4 rounded w-1/3"> {/* Adjusted size to 50% */}
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <img
          src={`http://localhost:5039/images/product/${product.productimage}`}
          alt={product.title}
          className="w-full h-auto mb-2 rounded"
        />
        <p className="mb-2"><strong>Description:</strong> {product.content}</p>
        <p className="mb-2"><strong>Category:</strong> {product.category}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
