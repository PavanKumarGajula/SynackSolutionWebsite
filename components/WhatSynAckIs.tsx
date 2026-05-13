"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  IconCloud,
  IconVideo,
  IconServer,
  IconRouter,
  IconDeviceLaptop,
  IconFingerprint,
} from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Nodes: SVG coords (640×580 viewBox) + icon + label ── */
const NODES = [
  { icon: IconCloud,        label: "Cloud",     cx: 320, cy: 52,  delay: 0.30 },
  { icon: IconVideo,        label: "Security",  cx: 82,  cy: 92,  delay: 0.38 },
  { icon: IconServer,       label: "Servers",   cx: 516, cy: 168, delay: 0.46 },
  { icon: IconRouter,       label: "Network",   cx: 554, cy: 248, delay: 0.54 },
  { icon: IconDeviceLaptop, label: "Endpoints", cx: 140, cy: 420, delay: 0.62 },
  { icon: IconFingerprint,  label: "Identity",  cx: 558, cy: 394, delay: 0.70 },
];

/* ── Connection paths — each starts at node center, ends at hub (320,290) ── */
const PATHS = [
  "M 320 52  Q 320 170 320 290",
  "M 82  92  Q 200 190 320 290",
  "M 516 168 Q 415 225 320 290",
  "M 554 248 Q 438 268 320 290",
  "M 140 420 Q 228 355 320 290",
  "M 558 394 Q 438 342 320 290",
];

