"use client";

import { useEffect, useRef } from "react";

// ── Tile geometry ─────────────────────────────────────────────────────────────
const TW = 92;
const TH = 46;
const TW2 = TW / 2;
const TH2 = TH / 2;

const BLOCK_H = { navy: 54, accent: 36, light: 26 } as const;

const FACE = {
  navy: {
    top: "#1E4D8C", left: "#0C1D3B", right: "#102347",
    text: "#EAF2FC", stroke: "rgba(255,255,255,0.07)",
  },
  accent: {
    top: "#3D8FE0", left: "#175EA8", right: "#2472C8",
    text: "#EAF2FC", stroke: "rgba(255,255,255,0.09)",
  },
  light: {
    top: "#C8DFF7", left: "#72AADF", right: "#99C3EF",
    text: "#102347", stroke: "rgba(16,35,71,0.09)",
  },
} as const;

// 10 service blocks — center first so it animates in first
// AV at (2,0) extends the cluster's lower-right corner naturally
const BLOCKS = [
  { id: "managed-it",  col:  0, row:  0, type: "navy"   as const, label: "Managed IT",  icon: "⚙" },
  { id: "security",    col: -1, row: -1, type: "accent" as const, label: "Security",    icon: "🛡" },
  { id: "network",     col:  1, row: -1, type: "accent" as const, label: "Network",     icon: "🌐" },
  { id: "backup",      col: -1, row:  1, type: "accent" as const, label: "Backup",      icon: "💾" },
  { id: "training",    col:  1, row:  1, type: "accent" as const, label: "Training",    icon: "🎓" },
  { id: "m365",        col:  0, row: -1, type: "light"  as const, label: "M365",        icon: "☁" },
  { id: "physical",    col:  1, row:  0, type: "light"  as const, label: "Physical",    icon: "📷" },
  { id: "strategy",    col: -1, row:  0, type: "light"  as const, label: "Strategy",    icon: "📊" },
  { id: "procurement", col:  0, row:  1, type: "light"  as const, label: "Procurement", icon: "📦" },
  { id: "av",          col:  2, row:  0, type: "light"  as const, label: "AV",          icon: "🎙" },
];

