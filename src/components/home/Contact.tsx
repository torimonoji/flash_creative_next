export function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="contact-top reveal">
        <span className="eyebrow">Let’s talk</span>
      </div>
      <div className="contact-composition reveal">
        <a
          href="#contact-links"
          className="contact-title"
          id="enquiry-open"
          aria-label="Let’s make a little noise — start a conversation"
        >
          <span className="contact-line">
            <span>Let’s make</span>
          </span>
          <span className="contact-line">
            <span>a little</span>
          </span>
          <span className="contact-line contact-blue">
            <span>noise.</span>
          </span>
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
