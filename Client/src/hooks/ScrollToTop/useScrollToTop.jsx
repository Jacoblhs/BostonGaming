import { useState, useEffect } from 'react';

const useScrollToTop = (offset = 400) => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > offset) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= offset) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  return { showScroll, scrollTop };
};

export default useScrollToTop;
