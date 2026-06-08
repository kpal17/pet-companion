import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthBrand from "../components/AuthBrand";
import AuthFormField from "../components/AuthFormField";
import { useAuth } from "../context/AuthContext.tsx";
import logo from "./Rejestracja/pet_companion_logo.png";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    register(name, email, password);
    navigate("/home");
  };

  return (
    <main className="signup-page">
      <div className="signup-orb" aria-hidden="true" />

      <section className="signup-shell" aria-labelledby="signup-title">
        <AuthBrand logoSrc={logo} title="Pet Companion" tagline="Dbamy o każdą łapkę" />

        <div className="signup-hero">
          <h2 className="signup-hero__title" id="signup-title">
            Utwórz konto
          </h2>
          <p className="signup-hero__text">
            Dołącz do naszej społeczności miłośników zwierząt
          </p>
        </div>

        <form className="signup-card" onSubmit={handleSubmit}>
          <AuthFormField
            id="full-name"
            label="Imię i Nazwisko"
            icon="user"
            placeholder="Wpisz swoje imię i nazwisko"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
          />
          <AuthFormField
            id="email"
            label="Email"
            icon="email"
            type="email"
            placeholder="twój@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
          <AuthFormField
            id="password"
            label="Hasło"
            icon="lock"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
          />
          <AuthFormField
            id="confirm-password"
            label="Potwierdź hasło"
            icon="shield"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
          />

          <button className="signup-submit" type="submit">
            Utwórz konto
          </button>

          <p className="signup-login-note">
            Masz już konto?{" "}
            <Link className="signup-login-link" to="/logowanie">
              Zaloguj się
            </Link>
          </p>
        </form>

        <p className="signup-consent">
          Tworząc konto akceptujesz{" "}
          <a href="#regulamin">Regulamin</a> i{" "}
          <a href="#polityka-prywatnosci">Politykę prywatności</a>
        </p>
      </section>

      <footer className="signup-footer">
        <p>© 2026 Pet Companion. Dbamy o każdą łapkę</p>
        <nav className="signup-footer__nav" aria-label="Linki stopki">
          <a href="#prywatnosc">Prywatność</a>
          <a href="#regulamin">Regulamin</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
      </footer>
    </main>
  );
}
