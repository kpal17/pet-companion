import React from "react";
import type { Pet } from "../../context/AuthContext.tsx";
import { speciesEmoji } from "./petUtils.ts";
import "./PetAvatar.css";

type PetAvatarProps = {
  pet?: Pick<Pet, "name" | "species" | "photo">;
  className?: string;
};

export default function PetAvatar({ pet, className = "" }: PetAvatarProps) {
  const classes = ["pet-photo-avatar", pet?.photo ? "has-photo" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} aria-label={pet ? `Zdjęcie pupila ${pet.name}` : "Pupil"}>
      {pet?.photo ? (
        <img src={pet.photo} alt="" />
      ) : (
        speciesEmoji(pet?.species || "")
      )}
    </span>
  );
}
