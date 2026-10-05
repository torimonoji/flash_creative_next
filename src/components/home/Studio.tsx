export function Studio() {
  return (
    <section id="studio" className="studio section">
      <div className="studio-top">
        <span className="eyebrow reveal">The Studio</span>
        <p className="studio-statement reveal">
          Curious by nature.
          <br />
          Bold by design.
          <br />
          <span>Flash by instinct.</span>
        </p>
      </div>
      <div className="studio-bottom">
        <div className="studio-symbol" aria-hidden="true">
          <i className="shape-circle"></i>
          <i className="shape-half"></i>
        </div>
        <div className="studio-copy reveal">
          <h2 className="">
            Small team.
            <br />
            Wide-open <em className="serif-accent">thinking.</em>
          </h2>
          <p>
            We’re an independent creative studio working at the intersection of
            brand, design and digital. We ask better questions, challenge the
            obvious, and bring a fresh point of view to every brief.
          </p>
          <p>
            From the first spark to the final detail, we build close
            partnerships and make work that feels unmistakably you.
          </p>
          <a className="text-link" href="#services">
            Meet our capabilities
          </a>
        </div>
      </div>
      <div className="studio-ticker" aria-hidden="true">
        <span>
          LESS EXPECTED. MORE IMPACT. ● LESS EXPECTED. MORE IMPACT. ● 
        </span>
        <span>
          LESS EXPECTED. MORE IMPACT. ● LESS EXPECTED. MORE IMPACT. ● 
        </span>
      </div>
    </section>
  );
}
