import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import { speciesEmoji, computeAge, dateBadge } from "./petUtils.ts";
import "./PetProfilePage.css";

export default function PetProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pets, entries } = useAuth();

  const pet = pets.find((p) => p.id === id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEntries = entries
    .filter((e) => {
      if (e.petId !== id || !e.date) return false;
      const d = new Date(e.date);
      d.setHours(0, 0, 0, 0);
      return d >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
    { label: "Waga", value: pet.weight ? `${pet.weight} kg` : "—" },
    { label: "Wiek", value: computeAge(pet.birthDate) },
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
          {upcomingEntries.length === 0 ? (
            <div className="empty-section">
              <span>📅</span>
              <p>Brak zaplanowanych wizyt</p>
            </div>
          ) : (
            <div className="entries-list">
              {upcomingEntries.map((entry) => {
                const { text: badge, urgent } = dateBadge(entry.date);
                return (
                  <div key={entry.id} className="entry-row">
                    <div className="entry-info">
                      <strong>{entry.category}</strong>
                      {entry.description && <p>{entry.description}</p>}
                    </div>
                    <span className={`entry-badge ${urgent ? "urgent" : ""}`}>{badge}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
