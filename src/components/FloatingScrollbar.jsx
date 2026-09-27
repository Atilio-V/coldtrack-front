import { useEffect, useState, useRef, useCallback } from "react";

export default function FloatingScrollbar() {
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const scrollStartYRef = useRef(0);

  const updateScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight <= clientHeight) {
      setIsScrollable(false);
      return;
    }
    setIsScrollable(true);
    const minHeight = 40;
    const computedHeight = Math.max((clientHeight / scrollHeight) * clientHeight, minHeight);
    const maxScroll = scrollHeight - clientHeight;
    const maxThumbTop = clientHeight - computedHeight;
    const computedTop = maxScroll > 0 ? (scrollTop / maxScroll) * maxThumbTop : 0;

    setThumbHeight(computedHeight);
    setThumbTop(computedTop);
  }, []);

  useEffect(() => {
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    const observer = new ResizeObserver(updateScroll);
    if (document.body) {
      observer.observe(document.body);
    }

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      observer.disconnect();
    };
  }, [updateScroll]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    scrollStartYRef.current = window.scrollY;

    const handleMouseMove = (event) => {
      if (!isDraggingRef.current) return;
      const { scrollHeight, clientHeight } = document.documentElement;
      const deltaY = event.clientY - dragStartYRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const maxThumbTop = clientHeight - thumbHeight;
      if (maxThumbTop <= 0) return;
      const scrollRatio = maxScroll / maxThumbTop;
      window.scrollTo(0, scrollStartYRef.current + deltaY * scrollRatio);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  if (!isScrollable) return null;

  return (
    <div className="fixed right-1 top-0 bottom-0 w-1.5 z-[9999] pointer-events-none select-none">
      <div
        onMouseDown={handleMouseDown}
        style={{
          transform: `translateY(${thumbTop}px)`,
          height: `${thumbHeight}px`,
        }}
        className="w-full rounded-full bg-slate-400/40 hover:bg-slate-400/70 dark:bg-slate-400/30 dark:hover:bg-slate-300/60 pointer-events-auto cursor-pointer transition-colors duration-150"
      />
    </div>
  );
}
