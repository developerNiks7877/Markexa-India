import { useId } from "react";

export type ArtVariant = "ribbon" | "arches" | "orb" | "liquid" | "rings" | "monolith" | "dunes";

const W = 800;
const H = 1000;

function mix(a: number[], b: number[], t: number) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}
function hexToRgb(h: string) {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function Ribbon({ hue }: { hue: string }) {
  const dark = [14, 12, 11], silver = [214, 216, 222], accent = hexToRgb(hue);
  const N = 140;
  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N;
    const x = W * (0.5 + 0.34 * Math.sin(t * Math.PI * 2.2 + 0.4));
    const y = H * (0.08 + 0.84 * t);
    const phase = t * Math.PI * 5.2 + 0.6;
    return { x, y, w: 150 * Math.cos(phase), phase };
  });
  const polys = [];
  for (let i = 0; i < N; i++) {
    const a = pts[i], b = pts[i + 1];
    const light = (Math.sin(a.phase * 1.3) + 1) / 2;
    const base = mix(dark, silver, Math.pow(light, 1.6));
    const col = Math.abs(a.w) < 28 ? mix(base, accent, 0.85) : mix(base, accent, Math.max(0, Math.sin(a.phase * 0.5 + 1) * 0.35));
    polys.push(
      <polygon
  key={i}
  points={`${(a.x - a.w).toFixed(2)},${a.y.toFixed(2)} ${(a.x + a.w).toFixed(2)},${a.y.toFixed(2)} ${(b.x + b.w).toFixed(2)},${b.y.toFixed(2)} ${(b.x - b.w).toFixed(2)},${b.y.toFixed(2)}`}
  fill={`rgb(${col})`}
  stroke={`rgb(${col})`}
  strokeWidth={0.8}
/>
    );
  }
  return <g>{polys}</g>;
}

function Arches({ hue, id }: { hue: string; id: string }) {
  const rows = Array.from({ length: 7 }, (_, i) => i);
  return (
    <g>
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={hue} stopOpacity="0.9" /><stop offset="0.6" stopColor="#2a2623" /><stop offset="1" stopColor="#0b0a09" /></linearGradient>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b0a09" /><stop offset="1" stopColor="#0f0d0c" /></linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4efe6" /><stop offset="1" stopColor={hue} /></linearGradient>
      </defs>
      {rows.map((i) => {
        const w = 640 - i * 84, x = (W - w) / 2, top = 120 + i * 62, bot = 840 - i * 14;
        return <path key={i} d={`M${x} ${bot} V${top + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${top + w / 2} V${bot} Z`} fill={i === 6 ? `url(#${id}b)` : `url(#${id}a)`} stroke="#0b0a09" strokeWidth={6} opacity={1 - i * 0.04} />;
      })}
      <rect x="0" y="840" width={W} height="160" fill={`url(#${id}f)`} />
      <path d={`M300 1000 L360 840 H440 L500 1000Z`} fill={hue} opacity="0.35" />
    </g>
  );
}

function Orb({ hue, id }: { hue: string; id: string }) {
  return (
    <g>
      <defs>
        <radialGradient id={`${id}o`} cx="0.35" cy="0.3" r="0.8"><stop offset="0" stopColor="#ffffff" /><stop offset="0.18" stopColor="#d9dce2" /><stop offset="0.5" stopColor="#4a4745" /><stop offset="0.8" stopColor="#0f0d0c" /><stop offset="1" stopColor={hue} /></radialGradient>
        <radialGradient id={`${id}g`} cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor={hue} stopOpacity="0.55" /><stop offset="1" stopColor={hue} stopOpacity="0" /></radialGradient>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={hue} stopOpacity="0.5" /><stop offset="1" stopColor="#0b0a09" stopOpacity="0" /></linearGradient>
      </defs>
      <ellipse cx="400" cy="480" rx="420" ry="380" fill={`url(#${id}g)`} />
      <rect y="700" width={W} height="300" fill="#0b0a09" opacity="0.6" />
      <circle cx="400" cy="470" r="250" fill={`url(#${id}o)`} />
      <ellipse cx="400" cy="740" rx="230" ry="26" fill="#000" opacity="0.7" />
      <g transform="translate(0 1480) scale(1 -1)" opacity="0.28"><circle cx="400" cy="470" r="250" fill={`url(#${id}o)`} /></g>
      <rect y="720" width={W} height="280" fill={`url(#${id}f)`} opacity="0.25" />
    </g>
  );
}

