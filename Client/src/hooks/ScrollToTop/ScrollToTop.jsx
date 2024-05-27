import React from 'react';
import useScrollToTop from "./useScrollToTop";

const ScrollToTopButton = () => {
  const { showScroll, scrollTop } = useScrollToTop();

  return (
    <>
      {showScroll && (
        <button
          className='fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow'
          onClick={scrollTop}
          title="Scroll To Top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
