import { site } from "@/config/site";

export function MainMenu() {
  return (
    <dialog id="menu" className="menu-dialog" aria-label="Main navigation">
      <div className="menu-curtains" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div className="menu-head">
        <span className="brand">
          <img
            src="/assets/images/logotype.svg"
            alt="Flash Creative"
            width="141"
            height="53"
            draggable="false"
          />
        </span>
      </div>
      <button className="close-menu" aria-label="Close navigation">
        <span className="menu-x" aria-hidden="true"></span>
      </button>
      <div className="menu-layout">
        <nav className="main-menu" aria-label="Main navigation">
          {site.navigation.map((link, index) => (
            <a key={link.label} href={link.href} aria-label={link.label}>
              <span className="menu-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="nav-word" aria-hidden="true">
                {link.label}
              </span>
            </a>
          ))}
        </nav>
        <aside className="menu-aside">
          <div className="menu-contact-block">
            <span className="menu-meta">LET’S TALK</span>
            <a href="#contact-links" className="menu-project">
              Start a project
            </a>
          </div>
          <div className="menu-social-block">
            <span className="menu-meta">ELSEWHERE</span>
            <nav className="menu-social" aria-label="Menu social links">
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
        </aside>
      </div>
      <div className="menu-bottom">
        <span>
          © {site.copyrightYear} {site.name}
        </span>
        <span>Brand · Design · Digital</span>
      </div>
    </dialog>
  );
}
