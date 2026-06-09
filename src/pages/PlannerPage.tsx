import React, { useMemo, useState } from "react";
import { useAuth, type Reminder } from "../context/AuthContext.tsx";
import { speciesEmoji } from "./Pupile/petUtils.ts";
import "./PlannerPage.css";

const categoryLabels: Record<Reminder["category"], string> = {
  visit: "Wizyta",
  medication: "Lek",
  care: "Pielęgnacja",
  vaccination: "Szczepienie",
  other: "Inne",
};

const recurrenceLabels: Record<Reminder["recurrence"], string> = {
  none: "Jednorazowo",
  daily: "Codziennie",
  weekly: "Co tydzień",
  monthly: "Co miesiąc",
  quarterly: "Co 3 miesiące",
  yearly: "Co rok",
};

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addOccurrence(date: Date, recurrence: Reminder["recurrence"]) {
  const next = new Date(date);
  if (recurrence === "daily") next.setDate(next.getDate() + 1);
  if (recurrence === "weekly") next.setDate(next.getDate() + 7);
  if (recurrence === "monthly") next.setMonth(next.getMonth() + 1);
  if (recurrence === "quarterly") next.setMonth(next.getMonth() + 3);
  if (recurrence === "yearly") next.setFullYear(next.getFullYear() + 1);
  return next;
}

function nextOccurrence(reminder: Reminder, minimumDate = new Date()) {
  const minimum = new Date(minimumDate);
  minimum.setHours(0, 0, 0, 0);
  let occurrence = new Date(`${reminder.date}T12:00:00`);

  if (reminder.recurrence === "none") {
    return occurrence >= minimum ? occurrence : null;
  }

  for (let index = 0; index < 1500 && occurrence < minimum; index += 1) {
    occurrence = addOccurrence(occurrence, reminder.recurrence);
  }

  return occurrence >= minimum ? occurrence : null;
}

function occursOn(reminder: Reminder, date: Date) {
  const occurrence = nextOccurrence(reminder, date);
  return occurrence ? dateKey(occurrence) === dateKey(date) : false;
}

