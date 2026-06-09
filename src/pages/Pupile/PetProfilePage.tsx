import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import { speciesEmoji, computeAge, dateBadge } from "./petUtils.ts";
import "./PetProfilePage.css";

export default function PetProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    addPetShare,
    entries,
    petShares,
    pets,
    reminders,
    removePetShare,
  } = useAuth();
  const [shareEmail, setShareEmail] = useState("");
  const [shareRole, setShareRole] = useState<"vet" | "caregiver">("vet");

  const pet = pets.find((p) => p.id === id);
  const petEntries = entries
    .filter((entry) => entry.petId === id)
    .sort((a, b) => b.date.localeCompare(a.date));
  const petReminders = reminders
    .filter((reminder) => reminder.petId === id)
    .sort((a, b) => a.date.localeCompare(b.date));
  const shares = petShares.filter((share) => share.petId === id);

  const submitShare = (event: React.FormEvent) => {
    event.preventDefault();
    if (!id || !shareEmail.trim()) return;
    addPetShare({ petId: id, email: shareEmail.trim(), role: shareRole });
    setShareEmail("");
  };

  if (!pet) {
    return (
      <div className="pet-profile-page">
        <div className="profile-header">
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

        <div className="health-record">
          <div className="health-record-heading">
            <div>
              <span>Kartoteka zdrowia</span>
              <h3>Historia medyczna</h3>
            </div>
            <button type="button" onClick={() => navigate(`/wpisy/nowy?pet=${pet.id}`)}>
              + Dodaj wpis
            </button>
          </div>

          {petEntries.length === 0 ? (
            <div className="empty-section">
              <span>🩺</span>
              <p>Kartoteka jest jeszcze pusta.</p>
            </div>
          ) : (
            <div className="health-record-list">
              {petEntries.map((entry) => {
                const icons = {
                  vaccination: "💉",
                  visit: "🩺",
                  medication: "💊",
                  measurement: "📋",
                  other: "📎",
                };
                return (
                  <article key={entry.id} className="health-record-item">
                    <div className={`health-record-icon health-record-icon-${entry.recordType}`}>
                      {icons[entry.recordType]}
                    </div>
                    <div className="health-record-body">
                      <span>
                        {new Date(`${entry.date}T12:00:00`).toLocaleDateString("pl-PL")}
                        {entry.doctor ? ` · ${entry.doctor}` : ""}
                      </span>
                      <strong>{entry.category}</strong>
                      {entry.description && <p>{entry.description}</p>}
                      {entry.diagnosis && <p><b>Diagnoza:</b> {entry.diagnosis}</p>}
                      {entry.medicationName && (
                        <p><b>{entry.medicationName}</b>{entry.dosage ? ` · ${entry.dosage}` : ""}</p>
                      )}
                      {entry.recommendations && <p><b>Zalecenia:</b> {entry.recommendations}</p>}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <div className="section-card">
          <div className="profile-section-heading">
            <div>
              <span>Per pupil</span>
              <h3>Przypomnienia</h3>
            </div>
            <button type="button" onClick={() => navigate("/planer")}>Otwórz planer</button>
          </div>
          {petReminders.length === 0 ? (
            <div className="empty-section">
              <span>📅</span>
              <p>Brak przypomnień dla {pet.name}.</p>
            </div>
          ) : (
            <div className="entries-list">
              {petReminders.slice(0, 4).map((reminder) => {
                const { text: badge, urgent } = dateBadge(reminder.date);
                return (
                  <div key={reminder.id} className="entry-row">
                    <div className="entry-info">
                      <strong>{reminder.title}</strong>
                      <p>{reminder.time}{reminder.notes ? ` · ${reminder.notes}` : ""}</p>
                    </div>
                    <span className={`entry-badge ${urgent ? "urgent" : ""}`}>{badge}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="section-card">
          <div className="profile-section-heading">
            <div>
              <span>Dostęp do danych</span>
              <h3>Udostępnienia</h3>
            </div>
          </div>
          <p className="sharing-description">
            Dostęp dotyczy wyłącznie profilu i kartoteki pupila {pet.name}.
          </p>
          <form className="sharing-form" onSubmit={submitShare}>
            <input
              type="email"
              value={shareEmail}
              onChange={(event) => setShareEmail(event.target.value)}
              placeholder="e-mail weterynarza lub opiekuna"
              required
            />
            <select
              value={shareRole}
              onChange={(event) => setShareRole(event.target.value as "vet" | "caregiver")}
            >
              <option value="vet">Weterynarz</option>
              <option value="caregiver">Opiekun</option>
            </select>
            <button type="submit">Udostępnij</button>
          </form>
          {shares.length > 0 && (
            <div className="sharing-list">
              {shares.map((share) => (
                <div key={share.id}>
                  <span>
                    <strong>{share.email}</strong>
                    {share.role === "vet" ? "Weterynarz" : "Opiekun"}
                  </span>
                  <button type="button" onClick={() => removePetShare(share.id)}>Usuń</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
