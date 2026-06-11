import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import PetAvatar from "./PetAvatar.tsx";
import "./PetsListPage.css";

export default function PetsListPage() {
  const navigate = useNavigate();
  const { entries, pets, reminders } = useAuth();

  return (
    <div className="pets-list-page">
      <div className="pets-content">
        <section className="pets-header">
          <div>
            <span>Profile i kartoteki</span>
            <h1>Moje pupile</h1>
            <p>Zdrowie, terminy i udostępnianie danych w jednym miejscu.</p>
          </div>
          <button className="add-btn" onClick={() => navigate("/pupile/dodaj")} aria-label="Dodaj pupila">
            +
          </button>
        </section>

        {pets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-emoji">🐾</div>
            <h2>Brak pupili</h2>
            <p>Dodaj swojego pierwszego futrzanego przyjaciela!</p>
            <button className="empty-btn" onClick={() => navigate("/pupile/dodaj")}>
              Dodaj pupila
            </button>
          </div>
        ) : (
          <div className="pets-list">
            {pets.map((pet) => (
              <button
                key={pet.id}
                className="pet-card"
                onClick={() => navigate(`/pupile/${pet.id}`)}
              >
                <PetAvatar pet={pet} className="pet-avatar" />
                <div className="pet-info">
                  <strong>{pet.name}</strong>
                  <span>{pet.species}{pet.breed ? ` · ${pet.breed}` : ""}</span>
                  <small>
                    {entries.filter((entry) => entry.petId === pet.id).length} wpisów ·{" "}
                    {reminders.filter((reminder) => reminder.petId === pet.id).length} terminów
                  </small>
                </div>
                <div className="pet-arrow">›</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
