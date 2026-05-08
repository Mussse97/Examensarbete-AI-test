import { useId, useRef, useState } from "react";
import "./BookingForm.css";

export type TicketType = "standard" | "vip" | "student";

export type BookingData = {
  name: string;
  email: string;
  ticket: TicketType;
};

type FormState = {
  name: string;
  email: string;
  ticket: TicketType | "";
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type BookingFormProps = {
  onSubmitSuccess: (booking: BookingData) => void;
};

const TICKET_OPTIONS: {
  value: TicketType;
  label: string;
  price: string;
  description: string;
}[] = [
  {
    value: "standard",
    label: "Standard",
    price: "€399",
    description: "All talks, lunches and the after-party.",
  },
  {
    value: "vip",
    label: "VIP",
    price: "€799",
    description: "Front-row seats, speaker dinner and a workshop pass.",
  },
  {
    value: "student",
    label: "Student",
    price: "€99",
    description: "Valid student ID required at check-in.",
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.name = "Your name must be at least 2 characters.";
  } else if (name.length > 80) {
    errors.name = "Your name must be 80 characters or fewer.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "That doesn't look like a valid email address.";
  }

  if (!values.ticket) {
    errors.ticket = "Please choose a ticket type.";
  }

  return errors;
}

export default function BookingForm({ onSubmitSuccess }: BookingFormProps) {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    ticket: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const nameId = useId();
  const emailId = useId();
  const ticketLegendId = useId();

  const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      setErrors(validate({ ...values, [key]: value }));
    }
  };

  const handleBlur = (key: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, ticket: true });

    if (Object.keys(nextErrors).length > 0) {
      const firstField = (Object.keys(nextErrors) as (keyof FormState)[])[0];
      const el = formRef.current?.querySelector<HTMLInputElement>(
        `[name="${firstField}"]`
      );
      el?.focus();
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);

    onSubmitSuccess({
      name: values.name.trim(),
      email: values.email.trim(),
      ticket: values.ticket as TicketType,
    });

    setValues({ name: "", email: "", ticket: "" });
    setTouched({});
    setErrors({});
  };

  const showError = (field: keyof FormState) =>
    touched[field] && errors[field] ? errors[field] : undefined;

  return (
    <section className="booking" id="book" aria-labelledby="booking-title">
      <div className="container booking-grid">
        <div className="booking-intro">
          <p className="eyebrow">Book your seat</p>
          <h2 id="booking-title">Reserve your spot at TechFront 26</h2>
          <p>
            We send a confirmation to your inbox within minutes. Tickets are
            transferable up to 7 days before the event.
          </p>
          <ul className="benefits" role="list">
            <li>3 days of talks &amp; workshops</li>
            <li>Lunches and coffee included</li>
            <li>Free Wi‑Fi and quiet rooms</li>
            <li>Diversity scholarships available</li>
          </ul>
        </div>

        <form
          ref={formRef}
          className="booking-form"
          onSubmit={handleSubmit}
          noValidate
          aria-describedby="form-help"
        >
          <p id="form-help" className="sr-only">
            All fields are required.
          </p>

          <div className="field">
            <label htmlFor={nameId}>
              Full name <span aria-hidden="true">*</span>
            </label>
            <input
              id={nameId}
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              aria-invalid={Boolean(showError("name"))}
              aria-describedby={showError("name") ? `${nameId}-error` : undefined}
              placeholder="e.g. Alex Lindqvist"
            />
            {showError("name") && (
              <p id={`${nameId}-error`} className="field-error" role="alert">
                {showError("name")}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor={emailId}>
              Email address <span aria-hidden="true">*</span>
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              required
              inputMode="email"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              aria-invalid={Boolean(showError("email"))}
              aria-describedby={
                showError("email") ? `${emailId}-error` : undefined
              }
              placeholder="alex@example.com"
            />
            {showError("email") && (
              <p id={`${emailId}-error`} className="field-error" role="alert">
                {showError("email")}
              </p>
            )}
          </div>

          <fieldset
            className="field ticket-field"
            aria-describedby={
              showError("ticket") ? `${ticketLegendId}-error` : undefined
            }
            aria-invalid={Boolean(showError("ticket"))}
          >
            <legend id={ticketLegendId}>
              Ticket type <span aria-hidden="true">*</span>
            </legend>

            <div className="ticket-options" role="radiogroup">
              {TICKET_OPTIONS.map((opt) => {
                const checked = values.ticket === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`ticket-option ${checked ? "is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="ticket"
                      value={opt.value}
                      checked={checked}
                      onChange={() => handleChange("ticket", opt.value)}
                      onBlur={() => handleBlur("ticket")}
                    />
                    <span className="ticket-radio" aria-hidden="true" />
                    <span className="ticket-content">
                      <span className="ticket-row">
                        <span className="ticket-label">{opt.label}</span>
                        <span className="ticket-price">{opt.price}</span>
                      </span>
                      <span className="ticket-description">
                        {opt.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>

            {showError("ticket") && (
              <p
                id={`${ticketLegendId}-error`}
                className="field-error"
                role="alert"
              >
                {showError("ticket")}
              </p>
            )}
          </fieldset>

          <button
            type="submit"
            className="btn-primary submit-btn"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Confirming…
              </>
            ) : (
              <>
                Confirm booking
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-6-6 6 6-6 6"
                  />
                </svg>
              </>
            )}
          </button>

          <p className="form-fineprint">
            By booking you agree to our terms of service and privacy policy.
          </p>
        </form>
      </div>
    </section>
  );
}
