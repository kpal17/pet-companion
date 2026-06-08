import React from "react";
import { useNavigate } from "react-router-dom";
import "./AppSectionPage.css";

type AppSectionPageProps = {
  type: "planner" | "vet";
};

export default function AppSectionPage({ type }: AppSectionPageProps) {
  const navigate = useNavigate();
  const planner = type === "planner";

  return (
    <div className="app-section-page">
      <section className="app-section-page__hero">
        <span className="app-section-page__eyebrow">
          {planner ? "Twój harmonogram" : "Opieka weterynaryjna"}
        </span>
        <h1>{planner ? "Planer" : "Weterynarz"}</h1>
        <p>
          {planner
            ? "Zaplanuj wizyty, leki i ważne wydarzenia dla swoich pupili."
            : "Wkrótce znajdziesz tutaj kontakty, wizyty i historię leczenia."}
        </p>
      </section>

      <section className="app-section-page__card">
        <div className="app-section-page__icon" aria-hidden="true">
          {planner ? "✓" : "+"}
        </div>
        <h2>{planner ? "Dodaj wydarzenie" : "Moduł w przygotowaniu"}</h2>
        <p>
          {planner
            ? "Utwórz nowy wpis i przypisz go do wybranego pupila."
            : "Podstawowe dane medyczne możesz już zapisywać jako wpisy pupila."}
        </p>
        <button
          type="button"
          onClick={() => navigate(planner ? "/wpisy/nowy" : "/pupile")}
        >
          {planner ? "Nowy wpis" : "Przejdź do pupili"}
        </button>
      </section>
    </div>
  );
}
