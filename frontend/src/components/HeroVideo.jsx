import React, { useEffect, useRef, useState } from "react";

// Connection/device-aware hero video:
// - shows a lightweight poster frame immediately (no layout shift)
// - defers video load until idle/after first paint
// - picks 480p on small screens, 720p on larger
// - honors Save-Data and very slow networks (poster only)
export function HeroVideo({ className = "" }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const conn = navigator.connection || {};
    if (conn.saveData) return;
    if (conn.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const chosen = small ? "/brand/travis-480.mp4" : "/brand/travis-720.mp4";
    const start = () => setSrc(chosen);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback && window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    const onCan = () => {
      setReady(true);
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    v.addEventListener("loadeddata", onCan);
    v.src = src;
    v.load();
    return () => v.removeEventListener("loadeddata", onCan);
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      <img
        src="/brand/hero-frame.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      <video
        ref={ref}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        poster="/brand/hero-frame.jpg"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export default HeroVideo;
