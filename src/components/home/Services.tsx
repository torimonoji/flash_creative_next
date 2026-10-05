import { services } from "@/content/services";

export function Services() {
  return (
    <section id="services" className="services section">
      <div className="section-heading reveal">
        <span className="eyebrow">What We Do</span>
        <h2 className="">
          From first spark
          <br />
          to what’s next.
        </h2>
      </div>
      <div className="service-list">
        {services.map((service, index) => (
          <details className="reveal" key={service.title}>
            <summary>
              <span className="service-index">
                [{String(index + 1).padStart(2, "0")}]
              </span>
              <h3>{service.title}</h3>
              <span className="plus" aria-hidden="true" />
            </summary>
            <div className="service-detail">
              <p>{service.description}</p>
              <div>
                {service.capabilities.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
