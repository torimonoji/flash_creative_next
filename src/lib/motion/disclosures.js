import { createEffectScope } from "./scope";

export function initDisclosures() {
  const scope = createEffectScope();
  const requestAnimationFrame = scope.frame;
  const cancelAnimationFrame = scope.cancelFrame;
  const clearTimeout = scope.clearTimeout;
  const setTimeout = scope.timeout;

  const fine = matchMedia("(hover: hover) and (pointer: fine)"),
    timers = new Map();
  let keyboard = false;
  scope.on(
    document,
    "keydown",
    () => {
      keyboard = true;
    },
    true,
  );
  scope.on(
    document,
    "pointerdown",
    () => {
      keyboard = false;
    },
    true,
  );
  const clear = (item) => {
    clearTimeout(timers.get(item));
    timers.delete(item);
  };
  const sync = (item) =>
    item
      .querySelector("summary")
      .setAttribute("aria-expanded", String(item.open));
  document.querySelectorAll(".service-list,.faq-list").forEach((group) => {
    const items = [...group.querySelectorAll("details")],
      service = group.classList.contains("service-list");
    const choose = (item, open) => {
      clear(item);
      if (open)
        items.forEach((other) => {
          if (other !== item) {
            clear(other);
            other.open = false;
            sync(other);
          }
        });
      item.open = open;
      sync(item);
    };
    items.forEach((item) => {
      if (service) item.open = false;
      sync(item);
      scope.on(item.querySelector("summary"), "click", (e) => {
        e.preventDefault();
        choose(item, !item.open);
      });
      scope.on(item, "toggle", () => {
        sync(item);
        if (item.open)
          items.forEach((other) => {
            if (other !== item && other.open) {
              clear(other);
              other.open = false;
              sync(other);
            }
          });
      });
      if (!service) return;
      scope.on(item, "pointerenter", (e) => {
        if (!fine.matches || e.pointerType === "touch") return;
        clear(item);
        timers.set(
          item,
          setTimeout(() => choose(item, true), 110),
        );
      });
      scope.on(item, "pointerleave", (e) => {
        if (!fine.matches || e.pointerType === "touch") return;
        clear(item);
        if (keyboard && item.contains(document.activeElement)) return;
        timers.set(
          item,
          setTimeout(() => choose(item, false), 160),
        );
      });
      scope.on(item, "focusin", () => {
        if (keyboard) choose(item, true);
      });
      scope.on(item, "focusout", (e) => {
        if (!item.contains(e.relatedTarget) && !item.matches(":hover"))
          choose(item, false);
      });
    });
  });
  const reset = () => timers.forEach((timer, item) => clear(item));
  scope.on(fine, "change", reset);
  scope.on(document, "visibilitychange", () => {
    if (document.hidden) reset();
  });
  return () => scope.dispose();
}
