import { useEffect, useState } from 'react';

const useFooter = () => {
  const [isFooterFixed, setIsFooterFixed] = useState(false);

  const footerUpdate = () => {
    if (window.innerHeight >= document.body.scrollHeight + 88) {
      document.body.style.minHeight = `${window.innerHeight}px`;
      setIsFooterFixed(true);
    } else {
      document.body.style.minHeight = '';
      setIsFooterFixed(false);
    }
  };

  useEffect(() => {
    footerUpdate;
  }, []);

  return {
    isFooterFixed,
    setIsFooterFixed,
    footerUpdate,
  };
};

export default useFooter;
