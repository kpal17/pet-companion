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
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = (currentUser?.name || "Opiekun")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/logowanie");
  };

  return (
    <div className="app-shell">
      <header className="app-shell__topbar">
        <div className="app-shell__topbar-inner">
          <div className="app-shell__menu-wrap" ref={menuRef}>
            <button
              type="button"
              className="app-shell__menu-button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Otwórz menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>

            {menuOpen && (
              <div className="app-shell__menu">
                <NavLink to="/home">Strona główna</NavLink>
                <NavLink to="/pupile">Moje pupile</NavLink>
                <NavLink to="/pupile/dodaj">Dodaj pupila</NavLink>
                <NavLink to="/wpisy/nowy">Dodaj wpis</NavLink>
                <button type="button" onClick={handleLogout}>Wyloguj się</button>
              </div>
            )}
          </div>

          <NavLink className="app-shell__brand" to="/home">
            Pet Companion
          </NavLink>

          <div className="app-shell__avatar" title={currentUser?.name || "Profil użytkownika"}>
            {initials || "PC"}
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
