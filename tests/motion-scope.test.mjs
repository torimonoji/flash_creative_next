import test from "node:test";
import assert from "node:assert/strict";
import { createEffectScope } from "../src/lib/motion/scope.js";

test("feature unmount removes listeners, timers, frames and observers", () => {
  const frames = new Map(),
    timers = new Map(),
    observers = [];
  let id = 0,
    events = 0,
    work = 0,
    released = 0;
  class Observer {
    constructor(callback) {
      this.callback = callback;
      this.disconnected = false;
      observers.push(this);
    }
    disconnect() {
      this.disconnected = true;
    }
  }
  const previous = globalThis.window;
  globalThis.window = {
    requestAnimationFrame: (callback) => {
      frames.set(++id, callback);
      return id;
    },
    cancelAnimationFrame: (id) => frames.delete(id),
    setTimeout: (callback) => {
      timers.set(++id, callback);
      return id;
    },
    clearTimeout: (id) => timers.delete(id),
    IntersectionObserver: Observer,
    ResizeObserver: Observer,
    MutationObserver: Observer,
  };
  try {
    const scope = createEffectScope(),
      target = new EventTarget();
    scope.on(target, "click", () => events++);
    target.dispatchEvent(new Event("click"));
    assert.equal(events, 1);
    scope.frame(() => work++);
    scope.timeout(() => work++, 100);
    new scope.ResizeObserver(() => work++);
    scope.cleanup(() => released++);
    const staleFrame = [...frames.values()][0],
      staleTimer = [...timers.values()][0];
    scope.dispose();
    scope.dispose();
    target.dispatchEvent(new Event("click"));
    staleFrame();
    staleTimer();
    observers[0].callback();
    assert.equal(scope.active, false);
    assert.equal(events, 1);
    assert.equal(work, 0);
    assert.equal(released, 1);
    assert.equal(frames.size, 0);
    assert.equal(timers.size, 0);
    assert.equal(observers[0].disconnected, true);
    assert.equal(
      scope.frame(() => work++),
      0,
    );
  } finally {
    globalThis.window = previous;
  }
});
