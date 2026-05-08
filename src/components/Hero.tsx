import "./Hero.css";

type HeroProps = {
  onBookClick: () => void;
};

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-content">
        <p className="hero-eyebrow">
          <span className="hero-dot" aria-hidden="true" />
          Stockholm · June 12–14, 2026
        </p>

        <h1 id="hero-title">
          The conference for people who
          <span className="hero-accent"> build the web.</span>
        </h1>

        <p className="hero-lede">
          Three days of talks, workshops and hallway conversations with 60+
          speakers from across the industry. Walk away inspired, with
          practical things you can ship on Monday.
        </p>

        <div className="hero-actions">
          <button type="button" className="btn-primary" onClick={onBookClick}>
            Book now
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </button>
          <a href="#about" className="btn-ghost">
            Learn more
          </a>
        </div>

        <dl className="hero-stats" aria-label="Conference at a glance">
          <div>
            <dt>Speakers</dt>
            <dd>60+</dd>
          </div>
          <div>
            <dt>Workshops</dt>
            <dd>24</dd>
          </div>
          <div>
            <dt>Attendees</dt>
            <dd>1,800</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
