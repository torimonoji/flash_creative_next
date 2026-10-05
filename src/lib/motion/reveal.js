import { createEffectScope } from "./scope";

export function initReveal() {
  const scope = createEffectScope();
  const requestAnimationFrame = scope.frame;
  const cancelAnimationFrame = scope.cancelFrame;
  const clearTimeout = scope.clearTimeout;
  const setTimeout = scope.timeout;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
  if (!reduce && "IntersectionObserver" in window) {
    document.body.classList.add("motion-ready");
    const observer = new scope.IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    document
      .querySelectorAll(".section-heading h2,.studio-statement,.studio-copy h2")
      .forEach((el) => {
        el.classList.add("scroll-heading");
        el.innerHTML = el.innerHTML
          .split("<br>")
          .map(
            (line) => `<span class="heading-mask"><span>${line}</span></span>`,
          )
          .join("");
      });
  }
  const progress = document.querySelector(".progress"),
    symbol = document.querySelector(".studio-symbol"),
    projectImages = [...document.querySelectorAll(".project-image")];
  let ticking = false;
  function updateScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    if (!motionQuery.matches) {
      symbol.style.setProperty("--rotation", `${scrollY * 0.045}deg`);
      projectImages.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight)
          el.style.setProperty(
            "--parallax",
            `${Math.max(-18, Math.min(18, (innerHeight / 2 - r.top - r.height / 2) * 0.045))}px`,
          );
      });
    }
    ticking = false;
  }
  scope.on(
    window,
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    },
    { passive: true },
  );
  updateScroll();
  return () => scope.dispose();
}
