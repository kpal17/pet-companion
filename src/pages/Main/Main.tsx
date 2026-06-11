import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import svgPaths from "./svg-pwuchm5klk.ts";
import imgMedicalDashboard from "./d572a38628d70d45fb50fce0ac77c75b8c9996d3.jpg";
import imgHappyPets from "./326f839bfe14561b9a66ff807b7864acac95afb8.jpg";
import imgAnimals from "./animals.jpg";
import imgLogo from "./00e9533793b01d90c34b50db08b84853998152cb.png";

// ── Shared ────────────────────────────────────────────────────────────────────

interface IconBoxProps {
  bg: string;
  children: React.ReactNode;
  shadow?: boolean;
}

function IconBox({ bg, children, shadow }: IconBoxProps) {
  return (
    <div
      className="icon-box"
      style={{
        background: bg,
        boxShadow: shadow ? "0 1px 1px rgba(0,0,0,0.05)" : undefined,
      }}
    >
      {children}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <div className="brand-logo-wrap">
            <img src={imgLogo} alt="Pet Companion" className="brand-logo" />
          </div>
          <span className="brand-name">Pet Companion</span>
        </div>
        <button className="btn btn-outline-brand" onClick={() => navigate("/logowanie")}>
          Zaloguj się
        </button>
      </div>
    </nav>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Z troską o każdą łapkę</h1>
        <p className="hero-desc">
          Zarządzanie zdrowiem Twojego pupila nie musi być stresujące. Od śledzenia
          szczepień po wizyty u weterynarza, zapewniamy ciepłe i zorganizowane
          miejsce dla wszystkiego, czego potrzebuje Twój futrzany przyjaciel.
        </p>
        <div className="hero-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/rejestracja")}
          >
            Zacznij za darmo
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => {
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d={svgPaths.p19e3b6c0} fill="#795465" />
            </svg>
            Zobacz jak to działa
          </button>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-blur hero-blur--pink" aria-hidden="true" />
        <div className="hero-blur hero-blur--yellow" aria-hidden="true" />
        <img src={imgHappyPets} alt="Szczęśliwe zwierzaki z opiekunem" className="hero-image" />
      </div>
    </section>
  );
}

// ── Feature Card ──────────────────────────────────────────────────────────────

interface FeatureCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconShadow?: boolean;
  cardBg: string;
  title: string;
  description: string;
  visual?: React.ReactNode;
}

function FeatureCard({
  icon,
  iconBg,
  iconShadow,
  cardBg,
  title,
  description,
  visual,
}: FeatureCardProps) {
  return (
    <div className="feature-card" style={{ background: cardBg }}>
      <div className="feature-body">
        <IconBox bg={iconBg} shadow={iconShadow}>
          {icon}
        </IconBox>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{description}</p>
      </div>
      {visual && <div className="feature-visual">{visual}</div>}
    </div>
  );
}

// ── Features Section ──────────────────────────────────────────────────────────

function FeaturesSection() {
  return (
    <section className="features" id="features">
      <div className="features-inner">
        <div className="features-header">
          <h2 className="features-title">Pełna opieka, uproszczona</h2>
          <p className="features-subtitle">
            Jeden zorganizowany dom dla wszystkich niezbędnych informacji o zdrowiu
            Twojego zwierzaka, zaprojektowany z miłością dla nowoczesnych opiekunów.
          </p>
        </div>

        <div className="features-grid">
          {/* 1 — Cyfrowa książeczka zdrowia */}
          <FeatureCard
            iconBg="#f8c8dc"
            cardBg="#ffffff"
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d={svgPaths.p2cccbbb0} fill="#795465" />
              </svg>
            }
            title="Cyfrowa książeczka zdrowia"
            description="Uzyskaj dostęp do pełnej historii medycznej swojego zwierzaka, alergii i planów leczenia w bezpiecznym cyfrowym skarbcu. Koniec z zagubionymi papierowymi dokumentami."
            visual={
              <div className="dashboard-preview">
                <img src={imgMedicalDashboard} alt="Panel medyczny" />
              </div>
            }
          />

          {/* 2 — Obsługa wielu zwierząt */}
          <FeatureCard
            iconBg="rgba(246,209,118,0.15)"
            cardBg="rgba(246,209,118,0.1)"
            icon={
              <svg width="30" height="28.5" viewBox="0 0 30 28.5" fill="none">
                <path d={svgPaths.p2fc2f800} fill="#F8C8DC" />
              </svg>
            }
            title="Obsługa wielu zwierząt"
            description="Niezależnie od tego, czy masz jednego chomika, czy dom pełen dogów niemieckich, zarządzaj każdym profilem z indywidualnymi planami opieki i harmonogramami."
            visual={
              <div className="dashboard-preview">
                <img src={imgAnimals} alt="Różne zwierzęta" />
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ───────────────────────────────────────────────────────────────

function CtaSection() {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <div className="cta-inner">
        <div className="cta-deco cta-deco--top" aria-hidden="true" />
        <div className="cta-deco cta-deco--bottom" aria-hidden="true" />
        <div className="cta-content">
          <h2 className="cta-title">
            Gotowy, by zapewnić swojemu pupilowi najlepszą opiekę?
          </h2>
          <p className="cta-desc">
            Dołącz do ponad 50 000 szczęśliwych opiekunów, którzy ufają Pet
            Companion w kwestii zdrowia swoich futrzanych członków rodziny.
          </p>
          <div className="cta-actions">
            <button className="btn btn-white" onClick={() => navigate("/rejestracja")}>
              Załóż darmowe konto
            </button>
            <button className="btn btn-outline-white" onClick={() => navigate("/logowanie")}>
              Zaloguj się
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Main() {
  return (
    <div className="page-landing">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </main>
    </div>
  );
}
