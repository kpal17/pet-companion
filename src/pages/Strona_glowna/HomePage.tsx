import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

import { Icon } from "../../Icon.tsx";

import leoImg from "./assets/pets/leo.png";
import bozenaImg from "./assets/pets/bozena.png";
import { IconName } from "./assets/icons.ts";


const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* HEADER */}
      <header className="header">
        <h1>Cześć, Adam! 🐾</h1>
      </header>

      {/* QUICK ACTIONS */}
      <section className="section">
        <div className="section-header">
          <h2>Szybkie akcje</h2>
        </div>

        <div className="actions">
          <ActionCard icon="addIcon" label="Dodaj Pupila" onClick={() => navigate("/pupile/dodaj")} />
          <ActionCard icon="bookIcon" label="Moje pupile" onClick={() => navigate("/pupile")} />
          <ActionCard icon="noteIcon" label="Nowy Wpis" />
          <ActionCard icon="remindIcon" label="Przypomnij" />
        </div>
      </section>

      {/* UPCOMING */}
      <section className="section">
        <div className="section-header">
          <h2>Nadchodzące</h2>
          <span className="link">Zobacz wszystkie</span>
        </div>

        <UpcomingItem
          image={leoImg}
          title="Leo: Odrobaczanie"
          subtitle="Podanie tabletki rano"
          badge="jutro"
          badgeType="urgent"
        />

        <UpcomingItem
          image={bozenaImg}
          title="Bożena: Szczepienie"
          subtitle='Klinika "Zdrowy Kotuś"'
          badge="za 3 dni"
        />
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
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeType?: string;
}

const UpcomingItem = ({
  image,
  title,
  subtitle,
  badge,
  badgeType,
}: UpcomingItemProps) => (
  <div className="upcoming">
    <img src={image} className="avatar" alt={title} />
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