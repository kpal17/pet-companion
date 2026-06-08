import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgPetCompanionLogo from "./pet_companion_logo.png";
import "./RegisterPage.css";
import { useAuth } from "../../context/AuthContext.tsx";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, password);
    navigate("/home");
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            placeholder="twój@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Hasło
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          Potwierdź hasło
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="primary-btn">
          Utwórz konto
        </button>

        <p className="login">
          Masz już konto?{" "}
          <Link to="/logowanie" className="login-link">
            Zaloguj się
          </Link>
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
