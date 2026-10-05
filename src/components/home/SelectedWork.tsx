import { projects } from "@/content/projects";

export function SelectedWork() {
  return (
    <section id="work" className="work section">
      <div className="section-heading reveal">
        <span className="eyebrow">Selected Work</span>
        <h2 className="">
          A little different.
          <br />A lot of purpose.
        </h2>
      </div>
      <div className="projects">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            className={project.cardClass}
            data-project={project.slug}
          >
            <div className="project-image">
              <img
                src={project.image}
                width="1536"
                height="1024"
                loading={index === 0 ? "eager" : "lazy"}
                alt={project.alt}
              />
              <span className="view-pill">Explore project</span>
            </div>
            <div className="project-caption">
              <h3>{project.name}</h3>
              <span>{project.caption}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="work-footer reveal">
        <a className="text-link" href="#contact">
          Have something in mind?
        </a>
      </div>
    </section>
  );
}
