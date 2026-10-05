"use client";

import { useEffect } from "react";
import { initContactOrbit } from "@/lib/motion/contact-orbit";
import { initProjectDistortion } from "@/lib/motion/project-distortion";

export function PortfolioInteractions() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = [
      ...document.querySelectorAll<HTMLElement>("[data-portfolio-reveal]"),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    if (!reduced.matches)
      nodes.forEach((node) => {
        node.classList.add("portfolio-reveal");
        observer.observe(node);
      });
    const disposeDistortion = initProjectDistortion();
    const disposeOrbit = initContactOrbit();
    const progress = document.querySelector<HTMLElement>(".progress");
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      if (progress)
        progress.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    update();
    return () => {
      observer.disconnect();
      disposeDistortion();
      disposeOrbit();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      nodes.forEach((node) =>
        node.classList.remove("portfolio-reveal", "is-visible"),
      );
    };
  }, []);
  return null;
}
