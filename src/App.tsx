import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import BookingForm, {
  type BookingData,
} from "./components/BookingForm";
import Modal from "./components/Modal";
import "./App.css";

const TICKET_LABELS: Record<BookingData["ticket"], string> = {
  standard: "Standard",
  vip: "VIP",
  student: "Student",
};

function App() {
  const [confirmation, setConfirmation] = useState<BookingData | null>(null);

  const scrollToBooking = () => {
    const target = document.getElementById("book");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstField =
        target.querySelector<HTMLInputElement>('input[name="name"]');
      window.setTimeout(() => firstField?.focus({ preventScroll: true }), 600);
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <Header />

      <main id="main">
        <Hero onBookClick={scrollToBooking} />
        <Features />
        <BookingForm onSubmitSuccess={(data) => setConfirmation(data)} />
      </main>

      <footer className="site-footer" id="contact">
        <div className="container footer-inner">
          <div>
            <p className="brand brand-footer" aria-label="TechFront 2026">
              <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path
                    fill="currentColor"
                    d="M12 2 2 7l10 5 10-5-10-5Zm0 7.5L4.5 7 12 4.5 19.5 7 12 9.5Zm-10 4 10 5 10-5-2-1-8 4-8-4-2 1Zm0 4 10 5 10-5-2-1-8 4-8-4-2 1Z"
                  />
                </svg>
              </span>
              TechFront <span className="brand-year">26</span>
            </p>
            <p className="footer-tagline">
              The conference for people who build the web.
            </p>
          </div>

          <address className="footer-address">
            Stockholmsmässan
            <br />
            Mässvägen 1, Älvsjö
            <br />
            <a href="mailto:hello@techfront.example">hello@techfront.example</a>
          </address>

          <div className="footer-meta">
            <p>© 2026 TechFront. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Modal
        open={Boolean(confirmation)}
        onClose={() => setConfirmation(null)}
        title="You're in! See you in Stockholm."
        description="A confirmation email is on its way. Add the dates to your calendar so you don't miss a thing."
      >
        {confirmation && (
          <>
            <dl className="confirmation-details">
              <div>
                <dt>Name</dt>
                <dd>{confirmation.name}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{confirmation.email}</dd>
              </div>
              <div>
                <dt>Ticket</dt>
                <dd>{TICKET_LABELS[confirmation.ticket]}</dd>
              </div>
            </dl>

            <button
              type="button"
              className="btn-primary"
              onClick={() => setConfirmation(null)}
              autoFocus
            >
              Got it
            </button>
          </>
        )}
      </Modal>
    </>
  );
}

export default App;
