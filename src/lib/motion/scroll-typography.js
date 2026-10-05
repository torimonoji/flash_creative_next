import { createEffectScope } from "./scope";

export function initScrollTypography() {
  const scope = createEffectScope();
  const requestAnimationFrame = scope.frame;
  const cancelAnimationFrame = scope.cancelFrame;
  const clearTimeout = scope.clearTimeout;
  const setTimeout = scope.timeout;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)"),
    section = document.querySelector(".type-interlude"),
    stage = section.firstElementChild;
  let frame = 0;
  function update() {
    frame = 0;
    if (reduced.matches || innerWidth <= 640) return;
    const r = section.getBoundingClientRect(),
      range = r.height + innerHeight,
      p = Math.max(0, Math.min(1, (innerHeight - r.top) / range));
    if (r.top < innerHeight && r.bottom > 0) {
      const travel = innerWidth * 0.26;
      section.style.setProperty("--track-a", `${-p * travel}px`);
      section.style.setProperty("--track-b", `${p * travel}px`);
      section.style.setProperty("--track-c", `${-p * travel * 0.7}px`);
      section.style.setProperty("--type-spin", `${p * 180}deg`);
    }
  }
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  function measure() {
    section.classList.toggle(
      "has-scroll-pin",
      !reduced.matches && innerWidth > 640,
    );
    if (reduced.matches || innerWidth <= 640) {
      ["--track-a", "--track-b", "--track-c", "--type-spin"].forEach((name) =>
        section.style.removeProperty(name),
      );
      return;
    }
    const height = stage.offsetHeight;
    // On very short landscape screens, keep the original flow so every line can be read.
    if (height > innerHeight * 0.95) {
      section.classList.remove("has-scroll-pin");
      schedule();
      return;
    }
    section.style.setProperty("--type-stage-height", `${height}px`);
    const compact = innerWidth <= 1024 && innerHeight <= 540;
    const hold = compact
      ? Math.min(260, Math.round(innerHeight * 0.3))
      : Math.round(innerHeight * 1.1);
    section.style.setProperty("--type-pin-distance", `${hold}px`);
    section.style.setProperty(
      "--type-pin-top",
      `${Math.max(0, (innerHeight - height) / 2)}px`,
    );
    schedule();
  }
  if ("IntersectionObserver" in window && !reduced.matches) {
    section.classList.add("type-reveal");
    const entrance = new scope.IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          section.classList.add("type-entered");
          entrance.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    entrance.observe(section);
  }
  scope.on(window, "scroll", schedule, { passive: true });
  scope.on(window, "resize", measure);
  scope.on(reduced, "change", measure);
  document.fonts.ready.then(() => {
    if (scope.active) measure();
  });
  measure();
  return () => scope.dispose();
}
