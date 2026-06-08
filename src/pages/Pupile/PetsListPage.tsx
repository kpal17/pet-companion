import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import { speciesEmoji } from "./petUtils.ts";
import "./PetsListPage.css";

export default function PetsListPage() {
  const navigate = useNavigate();
  const { pets } = useAuth();

  return (
    <div className="pets-list-page">
      <div className="pets-header">
        <button className="back-btn" onClick={() => navigate("/home")} aria-label="Wróć">
          ←
        </button>
        <h1>Moje pupile</h1>
        <button className="add-btn" onClick={() => navigate("/pupile/dodaj")} aria-label="Dodaj pupila">
          +
        </button>
      </div>

      <div className="pets-content">
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
              <div
                key={pet.id}
                className="pet-card"
                onClick={() => navigate(`/pupile/${pet.id}`)}
              >
                <div className="pet-avatar">{speciesEmoji(pet.species)}</div>
                <div className="pet-info">
                  <strong>{pet.name}</strong>
                  <span>{pet.species}{pet.breed ? ` · ${pet.breed}` : ""}</span>
                </div>
                <div className="pet-arrow">›</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
