import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (innerRef.current) {
        innerRef.current.style.left = `${e.clientX}px`;
        innerRef.current.style.top = `${e.clientY}px`;
      }
    };

    // Lerp outer cursor
    const animate = () => {
      outerPos.current.x += (mousePos.current.x - outerPos.current.x) * 0.12;
      outerPos.current.y += (mousePos.current.y - outerPos.current.y) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.left = `${outerPos.current.x}px`;
        outerRef.current.style.top = `${outerPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Hover detection
    const handleHover = () => setIsHovering(true);
    const handleUnhover = () => setIsHovering(false);

    const targets = document.querySelectorAll("a, button, [data-cursor-hover]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleUnhover);
    });

    const observer = new MutationObserver(() => {
      const newTargets = document.querySelectorAll("a, button, [data-cursor-hover]");
      newTargets.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleUnhover);
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleUnhover);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className={`cursor-outer ${isHovering ? "hovering" : ""}`}
        style={{ position: "fixed", pointerEvents: "none", zIndex: 9999 }}
      />
      <div
        ref={innerRef}
        className="cursor-inner"
        style={{ position: "fixed", pointerEvents: "none", zIndex: 9999 }}
      />
    </>
  );
}
