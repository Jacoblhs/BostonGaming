import React, { useState, useEffect } from 'react';
import useRequestData from '../hooks/useRequestData';

const CategoryModal = ({ onClose }) => {
  const { data: categories, makeRequest } = useRequestData();
  const [title, setTitle] = useState('');
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    makeRequest('http://localhost:5039/category', 'GET');
  }, [makeRequest]);

  const handleSave = async () => {
    const url = currentCategory ? `http://localhost:5039/category/admin/${currentCategory._id}` : 'http://localhost:5039/category/admin';
    const method = currentCategory ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    setCurrentCategory(null);
    setTitle('');
    makeRequest('http://localhost:5039/category', 'GET');
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5039/category/admin/${id}`, {
      method: 'DELETE',
    });

    makeRequest('http://localhost:5039/category', 'GET');
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setTitle(category.title);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center'>
      <div className='bg-zinc-900 text-white p-8 rounded'>
        <h2 className='text-2xl mb-4'>Manage Categories</h2>
        <input
          type='text'
          placeholder='Category Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='block w-full mb-4 p-2 border rounded bg-zinc-800 text-white'
        />
        <button onClick={handleSave} className='bg-blue-500 text-white px-4 py-2 rounded mr-4'>Save</button>
        <button onClick={onClose} className='bg-gray-500 text-white px-4 py-2 rounded'>Cancel</button>
        <div className='mt-4'>
          <h3 className='text-xl mb-2'>Existing Categories</h3>
          {categories && categories.map((category) => (
            <div key={category._id} className='flex justify-between items-center bg-zinc-800 p-2 rounded mb-2'>
              <span>{category.title}</span>
              <div>
                <button onClick={() => handleEdit(category)} className='bg-yellow-500 text-white px-2 py-1 rounded mr-2'>Edit</button>
                <button onClick={() => handleDelete(category._id)} className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
