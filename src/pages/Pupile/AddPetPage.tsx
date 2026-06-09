import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import { SPECIES_OPTIONS } from "./petUtils.ts";
import "./AddPetPage.css";

export default function AddPetPage() {
  const navigate = useNavigate();
  const { addPet } = useAuth();

  const [name, setName] = useState("");
  const [species, setSpecies] = useState(SPECIES_OPTIONS[0]);
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPet({ name, species, breed, birthDate, weight });
    navigate("/pupile");
  };

  return (
    <div className="add-pet-page">
      <div className="add-pet-header">
        <h1>Nowy pupil</h1>
      </div>

      <form className="add-pet-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="pet-name">Imię pupila</label>
          <input
            id="pet-name"
            type="text"
            placeholder="np. Burek"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="pet-species">Gatunek</label>
          <select
            id="pet-species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          >
            {SPECIES_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="pet-breed">Rasa <span className="optional">(opcjonalnie)</span></label>
          <input
            id="pet-breed"
            type="text"
            placeholder="np. Golden Retriever"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="pet-birth">Data urodzenia <span className="optional">(opcjonalnie)</span></label>
          <input
            id="pet-birth"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="pet-weight">Waga (kg) <span className="optional">(opcjonalnie)</span></label>
          <input
            id="pet-weight"
            type="number"
            min="0"
            step="0.1"
            placeholder="np. 4.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">
          Dodaj pupila
        </button>
      </form>
    </div>
  );
}
