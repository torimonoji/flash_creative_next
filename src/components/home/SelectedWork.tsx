import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ExploreWorksLink } from "@/components/work/ExploreWorksLink";

export function SelectedWork() {
  return (
    <section id="work" className="work section">
      <div className="section-heading reveal">
        <span className="eyebrow">Selected Work</span>
        <h2>
          A little different.
          <br />A lot of purpose.
        </h2>
      </div>
      <div className="projects">
        {projects.slice(0, 4).map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
      <div className="work-footer reveal">
        <ExploreWorksLink count={projects.length} inline />
        <a className="text-link" href="#contact">
          Have something in mind?
        </a>
      </div>
    </section>
  );
}
