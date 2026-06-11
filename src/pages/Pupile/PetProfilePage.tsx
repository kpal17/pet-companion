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
    generateVetAccessCode,
    entries,
    petShares,
    pets,
    reminders,
    removePetShare,
    revokeVetAccessCode,
    revokeVetGrant,
    vetAccessCodes,
    vetGrants,
    vetUsers,
  } = useAuth();
  const [shareEmail, setShareEmail] = useState("");
  const [shareRole, setShareRole] = useState<"vet" | "caregiver">("caregiver");
  const [codeUsageLimit, setCodeUsageLimit] = useState(1);

  const pet = pets.find((p) => p.id === id);
  const petEntries = entries
    .filter((entry) => entry.petId === id)
    .sort((a, b) => b.date.localeCompare(a.date));
  const petReminders = reminders
    .filter((reminder) => reminder.petId === id)
    .sort((a, b) => a.date.localeCompare(b.date));
  const shares = petShares.filter((share) => share.petId === id);
  const accessCodes = vetAccessCodes
    .filter((code) => code.petId === id)
    .sort((a, b) => b.expiresAt.localeCompare(a.expiresAt));
  const activeCode = accessCodes.find(
    (code) =>
      !code.revoked &&
      code.usageCount < code.usageLimit &&
      new Date(code.expiresAt).getTime() > Date.now(),
  );
  const activeVetGrants = vetGrants.filter((grant) => grant.petId === id && !grant.revoked);

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
      <div className="profile-content">
        <section className="profile-hero">
          <div className="profile-avatar">{speciesEmoji(pet.species)}</div>
          <div>
            <span className="profile-eyebrow">Profil pupila</span>
            <h2>{pet.name}</h2>
            <span className="profile-species">{pet.species}{pet.breed ? ` · ${pet.breed}` : ""}</span>
          </div>
          <strong>{pet.weight ? `${pet.weight} kg` : computeAge(pet.birthDate)}</strong>
        </section>

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
              <span>Pet Companion VET</span>
              <h3>Dostęp weterynaryjny</h3>
            </div>
          </div>
          <p className="sharing-description">
            Kod udostępnia wyłącznie kartotekę pupila {pet.name}. Jest ważny 24 godziny
            i nie daje dostępu do Twojego konta ani innych pupili.
          </p>

          {activeCode ? (
            <div className="vet-code-card">
              <span>Aktywny kod</span>
              <strong>{activeCode.code}</strong>
              <p>
                Ważny do {new Date(activeCode.expiresAt).toLocaleString("pl-PL", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })} · użycia {activeCode.usageCount}/{activeCode.usageLimit}
              </p>
              <button type="button" onClick={() => revokeVetAccessCode(activeCode.id)}>
                Cofnij kod
              </button>
            </div>
          ) : (
            <div className="vet-code-generate">
              <label>
                Limit użyć
                <select
                  value={codeUsageLimit}
                  onChange={(event) => setCodeUsageLimit(Number(event.target.value))}
                >
                  <option value={1}>Jednorazowy</option>
                  <option value={2}>2 użycia</option>
                  <option value={3}>3 użycia</option>
                </select>
              </label>
              <button
                type="button"
                onClick={() => generateVetAccessCode(pet.id, codeUsageLimit)}
              >
                Wygeneruj kod na 24h
              </button>
            </div>
          )}

          {activeVetGrants.length > 0 && (
            <div className="vet-access-list">
              <span className="vet-access-list-title">Aktywne dostępy</span>
              {activeVetGrants.map((grant) => {
                const vet = vetUsers.find((item) => item.id === grant.vetId);
                return (
                  <div key={grant.id}>
                    <span>
                      <strong>{vet?.name || "Weterynarz"}</strong>
                      {vet?.clinicName || vet?.email || "Profil VET"}
                    </span>
                    <button type="button" onClick={() => revokeVetGrant(grant.id)}>
                      Cofnij dostęp
                    </button>
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
              <h3>Pozostali opiekunowie</h3>
            </div>
          </div>
          <p className="sharing-description">
            Udostępnienia dla współopiekunów dotyczą wyłącznie profilu pupila {pet.name}.
          </p>
          <form className="sharing-form" onSubmit={submitShare}>
            <input
              type="email"
              value={shareEmail}
              onChange={(event) => setShareEmail(event.target.value)}
              placeholder="e-mail współopiekuna"
              required
            />
            <select
              value={shareRole}
              onChange={(event) => setShareRole(event.target.value as "vet" | "caregiver")}
            >
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
