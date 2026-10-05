import { createEffectScope } from "./scope";

export function initContactOrbit() {
  const scope = createEffectScope();
  const requestAnimationFrame = scope.frame;
  const cancelAnimationFrame = scope.cancelFrame;
  const clearTimeout = scope.clearTimeout;
  const setTimeout = scope.timeout;

  const orbit = document.querySelector(".contact-orbit");
  const button = document.querySelector("#start-project");
  if (!orbit || !button) return () => scope.dispose();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  let angle = -45,
    speed = 0,
    hovered = false,
    focused = false,
    frame = 0,
    last = 0;
  const paint = () => orbit.style.setProperty("--orbit-angle", `${angle}deg`);
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    speed = 0;
  }
  function draw(now) {
    frame = 0;
    if (
      document.hidden ||
      reduced.matches ||
      document.body.classList.contains("lock")
    ) {
      stop();
      angle = -45;
      paint();
      return;
    }
    const dt = last ? Math.min(40, now - last) : 16;
    last = now;
    const active = hovered || focused;
    if (active) {
      speed += (0.07 - speed) * (1 - Math.exp(-dt / 180));
      angle += speed * dt;
    } else {
      speed *= Math.exp(-dt / 120);
      const delta = ((((-45 - angle) % 360) + 540) % 360) - 180;
      angle += delta * (1 - Math.exp(-dt / 220));
      if (Math.abs(delta) < 0.05) {
        angle = -45;
        paint();
        stop();
        return;
      }
    }
    paint();
    frame = requestAnimationFrame(draw);
  }
  function start() {
    if (!frame && !reduced.matches && !document.hidden) {
      last = 0;
      frame = requestAnimationFrame(draw);
    }
  }
  scope.on(button, "pointerenter", (e) => {
    if (e.pointerType === "touch" || !fine.matches) return;
    hovered = true;
    start();
  });
  scope.on(button, "pointerleave", () => {
    hovered = false;
    start();
  });
  scope.on(button, "focus", () => {
    focused = button.matches(":focus-visible");
    if (focused) start();
  });
  scope.on(button, "blur", () => {
    focused = false;
    start();
  });
  scope.on(button, "click", () => {
    hovered = focused = false;
    stop();
    angle = -45;
    paint();
  });
  scope.on(reduced, "change", () => {
    stop();
    angle = -45;
    paint();
  });
  scope.on(fine, "change", () => {
    hovered = false;
    start();
  });
  scope.on(document, "visibilitychange", () => {
    if (document.hidden) stop();
    else if (hovered || focused) start();
  });
  return () => scope.dispose();
}
