import React, { useState, useEffect } from 'react';
import useRequestData from '../hooks/useRequestData';
import ProductModal from '../components/ProductModal';
import CategoryModal from '../components/CategoryModal';
import { FaStar } from 'react-icons/fa';

const Products = () => {
  const { data: products, isLoading, error, makeRequest } = useRequestData();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    makeRequest('http://localhost:5039/product', 'GET');
  }, [makeRequest]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section id="products">
      <h2 className="uppercase font-bold text-4xl text-center mt-4 mb-2">Products</h2>
      <div className="flex justify-center items-center mb-4">
        <hr className="w-1/12 h-0 border-y-2 rounded" />
        <FaStar className="mx-2 text-4xl" />
        <hr className="w-1/12 h-0 border-y-2 rounded" />
      </div>

      <div className="flex justify-start mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowCategoryModal(true)}
        >
          Manage Categories
        </button>

      </div>

      {showCategoryModal && (
        <CategoryModal onClose={() => setShowCategoryModal(false)} />
      )}

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="flex flex-wrap w-10/12 m-auto justify-center">
        {!isLoading && !error && (!products || products.length === 0) && (
          <p>No products available.</p>
        )}
        {!isLoading && !error && products && products.map(product => (
          <div key={product._id} title='click to view' className="w-1/4 p-4 bg-zinc-800 rounded m-4 text-center cursor-pointer" onClick={() => handleProductClick(product)}>
            <h3 className='font-bold text-lg mb-2'>{product.title}</h3>
            <img 
              src={`http://localhost:5039/images/product/${product.productimage}`} 
              alt={product.title} 
              className='w-full h-48 object-cover rounded' />
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseProductModal} />
      )}
    </section>
  );
};

export default Products;
