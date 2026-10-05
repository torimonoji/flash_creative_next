import { Contact } from "@/components/home/Contact";
import type { Project } from "@/content/projects";
import type { CaseStudy } from "@/content/case-studies";

function Lines({ text }: { text: string }) {
  return text.split("\n").map((line, index) => (
    <span key={line}>
      {index > 0 && <br />}
      {line}
    </span>
  ));
}

export function CaseStudyPage({
  project,
  study,
}: {
  project: Project;
  study: CaseStudy;
}) {
  return (
    <main id="main" className={`portfolio-page case-page case-${study.slug}`}>
      <section className="case-intro">
        <nav className="case-breadcrumb" aria-label="Breadcrumb">
          <a href="/works/" aria-label="Back to all works">
            All works
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.name}</span>
        </nav>
        <div className="case-title-row">
          <h1>{project.name}</h1>
          <span className="case-concept">
            {study.status}
            <br />
            {study.year}
          </span>
        </div>
        <div className="case-intro-bottom">
          <h2>{project.headline}</h2>
          <p>{study.introduction}</p>
        </div>
        <dl className="case-facts">
          <div>
            <dt>Sector</dt>
            <dd>{study.sector}</dd>
          </div>
          <div>
            <dt>Scope</dt>
            <dd>
              {study.services.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </dd>
          </div>
          <div>
            <dt>Project</dt>
            <dd>
              {study.status}
              <br />
              {study.year}
            </dd>
          </div>
        </dl>
      </section>
      <figure className="case-cover">
        <img
          src={project.image}
          width="1536"
          height="1024"
          fetchPriority="high"
          alt={project.alt}
        />
        <figcaption>
          {project.name} — {study.services.join(" / ")}
        </figcaption>
      </figure>
      <section className="case-story" data-portfolio-reveal>
        <div>
          <span className="eyebrow">01 / The idea</span>
          <h2>
            <Lines text={study.ideaTitle} />
          </h2>
        </div>
        <div className="case-story-copy">
          <p>{project.challenge.replace("The brief: ", "")}</p>
          <p>{study.ideaBody}</p>
        </div>
      </section>
      <section
        className="case-brand-board"
        aria-label={`${project.name} wordmark`}
        data-portfolio-reveal
      >
        <div className="case-board-meta">
          <span>
            {project.name} / {study.boardLabel ?? "Visual identity"}
          </span>
          <span>{project.headline}</span>
        </div>
        <div className="case-wordmark" aria-hidden="true">
          {project.name}
        </div>
        <p>{study.brandLine}</p>
      </section>
      <section className="case-story case-identity" data-portfolio-reveal>
        <div>
          <span className="eyebrow">02 / The identity</span>
          <h2>
            <Lines text={study.identityTitle} />
          </h2>
        </div>
        <div className="case-story-copy">
          <p>{study.identityBody}</p>
        </div>
      </section>
      <div className="case-system" data-portfolio-reveal>
        <section className="case-type-board" aria-label="Typography study">
          <div className="specimen-meta">
            <span>Typography</span>
            <span>{study.typeWeights}</span>
          </div>
          <span className="specimen-aa" aria-hidden="true">
            Aa
          </span>
          <div className="specimen-copy">
            <p>
              <Lines text={study.typeSample} />
            </p>
            <span>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789
            </span>
          </div>
        </section>
        <section className="case-palette" aria-label="Brand colour palette">
          {study.palette.map((colour) => (
            <div
              key={colour.name}
              className={
                colour.light ? "palette-chip is-light" : "palette-chip"
              }
              style={{ backgroundColor: colour.hex }}
            >
              <span>{colour.name}</span>
              <span>{colour.hex}</span>
            </div>
          ))}
        </section>
      </div>
      <section className="case-packaging" data-portfolio-reveal>
        <div className="case-packaging-image">
          <img
            src={project.image}
            width="1536"
            height="1024"
            loading="lazy"
            alt={study.detailAlt}
          />
        </div>
        <div className="case-packaging-copy">
          <span className="eyebrow">03 / {study.detailLabel}</span>
          <h2>{study.detailTitle}</h2>
          <p>{study.detailBody}</p>
          <span className="case-detail-note">{study.detailNote}</span>
        </div>
      </section>
      <nav
        className="case-work-navigation"
        aria-label="Project navigation"
        data-portfolio-reveal
      >
        <a
          className="all-works-button"
          href="/works/"
          aria-label="Explore all works"
        >
          <span className="all-works-label" aria-hidden="true">
            <span className="all-works-reel">
              <span>Explore all works</span>
              <span>Explore all works</span>
              <span>Explore all works</span>
              <span>Explore all works</span>
            </span>
          </span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </a>
      </nav>
      <Contact
        eyebrow="Have something in mind?"
        lines={["Let’s shape", "what comes", "next."]}
        variant="case"
      />
    </main>
  );
}
