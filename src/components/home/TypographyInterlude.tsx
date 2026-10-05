export function TypographyInterlude() {
  return (
    <section
      className="type-interlude"
      aria-label="Small ideas. Big things. Made to move."
    >
      <div className="type-sticky">
        <div className="type-track type-track-a" aria-hidden="true">
          <span className="type-phrase">
            <span className="type-word">SMALL</span>{" "}
            <span className="type-word">IDEAS.</span>
          </span>
          <i className="shape-circle"></i>
          <span className="type-phrase">
            <span className="type-word">SMALL</span>{" "}
            <span className="type-word">IDEAS.</span>
          </span>
        </div>
        <div className="type-track type-track-b" aria-hidden="true">
          <i className="shape-half"></i>
          <span className="type-phrase">
            <span className="type-word">BIG</span>{" "}
            <span className="type-word">THINGS.</span>
          </span>
          <i className="shape-circle"></i>
        </div>
        <div className="type-track type-track-c" aria-hidden="true">
          <span className="type-phrase">
            <span className="type-word">MADE TO</span>{" "}
            <span className="type-word">MOVE.</span>
          </span>
          <i className="shape-half"></i>
          <span className="type-phrase">
            <span className="type-word">MADE TO</span>{" "}
            <span className="type-word">MOVE.</span>
          </span>
        </div>
      </div>
    </section>
  );
}