function Liquid({ hue, id }: { hue: string; id: string }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}l`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f5f5f7" /><stop offset="0.35" stopColor="#7d8087" /><stop offset="0.55" stopColor="#15130f" /><stop offset="0.8" stopColor={hue} /><stop offset="1" stopColor="#f0d9c0" /></linearGradient>
        <linearGradient id={`${id}m`} x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b0a09" /><stop offset="0.5" stopColor="#c9ccd1" /><stop offset="1" stopColor={hue} /></linearGradient>
      </defs>
      <path d="M120 300 C 80 120, 420 60, 560 200 C 720 340, 780 560, 640 700 C 520 830, 280 900, 170 740 C 80 610, 170 460, 120 300Z" fill={`url(#${id}l)`} />
      <path d="M300 340 C 380 260, 520 300, 540 420 C 560 540, 470 640, 380 620 C 290 600, 230 440, 300 340Z" fill={`url(#${id}m)`} opacity="0.92" />
      <ellipse cx="260" cy="250" rx="70" ry="22" transform="rotate(-24 260 250)" fill="#fff" opacity="0.65" />
      <ellipse cx="480" cy="410" rx="26" ry="60" transform="rotate(18 480 410)" fill="#fff" opacity="0.35" />
    </g>
  );
}

function Rings({ hue, id }: { hue: string; id: string }) {
  return (
    <g>
      <defs><linearGradient id={`${id}r`} x1="0" x2="1"><stop offset="0" stopColor={hue} stopOpacity="0" /><stop offset="0.5" stopColor="#f4efe6" /><stop offset="1" stopColor={hue} stopOpacity="0" /></linearGradient>
        <radialGradient id={`${id}c`}><stop offset="0" stopColor="#fff" /><stop offset="0.3" stopColor={hue} /><stop offset="1" stopColor={hue} stopOpacity="0" /></radialGradient></defs>
      <circle cx="400" cy="500" r="260" fill={`url(#${id}c)`} opacity="0.55" />
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse key={i} cx="400" cy="500" rx={120 + i * 28} ry={40 + i * 9} transform={`rotate(${-24 + (i % 2) * 48} 400 500)`} fill="none" stroke={`url(#${id}r)`} strokeWidth={1 + (i % 3)} opacity={0.9 - i * 0.05} />
      ))}
    </g>
  );
}

function Monolith({ hue, id }: { hue: string; id: string }) {
  return (
    <g>
      <defs><linearGradient id={`${id}s`} x1="0" x2="1"><stop offset="0" stopColor="#f4efe6" /><stop offset="0.12" stopColor="#8a8d93" /><stop offset="0.5" stopColor="#141210" /><stop offset="1" stopColor={hue} /></linearGradient>
        <linearGradient id={`${id}b`} x1="0.5" x2="0.5" y1="0" y2="1"><stop offset="0" stopColor={hue} stopOpacity="0.6" /><stop offset="1" stopColor={hue} stopOpacity="0" /></linearGradient></defs>
      <polygon points="330,0 470,0 640,1000 160,1000" fill={`url(#${id}b)`} opacity="0.5" />
      <rect y="800" width={W} height="200" fill="#0b0a09" />
      {[[210, 340, 120, 460], [320, 180, 170, 620], [510, 380, 110, 420], [130, 520, 70, 280]].map(([x, y, w, h], i) => (
        <g key={i}><rect x={x} y={y} width={w} height={h} fill={`url(#${id}s)`} /><rect x={x} y={y} width={w} height="6" fill="#fff" opacity="0.55" /></g>
      ))}
    </g>
  );
}

function Dunes({ hue, id }: { hue: string; id: string }) {
  const layers = Array.from({ length: 7 }, (_, i) => {
    const y = 470 + i * 80;
    let d = `M0 ${H} V${y}`;
    for (let x = 0; x <= W; x += 40) d += ` L${x} ${y + Math.sin(x / 90 + i * 1.7) * (26 + i * 5)}`;
    return <path key={i} d={d + ` V${H}Z`} fill={`rgb(${mix(hexToRgb(hue), [11, 10, 9], 0.25 + i * 0.12)})`} stroke="#0b0a09" strokeWidth={2} />;
  });
  return (
    <g>
      <defs><radialGradient id={`${id}d`} cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#fff6e0" /><stop offset="0.25" stopColor={hue} /><stop offset="1" stopColor={hue} stopOpacity="0" /></radialGradient></defs>
      <circle cx="400" cy="400" r="320" fill={`url(#${id}d)`} opacity="0.8" />
      <circle cx="400" cy="400" r="86" fill="#fff6e0" />
      {layers}
    </g>
  );
}

/** Original, dependency-free generative artwork. Used wherever a real image has not been supplied yet. */
export default function ProceduralArt({ variant, hue = "#d4501e", className = "", bg }: { variant: ArtVariant; hue?: string; className?: string; bg?: string }) {
  const id = useId().replace(/:/g, "");
  const Art = { ribbon: Ribbon, arches: Arches, orb: Orb, liquid: Liquid, rings: Rings, monolith: Monolith, dunes: Dunes }[variant];
  return (
    <svg className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Abstract temporary artwork" xmlns="http://www.w3.org/2000/svg">
      <rect width={W} height={H} fill={bg ?? "#0f0d0c"} />
      <Art hue={hue} id={id} />
    </svg>
  );
}
