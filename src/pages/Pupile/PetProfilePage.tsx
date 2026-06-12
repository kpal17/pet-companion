import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import PetAvatar from "./PetAvatar.tsx";
import { computeAge, dateBadge, SPECIES_OPTIONS } from "./petUtils.ts";
import "./PetProfilePage.css";

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

export default function PetProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    addPetShare,
    deletePet,
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
    updatePet,
  } = useAuth();
  const [shareEmail, setShareEmail] = useState("");
  const [shareRole, setShareRole] = useState<"vet" | "caregiver">("caregiver");
  const [codeUsageLimit, setCodeUsageLimit] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPreparingPhoto, setIsPreparingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState("");

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

  const [editForm, setEditForm] = useState({
    name: pet?.name || "",
    species: pet?.species || SPECIES_OPTIONS[0],
    breed: pet?.breed || "",
    birthDate: pet?.birthDate || "",
    weight: pet?.weight || "",
    microchipNumber: pet?.microchipNumber || "",
    photo: pet?.photo || "",
  });

  const submitShare = (event: React.FormEvent) => {
    event.preventDefault();
    if (!id || !shareEmail.trim()) return;
    addPetShare({ petId: id, email: shareEmail.trim(), role: shareRole });
    setShareEmail("");
  };

  const openEdit = () => {
    if (!pet) return;
    setEditForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      birthDate: pet.birthDate,
      weight: pet.weight,
      microchipNumber: pet.microchipNumber || "",
      photo: pet.photo || "",
    });
    setPhotoError("");
    setIsEditing(true);
  };

  const submitEdit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!pet || !editForm.name.trim() || isPreparingPhoto) return;
    updatePet(pet.id, {
      name: editForm.name.trim(),
      species: editForm.species,
      breed: editForm.breed.trim(),
      birthDate: editForm.birthDate,
      weight: editForm.weight,
      microchipNumber: editForm.microchipNumber || undefined,
      photo: editForm.photo || undefined,
    });
    setIsEditing(false);
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
      const photo = await preparePetPhoto(file);
      setEditForm((current) => ({ ...current, photo }));
    } catch (error) {
      setPhotoError(error instanceof Error ? error.message : "Nie udało się dodać zdjęcia.");
      event.target.value = "";
    } finally {
      setIsPreparingPhoto(false);
    }
  };

  const confirmDelete = () => {
    if (!pet) return;
    deletePet(pet.id);
    navigate("/pupile", { replace: true });
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
    { label: "Numer mikroczipa", value: pet.microchipNumber || "—" },
  ];

  return (
    <div className="pet-profile-page">
      <div className="profile-content">
        <section className="profile-hero">
          <PetAvatar pet={pet} className="profile-avatar" />
          <div>
            <span className="profile-eyebrow">Profil pupila</span>
            <h2>{pet.name}</h2>
            <span className="profile-species">{pet.species}{pet.breed ? ` · ${pet.breed}` : ""}</span>
          </div>
          <div className="profile-hero-actions">
            <strong>{pet.weight ? `${pet.weight} kg` : computeAge(pet.birthDate)}</strong>
            <button type="button" onClick={openEdit}>Edytuj profil</button>
          </div>
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
                const matchingVet = vetUsers.find(
                  (vet) => entry.doctor?.toLowerCase().includes(vet.name.toLowerCase()),
                );
                const clinicName = entry.clinicName || matchingVet?.clinicName;
                const clinicAddress = entry.clinicAddress || matchingVet?.clinicAddress;
                const clinicPhone = entry.clinicPhone || matchingVet?.phone;
                const hasDetails = Boolean(
                  entry.description ||
                  entry.diagnosis ||
                  entry.recommendations ||
                  entry.medicationName ||
                  entry.dosage ||
                  entry.doctor ||
                  clinicName ||
                  clinicAddress ||
                  clinicPhone,
                );
                return (
                  <article key={entry.id} className="health-record-item">
                    <div className={`health-record-icon health-record-icon-${entry.recordType}`}>
                      {icons[entry.recordType]}
                    </div>
                    <div className="health-record-body">
                      <span className="health-record-date">
                        {new Date(`${entry.date}T12:00:00`).toLocaleDateString("pl-PL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                        {entry.visitTime ? ` · ${entry.visitTime}` : ""}
                      </span>
                      <strong>{entry.category}</strong>
                      {(entry.doctor || clinicName) && (
                        <p className="health-record-preview">
                          {entry.doctor || "Weterynarz"}
                          {clinicName ? ` · ${clinicName}` : ""}
                        </p>
                      )}
                      {hasDetails && (
                        <details className="health-record-details">
                          <summary>
                            <span>Pokaż szczegóły</span>
                            <i>⌄</i>
                          </summary>
                          <div className="health-record-details-content">
                            {(entry.visitTime || clinicName || clinicAddress || clinicPhone) && (
                              <div className="visit-information-grid">
                                {entry.visitTime && (
                                  <div><span>Godzina</span><strong>{entry.visitTime}</strong></div>
                                )}
                                {entry.doctor && (
                                  <div><span>Weterynarz</span><strong>{entry.doctor}</strong></div>
                                )}
                                {clinicName && (
                                  <div><span>Klinika</span><strong>{clinicName}</strong></div>
                                )}
                                {clinicAddress && (
                                  <div><span>Adres</span><strong>{clinicAddress}</strong></div>
                                )}
                                {clinicPhone && (
                                  <div>
                                    <span>Telefon</span>
                                    <a href={`tel:${clinicPhone.replace(/\s/g, "")}`}>{clinicPhone}</a>
                                  </div>
                                )}
                              </div>
                            )}
                            {entry.description && <p>{entry.description}</p>}
                            {entry.diagnosis && <p><b>Diagnoza:</b> {entry.diagnosis}</p>}
                            {entry.medicationName && (
                              <p><b>{entry.medicationName}</b>{entry.dosage ? ` · ${entry.dosage}` : ""}</p>
                            )}
                            {entry.recommendations && <p><b>Zalecenia:</b> {entry.recommendations}</p>}
                            {entry.nextDate && (
                              <p>
                                <b>Kolejny termin:</b>{" "}
                                {new Date(`${entry.nextDate}T12:00:00`).toLocaleDateString("pl-PL")}
                              </p>
                            )}
                          </div>
                        </details>
                      )}
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

        <div className="profile-danger-zone">
          <div>
            <strong>Usuń profil pupila</strong>
            <p>Usunięte zostaną także wpisy, przypomnienia i udzielone dostępy dotyczące {pet.name}.</p>
          </div>
          <button type="button" onClick={() => setIsDeleting(true)}>Usuń profil</button>
        </div>
      </div>

      {isEditing && (
        <div className="pet-profile-modal" role="dialog" aria-modal="true" aria-labelledby="edit-pet-title">
          <button className="pet-profile-modal__backdrop" type="button" aria-label="Zamknij edycję" onClick={() => setIsEditing(false)} />
          <form className="pet-profile-modal__card pet-edit-form" onSubmit={submitEdit}>
            <div className="pet-profile-modal__heading">
              <div>
                <span>Profil pupila</span>
                <h2 id="edit-pet-title">Edytuj dane</h2>
              </div>
              <button type="button" aria-label="Zamknij" onClick={() => setIsEditing(false)}>×</button>
            </div>

            <div className="pet-edit-photo">
              <PetAvatar
                pet={{ name: editForm.name || pet.name, species: editForm.species, photo: editForm.photo || undefined }}
                className="pet-edit-photo__preview"
              />
              <div>
                <label htmlFor="edit-pet-photo">
                  {editForm.photo ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
                </label>
                <input id="edit-pet-photo" type="file" accept="image/*" onChange={handlePhotoChange} disabled={isPreparingPhoto} />
                {isPreparingPhoto && <span>Przygotowuję zdjęcie...</span>}
                {photoError && <span className="pet-edit-photo__error">{photoError}</span>}
                {editForm.photo && (
                  <button type="button" onClick={() => setEditForm((current) => ({ ...current, photo: "" }))}>
                    Usuń zdjęcie
                  </button>
                )}
              </div>
            </div>

            <div className="pet-edit-form__fields">
              <label>
                Imię pupila
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(event) => setEditForm((current) => ({ ...current, name: event.target.value }))}
                  required
                />
              </label>
              <label>
                Gatunek
                <select
                  value={editForm.species}
                  onChange={(event) => setEditForm((current) => ({ ...current, species: event.target.value }))}
                >
                  {SPECIES_OPTIONS.map((species) => <option key={species}>{species}</option>)}
                </select>
              </label>
              <label>
                Rasa <span>(opcjonalnie)</span>
                <input
                  type="text"
                  value={editForm.breed}
                  onChange={(event) => setEditForm((current) => ({ ...current, breed: event.target.value }))}
                />
              </label>
              <label>
                Data urodzenia <span>(opcjonalnie)</span>
                <input
                  type="date"
                  value={editForm.birthDate}
                  onChange={(event) => setEditForm((current) => ({ ...current, birthDate: event.target.value }))}
                />
              </label>
              <label>
                Waga (kg) <span>(opcjonalnie)</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={editForm.weight}
                  onChange={(event) => setEditForm((current) => ({ ...current, weight: event.target.value }))}
                />
              </label>
              <label>
                Numer mikroczipa <span>(opcjonalnie)</span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{15}"
                  maxLength={15}
                  title="Numer mikroczipa musi składać się dokładnie z 15 cyfr."
                  value={editForm.microchipNumber}
                  onChange={(event) => setEditForm((current) => ({
                    ...current,
                    microchipNumber: event.target.value.replace(/\D/g, "").slice(0, 15),
                  }))}
                />
              </label>
            </div>

            <div className="pet-profile-modal__actions">
              <button type="button" onClick={() => setIsEditing(false)}>Anuluj</button>
              <button type="submit" disabled={isPreparingPhoto}>Zapisz zmiany</button>
            </div>
          </form>
        </div>
      )}

      {isDeleting && (
        <div className="pet-profile-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-pet-title">
          <button className="pet-profile-modal__backdrop" type="button" aria-label="Anuluj usuwanie" onClick={() => setIsDeleting(false)} />
          <div className="pet-profile-modal__card pet-delete-dialog">
            <div className="pet-delete-dialog__icon">!</div>
            <h2 id="delete-pet-title">Usunąć profil {pet.name}?</h2>
            <p>
              Tej operacji nie można cofnąć. Historia medyczna, przypomnienia,
              udostępnienia i dostępy VET tego pupila również zostaną usunięte.
            </p>
            <div className="pet-profile-modal__actions">
              <button type="button" onClick={() => setIsDeleting(false)}>Anuluj</button>
              <button type="button" className="pet-delete-confirm" onClick={confirmDelete}>Usuń bezpowrotnie</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
