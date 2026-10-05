"use client";

import { useEffect, useRef, useState } from "react";
import { projectsBySlug, type Project } from "@/content/projects";

export function ProjectDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selection, setSelection] = useState<{ project: Project } | null>(null);
  useEffect(() => {
    const select = (event: Event) => {
      const slug = (event as CustomEvent<string>).detail;
      const selected = projectsBySlug[slug];
      if (selected) setSelection({ project: selected });
    };
    document.addEventListener("flash:project", select);
    return () => document.removeEventListener("flash:project", select);
  }, []);
  useEffect(() => {
    if (!selection || !dialog.current) return;
    if (!dialog.current.open) dialog.current.showModal();
    dialog.current.scrollTop = 0;
    document.body.classList.add("lock");
  }, [selection]);
  const project = selection?.project;
  return (
    <dialog
      ref={dialog}
      id="case-dialog"
      className="case-dialog"
      aria-labelledby="case-title"
    >
      <button className="case-close" aria-label="Close project">
        Close ×
      </button>
      <div id="case-content">
        {project && (
          <>
            <img
              className="case-hero"
              src={project.image}
              alt={`${project.name} brand identity project`}
            />
            <div className="case-body">
              <span className="eyebrow">{project.tag}</span>
              <h2 id="case-title">{project.name}</h2>
              <h3>{project.headline}</h3>
              <div className="case-description">
                <p>{project.challenge}</p>
                <p>{project.approach}</p>
              </div>
              <p className="case-tags">
                Independent concept exploration · 2026
              </p>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
