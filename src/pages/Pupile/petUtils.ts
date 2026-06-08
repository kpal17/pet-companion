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

export function dateBadge(dateStr: string): { text: string; urgent: boolean } {
  if (!dateStr) return { text: "—", urgent: false };
  const d = new Date(dateStr);
  const today = new Date();
  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diff < 0) return { text: `${Math.abs(diff)} dni temu`, urgent: false };
  if (diff === 0) return { text: "dziś", urgent: true };
  if (diff === 1) return { text: "jutro", urgent: true };
  if (diff < 7) return { text: `za ${diff} dni`, urgent: false };
  return {
    text: d.toLocaleDateString("pl-PL", { day: "numeric", month: "short" }),
    urgent: false,
  };
}
