import type { Project } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";

export function ProjectCard({
  project,
  index = 0,
  className,
}: {
  project: Project;
  index?: number;
  className?: string;
}) {
  const hasCaseStudy = Boolean(caseStudies[project.slug]);
  const content = (
    <>
      <div className="project-image">
        <img
          src={project.image}
          width="1536"
          height="1024"
          loading={index === 0 ? "eager" : "lazy"}
          alt={project.alt}
        />
      </div>
      <div className="project-caption">
        <h3>{project.name}</h3>
        <span className="project-scope">{project.caption}</span>
      </div>
    </>
  );
  return hasCaseStudy ? (
    <a
      data-project-card=""
      className={className ?? project.cardClass}
      href={`/works/${project.slug}/`}
      aria-label={`Explore ${project.name} case study`}
    >
      {content}
    </a>
  ) : (
    <button
      data-project-card=""
      className={className ?? project.cardClass}
      data-project={project.slug}
      aria-label={`Preview ${project.name}`}
      aria-haspopup="dialog"
      aria-controls="case-dialog"
    >
      {content}
    </button>
  );
}
