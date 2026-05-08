import "./Features.css";

type Feature = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  meta: string;
};

const FEATURES: Feature[] = [
  {
    title: "Inspiring keynotes",
    description:
      "Hear from engineering leaders who've shipped at scale — from indie makers to teams running platforms used by millions.",
    image: "/konferens.png",
    imageAlt:
      "A speaker on stage addressing a full auditorium of conference attendees.",
    meta: "Main hall · 18 talks",
  },
  {
    title: "Hands-on workshops",
    description:
      "Small-group, instructor-led sessions where you'll write real code, get unstuck, and leave with something you built yourself.",
    image: "/konf3.png",
    imageAlt:
      "A small group of attendees collaborating around a laptop in a workshop.",
    meta: "Studio rooms · 24 workshops",
  },
  {
    title: "Real conversations",
    description:
      "Generous breaks, a relaxed lounge and curated dinners. The hallway track is half the reason you came — we've planned for it.",
    image: "/konf2.png",
    imageAlt: "Attendees networking in a conference lounge area.",
    meta: "Lounge · all 3 days",
  },
];

export default function Features() {
  return (
    <section className="features" id="about" aria-labelledby="features-title">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">What to expect</p>
          <h2 id="features-title">Three days, built around what works</h2>
          <p className="section-lede">
            We took the parts of conferences people actually love, and quietly
            removed the rest.
          </p>
        </header>

        <ul className="feature-grid" role="list">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="feature-card">
              <figure>
                <img
                  src={feature.image}
                  alt={feature.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="feature-body">
                <p className="feature-meta">{feature.meta}</p>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
