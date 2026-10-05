export function flipJourney(g, scroll, distance, vw, vh, bar) {
  const clamp = (n) => Math.min(1, Math.max(0, n)),
    ease = (n) => {
      const t = clamp(n);
      return t * t * (3 - 2 * t);
    },
    mix = (a, b, t) => a + (b - a) * t;
  const progress = clamp(scroll / distance),
    size = Math.min(320, vw * 0.52, vh * 0.43),
    sx = (vw - size) / 2,
    screenY = bar + (vh - bar - size) / 2;
  if (progress < 0.3) {
    const t = ease(progress / 0.3);
    return {
      x: mix(g.ax, sx, t),
      y: mix(g.ay, scroll + screenY - g.rootY, t),
      w: mix(g.aw, size, t),
      h: mix(g.ah, size, t),
      angle: 0,
    };
  }
  if (progress < 0.55)
    return {
      x: sx,
      y: scroll + screenY - g.rootY,
      w: size,
      h: size,
      angle: 180 * ease((progress - 0.3) / 0.25),
    };
  const t = ease((progress - 0.55) / 0.45),
    stageY = distance * 0.55 + screenY - g.rootY;
  return {
    x: mix(sx, g.bx, t),
    y: mix(stageY, g.by, t),
    w: mix(size, g.bw, t),
    h: mix(size, g.bh, t),
    angle: 180,
  };
}
