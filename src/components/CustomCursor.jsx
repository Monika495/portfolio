import { useEffect, useRef } from "react";

/**
 * CustomCursor — drop this once anywhere in your App.jsx or layout.
 * It renders a small glowing dot that follows the mouse with a smooth lag.
 * On hover over links/buttons it expands into a ring.
 */
export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const hovering = useRef(false);

  useEffect(() => {
    // Hide native cursor everywhere
    document.body.style.cursor = "none";

    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      hovering.current = true;
    };
    const handleMouseLeave = () => {
      hovering.current = false;
    };

    // Track hoverable elements
    const addListeners = () => {
      document.querySelectorAll("a, button, [role=button]").forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
        el.style.cursor = "none";
      });
    };
    addListeners();

    // Re-add on DOM changes (for dynamic content)
    const mutObs = new MutationObserver(addListeners);
    mutObs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", handleMouseMove);

    // Animate loop — ring lags behind with lerp
    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      // Dot snaps instantly
      dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;

      // Ring lerps smoothly
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;

      const size = hovering.current ? 44 : 28;
      const offset = size / 2;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.transform = `translate(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px)`;
      ring.style.opacity = hovering.current ? "0.6" : "0.35";

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
      mutObs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#6366f1",
          pointerEvents: "none",
          zIndex: 99999,
          boxShadow: "0 0 8px 2px rgba(99,102,241,0.6)",
          transition: "transform 0.01s linear",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          border: "1.5px solid rgba(99,102,241,0.7)",
          pointerEvents: "none",
          zIndex: 99998,
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
};