import { useCallback } from 'react';

type ScrollDirection = 'vertical' | 'horizontal';

const useSmoothScroll = (
    direction: ScrollDirection,
    scrollEl?: HTMLDivElement,
) => {
    const scrollTo = useCallback((target: number, duration: number) => {
        if (scrollEl) {
            const scrollContainer = scrollEl;
            const start = direction === 'vertical' ? scrollContainer.scrollTop : scrollContainer.scrollLeft;
            const distance = target - start;
            const startTime = performance.now();

            const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

            const scrollStep = (currentTime: number) => {
                const elapsedTime = currentTime - startTime;
                const scrollAmount = easeInOutQuad(Math.min(1, elapsedTime / duration)) * distance;

                if (direction === 'vertical') {
                    scrollContainer.scrollTop = start + scrollAmount;
                } else {
                    scrollContainer.scrollLeft = start + scrollAmount;
                }

                if (elapsedTime < duration) {
                    requestAnimationFrame(scrollStep);
                }
            };

            requestAnimationFrame(scrollStep);
        }
    }, [scrollEl, direction]);

    return scrollTo;
};


export default useSmoothScroll