function downloadCalendarEvent(reminder: Reminder, petName: string) {
  const start = `${reminder.date.replaceAll("-", "")}T${(reminder.time || "09:00").replace(":", "")}00`;
  const recurrenceRules: Partial<Record<Reminder["recurrence"], string>> = {
    daily: "FREQ=DAILY",
    weekly: "FREQ=WEEKLY",
    monthly: "FREQ=MONTHLY",
    quarterly: "FREQ=MONTHLY;INTERVAL=3",
    yearly: "FREQ=YEARLY",
  };
  const contents = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Pet Companion//Planner//PL",
    "BEGIN:VEVENT",
    `UID:${reminder.id}@pet-companion`,
    `DTSTART:${start}`,
    `SUMMARY:${reminder.title} - ${petName}`,
    `DESCRIPTION:${reminder.notes.replaceAll("\n", "\\n")}`,
    recurrenceRules[reminder.recurrence]
      ? `RRULE:${recurrenceRules[reminder.recurrence]}`
      : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).join("\r\n");
  const blob = new Blob([contents], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${reminder.title.toLowerCase().replaceAll(/\s+/g, "-")}.ics`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function PlannerPage() {
  const { addReminder, pets, reminders, removeReminder } = useAuth();
  const [selectedPetId, setSelectedPetId] = useState("all");
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());
  const [formOpen, setFormOpen] = useState(false);
  const [petId, setPetId] = useState(pets[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Reminder["category"]>("visit");
  const [date, setDate] = useState(dateKey(new Date()));
  const [time, setTime] = useState("09:00");
  const [notes, setNotes] = useState("");
  const [recurrence, setRecurrence] = useState<Reminder["recurrence"]>("none");
  const [notifyDaysBefore, setNotifyDaysBefore] = useState(7);

  const filteredReminders = useMemo(
    () => reminders.filter((reminder) => selectedPetId === "all" || reminder.petId === selectedPetId),
    [reminders, selectedPetId],
  );

  const upcomingReminders = useMemo(
    () =>
      filteredReminders
        .map((reminder) => ({ reminder, occurrence: nextOccurrence(reminder) }))
        .filter(
          (item): item is { reminder: Reminder; occurrence: Date } => item.occurrence !== null,
        )
        .sort(
          (a, b) =>
            `${dateKey(a.occurrence)}T${a.reminder.time}`.localeCompare(
              `${dateKey(b.occurrence)}T${b.reminder.time}`,
            ),
        ),
    [filteredReminders],
  );

  const calendarDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const mondayOffset = (firstDay.getDay() + 6) % 7;
    const start = new Date(year, month, 1 - mondayOffset);
    return Array.from({ length: 42 }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      return day;
    });
  }, [visibleMonth]);

  const submitReminder = (event: React.FormEvent) => {
    event.preventDefault();
    addReminder({
      petId,
      title,
      category,
      date,
      time,
      notes,
      recurrence,
      notifyDaysBefore,
      source: "owner",
    });
    setTitle("");
    setNotes("");
    setFormOpen(false);
  };

  const changeMonth = (direction: number) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  };

  if (pets.length === 0) {
    return (
      <div className="planner-page">
        <div className="planner-empty">
          <span>🐾</span>
          <h1>Najpierw dodaj pupila</h1>
          <p>Każde przypomnienie musi być powiązane z konkretnym profilem pupila.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="planner-page">
      <section className="planner-hero">
        <div>
          <span className="planner-eyebrow">Terminy i przypomnienia</span>
          <h1>Planer opieki</h1>
          <p>Wizyty, leki i cykliczna pielęgnacja w jednym miejscu.</p>
        </div>
        <button type="button" onClick={() => setFormOpen((open) => !open)}>
          {formOpen ? "Zamknij" : "+ Dodaj"}
        </button>
      </section>

      {formOpen && (
        <form className="planner-form" onSubmit={submitReminder}>
          <h2>Nowe przypomnienie</h2>
          <div className="planner-form-grid">
            <label>
              Pupil
              <select value={petId} onChange={(event) => setPetId(event.target.value)} required>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>{pet.name}</option>
                ))}
              </select>
            </label>
            <label>
              Rodzaj
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as Reminder["category"])}
              >
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
            <label className="planner-form-wide">
              Nazwa
              <input value={title} onChange={(event) => setTitle(event.target.value)} required />
            </label>
            <label>
              Data
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
            </label>
            <label>
              Godzina
              <input type="time" value={time} onChange={(event) => setTime(event.target.value)} required />
            </label>
            <label>
              Powtarzanie
              <select
                value={recurrence}
                onChange={(event) => setRecurrence(event.target.value as Reminder["recurrence"])}
              >
                {Object.entries(recurrenceLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
            <label>
              Przypomnij wcześniej
              <select
                value={notifyDaysBefore}
                onChange={(event) => setNotifyDaysBefore(Number(event.target.value))}
              >
                <option value={0}>W dniu wydarzenia</option>
                <option value={1}>1 dzień wcześniej</option>
                <option value={3}>3 dni wcześniej</option>
                <option value={7}>7 dni wcześniej</option>
                <option value={14}>14 dni wcześniej</option>
              </select>
            </label>
            <label className="planner-form-wide">
              Notatka
              <textarea rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} />
            </label>
          </div>
          <button className="planner-submit" type="submit">Zapisz przypomnienie</button>
        </form>
      )}

      <section className="planner-card">
        <div className="planner-toolbar">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Poprzedni miesiąc">‹</button>
          <strong>{visibleMonth.toLocaleDateString("pl-PL", { month: "long", year: "numeric" })}</strong>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Następny miesiąc">›</button>
        </div>
        <div className="planner-weekdays">
          {["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"].map((day) => <span key={day}>{day}</span>)}
        </div>
        <div className="planner-calendar">
          {calendarDays.map((day) => {
            const key = dateKey(day);
            const dayReminders = filteredReminders.filter((reminder) => occursOn(reminder, day));
            const currentMonth = day.getMonth() === visibleMonth.getMonth();
            const today = key === dateKey(new Date());
            return (
              <div
                key={key}
                className={`planner-day${currentMonth ? "" : " planner-day-muted"}${today ? " planner-day-today" : ""}`}
              >
                <span>{day.getDate()}</span>
                {dayReminders.slice(0, 3).map((reminder) => (
                  <i key={reminder.id} className={`planner-dot planner-dot-${reminder.category}`} />
                ))}
              </div>
            );
          })}
        </div>
      </section>

      <section className="planner-list-section">
        <div className="planner-list-heading">
          <div>
            <span className="planner-eyebrow">Najbliższe terminy</span>
            <h2>Nadchodzące</h2>
          </div>
          <select value={selectedPetId} onChange={(event) => setSelectedPetId(event.target.value)}>
            <option value="all">Wszystkie pupile</option>
            {pets.map((pet) => <option key={pet.id} value={pet.id}>{pet.name}</option>)}
          </select>
        </div>

        {upcomingReminders.length === 0 ? (
          <div className="planner-no-events">Brak zaplanowanych wydarzeń.</div>
        ) : (
          <div className="planner-events">
            {upcomingReminders.map(({ reminder, occurrence }) => {
              const pet = pets.find((item) => item.id === reminder.petId);
              return (
                <article className="planner-event" key={reminder.id}>
                  <div className={`planner-event-icon planner-event-icon-${reminder.category}`}>
                    {speciesEmoji(pet?.species || "")}
                  </div>
                  <div className="planner-event-content">
                    <span>{categoryLabels[reminder.category]} · {pet?.name}</span>
                    <h3>{reminder.title}</h3>
                    <p>
                      {occurrence.toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                      })}, {reminder.time}
                      {reminder.recurrence !== "none" ? ` · ${recurrenceLabels[reminder.recurrence]}` : ""}
                      {` · alert ${reminder.notifyDaysBefore} dni wcześniej`}
                    </p>
                  </div>
                  <div className="planner-event-actions">
                    <button
                      type="button"
                      onClick={() => downloadCalendarEvent(reminder, pet?.name || "Pupil")}
                      title="Eksportuj do kalendarza"
                    >
                      .ics
                    </button>
                    <button type="button" onClick={() => removeReminder(reminder.id)} title="Usuń">×</button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
