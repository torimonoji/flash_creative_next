import { createEffectScope } from "./scope";

export function initPointerFollower() {
  const scope = createEffectScope();
  const requestAnimationFrame = scope.frame;
  const cancelAnimationFrame = scope.cancelFrame;
  const clearTimeout = scope.clearTimeout;
  const setTimeout = scope.timeout;

  const fine = matchMedia("(hover: hover) and (pointer: fine)"),
    reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const nodes = [document.body, ...document.querySelectorAll("dialog")].map(
    (parent) => {
      const el = document.createElement("div");
      el.className = "pointer-orbit";
      el.setAttribute("aria-hidden", "true");
      parent.appendChild(el);
      return el;
    },
  );
  let tx = 0,
    ty = 0,
    x = 0,
    y = 0,
    frame = 0,
    visible = false;
  function draw() {
    const blend = reduce.matches ? 1 : 0.13;
    x += (tx - x) * blend;
    y += (ty - y) * blend;
    nodes.forEach((el) => {
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
      el.classList.toggle("is-visible", visible);
    });
    if (visible && Math.abs(tx - x) + Math.abs(ty - y) > 0.15)
      frame = requestAnimationFrame(draw);
    else frame = 0;
  }
  scope.on(
    document,
    "pointermove",
    (e) => {
      if (!fine.matches || e.pointerType === "touch") return;
      const offsetX = e.clientX > innerWidth - 54 ? -34 : 34,
        offsetY = e.clientY > innerHeight - 44 ? -24 : 24;
      tx = e.clientX + offsetX;
      ty = e.clientY + offsetY;
      if (!visible) {
        x = tx;
        y = ty;
      }
      visible = true;
      const interactive = !!e.target.closest("a,button,summary");
      nodes.forEach((el) => el.classList.toggle("is-link", interactive));
      if (!frame) frame = requestAnimationFrame(draw);
    },
    { passive: true },
  );
  function hide() {
    visible = false;
    cancelAnimationFrame(frame);
    frame = 0;
    nodes.forEach((el) => el.classList.remove("is-visible"));
  }
  scope.on(document, "pointerout", (e) => {
    if (!e.relatedTarget) hide();
  });
  scope.on(window, "blur", hide);
  scope.on(document, "visibilitychange", () => {
    if (document.hidden) hide();
  });
  scope.on(fine, "change", hide);
  scope.on(document, "scroll", hide, { passive: true });
  scope.on(document, "keydown", (e) => {
    if (e.key === "Tab") hide();
  });
  scope.cleanup(() => nodes.forEach((node) => node.remove()));
  return () => scope.dispose();
}
