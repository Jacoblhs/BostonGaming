import React, { useState, useEffect } from "react";
import useRequestData from "../hooks/useRequestData";
import { FaStar } from "react-icons/fa";

const Home = () => {
  const {
    data: imageData,
    isLoading: isImageDataLoading,
    error: imageDataError,
  } = useRequestData();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageNames, setImageNames] = useState([
    "slider1.jpg",
    "slider2.jpg",
    "slider3.png",
    "slider4.jpg",
  ]);

  useEffect(() => {
    if (imageData && imageData.length > 0) {
      const names = imageData.map((image) => image.imageName);
      setImageNames(names);
    }
  }, [imageData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imageNames.length > 0) {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % imageNames.length
        );
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [imageNames]);

  if (isImageDataLoading) {
    return <p>Loading...</p>;
  }

  if (imageDataError) {
    return <p>{imageDataError}</p>;
  }

  if (!imageNames || imageNames.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <div className="relative">
      <img
        className="sliderImg w-full h-full"
        src={`http://localhost:5039/images/slider/${imageNames[currentImageIndex]}`}
        alt={`Slider Image ${currentImageIndex}`}
      />

      <div className="absolute -top-10 left-0 w-full h-full flex items-center justify-center text-white">
        <div className="bg-black/75 text-center p-8 py-10">
          <h1 className="uppercase font-extrabold text-6xl mb-3">Boston Gaming</h1>
          <div className='flex justify-center items-center mb-4'>
            <hr className='w-1/6 h-0 border-y-2 rounded' />
            <FaStar className='mx-2 text-4xl' />
            <hr className='w-1/6 h-0 border-y-2 rounded'/>
          </div>
          <p className="text-xl">Affordable - Proffesionel - Aesthetic</p>
          <p className="text-xl">Let us build your next rig!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
