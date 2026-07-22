/**
 * Generates placeholder imagery for /public/diwan.  `pnpm placeholders`
 *
 * Property photos are navy/gold dusk scenes; dashboard slots are light UI
 * stand-ins. All are DUMMY — replace with real Dubai property photos and real
 * CRM screenshots (same filenames) for a zero-code swap. See content/images.ts.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "diwan");

const NAVY = "#0E2A47";
const NAVY2 = "#173A5E";
const NAVY_DEEP = "#08192B";
const GOLD = "#B7822A";
const GOLD2 = "#DDB05A";
const GOLDSOFT = "#F5EAD2";
const INK = "#132639";
const TINT = "#F4F7FB";
const LINE = "#E8EDF3";
const SLATE = "#56697E";
const MUTED = "#8492A3";
const GREEN = "#1E8A63";

function rng(seed) {
  let s = seed;
  return () => ((s = (s * 1664525 + 1013904223) % 4294967296), s / 4294967296);
}

/* ---- shared bits ---------------------------------------------------- */

function grad(id, stops) {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops
    .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`)
    .join("")}</linearGradient>`;
}

function skyline({ w, baseY, seed, minH, maxH, fill, opacity = 1, windows = true }) {
  const rand = rng(seed);
  let out = `<g fill="${fill}" opacity="${opacity}">`;
  let lights = "";
  let x = -40;
  while (x < w + 40) {
    const bw = 40 + rand() * 120;
    const bh = minH + rand() * (maxH - minH);
    const y = baseY - bh;
    out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${(bh + 12).toFixed(1)}"/>`;
    if (rand() > 0.8) {
      const sx = x + bw / 2;
      out += `<polygon points="${(sx - 4).toFixed(1)},${y.toFixed(1)} ${sx.toFixed(1)},${(y - 30 - rand() * 50).toFixed(1)} ${(sx + 4).toFixed(1)},${y.toFixed(1)}"/>`;
    }
    if (windows) {
      for (let wy = y + 14; wy < baseY - 10; wy += 20) {
        for (let wx = x + 8; wx < x + bw - 10; wx += 17) {
          if (rand() > 0.6)
            lights += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="4.5" height="7" fill="${GOLD2}" opacity="${(0.18 + rand() * 0.5).toFixed(2)}"/>`;
        }
      }
    }
    x += bw + 6 + rand() * 12;
  }
  return out + "</g>" + lights;
}

function finish(w, h) {
  return `<radialGradient id="vig" cx="50%" cy="46%" r="80%"><stop offset="60%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.42"/></radialGradient>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
  <filter id="soft"><feGaussianBlur stdDeviation="16"/></filter>
  __BODY__
  <rect width="${w}" height="${h}" fill="url(#vig)"/><rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.05"/>`;
}

/* ---- property scenes ------------------------------------------------ */

function marinaSkyline(w, h) {
  const body = `${skyline({ w, baseY: h * 0.82, seed: 7, minH: h * 0.18, maxH: h * 0.6, fill: "#0A2138", opacity: 0.7 })}
    ${skyline({ w, baseY: h * 0.92, seed: 21, minH: h * 0.2, maxH: h * 0.5, fill: NAVY_DEEP })}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>
    ${grad("sky", [["0%", "#0C233C"], ["45%", "#123152"], ["72%", NAVY2], ["88%", "#8A6A34"], ["100%", "#3A2E1C"]])}</defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <circle cx="${w * 0.7}" cy="${h * 0.6}" r="${h * 0.22}" fill="${GOLD2}" opacity="0.28" filter="url(#soft)"/>
    <circle cx="${w * 0.7}" cy="${h * 0.6}" r="${h * 0.06}" fill="#FBE9C8" opacity="0.95"/>
    ${finish(w, h).replace("__BODY__", body)}</svg>`;
}

function villaScene(w, h) {
  const palm = (x, baseY, s) => {
    let fr = "";
    for (let i = 0; i < 7; i++) {
      const a = (-160 + i * 26) * (Math.PI / 180);
      const ex = x + Math.cos(a) * 46 * s;
      const ey = baseY - 92 * s + Math.sin(a) * 30 * s;
      fr += `<path d="M${x} ${baseY - 90 * s} Q ${(x + ex) / 2} ${ey - 22 * s} ${ex.toFixed(1)} ${ey.toFixed(1)}" stroke="${NAVY_DEEP}" stroke-width="${(5 * s).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
    }
    return `<path d="M${x} ${baseY} q ${-5 * s} ${-46 * s} ${2 * s} ${-90 * s}" stroke="${NAVY_DEEP}" stroke-width="${(7 * s).toFixed(1)}" fill="none" stroke-linecap="round"/>${fr}`;
  };
  const body = `<circle cx="${w * 0.78}" cy="${h * 0.66}" r="${h * 0.12}" fill="${GOLD2}" opacity="0.3" filter="url(#soft)"/>
    <g fill="${NAVY_DEEP}"><rect x="${w * 0.12}" y="${h * 0.46}" width="${w * 0.42}" height="${h * 0.36}"/><rect x="${w * 0.5}" y="${h * 0.56}" width="${w * 0.3}" height="${h * 0.26}"/><rect x="${w * 0.2}" y="${h * 0.36}" width="${w * 0.22}" height="${h * 0.12}"/></g>
    <g fill="${GOLD2}" opacity="0.5"><rect x="${w * 0.17}" y="${h * 0.52}" width="${w * 0.05}" height="${h * 0.05}"/><rect x="${w * 0.27}" y="${h * 0.52}" width="${w * 0.05}" height="${h * 0.05}"/><rect x="${w * 0.37}" y="${h * 0.52}" width="${w * 0.05}" height="${h * 0.05}"/><rect x="${w * 0.56}" y="${h * 0.63}" width="${w * 0.045}" height="${h * 0.045}"/><rect x="${w * 0.66}" y="${h * 0.63}" width="${w * 0.045}" height="${h * 0.045}"/></g>
    ${palm(w * 0.08, h * 0.84, h / 340)}${palm(w * 0.9, h * 0.86, h / 300)}
    <rect x="0" y="${h * 0.8}" width="${w}" height="${h * 0.2}" fill="#081524"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>
    ${grad("sky", [["0%", "#12314F"], ["60%", "#2A3F5E"], ["100%", "#7A5A2E"]])}</defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>${finish(w, h).replace("__BODY__", body)}</svg>`;
}

function offplanScene(w, h) {
  const body = `${skyline({ w, baseY: h * 0.88, seed: 44, minH: h * 0.16, maxH: h * 0.48, fill: "#0A2036", windows: false })}
    <g stroke="${NAVY_DEEP}" stroke-width="${Math.max(3, h / 180)}" fill="none">
      <path d="M${w * 0.22} ${h * 0.88} V ${h * 0.2} M${w * 0.08} ${h * 0.26} H ${w * 0.46}"/><path d="M${w * 0.22} ${h * 0.2} L ${w * 0.34} ${h * 0.26}"/><path d="M${w * 0.36} ${h * 0.26} V ${h * 0.42}"/>
      <path d="M${w * 0.68} ${h * 0.88} V ${h * 0.32} M${w * 0.56} ${h * 0.37} H ${w * 0.9}"/><path d="M${w * 0.68} ${h * 0.32} L ${w * 0.78} ${h * 0.37}"/><path d="M${w * 0.8} ${h * 0.37} V ${h * 0.5}"/></g>
    <g fill="${GOLD2}"><circle cx="${w * 0.22}" cy="${h * 0.19}" r="${h * 0.012}"/><circle cx="${w * 0.68}" cy="${h * 0.31}" r="${h * 0.012}"/></g>
    <rect x="0" y="${h * 0.86}" width="${w}" height="${h * 0.14}" fill="#081524"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>
    ${grad("sky", [["0%", "#0C233C"], ["58%", "#1D3556"], ["100%", "#6A5230"]])}</defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>${finish(w, h).replace("__BODY__", body)}</svg>`;
}

/* ---- dashboard stand-ins (light) ------------------------------------ */

function dashboard(w, h, { bars = true, table = false, seed = 3 } = {}) {
  const rand = rng(seed);
  const sidebarW = w * 0.16;
  const pad = w * 0.03;
  const contentX = sidebarW + pad;
  const contentW = w - contentX - pad;

  // KPI tiles
  const tileY = h * 0.16;
  const tileH = h * 0.16;
  const gap = w * 0.015;
  const tileW = (contentW - gap * 3) / 4;
  const accents = ["#2E6FBE", "#2E6FBE", GREEN, GOLD];
  let tiles = "";
  for (let i = 0; i < 4; i++) {
    const x = contentX + i * (tileW + gap);
    tiles += `<rect x="${x}" y="${tileY}" width="${tileW}" height="${tileH}" rx="10" fill="#fff" stroke="${LINE}"/>
      <rect x="${x}" y="${tileY}" width="${tileW}" height="3" fill="${accents[i]}"/>
      <rect x="${x + 14}" y="${tileY + 16}" width="${tileW * 0.5}" height="7" rx="3" fill="${MUTED}" opacity="0.5"/>
      <rect x="${x + 14}" y="${tileY + tileH * 0.5}" width="${tileW * 0.4}" height="16" rx="4" fill="${INK}"/>`;
  }

  // Chart panel
  const chartY = tileY + tileH + h * 0.05;
  const chartH = h * 0.4;
  let chart = `<rect x="${contentX}" y="${chartY}" width="${contentW * 0.62}" height="${chartH}" rx="12" fill="#fff" stroke="${LINE}"/>`;
  if (bars) {
    const n = 8;
    const bw = (contentW * 0.62 - 60) / n;
    for (let i = 0; i < n; i++) {
      const bh = (0.25 + rand() * 0.7) * (chartH - 60);
      chart += `<rect x="${contentX + 30 + i * bw}" y="${chartY + chartH - 24 - bh}" width="${bw * 0.55}" height="${bh}" rx="3" fill="${i % 3 === 0 ? GOLD : "#2E6FBE"}" opacity="0.85"/>`;
    }
  } else {
    // line chart
    let d = `M ${contentX + 24} ${chartY + chartH * 0.7}`;
    for (let i = 1; i <= 8; i++)
      d += ` L ${contentX + 24 + (i * (contentW * 0.62 - 48)) / 8} ${chartY + 24 + rand() * (chartH - 60)}`;
    chart += `<path d="${d}" fill="none" stroke="${GOLD}" stroke-width="3"/>`;
  }
  // side panel (donut-ish)
  const spX = contentX + contentW * 0.66;
  const spW = contentW * 0.34;
  chart += `<rect x="${spX}" y="${chartY}" width="${spW}" height="${chartH}" rx="12" fill="#fff" stroke="${LINE}"/>
    <circle cx="${spX + spW / 2}" cy="${chartY + chartH * 0.5}" r="${chartH * 0.26}" fill="none" stroke="${LINE}" stroke-width="14"/>
    <circle cx="${spX + spW / 2}" cy="${chartY + chartH * 0.5}" r="${chartH * 0.26}" fill="none" stroke="${GOLD}" stroke-width="14" stroke-dasharray="${chartH * 1.0} ${chartH * 2}" transform="rotate(-90 ${spX + spW / 2} ${chartY + chartH * 0.5})"/>`;

  let rows = "";
  if (table) {
    const ty = chartY + chartH + h * 0.05;
    rows += `<rect x="${contentX}" y="${ty}" width="${contentW}" height="${h * 0.22}" rx="12" fill="#fff" stroke="${LINE}"/>`;
    for (let i = 0; i < 4; i++) {
      const ry = ty + 18 + i * (h * 0.045);
      rows += `<rect x="${contentX + 18}" y="${ry}" width="${contentW * 0.3}" height="8" rx="4" fill="${INK}" opacity="0.75"/>
        <rect x="${contentX + contentW * 0.4}" y="${ry}" width="${contentW * 0.2}" height="8" rx="4" fill="${SLATE}" opacity="0.5"/>
        <rect x="${contentX + contentW - 90}" y="${ry - 3}" width="60" height="16" rx="8" fill="${i === 3 ? "#FBEAE4" : GREEN + "22"}"/>`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="${TINT}"/>
    <rect x="0" y="0" width="${sidebarW}" height="${h}" fill="${NAVY}"/>
    <rect x="${sidebarW * 0.16}" y="${h * 0.06}" width="${sidebarW * 0.68}" height="10" rx="5" fill="${GOLD2}"/>
    ${Array.from({ length: 7 }, (_, i) => `<rect x="${sidebarW * 0.16}" y="${h * 0.16 + i * h * 0.07}" width="${sidebarW * 0.7}" height="7" rx="3.5" fill="#fff" opacity="${i === 0 ? 0.9 : 0.32}"/>`).join("")}
    <rect x="${contentX}" y="${h * 0.05}" width="${contentW * 0.4}" height="14" rx="6" fill="${INK}"/>
    <rect x="${contentX}" y="${h * 0.09}" width="${contentW * 0.24}" height="8" rx="4" fill="${MUTED}" opacity="0.5"/>
    ${tiles}${chart}${rows}
    <rect width="${w}" height="${h}" fill="none" stroke="${LINE}"/>
  </svg>`;
}

/* ---- render --------------------------------------------------------- */

const FILES = [
  { name: "hero-listing.jpg", w: 1600, h: 620, svg: (w, h) => marinaSkyline(w, h) },
  { name: "compliance-listing.jpg", w: 1600, h: 620, svg: (w, h) => marinaSkyline(w, h) },
  { name: "lm-ready.jpg", w: 1400, h: 900, svg: (w, h) => marinaSkyline(w, h) },
  { name: "lm-offplan.jpg", w: 1400, h: 900, svg: (w, h) => offplanScene(w, h) },
  { name: "lm-villa.jpg", w: 1400, h: 900, svg: (w, h) => villaScene(w, h) },
  { name: "dash-hero.png", w: 2000, h: 1160, svg: (w, h) => dashboard(w, h, { bars: true, table: true, seed: 9 }) },
  { name: "dash-1.png", w: 1200, h: 820, svg: (w, h) => dashboard(w, h, { bars: true, table: false, seed: 4 }) },
  { name: "dash-2.png", w: 1200, h: 820, svg: (w, h) => dashboard(w, h, { bars: false, table: true, seed: 15 }) },
  { name: "dash-3.png", w: 1200, h: 820, svg: (w, h) => dashboard(w, h, { bars: true, table: false, seed: 27 }) },
];

await mkdir(OUT, { recursive: true });
for (const f of FILES) {
  const buf = Buffer.from(f.svg(f.w, f.h));
  const pipe = sharp(buf);
  if (f.name.endsWith(".png")) await pipe.png().toFile(join(OUT, f.name));
  else await pipe.jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, f.name));
  console.log(`${f.name}  ${f.w}x${f.h}`);
}
console.log(`\n${FILES.length} placeholders written to public/diwan/`);