type BType = "navy" | "accent" | "light";
interface Particle { x: number; y: number; vx: number; vy: number; r: number; a: number }
interface Pulse    { fi: number; ti: number; t: number; dur: number }

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }
function easeIO(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

// rounded-rect path helper (no roundRect API needed)
function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function IsometricMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cvRef   = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cv   = cvRef.current;
    if (!wrap || !cv) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      W = rect.width; H = rect.height;
      cv!.width  = Math.round(W * dpr);
      cv!.height = Math.round(H * dpr);
      cv!.style.width  = `${W}px`;
      cv!.style.height = `${H}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ── State ─────────────────────────────────────────────────────────────────
    const pts: Particle[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * 600, y: Math.random() * 600,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.6,
      a: Math.random() * 0.28 + 0.06,
    }));

    const pulses: Pulse[] = [];
    let nextPulse = 1.9;
    const t0 = performance.now();
    let prevTs = t0;
    let raf: number;

    // ── Helpers ───────────────────────────────────────────────────────────────
    function ixy(col: number, row: number, ox: number, oy: number) {
      return { x: ox + (col - row) * TW2, y: oy + (col + row) * TH2 };
    }

    function drawBlock(col: number, row: number, tp: BType, prog: number, ox: number, oy: number) {
      const p = easeIO(clamp(prog, 0, 1));
      if (p === 0) return;
      const { x: sx, y: sy } = ixy(col, row, ox, oy);
      const c = FACE[tp]; const bh = BLOCK_H[tp]; const yo = (1 - p) * 26;

      ctx!.save();
      ctx!.globalAlpha = p;
      ctx!.translate(0, yo);

      // Top face
      ctx!.beginPath();
      ctx!.moveTo(sx, sy - TH2); ctx!.lineTo(sx + TW2, sy);
      ctx!.lineTo(sx, sy + TH2); ctx!.lineTo(sx - TW2, sy);
      ctx!.closePath();
      ctx!.fillStyle = c.top; ctx!.fill();
      ctx!.strokeStyle = c.stroke; ctx!.lineWidth = 0.5; ctx!.stroke();

      // Left face
      ctx!.beginPath();
      ctx!.moveTo(sx - TW2, sy); ctx!.lineTo(sx, sy + TH2);
      ctx!.lineTo(sx, sy + TH2 + bh); ctx!.lineTo(sx - TW2, sy + bh);
      ctx!.closePath();
      ctx!.fillStyle = c.left; ctx!.fill();
      ctx!.strokeStyle = c.stroke; ctx!.stroke();

      // Right face
      ctx!.beginPath();
      ctx!.moveTo(sx, sy + TH2); ctx!.lineTo(sx + TW2, sy);
      ctx!.lineTo(sx + TW2, sy + bh); ctx!.lineTo(sx, sy + TH2 + bh);
      ctx!.closePath();
      ctx!.fillStyle = c.right; ctx!.fill();
      ctx!.strokeStyle = c.stroke; ctx!.stroke();

      ctx!.restore();
    }

    function drawLabel(col: number, row: number, tp: BType, lbl: string, icn: string, prog: number, ox: number, oy: number) {
      const p = easeIO(clamp(prog, 0, 1));
      if (p === 0) return;
      const { x: sx, y: sy } = ixy(col, row, ox, oy);
      const yo = (1 - p) * 26;

      ctx!.save();
      ctx!.globalAlpha = p;
      ctx!.translate(0, yo);
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.font = `${tp === "navy" ? 13 : 10}px sans-serif`;
      ctx!.fillText(icn, sx, sy - 2);
      ctx!.fillStyle = FACE[tp].text;
      ctx!.font = `bold ${tp === "navy" ? 8.5 : 7}px system-ui, sans-serif`;
      ctx!.fillText(lbl, sx, sy + 9);
      ctx!.restore();
    }

    function drawBadge(x: number, y: number, val: string, lbl: string, alpha: number) {
      const bW = 84, bH = 42;
      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.shadowColor = "rgba(16,35,71,0.13)";
      ctx!.shadowBlur  = 14;
      rrect(ctx!, x, y, bW, bH, 8);
      ctx!.fillStyle = "rgba(255,255,255,0.94)";
      ctx!.fill();
      ctx!.shadowBlur  = 0;
      ctx!.strokeStyle = "rgba(36,114,200,0.18)";
      ctx!.lineWidth   = 1;
      ctx!.stroke();
      ctx!.fillStyle   = "#102347";
      ctx!.font        = "bold 14px system-ui, sans-serif";
      ctx!.textAlign   = "center";
      ctx!.textBaseline = "top";
      ctx!.fillText(val, x + bW / 2, y + 7);
      ctx!.fillStyle = "rgba(16,35,71,0.48)";
      ctx!.font      = "9.5px system-ui, sans-serif";
      ctx!.fillText(lbl, x + bW / 2, y + 25);
      ctx!.restore();
    }

    // ── Render loop ───────────────────────────────────────────────────────────
    function render(ts: number) {
      raf = requestAnimationFrame(render);

      const el = (ts - t0) / 1000;
      const dt = Math.min((ts - prevTs) / 1000, 0.05);
      prevTs = ts;

      ctx!.clearRect(0, 0, W, H);

      // Origin: shifted left to account for AV extending the cluster rightward
      const ox = W * 0.43;
      const oy = H * 0.44;

      // ── Background grid ───────────────────────────────────────────────────
      ctx!.save();
      ctx!.strokeStyle = "rgba(36,114,200,0.05)";
      ctx!.lineWidth   = 0.5;
      for (let gx = 0; gx < W; gx += 32) {
        ctx!.beginPath(); ctx!.moveTo(gx, 0); ctx!.lineTo(gx, H); ctx!.stroke();
      }
      for (let gy = 0; gy < H; gy += 32) {
        ctx!.beginPath(); ctx!.moveTo(0, gy); ctx!.lineTo(W, gy); ctx!.stroke();
      }
      ctx!.restore();

      // ── Floating particles ────────────────────────────────────────────────
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(36,114,200,${p.a})`;
        ctx!.fill();
      }

      // Center top-face position
      const { x: cx, y: cy } = ixy(0, 0, ox, oy);

      // ── Connection lines (draw progressively) ─────────────────────────────
      const LINE_START = 0.8, LINE_DUR = 0.22, LINE_GAP = 0.17;
      BLOCKS.slice(1).forEach((b, i) => {
        const lp = clamp((el - (LINE_START + i * LINE_GAP)) / LINE_DUR, 0, 1);
        if (lp <= 0) return;
        const { x: bx, y: by } = ixy(b.col, b.row, ox, oy);
        ctx!.save();
        ctx!.beginPath();
        ctx!.setLineDash([3, 5]);
        ctx!.strokeStyle = `rgba(36,114,200,${0.22 * easeIO(lp)})`;
        ctx!.lineWidth   = 0.8;
        ctx!.moveTo(cx, cy);
        ctx!.lineTo(cx + (bx - cx) * easeIO(lp), cy + (by - cy) * easeIO(lp));
        ctx!.stroke();
        ctx!.restore();
      });

      // ── Blocks — painters order: col+row ascending (back → front) ─────────
      const sorted = [...BLOCKS].sort((a, b) => (a.col + a.row) - (b.col + b.row));
      for (const b of sorted) {
        const oi = BLOCKS.findIndex((x) => x.id === b.id);
        drawBlock(b.col, b.row, b.type, (el - oi * 0.08) / 0.5, ox, oy);
      }
      // Labels drawn after all blocks so they're never hidden by a face
      for (const b of sorted) {
        const oi = BLOCKS.findIndex((x) => x.id === b.id);
        drawLabel(b.col, b.row, b.type, b.label, b.icon, (el - oi * 0.08) / 0.5, ox, oy);
      }

      // ── Pulse rings from center ───────────────────────────────────────────
      for (let ring = 0; ring < 2; ring++) {
        const ph = ((el * 0.62 + ring * 0.5) % 1.0);
        ctx!.beginPath();
        ctx!.arc(cx, cy, ph * 90, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(36,114,200,${(1 - ph) * 0.30})`;
        ctx!.lineWidth   = 1.5;
        ctx!.stroke();
      }

      // ── Data pulses ───────────────────────────────────────────────────────
      if (el >= nextPulse) {
        const ri = 1 + Math.floor(Math.random() * (BLOCKS.length - 1));
        const toCenter = Math.random() > 0.5;
        pulses.push({ fi: toCenter ? ri : 0, ti: toCenter ? 0 : ri, t: 0, dur: 0.8 + Math.random() * 0.4 });
        nextPulse = el + 0.55 + Math.random() * 0.45;
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pu = pulses[i];
        pu.t = Math.min(pu.t + dt / pu.dur, 1);

        const from = BLOCKS[pu.fi], to = BLOCKS[pu.ti];
        const { x: fx, y: fy } = ixy(from.col, from.row, ox, oy);
        const { x: tx, y: ty } = ixy(to.col,   to.row,   ox, oy);

        const et = easeIO(pu.t);
        const px = fx + (tx - fx) * et;
        const py = fy + (ty - fy) * et;
        const pa = Math.sin(pu.t * Math.PI);

        // Glow
        const g = ctx!.createRadialGradient(px, py, 0, px, py, 10);
        g.addColorStop(0, `rgba(61,143,224,${pa * 0.4})`);
        g.addColorStop(1, "transparent");
        ctx!.beginPath(); ctx!.arc(px, py, 10, 0, Math.PI * 2);
        ctx!.fillStyle = g; ctx!.fill();

        // Core dot
        ctx!.beginPath(); ctx!.arc(px, py, 3.2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(61,143,224,${pa})`; ctx!.fill();

        if (pu.t >= 1) pulses.splice(i, 1);
      }

      // ── Stat badges — positioned relative to cluster ──────────────────────
      // Cluster spans roughly ox±148 horizontally, so badges anchor to corners
      const ba = clamp((el - 1.8) / 0.5, 0, 1);
      if (ba > 0) {
        drawBadge(ox + 110,  oy - 130, "247+",   "endpoints", ba); // upper-right
        drawBadge(ox - 195,  oy + 10,  "4 min",  "response",  ba); // left
        drawBadge(ox + 100,  oy + 100, "99.98%", "uptime",    ba); // lower-right
      }
    }

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <canvas ref={cvRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
