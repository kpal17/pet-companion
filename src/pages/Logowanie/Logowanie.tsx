import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Logowanie.css";
import { Icon } from "../../Icon.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import imgLogo from "./00e9533793b01d90c34b50db08b84853998152cb.png";
import imgGoogle from "./74278594c1cfa9698502b9bedd64094874d20732.png";

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
                  {showPassword ? (
                    <Icon name="eyeOpenIcon" viewBox="0 0 22 16" size={22} color="#817478" />
                  ) : (
                    <Icon name="eyeClosedIcon" viewBox="0 0 22 20" size={22} color="#817478" stroke />
                  )}
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
                <img src={imgGoogle} alt="Google" width="24" height="24" />
              </button>
              <button type="button" className="social-btn" aria-label="Zaloguj przez Apple">
                <Icon name="appleIcon" viewBox="0 0 20 24" size={20} color="#161A32" />
              </button>
            </div>

            <Link to="/vet/logowanie" className="vet-login-link">
              <span>✚</span>
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
