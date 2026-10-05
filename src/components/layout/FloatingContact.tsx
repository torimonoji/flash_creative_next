export function FloatingContact() {
  return (
    <a
      href="#contact-links"
      id="quick-contact"
      className="floating-contact"
      aria-label="Contact Flash — choose Messenger or Zalo"
      aria-haspopup="dialog"
      aria-controls="enquiry"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 11.3a8 8 0 0 1-8 8 9 9 0 0 1-3.1-.6L4 20l1.3-4.4A8 8 0 1 1 20 11.3Z" />
        <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
      </svg>
      <span>Let’s chat</span>
    </a>
  );
}
