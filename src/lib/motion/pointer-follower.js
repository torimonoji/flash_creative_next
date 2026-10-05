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
      const label = document.createElement("span");
      label.className = "pointer-project-label";
      label.textContent = "Explore project";
      el.appendChild(label);
      parent.appendChild(el);
      return el;
    },
  );
  let tx = 0,
    ty = 0,
    x = 0,
    y = 0,
    frame = 0,
    visible = false,
    project = false;
  function updateTarget(target) {
    project =
      !document.body.classList.contains("lock") &&
      target instanceof Element &&
      !!target.closest("[data-project-card]");
    const interactive =
      target instanceof Element && !!target.closest("a,button,summary");
    nodes.forEach((el) => {
      el.classList.toggle("is-project", project);
      el.classList.toggle("is-link", interactive);
    });
  }
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
      updateTarget(e.target);
      const radius = project ? 77 : 12;
      const offsetX = project ? 94 : 34,
        offsetY = e.clientY > innerHeight - 60 ? -34 : 24;
      tx = Math.max(
        radius + 8,
        Math.min(
          innerWidth - radius - 8,
          e.clientX +
            (e.clientX > innerWidth - radius * 2 - 24 ? -offsetX : offsetX),
        ),
      );
      ty = Math.max(36, Math.min(innerHeight - 36, e.clientY + offsetY));
      if (!visible) {
        x = tx;
        y = ty;
      }
      visible = true;
      if (!frame) frame = requestAnimationFrame(draw);
    },
    { passive: true },
  );
  function hide() {
    visible = false;
    cancelAnimationFrame(frame);
    frame = 0;
    project = false;
    nodes.forEach((el) =>
      el.classList.remove("is-visible", "is-project", "is-link"),
    );
  }
  scope.on(document, "pointerout", (e) => {
    if (!e.relatedTarget) hide();
  });
  scope.on(
    document,
    "pointerover",
    (e) => {
      if (fine.matches && e.pointerType !== "touch") updateTarget(e.target);
    },
    { passive: true },
  );
  scope.on(window, "blur", hide);
  scope.on(document, "click", hide);
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
