import { site } from "@/config/site";

export function ContactDialog() {
  return (
    <dialog
      id="enquiry"
      className="enquiry-dialog contact-channels"
      aria-labelledby="contact-channel-title"
      aria-describedby="contact-channel-description"
    >
      <button
        className="enquiry-close"
        type="button"
        aria-label="Close contact options"
      >
        Close ×
      </button>
      <span className="eyebrow">LET’S TALK</span>
      <h2 id="contact-channel-title">
        Good things start
        <br />
        with a conversation.
      </h2>
      <p id="contact-channel-description">Choose where we talk.</p>
      <nav className="contact-channel-list" aria-label="Choose a messaging app">
        {site.contactChannels.map((link, index) => (
          <a
            key={link.label}
            className="contact-channel"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat on ${link.label} (opens in a new tab)`}
          >
            <span className="contact-channel-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{link.label}</span>
            <span className="contact-channel-action">Let’s chat</span>
          </a>
        ))}
      </nav>
    </dialog>
  );
}
