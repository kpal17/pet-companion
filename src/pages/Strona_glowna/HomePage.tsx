import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

import { Icon } from "../../Icon.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { speciesEmoji, dateBadge } from "../Pupile/petUtils.ts";
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { pets, currentUser, reminders } = useAuth();
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);

  const upcomingEntries = reminders
    .map((reminder) => ({
      reminder,
      occurrence: nextReminderDate(reminder.date, reminder.recurrence),
    }))
    .filter(
      (item): item is typeof item & { occurrence: Date } => item.occurrence !== null,
    )
    .sort((a, b) => a.occurrence.getTime() - b.occurrence.getTime());

  const visibleUpcoming = showAllUpcoming ? upcomingEntries : upcomingEntries.slice(0, 2);
  const hasMore = upcomingEntries.length > 2;

  return (
    <div className="home">
      {/* HEADER */}
      <header className="header">
        <h1>Cześć, {currentUser?.name || "Opiekunie"}! 🐾</h1>
      </header>

      {/* QUICK ACTIONS */}
      <section className="section">
        <div className="section-header">
          <h2>Szybkie akcje</h2>
        </div>

        <div className="actions">
          <ActionCard icon="addIcon" label="Dodaj Pupila" onClick={() => navigate("/pupile/dodaj")} />
          <ActionCard icon="bookIcon" label="Moje pupile" onClick={() => navigate("/pupile")} />
          <ActionCard icon="noteIcon" label="Nowy Wpis" onClick={() => navigate("/wpisy/nowy")} />
          <ActionCard icon="remindIcon" label="Przypomnij" onClick={() => navigate("/planer")} />
        </div>
      </section>

      {/* UPCOMING */}
      <section className="section">
        <div className="section-header">
          <h2>Nadchodzące</h2>
          {hasMore && (
            <span className="link" onClick={() => setShowAllUpcoming((v) => !v)}>
              {showAllUpcoming ? "Zwiń" : "Zobacz wszystkie"}
            </span>
          )}
        </div>

        {visibleUpcoming.length === 0 ? (
          <p className="upcoming-empty">Brak nadchodzących wydarzeń</p>
        ) : (
          visibleUpcoming.map(({ reminder, occurrence }) => {
            const pet = pets.find((p) => p.id === reminder.petId);
            const occurrenceDate = occurrence.toISOString().split("T")[0];
            const { text: badge, urgent } = dateBadge(occurrenceDate);
            return (
              <UpcomingItem
                key={reminder.id}
                emoji={speciesEmoji(pet?.species ?? "")}
                title={`${pet?.name ?? "Pupil"}: ${reminder.title}`}
                subtitle={`${reminder.time}${reminder.notes ? ` · ${reminder.notes}` : ""}`}
                badge={badge}
                badgeType={urgent ? "urgent" : undefined}
              />
            );
          })
        )}
      </section>

      {/* ACTIVITY */}
      <section className="section">
        <div className="section-header">
          <h2>Ostatnia aktywność</h2>
          <span className="link">Zobacz wszystko</span>
        </div>

        <div className="activity">
          <ActivityItem
            icon="vetIcon"
            title="Kontrola weterynaryjna"
            subtitle="Bożena • 2 godziny temu"
            text="Wszystkie wyniki w normie. Zalecana zmiana karmy na lepszą."
          />
          <ActivityItem
            icon="weightIcon"
            title="Nowy pomiar wagi"
            subtitle="Leo • Wczoraj, 18:30"
            text="Waga: 4.5kg (+0.2kg). Cel osiągnięty w 80%."
          />
          <ActivityItem
            icon="bookIcon"
            title="Zaktualizowano książeczkę"
            subtitle="Bożena • 2 dni temu"
            text="Dodano certyfikat wścieklizny (ważny do 2025)."
          />
        </div>
      </section>

      <div className="about-banner" onClick={() => navigate("/main")}>
        <div className="about-banner-text">
          <strong>Poznaj Pet Companion</strong>
          <span>Dowiedz się więcej o możliwościach aplikacji</span>
        </div>
        <span className="about-banner-arrow">›</span>
      </div>
    </div>
  );
};

/* ---------- COMPONENTS ---------- */

const ActionCard = ({ icon, label, onClick }: { icon: IconName; label: string; onClick?: () => void }) => (
  <div className="action-card" onClick={onClick}>
    <div className="icon-wrap">
      <Icon name={icon} size={22} color="#7a5666" />
    </div>
    <span>{label}</span>
  </div>
);

interface UpcomingItemProps {
  emoji?: string;
  image?: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeType?: string;
}

const UpcomingItem = ({ emoji, image, title, subtitle, badge, badgeType }: UpcomingItemProps) => (
  <div className="upcoming">
    {image
      ? <img src={image} className="avatar" alt={title} />
      : <div className="avatar avatar-emoji">{emoji ?? "🐾"}</div>
    }
    <div className="upcoming-text">
      <strong>{title}</strong>
      <p>{subtitle}</p>
    </div>
    <span className={`badge ${badgeType || ""}`}>{badge}</span>
  </div>
);

const ActivityItem = ({ icon, title, subtitle, text }: { icon: IconName; title: string; subtitle: string; text: string }) => (
  <div className="activity-item">
    <div className="icon">
      <Icon name={icon} size={20} color="#7a5666" />
    </div>
    <div>
      <strong>{title}</strong>
      <p className="meta">{subtitle}</p>
      <p className="body">{text}</p>
    </div>
  </div>
);

export default HomePage;
