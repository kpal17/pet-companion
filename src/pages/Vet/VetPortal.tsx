import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth, type Reminder, type VetActivity } from "../../context/AuthContext.tsx";
import { computeAge, dateBadge, speciesEmoji } from "../Pupile/petUtils.ts";
import vetLogo from "./vet-logo.png";
import "./VetPortal.css";

const specializations = [
  "Choroby psów i kotów",
  "Chirurgia weterynaryjna",
  "Dermatologia",
  "Kardiologia",
  "Stomatologia",
  "Zwierzęta egzotyczne",
  "Inna",
];

const activityLabels: Record<VetActivity["type"], string> = {
  access_granted: "Uzyskano dostęp",
  record_opened: "Otwarto kartotekę",
  entry_added: "Dodano wpis medyczny",
};

function nextReminderDate(reminder: Reminder) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let occurrence = new Date(`${reminder.date}T12:00:00`);
  if (reminder.recurrence === "none") return occurrence >= today ? occurrence : null;

  for (let index = 0; index < 1500 && occurrence < today; index += 1) {
    const next = new Date(occurrence);
    if (reminder.recurrence === "daily") next.setDate(next.getDate() + 1);
    if (reminder.recurrence === "weekly") next.setDate(next.getDate() + 7);
    if (reminder.recurrence === "monthly") next.setMonth(next.getMonth() + 1);
    if (reminder.recurrence === "quarterly") next.setMonth(next.getMonth() + 3);
    if (reminder.recurrence === "yearly") next.setFullYear(next.getFullYear() + 1);
    occurrence = next;
  }
  return occurrence >= today ? occurrence : null;
}

function formatActivityDate(value: string) {
  return new Date(value).toLocaleString("pl-PL", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function VetBrand() {
  return (
    <div className="vet-brand">
      <img src={vetLogo} alt="Logo Pet Companion VET" />
      <h1>Pet Companion <span>VET</span></h1>
      <p>Profesjonalna opieka weterynaryjna</p>
    </div>
  );
}

function VetAuthFooter() {
  return (
    <footer className="vet-auth-footer">
      <p>© 2026 Pet Companion VET</p>
      <div>
        <a href="#privacy">Prywatność</a>
        <a href="#terms">Regulamin</a>
        <a href="#support">Kontakt</a>
      </div>
    </footer>
  );
}

export function VetRegisterPage() {
  const { registerVet } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    licenseNumber: "",
    specialization: specializations[0],
    clinicName: "",
    clinicAddress: "",
    phone: "",
    email: "",
    password: "",
  });

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    registerVet(form);
    navigate("/vet/dashboard");
  };

  return (
    <main className="vet-auth-page">
      <div className="vet-auth-blob vet-auth-blob--pink" aria-hidden="true" />
      <div className="vet-auth-blob vet-auth-blob--purple" aria-hidden="true" />
      <section className="vet-auth-shell" aria-labelledby="vet-register-title">
        <VetBrand />
        <div className="vet-auth-intro">
          <h2 id="vet-register-title">Utwórz profil zawodowy</h2>
          <p>Zarejestruj profil zawodowy i bezpiecznie współpracuj z opiekunami zwierząt.</p>
        </div>

        <form className="vet-register-card" onSubmit={submit}>
          <fieldset>
            <legend>Dane osobowe</legend>
            <label>
              Imię i nazwisko
              <input
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="Wpisz imię i nazwisko"
                autoComplete="name"
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Uprawnienia zawodowe</legend>
            <div className="vet-auth-grid">
              <label>
                Numer PWZ
                <input
                  value={form.licenseNumber}
                  onChange={(event) => update("licenseNumber", event.target.value)}
                  placeholder="Numer prawa wykonywania zawodu"
                  required
                />
              </label>
              <label>
                Specjalizacja
                <select
                  value={form.specialization}
                  onChange={(event) => update("specialization", event.target.value)}
                >
                  {specializations.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Informacje o klinice</legend>
            <label>
              Nazwa kliniki
              <input
                value={form.clinicName}
                onChange={(event) => update("clinicName", event.target.value)}
                placeholder="Nazwa kliniki lub gabinetu"
                required
              />
            </label>
            <label>
              Adres kliniki
              <textarea
                value={form.clinicAddress}
                onChange={(event) => update("clinicAddress", event.target.value)}
                placeholder="Ulica, numer, miejscowość"
                rows={2}
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Kontakt i bezpieczeństwo</legend>
            <div className="vet-auth-grid">
              <label>
                Numer telefonu
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  placeholder="+48 000 000 000"
                  autoComplete="tel"
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder="lekarz@klinika.pl"
                  autoComplete="email"
                  required
                />
              </label>
            </div>
            <label>
              Hasło
              <input
                type="password"
                value={form.password}
                onChange={(event) => update("password", event.target.value)}
                placeholder="Minimum 6 znaków"
                minLength={6}
                autoComplete="new-password"
                required
              />
            </label>
          </fieldset>
          <label className="vet-consent">
            <input type="checkbox" required />
            Akceptuję regulamin świadczenia usług i zasady dostępu do danych medycznych.
          </label>
          <button className="vet-primary-button" type="submit">Załóż profil zawodowy</button>
          <p className="vet-auth-switch">
            Masz profil? <Link to="/vet/logowanie">Zaloguj się</Link>
          </p>
        </form>
        <p className="vet-auth-consent">
          Tworząc konto akceptujesz <a href="#terms">Regulamin</a> i{" "}
          <a href="#privacy">Politykę prywatności</a>
        </p>
        <VetAuthFooter />
      </section>
    </main>
  );
}

