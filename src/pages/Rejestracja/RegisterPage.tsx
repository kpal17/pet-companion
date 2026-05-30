import React from "react";
import { Link, useNavigate } from "react-router-dom";
import imgPetCompanionLogo from "./pet_companion_logo.png";
import "./RegisterPage.css";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful registration and redirect to login page
    navigate("/logowanie");
  };

  return (
    <div className="page">
      <div className="header">
        <div>
          <img src={imgPetCompanionLogo} alt="Logo PetCompanion" />
        </div>
        <h1 className="title">Pet Companion</h1>
        <p className="subtitle">Dbamy o każdą łapkę</p>
        <h2 className="cta">Utwórz konto</h2>
        <p className="description">
          Dołącz do naszej społeczności miłośników zwierząt
        </p>
      </div>

      <form className="card" onSubmit={handleSubmit}>
        <label>
          Imię i Nazwisko
          <input
            type="text"
            placeholder="Wpisz swoje imię i nazwisko"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            placeholder="twój@email.com"
            required
          />
        </label>

        <label>
          Hasło
          <input type="password" placeholder="••••••••" required />
        </label>

        <label>
          Potwierdź hasło
          <input type="password" placeholder="••••••••" required />
        </label>

        <button type="submit" className="primary-btn">
          Utwórz konto
        </button>

        <p className="login">
          Masz już konto? <Link to="/logowanie" className="login-link">Zaloguj się</Link>
        </p>
      </form>

      <p className="footer">
        Tworząc konto akceptujesz <strong>Regulamin</strong> i{" "}
        <strong>Politykę prywatności</strong>
      </p>
    </div>
  );
};

export default RegisterPage;