import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import "./AppLayout.css";

type NavigationIcon = "home" | "pets" | "calendar" | "vet";

const navigationItems: Array<{
  label: string;
  to: string;
  icon: NavigationIcon;
  matches: (pathname: string) => boolean;
}> = [
  {
    label: "Start",
    to: "/home",
    icon: "home",
    matches: (pathname) => pathname === "/home",
  },
  {
    label: "Pupile",
    to: "/pupile",
    icon: "pets",
    matches: (pathname) => pathname.startsWith("/pupile"),
  },
  {
    label: "Planer",
    to: "/planer",
    icon: "calendar",
    matches: (pathname) => pathname === "/planer" || pathname.startsWith("/wpisy"),
  },
  {
    label: "Weterynarz",
    to: "/weterynarz",
    icon: "vet",
    matches: (pathname) => pathname.startsWith("/weterynarz"),
  },
];

function AppNavigationIcon({ name }: { name: NavigationIcon }) {
  if (name === "home") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4v-9.5Z" />
      </svg>
    );
  }

  if (name === "pets") {
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
      <path d="M5 7h14v13H5V7Zm4 0V4h6v3M9 12h6m-3-3v6" />
    </svg>
  );
}

export default function AppLayout() {
  const { currentUser, entries, logout, pets } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef<HTMLDivElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const canGoBack = location.pathname !== "/home";

  const initials = (currentUser?.name || "Opiekun")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  useEffect(() => {
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const closeProfile = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    const closeProfileWithKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", closeProfile);
    document.addEventListener("keydown", closeProfileWithKeyboard);
    return () => {
      document.removeEventListener("mousedown", closeProfile);
      document.removeEventListener("keydown", closeProfileWithKeyboard);
    };
  }, []);

  const handleBack = () => {
    if (location.pathname.startsWith("/pupile/")) {
      navigate("/pupile");
      return;
    }

    if (location.pathname.startsWith("/wpisy")) {
      navigate("/planer");
      return;
    }

    navigate("/home");
  };

  const handleLogout = () => {
    logout();
    navigate("/logowanie");
  };

  return (
    <div className="app-shell">
      <header className="app-shell__topbar">
        <div className="app-shell__topbar-inner">
          {canGoBack ? (
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

          <NavLink className="app-shell__brand" to="/home">
            Pet Companion
          </NavLink>

          <div className="app-shell__profile-wrap" ref={profileRef}>
            <button
              type="button"
              className="app-shell__avatar"
              title={currentUser?.name || "Profil użytkownika"}
              aria-label="Otwórz profil"
              aria-expanded={profileOpen}
              aria-controls="app-profile-menu"
              onClick={() => setProfileOpen((open) => !open)}
            >
              {initials || "PC"}
            </button>

            {profileOpen && (
              <div className="app-shell__profile-menu" id="app-profile-menu">
                <div className="app-shell__profile-summary">
                  <div className="app-shell__profile-avatar">{initials || "PC"}</div>
                  <div>
                    <strong>{currentUser?.name || "Opiekun"}</strong>
                    <span>{currentUser?.email || "Twoje konto"}</span>
                  </div>
                </div>

                <div className="app-shell__profile-stats" aria-label="Podsumowanie konta">
                  <div>
                    <strong>{pets.length}</strong>
                    <span>Pupile</span>
                  </div>
                  <div>
                    <strong>{entries.length}</strong>
                    <span>Wpisy</span>
                  </div>
                </div>

                <div className="app-shell__profile-actions">
                  <NavLink to="/pupile">
                    <span>Moje pupile</span>
                    <span aria-hidden="true">›</span>
                  </NavLink>
                  <NavLink to="/wpisy/nowy">
                    <span>Dodaj nowy wpis</span>
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

      <nav className="app-shell__bottom-nav" aria-label="Główna nawigacja">
        <div className="app-shell__bottom-nav-inner">
          {navigationItems.map((item) => {
            const active = item.matches(location.pathname);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`app-shell__nav-item${active ? " app-shell__nav-item--active" : ""}`}
              >
                <AppNavigationIcon name={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
