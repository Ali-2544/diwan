/**
 * Generates the placeholder photography in `public/images/`.
 *
 *   pnpm placeholders
 *
 * These are DUMMY images, drawn in the site's palette so the layout reads
 * correctly before real photography exists. To use a real photo, just replace
 * the file in public/images/ with one of the same name and aspect ratio — no
 * component changes are needed. See the README for the full swap note.
 *
 * Each scene is composed as SVG and rasterised with sharp.
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

/* ---------------------------------------------------------------- */
/* Palette (mirrors tailwind.config.ts)                              */
/* ---------------------------------------------------------------- */
// Navy palette (mirrors tailwind.config.ts ink scale) + gold accents.
const INK = "#07182B";
const INK_800 = "#123152";
const NAVY_TOWER = "#0C2A46"; // dark tower silhouette fill on navy
const GOLD = "#C9A24B";
const GOLD_300 = "#E9CD82";

/** Deterministic pseudo-random so regenerating produces identical files. */
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/* ---------------------------------------------------------------- */
/* Scene primitives                                                  */
/* ---------------------------------------------------------------- */

function skyGradient(id, stops) {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    ${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}
  </linearGradient>`;
}

/** A row of towers with lit windows. */
function skyline({ w, h, baseY, seed, minH, maxH, fill, opacity = 1, windows = true }) {
  const rand = rng(seed);
  let out = `<g fill="${fill}" opacity="${opacity}">`;
  let lights = "";
  let x = -40;

  while (x < w + 40) {
    const bw = 40 + rand() * 120;
    const bh = minH + rand() * (maxH - minH);
    const y = baseY - bh;
    out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${(bh + 10).toFixed(1)}"/>`;

    // Occasional spire.
    if (rand() > 0.78) {
      const sx = x + bw / 2;
      out += `<polygon points="${(sx - 5).toFixed(1)},${y.toFixed(1)} ${sx.toFixed(1)},${(y - 40 - rand() * 60).toFixed(1)} ${(sx + 5).toFixed(1)},${y.toFixed(1)}"/>`;
    }

    if (windows) {
      for (let wy = y + 16; wy < baseY - 12; wy += 22) {
        for (let wx = x + 8; wx < x + bw - 10; wx += 18) {
          if (rand() > 0.62) {
            const o = (0.15 + rand() * 0.5).toFixed(2);
            lights += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="5" height="8" fill="${GOLD_300}" opacity="${o}"/>`;
          }
        }
      }
    }
    x += bw + 6 + rand() * 14;
  }

  out += "</g>";
  return out + lights;
}

/** Water with horizontal glint bands. */
function water({ w, h, top, seed }) {
  const rand = rng(seed);
  let out = `<rect x="0" y="${top}" width="${w}" height="${h - top}" fill="#090c10"/>`;
  for (let i = 0; i < 70; i++) {
    const y = top + rand() * (h - top);
    const lw = 20 + rand() * 260;
    const x = rand() * w;
    const o = (0.03 + rand() * 0.14) * (1 - (y - top) / (h - top));
    out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${lw.toFixed(1)}" height="1.6" fill="${GOLD}" opacity="${Math.max(0, o).toFixed(3)}"/>`;
  }
  return out;
}

function palm(x, baseY, scale, opacity = 1) {
  const s = scale;
  let fronds = "";
  for (let i = 0; i < 7; i++) {
    const a = -160 + i * 26;
    const rad = (a * Math.PI) / 180;
    const ex = x + Math.cos(rad) * 46 * s;
    const ey = baseY - 92 * s + Math.sin(rad) * 30 * s;
    fronds += `<path d="M${x} ${baseY - 90 * s} Q ${(x + ex) / 2} ${ey - 24 * s} ${ex.toFixed(1)} ${ey.toFixed(1)}" stroke="${INK}" stroke-width="${(5 * s).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
  }
  return `<g opacity="${opacity}"><path d="M${x} ${baseY} q ${-5 * s} ${-46 * s} ${2 * s} ${-90 * s}" stroke="${INK}" stroke-width="${(7 * s).toFixed(1)}" fill="none" stroke-linecap="round"/>${fronds}</g>`;
}

/** Warm grain + vignette, applied to every scene for a photographic feel. */
function finish(w, h) {
  return `
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.05"/>`;
}

function defsCommon(w, h) {
  return `
  <radialGradient id="vig" cx="50%" cy="45%" r="78%">
    <stop offset="62%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.38"/>
  </radialGradient>
  <!-- Atmospheric haze sitting between skyline layers, for depth. -->
  <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#2f77c9" stop-opacity="0"/>
    <stop offset="100%" stop-color="#2f77c9" stop-opacity="0.22"/>
  </linearGradient>
  <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#070a0d" stop-opacity="0"/>
    <stop offset="70%" stop-color="#070a0d" stop-opacity="0.85"/>
    <stop offset="100%" stop-color="#070a0d" stop-opacity="1"/>
  </linearGradient>
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <filter id="soft"><feGaussianBlur stdDeviation="18"/></filter>`;
}

/* ---------------------------------------------------------------- */
/* Scenes                                                            */
/* ---------------------------------------------------------------- */

const SCENES = {
  /** Hero — wide dusk skyline with a low gold sun. */
  "hero-skyline": (w, h) => `
    <defs>
      ${defsCommon(w, h)}
      ${skyGradient("sky", [
        ["0%", "#080c10"],
        ["34%", "#0f2033"],
        ["60%", "#22538a"],
        ["80%", "#D89440"],
        ["93%", "#20436b"],
        ["100%", "#141e2a"],
      ])}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <!-- Sun sits clear of the skyline so it reads as a light source. -->
    <circle cx="${w * 0.7}" cy="${h * 0.58}" r="${h * 0.26}" fill="${GOLD_300}" opacity="0.4" filter="url(#soft)"/>
    <circle cx="${w * 0.7}" cy="${h * 0.58}" r="${h * 0.07}" fill="#FFF3D6" opacity="1"/>
    <rect x="0" y="${h * 0.4}" width="${w}" height="${h * 0.42}" fill="url(#haze)"/>
    ${skyline({ w, h, baseY: h * 0.8, seed: 7, minH: h * 0.14, maxH: h * 0.5, fill: "#0e1b2a", opacity: 0.7 })}
    <rect x="0" y="${h * 0.55}" width="${w}" height="${h * 0.3}" fill="url(#haze)" opacity="0.7"/>
    <!-- Darkens the sky behind the front towers so bright sky doesn't leak
         through the gaps at street level as a hard gold band. -->
    <rect x="0" y="${h * 0.66}" width="${w}" height="${h * 0.26}" fill="url(#ground)"/>
    ${skyline({ w, h, baseY: h * 0.9, seed: 21, minH: h * 0.16, maxH: h * 0.46, fill: "#0a0f14", opacity: 1 })}
    ${water({ w, h, top: h * 0.9, seed: 33 })}
    ${finish(w, h)}`,

  /** Marina towers at night, portrait-ish. */
  "property-marina": (w, h) => `
    <defs>
      ${defsCommon(w, h)}
      ${skyGradient("sky", [
        ["0%", "#14121A"],
        ["50%", "#2A2028"],
        ["100%", "#284e7a"],
      ])}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <circle cx="${w * 0.2}" cy="${h * 0.18}" r="${h * 0.12}" fill="${GOLD}" opacity="0.2" filter="url(#soft)"/>
    <circle cx="${w * 0.72}" cy="${h * 0.62}" r="${h * 0.2}" fill="${GOLD}" opacity="0.16" filter="url(#soft)"/>
    ${skyline({ w, h, baseY: h * 0.78, seed: 5, minH: h * 0.3, maxH: h * 0.7, fill: "#1C1722" })}
    ${water({ w, h, top: h * 0.78, seed: 12 })}
    ${finish(w, h)}`,

  /** Low-rise villa with palms. */
  "property-villa": (w, h) => `
    <defs>
      ${defsCommon(w, h)}
      ${skyGradient("sky", [
        ["0%", "#0f161d"],
        ["60%", "#22354a"],
        ["100%", "#3f78b9"],
      ])}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <circle cx="${w * 0.78}" cy="${h * 0.68}" r="${h * 0.1}" fill="${GOLD_300}" opacity="0.35" filter="url(#soft)"/>
    <g fill="${INK}">
      <rect x="${w * 0.12}" y="${h * 0.46}" width="${w * 0.42}" height="${h * 0.34}"/>
      <rect x="${w * 0.5}" y="${h * 0.56}" width="${w * 0.3}" height="${h * 0.24}"/>
      <rect x="${w * 0.2}" y="${h * 0.36}" width="${w * 0.22}" height="${h * 0.12}"/>
    </g>
    <g fill="${GOLD_300}" opacity="0.32">
      <rect x="${w * 0.17}" y="${h * 0.52}" width="${w * 0.05}" height="${h * 0.045}"/>
      <rect x="${w * 0.27}" y="${h * 0.52}" width="${w * 0.05}" height="${h * 0.045}"/>
      <rect x="${w * 0.37}" y="${h * 0.52}" width="${w * 0.05}" height="${h * 0.045}"/>
      <rect x="${w * 0.17}" y="${h * 0.62}" width="${w * 0.05}" height="${h * 0.045}"/>
      <rect x="${w * 0.27}" y="${h * 0.62}" width="${w * 0.05}" height="${h * 0.045}"/>
      <rect x="${w * 0.55}" y="${h * 0.63}" width="${w * 0.045}" height="${h * 0.04}"/>
      <rect x="${w * 0.64}" y="${h * 0.63}" width="${w * 0.045}" height="${h * 0.04}"/>
    </g>
    ${palm(w * 0.08, h * 0.82, h / 340)}
    ${palm(w * 0.88, h * 0.84, h / 300)}
    ${palm(w * 0.95, h * 0.8, h / 380, 0.7)}
    <rect x="0" y="${h * 0.79}" width="${w}" height="${h * 0.21}" fill="#06090c"/>
    ${finish(w, h)}`,

  /** Off-plan: construction cranes against dusk. */
  "property-offplan": (w, h) => `
    <defs>
      ${defsCommon(w, h)}
      ${skyGradient("sky", [
        ["0%", "#080c10"],
        ["58%", "#18222e"],
        ["100%", "#2a578a"],
      ])}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    ${skyline({ w, h, baseY: h * 0.86, seed: 44, minH: h * 0.14, maxH: h * 0.46, fill: "#0b1015", windows: false })}
    <g stroke="${INK}" stroke-width="${Math.max(3, h / 190)}" fill="none">
      <path d="M${w * 0.22} ${h * 0.86} V ${h * 0.2} M${w * 0.08} ${h * 0.26} H ${w * 0.46}"/>
      <path d="M${w * 0.22} ${h * 0.2} L ${w * 0.34} ${h * 0.26}"/>
      <path d="M${w * 0.36} ${h * 0.26} V ${h * 0.42}"/>
      <path d="M${w * 0.68} ${h * 0.86} V ${h * 0.32} M${w * 0.56} ${h * 0.37} H ${w * 0.9}"/>
      <path d="M${w * 0.68} ${h * 0.32} L ${w * 0.78} ${h * 0.37}"/>
      <path d="M${w * 0.8} ${h * 0.37} V ${h * 0.5}"/>
    </g>
    <g fill="${GOLD}" opacity="0.75">
      <circle cx="${w * 0.22}" cy="${h * 0.19}" r="${h * 0.011}"/>
      <circle cx="${w * 0.68}" cy="${h * 0.31}" r="${h * 0.011}"/>
    </g>
    <rect x="0" y="${h * 0.85}" width="${w}" height="${h * 0.15}" fill="#06090c"/>
    ${finish(w, h)}`,

  /** Interior — arched lobby, portrait. */
  "interior-lobby": (w, h) => {
    const arches = Array.from({ length: 5 }, (_, i) => {
      const cx = w * (0.14 + i * 0.18);
      const aw = w * 0.13;
      const top = h * (0.3 + (i % 2) * 0.03);
      return `<path d="M${cx - aw / 2} ${h * 0.74} V ${top + aw / 2} A ${aw / 2} ${aw / 2} 0 0 1 ${cx + aw / 2} ${top + aw / 2} V ${h * 0.74} Z" fill="#0e141a" opacity="0.95"/>
      <path d="M${cx - aw / 2} ${h * 0.74} V ${top + aw / 2} A ${aw / 2} ${aw / 2} 0 0 1 ${cx + aw / 2} ${top + aw / 2} V ${h * 0.74}" fill="none" stroke="${GOLD}" stroke-width="1.6" opacity="0.5"/>`;
    }).join("");
    return `
    <defs>
      ${defsCommon(w, h)}
      ${skyGradient("wall", [
        ["0%", "#141c26"],
        ["50%", "#0e1319"],
        ["100%", "#070a0e"],
      ])}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#wall)"/>
    <circle cx="${w * 0.5}" cy="${h * 0.22}" r="${h * 0.16}" fill="${GOLD}" opacity="0.13" filter="url(#soft)"/>
    ${arches}
    <rect x="0" y="${h * 0.74}" width="${w}" height="${h * 0.26}" fill="#090d12"/>
    <rect x="0" y="${h * 0.74}" width="${w}" height="2" fill="${GOLD}" opacity="0.35"/>
    <g opacity="0.14" fill="${GOLD_300}">
      ${Array.from({ length: 5 }, (_, i) => `<rect x="${w * (0.075 + i * 0.18)}" y="${h * 0.75}" width="${w * 0.13}" height="${h * 0.14}"/>`).join("")}
    </g>
    ${finish(w, h)}`;
  },

  /** Office / team — desk silhouettes. */
  "team-office": (w, h) => `
    <defs>
      ${defsCommon(w, h)}
      ${skyGradient("bg", [
        ["0%", "#121821"],
        ["55%", "#0d1217"],
        ["100%", "#070a0d"],
      ])}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <g opacity="0.5">
      ${skyline({ w, h, baseY: h * 0.52, seed: 63, minH: h * 0.08, maxH: h * 0.3, fill: "#090c10" })}
    </g>
    <rect x="0" y="${h * 0.52}" width="${w}" height="3" fill="${GOLD}" opacity="0.25"/>
    <g fill="#070a0e">
      ${Array.from({ length: 4 }, (_, i) => {
        const x = w * (0.06 + i * 0.24);
        return `<rect x="${x}" y="${h * 0.66}" width="${w * 0.19}" height="${h * 0.05}" rx="3"/>
        <rect x="${x + w * 0.055}" y="${h * 0.71}" width="${w * 0.02}" height="${h * 0.13}"/>
        <rect x="${x + w * 0.045}" y="${h * 0.53}" width="${w * 0.1}" height="${h * 0.11}" rx="3"/>
        <circle cx="${x + w * 0.16}" cy="${h * 0.6}" r="${h * 0.045}"/>
        <path d="M${x + w * 0.12} ${h * 0.72} q ${w * 0.04} ${-h * 0.09} ${w * 0.08} 0 Z"/>`;
      }).join("")}
    </g>
    <g fill="${GOLD_300}" opacity="0.22">
      ${Array.from({ length: 4 }, (_, i) => `<rect x="${w * (0.105 + i * 0.24)}" y="${h * 0.545}" width="${w * 0.08}" height="${h * 0.085}"/>`).join("")}
    </g>
    ${finish(w, h)}`,

  /** Compliance — stacked documents with a permit stamp. */
  "compliance-permit": (w, h) => `
    <defs>
      ${defsCommon(w, h)}
      ${skyGradient("bg", [
        ["0%", "#10171f"],
        ["100%", "#06090c"],
      ])}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <circle cx="${w * 0.72}" cy="${h * 0.3}" r="${h * 0.28}" fill="${GOLD}" opacity="0.1" filter="url(#soft)"/>
    <g transform="rotate(-7 ${w * 0.44} ${h * 0.55})">
      <rect x="${w * 0.16}" y="${h * 0.2}" width="${w * 0.56}" height="${h * 0.68}" fill="#0e1319" stroke="${GOLD}" stroke-opacity="0.28"/>
      <rect x="${w * 0.19}" y="${h * 0.26}" width="${w * 0.3}" height="${h * 0.035}" fill="${GOLD_300}" opacity="0.5"/>
      ${Array.from({ length: 9 }, (_, i) => `<rect x="${w * 0.19}" y="${h * (0.34 + i * 0.055)}" width="${w * (0.5 - (i % 3) * 0.09)}" height="${h * 0.016}" fill="#3a526d" opacity="0.6"/>`).join("")}
    </g>
    <g transform="rotate(9 ${w * 0.74} ${h * 0.68})">
      <circle cx="${w * 0.74}" cy="${h * 0.68}" r="${h * 0.15}" fill="none" stroke="${GOLD}" stroke-width="3" opacity="0.75"/>
      <circle cx="${w * 0.74}" cy="${h * 0.68}" r="${h * 0.115}" fill="none" stroke="${GOLD}" stroke-width="1.4" opacity="0.55"/>
      <rect x="${w * 0.66}" y="${h * 0.645}" width="${w * 0.16}" height="${h * 0.07}" fill="${GOLD}" opacity="0.16"/>
    </g>
    ${finish(w, h)}`,

  /** Security — abstract vault grid. */
  "security-abstract": (w, h) => `
    <defs>
      ${defsCommon(w, h)}
      ${skyGradient("bg", [
        ["0%", "#0d1217"],
        ["100%", "#080807"],
      ])}
      <pattern id="grid" width="${w / 22}" height="${w / 22}" patternUnits="userSpaceOnUse">
        <path d="M ${w / 22} 0 L 0 0 0 ${w / 22}" fill="none" stroke="${GOLD}" stroke-width="1" opacity="0.16"/>
      </pattern>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <rect width="${w}" height="${h}" fill="url(#grid)"/>
    <circle cx="${w * 0.5}" cy="${h * 0.5}" r="${h * 0.42}" fill="${GOLD}" opacity="0.09" filter="url(#soft)"/>
    <g transform="translate(${w * 0.5} ${h * 0.5})">
      <path d="M0 ${-h * 0.3} L ${w * 0.13} ${-h * 0.19} V ${h * 0.05} Q ${w * 0.13} ${h * 0.24} 0 ${h * 0.31} Q ${-w * 0.13} ${h * 0.24} ${-w * 0.13} ${h * 0.05} V ${-h * 0.19} Z"
        fill="#0a0e12" stroke="${GOLD}" stroke-width="2.5" stroke-opacity="0.8"/>
      <path d="M ${-w * 0.045} ${h * 0.01} l ${w * 0.03} ${h * 0.05} l ${w * 0.062} ${-h * 0.1}" fill="none" stroke="${GOLD_300}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    ${finish(w, h)}`,

  /** Wide panorama for the closing CTA band. */
  "cta-panorama": (w, h) => `
    <defs>
      ${defsCommon(w, h)}
      ${skyGradient("sky", [
        ["0%", "#080807"],
        ["50%", "#080f17"],
        ["100%", "#162e4a"],
      ])}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <circle cx="${w * 0.5}" cy="${h * 0.95}" r="${h * 0.5}" fill="${GOLD}" opacity="0.16" filter="url(#soft)"/>
    ${skyline({ w, h, baseY: h * 0.9, seed: 91, minH: h * 0.18, maxH: h * 0.68, fill: "#080b0e" })}
    ${finish(w, h)}`,
};

/* ---------------------------------------------------------------- */
/* Output manifest                                                   */
/* ---------------------------------------------------------------- */

const FILES = [
  { name: "hero-skyline", w: 2400, h: 1350 },
  { name: "property-marina", w: 1400, h: 1750 },
  // Portrait, because the homepage showcase renders these in a 4:5 frame —
  // a landscape source cropped to portrait loses the whole composition.
  { name: "property-villa", w: 1400, h: 1750 },
  { name: "property-offplan", w: 1400, h: 1750 },
  { name: "interior-lobby", w: 1400, h: 1750 },
  { name: "team-office", w: 1800, h: 1200 },
  { name: "compliance-permit", w: 1600, h: 1200 },
  { name: "security-abstract", w: 1800, h: 1200 },
  { name: "cta-panorama", w: 2400, h: 1000 },
];

await mkdir(OUT, { recursive: true });

for (const { name, w, h } of FILES) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${SCENES[name](w, h)}</svg>`;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, `${name}.jpg`));

  // Tiny blurred twin, inlined as the next/image blur placeholder.
  const blur = await sharp(Buffer.from(svg))
    .resize(16)
    .jpeg({ quality: 40 })
    .toBuffer();

  console.log(
    `${name}.jpg  ${w}x${h}  blur=${Math.round(blur.length / 1024)}kb`,
  );
  await sharp(blur).toFile(join(OUT, `${name}.blur.jpg`));
}

console.log(`\n${FILES.length} placeholder images written to public/images/`);
