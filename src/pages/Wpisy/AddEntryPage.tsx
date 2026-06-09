import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import { speciesEmoji } from "../Pupile/petUtils.ts";
import "./AddEntryPage.css";

const CATEGORIES = [
  "Odrobaczanie",
  "Szczepienie",
  "Wizyta kontrolna",
  "Podanie leku",
  "Pomiar wagi",
  "Pielęgnacja",
  "Inne",
];

export default function AddEntryPage() {
  const navigate = useNavigate();
  const { pets, addEntry } = useAuth();

  const [petId, setPetId] = useState(pets[0]?.id ?? "");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEntry({ petId, category, description, date });
    navigate("/home");
  };

  if (pets.length === 0) {
    return (
      <div className="add-entry-page">
        <div className="add-entry-header">
          <h1>Nowy wpis</h1>
        </div>
        <div className="no-pets">
          <span>🐾</span>
          <p>Najpierw dodaj pupila, żeby tworzyć wpisy.</p>
          <button className="go-btn" onClick={() => navigate("/pupile/dodaj")}>
            Dodaj pupila
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-entry-page">
      <div className="add-entry-header">
        <h1>Nowy wpis</h1>
      </div>

      <form className="add-entry-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="entry-pet">Pupil</label>
          <select
            id="entry-pet"
            value={petId}
            onChange={(e) => setPetId(e.target.value)}
          >
            {pets.map((p) => (
              <option key={p.id} value={p.id}>
                {speciesEmoji(p.species)} {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="entry-category">Kategoria</label>
          <select
            id="entry-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="entry-desc">Opis</label>
          <textarea
            id="entry-desc"
            placeholder="np. Podanie tabletki rano"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
          />
        </div>

        <div className="form-field">
          <label htmlFor="entry-date">Data</label>
          <input
            id="entry-date"
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Zapisz wpis
        </button>
      </form>
    </div>
  );
}
