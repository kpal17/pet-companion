import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import { speciesEmoji, computeAge } from "./petUtils.ts";
import "./PetProfilePage.css";

export default function PetProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pets } = useAuth();

  const pet = pets.find((p) => p.id === id);

  if (!pet) {
    return (
      <div className="pet-profile-page">
        <div className="profile-header">
          <button className="back-btn" onClick={() => navigate("/pupile")}>←</button>
          <h1>Profil pupila</h1>
        </div>
        <div className="not-found">Nie znaleziono pupila.</div>
      </div>
    );
  }

  const infoRows = [
    { label: "Gatunek", value: pet.species },
    { label: "Rasa", value: pet.breed || "—" },
    { label: "Wiek", value: computeAge(pet.birthDate) },
    { label: "Waga", value: pet.weight ? `${pet.weight} kg` : "—" },
  ];

  return (
    <div className="pet-profile-page">
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate("/pupile")} aria-label="Wróć">
          ←
        </button>
        <h1>{pet.name}</h1>
      </div>

      <div className="profile-hero">
        <div className="profile-avatar">{speciesEmoji(pet.species)}</div>
        <h2>{pet.name}</h2>
        <span className="profile-species">{pet.species}{pet.breed ? ` · ${pet.breed}` : ""}</span>
      </div>

      <div className="profile-content">
        <div className="info-card">
          <h3>Podstawowe informacje</h3>
          <div className="info-grid">
            {infoRows.map(({ label, value }) => (
              <div key={label} className="info-cell">
                <span className="info-label">{label}</span>
                <span className="info-value">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <h3>Historia medyczna</h3>
          <div className="empty-section">
            <span>🩺</span>
            <p>Brak wpisów medycznych</p>
          </div>
        </div>

        <div className="section-card">
          <h3>Nadchodzące wizyty</h3>
          <div className="empty-section">
            <span>📅</span>
            <p>Brak zaplanowanych wizyt</p>
          </div>
        </div>
      </div>
    </div>
  );
}
