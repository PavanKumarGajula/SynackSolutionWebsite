"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Network, Shield, Laptop, Mail, Users, Cloud,
  ShieldCheck, UserCheck, Laptop2, Lock, FileHeart,
  KeyRound, ShieldAlert, GitBranch, ArrowRight,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Shared primitives ────────────────────────────── */

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-[22px]">
      <span className="w-6 h-[2px] rounded-full flex-shrink-0" style={{ background: dark ? "#7AB4EE" : "#2472C8" }} />
      <span
        className="font-mono text-[11px] font-bold tracking-[0.17em] uppercase"
        style={{ color: dark ? "#7AB4EE" : "#2472C8" }}
      >
        {children}
      </span>
    </div>
  );
}

function DarkAccent({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative rounded-[16px] overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(180deg, #122849 0%, #091428 100%)",
        boxShadow: "0 0 0 6px rgba(36,114,200,.08), 0 0 0 12px rgba(36,114,200,.04), 0 16px 32px rgba(16,35,71,.18)",
        ...style,
      }}
    >
      <div
        className="absolute -top-10 -right-10 w-[140px] h-[140px] rounded-full pointer-events-none ind-glow-blob"
        style={{ background: "radial-gradient(circle, rgba(36,114,200,.4) 0%, transparent 60%)" }}
      />
      {children}
    </div>
  );
}

function DiagramCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-border-light rounded-[20px] p-7" style={{ boxShadow: "0 16px 40px rgba(16,35,71,.06)" }}>
      {children}
    </div>
  );
}

function DiagramHead({ icon, title, status }: { icon: React.ReactNode; title: string; status: string }) {
  return (
    <div className="flex items-center justify-between pb-[18px] border-b border-border-light mb-[22px]">
      <div className="flex items-center gap-2.5 font-mono text-[10.5px] font-bold tracking-[0.14em] uppercase text-text-heading">
        <span className="text-accent">{icon}</span>
        {title}
      </div>
      <div
        className="inline-flex items-center gap-[7px] font-mono text-[10px] font-bold tracking-[0.14em] uppercase px-[11px] py-[5px] rounded-full"
        style={{ color: "#22A05A", background: "rgba(34,160,90,.10)", border: "1px solid rgba(34,160,90,.30)" }}
      >
        <span className="w-[5px] h-[5px] rounded-full flex-shrink-0 ind-status-blink" style={{ background: "#22A05A", boxShadow: "0 0 6px #22A05A" }} />
        {status}
      </div>
    </div>
  );
}

