import icons, { IconName } from "./pages/Strona_glowna/assets/icons.ts";

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  viewBox?: string;
  stroke?: boolean;
  strokeWidth?: number;
};

export function Icon({
  name,
  size = 24,
  color = "currentColor",
  viewBox = "0 0 20 20",
  stroke = false,
  strokeWidth = 1.5,
}: IconProps) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill={stroke ? "none" : color} aria-hidden>
      <path
        d={icons[name]}
        {...(stroke ? { stroke: color, strokeWidth, strokeLinecap: "round" } : {})}
      />
    </svg>
  );
}
