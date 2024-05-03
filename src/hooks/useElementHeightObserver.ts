import { useEffect, useRef } from "react";

const useElementHeightObserver = (el: HTMLElement, cb: (height: number) => void) => {

  const observerRef = useRef<MutationObserver>()

  useEffect(() => {
    if (!el) {
      return;
    }
    observerRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          cb(el.offsetHeight);
        }
      });
    });
    const config = { attributes: true, subtree: true };

    observerRef.current.observe(el, config);

    return () => observerRef.current?.disconnect();
  }, [el, cb]);

  return observerRef.current
}

export default useElementHeightObserver