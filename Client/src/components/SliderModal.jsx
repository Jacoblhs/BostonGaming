import React, { useState, useEffect, useCallback } from "react";
import useRequestData from "../hooks/useRequestData";

const SliderModal = ({ onClose, onSliderUpdate }) => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [newSlider, setNewSlider] = useState({ alttext: "", sliderimage: null });
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlider, setCurrentSlider] = useState(null);

  const fetchSliders = useCallback(async () => {
    await makeRequest("http://localhost:5039/slider", "GET");
  }, [makeRequest]);

  useEffect(() => {
    fetchSliders();
  }, [fetchSliders]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const imageFile = files ? files[0] : null;
    setNewSlider((prev) => ({ ...prev, [name]: value, sliderimage: imageFile }));
  };

  const handleCreateOrUpdate = async () => {
    const formData = new FormData();
    formData.append("alttext", newSlider.alttext);
    formData.append("sliderimage", newSlider.sliderimage);

    if (isEditing && currentSlider) {
      await makeRequest(`http://localhost:5039/slider/admin/${currentSlider._id}`, "PUT", formData);
    } else {
      if (!newSlider.sliderimage) {
        // Handle case where no image is selected
        return;
      }
      await makeRequest("http://localhost:5039/slider/admin", "POST", formData);
    }
    await onSliderUpdate();
    resetForm();
    fetchSliders();
  };

  const handleEdit = (slider) => {
    setIsEditing(true);
    setCurrentSlider(slider);
    setNewSlider({ alttext: slider.alttext, sliderimage: null });
  };

  const handleDelete = async (id) => {
    await makeRequest(`http://localhost:5039/slider/admin/${id}`, "DELETE");
    await onSliderUpdate();
    fetchSliders();
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentSlider(null);
    setNewSlider({ alttext: "", sliderimage: null });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-zinc-800 p-8 rounded shadow-lg w-96 text-white">
        <h2 className="text-2xl mb-4">{isEditing ? "Edit Slider" : "Add New Slider"}</h2>
        <input
          type="text"
          name="alttext"
          value={newSlider.alttext}
          onChange={handleInputChange}
          placeholder="Alt Text"
          className="w-full mb-4 p-2 border border-gray-600 bg-gray-700 text-white"
        />
        <input
          type="file"
          name="sliderimage"
          accept="image/*"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-600 bg-gray-700 text-white"
          multiple
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleCreateOrUpdate}
        >
          {isEditing ? "Update" : "Add"}
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
        <h3 className="text-xl mt-4">Existing Sliders</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {data && data.length > 0 ? (
              data.map((slider) => (
                <li key={slider._id} className="flex justify-between items-center my-2">
                  <img
                    src={`http://localhost:5039/images/slider/${slider.sliderimage}`}
                    alt={slider.alttext}
                    className="w-16 h-16 object-cover"
                  />
                  <span className="flex-1 mx-2">{slider.alttext}</span>
                  <div>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleEdit(slider)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(slider._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No sliders available.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SliderModal;