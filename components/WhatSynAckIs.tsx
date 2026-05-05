"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Connection paths — all converge at (320, 290) ── */

const CONN_PATHS = [
  { d: "M 313 50 Q 320 170, 320 290",  delay: 0.30 }, // cloud
  { d: "M 94 89 Q 200 170, 320 290",   delay: 0.38 }, // camera
  { d: "M 495 170 Q 420 220, 320 290", delay: 0.46 }, // server
  { d: "M 552 240 Q 440 270, 320 290", delay: 0.54 }, // router
  { d: "M 170 420 Q 250 360, 320 290", delay: 0.62 }, // laptop
  { d: "M 187 437 Q 260 370, 320 290", delay: 0.70 }, // phone
  { d: "M 551 389 Q 440 340, 320 290", delay: 0.78 }, // badge
];

/* ─── Summary rows ──────────────────────────────────── */

const SUMMARY = [
  { num: "01", title: "5 services we run.",            sub: "Managed IT. Microsoft 365. Network. AV. Procurement." },
  { num: "02", title: "4 layers we secure.",           sub: "Cybersecurity. Physical. Training. Backup & DR." },
  { num: "03", title: "1 plan that ties it together.", sub: "IT Strategy & vCIO. The roadmap. The direction." },
];

/* ─── Main ──────────────────────────────────────────── */

