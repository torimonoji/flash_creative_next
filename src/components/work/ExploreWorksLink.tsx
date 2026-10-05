export function ExploreWorksLink({
  count,
  inline = false,
}: {
  count?: number;
  inline?: boolean;
}) {
  const label = `Explore all works${count === undefined ? "" : ` (${String(count).padStart(2, "0")})`}`;

  return (
    <a
      className={
        inline
          ? "text-link work-archive-link all-works-inline"
          : "all-works-button"
      }
      href="/works/"
      aria-label={label}
    >
      <span className="all-works-label" aria-hidden="true">
        {Array.from(label).map((letter, index) => (
          <span className="all-works-letter" key={index}>
            <span
              className="all-works-glyph"
              style={{ transitionDelay: `${index * 0.024}s` }}
            >
              <span>{letter === " " ? "\u00a0" : letter}</span>
              <span>{letter === " " ? "\u00a0" : letter}</span>
            </span>
          </span>
        ))}
      </span>
      <svg viewBox="0 0 27 21" aria-hidden="true">
        <path d="M17.4819 20.5623L26.9771 10.3075L17.4819 0.0527344L15.431 1.91379L22.0776 8.97821H0.732422V11.6369H22.0776L15.431 18.7013L17.4819 20.5623Z" />
      </svg>
    </a>
  );
}
