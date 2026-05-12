"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const JB = "var(--font-dm-sans), sans-serif";

/* ═══════════════════════════════════════════════
   INDUSTRY STRIP
═══════════════════════════════════════════════ */

const STRIP_ITEMS = [
  { id: "manufacturing", num: "01", label: "Manufacturing" },
  { id: "healthcare",    num: "02", label: "Healthcare" },
  { id: "professional", num: "03", label: "Professional Services" },
  { id: "smb",          num: "04", label: "SMB" },
  { id: "construction", num: "05", label: "Construction" },
];

function IndustryStrip() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = STRIP_ITEMS
      .map(s => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.2, rootMargin: "-120px 0px -45% 0px" },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="sticky top-[68px] z-40 border-b border-border-light overflow-x-auto"
      style={{ background: "rgba(244,247,251,0.92)", backdropFilter: "blur(16px) saturate(180%)" }}
    >
      <div className="max-w-[1280px] mx-auto px-5 lg:px-[60px] py-3 flex items-center gap-1.5 min-w-max">
        {STRIP_ITEMS.map((s, i) => (
          <React.Fragment key={s.id}>
            {i > 0 && (
              <span className="text-border-light flex-shrink-0 text-[11px]" style={{ fontFamily: JB }}>·</span>
            )}
            <a
              href={`#${s.id}`}
              className="flex items-center gap-2 px-3 py-[7px] rounded-full flex-shrink-0 transition-all duration-200 whitespace-nowrap"
              style={{
                fontFamily: JB,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: active === s.id ? "#fff" : "#1E4D8C",
                background: active === s.id ? "#2472C8" : "transparent",
              }}
            >
              <span style={{ opacity: active === s.id ? 1 : 0.65 }}>{s.num}</span>
              {s.label}
            </a>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════════ */

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-[22px]">
      <span className="w-6 h-[2px] rounded-full flex-shrink-0" style={{ background: dark ? "#7AB4EE" : "#2472C8" }} />
      <span style={{ fontFamily: JB, fontSize: 11, fontWeight: 700, letterSpacing: "0.17em", textTransform: "uppercase" as const, color: dark ? "#7AB4EE" : "#2472C8" }}>
        {children}
      </span>
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[5px]">
      <span style={{ fontFamily: JB, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#1E4D8C" }}>
        {label}
      </span>
      <span className="text-[14px] font-semibold text-text-heading flex items-center gap-1.5">
        <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: "#22A05A" }} />
        {value}
      </span>
    </div>
  );
}

function VisualCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-border-light rounded-[20px] p-7 lg:p-8 relative overflow-hidden"
      style={{ boxShadow: "0 16px 40px rgba(16,35,71,.06)" }}>
      <div className="flex items-center gap-2.5 mb-5"
        style={{ fontFamily: JB, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#1E4D8C" }}>
        <span className="w-[6px] h-[6px] rounded-full flex-shrink-0 ind-status-blink" style={{ background: "#22A05A" }} />
        {label}
      </div>
      {children}
    </div>
  );
}

function StatusRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 pt-5 border-t border-dashed border-border-light grid grid-cols-3 gap-4">
      {children}
    </div>
  );
}

type Outcome = { title: string; detail: string };

