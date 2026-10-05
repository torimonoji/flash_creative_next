import test from "node:test";
import assert from "node:assert/strict";
import { flipJourney } from "../src/lib/motion/hero-geometry.js";

test("hero punctuation starts at its source and arrives at the project image", () => {
  const source = {
    ax: 80,
    ay: 160,
    aw: 24,
    ah: 24,
    bx: 40,
    by: 900,
    bw: 600,
    bh: 400,
    rootY: 0,
  };
  assert.deepEqual(flipJourney(source, 0, 800, 1440, 900, 0), {
    x: 80,
    y: 160,
    w: 24,
    h: 24,
    angle: 0,
  });
  assert.deepEqual(flipJourney(source, 800, 800, 1440, 900, 0), {
    x: 40,
    y: 900,
    w: 600,
    h: 400,
    angle: 180,
  });
  const before = flipJourney(source, 439.999, 800, 1440, 900, 0),
    after = flipJourney(source, 440.001, 800, 1440, 900, 0);
  assert.ok(
    Math.abs(before.x - after.x) < 0.01 && Math.abs(before.y - after.y) < 0.01,
  );
});
