import React from "react";

export function SiteBackground() {
  return (
    <div className="bg-ambient" aria-hidden="true" data-testid="site-background">
      <div className="rays" />
      <div className="glow glow-a" />
      <div className="glow glow-b" />
    </div>
  );
}

export default SiteBackground;
