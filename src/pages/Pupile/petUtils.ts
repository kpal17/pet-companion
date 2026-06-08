export function speciesEmoji(species: string): string {
  const map: Record<string, string> = {
    "Pies": "🐕",
    "Kot": "🐱",
    "Królik": "🐰",
    "Chomik": "🐹",
    "Ptak": "🐦",
  };
  return map[species] ?? "🐾";
}

export function computeAge(birthDate: string): string {
  if (!birthDate) return "—";
  const birth = new Date(birthDate);
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  if (totalMonths < 1) return "< 1 mies.";
  if (totalMonths < 12) return `${totalMonths} mies.`;
  const y = Math.floor(totalMonths / 12);
  if (y === 1) return "1 rok";
  if (y < 5) return `${y} lata`;
  return `${y} lat`;
}

export const SPECIES_OPTIONS = ["Pies", "Kot", "Królik", "Chomik", "Ptak", "Inne"];
