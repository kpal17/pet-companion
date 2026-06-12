import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import PetAvatar from "./PetAvatar.tsx";
import { SPECIES_OPTIONS } from "./petUtils.ts";
import "./AddPetPage.css";

const MAX_PHOTO_SIZE = 8 * 1024 * 1024;
const PHOTO_EDGE = 720;

function preparePetPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Nie udało się odczytać zdjęcia."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Wybrany plik nie jest prawidłowym zdjęciem."));
      image.onload = () => {
        const scale = Math.min(1, PHOTO_EDGE / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));

        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Nie udało się przygotować zdjęcia."));
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = String(reader.result);
    };

    reader.readAsDataURL(file);
  });
}

export default function AddPetPage() {
  const navigate = useNavigate();
  const { addPet } = useAuth();

  const [name, setName] = useState("");
  const [species, setSpecies] = useState(SPECIES_OPTIONS[0]);
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [microchipNumber, setMicrochipNumber] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [isPreparingPhoto, setIsPreparingPhoto] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPet({
      name,
      species,
      breed,
      birthDate,
      weight,
      microchipNumber: microchipNumber || undefined,
      photo: photo || undefined,
    });
    navigate("/pupile");
  };

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPhotoError("");
    if (!file.type.startsWith("image/")) {
      setPhotoError("Wybierz plik graficzny.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      setPhotoError("Zdjęcie może mieć maksymalnie 8 MB.");
      event.target.value = "";
      return;
    }

    setIsPreparingPhoto(true);
    try {
      setPhoto(await preparePetPhoto(file));
    } catch (error) {
      setPhotoError(error instanceof Error ? error.message : "Nie udało się dodać zdjęcia.");
      event.target.value = "";
    } finally {
      setIsPreparingPhoto(false);
    }
  };

  return (
    <div className="add-pet-page">
      <div className="add-pet-header">
        <div>
          <span>Nowy profil</span>
          <h1>Dodaj pupila</h1>
          <p>Podstawowe dane wystarczą, aby rozpocząć prowadzenie kartoteki.</p>
        </div>
      </div>

      <form className="add-pet-form" onSubmit={handleSubmit}>
        <div className="pet-photo-field">
          <PetAvatar
            pet={{ name: name || "nowego pupila", species, photo: photo || undefined }}
            className="pet-photo-preview"
          />
          <div>
            <label className="pet-photo-button" htmlFor="pet-photo">
              {photo ? "Wybierz inne zdjęcie" : "Dodaj zdjęcie pupila"}
            </label>
            <input
              id="pet-photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              disabled={isPreparingPhoto}
            />
            <p>Opcjonalnie. Wybierz zdjęcie z urządzenia, maksymalnie 8 MB.</p>
            {isPreparingPhoto && <span className="pet-photo-status">Przygotowuję zdjęcie...</span>}
            {photoError && <span className="pet-photo-error">{photoError}</span>}
            {photo && (
              <button type="button" className="pet-photo-remove" onClick={() => setPhoto("")}>
                Usuń zdjęcie
              </button>
            )}
          </div>
        </div>

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

        <div className="form-field">
          <label htmlFor="pet-microchip">
            Numer mikroczipa <span className="optional">(opcjonalnie)</span>
          </label>
          <input
            id="pet-microchip"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            pattern="[0-9]{15}"
            maxLength={15}
            placeholder="15 cyfr"
            title="Numer mikroczipa musi składać się dokładnie z 15 cyfr."
            value={microchipNumber}
            onChange={(e) => setMicrochipNumber(e.target.value.replace(/\D/g, "").slice(0, 15))}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isPreparingPhoto}>
          Dodaj pupila
        </button>
      </form>
    </div>
  );
}
