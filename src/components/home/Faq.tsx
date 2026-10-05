import { questions } from "@/content/faq";

export function Faq() {
  return (
    <section id="faq" className="faq section" aria-labelledby="faq-title">
      <div className="faq-intro reveal">
        <span className="eyebrow">Before we begin</span>
        <h2 id="faq-title">
          A few good
          <br />
          questions.
        </h2>
      </div>
      <div className="faq-list reveal">
        {questions.map((item, index) => (
          <details className="faq-item" key={item.question} open={index === 0}>
            <summary>
              <span className="faq-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="faq-question">{item.question}</span>
              <span className="plus" aria-hidden="true" />
            </summary>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
