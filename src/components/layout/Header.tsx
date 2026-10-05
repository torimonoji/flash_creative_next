export function Header() {
  return (
    <header>
      <a className="brand" href="/#home" aria-label="Flash Creative home">
        <img
          src="/assets/images/logotype.svg"
          alt="Flash Creative"
          width="141"
          height="53"
          draggable="false"
        />
      </a>
      <button
        className="menu-button"
        aria-label="Open navigation"
        aria-expanded="false"
        aria-haspopup="dialog"
        aria-controls="menu"
      >
        <i className="dot-grid" aria-hidden="true">
          <b></b>
          <b></b>
          <b></b>
          <b></b>
        </i>
      </button>
    </header>
  );
}
