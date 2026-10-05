import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="mega-footer">
      <div className="footer-grid">
        <p className="footer-descriptor">
          Independent
          <br />
          Creative Studio
        </p>
        <div className="footer-get-in-touch">
          <a
            href="#contact-links"
            className="footer-enquiry footer-contact-button"
          >
            Get in touch
          </a>
          <nav
            id="contact-links"
            className="footer-direct-links"
            aria-label="Direct messaging links"
          >
            {site.contactChannels.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat on ${link.label} (opens in a new tab)`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-links">
          <nav className="footer-nav" aria-label="Footer navigation">
            <span className="footer-label">MENU</span>
            {site.footerNavigation.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <nav className="footer-social" aria-label="Social platforms">
            <span className="footer-label">SOCIALS</span>
            {site.socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="footer-meta">
        <span>
          © {site.copyrightYear} {site.name}
        </span>
        <a href="/#home">Back to top</a>
      </div>
      <div className="footer-marquee">
        <a href="/#home" aria-label="Flash Creative — back to home">
          <span className="footer-marquee-unit" aria-hidden="true">
            Flash Creative
            <span className="marquee-geometry">
              <i className="shape-circle"></i>
              <i className="shape-half"></i>
            </span>
          </span>
          <span className="footer-marquee-unit" aria-hidden="true">
            Flash Creative
            <span className="marquee-geometry">
              <i className="shape-circle"></i>
              <i className="shape-half"></i>
            </span>
          </span>
        </a>
      </div>
    </footer>
  );
}
