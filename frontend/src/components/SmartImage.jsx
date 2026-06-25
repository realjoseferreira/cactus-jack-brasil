import React, { useState } from "react";

export function SmartImage({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  eager = false,
  sizes,
  width,
  height,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-surface2 ${className}`}>
      <div
        className={`absolute inset-0 bg-gradient-to-br from-surface2 to-surface transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100 animate-pulse"
        }`}
        aria-hidden="true"
      />
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        sizes={sizes}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        className={`block transition-all duration-700 ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"} ${imgClassName}`}
      />
    </div>
  );
}

export default SmartImage;
