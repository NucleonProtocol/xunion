import { useLayoutEffect } from 'react';
type Fn = () => void;

const useWindowLoad = (fn?: Fn) => {
  useLayoutEffect(() => {
    if (typeof window !== 'undefined' && typeof fn === 'function') {
      window.onload = fn;
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.onload = null;
      }
    };
  }, [fn]);
};

export default useWindowLoad;