function OutcomeList({ items }: { items: Outcome[] }) {
  return (
    <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-border-light">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 text-[16px] font-medium text-text-heading leading-[1.5]">
          <span className="text-accent font-bold flex-shrink-0 mt-[2px]" style={{ fontFamily: JB }}>›</span>
          <span>
            <strong>{item.title}</strong>
            <span className="font-normal text-text-muted ml-1.5 text-[14px]">— {item.detail}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function SectionNum({ n }: { n: string }) {
  return (
    <div className="font-outfit font-black text-accent mb-2 leading-none select-none"
      style={{ fontSize: "clamp(48px,7vw,64px)", letterSpacing: "-0.05em", opacity: 0.18 }}>
      {n}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   01  MANUFACTURING
═══════════════════════════════════════════════ */

function MfgSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="manufacturing" ref={ref} className="relative py-[120px] px-5 lg:px-[60px]" style={{ scrollMarginTop: 130 }}>
      <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Text */}
        <motion.div className="max-w-[540px]"
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
          <SectionNum n="01" />
          <Eyebrow>Manufacturing</Eyebrow>
          <h2 className="font-outfit font-black text-text-heading mb-[22px]"
            style={{ fontSize: "clamp(34px,4.2vw,50px)", letterSpacing: "-0.04em", lineHeight: 1.04 }}>
            When the line stops, every minute is on the clock.
          </h2>
          <p className="text-text-body leading-[1.7] max-w-[56ch]" style={{ fontSize: "clamp(15px,1.5vw,17px)" }}>
            Most manufacturing IT failures come from the same places — an HMI VLAN that can ping accounting, a vendor
            remote-support tunnel left open after the last service call, monitoring tuned to ticket volume instead of
            operational impact. We unwind those one by one.
          </p>
          <OutcomeList items={[
            { title: "Production-floor uptime", detail: "redundant cell switches, sub-second failover" },
            { title: "OT segmentation", detail: "HMIs and PLCs on their own VLAN, deny-by-default outbound" },
            { title: "CMMC Level 2", detail: "controls mapped to your environment, not bolted on before audit" },
          ]} />
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}>
          <VisualCard label="The Quarantine · Live">
            <svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
              <defs>
                <pattern id="mfg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#B8D4F7" strokeWidth="0.5" opacity="0.35" />
                </pattern>
                <radialGradient id="mfg-floor" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#EAF2FC" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F4F7FB" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="380" height="260" fill="url(#mfg-grid)" />
              <ellipse cx="190" cy="160" rx="170" ry="46" fill="url(#mfg-floor)" />
              {/* Telemetry arrow */}
              <g className="glow-pulse">
                <line x1="190" y1="14" x2="190" y2="50" stroke="#2472C8" strokeWidth="2" strokeLinecap="round" />
                <path d="M183 44 L190 54 L197 44" stroke="#2472C8" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>
              <text x="212" y="30" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="700" fill="#2472C8" letterSpacing="1">TELEMETRY IN</text>
              {/* Segmentation border */}
              <rect x="80" y="60" width="220" height="155" rx="14" fill="rgba(36,114,200,0.04)" stroke="#2472C8" strokeWidth="1.5" strokeDasharray="5 4" className="perimeter-pulse" />
              <text x="92" y="75" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="700" fill="#2472C8" letterSpacing="1">SEGMENT · ONE-WAY</text>
              {/* Floor shadow */}
              <ellipse cx="190" cy="198" rx="58" ry="5" fill="#0A1628" opacity="0.10" />
              {/* Terminal stand */}
              <rect x="160" y="178" width="60" height="14" rx="2" fill="#C9B896" />
              <rect x="170" y="192" width="40" height="5" rx="1" fill="#A89578" />
              <rect x="174" y="176" width="32" height="3" fill="#8B7960" />
              {/* Monitor body */}
              <rect x="112" y="95" width="156" height="84" rx="8" fill="#D4C19A" />
              <rect x="115" y="98" width="150" height="78" rx="6" fill="#C9B896" />
              <rect x="123" y="106" width="134" height="62" rx="3" fill="#2A2A2A" />
              <rect x="127" y="110" width="126" height="54" fill="#0D1F0D" />
              <g opacity="0.15">
                <line x1="127" y1="116" x2="253" y2="116" stroke="#3DD53D" strokeWidth="0.5" />
                <line x1="127" y1="126" x2="253" y2="126" stroke="#3DD53D" strokeWidth="0.5" />
                <line x1="127" y1="136" x2="253" y2="136" stroke="#3DD53D" strokeWidth="0.5" />
                <line x1="127" y1="146" x2="253" y2="146" stroke="#3DD53D" strokeWidth="0.5" />
                <line x1="127" y1="156" x2="253" y2="156" stroke="#3DD53D" strokeWidth="0.5" />
              </g>
              <text x="190" y="123" fontFamily="DM Sans, sans-serif" fontSize="8" fill="#3DD53D" textAnchor="middle" fontWeight="700">▌ HMI v3.2 · NT 4.0</text>
              <text x="190" y="136" fontFamily="DM Sans, sans-serif" fontSize="9" fill="#3DD53D" textAnchor="middle" fontWeight="700">PRESS 03 · RUNNING</text>
              <text x="190" y="149" fontFamily="DM Sans, sans-serif" fontSize="8" fill="#2A8A2A" textAnchor="middle">RPM 1247 · TEMP OK</text>
              <text x="190" y="161" fontFamily="DM Sans, sans-serif" fontSize="7" fill="#1F6B1F" textAnchor="middle">[F1] HELP    [F2] LOG</text>
              {/* Corp blocked */}
              <circle cx="68" cy="137" r="11" fill="#fff" stroke="#DC3545" strokeWidth="1.5" />
              <path d="M63 132 L73 142 M73 132 L63 142" stroke="#DC3545" strokeWidth="1.8" strokeLinecap="round" />
              <text x="52" y="140" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="700" fill="#DC3545" textAnchor="end">CORP</text>
              {/* INET blocked */}
              <circle cx="312" cy="137" r="11" fill="#fff" stroke="#DC3545" strokeWidth="1.5" />
              <path d="M307 132 L317 142 M317 132 L307 142" stroke="#DC3545" strokeWidth="1.8" strokeLinecap="round" />
              <text x="328" y="140" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="700" fill="#DC3545">INET</text>
              <text x="190" y="232" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="700" fill="#1E4D8C" textAnchor="middle" letterSpacing="1.5">LEGACY HMI · PLANT FLOOR</text>
            </svg>
            <StatusRow>
              <StatusItem label="Legacy HMI" value="Detected" />
              <StatusItem label="Segment" value="Active · One-way" />
              <StatusItem label="Exposure" value="None" />
            </StatusRow>
          </VisualCard>
        </motion.div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   02  HEALTHCARE
═══════════════════════════════════════════════ */

function HcSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="healthcare" ref={ref} className="relative py-[120px] px-5 lg:px-[60px]" style={{ scrollMarginTop: 130 }}>
      <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Visual — left on desktop */}
        <motion.div className="order-2 lg:order-1"
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
          <VisualCard label="The Clock · RTO Budget">
            <svg viewBox="0 0 380 290" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
              <defs>
                <radialGradient id="hc-clock-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2472C8" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#2472C8" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="hc-clock-face" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F8FAFD" />
                </linearGradient>
              </defs>
              <circle cx="190" cy="125" r="105" fill="url(#hc-clock-glow)" />
              <circle cx="190" cy="125" r="88" fill="url(#hc-clock-face)" stroke="#B8D4F7" strokeWidth="1.5" />
              <circle cx="190" cy="125" r="82" fill="none" stroke="#B8D4F7" strokeWidth="0.5" opacity="0.5" />
              {/* Tick marks */}
              <g stroke="#B8D4F7" strokeWidth="0.8" opacity="0.5">
                <line x1="190" y1="46" x2="190" y2="52" />
                <line x1="260" y1="71" x2="255" y2="74" />
                <line x1="269" y1="125" x2="263" y2="125" />
                <line x1="260" y1="179" x2="255" y2="176" />
                <line x1="190" y1="204" x2="190" y2="198" />
                <line x1="120" y1="179" x2="125" y2="176" />
                <line x1="111" y1="125" x2="117" y2="125" />
                <line x1="120" y1="71" x2="125" y2="74" />
              </g>
              {/* Hour labels */}
              <text x="190" y="62" fontFamily="var(--font-outfit)" fontWeight="900" fontSize="16" fill="#0A1628" textAnchor="middle">0</text>
              <text x="251" y="131" fontFamily="var(--font-outfit)" fontWeight="900" fontSize="16" fill="#0A1628" textAnchor="middle">1</text>
              <text x="190" y="197" fontFamily="var(--font-outfit)" fontWeight="900" fontSize="16" fill="#0A1628" textAnchor="middle">2</text>
              <text x="129" y="131" fontFamily="var(--font-outfit)" fontWeight="900" fontSize="16" fill="#0A1628" textAnchor="middle">3</text>
              <text x="190" y="148" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="700" fill="#1E4D8C" textAnchor="middle" letterSpacing="2">HOURS</text>
              {/* Green arc — safe zone 0–0:31 */}
              <path d="M 190 37 A 88 88 0 0 1 252 55" fill="none" stroke="#22A05A" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
              {/* Minute hand */}
              <g className="minute-hand-anim">
                <line x1="190" y1="125" x2="247" y2="79" stroke="#2472C8" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="190" cy="125" r="6" fill="#0A1628" />
                <circle cx="190" cy="125" r="3" fill="#2472C8" />
              </g>
              {/* 4h warning */}
              <circle cx="190" cy="37" r="11" fill="#DC3545" />
              <circle cx="190" cy="37" r="11" fill="none" stroke="#DC3545" strokeWidth="1.5" opacity="0.4">
                <animate attributeName="r" from="11" to="20" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              <path d="M186 33 L194 41 M194 33 L186 41" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <text x="190" y="22" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="700" fill="#DC3545" textAnchor="middle" letterSpacing="2">4 HOURS · NEVER</text>
              <text x="265" y="68" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="700" fill="#22A05A" letterSpacing="1">0:31 ✓</text>
              {/* Timeline */}
              <line x1="40" y1="245" x2="340" y2="245" stroke="#B8D4F7" strokeWidth="1" />
              {[
                { cx: 40,  label: "00:00", sub: "Incident" },
                { cx: 125, label: "00:08", sub: "Failover" },
                { cx: 215, label: "00:23", sub: "Verified" },
              ].map(p => (
                <g key={p.cx}>
                  <circle cx={p.cx} cy="245" r="4" fill="#22A05A" />
                  <text x={p.cx} y="263" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="700" fill="#0A1628" textAnchor="middle">{p.label}</text>
                  <text x={p.cx} y="275" fontFamily="var(--font-dm-sans)" fontSize="9" fill="#1E4D8C" textAnchor="middle">{p.sub}</text>
                </g>
              ))}
              <g>
                <circle cx="305" cy="245" r="5" fill="#2472C8" />
                <circle cx="305" cy="245" r="5" fill="none" stroke="#2472C8" strokeWidth="1" opacity="0.3">
                  <animate attributeName="r" from="5" to="12" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="305" y="263" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="700" fill="#0A1628" textAnchor="middle">00:31</text>
                <text x="305" y="275" fontFamily="var(--font-dm-sans)" fontSize="9" fontWeight="700" fill="#2472C8" textAnchor="middle">Care resumed</text>
              </g>
            </svg>
            <StatusRow>
              <StatusItem label="RTO budget" value="< 1 hour" />
              <StatusItem label="Last verified" value="Today 06:42" />
              <StatusItem label="Restore tested" value="Mon 14:00" />
            </StatusRow>
          </VisualCard>
        </motion.div>

        {/* Text — right on desktop */}
        <motion.div className="max-w-[540px] order-1 lg:order-2"
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}>
          <SectionNum n="02" />
          <Eyebrow>Healthcare</Eyebrow>
          <h2 className="font-outfit font-black text-text-heading mb-[22px]"
            style={{ fontSize: "clamp(34px,4.2vw,50px)", letterSpacing: "-0.04em", lineHeight: 1.04 }}>
            HIPAA isn&apos;t a checklist. It&apos;s how the environment is built.
          </h2>
          <p className="text-text-body leading-[1.7] max-w-[56ch]" style={{ fontSize: "clamp(15px,1.5vw,17px)" }}>
            Identity, endpoint, backup, and access controls designed around how clinical staff actually work — fast user
            switching at shared workstations, MFA that doesn&apos;t lock a nurse out mid-shift, session timeouts that fit
            a med pass. Business continuity is restored, tested, and timed — the EHR can&apos;t go down at 7 AM Monday.
          </p>
          <OutcomeList items={[
            { title: "HIPAA technical safeguards", detail: "encryption at rest and in motion, audit logs that survive review" },
            { title: "Endpoint & identity", detail: "badge-in fast, session timeouts that fit a clinical shift" },
            { title: "Tested business continuity", detail: "quarterly restore drills, RTO measured to the minute" },
          ]} />
        </motion.div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   03  PROFESSIONAL SERVICES
