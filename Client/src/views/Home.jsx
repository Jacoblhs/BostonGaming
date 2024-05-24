import React, { useState, useEffect } from "react";
import useRequestData from "../hooks/useRequestData";
import SliderModal from "../components/SliderModal";
import { FaStar } from "react-icons/fa";

const Home = () => {
  const { data: imageData, isLoading: isImageDataLoading, error: imageDataError, makeRequest } = useRequestData();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    makeRequest("http://localhost:5039/slider", "GET");
  }, [makeRequest]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imageData && imageData.length > 0) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageData.length);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [imageData]);

  const handleSliderUpdate = async () => {
    await makeRequest("http://localhost:5039/slider", "GET");
  };

  if (isImageDataLoading) {
    return <p>Loading...</p>;
  }

  if (imageDataError) {
    return <p>{imageDataError}</p>;
  }

  if (!imageData || imageData.length === 0) {
    return (
      <div>
        <p>No images available.</p>
        <button onClick={() => setShowModal(true)}>Manage Slider</button>
        {showModal && <SliderModal onClose={() => setShowModal(false)} onSliderUpdate={handleSliderUpdate} />}
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        className="sliderImg w-full h-full"
        src={`http://localhost:5039/images/slider/${imageData[currentImageIndex].sliderimage}`}
        alt={imageData[currentImageIndex].alttext}
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
        <div className="bg-black/75 text-center p-8 py-10">
          <h1 className="uppercase font-extrabold text-6xl mb-3">Boston Gaming</h1>
          <div className="flex justify-center items-center mb-4">
            <hr className="w-1/6 h-0 border-y-2 rounded" />
            <FaStar className="mx-2 text-4xl" />
            <hr className="w-1/6 h-0 border-y-2 rounded"/>
          </div>
          <p className="text-xl">Affordable - Professional - Aesthetic</p>
          <p className="text-xl">Let us build your next rig!</p>
        </div>
      </div>
      <button className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>
        Manage Slider
      </button>
      {showModal && <SliderModal onClose={() => setShowModal(false)} onSliderUpdate={handleSliderUpdate} />}
    </div>
  );
};

export default Home;
