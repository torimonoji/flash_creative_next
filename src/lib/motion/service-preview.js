import { createEffectScope } from "./scope";

export function initServicePreview() {
  const scope = createEffectScope();
  const requestAnimationFrame = scope.frame;
  const cancelAnimationFrame = scope.cancelFrame;
  const clearTimeout = scope.clearTimeout;
  const setTimeout = scope.timeout;

  const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
  const preview = document.querySelector(".service-preview"),
    previewFrame = preview.querySelector(".preview-frame"),
    previewImages = [...preview.querySelectorAll("img")],
    finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  let px = 0,
    py = 0,
    tx = 0,
    ty = 0,
    previewFrameId = 0,
    previewActive = false;
  function followPreview() {
    previewFrameId = 0;
    if (!previewActive || document.hidden) return;
    const dx = tx - px,
      dy = ty - py,
      settled = Math.abs(dx) + Math.abs(dy) <= 0.25;
    px = settled ? tx : px + dx * 0.14;
    py = settled ? ty : py + dy * 0.14;
    preview.style.transform = `translate3d(${px}px,${py}px,0)`;
    previewFrame.style.setProperty(
      "--tilt",
      `${settled ? 0 : Math.max(-5, Math.min(5, dx * 0.05))}deg`,
    );
    if (!settled) previewFrameId = requestAnimationFrame(followPreview);
  }
  function positionPreview(e) {
    const w = preview.offsetWidth,
      h = preview.offsetHeight;
    tx = Math.min(innerWidth - w - 20, Math.max(20, e.clientX + 32));
    ty = Math.min(innerHeight - h - 20, Math.max(20, e.clientY - h * 0.55));
  }
  function hidePreview() {
    previewActive = false;
    cancelAnimationFrame(previewFrameId);
    previewFrameId = 0;
    preview.classList.remove("active");
    previewFrame.style.setProperty("--tilt", "0deg");
  }
  document.querySelectorAll(".service-list details").forEach((row, i) => {
    const showPreview = (e) => {
      if (
        !finePointer.matches ||
        motionQuery.matches ||
        e.pointerType === "touch"
      )
        return;
      positionPreview(e);
      if (!previewActive) {
        px = tx;
        py = ty;
      }
      previewActive = true;
      previewImages.forEach((img, n) => {
        img.classList.toggle("shown", n === i % 2);
        img.style.objectPosition = i < 2 ? "center" : "65% center";
      });
      preview.classList.add("active");
      if (!previewFrameId)
        previewFrameId = requestAnimationFrame(followPreview);
    };
    scope.on(row, "pointerenter", showPreview);
    scope.on(row, "pointermove", showPreview);
    scope.on(row, "pointerleave", hidePreview);
  });
  scope.on(document, "visibilitychange", () => {
    if (document.hidden) hidePreview();
  });
  scope.on(
    window,
    "scroll",
    () => {
      if (!document.querySelector(".service-list details:hover")) hidePreview();
    },
    { passive: true },
  );
  scope.on(window, "blur", hidePreview);
  scope.on(finePointer, "change", hidePreview);
  scope.on(motionQuery, "change", hidePreview);

  // Short magnetic travel with a soft return; native focus and click remain intact.
  document
    .querySelectorAll(".pill,.case-close,.enquiry-close,.text-link")
    .forEach((button) => {
      button.classList.add("motion-button");
      scope.on(button, "pointermove", (e) => {
        if (
          motionQuery.matches ||
          !finePointer.matches ||
          e.pointerType === "touch"
        )
          return;
        const r = button.getBoundingClientRect();
        button.style.setProperty(
          "--magnet-x",
          `${Math.max(-5, Math.min(5, (e.clientX - r.left - r.width / 2) * 0.1))}px`,
        );
        button.style.setProperty(
          "--magnet-y",
          `${Math.max(-4, Math.min(4, (e.clientY - r.top - r.height / 2) * 0.13))}px`,
        );
      });
      const reset = () => {
        button.style.setProperty("--magnet-x", "0px");
        button.style.setProperty("--magnet-y", "0px");
      };
      scope.on(button, "pointerleave", reset);
      scope.on(button, "blur", reset);
    });

  return () => scope.dispose();
}
