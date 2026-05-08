"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Network, Building2, ArrowRight } from "lucide-react";

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
            <em className="not-italic">{accentPhrase}</em>
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


function ConstructionDiagram() {
  const sites = [
    { name: "Job Site A", detail: "Cellular + wired failover" },
    { name: "Job Site B", detail: "SD-WAN · LTE backup" },
    { name: "Field Trailer", detail: "Portable AP · VPN tunnel" },
  ];

  return (
    <DiagramCard>
      <DiagramHead icon={<Network size={13} />} title="Site Connectivity · Field to Office" status="Active" />

      {/* HQ */}
      <DarkAccent className="mb-3.5">
        <div className="flex items-center gap-3.5 px-[18px] py-[14px] relative z-10">
          <div className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(36,114,200,.20)", border: "1px solid rgba(36,114,200,.40)" }}>
            <Building2 size={14} style={{ color: "#3D8FE0" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-outfit text-[13.5px] font-extrabold leading-[1.2]" style={{ color: "#EAF2FC" }}>HQ / Back Office</p>
            <p className="font-mono text-[10px] font-bold tracking-[0.04em] uppercase mt-[3px]" style={{ color: "#7AB4EE" }}>
              Project files · Contracts · HR
            </p>
          </div>
          <span className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase px-[9px] py-1 rounded-full flex-shrink-0"
            style={{ color: "#7AB4EE", background: "rgba(122,180,238,.10)", border: "1px solid rgba(122,180,238,.20)" }}>
            Azure AD
          </span>
        </div>
      </DarkAccent>

      {/* Sites */}
      <div className="flex flex-col gap-1.5 mb-3.5">
        {sites.map((s) => (
          <div key={s.name} className="flex items-center justify-between gap-3 px-[14px] py-[11px] bg-white border border-border-light rounded-[10px] hover:-translate-y-px transition-transform">
            <div className="flex items-center gap-2.5">
              <span className="w-[5px] h-[5px] rounded-full flex-shrink-0 ind-status-blink" style={{ background: "#22A05A", boxShadow: "0 0 6px #22A05A" }} />
              <span className="font-outfit text-[13px] font-extrabold text-text-heading">{s.name}</span>
            </div>
            <span className="font-mono text-[9.5px] font-bold tracking-[0.04em] uppercase text-text-muted">{s.detail}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="px-4 py-3 bg-scale-50 border border-border-light rounded-xl flex items-center gap-2 flex-wrap">
        {["Cellular Failover", "VPN Tunnel", "Cloud Sync", "Encrypted"].map((tag) => (
          <span key={tag} className="font-mono text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-[3px] bg-white border border-border-light rounded-full text-text-muted">
            {tag}
          </span>
        ))}
      </div>

      <DiagramFoot
        left={<>Field access · <strong className="text-accent">encrypted end-to-end</strong></>}
        right="3 active sites"
      />
    </DiagramCard>
  );
}

/* ═══════════════════════════════════════════════
   SECTION HELPERS
═══════════════════════════════════════════════ */

function TransitionMark({ to }: { to: string }) {
  return (
    <div className="relative h-0 z-10 pointer-events-none">
      <div className="absolute left-1/2 -translate-x-1/2 -top-[7px] inline-flex items-center gap-2 px-3 py-[3px] bg-bg-page whitespace-nowrap"
        style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1E4D8C" }}>
        <span className="w-[5px] h-[5px] rounded-full bg-accent flex-shrink-0" />
        Next <strong className="text-text-heading font-bold ml-1">· {to}</strong>
      </div>
    </div>
  );
}

/* ── /01 Manufacturing ── */
function MfgSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="manufacturing" ref={ref} className="relative py-[120px] px-5 lg:px-[60px]">
      <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">

        <motion.div className="flex flex-col justify-center max-w-[540px]"
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
          <Eyebrow>01 · Manufacturing — Plant-floor reality</Eyebrow>
          <h2 className="font-outfit font-black text-text-heading mb-[22px]"
            style={{ fontSize: "clamp(34px, 4.4vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.04 }}>
            Your line is the business. <em className="not-italic">We keep it running.</em>
          </h2>
          <p className="text-text-body leading-[1.7]" style={{ fontSize: "clamp(15px, 1.5vw, 17px)" }}>
            Manufacturing IT lives with realities you can&apos;t engineer away — the 1998 CNC controller, the line manager who&apos;s been burned by IT before, the insurance renewal demanding segmentation you don&apos;t have. We build around your systems instead of asking you to change them.
          </p>

          {/* Three anxiety signals */}
          <div className="mt-9 pt-7 border-t border-border-light grid grid-cols-3 gap-[18px]">
            {([
              {
                label: "Reality", name: "Legacy machines you can't replace",
                icon: <svg viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect x="5" y="7" width="28" height="20" rx="1.5"/><line x1="9" y1="12" x2="29" y2="12"/><line x1="9" y1="17" x2="22" y2="17"/><line x1="9" y1="22" x2="26" y2="22"/><line x1="14" y1="27" x2="14" y2="31"/><line x1="24" y1="27" x2="24" y2="31"/><line x1="11" y1="31" x2="27" y2="31"/></svg>,
              },
              {
                label: "Pressure", name: "Insurance demands you can't dodge",
                icon: <svg viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M10 5L25 5L30 10L30 33L10 33Z"/><polyline points="25,5 25,10 30,10"/><line x1="14" y1="16" x2="22" y2="16"/><line x1="14" y1="20" x2="26" y2="20"/><circle cx="23" cy="27" r="4"/><line x1="20" y1="29" x2="22" y2="31"/><line x1="22" y1="31" x2="26" y2="25"/></svg>,
              },
              {
                label: "Trust", name: "Rebuilt one shift at a time",
                icon: <svg viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M7 14 Q7 8 13 8 L25 8"/><polyline points="22,5 25,8 22,11"/><path d="M31 24 Q31 30 25 30 L13 30"/><polyline points="16,33 13,30 16,27"/><circle cx="19" cy="19" r="1.5" fill="currentColor"/></svg>,
              },
            ] as { label: string; name: string; icon: React.ReactNode }[]).map((s) => (
              <div key={s.label} className="flex flex-col gap-[10px]">
                <div className="w-[38px] h-[38px] text-accent">{s.icon}</div>
                <span className="font-mono text-[9.5px] font-bold tracking-[0.18em] uppercase text-text-muted">{s.label}</span>
                <span className="font-outfit text-[14px] font-extrabold text-text-heading leading-[1.2]" style={{ letterSpacing: "-0.015em" }}>{s.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="rounded-[20px] overflow-hidden border border-border-light flex flex-col"
          style={{ boxShadow: "0 16px 40px rgba(16,35,71,.08)", minHeight: "540px" }}
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}>

          {/* Corporate IT pane */}
          <div className="mfg-pane relative overflow-hidden" style={{ flex: 1, minHeight: "200px" }}>
            <Image fill src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=500&fit=crop&q=85" alt="Corporate IT" className="mfg-pane-img" sizes="(max-width:1024px) 100vw, 50vw" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg,rgba(16,35,71,.40) 0%,rgba(16,35,71,.10) 45%,rgba(16,35,71,.55) 100%)" }} />
            <span className="absolute top-[18px] left-[18px] z-10 inline-flex items-center gap-[6px] px-[11px] py-[5px] rounded-full font-mono text-[9.5px] font-bold tracking-[0.14em] uppercase text-text-heading" style={{ background: "rgba(255,255,255,.94)", backdropFilter: "blur(8px)" }}>
              <span className="w-[5px] h-[5px] rounded-full bg-accent flex-shrink-0" />Corporate IT
            </span>
            <span className="absolute top-[18px] right-[18px] z-10 inline-flex items-center px-[11px] py-[5px] rounded-full font-mono text-[9px] font-bold tracking-[0.14em] uppercase" style={{ background: "rgba(36,114,200,.15)", border: "1px solid rgba(36,114,200,.35)", color: "#3D8FE0", backdropFilter: "blur(8px)" }}>Modern</span>
            <span className="absolute bottom-[18px] left-[18px] z-10 font-mono text-[9px] font-bold tracking-[0.16em] uppercase" style={{ color: "rgba(234,242,252,.85)", textShadow: "0 1px 4px rgba(0,0,0,.5)" }}>M365 · Azure · Patched · Audited</span>
          </div>

          {/* Firewall divider */}
          <div className="relative flex items-center justify-between gap-3 px-6 py-[18px] overflow-hidden flex-wrap"
            style={{ background: "linear-gradient(180deg,#102347 0%,#0A1628 100%)" }}>
            <div className="absolute -top-[30px] -right-[30px] w-[140px] h-[140px] rounded-full pointer-events-none ind-glow-blob"
              style={{ background: "radial-gradient(circle,rgba(36,114,200,.45) 0%,transparent 60%)" }} />
            <div className="flex items-center gap-3 relative z-10">
              <motion.div className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(36,114,200,.20)", border: "1px solid rgba(36,114,200,.40)" }}
                animate={{ boxShadow: ["0 0 0 0px rgba(36,114,200,0)", "0 0 0 7px rgba(36,114,200,.15)", "0 0 0 0px rgba(36,114,200,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                <svg viewBox="0 0 16 16" fill="none" stroke="#3D8FE0" strokeWidth="2.2" className="w-[15px] h-[15px]">
                  <path d="M8 1L2 4v4c0 3.5 2.5 6.5 6 7 3.5-.5 6-3.5 6-7V4L8 1z"/>
                </svg>
              </motion.div>
              <div className="flex flex-col gap-[2px]">
                <span className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: "#EAF2FC" }}>Segmentation · Enforced</span>
                <span className="font-mono text-[9.5px] font-bold tracking-[0.12em] uppercase opacity-70" style={{ color: "#7AB4EE" }}>Default deny outbound · No internet</span>
              </div>
            </div>
            <div className="flex gap-[6px] relative z-10">
              {["Jump box only", "Logged"].map((r) => (
                <span key={r} className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-[4px] rounded-full"
                  style={{ color: "#7AB4EE", background: "rgba(122,180,238,.10)", border: "1px solid rgba(122,180,238,.20)" }}>{r}</span>
              ))}
            </div>
          </div>

          {/* OT pane */}
          <div className="mfg-pane relative overflow-hidden" style={{ flex: 1, minHeight: "200px" }}>
            <Image fill src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=900&h=500&fit=crop&q=85" alt="Production floor" className="mfg-pane-img" sizes="(max-width:1024px) 100vw, 50vw" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg,rgba(16,35,71,.40) 0%,rgba(16,35,71,.10) 45%,rgba(16,35,71,.55) 100%)" }} />
            <span className="absolute top-[18px] left-[18px] z-10 inline-flex items-center gap-[6px] px-[11px] py-[5px] rounded-full font-mono text-[9.5px] font-bold tracking-[0.14em] uppercase text-text-heading" style={{ background: "rgba(255,255,255,.94)", backdropFilter: "blur(8px)" }}>
              <span className="w-[5px] h-[5px] rounded-full bg-accent flex-shrink-0" />OT / Production
            </span>
            <span className="absolute top-[18px] right-[18px] z-10 inline-flex items-center px-[11px] py-[5px] rounded-full font-mono text-[9px] font-bold tracking-[0.14em] uppercase" style={{ background: "rgba(232,156,31,.18)", border: "1px solid rgba(232,156,31,.40)", color: "#FFBE6B", backdropFilter: "blur(8px)" }}>Legacy</span>
            <span className="absolute bottom-[18px] left-[18px] z-10 font-mono text-[9px] font-bold tracking-[0.16em] uppercase" style={{ color: "rgba(234,242,252,.85)", textShadow: "0 1px 4px rgba(0,0,0,.5)" }}>Win NT · AS/400 · PLC · Still running</span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

/* ── /02 Healthcare ── */
function HcSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const annos = [
    { dotTop: "22%", dotLeft: "32%", lineLeft: "calc(32% + 14px)", lineW: "28%", tagTop: "calc(22% - 16px)", tagSide: { right: "18px" }, ref: "MFA · 0.4s", name: "Sign-in verified", ring: "hc-ring" },
    { dotTop: "46%", dotLeft: "22%", lineLeft: "18px", lineW: "calc(22% - 18px)", tagTop: "calc(46% - 16px)", tagSide: { left: "18px" }, ref: "Backup · 4h RTO", name: "Last verified 04:12", ring: "hc-ring hc-ring-2" },
    { dotTop: "38%", dotLeft: "64%", lineLeft: "calc(64% + 14px)", lineW: "calc(36% - 32px)", tagTop: "calc(38% - 16px)", tagSide: { right: "18px" }, ref: "Audit · 6 yrs", name: "OCR-ready format", ring: "hc-ring hc-ring-3" },
    { dotTop: "62%", dotLeft: "28%", lineLeft: "18px", lineW: "calc(28% - 18px)", tagTop: "calc(62% - 16px)", tagSide: { left: "18px" }, ref: "Encryption · AES-256", name: "At rest · in transit", ring: "hc-ring hc-ring-4" },
  ];

  return (
    <section id="healthcare" ref={ref} className="relative py-[120px] px-5 lg:px-[60px]">
      <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">

        {/* Photo — left */}
        <motion.div className="relative rounded-[20px] overflow-hidden order-2 lg:order-1"
          style={{ minHeight: "540px", boxShadow: "0 16px 40px rgba(16,35,71,.10)", border: "1px solid #B8D4F7" }}
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
          <Image fill src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1100&h=900&fit=crop&q=85" alt="Clinical environment" className="hc-photo-img" sizes="(max-width:1024px) 100vw, 50vw" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg,rgba(16,35,71,.40) 0%,rgba(16,35,71,.20) 35%,rgba(16,35,71,.55) 100%)" }} />

          {/* All-clear badge */}
          <div className="absolute top-[18px] left-[18px] z-10 inline-flex items-center gap-[7px] px-3 py-[6px] rounded-full font-mono text-[9.5px] font-bold tracking-[0.14em] uppercase text-text-heading"
            style={{ background: "rgba(255,255,255,.94)", backdropFilter: "blur(8px)" }}>
            <span className="w-[5px] h-[5px] rounded-full flex-shrink-0 ind-status-blink" style={{ background: "#22A05A", boxShadow: "0 0 5px #22A05A" }} />
            All Clear · Monitored
          </div>

          {/* Annotation dots + lines + tags */}
          {annos.map((a, i) => (
            <React.Fragment key={i}>
              {/* Dot */}
              <motion.div className="absolute z-10 pointer-events-none" style={{ top: a.dotTop, left: a.dotLeft }}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.5 + i * 0.18, ease: EASE }}>
                <div className="relative w-[14px] h-[14px] rounded-full bg-accent" style={{ border: "2px solid #F4F7FB", boxShadow: "0 0 0 3px rgba(36,114,200,.25)" }}>
                  <div className={a.ring} />
                </div>
              </motion.div>
              {/* Line */}
              <motion.div className="absolute z-10 pointer-events-none"
                style={{ top: `calc(${a.dotTop} + 7px)`, left: a.lineLeft, width: a.lineW, height: "1px", background: "#2472C8", transformOrigin: "left center" }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={inView ? { scaleX: 1, opacity: 0.7 } : {}}
                transition={{ duration: 0.38, delay: 0.6 + i * 0.18, ease: EASE }} />
              {/* Tag */}
              <motion.div className="absolute z-10 pointer-events-none" style={{ top: a.tagTop, ...a.tagSide }}
                initial={{ opacity: 0, x: "left" in a.tagSide ? -10 : 10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.38, delay: 0.7 + i * 0.18, ease: EASE }}>
                <div className="inline-flex flex-col gap-[2px] px-3 py-2 rounded-[10px] bg-white border border-border-light" style={{ backdropFilter: "blur(8px)", boxShadow: "0 4px 14px rgba(16,35,71,.10)" }}>
                  <span className="font-mono text-[9px] font-bold tracking-[0.16em] uppercase text-accent">{a.ref}</span>
                  <span className="font-outfit text-[12.5px] font-extrabold text-text-heading" style={{ letterSpacing: "-0.005em", lineHeight: 1.15 }}>{a.name}</span>
                </div>
              </motion.div>
            </React.Fragment>
          ))}

          {/* Footer quote */}
          <div className="absolute bottom-[18px] left-[18px] right-[18px] z-10 flex items-end justify-between gap-4">
            <p className="font-outfit font-extrabold leading-[1.15] max-w-[22ch]"
              style={{ fontSize: "clamp(17px, 1.8vw, 21px)", letterSpacing: "-0.022em", color: "#EAF2FC", textShadow: "0 2px 10px rgba(0,0,0,.45)" }}>
              Compliance is what we leave behind. <em className="not-italic">Patient care is what we protect.</em>
            </p>
            <p className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-right flex-shrink-0"
              style={{ color: "#7AB4EE", opacity: 0.85, textShadow: "0 1px 4px rgba(0,0,0,.5)" }}>§164.312<br />(a) (b) (c) (e)</p>
          </div>
        </motion.div>

        {/* Text — right */}
        <motion.div className="flex flex-col justify-center max-w-[540px] order-1 lg:order-2"
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}>
          <Eyebrow>02 · Healthcare — Subject to §164.312</Eyebrow>
          <h2 className="font-outfit font-black text-text-heading mb-[22px]"
            style={{ fontSize: "clamp(34px, 4.4vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.04 }}>
            The fine isn&apos;t the cost. <em className="not-italic">The investigation is.</em>
          </h2>
          <p className="text-text-body leading-[1.7]" style={{ fontSize: "clamp(15px, 1.5vw, 17px)" }}>
            A HIPAA breach isn&apos;t a single fine — it&apos;s six years of records subpoenaed, depositions taken, and a reputation that recovers slower than the lawsuit settles. We keep the practice operating so the audit never has to.
          </p>

          {/* Consequences timeline */}
          <div className="mt-9 pt-7 border-t border-border-light">
            <p className="font-mono text-[10.5px] font-bold tracking-[0.14em] uppercase text-text-muted mb-[18px]">After a breach</p>
            <div className="relative flex flex-col gap-4 pl-[22px]">
              <div className="absolute top-[6px] bottom-[6px] left-[5px] w-px bg-border-light" />
              {([
                { when: "Day 0",    event: "OCR investigation opens",       now: true },
                { when: "Day +30",  event: "Breach notification window",    now: false },
                { when: "90 days",  event: "Public disclosure required",    now: false },
                { when: "6 years",  event: "Records remain subpoenaed",     now: false },
              ] as { when: string; event: string; now: boolean }[]).map((row) => (
                <div key={row.when} className="relative grid gap-[18px] items-baseline" style={{ gridTemplateColumns: "110px 1fr" }}>
                  <div className={`absolute -left-[22px] top-[5px] w-[11px] h-[11px] rounded-full border-[1.5px] border-accent ${row.now ? "bg-accent" : "bg-white"}`}
                    style={{ boxShadow: row.now ? "0 0 0 3px rgba(36,114,200,.20)" : "none" }} />
                  <span className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase text-accent">{row.when}</span>
                  <span className="text-[14px] font-semibold text-text-heading leading-[1.4]">{row.event}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* ── /03 Professional Services ── */
function PsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const OUTCOME = "inline-flex items-center gap-[10px] px-6 py-[14px] border-t border-border-light bg-scale-50";
  const CHECK = (
    <span className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-accent flex items-center justify-center">
      <svg viewBox="0 0 14 14" fill="none" stroke="#EAF2FC" strokeWidth="3" className="w-3 h-3"><polyline points="3,7 6,10 11,4"/></svg>
    </span>
  );

  return (
    <section id="professional" ref={ref} className="relative py-[120px] px-5 lg:px-[60px]">
      <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 mb-14 items-start"
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
          <div className="hidden lg:flex flex-col gap-[14px] pt-2 pr-6 border-r border-border-light">
            {[["Section", "No. 03", false], ["Subject", "Privileged matter", false], ["Filed", "3 risk moments", false]].map(([label, val]) => (
              <div key={String(label)} className="flex flex-col gap-[3px]">
                <span className="font-mono text-[9.5px] font-bold tracking-[0.18em] uppercase text-text-muted">{label}</span>
                <span className="font-mono text-[11px] font-bold tracking-[0.04em] text-text-heading">{val}</span>
              </div>
            ))}
          </div>
          <div className="max-w-[60ch]">
            <Eyebrow>03 · Professional Services — Privileged matter</Eyebrow>
            <h2 className="font-outfit font-black text-text-heading mb-[22px]"
              style={{ fontSize: "clamp(34px, 4.4vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.04 }}>
              One misdirected email can end a career. <em className="not-italic">We make sure it doesn&apos;t.</em>
            </h2>
            <p className="text-text-body leading-[1.7]" style={{ fontSize: "clamp(15px, 1.5vw, 17px)" }}>
              Law firms and accounting practices rarely get destroyed by breaches. They get destroyed by small moments. We build the controls that catch them.
            </p>
          </div>
        </motion.div>

        {/* Three moment cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="bg-white border border-border-light rounded-[16px] overflow-hidden flex flex-col"
              style={{ boxShadow: "0 4px 16px rgba(16,35,71,.04)" }}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.25 + i * 0.1, ease: EASE }}
              whileHover={{ y: -3, borderColor: "#2472C8", boxShadow: "0 16px 36px rgba(36,114,200,.14)", transition: { duration: 0.2 } }}>

              {/* Card head */}
              <div className="px-6 pt-[22px] pb-4 border-b border-dashed border-border-light">
                <span className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-accent mb-2 block">/ Moment 0{i + 1}</span>
                <p className="font-outfit text-[19px] font-extrabold text-text-heading leading-[1.2] mb-[6px]" style={{ letterSpacing: "-0.018em" }}>
                  {["The wrong recipient", "The lost laptop", "The lateral move"][i]}
                </p>
                <p className="text-[12.5px] font-medium text-text-muted leading-[1.5]">
                  {[
                    "An associate hits send. The address autocompletes to opposing counsel.",
                    "Reported missing from JFK at 19:42. Privileged files on disk.",
                    "A partner gives notice. The clock on data exfiltration starts immediately.",
                  ][i]}
                </p>
              </div>

              {/* Card body — visual */}
              <div className="flex-1 px-6 py-[22px]">
                {i === 0 && (
                  <div className="bg-scale-50 border border-border-light rounded-[10px] p-[14px] font-mono text-[10.5px] leading-[1.7]">
                    {[["To", "j.opposing@othersidefirm.com", true, false], ["Cc", "m.partner@ourfirm.com", false, true], ["Subj", "Re: Henderson — settlement strategy", false, false], ["Att", "privileged-memo.pdf", false, false]].map(([k, v, flag, strike], ri) => (
                      <div key={String(k)} className={`grid gap-2 py-1 ${ri > 0 ? "border-t border-border-light" : ""}`} style={{ gridTemplateColumns: "50px 1fr" }}>
                        <span className="font-bold tracking-[0.08em] uppercase text-text-muted text-[9.5px]">{k}</span>
                        <span className={flag ? "text-[#c34e0c] bg-[rgba(232,156,31,.14)] px-[6px] py-[1px] rounded-[4px] inline-block" : strike ? "line-through text-text-muted" : "text-text-heading"}>{v}</span>
                      </div>
                    ))}
                  </div>
                )}
                {i === 1 && (
                  <div className="bg-scale-50 border border-border-light rounded-[10px] p-[14px]">
                    {[["Status", "Reported", true], ["Disk", "Encrypted · AES-256", true], ["Wipe", "Issued 19:51", true], ["Confirmed", "21:08 · device offline", true]].map(([k, v, ok], ri) => (
                      <div key={String(k)} className={`flex items-center justify-between py-[6px] font-mono text-[10.5px] tracking-[0.04em] ${ri > 0 ? "border-t border-border-light" : ""}`}>
                        <span className="font-bold tracking-[0.12em] uppercase text-text-muted text-[9.5px]">{k}</span>
                        <span className="font-bold flex items-center gap-[6px]" style={{ color: ok ? "#22A05A" : "#0A1628" }}>
                          {ok && <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: "#22A05A", boxShadow: "0 0 4px #22A05A" }} />}{v}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {i === 2 && (
                  <div className="bg-scale-50 border border-border-light rounded-[10px] p-[16px] pt-[14px]">
                    <div className="flex justify-between font-mono text-[9px] font-bold tracking-[0.14em] uppercase text-text-heading mb-1">
                      <span>Notice given</span><span>Day +30</span><span>Departure</span>
                    </div>
                    <div className="relative h-1 bg-border-light rounded-full mx-[6px] my-[18px]">
                      <motion.div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(90deg,#2472C8,#3D8FE0)", transformOrigin: "left" }}
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.1, delay: 0.55, ease: EASE }} />
                      {[0, 50, 100].map((pct, pi) => (
                        <span key={pi} className="absolute top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full"
                          style={{ left: `${pct}%`, transform: `translate(-50%,-50%)`, background: pi === 1 ? "#2472C8" : "#FFFFFF", border: "2px solid #2472C8", boxShadow: pi === 1 ? "0 0 0 4px rgba(36,114,200,.25)" : "none" }} />
                      ))}
                    </div>
                    <div className="flex justify-between font-mono text-[9px] font-bold tracking-[0.14em] uppercase text-text-muted">
                      <span>Audit on</span><span>Reviewing</span><span>Wipe + revoke</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Outcome */}
              <div className={OUTCOME}>
                {CHECK}
                <p className="text-[12.5px] font-semibold text-text-heading leading-[1.4]">
                  {[
                    <><strong className="text-accent font-bold">External recipient warning fires.</strong> Send delayed 5 min for review.</>,
                    <><strong className="text-accent font-bold">No exposure.</strong> Encryption holds whether the device is recovered or not.</>,
                    <><strong className="text-accent font-bold">Departure playbook.</strong> Email forwarding flagged, downloads logged, files inventoried.</>,
                  ][i]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Animated number counter ── */
function CountUp({ value, inView, delay = 0 }: { value: string; inView: boolean; delay?: number }) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const isPlus = value.endsWith("+");
    const num = parseInt(value);
    const duration = 900;
    const startAt = performance.now() + delay * 1000;
    let frame: number;
    const tick = (now: number) => {
      if (now < startAt) { frame = requestAnimationFrame(tick); return; }
      if (isNaN(num)) { setDisplay(value); return; }
      const elapsed = now - startAt;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(t < 1 ? String(Math.floor(eased * num)) + (isPlus ? "+" : "") : value);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, delay]);
  return <>{display}</>;
}

/* ── /04 Growing Business ── */
function SmbSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const points = [
    {
      count: "30", unit: "ppl", tag: "First break", event: "File-share chaos.",
      fix: "SharePoint set up by the nephew works for ten people. At thirty, nobody can find anything and everyone has full access to everything.",
      chartX: 20, chartY: 70,
      glyph: <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M4 10h20v12a2 2 0 01-2 2H6a2 2 0 01-2-2V10z"/><path d="M4 10l2-6h7l1 3h8l1 3"/><line x1="9" y1="16" x2="19" y2="16"/><line x1="9" y1="20" x2="14" y2="20"/></svg>,
    },
    {
      count: "75", unit: "ppl", tag: "Second break", event: "First IT questionnaire.",
      fix: "Cyber insurance renewal asks for evidence of controls you don't have: MFA, endpoint management, backup verification.",
      chartX: 40, chartY: 50,
      glyph: <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect x="7" y="3" width="14" height="22" rx="1.5"/><line x1="10" y1="9" x2="18" y2="9"/><line x1="10" y1="13" x2="18" y2="13"/><polyline points="10,19 12,21 18,15"/></svg>,
    },
    {
      count: "120", unit: "ppl", tag: "Third break", event: "Identity sprawl.",
      fix: "Shared logins. Admin access given to whoever asks. Nobody offboarded properly in two years.",
      chartX: 60, chartY: 33,
      glyph: <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><circle cx="10" cy="9" r="3"/><circle cx="18" cy="9" r="3"/><path d="M4 22c0-4 2.7-6 6-6h8c3.3 0 6 2 6 6"/><line x1="19" y1="4" x2="25" y2="4"/><line x1="22" y1="1" x2="22" y2="7"/></svg>,
    },
    {
      count: "200+", unit: "ppl", tag: "Fourth break", event: "Compliance pressure.",
      fix: "Customers start asking for SOC 2 reports. Contracts require it. We structure the evidence trail.",
      chartX: 80, chartY: 22,
      glyph: <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M14 3L5 7v7c0 5.5 3.9 10.3 9 11 5.1-.7 9-5.5 9-11V7L14 3z"/><polyline points="10,14 13,17 19,11"/></svg>,
    },
  ];

  const curvePath = "M 0,280 C 80,280 120,196 200,196 C 290,196 310,140 400,140 C 490,140 510,92 600,92 C 690,92 710,62 800,62 C 890,62 920,50 1000,50";
  const fillPath = curvePath + " L 1000,280 L 0,280 Z";

  return (
    <section id="smb" ref={ref} className="relative py-[120px] px-5 lg:px-[60px]">
      <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-0 items-end"
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
          <div>
            <Eyebrow>04 · Growing Business — In transition</Eyebrow>
            <h2 className="font-outfit font-black text-text-heading max-w-[22ch]"
              style={{ fontSize: "clamp(34px, 4.4vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.04 }}>
              You didn&apos;t fail because you grew. <em className="not-italic">You failed because nobody planned for it.</em>
            </h2>
          </div>
          <p className="text-text-body leading-[1.7] max-w-[44ch] pb-2" style={{ fontSize: "clamp(15px, 1.5vw, 17px)" }}>
            The same breakpoints arrive at the same headcounts, in the same order. We&apos;ve seen the trajectory before — and we run the transitions before they become emergencies.
          </p>
        </motion.div>

        {/* Chart — desktop */}
        <div className="hidden lg:block relative" style={{ paddingTop: "64px" }}>

          {/* Y-axis labels */}
          <div className="absolute top-4 left-0 font-mono text-[9.5px] font-bold tracking-[0.18em] uppercase text-text-muted">Complexity / Risk</div>
          <div className="absolute top-4 right-0 font-mono text-[9.5px] font-bold tracking-[0.18em] uppercase text-text-muted">Series B ready</div>

          {/* Chart canvas */}
          <div className="relative w-full" style={{ height: "280px" }}>

            {/* Faint horizontal grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "linear-gradient(rgba(36,114,200,.06) 1px, transparent 1px)",
              backgroundSize: "100% 70px",
            }} />

            {/* Growth curve */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 280" preserveAspectRatio="none">
              <defs>
                <linearGradient id="smbGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2472C8" stopOpacity="0.13" />
                  <stop offset="100%" stopColor="#2472C8" stopOpacity="0.01" />
                </linearGradient>
              </defs>
              <motion.path d={fillPath} fill="url(#smbGrad)"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.9 }} />
              <motion.path d={curvePath} fill="none" stroke="#2472C8" strokeWidth="2.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2.0, delay: 0.3, ease: EASE }} />
            </svg>

            {/* Baseline */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-border-light" />

            {/* Breakpoint markers */}
            {points.map((p, i) => (
              <div key={p.count} className="absolute group cursor-pointer"
                style={{ left: `${p.chartX}%`, top: `${p.chartY}%`, transform: "translate(-50%, -50%)", zIndex: 2 }}>

                {/* Card above */}
                <motion.div className="absolute bg-white border border-border-light rounded-[12px] group-hover:border-accent transition-colors"
                  style={{ bottom: "calc(100% + 20px)", left: "50%", transform: "translateX(-50%)",
                           minWidth: "185px", padding: "14px 16px",
                           boxShadow: "0 4px 14px rgba(16,35,71,.06)", whiteSpace: "nowrap" }}
                  initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.4, ease: EASE }}>
                  <p className="font-mono text-[9.5px] font-bold tracking-[0.18em] uppercase text-text-muted mb-[5px]">
                    {p.tag} · <strong className="text-accent">{p.count} {p.unit}</strong>
                  </p>
                  <p className="font-outfit text-[14px] font-extrabold text-text-heading leading-[1.2]"
                    style={{ letterSpacing: "-0.015em" }}>{p.event}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-px bg-border-light" style={{ height: "20px" }} />
                </motion.div>

                {/* Marker dot */}
                <motion.div className="w-[14px] h-[14px] rounded-full bg-white border-2 border-accent group-hover:bg-accent transition-colors"
                  initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.4, ease: EASE }} />

                {/* Glyph below */}
                <motion.div className="absolute text-accent"
                  style={{ top: "calc(100% + 16px)", left: "50%", transform: "translateX(-50%)", width: "26px", height: "26px" }}
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.4, ease: EASE }}>
                  {p.glyph}
                </motion.div>

                {/* Headcount number */}
                <motion.div className="absolute font-outfit font-black text-text-heading text-center whitespace-nowrap"
                  style={{ top: "calc(100% + 50px)", left: "50%", transform: "translateX(-50%)",
                           fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.03em", lineHeight: 1 }}
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.65 + i * 0.4, ease: EASE }}>
                  <CountUp value={p.count} inView={inView} delay={0.65 + i * 0.4} />
                  <span className="font-sans font-semibold text-text-muted ml-[3px]" style={{ fontSize: "11px" }}>{p.unit}</span>
                </motion.div>

              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between" style={{ paddingTop: "108px" }}>
            {["Early stage", "Growth", "Scale-up", "Enterprise"].map((label, i) => (
              <span key={label} className="font-mono text-[9.5px] font-bold tracking-[0.18em] uppercase text-text-muted"
                style={{ width: "25%", textAlign: (i === 0 ? "left" : i === 3 ? "right" : "center") as React.CSSProperties["textAlign"] }}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* List — mobile */}
        <div className="lg:hidden mt-12">
          {points.map((bp, i) => (
            <motion.div key={bp.count}
              className="grid items-start gap-5 py-6 border-t border-border-light last:border-b"
              style={{ gridTemplateColumns: "72px 1fr" }}
              initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.25 + i * 0.08, ease: EASE }}>
              <span className="font-outfit font-black text-text-heading leading-none"
                style={{ fontSize: "clamp(28px, 7vw, 38px)", letterSpacing: "-0.04em" }}>
                <CountUp value={bp.count} inView={inView} delay={0.25 + i * 0.08} />
                <span className="font-sans text-[11px] font-semibold text-text-muted ml-1">{bp.unit}</span>
              </span>
              <div>
                <span className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase text-accent block mb-1">{bp.tag}</span>
                <span className="font-outfit font-extrabold text-text-heading leading-[1.15] block mb-2"
                  style={{ fontSize: "17px", letterSpacing: "-0.02em" }}>{bp.event}</span>
                <p className="text-[13.5px] font-medium text-text-body leading-[1.6]">{bp.fix}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Close line */}
        <div className="mt-14 pt-7 border-t border-border-light flex items-center justify-between gap-6 flex-wrap">
          <p className="font-outfit font-extrabold text-text-heading leading-[1.2]"
            style={{ fontSize: "clamp(20px, 2vw, 26px)", letterSpacing: "-0.022em" }}>
            Same architecture. <em className="not-italic">No rebuilds.</em>
          </p>
          <span className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-text-muted">One fixed monthly cost</span>
        </div>
      </div>
    </section>
  );
}

/* ── Also Serving strip ── */
function AlsoSection() {
  return (
    <section className="relative px-5 lg:px-[60px] py-14">
      <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
      <div className="max-w-[1280px] mx-auto flex items-center gap-8 flex-wrap">
        <span className="font-mono text-[10.5px] font-bold tracking-[0.18em] uppercase flex-shrink-0 text-text-muted">
          Also serving · <strong className="text-accent">Other sectors</strong>
        </span>
        <div className="flex flex-wrap gap-2">
          {["Retail", "Finance", "Education", "Nonprofit", "Real Estate", "Insurance"].map((pill) => (
            <span key={pill} className="px-3 py-[6px] bg-white border border-border-light rounded-full text-[12.5px] font-semibold text-text-heading transition-colors hover:border-accent"
              style={{ letterSpacing: "-0.005em" }}>
              {pill}
            </span>
          ))}
        </div>
        <p className="font-sans text-[13px] font-medium text-text-muted ml-auto">
          Not seeing yours?{" "}
          <Link href="/contact" className="text-accent font-semibold no-underline hover:underline">
            Let&apos;s talk →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ─── Hero marquee card ─────────────────────────── */

function MarqueeCard({ num, name, tag, src }: { num: string; name: string; tag: string; src: string }) {
  return (
    <div className="flex-shrink-0 rounded-[16px] overflow-hidden border border-border-light bg-white"
      style={{ width: 240, boxShadow: "0 4px 20px rgba(16,35,71,.07), 0 1px 0 rgba(255,255,255,.9) inset" }}>
      <div className="relative" style={{ height: 210 }}>
        <Image fill src={src} alt={name} sizes="240px"
          style={{ objectFit: "cover", filter: "grayscale(20%) contrast(1.05) brightness(0.88)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(16,35,71,.08) 0%, rgba(16,35,71,.64) 100%)" }} />
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[8.5px] font-bold tracking-[0.14em] uppercase px-2 py-[3px] rounded-[5px]"
            style={{ color: "#EAF2FC", background: "rgba(10,22,40,.70)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.14)" }}>
            {num}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="font-outfit font-extrabold leading-[1.15] text-white"
            style={{ fontSize: 15.5, letterSpacing: "-0.018em" }}>
            {name}
          </p>
        </div>
      </div>
      <div className="px-4 pt-3 pb-4 flex flex-col gap-[9px]">
        <p className="font-mono text-[9px] font-bold tracking-[0.13em] uppercase text-accent">{tag}</p>
        <div className="flex items-center gap-[7px]">
          <span className="w-[5px] h-[5px] rounded-full flex-shrink-0"
            style={{ background: "#22A05A", boxShadow: "0 0 5px #22A05A" }} />
          <span className="font-mono text-[8.5px] font-bold tracking-[0.10em] uppercase text-text-muted">
            Active protection
          </span>
        </div>
      </div>
    </div>
  );
}

const MARQUEE_CARDS = [
  { num: "/01", name: "Manufacturing",     tag: "OT / IT Segmentation",  src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop&q=85" },
  { num: "/02", name: "Healthcare",        tag: "HIPAA Controls",         src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop&q=85" },
  { num: "/03", name: "Professional Svcs", tag: "Privileged Matter",      src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop&q=85" },
  { num: "/04", name: "Small Business",    tag: "Managed IT",             src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop&q=85" },
  { num: "/05", name: "Construction",      tag: "Site Connectivity",      src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop&q=85" },
  { num: "/06", name: "Finance",           tag: "Compliance & Security",  src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&q=85" },
  { num: "/07", name: "Education",         tag: "Campus IT Security",     src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&q=85" },
  { num: "/08", name: "Government",        tag: "Public Sector IT",       src: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop&q=85" },
];

/* ═══════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════ */

export default function Industries() {
  return (
    <main className="pt-[68px] bg-bg-page">

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col items-center overflow-hidden bg-bg-page"
        style={{ paddingTop: "clamp(24px,3vw,40px)", minHeight: "100vh" }}>

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 65% 45% at 50% 30%, rgba(36,114,200,.07) 0%, transparent 70%)" }} />

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(36,114,200,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(36,114,200,.045) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 100%)" }} />

        {/* ── Copy ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-[1000px] mx-auto">
          <motion.div className="flex flex-col items-center gap-1.5 mb-5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.03, ease: EASE }}>
            <div className="flex gap-0.5">
              {[0,1,2,3,4].map(s => (
                <svg key={s} viewBox="0 0 16 16" fill="#F5C518" style={{ width: 13, height: 13 }}>
                  <path d="M8 1.5l1.65 3.35 3.7.54-2.68 2.6.63 3.68L8 9.77l-3.3 1.9.63-3.68L2.65 5.4l3.7-.55z"/>
                </svg>
              ))}
            </div>
            <p className="text-text-muted" style={{ fontSize: 12.5, fontFamily: "var(--font-dm-sans)", letterSpacing: "0.02em" }}>
              Trusted by 80+ businesses across 4 industries
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: EASE }}>
            <Eyebrow>Industries We Serve</Eyebrow>
          </motion.div>
          <motion.h1 className="font-outfit font-black text-text-heading mb-5"
            style={{ fontSize: "clamp(44px, 6.5vw, 80px)", letterSpacing: "-0.045em", lineHeight: 1.0 }}
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: EASE }}>
            Built for your industry.<br />
            <em className="not-italic">Not adapted for it.</em>
          </motion.h1>
          <motion.p className="text-text-body leading-[1.75] mb-9 max-w-[58ch]"
            style={{ fontSize: "clamp(15px, 1.4vw, 17px)" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease: EASE }}>
            A plant floor running Windows NT — isolated, not replaced. A clinic that can&apos;t afford a four-hour outage — backups verified weekly. A law firm where one email to opposing counsel ends a career — flagged before sending, contained when it slips through. Different industries, same standard.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38, ease: EASE }}>
            <Link href="/contact" className="btn btn-primary">
              Talk to us <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
            <Link href="/services" className="btn btn-outline">
              View services
            </Link>
          </motion.div>
        </div>

        {/* ── Industry Marquee ── */}
        <motion.div className="relative mt-14 pb-8 overflow-hidden mx-10 lg:mx-20 rounded-[20px]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55, ease: EASE }}>
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #F4F7FB, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #F4F7FB, transparent)" }} />
          <div className="industries-carousel-track">
            {[...MARQUEE_CARDS, ...MARQUEE_CARDS].map((c, i) => (
              <MarqueeCard key={i} {...c} />
            ))}
          </div>
        </motion.div>

      </section>

      {/* ══ 01 — MANUFACTURING ══ */}
      <MfgSection />

      <TransitionMark to="02 Healthcare" />

      {/* ══ 02 — HEALTHCARE ══ */}
      <HcSection />

      <TransitionMark to="03 Professional Services" />

      {/* ══ 03 — PROFESSIONAL SERVICES ══ */}
      <PsSection />

      <TransitionMark to="04 Growing Business" />

      {/* ══ 04 — GROWING BUSINESS ══ */}
      <SmbSection />

      <TransitionMark to="05 Construction & Civil" />

      {/* ══ 05 — CONSTRUCTION & CIVIL ══ */}
      <IndustrySection
        id="construction"
        eyebrow="05 · Construction & Civil"
        heading="Infrastructure projects demand IT that"
        accentPhrase="moves with the work."
        body="Construction environments are distributed by nature — multiple job sites, field crews, and back-office teams all working off the same data. We connect sites reliably, protect sensitive project files, and keep the office and field in sync without IT becoming a bottleneck."
        coverage={[
          "Reliable site connectivity — cellular failover, SD-WAN, VPN tunnels",
          "Secure access to drawings, contracts, and bid documents",
          "Microsoft 365 and cloud document management for distributed teams",
        ]}
        diagram={<ConstructionDiagram />}
      />

      {/* ══ ALSO SERVING ══ */}
      <AlsoSection />

      {/* ══ CTA ══ */}
      <section className="relative px-5 lg:px-[60px] py-[120px]">
        <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
        <div className="max-w-[920px] mx-auto">
          <div className="relative rounded-[22px] text-center overflow-hidden px-8 py-[80px] lg:px-16"
            style={{
              background: "linear-gradient(180deg, #102347 0%, #0A1628 100%)",
              boxShadow: "0 0 0 6px rgba(36,114,200,.08), 0 0 0 12px rgba(36,114,200,.04), 0 24px 56px rgba(16,35,71,.18)",
            }}>

            {/* Top glow */}
            <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[460px] h-[460px] rounded-full pointer-events-none ind-glow-blob"
              style={{ background: "radial-gradient(circle, rgba(36,114,200,.42) 0%, transparent 60%)" }} />

            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-[22px] overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(rgba(122,180,238,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(122,180,238,.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 100%)",
              }} />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-7">

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 justify-center">
                {["No pitch deck", "No obligation", "Senior engineer", "Any industry"].map((tag) => (
                  <span key={tag} className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase px-[11px] py-[5px] rounded-full"
                    style={{ color: "#7AB4EE", background: "rgba(122,180,238,.08)", border: "1px solid rgba(122,180,238,.20)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <Eyebrow dark>What Comes Next</Eyebrow>

              <h2 className="font-outfit font-black max-w-[22ch]"
                style={{ fontSize: "clamp(34px, 4.4vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.04, color: "#EAF2FC" }}>
                Tell us your industry.
                <em className="not-italic block">We&apos;ll map the right controls.</em>
              </h2>

              <p style={{ fontSize: "15.5px", color: "#7AB4EE", lineHeight: 1.65, maxWidth: "52ch" }}>
                A short call is enough to understand your environment. We&apos;ll tell you where your gaps are and what we&apos;d change first.
              </p>

              <div className="flex gap-3 flex-wrap justify-center">
                <Link href="/contact" className="btn btn-white">
                  Talk to an engineer <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
                <Link href="/services" className="btn btn-outline-white">
                  View services <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