function DiagramFoot({ left, right }: { left: React.ReactNode; right: string }) {
  return (
    <div className="mt-[22px] pt-4 border-t border-border-light flex justify-between font-mono text-[10px] font-bold tracking-[0.1em] uppercase text-text-muted">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function CoverageList({ items }: { items: string[] }) {
  return (
    <div className="pt-6 border-t border-border-light">
      <p className="font-mono text-[10.5px] font-bold tracking-[0.14em] uppercase text-text-muted mb-3.5">What we cover</p>
      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-[14.5px] font-medium text-text-heading leading-[1.6]">
            <svg viewBox="0 0 16 16" fill="none" stroke="#2472C8" strokeWidth="2.2" className="w-4 h-4 flex-shrink-0 mt-0.5">
              <polyline points="3,8 7,12 13,4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Industry section wrapper ─────────────────────── */

function IndustrySection({
  id, eyebrow, heading, accentPhrase, body, coverage, diagram, reverse = false,
}: {
  id: string; eyebrow: string; heading: string; accentPhrase: string;
  body: string; coverage: string[]; diagram: React.ReactNode; reverse?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={ref}
      className="relative py-[120px] px-5 lg:px-[60px]"
    >
      <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Text column */}
        <motion.div
          className={`max-w-[540px] ${reverse ? "lg:order-2" : ""}`}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            className="font-outfit font-black text-text-heading mb-[22px]"
            style={{ fontSize: "clamp(34px, 4.4vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.04 }}
          >
            {heading}{" "}
            <em className="not-italic text-accent">{accentPhrase}</em>
          </h2>
          <p className="text-text-body leading-[1.7] mb-9" style={{ fontSize: "clamp(15px, 1.5vw, 17px)" }}>
            {body}
          </p>
          <CoverageList items={coverage} />
        </motion.div>

        {/* Diagram column */}
        <motion.div
          className={reverse ? "lg:order-1" : ""}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
        >
          {diagram}
        </motion.div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   DIAGRAMS
═══════════════════════════════════════════════ */

function MfgDiagram() {
  return (
    <DiagramCard>
      <DiagramHead icon={<Network size={13} />} title="Network · OT/IT Segmentation" status="Enforced" />

      {/* Corporate IT zone */}
      <div className="p-4 rounded-[14px] border border-border-light bg-scale-50 mb-3.5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-text-muted">Corporate IT Zone</span>
          <span className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase px-[9px] py-[3px] rounded-full"
            style={{ color: "#2472C8", background: "rgba(36,114,200,.10)", border: "1px solid rgba(36,114,200,.30)" }}>
            Trusted
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[{ icon: <Laptop size={14} />, name: "M365" }, { icon: <Mail size={14} />, name: "EMAIL" }, { icon: <Users size={14} />, name: "USERS" }, { icon: <Cloud size={14} />, name: "AZURE" }].map((n) => (
            <div key={n.name} className="py-2.5 px-2 bg-white border border-border-light rounded-[10px] flex flex-col items-center gap-1.5 hover:-translate-y-px transition-transform">
              <span className="text-accent">{n.icon}</span>
              <span className="font-mono text-[9px] font-bold tracking-[0.04em] text-text-heading">{n.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Firewall */}
      <DarkAccent className="mb-3.5">
        <div className="flex items-center justify-between gap-3 px-[18px] py-[14px] flex-wrap">
          <div className="flex items-center gap-2.5 relative z-10">
            <div className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(36,114,200,.20)", border: "1px solid rgba(36,114,200,.40)" }}>
              <Shield size={13} style={{ color: "#3D8FE0" }} />
            </div>
            <span className="font-mono text-[10.5px] font-bold tracking-[0.14em] uppercase" style={{ color: "#EAF2FC" }}>
              Firewall · Inspection
            </span>
          </div>
          <div className="flex gap-2 relative z-10 flex-wrap">
            {["Default Deny", "Logged"].map((r) => (
              <span key={r} className="font-mono text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-[3px] rounded-full"
                style={{ color: "#7AB4EE", background: "rgba(122,180,238,.10)", border: "1px solid rgba(122,180,238,.20)" }}>
                {r}
              </span>
            ))}
          </div>
        </div>
      </DarkAccent>

      {/* OT zone */}
      <div className="p-4 rounded-[14px] border bg-scale-50"
        style={{ borderColor: "rgba(232,156,31,.30)", background: "rgba(255,251,240,.6)" }}>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-text-muted">OT / Production Zone</span>
          <span className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase px-[9px] py-[3px] rounded-full"
            style={{ color: "#E89C1F", background: "rgba(232,156,31,.10)", border: "1px solid rgba(232,156,31,.30)" }}>
            Restricted
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {["PLC 01", "PLC 02", "PLC 03", "SCADA"].map((n) => (
            <div key={n} className="py-[9px] px-2.5 bg-white border border-border-light rounded-[10px] flex items-center justify-between hover:-translate-y-px transition-transform">
              <span className="font-mono text-[9px] font-bold tracking-[0.04em] text-text-heading">{n}</span>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 ind-status-blink" style={{ background: "#22A05A", boxShadow: "0 0 6px #22A05A" }} />
            </div>
          ))}
        </div>
      </div>

      <DiagramFoot
        left={<>Tuned to <strong className="text-accent">operational impact</strong></>}
        right="Uptime · 99.98%"
      />
    </DiagramCard>
  );
}

function HcDiagram() {
  const layers = [
    { icon: <UserCheck size={15} />, name: "Identity", detail: "MFA · Conditional access", badge: "§164.312(d)", width: "100%" },
    { icon: <Laptop2 size={15} />, name: "Endpoint", detail: "Compliance · EDR · Logging", badge: "§164.312(b)", width: "92%" },
    { icon: <Lock size={15} />, name: "Encryption", detail: "AES-256 at rest · TLS 1.3 in transit", badge: "§164.312(a)(2)(iv)", width: "84%" },
  ];

  return (
    <DiagramCard>
      <DiagramHead icon={<ShieldCheck size={13} />} title="Layered Defense · PHI" status="Compliant" />

      <div className="flex flex-col gap-1.5">
        {layers.map((l) => (
          <div
            key={l.name}
            className="mx-auto px-[18px] py-[14px] rounded-[14px] bg-white border border-border-light flex items-center gap-3.5 hover:-translate-y-px transition-transform"
            style={{ width: l.width }}
          >
            <div className="w-8 h-8 rounded-[9px] bg-scale-50 border border-border-light flex items-center justify-center flex-shrink-0">
              <span className="text-accent">{l.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-outfit text-[13.5px] font-extrabold text-text-heading leading-[1.2]">{l.name}</p>
              <p className="font-mono text-[10px] font-bold tracking-[0.04em] uppercase text-text-muted mt-[3px]">{l.detail}</p>
            </div>
            <span className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase px-[9px] py-1 rounded-full flex-shrink-0"
              style={{ color: "#2472C8", background: "rgba(36,114,200,.10)", border: "1px solid rgba(36,114,200,.30)" }}>
              {l.badge}
            </span>
          </div>
        ))}

        {/* PHI core — dark accent */}
        <div style={{ width: "76%", marginLeft: "auto", marginRight: "auto", marginTop: 6 }}>
        <DarkAccent>
          <div className="px-5 py-4 flex items-center gap-3.5 relative z-10">
            <div className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(36,114,200,.20)", border: "1px solid rgba(36,114,200,.40)" }}>
              <FileHeart size={14} style={{ color: "#3D8FE0" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-outfit text-[13.5px] font-extrabold leading-[1.2]" style={{ color: "#EAF2FC" }}>PHI · Patient Data</p>
              <p className="font-mono text-[10px] font-bold tracking-[0.04em] uppercase mt-[3px]" style={{ color: "#7AB4EE" }}>Access logged · 90-day retention</p>
            </div>
            <span className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase px-[9px] py-1 rounded-full flex-shrink-0"
              style={{ color: "#7AB4EE", background: "rgba(122,180,238,.10)", border: "1px solid rgba(122,180,238,.20)" }}>
              Protected
            </span>
          </div>
        </DarkAccent>
        </div>
      </div>

      {/* HIPAA chips */}
      <div className="mt-[18px] px-4 py-3 bg-scale-50 border border-border-light rounded-xl flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-1.5 flex-wrap">
          {["Access", "Audit", "Integrity", "Transmission"].map((c) => (
            <span key={c} className="font-mono text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-[3px] bg-white border border-border-light rounded-full text-text-muted">
              {c}
            </span>
          ))}
        </div>
        <span className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: "#22A05A" }}>
          All controls · documented
        </span>
      </div>
    </DiagramCard>
  );
}

function PsDiagram() {
  const cols = [
    { label: "Active", sub: "Matters" }, { label: "Closed", sub: "Matters" },
    { label: "Sensitive", sub: "Walled" }, { label: "Admin", sub: "Records" },
  ];
  const rows = [
    { role: "Partner",    perms: ["full", "read", "full", "read"] },
    { role: "Associate",  perms: ["full", "meta", "none", "meta"] },
    { role: "Paralegal",  perms: ["read", "none", "none", "none"] },
    { role: "Admin",      perms: ["meta", "meta", "none", "full"] },
  ];

  const permStyle: Record<string, { bg: string; color: string; border?: string; label: string }> = {
    full: { bg: "#2472C8", color: "#EAF2FC", label: "Full" },
    read: { bg: "rgba(36,114,200,.12)", color: "#2472C8", border: "1px solid rgba(36,114,200,.25)", label: "Read" },
    meta: { bg: "#EAF2FC", color: "#1E4D8C", border: "1px solid #B8D4F7", label: "Meta" },
    none: { bg: "transparent", color: "rgba(30,77,140,.25)", border: "1px dashed #B8D4F7", label: "—" },
  };

  return (
    <DiagramCard>
      <DiagramHead icon={<KeyRound size={13} />} title="Access Matrix · Role × Matter" status="Audited" />

      <div className="grid gap-1" style={{ gridTemplateColumns: "110px repeat(4, 1fr)" }}>
        <div />
        {cols.map((c) => (
          <div key={c.label} className="flex flex-col items-center justify-center gap-[3px] min-h-[40px]">
            <span className="font-outfit text-[12px] font-extrabold text-text-heading">{c.label}</span>
            <span className="font-mono text-[8.5px] font-bold tracking-[0.12em] uppercase text-text-muted">{c.sub}</span>
          </div>
        ))}
        {rows.map((row) => (
          <>
            <div key={row.role} className="flex items-center pl-1 min-h-[40px]">
              <span className="font-outfit text-[12px] font-extrabold text-text-heading">{row.role}</span>
            </div>
            {row.perms.map((p, ci) => {
              const s = permStyle[p];
              return (
                <div
                  key={ci}
                  className="flex items-center justify-center gap-1.5 rounded-[8px] min-h-[40px] font-mono text-[10px] font-bold tracking-[0.04em] uppercase"
                  style={{ background: s.bg, color: s.color, border: s.border }}
                >
                  {p !== "none" && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "currentColor" }} />}
                  {s.label}
                </div>
              );
            })}
          </>
        ))}
      </div>

      {/* Conflict bar */}
      <DarkAccent className="mt-[18px]">
        <div className="flex items-center gap-3.5 px-5 py-4 relative z-10">
          <div className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(36,114,200,.20)", border: "1px solid rgba(36,114,200,.40)" }}>
            <ShieldAlert size={14} style={{ color: "#3D8FE0" }} />
          </div>
          <p className="text-[13px] font-medium leading-[1.4]" style={{ color: "#7AB4EE" }}>
            <strong style={{ color: "#EAF2FC", fontWeight: 700 }}>Ethical walls enforced.</strong>{" "}
            Conflicting matters automatically separated by configuration — no shared access paths, no manual oversight required.
          </p>
        </div>
      </DarkAccent>

      <DiagramFoot
        left={<>Last access · <strong className="text-accent">logged 2 min ago</strong></>}
        right="All folders · encrypted"
      />
    </DiagramCard>
  );
}

function SmbDiagram() {
  const scaleRows = [
    { year: "Year 0", size: "20", unit: "ppl", active: 4, capacity: 2, tag: "Founded" },
    { year: "Year 1", size: "50", unit: "ppl", active: 10, capacity: 4, tag: "Growing" },
    { year: "Year 2", size: "150+", unit: "ppl", active: 20, capacity: 8, tag: "Scale" },
  ];

  return (
    <DiagramCard>
      <DiagramHead icon={<GitBranch size={13} />} title="Architecture · Same Pattern" status="Stable" />

      {/* Legend */}
      <div className="flex items-center gap-3.5 pb-3.5 mb-2 border-b border-border-light flex-wrap">
        <span className="font-mono text-[9.5px] font-bold tracking-[0.14em] uppercase text-text-muted">Nodes</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.04em] text-text-heading">
          <span className="w-2.5 h-2.5 rounded-[2px] flex-shrink-0" style={{ background: "#2472C8" }} />Active
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.04em] text-text-heading">
          <span className="w-2.5 h-2.5 rounded-[2px] border flex-shrink-0" style={{ background: "rgba(36,114,200,.18)", borderColor: "rgba(36,114,200,.30)" }} />Capacity
        </span>
      </div>

      {scaleRows.map((row, ri) => (
        <div
          key={row.year}
          className={`grid items-center gap-4 py-[14px] ${ri > 0 ? "border-t border-dashed border-border-light" : ""}`}
          style={{ gridTemplateColumns: "110px 1fr 70px" }}
        >
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-text-muted">{row.year}</span>
            <span className="font-outfit text-[22px] font-extrabold text-text-heading leading-none" style={{ letterSpacing: "-0.02em" }}>
              {row.size}<span className="font-sans text-[11.5px] font-medium text-text-muted ml-1">{row.unit}</span>
            </span>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {Array.from({ length: row.active }).map((_, i) => (
              <span
                key={`a-${i}`}
                className="w-3 h-3 rounded-[3px] ind-node-pop"
                style={{ background: "#2472C8", animationDelay: `${ri * 0.15 + i * 0.04}s` }}
              />
            ))}
            {Array.from({ length: row.capacity }).map((_, i) => (
              <span
                key={`c-${i}`}
                className="w-3 h-3 rounded-[3px] ind-node-pop"
                style={{ background: "rgba(36,114,200,.18)", border: "1px solid rgba(36,114,200,.30)", animationDelay: `${ri * 0.15 + (row.active + i) * 0.04}s` }}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase text-accent text-right">{row.tag}</span>
        </div>
      ))}

      <div className="mt-[22px] px-4 py-4 bg-scale-50 border border-border-light rounded-xl flex items-center justify-between gap-3 flex-wrap">
        <p className="font-outfit text-[14.5px] font-extrabold text-text-heading" style={{ letterSpacing: "-0.005em" }}>
          Same architecture. <em className="not-italic text-accent">No rebuilds.</em>
        </p>
        <span className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase text-text-muted">One fixed monthly cost</span>
      </div>
    </DiagramCard>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════ */

export default function Industries() {
  const collageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = collageRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".collage-card"));
    let raf = 0;
    let tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        cards.forEach((card, i) => {
          const depth = [0.6, 0.3, 0.9, 0.45][i] ?? 0.5;
          card.style.translate = `${tx * depth}px ${ty * depth}px`;
        });
      });
    };
    container.addEventListener("mousemove", onMove);
    return () => { container.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <main className="pt-[68px] bg-bg-page">

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-bg-page">

        {/* Corner registration marks */}
        <div className="absolute top-6 left-6 w-5 h-5 pointer-events-none z-20" style={{ borderTop: "1.5px solid rgba(36,114,200,.35)", borderLeft: "1.5px solid rgba(36,114,200,.35)" }} />
        <div className="absolute top-6 right-6 w-5 h-5 pointer-events-none z-20" style={{ borderTop: "1.5px solid rgba(36,114,200,.35)", borderRight: "1.5px solid rgba(36,114,200,.35)" }} />
        <div className="absolute bottom-6 left-6 w-5 h-5 pointer-events-none z-20" style={{ borderBottom: "1.5px solid rgba(36,114,200,.35)", borderLeft: "1.5px solid rgba(36,114,200,.35)" }} />
        <div className="absolute bottom-6 right-6 w-5 h-5 pointer-events-none z-20" style={{ borderBottom: "1.5px solid rgba(36,114,200,.35)", borderRight: "1.5px solid rgba(36,114,200,.35)" }} />

        {/* Masthead bar */}
        <div className="border-b border-border-light px-8 lg:px-[60px] py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[10.5px] font-bold tracking-[0.17em] uppercase text-text-muted">Industries We Serve</span>
          </div>
          <span className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-text-muted">04 verticals</span>
        </div>

        {/* Main grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">

          {/* Left — text */}
          <div className="flex flex-col justify-center px-8 lg:px-[60px] py-16 lg:py-24 lg:border-r border-border-light">
            <Eyebrow>Our Focus</Eyebrow>
            <h1
              className="font-outfit font-black text-text-heading mb-7"
              style={{ fontSize: "clamp(44px, 6vw, 84px)", letterSpacing: "-0.045em", lineHeight: 0.96 }}
            >
              Built for your<br />industry.
              <em className="not-italic text-accent block">— Not adapted<br />for it.</em>
            </h1>
            <p className="text-text-body leading-[1.7] mb-10 max-w-[46ch]" style={{ fontSize: "clamp(15px, 1.4vw, 17px)" }}>
              Manufacturing, healthcare, professional services, and growing businesses each operate under different conditions. We adjust how we work to fit those conditions.
            </p>
            <div className="flex flex-wrap gap-3 mb-14">
              <Link href="/contact" className="btn btn-primary">
                Talk to us <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
              <Link href="/services" className="btn btn-outline">
                View services <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
            <div className="border-t border-border-light pt-6 flex flex-wrap gap-x-6 gap-y-2">
              {["OT / IT Segmentation", "HIPAA Controls", "Matter-based Access", "Scaling Architecture"].map((p) => (
                <span key={p} className="flex items-center gap-2 font-mono text-[10.5px] font-bold tracking-[0.14em] uppercase text-text-muted">
                  <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Right — photo collage */}
          <div
            ref={collageRef}
            className="relative hidden lg:block overflow-hidden"
            style={{ minHeight: "560px" }}
          >
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                backgroundImage: "linear-gradient(rgba(36,114,200,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(36,114,200,.04) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />

            {/* Card 1 — Manufacturing */}
            <div className="collage-card collage-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=900&h=700&fit=crop&q=85" alt="Manufacturing" />
              <div className="absolute top-3 left-3 z-10">
                <span className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-1 rounded-[5px]"
                  style={{ color: "#EAF2FC", background: "rgba(16,35,71,.6)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.12)" }}>
                  /01 Manufacturing
                </span>
              </div>
              <div className="absolute bottom-3 left-3 z-10">
                <p className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase" style={{ color: "rgba(234,242,252,.65)" }}>OT/IT Segmentation</p>
              </div>
            </div>

            {/* Card 2 — Healthcare */}
            <div className="collage-card collage-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=500&fit=crop&q=85" alt="Healthcare" />
              <div className="absolute top-3 left-3 z-10">
                <span className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-1 rounded-[5px]"
                  style={{ color: "#EAF2FC", background: "rgba(16,35,71,.6)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.12)" }}>
                  /02 Healthcare
                </span>
              </div>
              <div className="absolute bottom-3 left-3 z-10">
                <p className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase" style={{ color: "rgba(234,242,252,.65)" }}>HIPAA Controls</p>
              </div>
            </div>

            {/* Card 3 — Professional Services */}
            <div className="collage-card collage-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&h=600&fit=crop&q=85" alt="Professional Services" />
              <div className="absolute top-3 left-3 z-10">
                <span className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-1 rounded-[5px]"
                  style={{ color: "#EAF2FC", background: "rgba(16,35,71,.6)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.12)" }}>
                  /03 Professional
                </span>
              </div>
              <div className="absolute bottom-3 left-3 z-10">
                <p className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase" style={{ color: "rgba(234,242,252,.65)" }}>Matter-based Access</p>
              </div>
            </div>

            {/* Card 4 — Growing Business */}
            <div className="collage-card collage-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=700&h=900&fit=crop&q=85" alt="Growing Business" />
              <div className="absolute top-3 left-3 z-10">
                <span className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-1 rounded-[5px]"
                  style={{ color: "#EAF2FC", background: "rgba(16,35,71,.6)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.12)" }}>
                  /04 Growing Business
                </span>
              </div>
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                <p className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase" style={{ color: "rgba(234,242,252,.65)" }}>Scaling Architecture</p>
                <span className="font-mono text-[8px] font-bold tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-[4px]"
                  style={{ color: "#EAF2FC", background: "rgba(36,114,200,.5)", border: "1px solid rgba(36,114,200,.4)" }}>
                  +more
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-10">
          <span className="font-mono text-[9.5px] font-bold tracking-[0.17em] uppercase text-text-muted opacity-50">Scroll</span>
          <svg viewBox="0 0 12 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-[18px] text-text-muted"
            style={{ animation: "scrollHintAnim 1.8s ease-out infinite" }}>
            <line x1="6" y1="2" x2="6" y2="10" strokeLinecap="round" />
            <polyline points="3,7 6,11 9,7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

      </section>

      {/* ══ 01 — MANUFACTURING ══ */}
      <IndustrySection
        id="manufacturing"
        eyebrow="01 · Manufacturing"
        heading="Production environments require IT that"
        accentPhrase="does not fail."
        body="Manufacturing IT operates under different constraints than office IT. A network outage hits the line. A vulnerability on the OT side carries direct operational consequences. The corporate side and the production side need different rules — and a real boundary between them."
        coverage={[
          "Plant network design with redundancy and uptime targets",
          "Segmentation between operational technology and corporate IT",
          "Compliance support — CMMC, NIST, customer-driven requirements",
        ]}
        diagram={<MfgDiagram />}
      />

      {/* ══ 02 — HEALTHCARE ══ */}
      <IndustrySection
        id="healthcare"
        eyebrow="02 · Healthcare"
        heading="You handle the patients."
        accentPhrase="We handle the technology."
        body="Healthcare environments operate under HIPAA's technical safeguards — specific controls around access, encryption, audit logging, and incident response. We implement and maintain those controls as layered defenses around PHI, so clinical operations don't have to manage them."
        coverage={[
          "HIPAA-aligned access controls, encryption, and audit logging",
          "Endpoint and identity hardening for clinical and administrative users",
          "Tested backup and recovery procedures for clinical continuity",
        ]}
        diagram={<HcDiagram />}
        reverse
      />

      {/* ══ 03 — PROFESSIONAL SERVICES ══ */}
      <IndustrySection
        id="professional"
        eyebrow="03 · Professional Services"
        heading="Client confidentiality is the work —"
        accentPhrase="not a side concern."
        body="For law firms, accounting practices, and consultancies, the systems holding client data are the same systems used every day. We structure access by role and by matter so confidentiality is enforced by configuration — not by trust alone — and conflicts of interest are walled off automatically."
        coverage={[
          "Microsoft 365 governance — SharePoint, Teams, OneDrive structured for access",
          "Email security and identity protection against targeted attacks",
          "Endpoint encryption and mobile device management for hybrid work",
        ]}
        diagram={<PsDiagram />}
      />

      {/* ══ 04 — GROWING BUSINESS ══ */}
      <IndustrySection
        id="smb"
        eyebrow="04 · Growing Business"
        heading="IT that scales with the business —"
        accentPhrase="without rebuilding."
        body="Most SMB IT environments are built to fit current needs and start showing strain as the business grows. We design environments where the architecture stays the same from 20 employees to 200 — more nodes, same patterns, same operational standards."
        coverage={[
          "Architecture designed to scale without redesign",
          "Predictable monthly cost as the business grows",
          "Direct access to senior engineers — no escalation tiers",
        ]}
        diagram={<SmbDiagram />}
        reverse
      />

      {/* ══ CTA ══ */}
      <section className="relative px-5 lg:px-[60px] py-[120px]">
        <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
        <div className="max-w-[1280px] mx-auto">
          <DarkAccent className="!rounded-[22px]">
            {/* Extra top-right glow */}
            <div
              className="absolute -top-[100px] -right-[100px] w-[360px] h-[360px] rounded-full pointer-events-none ind-glow-blob"
              style={{ background: "radial-gradient(circle, rgba(36,114,200,.40) 0%, transparent 60%)" }}
            />
            {/* Grid */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[22px] overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(rgba(122,180,238,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(122,180,238,.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 100%)",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 items-end px-[72px] py-[80px]">

              {/* Left */}
              <div>
                <Eyebrow dark>What Comes Next</Eyebrow>
                <h2
                  className="font-outfit font-black"
                  style={{ fontSize: "clamp(34px, 4.4vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.04, color: "#EAF2FC" }}
                >
                  Tell us your industry.
                  <em className="not-italic block" style={{ color: "#3D8FE0" }}>We&apos;ll map the right controls.</em>
                </h2>
              </div>

              {/* Right */}
              <div className="flex flex-col gap-6 pb-1.5">
                <p className="leading-[1.65]" style={{ fontSize: "15.5px", color: "#7AB4EE" }}>
                  A short call is enough to understand your environment. We&apos;ll tell you where your gaps are and what we&apos;d change first.
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {["No pitch deck", "No obligation", "Senior engineer"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase px-[11px] py-[5px] rounded-full"
                      style={{ color: "#7AB4EE", background: "rgba(122,180,238,.08)", border: "1px solid rgba(122,180,238,.20)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Link href="/contact" className="btn btn-white">
                    Talk to an engineer <ArrowRight size={14} strokeWidth={2.5} />
                  </Link>
                  <Link href="/services" className="btn btn-outline-white">
                    View services <ArrowRight size={14} strokeWidth={2.5} />
                  </Link>
                </div>
              </div>

            </div>
          </DarkAccent>
        </div>
      </section>

    </main>
  );
}
