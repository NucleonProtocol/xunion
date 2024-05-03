import { useEffect, useMemo, useState } from 'react';

const useWindowScroll = () => {
  const [scrollTop, setTop] = useState(0);

  useEffect(() => {
    const handler = () => {
      if (typeof window !== 'undefined') {
        setTop(window.scrollY);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handler);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handler);
      }
    };
  }, []);

  const isScrollScreen = useMemo(() => {
    if (typeof window !== 'undefined') {
      return scrollTop > window.screenY;
    }
    return false;
  }, [scrollTop]);

  return { isScrollScreen, scrollTop };
};

export default useWindowScroll;
