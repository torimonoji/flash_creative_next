import { createEffectScope } from "./scope";
import { flipJourney } from "./hero-geometry";

export function initHero() {
  const scope = createEffectScope();
  const requestAnimationFrame = scope.frame;
  const cancelAnimationFrame = scope.cancelFrame;
  const clearTimeout = scope.clearTimeout;
  const setTimeout = scope.timeout;

  const hero = document.querySelector(".hero-lab");
  const dot = hero.querySelector("#heroDot");
  const target = document.querySelector(".project-one .project-image");
  const lines = [...hero.querySelectorAll("h1 > span")];
  const intro = hero.querySelector(".lab-intro");
  const side = hero.querySelector(".lab-side-copy");
  const openingHeader = document.querySelector("header");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const flight = document.createElement("div");
  flight.className = "hero-flip-flight";
  flight.setAttribute("aria-hidden", "true");
  flight.innerHTML =
    '<div class="hero-flip-inner"><div class="hero-flip-front"></div><div class="hero-flip-back"></div></div>';
  const image = target.querySelector("img").cloneNode();
  image.alt = "";
  image.removeAttribute("loading");
  flight.querySelector(".hero-flip-back").append(image);
  const flip = flight.firstElementChild;
  document.body.append(flight);
  scope.cleanup(() => flight.remove());
  let geometry,
    distance = 1,
    ready = false,
    settled = false,
    frame = 0,
    measureFrame = 0;
  document.body.classList.add("journey-pending");
  const clamp = (n) => Math.min(1, Math.max(0, n));
  function render() {
    frame = 0;
    const animated = ready && geometry && !reduced.matches;
    const arrived = !animated || scrollY >= distance;
    document.body.classList.toggle("journey-ready", !!animated);
    document.body.classList.toggle(
      "journey-travelling",
      !!animated && !arrived,
    );
    document.body.classList.toggle(
      "journey-pending",
      !reduced.matches && (!settled || (!!animated && !arrived)),
    );
    flight.style.visibility = animated && !arrived ? "visible" : "hidden";
    if (animated && !arrived) {
      const pose = flipJourney(
        geometry,
        scrollY,
        distance,
        innerWidth,
        innerHeight,
        0,
      );
      Object.assign(flight.style, {
        width: pose.w + "px",
        height: pose.h + "px",
        transform: `translate3d(${pose.x}px,${pose.y - scrollY}px,0)`,
      });
      flip.style.transform = `rotateY(${pose.angle}deg)`;
    }
    const p = reduced.matches ? 0 : clamp(scrollY / (innerHeight * 0.7));
    lines.forEach((line, i) => {
      line.style.transform = `translate3d(${(i ? 1 : -1) * innerWidth * 0.24 * p}px,0,0)`;
      line.style.opacity = 1 - p;
    });
    intro.style.opacity = side.style.opacity = Math.max(0, 1 - p * 1.8);
  }
  function measure() {
    measureFrame = 0;
    measureHeroDistortion();
    // Measure untransformed punctuation, avoiding drift when resizing mid-scroll.
    lines.forEach((line) => (line.style.transform = "none"));
    const a = dot.getBoundingClientRect(),
      b = target.getBoundingClientRect();
    geometry = {
      ax: a.left,
      ay: a.top + scrollY,
      aw: a.width,
      ah: a.height,
      bx: b.left,
      by: b.top + scrollY,
      bw: b.width,
      bh: b.height,
      rootY: 0,
    };
    distance = Math.max(300, geometry.by - innerHeight * 0.2);
    render();
  }
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };
  const scheduleMeasure = () => {
    if (!measureFrame) measureFrame = requestAnimationFrame(measure);
  };
  scope.on(window, "scroll", schedule, { passive: true });
  scope.on(window, "resize", scheduleMeasure);
  scope.on(window, "pageshow", scheduleMeasure);
  scope.on(reduced, "change", scheduleMeasure);
  new scope.ResizeObserver(scheduleMeasure).observe(target);
  new scope.ResizeObserver(scheduleMeasure).observe(hero);
  new scope.ResizeObserver(scheduleMeasure).observe(openingHeader);
  Promise.all([document.fonts.ready, image.decode()])
    .then(() => {
      if (!scope.active) return;
      ready = true;
      settled = true;
      scheduleMeasure();
    })
    .catch(() => {
      if (!scope.active) return;
      ready = false;
      settled = true;
      scheduleMeasure();
    });

  // Local refraction follows the same envelope, wave and swirl as Selected Work.
  const localTitle = hero.querySelector(".lab-title"),
    field = document.querySelector("#heroDisplacementField"),
    displacement = document.querySelector("#heroLocalDisplacement"),
    localFilter = document.querySelector("#heroLocalWarp"),
    fine = matchMedia("(hover: hover) and (pointer: fine)");
  let fields = [],
    fieldTask = null,
    localFrame = 0,
    hovering = false,
    strength = 0,
    px = 0,
    py = 0,
    tx = 0,
    ty = 0,
    fieldSize = 0,
    start = 0,
    lastPhase = -1;
  function measureHeroDistortion() {
    const r = localTitle.getBoundingClientRect();
    fieldSize = Math.min(640, Math.max(300, r.width * 0.48));
    localFilter.setAttribute("width", String(r.width + 128));
    localFilter.setAttribute("height", String(r.height + 128));
    field.setAttribute("width", String(fieldSize));
    field.setAttribute("height", String(fieldSize));
  }
  function prepareFields() {
    if (fieldTask) return fieldTask;
    fieldTask = (async () => {
      const size = 128,
        count = 64,
        canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      canvas.width = canvas.height = size;
      const pixels = ctx.createImageData(size, size),
        vectors = [];
      for (let y = 0; y < size; y++)
        for (let x = 0; x < size; x++) {
          const dx = (x + 0.5) / size - 0.5,
            dy = (y + 0.5) / size - 0.5,
            d = Math.hypot(dx, dy),
            t = Math.max(0, Math.min(1, (0.5 - d) / 0.08)),
            envelope = Math.exp(-d * d * 9) * t * t * (3 - 2 * t);
          vectors.push([
            dx / (d + 0.08),
            dy / (d + 0.08),
            -dy * 0.1,
            dx * 0.1,
            envelope,
            d * 22,
          ]);
        }
      for (let phase = 0; phase < count; phase++) {
        if (!scope.active) return;
        const time = (phase / count) * Math.PI * 2;
        vectors.forEach(([dx, dy, sx, sy, envelope, radius], index) => {
          const wave = Math.sin(radius - time),
            i = index * 4;
          pixels.data[i] = Math.round(
            128 + (dx * wave * 0.038 + sx) * envelope * 1020,
          );
          pixels.data[i + 1] = Math.round(
            128 + (dy * wave * 0.038 + sy) * envelope * 1020,
          );
          pixels.data[i + 2] = 128;
          pixels.data[i + 3] = 255;
        });
        ctx.putImageData(pixels, 0, 0);
        fields.push(canvas.toDataURL("image/png"));
        // Build once in small batches; pointer frames only reuse cached fields.
        if (phase % 8 === 7)
          await new Promise((resolve) => setTimeout(resolve, 0));
      }
    })();
    return fieldTask;
  }
  function stopLocal() {
    cancelAnimationFrame(localFrame);
    localFrame = 0;
    hovering = false;
    strength = 0;
    displacement.setAttribute("scale", "0");
  }
  function drawLocal(now) {
    localFrame = 0;
    if (
      document.hidden ||
      reduced.matches ||
      !fine.matches ||
      document.body.classList.contains("lock") ||
      scrollY > innerHeight * 0.15
    ) {
      stopLocal();
      return;
    }
    strength += ((hovering ? 1 : 0) - strength) * 0.085;
    px += (tx - px) * 0.12;
    py += (ty - py) * 0.12;
    field.setAttribute("x", String(px - fieldSize / 2));
    field.setAttribute("y", String(py - fieldSize / 2));
    const phase = Math.floor(
      ((((now - start) * 0.0032) / (Math.PI * 2)) % 1) * fields.length,
    );
    if (phase !== lastPhase) {
      field.setAttribute("href", fields[phase]);
      lastPhase = phase;
    }
    displacement.setAttribute("scale", String((fieldSize * strength) / 4));
    if (hovering || strength > 0.003)
      localFrame = requestAnimationFrame(drawLocal);
    else stopLocal();
  }
  async function enterLocal(event) {
    if (
      event.pointerType === "touch" ||
      reduced.matches ||
      !fine.matches ||
      document.hidden ||
      document.body.classList.contains("lock") ||
      scrollY > innerHeight * 0.15
    )
      return;
    const r = localTitle.getBoundingClientRect();
    tx = event.clientX - r.left;
    ty = event.clientY - r.top;
    hovering = true;
    await prepareFields();
    if (
      !scope.active ||
      !hovering ||
      !fields.length ||
      reduced.matches ||
      !fine.matches
    )
      return;
    if (!localFrame) {
      px = tx;
      py = ty;
      start = performance.now();
      lastPhase = -1;
      localFrame = requestAnimationFrame(drawLocal);
    }
  }
  scope.on(hero, "pointerenter", enterLocal, { passive: true });
  scope.on(
    hero,
    "pointermove",
    (event) => {
      if (event.pointerType === "touch" || !fine.matches || reduced.matches)
        return;
      if (!hovering) {
        enterLocal(event);
        return;
      }
      const r = localTitle.getBoundingClientRect();
      tx = event.clientX - r.left;
      ty = event.clientY - r.top;
    },
    { passive: true },
  );
  scope.on(hero, "pointerleave", () => {
    hovering = false;
  });
  scope.on(reduced, "change", stopLocal);
  scope.on(fine, "change", stopLocal);
  scope.on(document, "visibilitychange", () => {
    if (document.hidden) stopLocal();
  });
  scope.on(window, "blur", stopLocal);
  scope.on(
    window,
    "scroll",
    () => {
      if (scrollY > innerHeight * 0.15) stopLocal();
    },
    { passive: true },
  );
  new scope.MutationObserver(() => {
    if (document.body.classList.contains("lock")) stopLocal();
  }).observe(document.body, { attributes: true, attributeFilter: ["class"] });

  scheduleMeasure();
  return () => scope.dispose();
}
