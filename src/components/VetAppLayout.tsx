import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import vetLogo from "../pages/Vet/vet-logo.png";
import "./AppLayout.css";
import "./VetAppLayout.css";

type VetNavigationIcon = "home" | "patients" | "calendar" | "history";

const navigationItems: Array<{
  label: string;
  to: string;
  icon: VetNavigationIcon;
}> = [
  { label: "Start", to: "/vet/dashboard", icon: "home" },
  { label: "Pacjenci", to: "/vet/pacjenci", icon: "patients" },
  { label: "Kalendarz", to: "/vet/kalendarz", icon: "calendar" },
  { label: "Historia", to: "/vet/historia", icon: "history" },
];

function VetNavigationIconView({ name }: { name: VetNavigationIcon }) {
  if (name === "home") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4v-9.5Z" />
      </svg>
    );
  }

  if (name === "patients") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="7" cy="8" r="2.2" />
        <circle cx="17" cy="8" r="2.2" />
        <circle cx="10" cy="4.8" r="2.2" />
        <circle cx="14" cy="4.8" r="2.2" />
        <path d="M12 10.2c-3.6 0-6.6 3.2-6.6 6.2 0 2.1 1.7 3.6 3.8 3.6 1 0 1.8-.4 2.8-.4s1.8.4 2.8.4c2.1 0 3.8-1.5 3.8-3.6 0-3-3-6.2-6.6-6.2Z" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 5h14v15H5V5Zm0 4h14M8 3v4m8-4v4M8 12h3m2 0h3m-8 4h3m2 0h3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v14H4V6Zm4-3v5m8-5v5M8 12h8m-8 4h5" />
    </svg>
  );
}

export default function VetAppLayout() {
  const { currentVet, entries, logoutVet, vetGrants } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef<HTMLDivElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const isDashboard = location.pathname === "/vet/dashboard";

  const initials = (currentVet?.name || "VET")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const accessiblePetIds = new Set(
    vetGrants
      .filter((grant) => grant.vetId === currentVet?.id && !grant.revoked)
      .map((grant) => grant.petId),
  );
  const patientCount = accessiblePetIds.size;
  const recordCount = entries.filter((entry) => accessiblePetIds.has(entry.petId)).length;

  useEffect(() => {
    setProfileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const closeProfile = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    const closeWithKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileOpen(false);
    };

    document.addEventListener("mousedown", closeProfile);
    document.addEventListener("keydown", closeWithKeyboard);
    return () => {
      document.removeEventListener("mousedown", closeProfile);
      document.removeEventListener("keydown", closeWithKeyboard);
    };
  }, []);

  const handleLogout = () => {
    logoutVet();
    navigate("/vet/logowanie");
  };

  const handleBack = () => {
    if (location.pathname.startsWith("/vet/pacjent/")) {
      navigate("/vet/pacjenci");
      return;
    }
    navigate("/vet/dashboard");
  };

  return (
    <div className="app-shell app-shell--vet">
      <header className="app-shell__topbar">
        <div className="app-shell__topbar-inner">
          {!isDashboard ? (
            <button
              type="button"
              className="app-shell__back-button"
              onClick={handleBack}
              aria-label="Wróć"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          ) : (
            <span className="app-shell__topbar-spacer" aria-hidden="true" />
          )}

          <Link className="app-shell__brand vet-shell__brand" to="/vet/dashboard">
            <img src={vetLogo} alt="" aria-hidden="true" />
            <span>Pet Companion <strong>VET</strong></span>
          </Link>

          <div className="app-shell__profile-wrap" ref={profileRef}>
            <button
              type="button"
              className="app-shell__avatar"
              title={currentVet?.name || "Profil weterynarza"}
              aria-label="Otwórz profil"
              aria-expanded={profileOpen}
              aria-controls="vet-profile-menu"
              onClick={() => setProfileOpen((open) => !open)}
            >
              {initials || "VET"}
            </button>

            {profileOpen && (
              <div className="app-shell__profile-menu" id="vet-profile-menu">
                <div className="app-shell__profile-summary">
                  <img className="vet-shell__profile-logo" src={vetLogo} alt="" aria-hidden="true" />
                  <div>
                    <strong>{currentVet?.name || "Weterynarz"}</strong>
                    <span>{currentVet?.email || "Profil VET"}</span>
                  </div>
                </div>

                <div className="app-shell__profile-stats" aria-label="Podsumowanie profilu">
                  <div>
                    <strong>{patientCount}</strong>
                    <span>Pacjenci</span>
                  </div>
                  <div>
                    <strong>{recordCount}</strong>
                    <span>Wpisy</span>
                  </div>
                </div>

                <div className="vet-shell__profile-details">
                  <span>{currentVet?.specialization}</span>
                  <strong>{currentVet?.clinicName}</strong>
                  <small>PWZ {currentVet?.licenseNumber}</small>
                </div>

                <div className="app-shell__profile-actions">
                  <NavLink to="/vet/profil">
                    <span>Profil zawodowy</span>
                    <span aria-hidden="true">›</span>
                  </NavLink>
                  <NavLink to="/vet/historia">
                    <span>Historia dostępu</span>
                    <span aria-hidden="true">›</span>
                  </NavLink>
                </div>

                <button
                  type="button"
                  className="app-shell__logout-button"
                  onClick={handleLogout}
                >
                  Wyloguj się
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="app-shell__content">
        <Outlet />
      </main>

      <nav className="app-shell__bottom-nav" aria-label="Nawigacja Pet Companion VET">
        <div className="app-shell__bottom-nav-inner">
          {navigationItems.map((item) => {
            const active = item.icon === "patients"
              ? location.pathname === item.to || location.pathname.startsWith("/vet/pacjent/")
              : location.pathname === item.to;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`app-shell__nav-item${active ? " app-shell__nav-item--active" : ""}`}
              >
                <VetNavigationIconView name={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
