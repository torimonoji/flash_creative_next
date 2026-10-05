// Feature-local ownership: every subscription and scheduled task is released on unmount.
export function createEffectScope() {
  let active = true;
  const cleanups = [],
    frames = new Set(),
    timers = new Set();
  const cleanup = (fn) => cleanups.push(fn);
  const observe = (BrowserObserver) =>
    class {
      constructor(callback, options) {
        const observer = new BrowserObserver((...args) => {
          if (active) callback(...args);
        }, options);
        cleanup(() => observer.disconnect());
        return observer;
      }
    };
  return {
    get active() {
      return active;
    },
    cleanup,
    on(target, event, callback, options) {
      const handler = (...args) => {
        if (active) return callback(...args);
      };
      target.addEventListener(event, handler, options);
      cleanup(() => target.removeEventListener(event, handler, options));
    },
    frame(callback) {
      if (!active) return 0;
      const id = window.requestAnimationFrame((time) => {
        frames.delete(id);
        if (active) callback(time);
      });
      frames.add(id);
      return id;
    },
    timeout(callback, delay) {
      if (!active) return 0;
      const id = window.setTimeout(() => {
        timers.delete(id);
        if (active) callback();
      }, delay);
      timers.add(id);
      return id;
    },
    cancelFrame(id) {
      window.cancelAnimationFrame(id);
      frames.delete(id);
    },
    clearTimeout(id) {
      window.clearTimeout(id);
      timers.delete(id);
    },
    IntersectionObserver: observe(window.IntersectionObserver),
    ResizeObserver: observe(window.ResizeObserver),
    MutationObserver: observe(window.MutationObserver),
    dispose() {
      if (!active) return;
      active = false;
      frames.forEach((id) => window.cancelAnimationFrame(id));
      timers.forEach((id) => window.clearTimeout(id));
      cleanups.reverse().forEach((fn) => fn());
    },
  };
}
