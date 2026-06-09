import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import { computeAge, speciesEmoji } from "../Pupile/petUtils.ts";
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

function VetBrand() {
  return (
    <div className="vet-brand">
      <div className="vet-brand-icon">✚</div>
      <div>
        <strong>Pet Companion <span>VET</span></strong>
        <small>Profesjonalna opieka weterynaryjna</small>
      </div>
    </div>
  );
}

function VetTopbar({ title }: { title: string }) {
  const { currentVet, logoutVet } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="vet-topbar">
      <Link to="/vet/dashboard" className="vet-topbar-brand">Pet Companion <span>VET</span></Link>
      <strong>{title}</strong>
      <button
        type="button"
        onClick={() => {
          logoutVet();
          navigate("/vet/logowanie");
        }}
      >
        {currentVet?.name.split(" ").map((part) => part[0]).slice(0, 2).join("") || "VET"}
      </button>
    </header>
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
      <section className="vet-auth-shell">
        <VetBrand />
        <div className="vet-auth-intro">
          <div className="vet-auth-hero-icon">✚</div>
          <h1>Dołącz do naszej sieci</h1>
          <p>Zarejestruj profil zawodowy i bezpiecznie współpracuj z opiekunami zwierząt.</p>
        </div>

        <form className="vet-register-card" onSubmit={submit}>
          <fieldset>
            <legend>Dane osobowe</legend>
            <input
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Imię i nazwisko"
              autoComplete="name"
              required
            />
          </fieldset>
          <fieldset>
            <legend>Uprawnienia zawodowe</legend>
            <input
              value={form.licenseNumber}
              onChange={(event) => update("licenseNumber", event.target.value)}
              placeholder="Numer prawa wykonywania zawodu"
              required
            />
            <select
              value={form.specialization}
              onChange={(event) => update("specialization", event.target.value)}
            >
              {specializations.map((item) => <option key={item}>{item}</option>)}
            </select>
          </fieldset>
          <fieldset>
            <legend>Informacje o klinice</legend>
            <input
              value={form.clinicName}
              onChange={(event) => update("clinicName", event.target.value)}
              placeholder="Nazwa kliniki"
              required
            />
            <textarea
              value={form.clinicAddress}
              onChange={(event) => update("clinicAddress", event.target.value)}
              placeholder="Adres kliniki"
              rows={2}
              required
            />
          </fieldset>
          <fieldset>
            <legend>Kontakt i bezpieczeństwo</legend>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => update("phone", event.target.value)}
              placeholder="Numer telefonu"
              required
            />
            <input
              type="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              placeholder="Adres e-mail"
              autoComplete="email"
              required
            />
            <input
              type="password"
              value={form.password}
              onChange={(event) => update("password", event.target.value)}
              placeholder="Hasło"
              minLength={6}
              autoComplete="new-password"
              required
            />
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
      <section className="vet-auth-shell">
        <VetBrand />
        <div className="vet-auth-intro">
          <div className="vet-auth-hero-icon">🩺</div>
          <h1>Panel weterynarza</h1>
          <p>Zaloguj się, aby otworzyć kartoteki udostępnione przez właścicieli.</p>
        </div>
        <form className="vet-register-card" onSubmit={submit}>
          <fieldset>
            <legend>Dane logowania</legend>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Adres e-mail"
              autoComplete="email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Hasło"
              autoComplete="current-password"
              required
            />
          </fieldset>
          {error && <p className="vet-form-error">{error}</p>}
          <button className="vet-primary-button" type="submit">Zaloguj się do VET</button>
          <p className="vet-auth-switch">
            Nie masz profilu? <Link to="/vet/rejestracja">Zarejestruj się</Link>
          </p>
          <Link className="vet-owner-return" to="/logowanie">Wróć do panelu opiekuna</Link>
        </form>
      </section>
    </main>
  );
}

export function VetDashboardPage() {
  const { currentVet, pets, redeemVetAccessCode, vetGrants } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  if (!currentVet) return <Navigate to="/vet/logowanie" replace />;

  const grants = vetGrants.filter((grant) => grant.vetId === currentVet.id && !grant.revoked);
  const patients = grants
    .map((grant) => pets.find((pet) => pet.id === grant.petId))
    .filter((pet): pet is NonNullable<typeof pet> => Boolean(pet));

  const redeem = (event: React.FormEvent) => {
    event.preventDefault();
    const result = redeemVetAccessCode(code);
    setMessage(result.message);
    if (result.ok) setCode("");
  };

  return (
    <div className="vet-dashboard-page">
      <VetTopbar title="Dashboard" />
      <main className="vet-dashboard">
        <section className="vet-welcome">
          <div>
            <span>Witaj,</span>
            <h1>{currentVet.name}</h1>
            <p>{currentVet.specialization} · {currentVet.clinicName}</p>
          </div>
          <div className="vet-license">PWZ {currentVet.licenseNumber}</div>
        </section>

        <section className="vet-code-redeem">
          <div>
            <span>Nowy pacjent</span>
            <h2>Wprowadź kod właściciela</h2>
            <p>Kod jest czasowy i udostępnia kartotekę tylko jednego pupila.</p>
          </div>
          <form onSubmit={redeem}>
            <input
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              maxLength={6}
              placeholder="ABC123"
              required
            />
            <button type="submit">Otwórz kartotekę</button>
          </form>
          {message && <p className="vet-code-message">{message}</p>}
        </section>

        <section className="vet-patients-section">
          <div className="vet-section-heading">
            <div>
              <span>Aktywne dostępy</span>
              <h2>Moi pacjenci</h2>
            </div>
            <strong>{patients.length}</strong>
          </div>
          {patients.length === 0 ? (
            <div className="vet-empty-state">
              <span>🐾</span>
              <h3>Brak udostępnionych kartotek</h3>
              <p>Poproś właściciela o jednorazowy kod dostępu.</p>
            </div>
          ) : (
            <div className="vet-patient-grid">
              {patients.map((pet) => (
                <button key={pet.id} type="button" onClick={() => navigate(`/vet/pacjent/${pet.id}`)}>
                  <span>{speciesEmoji(pet.species)}</span>
                  <div>
                    <strong>{pet.name}</strong>
                    <small>{pet.species}{pet.breed ? ` · ${pet.breed}` : ""}</small>
                  </div>
                  <i>›</i>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export function VetPatientPage() {
  const { id } = useParams<{ id: string }>();
  const {
    addEntry,
    canVetAccessPet,
    currentVet,
    entries,
    pets,
  } = useAuth();
  const [diagnosis, setDiagnosis] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [description, setDescription] = useState("");
  const [nextDate, setNextDate] = useState("");

  if (!currentVet) return <Navigate to="/vet/logowanie" replace />;
  if (!id || !canVetAccessPet(id)) return <Navigate to="/vet/dashboard" replace />;

  const pet = pets.find((item) => item.id === id);
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
    setDiagnosis("");
    setRecommendations("");
    setDescription("");
    setNextDate("");
  };

  return (
    <div className="vet-dashboard-page">
      <VetTopbar title={`Kartoteka · ${pet.name}`} />
      <main className="vet-patient-page">
        <section className="vet-patient-hero">
          <div>{speciesEmoji(pet.species)}</div>
          <span>
            <h1>{pet.name}</h1>
            <p>{pet.species}{pet.breed ? ` · ${pet.breed}` : ""} · {computeAge(pet.birthDate)}</p>
          </span>
          <strong>{pet.weight ? `${pet.weight} kg` : "brak wagi"}</strong>
        </section>

        <section className="vet-visit-form">
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
    </div>
  );
}
