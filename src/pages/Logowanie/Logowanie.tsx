import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Logowanie.css";
import imgLogo from "./00e9533793b01d90c34b50db08b84853998152cb.png";
import imgGoogle from "./74278594c1cfa9698502b9bedd64094874d20732.png";

// ── Icons ─────────────────────────────────────────────────────────────────────

const EmailIcon = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
    <path
      d="M18 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 4-8 5-8-5V2l8 5 8-5v2z"
      fill="#817478"
    />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="21" viewBox="0 0 16 21" fill="none" aria-hidden="true">
    <path
      d="M14 9h-1V6A5 5 0 0 0 3 6v3H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zM8 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3.1-7H4.9V6a3.1 3.1 0 0 1 6.2 0v3z"
      fill="#817478"
    />
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
      <path
        d="M11 0C6 0 1.73 3.11 0 7.5 1.73 11.89 6 15 11 15s9.27-3.11 11-7.5C20.27 3.11 16 0 11 0zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
        fill="#817478"
      />
    </svg>
  ) : (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" aria-hidden="true">
      <path
        d="M2 1 20 19M8.71 5.21A6 6 0 0 1 11 4.5a6 6 0 0 1 6 6c0 .79-.15 1.55-.43 2.24M6.17 6.17C3.9 7.5 2.08 9.61 1 12c1.73 4.39 6 7.5 11 7.5 1.77 0 3.44-.45 4.9-1.24M17.64 16.64A10.92 10.92 0 0 0 21 12c-1.73-4.39-6-7.5-11-7.5-.66 0-1.3.07-1.93.2"
        stroke="#817478"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 0L5.59 1.41 10.17 6H0v2h10.17l-4.58 4.59L7 14l7-7z" fill="white" />
  </svg>
);

// ── Logowanie Page ────────────────────────────────────────────────────────────

export default function Logowanie() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Symulacja logowania — w przyszłości podpięcie API
    setTimeout(() => {
      navigate("/home");
    }, 600);
  };

  return (
    <div className="login-page">
      {/* Dekoracje tła */}
      <div className="login-bg-blob login-bg-blob--pink" aria-hidden="true" />
      <div className="login-bg-blob login-bg-blob--purple" aria-hidden="true" />

      <div className="login-container">
        {/* Brand */}
        <div className="login-brand">
          <div className="login-brand-logo-wrap">
            <img src={imgLogo} alt="Pet Companion Logo" className="login-brand-logo" />
          </div>
          <h1 className="login-brand-name">Pet Companion</h1>
          <p className="login-brand-tagline">Dbamy o każdą łapkę</p>
        </div>

        {/* Karta logowania */}
        <div className="login-card">
          <div className="login-card-deco" aria-hidden="true" />

          <h2 className="login-card-title">Witaj ponownie</h2>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="field">
              <label htmlFor="email" className="field-label">Email</label>
              <div className="field-input-wrap">
                <span className="field-icon">
                  <EmailIcon />
                </span>
                <input
                  id="email"
                  type="email"
                  className="field-input"
                  placeholder="witaj@opiekunie.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Hasło */}
            <div className="field">
              <div className="field-label-row">
                <label htmlFor="password" className="field-label">Hasło</label>
                <button type="button" className="field-link">
                  Zapomniałeś hasła?
                </button>
              </div>
              <div className="field-input-wrap">
                <span className="field-icon">
                  <LockIcon />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="field-input field-input--password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="field-eye"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Przycisk submit */}
            <button
              type="submit"
              id="btn-login"
              className="btn-login"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="btn-login-spinner" />
              ) : (
                <>
                  Zaloguj się <ArrowIcon />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="login-divider">
              <span className="login-divider-line" />
              <span className="login-divider-text">LUB KONTYNUUJ</span>
              <span className="login-divider-line" />
            </div>

            {/* Social buttons */}
            <div className="social-login">
              <button type="button" className="social-btn" aria-label="Zaloguj przez Google">
                <img src={imgGoogle} alt="Google" width="24" height="24" />
              </button>
              <button type="button" className="social-btn" aria-label="Zaloguj przez Apple">
                {/* Apple logo SVG */}
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                  <path
                    d="M16.77 12.65c-.03-3.3 2.7-4.89 2.82-4.96-1.54-2.25-3.93-2.56-4.78-2.59-2.03-.21-3.97 1.2-5 1.2-1.04 0-2.63-1.17-4.33-1.14-2.22.03-4.27 1.3-5.41 3.28-2.31 4.01-.59 9.94 1.65 13.19 1.1 1.59 2.41 3.38 4.13 3.31 1.66-.07 2.29-1.07 4.3-1.07 2 0 2.58 1.07 4.33 1.04 1.79-.03 2.92-1.61 4.01-3.21 1.27-1.84 1.79-3.62 1.82-3.71-.04-.02-3.49-1.34-3.54-5.34zM13.37 3.35c.92-1.11 1.54-2.65 1.37-4.19-1.32.05-2.92.88-3.87 1.99-.85.98-1.6 2.55-1.4 4.05 1.47.11 2.97-.74 3.9-1.85z"
                    fill="#161A32"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p className="login-footer-reg">
            Nie masz konta?{" "}
            <Link to="/rejestracja" className="login-footer-link">
              Zarejestruj się
            </Link>
          </p>
          <div className="login-footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#support">Contact Support</a>
          </div>
          <p className="login-copyright">
            © 2024 Pet Companion. Nurturing every paw.
          </p>
        </div>
      </div>
    </div>
  );
}