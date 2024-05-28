import React, { useState, useEffect } from 'react';
import useRequestData from '../hooks/useRequestData';

const ManageProductsModal = ({ onClose }) => {
  const { data: products, makeRequest } = useRequestData();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    makeRequest('http://localhost:5039/product', 'GET');
    makeRequest('http://localhost:5039/category', 'GET');
  }, [makeRequest]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      content: product.content,
      category: product.category || '',
      image: null,
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5039/product/admin/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      setDeleteMessage(data.message);
      makeRequest('http://localhost:5039/product', 'GET');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('title', formData.title);
      formData.append('content', formData.content);
      formData.append('category', formData.category);
      formData.append('image', formData.image);

      const response = await fetch(`http://localhost:5039/product/admin/${selectedProduct._id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();
      console.log('Product updated:', data);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center'>
      <div className='bg-zinc-900 text-white p-8 rounded'>
        <h2 className='text-2xl mb-4'>Manage Products</h2>
        {deleteMessage && <p className="text-green-500 mb-4">{deleteMessage}</p>}
        <div className='mb-4'>
          {products &&
            products.map((product) => (
              <div key={product._id} className='flex justify-between items-center bg-zinc-800 p-4 rounded mb-4'>
                <div className='flex items-center space-x-4'>
                  <img 
                    src={`http://localhost:5039/images/product/${product.productimage}`} 
                    alt={product.title} 
                    className='w-16 h-16 object-cover rounded' />
                  <span>{product.title}</span>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(product)} className='bg-yellow-500 text-white px-2 py-1 rounded'>Edit</button>
                  <button onClick={() => handleDelete(product._id)} className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button>
                </div>
              </div>
            ))}
          {!products && <p>No products available.</p>}
        </div>
        <button onClick={onClose} className='bg-gray-500 text-white px-4 py-2 rounded'>Cancel</button>
      </div>
    </div>
  );
};

export default ManageProductsModal;
