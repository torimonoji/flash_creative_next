import { initReveal } from "./reveal";
import { initServicePreview } from "./service-preview";
import { initProjectDistortion } from "./project-distortion";
import { initScrollTypography } from "./scroll-typography";
import { initHero } from "./hero";
import { initContactOrbit } from "./contact-orbit";
import { initDisclosures } from "./disclosures";

// Preserve declarative server markup across React Strict Mode and route changes.
export function initializeHomeInteractions() {
  const nodes = [
    ...document.querySelectorAll(
      "main, main *, .service-preview, .service-preview *",
    ),
  ];
  const attributes = nodes.map((node) => [
    node,
    [...node.attributes].map((attr) => [attr.name, attr.value]),
  ]);
  const textNodes = [
    ...document.querySelectorAll(
      ".section-heading h2,.studio-statement,.studio-copy h2",
    ),
  ];
  const content = textNodes.map((node) => [node, node.innerHTML]);
  const dispose = [];
  const reset = () => {
    dispose.reverse().forEach((fn) => fn());
    document.body.classList.remove(
      "motion-ready",
      "journey-pending",
      "journey-ready",
      "journey-travelling",
    );
    content.forEach(([node, markup]) => {
      node.innerHTML = markup;
    });
    attributes.forEach(([node, saved]) => {
      [...node.attributes].forEach((attr) => node.removeAttribute(attr.name));
      saved.forEach(([name, value]) => node.setAttribute(name, value));
    });
  };
  try {
    dispose.push(initReveal());
    dispose.push(initServicePreview());
    dispose.push(initProjectDistortion());
    dispose.push(initScrollTypography());
    dispose.push(initHero());
    dispose.push(initContactOrbit());
    dispose.push(initDisclosures());
  } catch (error) {
    reset();
    throw error;
  }
  return reset;
}
