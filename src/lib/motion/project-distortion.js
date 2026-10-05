import { createEffectScope } from "./scope";

export function initProjectDistortion() {
  const scope = createEffectScope();
  const requestAnimationFrame = scope.frame;
  const cancelAnimationFrame = scope.cancelFrame;
  const clearTimeout = scope.clearTimeout;
  const setTimeout = scope.timeout;

  ("use strict");
  const motion = matchMedia("(prefers-reduced-motion: reduce)"),
    pointer = matchMedia("(hover: hover) and (pointer: fine)");
  const vertex = `attribute vec2 a_position;
varying vec2 v_uv;
void main(){ v_uv=a_position*.5+.5; gl_Position=vec4(a_position,0.,1.); }`;
  const fragment = `precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_image;
uniform vec2 u_pointer;
uniform vec2 u_cover;
uniform float u_aspect;
uniform float u_strength;
uniform float u_time;
void main(){
 vec2 delta=v_uv-u_pointer;
 vec2 metric=vec2(delta.x*u_aspect,delta.y);
 float distanceToPointer=length(metric);
 float envelope=exp(-distanceToPointer*distanceToPointer*9.0);
 float wave=sin(distanceToPointer*22.0-u_time*3.2);
 vec2 direction=delta/(distanceToPointer+.08);
 vec2 swirl=vec2(-delta.y,delta.x)*.10;
 vec2 displaced=v_uv+(direction*wave*.038+swirl)*envelope*u_strength;
 vec2 uv=(displaced-.5)*u_cover+.5;
 vec2 fringe=direction*.0018*envelope*u_strength;
 vec3 color;
 color.r=texture2D(u_image,clamp(uv+fringe,.001,.999)).r;
 color.g=texture2D(u_image,clamp(uv,.001,.999)).g;
 color.b=texture2D(u_image,clamp(uv-fringe,.001,.999)).b;
 gl_FragColor=vec4(color,1.);
}`;
  const allowed = () => scope.active && pointer.matches && !motion.matches;
  document.querySelectorAll(".project-image").forEach((box) => {
    const image = box.querySelector("img"),
      button = box.closest("button,a"),
      heroLanding = button.classList.contains("project-one");
    const canHover = () =>
      allowed() &&
      (!heroLanding ||
        !document.body.matches(".journey-travelling, .journey-pending"));
    let canvas,
      gl,
      program,
      texture,
      locations,
      buffer,
      raf = 0,
      hovering = false,
      failed = false,
      preparation,
      strength = 0,
      px = 0.5,
      py = 0.5,
      tx = 0.5,
      ty = 0.5,
      start = 0,
      previousTime = 0;
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        throw Error("Shader unavailable");
      }
      return shader;
    };
    function resize() {
      if (!gl || !program) return;
      const r = box.getBoundingClientRect(),
        dpr = Math.min(devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(r.width * dpr)),
        height = Math.max(1, Math.round(r.height * dpr));
      // Setting either dimension clears the canvas, even when it is unchanged.
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;
      gl.viewport(0, 0, canvas.width, canvas.height);
      const aspect = r.width / r.height,
        source = image.naturalWidth / image.naturalHeight;
      gl.useProgram(program);
      gl.uniform1f(locations.aspect, aspect);
      gl.uniform2f(
        locations.cover,
        aspect < source ? aspect / source : 1,
        aspect < source ? 1 : source / aspect,
      );
      paint(performance.now());
    }
    function init() {
      if (gl) return true;
      if (failed) return false;
      try {
        canvas = document.createElement("canvas");
        canvas.className = "distortion-canvas";
        canvas.setAttribute("aria-hidden", "true");
        gl = canvas.getContext("webgl", {
          alpha: false,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: "low-power",
        });
        if (!gl) throw Error("WebGL unavailable");
        const vs = compile(gl.VERTEX_SHADER, vertex),
          fs = compile(gl.FRAGMENT_SHADER, fragment);
        program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS))
          throw Error("Program unavailable");
        gl.useProgram(program);
        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
          gl.STATIC_DRAW,
        );
        const position = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          image,
        );
        locations = {
          pointer: gl.getUniformLocation(program, "u_pointer"),
          cover: gl.getUniformLocation(program, "u_cover"),
          aspect: gl.getUniformLocation(program, "u_aspect"),
          strength: gl.getUniformLocation(program, "u_strength"),
          time: gl.getUniformLocation(program, "u_time"),
        };
        gl.uniform1i(gl.getUniformLocation(program, "u_image"), 0);
        box.appendChild(canvas);
        start = performance.now();
        resize();
        gl.flush();
        new scope.ResizeObserver(resize).observe(box);
        scope.on(canvas, "webglcontextlost", (e) => {
          e.preventDefault();
          failed = true;
          stop();
          gl = null;
        });
        return true;
      } catch {
        failed = true;
        canvas?.remove();
        gl = null;
        return false;
      }
    }
    function paint(now) {
      gl.useProgram(program);
      gl.uniform2f(locations.pointer, px, py);
      gl.uniform1f(locations.strength, strength);
      gl.uniform1f(locations.time, (now - start) * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    function draw(now) {
      if (!gl || !canHover()) {
        stop();
        return;
      }
      const elapsed = Math.min(64, Math.max(0, now - previousTime)),
        fade = 1 - Math.exp(-elapsed / 185),
        follow = 1 - Math.exp(-elapsed / 130);
      previousTime = now;
      strength += ((hovering ? 1 : 0) - strength) * fade;
      px += (tx - px) * follow;
      py += (ty - py) * follow;
      paint(now);
      if (hovering || strength > 0.003) raf = requestAnimationFrame(draw);
      else {
        raf = 0;
        strength = 0;
        paint(now);
        box.classList.remove("gl-active");
      }
    }
    function position(e) {
      const r = box.getBoundingClientRect();
      tx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      ty = 1 - Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    }
    function prepare() {
      if (!preparation)
        preparation = image.decode().then(
          () => {
            if (allowed()) return init();
            preparation = undefined;
            return false;
          },
          () => {
            preparation = undefined;
            return false;
          },
        );
      return preparation;
    }
    async function enter(e) {
      if (!canHover() || e.pointerType === "touch" || failed) return;
      hovering = true;
      position(e);
      if (!gl && !(await prepare())) {
        hovering = false;
        return;
      }
      if (!hovering || !canHover()) {
        hovering = false;
        return;
      }
      if (!raf) {
        px = tx;
        py = ty;
        start = performance.now();
        previousTime = start;
        draw(start);
      }
      box.classList.add("gl-active");
    }
    function stop() {
      hovering = false;
      strength = 0;
      cancelAnimationFrame(raf);
      raf = 0;
      box.classList.remove("gl-active");
    }
    scope.cleanup(() => {
      stop();
      if (gl) {
        gl.deleteTexture(texture);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
      canvas?.remove();
    });
    scope.on(box, "pointerenter", enter);
    scope.on(box, "pointermove", (e) => {
      position(e);
      if (!hovering) enter(e);
    });
    scope.on(box, "pointerleave", () => {
      hovering = false;
    });
    scope.on(button, "click", stop);
    scope.on(motion, "change", stop);
    scope.on(pointer, "change", stop);
    scope.on(document, "visibilitychange", () => {
      if (document.hidden) stop();
    });
    scope.on(window, "blur", stop);
    // Prepare the hero's landing image off the hover path, without revealing it.
    if (heroLanding && allowed()) {
      let idle = 0;
      const warm = () => prepare();
      const observer = new scope.IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer.disconnect();
          if (window.requestIdleCallback)
            idle = window.requestIdleCallback(warm, { timeout: 1000 });
          else setTimeout(warm, 200);
        },
        { rootMargin: "240px" },
      );
      observer.observe(box);
      scope.cleanup(() => {
        if (idle) window.cancelIdleCallback(idle);
      });
    }
  });
  return () => scope.dispose();
}
