export function Contact({
  eyebrow = "Let’s talk",
  lines = ["Let’s make", "a little", "noise."],
  variant = "home",
}: {
  eyebrow?: string;
  lines?: [string, string, string];
  variant?: "home" | "works" | "case";
} = {}) {
  return (
    <section
      id="contact"
      className={`contact section${variant === "home" ? "" : ` ${variant}-contact`}`}
      data-portfolio-reveal={variant === "home" ? undefined : ""}
    >
      <div className="contact-top reveal">
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className="contact-composition reveal">
        <a
          href="#contact-links"
          className="contact-title"
          id="enquiry-open"
          aria-label={`${lines.join(" ")} — start a project`}
        >
          {lines.map((line, index) => (
            <span
              key={line}
              className={`contact-line${index === lines.length - 1 ? " contact-blue" : ""}`}
            >
              <span>{line}</span>
            </span>
          ))}
        </a>
        <div className="contact-action">
          <div className="contact-orbit">
            <span className="contact-orbit-ring" aria-hidden="true"></span>
            <span className="contact-orbit-arm" aria-hidden="true">
              <span className="contact-orbit-dot"></span>
            </span>
            <a
              href="#contact-links"
              id="start-project"
              aria-label="Start a project"
            >
              <span className="contact-button-label">Start a project</span>
              <span className="contact-arrow-window" aria-hidden="true">
                <svg
                  className="contact-button-arrow"
                  viewBox="0 0 36 24"
                  aria-hidden="true"
                >
                  <path d="M2 12h29M23 5l8 7-8 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
