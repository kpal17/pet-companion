import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

import { Icon } from "../../Icon.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import PetAvatar from "../Pupile/PetAvatar.tsx";
import { dateBadge } from "../Pupile/petUtils.ts";
import { IconName } from "./assets/icons.ts";

function nextReminderDate(date: string, recurrence: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let occurrence = new Date(`${date}T12:00:00`);

  if (recurrence === "none") return occurrence >= today ? occurrence : null;

  for (let index = 0; index < 1500 && occurrence < today; index += 1) {
    const next = new Date(occurrence);
    if (recurrence === "daily") next.setDate(next.getDate() + 1);
    if (recurrence === "weekly") next.setDate(next.getDate() + 7);
    if (recurrence === "monthly") next.setMonth(next.getMonth() + 1);
    if (recurrence === "quarterly") next.setMonth(next.getMonth() + 3);
    if (recurrence === "yearly") next.setFullYear(next.getFullYear() + 1);
    occurrence = next;
  }

  return occurrence >= today ? occurrence : null;
}

export default function HomePage() {
  const navigate = useNavigate();
  const { currentUser, entries, pets, reminders } = useAuth();

  const upcoming = reminders
    .map((reminder) => ({
      reminder,
      occurrence: nextReminderDate(reminder.date, reminder.recurrence),
    }))
    .filter(
      (item): item is typeof item & { occurrence: Date } => item.occurrence !== null,
    )
    .sort((a, b) => a.occurrence.getTime() - b.occurrence.getTime())
    .slice(0, 3);

  const recentEntries = [...entries]
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
    .slice(0, 4);

  const recentPetIds = [
    ...recentEntries.map((entry) => entry.petId),
    ...upcoming.map((item) => item.reminder.petId),
    ...pets.map((pet) => pet.id),
  ].filter((id, index, list) => list.indexOf(id) === index);

  const recentPets = recentPetIds
    .map((id) => pets.find((pet) => pet.id === id))
    .filter((pet): pet is NonNullable<typeof pet> => Boolean(pet))
    .slice(0, 4);

  return (
    <main className="owner-dashboard">
      <section className="owner-welcome">
        <div>
          <span>Dzień dobry,</span>
          <h1>{currentUser?.name || "Opiekunie"}</h1>
          <p>Wszystko, co ważne dla zdrowia i codziennej opieki nad pupilami.</p>
        </div>
        <div className="owner-welcome__stats">
          <strong>{pets.length}</strong>
          <span>{pets.length === 1 ? "pupil" : "pupile"}</span>
        </div>
      </section>

      <section className="owner-dashboard-card">
        <SectionHeading eyebrow="Najczęstsze zadania" title="Szybkie akcje" />
        <div className="owner-quick-actions">
          <QuickAction
            icon="addIcon"
            title="Dodaj pupila"
            description="Utwórz nowy profil"
            onClick={() => navigate("/pupile/dodaj")}
          />
          <QuickAction
            icon="noteIcon"
            title="Dodaj wpis"
            description={pets.length ? "Zdrowie i pomiary" : "Najpierw dodaj pupila"}
            onClick={() => navigate(pets.length ? "/wpisy/nowy" : "/pupile/dodaj")}
          />
          <QuickAction
            icon="remindIcon"
            title="Zaplanuj"
            description="Termin lub przypomnienie"
            onClick={() => navigate("/planer")}
          />
        </div>
      </section>

      <section className="owner-dashboard-card">
        <SectionHeading
          eyebrow="Profile pod ręką"
          title="Twoje pupile"
          action={pets.length > 0 ? <Link to="/pupile">Zobacz wszystkie</Link> : undefined}
        />
        {recentPets.length === 0 ? (
          <div className="owner-empty-state">
            <span>🐾</span>
            <h3>Dodaj pierwszego pupila</h3>
            <p>Kartoteka, planer i bezpieczny dostęp VET zaczną się od jego profilu.</p>
            <button type="button" onClick={() => navigate("/pupile/dodaj")}>Dodaj pupila</button>
          </div>
        ) : (
          <div className="owner-pet-list">
            {recentPets.map((pet) => {
              const petEntries = entries.filter((entry) => entry.petId === pet.id);
              const nextEvent = upcoming.find((item) => item.reminder.petId === pet.id);
              return (
                <button key={pet.id} type="button" onClick={() => navigate(`/pupile/${pet.id}`)}>
                  <PetAvatar pet={pet} />
                  <div>
                    <strong>{pet.name}</strong>
                    <small>{pet.species}{pet.breed ? ` · ${pet.breed}` : ""}</small>
                  </div>
                  <time>
                    {nextEvent
                      ? `Termin ${nextEvent.occurrence.toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}`
                      : `${petEntries.length} wpisów`}
                  </time>
                  <i>›</i>
                </button>
              );
            })}
          </div>
        )}
      </section>

      <div className="owner-dashboard-columns">
        <section className="owner-dashboard-card">
          <SectionHeading
            eyebrow="Plan opieki"
            title="Nadchodzące"
            action={<Link to="/planer">Kalendarz</Link>}
          />
          {upcoming.length === 0 ? (
            <p className="owner-compact-empty">Brak nadchodzących wydarzeń.</p>
          ) : (
            <div className="owner-upcoming-list">
              {upcoming.map(({ reminder, occurrence }) => {
                const pet = pets.find((item) => item.id === reminder.petId);
                const badge = dateBadge(occurrence.toISOString().split("T")[0]);
                return (
                  <article key={reminder.id}>
                    <PetAvatar pet={pet} />
                    <div>
                      <strong>{reminder.title}</strong>
                      <small>{pet?.name || "Pupil"} · {reminder.time}</small>
                    </div>
                    <b className={badge.urgent ? "urgent" : ""}>{badge.text}</b>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="owner-dashboard-card">
          <SectionHeading eyebrow="Kartoteki pupili" title="Ostatnia aktywność" />
          {recentEntries.length === 0 ? (
            <p className="owner-compact-empty">Nowe wpisy pojawią się w tym miejscu.</p>
          ) : (
            <div className="owner-activity-list">
              {recentEntries.map((entry) => {
                const pet = pets.find((item) => item.id === entry.petId);
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => navigate(`/pupile/${entry.petId}`)}
                  >
                    <PetAvatar pet={pet} />
                    <div>
                      <strong>{entry.category}</strong>
                      <small>
                        {pet?.name || "Pupil"} ·{" "}
                        {new Date(`${entry.date}T12:00:00`).toLocaleDateString("pl-PL")}
                      </small>
                    </div>
                    <i>›</i>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>

    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="owner-section-heading">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function QuickAction({
  icon,
  title,
  description,
  onClick,
}: {
  icon: IconName;
  title: string;
  description: string;
  onClick: () => void;
}) {
  const viewBox = icon === "addIcon"
    ? "0 0 14 14"
    : icon === "noteIcon"
      ? "0 0 16 20"
      : undefined;

  return (
    <button type="button" onClick={onClick}>
      <i><Icon name={icon} size={21} color="#d92c83" viewBox={viewBox} /></i>
      <strong>{title}</strong>
      <small>{description}</small>
    </button>
  );
}
