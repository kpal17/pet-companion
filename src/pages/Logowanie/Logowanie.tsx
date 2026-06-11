import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Logowanie.css";
import { Icon } from "../../Icon.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import imgLogo from "./00e9533793b01d90c34b50db08b84853998152cb.png";
import vetLogo from "../Vet/vet-logo.png";

function PasswordVisibilityIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 3 18 18M10.6 6.15A9.7 9.7 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.15 2.9M6.2 6.2C3.9 7.75 2.5 12 2.5 12s3.5 6 9.5 6c1.55 0 2.9-.4 4.05-.98M9.88 9.88A3 3 0 0 0 14.12 14.12" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.98-.9 6.63-2.37l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.39 13.92A6 6 0 0 1 6.08 12c0-.67.11-1.32.31-1.92V7.46H3.04A10 10 0 0 0 2 12c0 1.61.39 3.14 1.04 4.54l3.35-2.62Z" />
      <path fill="#EA4335" d="M12 5.95c1.47 0 2.79.5 3.83 1.5l2.87-2.88A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.96 5.46l3.35 2.62C7.18 7.71 9.39 5.95 12 5.95Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.7 12.8c0-2.55 2.08-3.77 2.18-3.83a4.68 4.68 0 0 0-3.69-2c-1.55-.16-3.05.93-3.84.93-.8 0-2.02-.91-3.33-.88a4.9 4.9 0 0 0-4.13 2.51c-1.78 3.08-.45 7.64 1.27 10.14.84 1.22 1.85 2.6 3.18 2.55 1.28-.05 1.76-.83 3.3-.83 1.53 0 1.99.83 3.34.8 1.38-.02 2.25-1.24 3.09-2.47a10.9 10.9 0 0 0 1.4-2.86 4.44 4.44 0 0 1-2.77-4.06ZM14.18 5.34a4.5 4.5 0 0 0 1.06-3.23 4.65 4.65 0 0 0-2.98 1.53 4.25 4.25 0 0 0-1.08 3.12 3.88 3.88 0 0 0 3-1.42Z" />
    </svg>
  );
}

export default function Logowanie() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      const ok = login(email, password);
      if (ok) {
        navigate("/home");
      } else {
        setError("Nieprawidłowy email lub hasło");
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="login-page">
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
            <div className="field">
              <label htmlFor="email" className="field-label">Email</label>
              <div className="field-input-wrap">
                <span className="field-icon">
                  <Icon name="emailIcon" viewBox="0 0 20 16" size={20} color="#817478" />
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

            <div className="field">
              <div className="field-label-row">
                <label htmlFor="password" className="field-label">Hasło</label>
                <button type="button" className="field-link">
                  Zapomniałeś hasła?
                </button>
              </div>
              <div className="field-input-wrap">
                <span className="field-icon">
                  <Icon name="lockIcon" viewBox="0 0 16 21" size={16} color="#817478" />
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
                  <PasswordVisibilityIcon visible={showPassword} />
                </button>
              </div>
            </div>

            {error && <p className="login-error">{error}</p>}

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
                  Zaloguj się <Icon name="arrowIcon" viewBox="0 0 14 14" size={14} color="white" />
                </>
              )}
            </button>

            <div className="login-divider">
              <span className="login-divider-line" />
              <span className="login-divider-text">LUB KONTYNUUJ</span>
              <span className="login-divider-line" />
            </div>

            <div className="social-login">
              <button type="button" className="social-btn" aria-label="Zaloguj przez Google">
                <GoogleIcon />
              </button>
              <button type="button" className="social-btn" aria-label="Zaloguj przez Apple">
                <AppleIcon />
              </button>
            </div>

            <Link to="/vet/logowanie" className="vet-login-link">
              <span>
                <img src={vetLogo} alt="" aria-hidden="true" />
              </span>
              <div>
                <strong>Pet Companion VET</strong>
                <small>Logowanie dla weterynarzy</small>
              </div>
              <i>›</i>
            </Link>
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
          <p className="login-footer-reg">
            <Link to="/main" className="login-footer-link">
              Poznaj Pet Companion →
            </Link>
          </p>
          <p className="login-footer-consent">
            Tworząc konto akceptujesz{" "}
            <a href="#terms">Regulamin</a> i{" "}
            <a href="#privacy">Politykę prywatności</a>
          </p>
          <p className="login-copyright">
            © 2026 Pet Companion. Dbamy o każdą łapkę
          </p>
          <div className="login-footer-links">
            <a href="#privacy">Prywatność</a>
            <a href="#terms">Regulamin</a>
            <a href="#support">Kontakt</a>
          </div>
        </div>
      </div>
    </div>
  );
}
