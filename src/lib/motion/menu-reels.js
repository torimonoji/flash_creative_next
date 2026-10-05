import { createEffectScope } from "./scope";

export function initMenuReels() {
  const scope = createEffectScope();
  const requestAnimationFrame = scope.frame;
  const cancelAnimationFrame = scope.cancelFrame;
  const clearTimeout = scope.clearTimeout;
  const setTimeout = scope.timeout;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll(".main-menu a").forEach((link) => {
    const word = link.querySelector(".nav-word"),
      label = word.textContent;
    link.setAttribute("aria-label", label);
    word.setAttribute("aria-hidden", "true");
    word.textContent = "";
    const strips = [...label].map((char) => {
      const window = document.createElement("span");
      window.className = "reel-window";
      const strip = document.createElement("span");
      strip.className = "reel-strip";
      for (let i = 0; i < 3; i++) {
        const copy = document.createElement("span");
        copy.className = "reel-copy";
        copy.textContent = char === " " ? "\u00a0" : char;
        strip.appendChild(copy);
      }
      window.appendChild(strip);
      word.appendChild(window);
      return strip;
    });
    let animations = [];
    function reset() {
      animations.forEach((a) => a.cancel());
      animations = [];
    }
    function roll() {
      if (reduce.matches) return;
      reset();
      animations = strips.map((strip, index) => {
        const reverse = index % 2 === 1;
        const row = strip.firstElementChild.getBoundingClientRect().height;
        const distance = row * 2;
        return strip.animate(
          [
            {
              transform: `translateY(${reverse ? -distance : 0}px)`,
              filter: "blur(0px)",
              offset: 0,
            },
            { filter: "blur(1.6px)", offset: 0.3 },
            { filter: "blur(.6px)", offset: 0.68 },
            {
              transform: `translateY(${reverse ? 0 : -distance}px)`,
              filter: "blur(0px)",
              offset: 1,
            },
          ],
          {
            duration: 950,
            delay: index * 28,
            easing: "cubic-bezier(.22,.65,.18,1)",
            fill: "both",
          },
        );
      });
    }
    scope.cleanup(reset);
    scope.on(link, "pointerenter", roll);
    scope.on(link, "focus", roll);
    scope.on(document.querySelector("#menu"), "close", reset);
    scope.on(reduce, "change", reset);
    scope.on(window, "resize", reset);
    document.fonts.ready.then(() => {
      if (scope.active) reset();
    });
  });
  return () => scope.dispose();
}
