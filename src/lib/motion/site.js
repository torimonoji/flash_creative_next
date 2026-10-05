import { initNavigation } from "./navigation";
import { initPointerFollower } from "./pointer-follower";
import { initMenuReels } from "./menu-reels";

export function initializeSiteInteractions() {
  const words = [...document.querySelectorAll(".nav-word")].map((node) => [
    node,
    node.innerHTML,
  ]);
  const dispose = [initNavigation(), initPointerFollower(), initMenuReels()];
  return () => {
    dispose.reverse().forEach((fn) => fn());
    words.forEach(([node, markup]) => {
      node.innerHTML = markup;
    });
    document.body.classList.remove("lock");
    document
      .querySelector(".menu-button")
      ?.setAttribute("aria-expanded", "false");
  };
}
