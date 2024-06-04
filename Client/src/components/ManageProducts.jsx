import React, { useState, useEffect } from 'react';
import useRequestData from '../hooks/useRequestData';
import EditProductModal from '../components/EditProductModal';

const ManageProducts = ({ onClose, onProductsUpdated }) => {
  const { data: products = [], isLoading, error, makeRequest } = useRequestData();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    makeRequest('http://localhost:5039/product', 'GET');
  }, [makeRequest]);

  const handleDelete = async (productId) => {
    await makeRequest(`http://localhost:5039/product/admin/${productId}`, 'DELETE');
    // Re-fetch products after deletion
    makeRequest('http://localhost:5039/product', 'GET');
  };

  const handleCreateProduct = async () => {
    const defaultProduct = {
      title: 'Nyt produkts title her',
      content: 'Produktets beskrivelse her',
      category: '66558ba0167ba22990e7483f',
      productimage: 'paavej.jpg',
    };
    await makeRequest('http://localhost:5039/product/admin', 'POST', defaultProduct);
    // Re-fetch products after creation
    makeRequest('http://localhost:5039/product', 'GET');
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    makeRequest('http://localhost:5039/product', 'GET');
    onProductsUpdated(); // Notify parent component to refresh products
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-zinc-800 p-4 rounded w-3/4 max-w-lg">
        <h2 className="text-white text-xl mb-4">Manage Products</h2>
        {isLoading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="flex justify-between mb-4">
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleCreateProduct}
          >
            Create Product
          </button>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded" 
            onClick={() => {
              onClose();
              onProductsUpdated(); // Notify parent component to refresh products
            }}
          >
            Close
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          {Array.isArray(products) && products.map(product => (
            <div key={product._id} className="flex items-center justify-between bg-zinc-700 p-2 rounded">
              <div className="flex items-center space-x-4">
                <img 
                  src={`http://localhost:5039/images/product/${product.productimage}`} 
                  alt={product.title} 
                  className="w-12 h-12 object-cover rounded" 
                />
                <span className="text-white">{product.title}</span>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="bg-yellow-500 text-white px-2 py-1 rounded" 
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded" 
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <EditProductModal 
            product={selectedProduct} 
            onClose={handleCloseEditModal}
          />
        )}

      </div>
    </div>
  );
};

export default ManageProducts;
