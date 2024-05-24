import React from "react";
import { FaStar } from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <section id="contact" className="mt-20 min-h-96">
        <h2 className="uppercase font-bold text-4xl text-center mt-4 mb-2">
          Contact Us
        </h2>
        <div className="flex justify-center items-center mb-4">
          <hr className="w-1/12 h-0 border-y-2 rounded" />
          <FaStar className="mx-2 text-4xl" />
          <hr className="w-1/12 h-0 border-y-2 rounded" />
        </div>
      </section>
    </>
  );
};

export default Contact;
