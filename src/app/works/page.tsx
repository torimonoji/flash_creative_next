import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { PortfolioInteractions } from "@/components/motion/PortfolioInteractions";
import { Contact } from "@/components/home/Contact";

export const metadata: Metadata = {
  title: "Works — Flash Creative",
  description:
    "Explore Flash Creative’s work across brand strategy, visual identity, packaging and editorial design.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ? "/works/" : null,
  },
  openGraph: {
    title: "Works — Flash Creative",
    description:
      "Brand identities, packaging and creative directions by Flash Creative.",
    type: "website",
  },
};

export default function WorksPage() {
  return (
    <>
      <main id="main" className="portfolio-page works-page">
        <section className="works-intro">
          <div className="portfolio-kicker">
            <span>Our portfolio</span>
            <span>{String(projects.length).padStart(2, "0")} projects</span>
          </div>
          <h1>
            WORKS
            <span className="works-count">
              ({String(projects.length).padStart(2, "0")})
            </span>
          </h1>
          <div className="works-intro-bottom">
            <p>
              Different briefs.
              <br />
              Distinctive points of view.
            </p>
            <span>Brand · Design · Direction</span>
          </div>
        </section>
        <section className="works-gallery" aria-label="All projects">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="works-item"
              data-portfolio-reveal
            >
              <ProjectCard
                project={project}
                index={index}
                className="project works-card"
              />
            </div>
          ))}
        </section>
        <Contact
          eyebrow="Your project could be next."
          lines={["Let’s make", "something", "matter."]}
          variant="works"
        />
      </main>
      <PortfolioInteractions />
    </>
  );
}
