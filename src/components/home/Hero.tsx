export function Hero() {
  return (
    <section className="hero hero-lab" id="home">
      <svg className="hero-effect-defs" aria-hidden="true" width="0" height="0">
        <defs>
          <filter
            id="heroLocalWarp"
            filterUnits="userSpaceOnUse"
            primitiveUnits="userSpaceOnUse"
            x="-64"
            y="-64"
            width="2400"
            height="1600"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodColor="#808080" result="neutral"></feFlood>
            <feImage
              id="heroDisplacementField"
              preserveAspectRatio="none"
              x="0"
              y="0"
              width="640"
              height="640"
              result="field"
            ></feImage>
            <feMerge result="local">
              <feMergeNode in="neutral"></feMergeNode>
              <feMergeNode in="field"></feMergeNode>
            </feMerge>
            <feDisplacementMap
              id="heroLocalDisplacement"
              in="SourceGraphic"
              in2="local"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            ></feDisplacementMap>
          </filter>
        </defs>
      </svg>
      <div className="lab-title">
        <h1 aria-label="Small ideas. Big things.">
          <span className="lab-line-one" aria-hidden="true">
            <span className="hero-small">SMALL</span>
            <span className="hero-ideas">
              IDEAS<span id="heroDot"></span>
            </span>
          </span>
          <span className="lab-line-two" aria-hidden="true">
            BIG
            <br />
            <em>THINGS</em>
          </span>
        </h1>
      </div>
      <p className="lab-intro">
        We turn bold thinking into brands and digital experiences that move
        people.
      </p>
      <p className="lab-side-copy">
        From a small spark.
        <br />
        To something with impact.
      </p>
      <a
        className="hero-scroll"
        href="#work"
        aria-label="Scroll to selected work"
      >
        <svg viewBox="0 0 32 40" aria-hidden="true">
          <path d="M16 3v32M7 26l9 9 9-9" />
        </svg>
      </a>
    </section>
  );
}
