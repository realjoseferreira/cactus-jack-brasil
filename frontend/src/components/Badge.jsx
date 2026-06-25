import React from "react";

const STYLES = {
  new: "bg-sand text-ink",
  exclusive: "bg-blood text-bone",
  last: "bg-ink/80 text-sand border border-sand/40 backdrop-blur",
  limited: "bg-olive text-bone",
  soldout: "bg-ink/85 text-mute border border-muted2/50 backdrop-blur",
};

export function Badge({ badge, className = "" }) {
  return (
    <span
      data-testid={`badge-${badge.kind}`}
      className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${STYLES[badge.kind] || STYLES.limited} ${className}`}
    >
      {badge.label}
    </span>
  );
}

export default Badge;