export default function WhatSynAckIs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const textAnim = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section className="relative overflow-hidden bg-bg-page py-[120px]" ref={ref}>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(36,114,200,.04) 0%, transparent 65%)" }}
      />

      <div className="max-w-site mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-16 items-center">

        {/* ══ LEFT — Text ══ */}
        <div style={{ maxWidth: 520 }}>

          <motion.div className="flex items-center gap-2.5 mb-7" {...textAnim(0.15)}>
            <span className="w-6 h-[2px] bg-accent rounded-full flex-shrink-0" />
            <span className="font-mono text-[11px] font-bold tracking-[0.17em] uppercase text-accent">What SynAck Is</span>
          </motion.div>

          <motion.h2
            className="font-outfit font-black text-text-heading mb-7"
            style={{ fontSize: "clamp(36px,4.5vw,56px)", letterSpacing: "-0.04em", lineHeight: 1.02 }}
            {...textAnim(0.3)}
          >
            Your business is the priority.<br />
            We make sure your{" "}
            <em className="not-italic text-accent">IT supports it.</em>
          </motion.h2>

          <motion.p
            className="text-text-muted leading-[1.7] mb-9"
            style={{ fontSize: "clamp(16px,1.5vw,18px)" }}
            {...textAnim(0.5)}
          >
            Most businesses lose hours every week to IT — fighting fires, chasing vendors,
            second-guessing whether things are secure.{" "}
            <strong className="text-text-heading font-bold">That&apos;s not your job.</strong> It&apos;s ours.
          </motion.p>

          {/* Summary block */}
          <motion.div
            className="bg-white border border-border-light rounded-[16px] px-7 py-6 shadow-[0_4px_16px_rgba(16,35,71,.04)]"
            {...textAnim(0.65)}
          >
            {SUMMARY.map((row, i) => (
              <div
                key={row.num}
                className={[
                  "flex items-center gap-4",
                  i === 0 ? "pb-[14px]" : "py-[14px]",
                  i < SUMMARY.length - 1 ? "border-b border-border-light" : "",
                ].join(" ")}
              >
                <span className="font-mono text-[11px] font-bold text-accent tracking-[0.04em] w-7 flex-shrink-0">
                  {row.num}
                </span>
                <div className="flex-1">
                  <p className="font-outfit font-extrabold text-[15px] text-text-heading leading-[1.3]" style={{ letterSpacing: "-0.015em" }}>
                    {row.title}
                  </p>
                  <p className="text-[12px] text-text-muted mt-[3px] leading-[1.5]">{row.sub}</p>
                </div>
                <div className="w-[22px] h-[22px] rounded-full bg-scale-50 border border-border-light flex items-center justify-center flex-shrink-0">
                  <ArrowRight size={11} className="text-accent" strokeWidth={2.5} />
                </div>
              </div>
            ))}
          </motion.div>

        </div>

        {/* ══ RIGHT — Building cross-section (desktop) ══ */}
        <motion.div
          className="relative hidden lg:block w-full mx-auto"
          style={{ maxWidth: 580, aspectRatio: "640 / 580" }}
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced ? {} : (inView ? { opacity: 1 } : {})}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Building SVG */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 640 580"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="wsa-floor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="100%" stopColor="#EAF2FC" stopOpacity=".4" />
              </linearGradient>
            </defs>

            {/* ── Building shell ── */}
            <rect x="40" y="60" width="560" height="460" rx="14"
              fill="#FFFFFF" stroke="#B8D4F7" strokeWidth="1.5" />
            <line x1="40" y1="100" x2="600" y2="100"
              stroke="#B8D4F7" strokeWidth="1.5" strokeDasharray="3 4" />
            <line x1="40" y1="460" x2="600" y2="460"
              stroke="#B8D4F7" strokeWidth="1.5" />
            <rect x="40" y="460" width="560" height="60" fill="url(#wsa-floor)" />
            <line x1="240" y1="100" x2="240" y2="460"
              stroke="#B8D4F7" strokeWidth="1" strokeDasharray="3 5" opacity=".5" />
            <line x1="430" y1="100" x2="430" y2="460"
              stroke="#B8D4F7" strokeWidth="1" strokeDasharray="3 5" opacity=".5" />

            {/* ── Camera (top-left wall) ── */}
            <g transform="translate(80, 80)">
              <rect x="0" y="0" width="28" height="18" rx="3" fill="#102347" />
              <rect x="22" y="6" width="10" height="6" rx="2" fill="#102347" />
              <circle cx="14" cy="9" r="3.5" fill="#2472C8" />
              <circle cx="14" cy="9" r="1.5" fill="#FFFFFF" />
              <line x1="14" y1="18" x2="14" y2="34" stroke="#B8D4F7" strokeWidth="1.5" />
              <circle className="pulse-dot" cx="14" cy="9" r="2" />
              <circle className="pulse-ring" cx="14" cy="9" r="4" style={{ animationDelay: "0s" }} />
            </g>

            {/* ── Desk + Laptop (left, bottom) ── */}
            <g transform="translate(110, 380)">
              <rect x="0" y="50" width="120" height="6" rx="1" fill="#102347" />
              <line x1="10" y1="56" x2="10" y2="80" stroke="#102347" strokeWidth="2" />
              <line x1="110" y1="56" x2="110" y2="80" stroke="#102347" strokeWidth="2" />
              <path d="M 30 50 L 30 30 L 90 30 L 90 50 Z"
                fill="#FFFFFF" stroke="#102347" strokeWidth="1.5" />
              <rect x="35" y="32" width="50" height="14" rx="1" fill="#102347" />
              <line x1="40" y1="38" x2="80" y2="38" stroke="#2472C8" strokeWidth=".8" />
              <line x1="40" y1="42" x2="65" y2="42" stroke="#7AB4EE" strokeWidth=".6" />
              <circle className="pulse-dot" cx="60" cy="40" r="2" style={{ animationDelay: "0.3s" }} />
              <circle className="pulse-ring" cx="60" cy="40" r="4" style={{ animationDelay: "0.3s" }} />
            </g>

            {/* ── Phone on desk ── */}
            <g transform="translate(180, 425)">
              <rect x="0" y="0" width="14" height="22" rx="2" fill="#102347" />
              <rect x="2" y="2" width="10" height="16" rx="1" fill="#7AB4EE" fillOpacity=".4" />
              <circle cx="7" cy="20" r="1" fill="#FFFFFF" />
              <circle className="pulse-dot" cx="7" cy="10" r="1.5" style={{ animationDelay: "0.6s" }} />
            </g>

            {/* ── Badge reader (right wall) ── */}
            <g transform="translate(540, 380)">
              <rect x="0" y="0" width="22" height="32" rx="3" fill="#102347" />
              <rect x="3" y="4" width="16" height="10" rx="1" fill="#2472C8" />
              <circle cx="11" cy="22" r="3" fill="#FFFFFF" />
              <circle cx="11" cy="22" r="1.5" fill="#102347" />
              <line x1="22" y1="16" x2="38" y2="16" stroke="#B8D4F7" strokeWidth="1.5" />
              <circle className="pulse-dot" cx="11" cy="9" r="2" style={{ animationDelay: "0.9s" }} />
              <circle className="pulse-ring" cx="11" cy="9" r="4" style={{ animationDelay: "0.9s" }} />
            </g>

            {/* ── Router / network box (right, mid) ── */}
            <g transform="translate(530, 230)">
              <rect x="0" y="0" width="44" height="22" rx="3"
                fill="#FFFFFF" stroke="#102347" strokeWidth="1.5" />
              <circle cx="8"  cy="11" r="2" fill="#2472C8" />
              <circle cx="16" cy="11" r="2" fill="#2472C8" fillOpacity=".6" />
              <circle cx="24" cy="11" r="2" fill="#2472C8" fillOpacity=".4" />
              <line x1="32" y1="6"  x2="40" y2="6"  stroke="#102347" strokeWidth="1" />
              <line x1="32" y1="11" x2="40" y2="11" stroke="#102347" strokeWidth="1" />
              <line x1="32" y1="16" x2="40" y2="16" stroke="#102347" strokeWidth="1" />
              <line x1="22" y1="0" x2="22" y2="-10" stroke="#102347" strokeWidth="1.5" />
              <circle cx="22" cy="-12" r="2" fill="#2472C8" />
              <circle className="pulse-dot" cx="22" cy="-12" r="2" style={{ animationDelay: "0.5s" }} />
              <circle className="pulse-ring" cx="22" cy="-12" r="4" style={{ animationDelay: "0.5s" }} />
            </g>

            {/* ── Server rack (right section) ── */}
            <g transform="translate(470, 130)">
              <rect x="0" y="0" width="50" height="80" rx="4"
                fill="#FFFFFF" stroke="#102347" strokeWidth="1.5" />
              <line x1="0" y1="20" x2="50" y2="20" stroke="#B8D4F7" />
              <line x1="0" y1="40" x2="50" y2="40" stroke="#B8D4F7" />
              <line x1="0" y1="60" x2="50" y2="60" stroke="#B8D4F7" />
              <circle cx="6" cy="10" r="1.5" fill="#22A05A" />
              <circle cx="6" cy="30" r="1.5" fill="#22A05A" />
              <circle cx="6" cy="50" r="1.5" fill="#2472C8" />
              <circle cx="6" cy="70" r="1.5" fill="#22A05A" />
              <rect x="14" y="6"  width="30" height="10" rx="1" fill="#EAF2FC" />
              <rect x="14" y="26" width="30" height="10" rx="1" fill="#EAF2FC" />
              <rect x="14" y="46" width="30" height="10" rx="1" fill="#EAF2FC" />
              <rect x="14" y="66" width="30" height="10" rx="1" fill="#EAF2FC" />
              <circle className="pulse-dot" cx="25" cy="40" r="2" style={{ animationDelay: "0.15s" }} />
              <circle className="pulse-ring" cx="25" cy="40" r="4" style={{ animationDelay: "0.15s" }} />
            </g>

            {/* ── Cloud (floating above building) ── */}
            <g transform="translate(280, 30)">
              <path
                d="M 20 20 C 12 20 8 14 12 8 C 14 4 20 4 24 8 C 28 0 40 0 44 8 C 52 6 58 14 54 20 Z"
                fill="#FFFFFF" stroke="#102347" strokeWidth="1.5"
              />
              <circle className="pulse-dot" cx="33" cy="14" r="2" style={{ animationDelay: "0.45s" }} />
              <circle className="pulse-ring" cx="33" cy="14" r="4" style={{ animationDelay: "0.45s" }} />
            </g>

            {/* ── Connection lines — animate in on inView ── */}
            {CONN_PATHS.map((conn, i) => (
              <motion.path
                key={i}
                d={conn.d}
                fill="none"
                stroke="rgba(36,114,200,0.28)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.35, delay: conn.delay }}
              />
            ))}
          </svg>

          {/* ── SynAck hub — absolutely positioned at (320,290) → 50% × 50% ── */}
          <div
            className="absolute"
            style={{
              left: "50%",
              top: `${(290 / 580) * 100}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 5,
            }}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.82 }}
              animate={reduced ? {} : (inView ? { opacity: 1, scale: 1 } : {})}
              transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            >
              {/* Pulse rings */}
              {!reduced && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-[16px] pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(36,114,200,.22)",
                        "0 0 0 16px rgba(36,114,200,0)",
                      ],
                    }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-[16px] pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(36,114,200,.13)",
                        "0 0 0 30px rgba(36,114,200,0)",
                      ],
                    }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0.55 }}
                  />
                </>
              )}

              {/* Hub pill */}
              <motion.div
                animate={reduced ? {} : { y: [0, -5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-[16px] overflow-hidden text-center"
                style={{
                  background: "linear-gradient(160deg, #122849 0%, #091428 100%)",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,.06) inset, 0 20px 48px rgba(16,35,71,.55), 0 4px 16px rgba(16,35,71,.4)",
                  padding: "12px 20px",
                  minWidth: 120,
                }}
              >
                {/* Corner glow */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: -36, right: -36,
                    width: 100, height: 100,
                    background: "radial-gradient(circle, rgba(36,114,200,.35) 0%, transparent 65%)",
                  }}
                />
                {/* Icon */}
                <div
                  className="w-7 h-7 rounded-[8px] flex items-center justify-center mx-auto mb-[6px] relative"
                  style={{ background: "rgba(36,114,200,.22)", border: "1px solid rgba(36,114,200,.45)" }}
                >
                  <Building2 size={13} style={{ color: "#5aa3e8" }} />
                </div>
                <p
                  className="relative font-mono font-bold uppercase"
                  style={{ fontSize: 6.5, letterSpacing: "0.18em", color: "rgba(122,180,238,.6)", marginBottom: 2 }}
                >
                  OWNED BY
                </p>
                <p
                  className="relative font-outfit font-black leading-none"
                  style={{ fontSize: 15, color: "#EAF2FC", letterSpacing: "-0.02em" }}
                >
                  SynAck
                </p>
                <p
                  className="relative font-mono font-bold uppercase"
                  style={{ fontSize: 6.5, letterSpacing: "0.1em", color: "rgba(122,180,238,.4)", marginTop: 2 }}
                >
                  Solutions
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ══ RIGHT — Mobile simplified ══ */}
        <motion.div
          className="lg:hidden flex flex-col gap-3 w-full max-w-[480px] mx-auto"
          {...textAnim(0.15)}
        >
          <div
            className="relative rounded-[16px] px-5 py-4 overflow-hidden text-center"
            style={{
              background: "linear-gradient(160deg, #122849 0%, #091428 100%)",
              boxShadow: "0 12px 40px rgba(16,35,71,.25)",
            }}
          >
            <div
              className="w-9 h-9 rounded-[9px] flex items-center justify-center mx-auto mb-2"
              style={{ background: "rgba(36,114,200,.22)", border: "1px solid rgba(36,114,200,.45)" }}
            >
              <Building2 size={15} style={{ color: "#5aa3e8" }} />
            </div>
            <p className="font-mono font-bold uppercase mb-[2px]" style={{ fontSize: 7, letterSpacing: "0.18em", color: "rgba(122,180,238,.65)" }}>
              OWNED BY
            </p>
            <p className="font-outfit font-black" style={{ fontSize: 17, color: "#EAF2FC", letterSpacing: "-0.025em" }}>
              SynAck Solutions
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {SUMMARY.map((row) => (
              <div
                key={row.num}
                className="bg-white border border-border-light rounded-xl p-3 flex flex-col gap-1"
              >
                <span className="font-mono text-[9px] font-bold text-accent tracking-[0.06em]">{row.num}</span>
                <p className="font-outfit font-extrabold text-[12px] text-text-heading leading-[1.3]" style={{ letterSpacing: "-0.01em" }}>
                  {row.title}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
