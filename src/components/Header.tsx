import { useEffect, useId, useRef, useState } from "react";
import "./Header.css";

type NavLink = { label: string; href: string };

const PROGRAM_LINKS: NavLink[] = [
  { label: "Keynotes", href: "#keynotes" },
  { label: "Workshops", href: "#workshops" },
  { label: "Speakers", href: "#speakers" },
  { label: "Schedule", href: "#schedule" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const dropdownId = useId();

  useEffect(() => {
    if (!dropdownOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  const closeMenus = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label="TechFront 2026 — home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                fill="currentColor"
                d="M12 2 2 7l10 5 10-5-10-5Zm0 7.5L4.5 7 12 4.5 19.5 7 12 9.5Zm-10 4 10 5 10-5-2-1-8 4-8-4-2 1Zm0 4 10 5 10-5-2-1-8 4-8-4-2 1Z"
              />
            </svg>
          </span>
          <span className="brand-text">
            TechFront <span className="brand-year">26</span>
          </span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`bar ${menuOpen ? "is-open" : ""}`} aria-hidden="true" />
          <span className={`bar ${menuOpen ? "is-open" : ""}`} aria-hidden="true" />
          <span className={`bar ${menuOpen ? "is-open" : ""}`} aria-hidden="true" />
        </button>

        <nav
          id="primary-nav"
          className={`primary-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary"
        >
          <ul className="nav-list">
            <li>
              <a href="#about" onClick={closeMenus}>
                About
              </a>
            </li>

            <li
              ref={dropdownRef}
              className={`has-dropdown ${dropdownOpen ? "open" : ""}`}
            >
              <button
                type="button"
                className="dropdown-trigger"
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
                aria-controls={dropdownId}
                onClick={() => setDropdownOpen((o) => !o)}
              >
                Program
                <svg
                  className="chev"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  aria-hidden="true"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6 9 6 6 6-6"
                  />
                </svg>
              </button>
              <ul
                id={dropdownId}
                className="dropdown-menu"
                role="menu"
                hidden={!dropdownOpen}
              >
                {PROGRAM_LINKS.map((link) => (
                  <li key={link.href} role="none">
                    <a role="menuitem" href={link.href} onClick={closeMenus}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <a href="#venue" onClick={closeMenus}>
                Venue
              </a>
            </li>
            <li>
              <a href="#contact" onClick={closeMenus}>
                Contact
              </a>
            </li>
            <li className="cta-li">
              <a href="#book" className="nav-cta" onClick={closeMenus}>
                Book now
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
