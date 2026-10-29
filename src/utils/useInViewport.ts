import { useEffect, useState, RefObject } from "react";

export function useInViewport(
  ref: RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = { rootMargin: "150px" }
): boolean {
  const [isInViewport, setIsInViewport] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsInViewport(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options.rootMargin, options.threshold]);

  return isInViewport;
}