export function VetLoginPage() {
  const { loginVet } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!loginVet(email, password)) {
      setError("Nieprawidłowy e-mail lub hasło.");
      return;
    }
    navigate("/vet/dashboard");
  };

  return (
    <main className="vet-auth-page vet-login-page">
      <div className="vet-auth-blob vet-auth-blob--pink" aria-hidden="true" />
      <div className="vet-auth-blob vet-auth-blob--purple" aria-hidden="true" />
      <section className="vet-auth-shell" aria-labelledby="vet-login-title">
        <VetBrand />
        <div className="vet-auth-intro">
          <h2 id="vet-login-title">Witaj ponownie</h2>
          <p>Zaloguj się, aby otworzyć kartoteki udostępnione przez właścicieli.</p>
        </div>
        <form className="vet-register-card" onSubmit={submit}>
          <fieldset>
            <legend>Dane logowania</legend>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="lekarz@klinika.pl"
                autoComplete="email"
                required
              />
            </label>
            <label>
              <span className="vet-password-label">
                Hasło
                <button type="button">Zapomniałeś hasła?</button>
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </label>
          </fieldset>
          {error && <p className="vet-form-error">{error}</p>}
          <button className="vet-primary-button" type="submit">Zaloguj się do VET</button>
          <p className="vet-auth-switch">
            Nie masz profilu? <Link to="/vet/rejestracja">Zarejestruj się</Link>
          </p>
          <Link className="vet-owner-return" to="/logowanie">Wróć do panelu opiekuna</Link>
        </form>
        <p className="vet-auth-consent">
          Logując się akceptujesz <a href="#terms">Regulamin</a> i{" "}
          <a href="#privacy">Politykę prywatności</a>
        </p>
        <VetAuthFooter />
      </section>
    </main>
  );
}