const ACCENT = "#2472C8";

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

      <div className="max-w-site mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-16 items-center">

        {/* ══ LEFT — Text ══ */}
        <div style={{ maxWidth: 520 }}>

          <motion.div className="flex items-center gap-2.5 mb-7" {...textAnim(0.15)}>
            <span className="w-6 h-[2px] bg-accent rounded-full flex-shrink-0" />
            <span className="font-mono text-[11px] font-bold tracking-[0.17em] uppercase text-accent">
              What SynAck Is
            </span>
          </motion.div>

          <motion.h2
            className="font-outfit font-black text-text-heading mb-7 text-balance"
            style={{ fontSize: "clamp(36px,4.5vw,56px)", letterSpacing: "-0.04em", lineHeight: 1.02 }}
            {...textAnim(0.3)}
          >
            Your business is the priority.{" "}
            <em className="not-italic text-accent">Your IT shouldn&apos;t compete with it.</em>
          </motion.h2>

          <motion.p
            className="text-text-muted leading-[1.7]"
            style={{ fontSize: "clamp(16px,1.5vw,18px)" }}
            {...textAnim(0.5)}
          >
            Most businesses lose ten hours a week to IT — fighting fires, chasing vendors,
            second-guessing whether things are secure.
            That&apos;s not your job. It&apos;s ours.
          </motion.p>

        </div>

        {/* ══ RIGHT — Illustration (desktop) ══ */}
        <motion.div
          className="relative hidden lg:block w-full mx-auto"
          style={{ maxWidth: 580, aspectRatio: "640 / 580" }}
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced ? {} : (inView ? { opacity: 1 } : {})}
          transition={{ duration: 0.5, delay: 0.1 }}
        >

          {/* ── SVG: frame + grid + connection lines ── */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 640 580"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="wsa-bg" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="#EEF5FD" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#F4F7FB" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Frame */}
            <rect x="30" y="46" width="580" height="488" rx="20"
              fill="url(#wsa-bg)" stroke="#B8D4F7" strokeWidth="1.5" />

            {/* Grid lines */}
            <line x1="30" y1="100" x2="610" y2="100"
              stroke="#B8D4F7" strokeWidth="1" strokeDasharray="3 7" opacity="0.5" />
            <line x1="30" y1="458" x2="610" y2="458"
              stroke="#B8D4F7" strokeWidth="1" opacity="0.4" />
            <line x1="213" y1="100" x2="213" y2="458"
              stroke="#B8D4F7" strokeWidth="1" strokeDasharray="3 7" opacity="0.3" />
            <line x1="427" y1="100" x2="427" y2="458"
              stroke="#B8D4F7" strokeWidth="1" strokeDasharray="3 7" opacity="0.3" />

            {/* Subtle hub rings */}
            <motion.circle cx="320" cy="290" r="56" fill="none"
              stroke={`${ACCENT}10`} strokeWidth="1"
              initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            />
            <motion.circle cx="320" cy="290" r="80" fill="none"
              stroke={`${ACCENT}07`} strokeWidth="1"
              initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.32 }}
            />

            {/* Connection lines — draw on scroll */}
            {PATHS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke={`${ACCENT}22`}
                strokeWidth="1.5"
                strokeDasharray="5 9"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.9, delay: NODES[i].delay, ease: EASE }}
              />
            ))}
          </svg>

          {/* ── Node cards ── */}
          {NODES.map((node, i) => {
            const left = (node.cx / 640) * 100;
            const top  = (node.cy / 580) * 100;
            return (
              <motion.div
                key={node.label}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top:  `${top}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                }}
                initial={reduced ? false : { opacity: 0, scale: 0.75 }}
                animate={reduced ? {} : (inView ? { opacity: 1, scale: 1 } : {})}
                transition={{ duration: 0.5, delay: node.delay + 0.05, ease: EASE }}
              >
                {/* Pulse ring */}
                {!reduced && (
                  <motion.div
                    className="absolute pointer-events-none rounded-[18px]"
                    style={{ inset: -5 }}
                    animate={{
                      boxShadow: [
                        `0 0 0 0px ${ACCENT}28`,
                        `0 0 0 10px ${ACCENT}00`,
                      ],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: i * 0.38,
                      ease: "easeOut",
                    }}
                  />
                )}

                {/* Card */}
                <div
                  className="flex flex-col items-center gap-1.5 bg-white rounded-[14px] border border-border-light px-3 py-2.5"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(10,22,40,.05), 0 4px 16px rgba(10,22,40,.09), 0 8px 24px rgba(10,22,40,.06)",
                    minWidth: 76,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-[9px] flex items-center justify-center"
                    style={{
                      background: `${ACCENT}12`,
                      border: `1px solid ${ACCENT}28`,
                    }}
                  >
                    <node.icon size={16} stroke={1.6} color={ACCENT} />
                  </div>
                  <span className="text-[9px] font-semibold text-text-muted whitespace-nowrap tracking-[0.04em]">
                    {node.label}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* ── Hub badge ── */}
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
              initial={reduced ? false : { opacity: 0, scale: 0.8 }}
              animate={reduced ? {} : (inView ? { opacity: 1, scale: 1 } : {})}
              transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
            >
              {/* Pulse rings */}
              {!reduced && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-[20px] pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(36,114,200,.22)",
                        "0 0 0 20px rgba(36,114,200,0)",
                      ],
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-[20px] pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(36,114,200,.12)",
                        "0 0 0 36px rgba(36,114,200,0)",
                      ],
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                  />
                </>
              )}

              {/* Badge */}
              <motion.div
                animate={reduced ? {} : { y: [0, -5, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-[20px] overflow-hidden text-center"
                style={{
                  background: "linear-gradient(150deg, #132b52 0%, #091428 100%)",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,.07) inset, 0 0 0 1px rgba(36,114,200,.18), 0 28px 64px rgba(9,20,40,.65), 0 6px 20px rgba(9,20,40,.45)",
                  padding: "16px 26px",
                  minWidth: 136,
                }}
              >
                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 pointer-events-none"
                  style={{
                    width: 110, height: 110,
                    background: "radial-gradient(circle at top right, rgba(36,114,200,.32), transparent 65%)",
                  }}
                />

                {/* Shield icon */}
                <div
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center mx-auto mb-2.5 relative"
                  style={{
                    background: "rgba(36,114,200,.18)",
                    border: "1px solid rgba(36,114,200,.42)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#60a5e8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L3 6.5V12c0 5.25 4 9 9 10 5-1 9-4.75 9-10V6.5L12 2Z"/>
                    <polyline points="9,12 11,14 15,10"/>
                  </svg>
                </div>

                <p
                  className="relative font-mono font-bold uppercase"
                  style={{ fontSize: 7, letterSpacing: "0.22em", color: "rgba(122,180,238,.5)", marginBottom: 3 }}
                >
                  OWNED BY
                </p>
                <p
                  className="relative font-outfit font-black leading-none"
                  style={{ fontSize: 18, color: "#EAF2FC", letterSpacing: "-0.025em" }}
                >
                  SynAck
                </p>
                <p
                  className="relative font-mono font-bold uppercase"
                  style={{ fontSize: 7, letterSpacing: "0.12em", color: "rgba(122,180,238,.32)", marginTop: 3 }}
                >
                  Solutions
                </p>
              </motion.div>
            </motion.div>
          </div>

        </motion.div>

        {/* ══ RIGHT — Mobile ══ */}
        <motion.div
          className="lg:hidden flex flex-col items-center w-full max-w-[320px] mx-auto"
          {...textAnim(0.15)}
        >
          <div
            className="relative rounded-[18px] overflow-hidden text-center px-8 py-6 w-full"
            style={{
              background: "linear-gradient(150deg, #132b52 0%, #091428 100%)",
              boxShadow: "0 16px 48px rgba(9,20,40,.35)",
            }}
          >
            <div
              className="w-10 h-10 rounded-[11px] flex items-center justify-center mx-auto mb-3"
              style={{ background: "rgba(36,114,200,.18)", border: "1px solid rgba(36,114,200,.42)" }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="#60a5e8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L3 6.5V12c0 5.25 4 9 9 10 5-1 9-4.75 9-10V6.5L12 2Z"/>
                <polyline points="9,12 11,14 15,10"/>
              </svg>
            </div>
            <p className="font-mono font-bold uppercase mb-1" style={{ fontSize: 7.5, letterSpacing: "0.2em", color: "rgba(122,180,238,.55)" }}>
              OWNED BY
            </p>
            <p className="font-outfit font-black leading-none" style={{ fontSize: 20, color: "#EAF2FC", letterSpacing: "-0.025em" }}>
              SynAck Solutions
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
