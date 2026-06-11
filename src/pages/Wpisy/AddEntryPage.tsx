import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, type Entry } from "../../context/AuthContext.tsx";
import { speciesEmoji } from "../Pupile/petUtils.ts";
import "./AddEntryPage.css";

const RECORD_TYPES: Array<{ value: Entry["recordType"]; label: string }> = [
  { value: "vaccination", label: "Szczepienie" },
  { value: "visit", label: "Wizyta weterynaryjna" },
  { value: "medication", label: "Lek lub kuracja" },
  { value: "measurement", label: "Pomiar / badanie" },
  { value: "other", label: "Inny wpis" },
];

export default function AddEntryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pets, addEntry } = useAuth();

  const requestedPetId = searchParams.get("pet");
  const [petId, setPetId] = useState(
    pets.some((pet) => pet.id === requestedPetId) ? requestedPetId || "" : pets[0]?.id ?? "",
  );
  const [recordType, setRecordType] = useState<Entry["recordType"]>("visit");
  const [category, setCategory] = useState("Wizyta kontrolna");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [nextDate, setNextDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEntry({
      petId,
      category,
      description,
      date,
      recordType,
      doctor,
      diagnosis,
      recommendations,
      medicationName,
      dosage,
      nextDate,
    });
    navigate(`/pupile/${petId}`);
  };

  if (pets.length === 0) {
    return (
      <div className="add-entry-page">
        <div className="add-entry-header">
          <div>
            <span>Kartoteka zdrowia</span>
            <h1>Nowy wpis</h1>
            <p>Najpierw dodaj profil pupila, którego dotyczy wpis.</p>
          </div>
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
        <div>
          <span>Kartoteka zdrowia</span>
          <h1>Dodaj wpis</h1>
          <p>Zapisz wizytę, szczepienie, lek, wynik badania lub pomiar.</p>
        </div>
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
          <label htmlFor="entry-type">Rodzaj wpisu</label>
          <select
            id="entry-type"
            value={recordType}
            onChange={(e) => setRecordType(e.target.value as Entry["recordType"])}
          >
            {RECORD_TYPES.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="entry-category">Nazwa wpisu</label>
          <input
            id="entry-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="np. Kontrola uszu"
            required
          />
        </div>

        {recordType === "visit" && (
          <>
            <div className="form-field">
              <label htmlFor="entry-doctor">Lekarz / lecznica</label>
              <input
                id="entry-doctor"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                placeholder="np. lek. Anna Kowalska, Artemis"
              />
            </div>
            <div className="form-field">
              <label htmlFor="entry-diagnosis">Diagnoza</label>
              <input
                id="entry-diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Rozpoznanie po wizycie"
              />
            </div>
          </>
        )}

        {recordType === "medication" && (
          <>
            <div className="form-field">
              <label htmlFor="entry-medication">Nazwa leku</label>
              <input
                id="entry-medication"
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
                placeholder="np. Bravecto"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="entry-dosage">Dawkowanie</label>
              <input
                id="entry-dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="np. 1 tabletka co 3 miesiące"
              />
            </div>
          </>
        )}

        <div className="form-field">
          <label htmlFor="entry-desc">Opis / preparat / wynik</label>
          <textarea
            id="entry-desc"
            placeholder="Najważniejsze informacje o wpisie"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
          />
        </div>

        <div className="form-field">
          <label htmlFor="entry-recommendations">Zalecenia</label>
          <textarea
            id="entry-recommendations"
            placeholder="Zalecenia lekarza lub dalsze kroki"
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
            rows={2}
          />
        </div>

        <div className="form-field">
          <label htmlFor="entry-next-date">Kolejny termin (opcjonalnie)</label>
          <input
            id="entry-next-date"
            type="date"
            value={nextDate}
            min={date || today}
            onChange={(e) => setNextDate(e.target.value)}
          />
          <small>Utworzy przypomnienie w planerze dla tego pupila.</small>
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