export function VetDashboardPage() {
  const {
    currentVet,
    entries,
    pets,
    redeemVetAccessCode,
    reminders,
    vetActivities,
    vetGrants,
  } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  if (!currentVet) return <Navigate to="/vet/logowanie" replace />;

  const grants = vetGrants.filter((grant) => grant.vetId === currentVet.id && !grant.revoked);
  const patients = grants
    .map((grant) => pets.find((pet) => pet.id === grant.petId))
    .filter((pet): pet is NonNullable<typeof pet> => Boolean(pet));
  const accessibleIds = new Set(patients.map((pet) => pet.id));
  const activities = vetActivities
    .filter((activity) => activity.vetId === currentVet.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const recentPatientIds = [
    ...activities.map((activity) => activity.petId),
    ...entries
      .filter((entry) => accessibleIds.has(entry.petId) && entry.doctor?.includes(currentVet.name))
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((entry) => entry.petId),
    ...patients.map((pet) => pet.id),
  ].filter((id, index, list) => list.indexOf(id) === index);
  const recentPatients = recentPatientIds
    .map((id) => patients.find((pet) => pet.id === id))
    .filter((pet): pet is NonNullable<typeof pet> => Boolean(pet))
    .slice(0, 4);
  const upcoming = reminders
    .filter((reminder) => accessibleIds.has(reminder.petId))
    .map((reminder) => ({ reminder, occurrence: nextReminderDate(reminder) }))
    .filter(
      (item): item is { reminder: Reminder; occurrence: Date } => item.occurrence !== null,
    )
    .sort((a, b) => a.occurrence.getTime() - b.occurrence.getTime())
    .slice(0, 3);
  const lastPatient = recentPatients[0];

  const redeem = (event: React.FormEvent) => {
    event.preventDefault();
    const result = redeemVetAccessCode(code);
    setMessage(result.message);
    if (result.ok) setCode("");
  };

  return (
    <main className="vet-dashboard">
      <section className="vet-welcome">
        <div>
          <span>Dzień dobry,</span>
          <h1>{currentVet.name}</h1>
          <p>{currentVet.specialization} · {currentVet.clinicName}</p>
        </div>
        <div className="vet-license">PWZ {currentVet.licenseNumber}</div>
      </section>

      <section className="vet-dashboard-section">
        <div className="vet-section-heading">
          <div>
            <span>Najczęstsze zadania</span>
            <h2>Szybkie akcje</h2>
          </div>
        </div>
        <div className="vet-quick-actions">
          <button type="button" onClick={() => document.querySelector("#kod-dostepu")?.scrollIntoView({ behavior: "smooth" })}>
            <i>⌨</i>
            <strong>Wprowadź kod</strong>
            <small>Dodaj nowego pacjenta</small>
          </button>
          <button
            type="button"
            onClick={() => navigate(lastPatient ? `/vet/pacjent/${lastPatient.id}#nowy-wpis` : "/vet/pacjenci")}
          >
            <i>＋</i>
            <strong>Dodaj wpis</strong>
            <small>{lastPatient ? `Ostatni: ${lastPatient.name}` : "Wybierz pacjenta"}</small>
          </button>
          <button type="button" onClick={() => navigate("/vet/pacjenci")}>
            <i>⌕</i>
            <strong>Lista pupili</strong>
            <small>{patients.length} aktywnych dostępów</small>
          </button>
        </div>
      </section>

      <section className="vet-code-redeem" id="kod-dostepu">
        <div>
          <span>Bezpieczny dostęp</span>
          <h2>Wprowadź kod właściciela</h2>
          <p>Kod udostępnia kartotekę jednego pupila zgodnie ze zgodą opiekuna.</p>
        </div>
        <form onSubmit={redeem}>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value.toUpperCase())}
            maxLength={6}
            placeholder="ABC123"
            aria-label="Kod dostępu"
            required
          />
          <button type="submit">Dodaj pacjenta</button>
        </form>
        {message && <p className="vet-code-message">{message}</p>}
      </section>

      <section className="vet-dashboard-section">
        <div className="vet-section-heading">
          <div>
            <span>Kontynuuj pracę</span>
            <h2>Ostatni pacjenci</h2>
          </div>
          {patients.length > 0 && <Link to="/vet/pacjenci">Zobacz wszystkich</Link>}
        </div>
        {recentPatients.length === 0 ? (
          <VetEmptyState />
        ) : (
          <div className="vet-recent-patients">
            {recentPatients.map((pet) => {
              const lastActivity = activities.find((activity) => activity.petId === pet.id);
              return (
                <button key={pet.id} type="button" onClick={() => navigate(`/vet/pacjent/${pet.id}`)}>
                  <span>{speciesEmoji(pet.species)}</span>
                  <div>
                    <strong>{pet.name}</strong>
                    <small>{pet.species}{pet.breed ? ` · ${pet.breed}` : ""}</small>
                  </div>
                  <time>{lastActivity ? formatActivityDate(lastActivity.createdAt) : "Nowy dostęp"}</time>
                  <i>›</i>
                </button>
              );
            })}
          </div>
        )}
      </section>

      <div className="vet-dashboard-columns">
        <section className="vet-dashboard-section">
          <div className="vet-section-heading">
            <div>
              <span>Terminy pacjentów</span>
              <h2>Nadchodzące</h2>
            </div>
            <Link to="/vet/kalendarz">Kalendarz</Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="vet-compact-empty">Brak nadchodzących wydarzeń.</div>
          ) : (
            <div className="vet-upcoming-list">
              {upcoming.map(({ reminder, occurrence }) => {
                const pet = pets.find((item) => item.id === reminder.petId);
                const badge = dateBadge(occurrence.toISOString().split("T")[0]);
                return (
                  <article key={reminder.id}>
                    <span>{speciesEmoji(pet?.species || "")}</span>
                    <div>
                      <strong>{reminder.title}</strong>
                      <small>{pet?.name} · {reminder.time}</small>
                    </div>
                    <b className={badge.urgent ? "urgent" : ""}>{badge.text}</b>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="vet-dashboard-section">
          <div className="vet-section-heading">
            <div>
              <span>Audyt pracy</span>
              <h2>Ostatnia aktywność</h2>
            </div>
            <Link to="/vet/historia">Historia</Link>
          </div>
          {activities.length === 0 ? (
            <div className="vet-compact-empty">Aktywność pojawi się po otwarciu kartoteki.</div>
          ) : (
            <div className="vet-activity-list">
              {activities.slice(0, 4).map((activity) => {
                const pet = pets.find((item) => item.id === activity.petId);
                return (
                  <article key={activity.id}>
                    <span className={`vet-activity-icon vet-activity-icon--${activity.type}`} />
                    <div>
                      <strong>{activityLabels[activity.type]}</strong>
                      <small>{pet?.name || "Pupil"} · {formatActivityDate(activity.createdAt)}</small>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function VetEmptyState() {
  return (
    <div className="vet-empty-state">
      <span>🐾</span>
      <h3>Brak udostępnionych kartotek</h3>
      <p>Wprowadź kod przekazany przez opiekuna, aby dodać pierwszego pacjenta.</p>
    </div>
  );
}

export function VetPatientsPage() {
  const { currentVet, entries, pets, vetActivities, vetGrants } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  if (!currentVet) return <Navigate to="/vet/logowanie" replace />;

  const accessByPet = new Map(
    vetGrants
      .filter((grant) => grant.vetId === currentVet.id && !grant.revoked)
      .map((grant) => [grant.petId, grant]),
  );
  const activityByPet = new Map<string, string>();
  vetActivities
    .filter((activity) => activity.vetId === currentVet.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .forEach((activity) => {
      if (!activityByPet.has(activity.petId)) activityByPet.set(activity.petId, activity.createdAt);
    });

  const patients = pets
    .filter((pet) => accessByPet.has(pet.id))
    .filter((pet) => `${pet.name} ${pet.species} ${pet.breed}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (activityByPet.get(b.id) || "").localeCompare(activityByPet.get(a.id) || ""));

  return (
    <main className="vet-subpage">
      <section className="vet-page-hero">
        <div>
          <span>Aktywne zgody opiekunów</span>
          <h1>Pacjenci</h1>
          <p>Kartoteki pupili, do których masz aktualnie dostęp.</p>
        </div>
        <strong>{patients.length}</strong>
      </section>

      <label className="vet-patient-search">
        <span>⌕</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Szukaj po imieniu, gatunku lub rasie"
        />
      </label>

      {patients.length === 0 ? (
        <VetEmptyState />
      ) : (
        <section className="vet-patient-list">
          {patients.map((pet) => {
            const records = entries.filter((entry) => entry.petId === pet.id);
            const grant = accessByPet.get(pet.id);
            return (
              <article key={pet.id}>
                <button type="button" onClick={() => navigate(`/vet/pacjent/${pet.id}`)}>
                  <span>{speciesEmoji(pet.species)}</span>
                  <div>
                    <h2>{pet.name}</h2>
                    <p>{pet.species}{pet.breed ? ` · ${pet.breed}` : ""} · {computeAge(pet.birthDate)}</p>
                    <small>
                      {records.length} wpisów · dostęp od{" "}
                      {grant ? new Date(grant.grantedAt).toLocaleDateString("pl-PL") : "—"}
                    </small>
                  </div>
                  <i>›</i>
                </button>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export function VetCalendarPage() {
  const { currentVet, pets, reminders, vetGrants } = useAuth();
  const [selectedPetId, setSelectedPetId] = useState("all");
  if (!currentVet) return <Navigate to="/vet/logowanie" replace />;

  const accessibleIds = new Set(
    vetGrants
      .filter((grant) => grant.vetId === currentVet.id && !grant.revoked)
      .map((grant) => grant.petId),
  );
  const accessiblePets = pets.filter((pet) => accessibleIds.has(pet.id));
  const upcoming = reminders
    .filter(
      (reminder) =>
        accessibleIds.has(reminder.petId) &&
        (selectedPetId === "all" || reminder.petId === selectedPetId),
    )
    .map((reminder) => ({ reminder, occurrence: nextReminderDate(reminder) }))
    .filter(
      (item): item is { reminder: Reminder; occurrence: Date } => item.occurrence !== null,
    )
    .sort((a, b) => a.occurrence.getTime() - b.occurrence.getTime());

  const grouped = upcoming.reduce<Record<string, typeof upcoming>>((groups, item) => {
    const key = item.occurrence.toISOString().slice(0, 7);
    groups[key] = [...(groups[key] || []), item];
    return groups;
  }, {});

  return (
    <main className="vet-subpage">
      <section className="vet-page-hero">
        <div>
          <span>Wizyty i kontrole</span>
          <h1>Kalendarz pacjentów</h1>
          <p>Nadchodzące zdarzenia z udostępnionych kartotek.</p>
        </div>
        <strong>{upcoming.length}</strong>
      </section>

      <section className="vet-filter-card">
        <label>
          Pokaż terminy
          <select value={selectedPetId} onChange={(event) => setSelectedPetId(event.target.value)}>
            <option value="all">Wszystkich pacjentów</option>
            {accessiblePets.map((pet) => <option key={pet.id} value={pet.id}>{pet.name}</option>)}
          </select>
        </label>
      </section>

      {upcoming.length === 0 ? (
        <div className="vet-empty-state">
          <span>◷</span>
          <h3>Brak nadchodzących terminów</h3>
          <p>Kontrole zapisane podczas wizyty pojawią się w tym miejscu.</p>
        </div>
      ) : Object.entries(grouped).map(([month, events]) => (
        <section className="vet-calendar-group" key={month}>
          <h2>{new Date(`${month}-01T12:00:00`).toLocaleDateString("pl-PL", { month: "long", year: "numeric" })}</h2>
          {events.map(({ reminder, occurrence }) => {
            const pet = pets.find((item) => item.id === reminder.petId);
            return (
              <article key={reminder.id}>
                <time>
                  <strong>{occurrence.getDate()}</strong>
                  <span>{occurrence.toLocaleDateString("pl-PL", { weekday: "short" })}</span>
                </time>
                <span>{speciesEmoji(pet?.species || "")}</span>
                <div>
                  <h3>{reminder.title}</h3>
                  <p>{pet?.name} · {reminder.time}</p>
                  {reminder.notes && <small>{reminder.notes}</small>}
                </div>
              </article>
            );
          })}
        </section>
      ))}
    </main>
  );
}

export function VetHistoryPage() {
  const { currentVet, pets, vetActivities } = useAuth();
  const [type, setType] = useState<"all" | VetActivity["type"]>("all");
  if (!currentVet) return <Navigate to="/vet/logowanie" replace />;

  const activities = vetActivities
    .filter(
      (activity) =>
        activity.vetId === currentVet.id && (type === "all" || activity.type === type),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <main className="vet-subpage">
      <section className="vet-page-hero">
        <div>
          <span>Przejrzysty audyt</span>
          <h1>Historia dostępu</h1>
          <p>Twoje otwarcia kartotek, nowe dostępy i wpisy medyczne.</p>
        </div>
        <strong>{activities.length}</strong>
      </section>

      <div className="vet-history-filters" aria-label="Filtr historii">
        {[
          ["all", "Wszystko"],
          ["access_granted", "Dostępy"],
          ["record_opened", "Otwarcia"],
          ["entry_added", "Wpisy"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={type === value ? "active" : ""}
            onClick={() => setType(value as typeof type)}
          >
            {label}
          </button>
        ))}
      </div>

      {activities.length === 0 ? (
        <div className="vet-empty-state">
          <span>≡</span>
          <h3>Brak aktywności</h3>
          <p>Historia zacznie się wypełniać podczas pracy z kartotekami.</p>
        </div>
      ) : (
        <section className="vet-history-list">
          {activities.map((activity) => {
            const pet = pets.find((item) => item.id === activity.petId);
            return (
              <article key={activity.id}>
                <span className={`vet-activity-icon vet-activity-icon--${activity.type}`} />
                <div>
                  <h2>{activityLabels[activity.type]}</h2>
                  <p>{activity.description}</p>
                  <small>{pet?.name || "Pupil"} · {formatActivityDate(activity.createdAt)}</small>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export function VetProfilePage() {
  const { currentVet, updateVetProfile } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(() => ({
    name: currentVet?.name || "",
    licenseNumber: currentVet?.licenseNumber || "",
    specialization: currentVet?.specialization || specializations[0],
    clinicName: currentVet?.clinicName || "",
    clinicAddress: currentVet?.clinicAddress || "",
    phone: currentVet?.phone || "",
    email: currentVet?.email || "",
  }));
  if (!currentVet) return <Navigate to="/vet/logowanie" replace />;

  const update = (field: keyof typeof form, value: string) => {
    setSaved(false);
    setForm((current) => ({ ...current, [field]: value }));
  };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    updateVetProfile(form);
    setSaved(true);
  };

  return (
    <main className="vet-subpage">
      <section className="vet-profile-hero">
        <img src={vetLogo} alt="" aria-hidden="true" />
        <div>
          <span>Profil zawodowy</span>
          <h1>{currentVet.name}</h1>
          <p>PWZ {currentVet.licenseNumber} · {currentVet.specialization}</p>
        </div>
      </section>

      <form className="vet-profile-form" onSubmit={submit}>
        <div className="vet-section-heading">
          <div>
            <span>Dane widoczne w kartotece</span>
            <h2>Informacje o lekarzu</h2>
          </div>
        </div>
        <div className="vet-profile-grid">
          <label>
            Imię i nazwisko
            <input value={form.name} onChange={(event) => update("name", event.target.value)} required />
          </label>
          <label>
            Numer PWZ
            <input value={form.licenseNumber} onChange={(event) => update("licenseNumber", event.target.value)} required />
          </label>
          <label>
            Specjalizacja
            <select value={form.specialization} onChange={(event) => update("specialization", event.target.value)}>
              {specializations.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Nazwa kliniki
            <input value={form.clinicName} onChange={(event) => update("clinicName", event.target.value)} required />
          </label>
          <label className="wide">
            Adres kliniki
            <textarea rows={3} value={form.clinicAddress} onChange={(event) => update("clinicAddress", event.target.value)} required />
          </label>
          <label>
            Telefon
            <input type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required />
          </label>
        </div>
        <button className="vet-primary-button" type="submit">Zapisz zmiany</button>
        {saved && <p className="vet-profile-saved">Profil został zaktualizowany.</p>}
      </form>
    </main>
  );
}

export function VetPatientPage() {
  const { id } = useParams<{ id: string }>();
  const {
    addEntry,
    canVetAccessPet,
    currentVet,
    entries,
    logVetActivity,
    pets,
    vetGrants,
  } = useAuth();
  useEffect(() => {
    const accessiblePet = pets.find((item) => item.id === id);
    const hasCurrentAccess = Boolean(
      currentVet &&
      id &&
      vetGrants.some(
        (grant) => grant.petId === id && grant.vetId === currentVet.id && !grant.revoked,
      ),
    );
    if (accessiblePet && hasCurrentAccess) {
      logVetActivity(accessiblePet.id, "record_opened", "Otwarto kartotekę pacjenta.");
    }
  }, [currentVet, id, logVetActivity, pets, vetGrants]);
  const [diagnosis, setDiagnosis] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [description, setDescription] = useState("");
  const [nextDate, setNextDate] = useState("");
  const pet = pets.find((item) => item.id === id);

  if (!currentVet) return <Navigate to="/vet/logowanie" replace />;
  if (!id || !canVetAccessPet(id)) return <Navigate to="/vet/dashboard" replace />;

  if (!pet) return <Navigate to="/vet/dashboard" replace />;
  const records = entries
    .filter((entry) => entry.petId === pet.id)
    .sort((a, b) => b.date.localeCompare(a.date));

  const addVisit = (event: React.FormEvent) => {
    event.preventDefault();
    addEntry({
      petId: pet.id,
      category: "Wizyta weterynaryjna",
      description,
      date: new Date().toISOString().split("T")[0],
      recordType: "visit",
      doctor: `${currentVet.name}, ${currentVet.clinicName}`,
      diagnosis,
      recommendations,
      nextDate,
    });
    logVetActivity(pet.id, "entry_added", "Dodano diagnozę i zalecenia do kartoteki.");
    setDiagnosis("");
    setRecommendations("");
    setDescription("");
    setNextDate("");
  };

  return (
    <main className="vet-patient-page">
        <section className="vet-patient-hero">
          <div>{speciesEmoji(pet.species)}</div>
          <span>
            <h1>{pet.name}</h1>
            <p>{pet.species}{pet.breed ? ` · ${pet.breed}` : ""} · {computeAge(pet.birthDate)}</p>
          </span>
          <strong>{pet.weight ? `${pet.weight} kg` : "brak wagi"}</strong>
        </section>

        <section className="vet-visit-form" id="nowy-wpis">
          <div className="vet-section-heading">
            <div>
              <span>Nowy wpis</span>
              <h2>Diagnoza i zalecenia</h2>
            </div>
          </div>
          <form onSubmit={addVisit}>
            <label>
              Opis wizyty
              <textarea value={description} onChange={(event) => setDescription(event.target.value)} required />
            </label>
            <label>
              Diagnoza
              <textarea value={diagnosis} onChange={(event) => setDiagnosis(event.target.value)} required />
            </label>
            <label>
              Zalecenia
              <textarea
                value={recommendations}
                onChange={(event) => setRecommendations(event.target.value)}
                required
              />
            </label>
            <label>
              Termin kontroli
              <input type="date" value={nextDate} onChange={(event) => setNextDate(event.target.value)} />
            </label>
            <button className="vet-primary-button" type="submit">Dodaj wpis do kartoteki</button>
          </form>
        </section>

        <section className="vet-records">
          <div className="vet-section-heading">
            <div>
              <span>Tylko udostępniony pupil</span>
              <h2>Kartoteka zdrowia</h2>
            </div>
          </div>
          {records.length === 0 ? (
            <div className="vet-empty-state">Brak wpisów medycznych.</div>
          ) : records.map((entry) => (
            <article key={entry.id}>
              <div className="vet-record-date">
                {new Date(`${entry.date}T12:00:00`).toLocaleDateString("pl-PL")}
              </div>
              <div>
                <h3>{entry.category}</h3>
                <p>{entry.description}</p>
                {entry.diagnosis && <p><b>Diagnoza:</b> {entry.diagnosis}</p>}
                {entry.recommendations && <p><b>Zalecenia:</b> {entry.recommendations}</p>}
                {entry.doctor && <small>{entry.doctor}</small>}
              </div>
            </article>
          ))}
        </section>
    </main>
  );
}
