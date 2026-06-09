import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { speciesEmoji } from "./Pupile/petUtils.ts";
import "./OwnerVetPage.css";

export default function OwnerVetPage() {
  const navigate = useNavigate();
  const { pets, vetAccessCodes, vetGrants } = useAuth();

  return (
    <div className="owner-vet-page">
      <section className="owner-vet-hero">
        <div className="owner-vet-icon">✚</div>
        <div>
          <span>Bezpieczna współpraca</span>
          <h1>Weterynarz</h1>
          <p>
            Udostępniaj kartotekę konkretnego pupila za pomocą czasowego kodu.
            Weterynarz nie otrzyma dostępu do Twojego konta ani innych profili.
          </p>
        </div>
      </section>

      <section className="owner-vet-how">
        <h2>Jak to działa?</h2>
        <div>
          <article><strong>1</strong><span>Wybierz pupila i wygeneruj kod ważny 24 godziny.</span></article>
          <article><strong>2</strong><span>Weterynarz realizuje kod w Pet Companion VET.</span></article>
          <article><strong>3</strong><span>Możesz cofnąć kod lub aktywny dostęp w dowolnej chwili.</span></article>
        </div>
      </section>

      <section className="owner-vet-pets">
        <div className="owner-vet-heading">
          <div>
            <span>Dostęp per pupil</span>
            <h2>Kartoteki do udostępnienia</h2>
          </div>
          <button type="button" onClick={() => navigate("/vet/logowanie")}>Otwórz VET</button>
        </div>
        {pets.length === 0 ? (
          <div className="owner-vet-empty">Dodaj pupila, aby udostępnić jego kartotekę.</div>
        ) : (
          <div className="owner-vet-pet-list">
            {pets.map((pet) => {
              const activeCode = vetAccessCodes.find(
                (code) =>
                  code.petId === pet.id &&
                  !code.revoked &&
                  code.usageCount < code.usageLimit &&
                  new Date(code.expiresAt).getTime() > Date.now(),
              );
              const grants = vetGrants.filter((grant) => grant.petId === pet.id && !grant.revoked);
              return (
                <button type="button" key={pet.id} onClick={() => navigate(`/pupile/${pet.id}`)}>
                  <span>{speciesEmoji(pet.species)}</span>
                  <div>
                    <strong>{pet.name}</strong>
                    <small>
                      {activeCode ? `Kod ${activeCode.code}` : "Brak aktywnego kodu"}
                      {grants.length ? ` · dostępy ${grants.length}` : ""}
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
  );
}