═══════════════════════════════════════════════ */

function PsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="professional" ref={ref} className="relative py-[120px] px-5 lg:px-[60px]" style={{ scrollMarginTop: 130 }}>
      <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Text */}
        <motion.div className="max-w-[540px]"
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
          <SectionNum n="03" />
          <Eyebrow>Professional Services</Eyebrow>
          <h2 className="font-outfit font-black text-text-heading mb-[22px]"
            style={{ fontSize: "clamp(34px,4.2vw,50px)", letterSpacing: "-0.04em", lineHeight: 1.04 }}>
            Client confidentiality lives in your tenant. We make sure it stays there.
          </h2>
          <p className="text-text-body leading-[1.7] max-w-[56ch]" style={{ fontSize: "clamp(15px,1.5vw,17px)" }}>
            Most breaches in professional services start the same way — a compromised mailbox, weak conditional access, or a
            device that shouldn&apos;t have been connecting. We close those gaps before they become incidents.
          </p>
          <OutcomeList items={[
            { title: "Microsoft 365 governance", detail: "least privilege by default" },
            { title: "Email & identity protection", detail: "phishing-resistant MFA, conditional access" },
            { title: "Encrypted devices, secure remote work", detail: "enforced, not assumed" },
          ]} />
        </motion.div>

        {/* Email mockup visual */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}>
          <VisualCard label="The Intercept · Live policy">
            {/* Email client mock */}
            <div className="rounded-[12px] overflow-hidden border border-border-light"
              style={{ boxShadow: "0 8px 24px rgba(16,35,71,0.06)" }}>

              {/* Title bar */}
              <div className="flex items-center gap-2.5 px-3.5 py-2.5"
                style={{ background: "linear-gradient(180deg,#f5f7fa,#eef2f7)", borderBottom: "1px solid #B8D4F7" }}>
                <div className="flex gap-1.5">
                  <span className="w-[11px] h-[11px] rounded-full block" style={{ background: "#ff5f57" }} />
                  <span className="w-[11px] h-[11px] rounded-full block" style={{ background: "#febc2e" }} />
                  <span className="w-[11px] h-[11px] rounded-full block" style={{ background: "#28c840" }} />
                </div>
                <span className="text-[12.5px] font-semibold text-text-muted ml-1.5">New Message — Re: Henderson</span>
              </div>

              {/* Warning banner */}
              <div className="flex items-start gap-2.5 px-4 py-3 email-slide-in"
                style={{ background: "linear-gradient(180deg,#FFF4E0,#FCE7C0)", borderBottom: "1px solid #E89C1F" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[18px] h-[18px] flex-shrink-0 mt-[1px]" style={{ color: "#B27414" }}>
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div className="flex-1">
                  <p className="text-[12.5px] font-bold mb-1" style={{ color: "#6B4309" }}>
                    External recipient · DLP match on &ldquo;settlement&rdquo;
                  </p>
                  <div className="flex gap-3" style={{ fontFamily: JB, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "#8B5612" }}>
                    <span className="underline decoration-dotted cursor-pointer" style={{ color: "#B27414" }}>Send anyway</span>
                    <span>Request review</span>
                    <span>Cancel</span>
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="px-4 py-3.5" style={{ borderBottom: "1px solid #f0f0f5" }}>
                <div className="flex items-baseline gap-3 py-[6px] text-[13.5px]">
                  <span className="w-[52px] flex-shrink-0 text-text-muted font-bold" style={{ fontFamily: JB, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>To</span>
                  <span className="font-medium" style={{ fontFamily: JB, fontSize: 12.5, color: "#B27414" }}>
                    m.bennett@opposingcounsel.com
                    <span className="inline-block ml-2 px-1.5 py-[1px] rounded-full text-[10px] font-bold tracking-[0.06em] uppercase" style={{ background: "rgba(232,156,31,0.15)", border: "1px solid rgba(232,156,31,0.4)", color: "#8B5612" }}>EXTERNAL</span>
                  </span>
                </div>
                <div className="flex items-baseline gap-3 py-[6px] text-[13.5px]" style={{ borderTop: "1px solid #f7f7f9" }}>
                  <span className="w-[52px] flex-shrink-0 text-text-muted font-bold" style={{ fontFamily: JB, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Subject</span>
                  <span className="font-medium text-text-heading">Re: Henderson — settlement terms</span>
                </div>
              </div>

              {/* Body */}
              <div className="px-4 py-[18px] text-[13.5px] leading-[1.65] text-text-heading" style={{ borderBottom: "1px solid #f0f0f5" }}>
                Mark — confirming the{" "}
                <mark className="rounded-[2px] px-[3px] font-semibold" style={{ background: "rgba(232,156,31,0.25)", borderBottom: "1.5px solid #E89C1F" }}>settlement</mark>
                {" "}figure we discussed. Our client will accept the proposed terms with the following...
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3.5" style={{ background: "#fafbfc", fontFamily: JB, fontSize: 11, fontWeight: 600, color: "#1E4D8C" }}>
                <span>POLICY · M365-DLP-04</span>
                <span>
                  Last 30d · <strong className="text-text-heading">4 flagged</strong> · <strong style={{ color: "#22A05A" }}>0 leaked</strong>
                </span>
              </div>
            </div>

            <StatusRow>
              <StatusItem label="DLP" value="Active" />
              <StatusItem label="MFA" value="100% enrolled" />
              <StatusItem label="Devices" value="Encrypted" />
            </StatusRow>
          </VisualCard>
        </motion.div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   04  SMB
═══════════════════════════════════════════════ */

function SmbSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="smb" ref={ref} className="relative py-[120px] px-5 lg:px-[60px]" style={{ scrollMarginTop: 130 }}>
      <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Visual — left */}
        <motion.div className="order-2 lg:order-1"
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
          <VisualCard label="The Blueprint · Same foundation">
            <svg viewBox="0 0 380 275" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
              <defs>
                <pattern id="smb-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#B8D4F7" strokeWidth="0.5" opacity="0.3" />
                </pattern>
                <linearGradient id="smb-bld" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1B3568" />
                  <stop offset="100%" stopColor="#102347" />
                </linearGradient>
              </defs>
              <rect width="380" height="275" fill="url(#smb-grid)" />
              <text x="20" y="26" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="700" fill="#1E4D8C" letterSpacing="1.5">SCALE · NO REBUILD REQUIRED</text>
              <text x="360" y="26" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="700" fill="#22A05A" textAnchor="end" letterSpacing="1">● ARCHITECTURE INTACT</text>
              {/* Year 1 — 20 people */}
              <text x="65" y="48" fontFamily="var(--font-outfit)" fontSize="22" fontWeight="900" fill="#0A1628" textAnchor="middle">20</text>
              <text x="65" y="63" fontFamily="var(--font-dm-sans)" fontSize="10" fill="#1E4D8C" textAnchor="middle">people</text>
              <rect x="40" y="155" width="50" height="36" fill="url(#smb-bld)" rx="2" />
              <g fill="#3D8FE0" opacity="0.6">
                <rect x="46" y="161" width="6" height="6" /><rect x="56" y="161" width="6" height="6" /><rect x="66" y="161" width="6" height="6" /><rect x="76" y="161" width="6" height="6" />
                <rect x="46" y="171" width="6" height="6" /><rect x="56" y="171" width="6" height="6" /><rect x="66" y="171" width="6" height="6" /><rect x="76" y="171" width="6" height="6" />
                <rect x="46" y="181" width="6" height="6" /><rect x="56" y="181" width="6" height="6" /><rect x="66" y="181" width="6" height="6" /><rect x="76" y="181" width="6" height="6" />
              </g>
              <rect x="60" y="185" width="10" height="6" fill="#0A1628" />
              <text x="65" y="205" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="700" fill="#1E4D8C" textAnchor="middle" letterSpacing="1">YEAR 1</text>
              {/* Arrow 1→2 */}
              <g opacity="0.6">
                <line x1="105" y1="175" x2="133" y2="175" stroke="#2472C8" strokeWidth="1.5" strokeDasharray="3 2" />
                <path d="M128 170 L136 175 L128 180" stroke="#2472C8" strokeWidth="1.5" fill="none" />
              </g>
              {/* Year 2 — 50 people */}
              <text x="190" y="48" fontFamily="var(--font-outfit)" fontSize="22" fontWeight="900" fill="#0A1628" textAnchor="middle">50</text>
              <text x="190" y="63" fontFamily="var(--font-dm-sans)" fontSize="10" fill="#1E4D8C" textAnchor="middle">people</text>
              <rect x="155" y="115" width="70" height="76" fill="url(#smb-bld)" rx="2" />
              <g fill="#3D8FE0" opacity="0.6">
                {[121,131,141,151,161,171,181].map(y => (
                  [161,171,181,191,201,211].map(x => <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" />)
                ))}
              </g>
              <rect x="184" y="181" width="12" height="10" fill="#0A1628" />
              <text x="190" y="205" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="700" fill="#1E4D8C" textAnchor="middle" letterSpacing="1">YEAR 2</text>
              {/* Arrow 2→3 */}
              <g opacity="0.6">
                <line x1="240" y1="175" x2="268" y2="175" stroke="#2472C8" strokeWidth="1.5" strokeDasharray="3 2" />
                <path d="M263 170 L271 175 L263 180" stroke="#2472C8" strokeWidth="1.5" fill="none" />
              </g>
              {/* Year 3 — 200 people */}
              <text x="320" y="48" fontFamily="var(--font-outfit)" fontSize="22" fontWeight="900" fill="#0A1628" textAnchor="middle">200</text>
              <text x="320" y="63" fontFamily="var(--font-dm-sans)" fontSize="10" fill="#1E4D8C" textAnchor="middle">people</text>
              <rect x="285" y="75" width="70" height="116" fill="url(#smb-bld)" rx="2" />
              <g fill="#3D8FE0" opacity="0.6">
                {[81,91,101,111,121,131,141,151,161,171].map(y => (
                  [291,301,311,321,331,341].map(x => <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" />)
                ))}
              </g>
              <rect x="314" y="181" width="12" height="10" fill="#0A1628" />
              <text x="320" y="205" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="700" fill="#1E4D8C" textAnchor="middle" letterSpacing="1">YEAR 3</text>
              {/* Baseline */}
              <rect x="20" y="215" width="340" height="3" fill="#2472C8" rx="1.5" />
              <rect x="20" y="218" width="340" height="2" fill="#2472C8" opacity="0.3" />
              <text x="190" y="242" fontFamily="DM Sans, sans-serif" fontSize="9.5" fontWeight="700" fill="#2472C8" textAnchor="middle" letterSpacing="1.8">IDENTITY · NETWORK · SECURITY · BACKUP</text>
              <text x="190" y="260" fontFamily="var(--font-dm-sans)" fontSize="10.5" fill="#1E4D8C" textAnchor="middle">Same foundation. Different scale.</text>
            </svg>
            <StatusRow>
              <StatusItem label="Growth path" value="10× headroom" />
              <StatusItem label="Cost model" value="Predictable" />
              <StatusItem label="Rebuilds" value="Zero" />
            </StatusRow>
          </VisualCard>
        </motion.div>

        {/* Text — right */}
        <motion.div className="max-w-[540px] order-1 lg:order-2"
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}>
          <SectionNum n="04" />
          <Eyebrow>Small &amp; mid-size business</Eyebrow>
          <h2 className="font-outfit font-black text-text-heading mb-[22px]"
            style={{ fontSize: "clamp(34px,4.2vw,50px)", letterSpacing: "-0.04em", lineHeight: 1.04 }}>
            Most SMB IT breaks at 50 people.{" "}
            <em className="not-italic text-accent">Ours doesn&apos;t.</em>
          </h2>
          <p className="text-text-body leading-[1.7] max-w-[56ch]" style={{ fontSize: "clamp(15px,1.5vw,17px)" }}>
            Most SMB environments break the same way — on-prem AD nobody federated to Entra ID, a shared drive with
            permissions nobody can map, a backup running for years but never tested. We fix it once. After that, growth
            is adding seats.
          </p>
          <OutcomeList items={[
            { title: "Scalable foundation", detail: "identity federated, permissions mapped, backups verified" },
            { title: "Predictable monthly cost", detail: "per-seat pricing, no surprise project invoices" },
            { title: "Senior engineers", detail: "direct access, no tier-1 triage, no junior handoffs" },
          ]} />
        </motion.div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   05  CONSTRUCTION
═══════════════════════════════════════════════ */

function ConstructionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="construction" ref={ref} className="relative py-[120px] px-5 lg:px-[60px]" style={{ scrollMarginTop: 130 }}>
      <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Text */}
        <motion.div className="max-w-[540px]"
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
          <SectionNum n="05" />
          <Eyebrow>Construction</Eyebrow>
          <h2 className="font-outfit font-black text-text-heading mb-[22px]"
            style={{ fontSize: "clamp(34px,4.2vw,50px)", letterSpacing: "-0.04em", lineHeight: 1.04 }}>
            Concrete doesn&apos;t wait for IT to catch up.
          </h2>
          <p className="text-text-body leading-[1.7] max-w-[56ch]" style={{ fontSize: "clamp(15px,1.5vw,17px)" }}>
            Most construction IT failures happen at the seams — a site network that can&apos;t reach the trailer at 6 AM,
            a wire transfer request that looks exactly like the controller&apos;s, a subcontractor login nobody deactivated
            when the job ended. We design around those seams.
          </p>
          <OutcomeList items={[
            { title: "Multi-site connectivity", detail: "secure from HQ to every trailer, truck, and tablet" },
            { title: "Wire-fraud prevention", detail: "invoice anomalies caught before the funds move" },
            { title: "Project access controls", detail: "subcontractor logins that expire with the project" },
          ]} />
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}>
          <VisualCard label="The Job Site · Live network">
            <svg viewBox="0 0 380 275" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
              <defs>
                <pattern id="cn-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#B8D4F7" strokeWidth="0.5" opacity="0.35" />
                </pattern>
                <radialGradient id="hq-glow-c" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2472C8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2472C8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="380" height="275" fill="url(#cn-grid)" />
              <text x="20" y="22" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="700" fill="#1E4D8C" letterSpacing="1.5">LIVE · 3 SITES CONNECTED</text>
              <circle cx="354" cy="18" r="4" fill="#22A05A">
                <animate attributeName="opacity" from="1" to="0.35" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <text x="346" y="22" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="700" fill="#22A05A" textAnchor="end" letterSpacing="1">SECURE</text>
              {/* Connection lines */}
              <g stroke="#2472C8" strokeWidth="1.4" strokeDasharray="4 3" opacity="0.65" fill="none">
                <line x1="190" y1="150" x2="80" y2="82" />
                <line x1="190" y1="150" x2="300" y2="82" />
                <line x1="190" y1="168" x2="190" y2="228" />
              </g>
              {/* Animated data packets */}
              <circle r="3" fill="#22A05A">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 80 82 L 190 150" />
              </circle>
              <circle r="3" fill="#22A05A">
                <animateMotion dur="3.2s" begin="0.6s" repeatCount="indefinite" path="M 300 82 L 190 150" />
              </circle>
              <circle r="3" fill="#22A05A">
                <animateMotion dur="2.6s" begin="1.1s" repeatCount="indefinite" path="M 190 228 L 190 168" />
              </circle>
              {/* HQ node */}
              <g transform="translate(190, 150)">
                <circle r="44" fill="url(#hq-glow-c)" />
                <circle r="26" fill="#102347" />
                <circle r="26" fill="none" stroke="#2472C8" strokeWidth="1" opacity="0.5" />
                <rect x="-10" y="-8" width="20" height="16" fill="#3D8FE0" rx="0.5" />
                <rect x="-7" y="-5" width="3" height="3" fill="#102347" />
                <rect x="-2" y="-5" width="3" height="3" fill="#102347" />
                <rect x="3" y="-5" width="3" height="3" fill="#102347" />
                <rect x="-7" y="1" width="3" height="3" fill="#102347" />
                <rect x="3" y="1" width="3" height="3" fill="#102347" />
                <rect x="-2" y="5" width="4" height="3" fill="#102347" />
                <text y="-34" fontFamily="DM Sans, sans-serif" fontSize="7.5" fontWeight="700" fill="#0A1628" textAnchor="middle" letterSpacing="2">HEADQUARTERS</text>
              </g>
              {/* Job Site 07 */}
              <g transform="translate(80, 82)">
                <circle r="22" fill="rgba(36,114,200,0.06)" stroke="#2472C8" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
                <rect x="-17" y="-8" width="34" height="16" rx="2" fill="#FFFFFF" stroke="#102347" strokeWidth="1.5" />
                <rect x="-13" y="-5" width="4" height="5" fill="#3D8FE0" />
                <rect x="-7" y="-5" width="4" height="5" fill="#3D8FE0" />
                <rect x="-1" y="-5" width="4" height="5" fill="#3D8FE0" />
                <rect x="5" y="-5" width="4" height="5" fill="#3D8FE0" />
                <rect x="-1" y="2" width="3" height="6" fill="#102347" />
                <circle cx="-11" cy="10" r="2" fill="#0A1628" />
                <circle cx="11" cy="10" r="2" fill="#0A1628" />
                <circle cx="14" cy="-11" r="3.5" fill="#22A05A" stroke="#FFFFFF" strokeWidth="1" />
                <text y="-18" fontFamily="DM Sans, sans-serif" fontSize="7.5" fontWeight="700" fill="#0A1628" textAnchor="middle" letterSpacing="0.5">JOB 07</text>
                <text y="34" fontFamily="var(--font-dm-sans)" fontSize="9" fill="#1E4D8C" textAnchor="middle" fontWeight="600">Main St · 24 devices</text>
              </g>
              {/* Job Site 08 */}
              <g transform="translate(300, 82)">
                <circle r="22" fill="rgba(36,114,200,0.06)" stroke="#2472C8" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
                <rect x="-17" y="-8" width="34" height="16" rx="2" fill="#FFFFFF" stroke="#102347" strokeWidth="1.5" />
                <rect x="-13" y="-5" width="4" height="5" fill="#3D8FE0" />
                <rect x="-7" y="-5" width="4" height="5" fill="#3D8FE0" />
                <rect x="-1" y="-5" width="4" height="5" fill="#3D8FE0" />
                <rect x="5" y="-5" width="4" height="5" fill="#3D8FE0" />
                <rect x="-1" y="2" width="3" height="6" fill="#102347" />
                <circle cx="-11" cy="10" r="2" fill="#0A1628" />
                <circle cx="11" cy="10" r="2" fill="#0A1628" />
                <circle cx="14" cy="-11" r="3.5" fill="#22A05A" stroke="#FFFFFF" strokeWidth="1" />
                <text y="-18" fontFamily="DM Sans, sans-serif" fontSize="7.5" fontWeight="700" fill="#0A1628" textAnchor="middle" letterSpacing="0.5">JOB 08</text>
                <text y="34" fontFamily="var(--font-dm-sans)" fontSize="9" fill="#1E4D8C" textAnchor="middle" fontWeight="600">Oak Ave · 18 devices</text>
              </g>
              {/* Field crew */}
              <g transform="translate(190, 228)">
                <circle r="20" fill="rgba(36,114,200,0.06)" stroke="#2472C8" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
                <rect x="-8" y="-10" width="16" height="20" rx="2" fill="#FFFFFF" stroke="#102347" strokeWidth="1.5" />
                <rect x="-5" y="-7" width="10" height="10" rx="1" fill="#3D8FE0" fillOpacity="0.5" />
                <circle cx="0" cy="7" r="1.5" fill="#102347" />
                <circle cx="14" cy="-11" r="3.5" fill="#22A05A" stroke="#FFFFFF" strokeWidth="1" />
                <text y="-28" fontFamily="DM Sans, sans-serif" fontSize="7.5" fontWeight="700" fill="#0A1628" textAnchor="middle" letterSpacing="0.5">FIELD</text>
                <text y="36" fontFamily="var(--font-dm-sans)" fontSize="9" fill="#1E4D8C" textAnchor="middle" fontWeight="600">Mobile crew · 8 devices</text>
              </g>
            </svg>
            <StatusRow>
              <StatusItem label="Sites online" value="3 of 3" />
              <StatusItem label="Encryption" value="Active" />
              <StatusItem label="Last sync" value="2m ago" />
            </StatusRow>
          </VisualCard>
        </motion.div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   HERO MARQUEE
═══════════════════════════════════════════════ */

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
          <span style={{ fontFamily: JB, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#EAF2FC", background: "rgba(10,22,40,.70)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.14)", padding: "3px 8px", borderRadius: 5 }}>
            {num}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="font-outfit font-extrabold leading-[1.15] text-white" style={{ fontSize: 16, letterSpacing: "-0.018em" }}>
            {name}
          </p>
        </div>
      </div>
      <div className="px-4 pt-3 pb-4 flex flex-col gap-[9px]">
        <p className="font-bold text-accent" style={{ fontFamily: JB, fontSize: 10, letterSpacing: "0.13em", textTransform: "uppercase" }}>{tag}</p>
        <div className="flex items-center gap-[7px]">
          <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: "#22A05A", boxShadow: "0 0 5px #22A05A" }} />
          <span className="font-bold text-text-muted" style={{ fontFamily: JB, fontSize: 10, letterSpacing: "0.10em", textTransform: "uppercase" }}>
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
   ALSO SERVING
═══════════════════════════════════════════════ */

function AlsoSection() {
  return (
    <section className="relative px-5 lg:px-[60px] py-14">
      <div className="absolute top-0 left-5 right-5 lg:left-[60px] lg:right-[60px] h-px bg-border-light" />
      <div className="max-w-[1280px] mx-auto flex items-center gap-8 flex-wrap">
        <span className="flex-shrink-0 text-text-muted" style={{ fontFamily: JB, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
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
        <p className="text-[13.5px] font-medium text-text-muted ml-auto">
          Not seeing yours?{" "}
          <Link href="/contact" className="text-accent font-semibold no-underline hover:underline">
            Let&apos;s talk →
          </Link>
        </p>
      </div>
    </section>
  );
}

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
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(36,114,200,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(36,114,200,.045) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 100%)",
          }} />

        {/* Copy */}
        <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-[1000px] mx-auto">
          <motion.div className="flex flex-col items-center gap-1.5 mb-5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.03, ease: EASE }}>
            <div className="flex gap-0.5">
              {[0,1,2,3,4].map(s => (
                <svg key={s} viewBox="0 0 16 16" fill="#F5C518" style={{ width: 13, height: 13 }}>
                  <path d="M8 1.5l1.65 3.35 3.7.54-2.68 2.6.63 3.68L8 9.77l-3.3 1.9.63-3.68L2.65 5.4l3.7-.55z" />
                </svg>
              ))}
            </div>
            <p className="text-text-muted" style={{ fontSize: 12.5, letterSpacing: "0.02em" }}>
              Trusted by 80+ businesses across 4 industries
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}>
            <Eyebrow>Industries We Serve</Eyebrow>
          </motion.div>

          <motion.h1 className="font-outfit font-black text-text-heading mb-5 text-balance"
            style={{ fontSize: "clamp(44px,6.5vw,80px)", letterSpacing: "-0.045em", lineHeight: 1.0 }}
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: EASE }}>
            Built for your industry.{" "}
            <em className="not-italic">Not adapted for it.</em>
          </motion.h1>

          <motion.p className="text-text-body leading-[1.75] mb-9 max-w-[58ch]"
            style={{ fontSize: "clamp(15px,1.4vw,17px)" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease: EASE }}>
            A plant floor running Windows NT — isolated, not replaced. A clinic that can&apos;t afford a four-hour outage —
            backups verified weekly. A law firm where one email to opposing counsel ends a career — flagged before sending,
            contained when it slips through. Different industries, same standard.
          </motion.p>

          <motion.div className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38, ease: EASE }}>
            <Link href="/contact" className="btn btn-primary">
              Talk to us <IconArrowRight size={14} stroke={2} />
            </Link>
          </motion.div>
        </div>

        {/* Marquee */}
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

      {/* ══ STICKY NAV STRIP ══ */}
      <IndustryStrip />

      {/* ══ SECTIONS ══ */}
      <MfgSection />
      <HcSection />
      <PsSection />
      <SmbSection />
      <ConstructionSection />

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
            <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[460px] h-[460px] rounded-full pointer-events-none ind-glow-blob"
              style={{ background: "radial-gradient(circle, rgba(36,114,200,.42) 0%, transparent 60%)" }} />
            <div className="absolute inset-0 pointer-events-none rounded-[22px] overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(rgba(122,180,238,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(122,180,238,.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 100%)",
              }} />
            <div className="relative z-10 flex flex-col items-center gap-7">
              <div className="flex flex-wrap gap-1.5 justify-center">
                {["No pitch deck", "No obligation", "Senior engineer", "Any industry"].map((tag) => (
                  <span key={tag} className="font-bold px-[11px] py-[5px] rounded-full"
                    style={{ fontFamily: JB, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7AB4EE", background: "rgba(122,180,238,.08)", border: "1px solid rgba(122,180,238,.20)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Eyebrow dark>What Comes Next</Eyebrow>
              <h2 className="font-outfit font-black max-w-[22ch]"
                style={{ fontSize: "clamp(34px,4.4vw,54px)", letterSpacing: "-0.04em", lineHeight: 1.04, color: "#EAF2FC" }}>
                Tell us your industry.
                <em className="not-italic block">We&apos;ll map the right controls.</em>
              </h2>
              <p style={{ fontSize: "17px", color: "#7AB4EE", lineHeight: 1.65, maxWidth: "52ch" }}>
                A short call is enough to understand your environment. We&apos;ll tell you where your gaps are and what we&apos;d change first.
              </p>
              <div className="flex gap-3 flex-wrap justify-center">
                <Link href="/contact" className="btn btn-white">
                  Talk to an engineer <IconArrowRight size={14} stroke={2} />
                </Link>
                <Link href="/services" className="btn btn-outline-white">
                  See our services <IconArrowRight size={14} stroke={2} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
