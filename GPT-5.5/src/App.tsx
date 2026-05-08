import { type FormEvent, useEffect, useRef, useState } from 'react'
import './App.css'

type TicketType = 'standard' | 'vip' | 'student'

type BookingFormState = {
  name: string
  email: string
  ticketType: TicketType | ''
}

type BookingFormErrors = Partial<Record<keyof BookingFormState, string>>

const ticketOptions: Array<{ value: TicketType; label: string; description: string }> = [
  {
    value: 'standard',
    label: 'Standard',
    description: 'Full access to talks, panels, and the expo floor.',
  },
  {
    value: 'vip',
    label: 'VIP',
    description: 'Includes speaker lounge access and priority seating.',
  },
  {
    value: 'student',
    label: 'Student',
    description: 'Discounted pass for students and recent graduates.',
  },
]

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Nexus Conf home">
        <span className="brand-mark" aria-hidden="true">
          N
        </span>
        <span>Nexus Conf</span>
      </a>

      <nav className="main-nav" aria-label="Primary navigation">
        <a href="#speakers">Speakers</a>
        <a href="#schedule">Schedule</a>
        <div className="dropdown">
          <button
            type="button"
            className="dropdown-trigger"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            onClick={() => setIsDropdownOpen((open) => !open)}
            onBlur={(event) => {
              if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
                setIsDropdownOpen(false)
              }
            }}
          >
            Explore
            <span aria-hidden="true">▾</span>
          </button>
          <div
            className={`dropdown-menu ${isDropdownOpen ? 'is-open' : ''}`}
            onBlur={(event) => {
              if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
                setIsDropdownOpen(false)
              }
            }}
          >
            <a href="#workshops">Workshops</a>
            <a href="#venue">Venue</a>
            <a href="#partners">Partners</a>
          </div>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow">Stockholm • June 18-20, 2026</p>
        <h1 id="hero-title">Where builders shape the next generation of tech.</h1>
        <p className="hero-copy">
          Join product leaders, engineers, founders, and designers for three days of
          practical sessions, live demos, and meaningful networking.
        </p>
        <a className="button button-primary" href="#booking">
          Book Now
        </a>
      </div>
    </section>
  )
}

function EventHighlights() {
  return (
    <section className="highlights" aria-label="Conference highlights">
      <article>
        <span>42</span>
        <p>Sessions across AI, cloud, security, and product strategy.</p>
      </article>
      <article>
        <span>18</span>
        <p>Hands-on workshops led by experienced practitioners.</p>
      </article>
      <article>
        <span>900+</span>
        <p>Attendees from startups, enterprises, and research labs.</p>
      </article>
    </section>
  )
}

function validateBookingForm(values: BookingFormState) {
  const errors: BookingFormErrors = {}
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.ticketType) {
    errors.ticketType = 'Please choose a ticket type.'
  }

  return errors
}

function BookingForm({ onSuccess }: { onSuccess: () => void }) {
  const [values, setValues] = useState<BookingFormState>({
    name: '',
    email: '',
    ticketType: '',
  })
  const [errors, setErrors] = useState<BookingFormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateBookingForm(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onSuccess()
      setValues({ name: '', email: '', ticketType: '' })
    }
  }

  return (
    <section className="booking-section" id="booking" aria-labelledby="booking-title">
      <div className="section-heading">
        <p className="eyebrow">Reserve your seat</p>
        <h2 id="booking-title">Book your Nexus Conf ticket</h2>
        <p>
          Tell us who is attending and choose the ticket that fits your conference
          experience.
        </p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            onChange={(event) => {
              setValues((current) => ({ ...current, name: event.target.value }))
              setErrors((current) => ({ ...current, name: undefined }))
            }}
          />
          {errors.name ? (
            <p className="error-message" id="name-error">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            onChange={(event) => {
              setValues((current) => ({ ...current, email: event.target.value }))
              setErrors((current) => ({ ...current, email: undefined }))
            }}
          />
          {errors.email ? (
            <p className="error-message" id="email-error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <fieldset
          className="ticket-options"
          aria-invalid={Boolean(errors.ticketType)}
          aria-describedby={errors.ticketType ? 'ticket-error' : undefined}
        >
          <legend>Ticket type</legend>
          {ticketOptions.map((ticket) => (
            <label className="ticket-card" key={ticket.value}>
              <input
                type="radio"
                name="ticketType"
                value={ticket.value}
                checked={values.ticketType === ticket.value}
                onChange={() => {
                  setValues((current) => ({ ...current, ticketType: ticket.value }))
                  setErrors((current) => ({ ...current, ticketType: undefined }))
                }}
              />
              <span>
                <strong>{ticket.label}</strong>
                <small>{ticket.description}</small>
              </span>
            </label>
          ))}
          {errors.ticketType ? (
            <p className="error-message" id="ticket-error">
              {errors.ticketType}
            </p>
          ) : null}
        </fieldset>

        <button className="button button-primary" type="submit">
          Submit Booking
        </button>
      </form>
    </section>
  )
}

function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        aria-describedby="success-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <p className="eyebrow">Booking received</p>
        <h2 id="success-title">You are on the list.</h2>
        <p id="success-description">
          Thanks for booking Nexus Conf. A confirmation email with your ticket details
          will arrive shortly.
        </p>
        <button
          ref={closeButtonRef}
          className="button button-secondary"
          type="button"
          onClick={onClose}
        >
          Close
        </button>
      </section>
    </div>
  )
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <EventHighlights />
        <BookingForm onSuccess={() => setIsModalOpen(true)} />
      </main>
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default App
