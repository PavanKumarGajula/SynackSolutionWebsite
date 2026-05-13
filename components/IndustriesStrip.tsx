"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import {
  IconBuildingFactory2,
  IconHeartbeat,
  IconHammer,
  IconSchool,
  IconBriefcase,
  IconCoin,
  IconBuilding,
  IconBuildingBank,
  IconShoppingBag,
  IconArrowRight,
} from "@tabler/icons-react";

// 9 industries in a symmetric dome arc.
// x: evenly spaced 7.5%→92.5% (≈97px apart in a 920px container, ~30px gap between 68px icons)
// y: sin curve — lowest at edges (55%), highest at centre (17%)
const INDUSTRIES = [
  { name: "Manufacturing",         icon: IconBuildingFactory2, color: "#2472C8", x:  7.5, y: 55, fd: 0.0, dd: 3.8 },
  { name: "Healthcare",            icon: IconHeartbeat,        color: "#22A05A", x: 18,   y: 40, fd: 0.7, dd: 4.2 },
  { name: "Construction",          icon: IconHammer,           color: "#D97706", x: 29,   y: 28, fd: 0.3, dd: 3.6 },
  { name: "Education",             icon: IconSchool,           color: "#7C3AED", x: 39,   y: 20, fd: 1.0, dd: 4.5 },
  { name: "Professional Services", icon: IconBriefcase,        color: "#F59E0B", x: 50,   y: 17, fd: 0.5, dd: 3.4 },
  { name: "Finance",               icon: IconCoin,             color: "#E84040", x: 61,   y: 20, fd: 0.2, dd: 4.0 },
  { name: "SMB",                   icon: IconBuilding,         color: "#0891B2", x: 71,   y: 28, fd: 0.8, dd: 3.7 },
  { name: "Government",            icon: IconBuildingBank,     color: "#059669", x: 82,   y: 40, fd: 0.4, dd: 4.3 },
  { name: "Retail",                icon: IconShoppingBag,      color: "#DB2777", x: 92.5, y: 55, fd: 0.9, dd: 3.9 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Laptop centre inside the 920×580 scene (bottom:50px, laptop h≈163px at 260px wide)
const SCENE_W = 920;
const SCENE_H = 580;
const LAPTOP_X = 50;  // % — horizontally centred
const LAPTOP_Y = 78;  // % — (580 - 50 - 81) / 580

export default function IndustriesStrip() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { once: true, amount: 0.4 });

  return (
    <section className="relative bg-bg-page overflow-hidden">
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(36,114,200,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, black 0%, transparent 100%)",
        }}
      />

      {/* Heading */}
      <div className="relative z-10 max-w-site mx-auto px-5 lg:px-10 pt-20 pb-4 text-center">
        <Eyebrow className="justify-center">Who We Serve</Eyebrow>
        <h2
          className="font-outfit font-black text-text-heading"
          style={{
            fontSize: "clamp(26px, 3.6vw, 44px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
          }}
        >
          Industries we protect{" "}
          <em className="not-italic text-accent">every day</em>
        </h2>
        <p
          className="mt-4 mx-auto text-text-body max-w-[42ch]"
          style={{ fontSize: 16, lineHeight: 1.7 }}
        >
          Purpose-built IT and security programs for the sectors we know from the inside out.
        </p>
      </div>

      {/* ── Desktop arc scene ── */}
      <div
        ref={sceneRef}
        className="hidden lg:block relative mx-auto"
        style={{ maxWidth: 920, height: 580 }}
      >
        {/* MSP Laptop */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 260,
          }}
        >
          {/* Ambient glow beneath */}
          <div style={{
            position: "absolute",
            bottom: -18,
            left: "50%",
            transform: "translateX(-50%)",
            width: 340,
            height: 56,
            background: "radial-gradient(ellipse at center, rgba(36,114,200,0.22) 0%, transparent 70%)",
            borderRadius: "50%",
          }} />

          <svg viewBox="0 0 320 206" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
            <defs>
              <linearGradient id="ind-lid" x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="#223C68" />
                <stop offset="45%" stopColor="#122444" />
                <stop offset="100%" stopColor="#0C1A32" />
              </linearGradient>
              <linearGradient id="ind-base" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1A2E4E" />
                <stop offset="100%" stopColor="#0C1828" />
              </linearGradient>
              <linearGradient id="ind-disp" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0A1828" />
                <stop offset="100%" stopColor="#040A14" />
              </linearGradient>
              <linearGradient id="ind-glare" x1="0%" y1="0%" x2="60%" y2="60%">
                <stop offset="0%" stopColor="white" stopOpacity="0.055" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="ind-hinge" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0A1420" />
                <stop offset="100%" stopColor="#060E18" />
              </linearGradient>
              <filter id="ind-shadow" x="-15%" y="-10%" width="130%" height="150%">
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#030810" floodOpacity="0.65" />
              </filter>
            </defs>

            {/* ── LID / SCREEN ── */}
            <rect x="8" y="0" width="304" height="174" rx="13" fill="url(#ind-lid)" filter="url(#ind-shadow)" />

            {/* Top-edge chamfer highlight */}
            <path d="M21 0.6 L299 0.6 Q311.4 0.6 311.4 13 L311.4 7 Q311.4 0.6 305 0.6 Z" fill="rgba(255,255,255,0.09)" />
            <line x1="21" y1="0.6" x2="299" y2="0.6" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
            {/* Left-edge highlight */}
            <line x1="8.4" y1="13" x2="8.4" y2="161" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />

            {/* Camera */}
            <circle cx="160" cy="8.5" r="2.8" fill="#060C18" />
            <circle cx="160" cy="8.5" r="1.3" fill="#182438" />
            <circle cx="159.3" cy="7.8" r="0.55" fill="rgba(255,255,255,0.18)" />

            {/* Screen display area — thin bezels, thicker chin */}
            <rect x="14" y="14" width="292" height="144" rx="3" fill="url(#ind-disp)" />
            {/* Glare */}
            <rect x="14" y="14" width="292" height="144" rx="3" fill="url(#ind-glare)" />

            {/* ── TITLE BAR ── */}
            <rect x="14" y="14" width="292" height="24" rx="3" fill="#0C1E38" />
            <rect x="14" y="37" width="292" height="0.75" fill="rgba(36,114,200,0.22)" />
            {/* Window controls */}
            <circle cx="27" cy="26" r="4" fill="#FF5F57" />
            <circle cx="39" cy="26" r="4" fill="#FEBC2E" />
            <circle cx="51" cy="26" r="4" fill="#28C840" />
            {/* Title — centred */}
            <text x="160" y="30" fontFamily="DM Sans, sans-serif" fontSize="7.5" fontWeight="700" fill="#7AB4EE" letterSpacing="2" textAnchor="middle">SYNACK · OPS CENTER</text>
            {/* Live */}
            <circle cx="298" cy="26" r="3.2" fill="#22A05A" />
            <text x="291" y="30" fontFamily="DM Sans, sans-serif" fontSize="6.5" fontWeight="700" fill="#22A05A" textAnchor="end">LIVE</text>

            {/* ── SIDEBAR ── */}
            <rect x="14" y="38" width="30" height="120" fill="#080F1C" />
            <rect x="44" y="38" width="0.75" fill="rgba(36,114,200,0.14)" height="120" />
            {/* Nav dots */}
            {[54, 70, 86, 102, 118].map((cy, i) => (
              <circle key={cy} cx="29" cy={cy} r={i === 0 ? 4.5 : 3} fill={i === 0 ? "#2472C8" : "rgba(122,180,238,0.2)"} />
            ))}

            {/* ── CLIENT ROWS ── */}
            {/* Row 1 — Healthcare */}
            <circle cx="57" cy="51" r="3.5" fill="#22A05A" />
            <text x="67" y="55" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="600" fill="#D8E8F8">Healthcare</text>
            <rect x="172" y="44.5" width="52" height="14" rx="4" fill="rgba(34,160,90,0.14)" stroke="rgba(34,160,90,0.28)" strokeWidth="0.6" />
            <text x="198" y="55" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="700" fill="#22A05A" textAnchor="middle">MDR · ACTIVE</text>
            <text x="306" y="55" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="600" fill="#4A80BE" textAnchor="end">99.9%</text>
            <rect x="45" y="62" width="261" height="0.5" fill="rgba(36,114,200,0.09)" />

            {/* Row 2 — Manufacturing */}
            <circle cx="57" cy="73" r="3.5" fill="#22A05A" />
            <text x="67" y="77" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="600" fill="#D8E8F8">Manufacturing</text>
            <rect x="172" y="66.5" width="56" height="14" rx="4" fill="rgba(36,114,200,0.14)" stroke="rgba(36,114,200,0.28)" strokeWidth="0.6" />
            <text x="200" y="77" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="700" fill="#2472C8" textAnchor="middle">OT · SECURED</text>
            <text x="306" y="77" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="600" fill="#4A80BE" textAnchor="end">100%</text>
            <rect x="45" y="84" width="261" height="0.5" fill="rgba(36,114,200,0.09)" />

            {/* Row 3 — Construction */}
            <circle cx="57" cy="95" r="3.5" fill="#22A05A" />
            <text x="67" y="99" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="600" fill="#D8E8F8">Construction</text>
            <rect x="172" y="88.5" width="48" height="14" rx="4" fill="rgba(34,160,90,0.14)" stroke="rgba(34,160,90,0.28)" strokeWidth="0.6" />
            <text x="196" y="99" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="700" fill="#22A05A" textAnchor="middle">VPN · LIVE</text>
            <text x="306" y="99" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="600" fill="#4A80BE" textAnchor="end">98.7%</text>
            <rect x="45" y="106" width="261" height="0.5" fill="rgba(36,114,200,0.09)" />

            {/* Row 4 — SMB */}
            <circle cx="57" cy="117" r="3.5" fill="#22A05A" />
            <text x="67" y="121" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="600" fill="#D8E8F8">SMB</text>
            <rect x="172" y="110.5" width="52" height="14" rx="4" fill="rgba(34,160,90,0.14)" stroke="rgba(34,160,90,0.28)" strokeWidth="0.6" />
            <text x="198" y="121" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="700" fill="#22A05A" textAnchor="middle">M365 · LIVE</text>
            <text x="306" y="121" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="600" fill="#4A80BE" textAnchor="end">99.5%</text>
            <rect x="45" y="128" width="261" height="0.5" fill="rgba(36,114,200,0.09)" />

            {/* Row 5 — Finance */}
            <circle cx="57" cy="139" r="3.5" fill="#22A05A" />
            <text x="67" y="143" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="600" fill="#D8E8F8">Finance</text>
            <rect x="172" y="132.5" width="52" height="14" rx="4" fill="rgba(36,114,200,0.14)" stroke="rgba(36,114,200,0.28)" strokeWidth="0.6" />
            <text x="198" y="143" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="700" fill="#2472C8" textAnchor="middle">SOC · ACTIVE</text>
            <text x="306" y="143" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="600" fill="#4A80BE" textAnchor="end">99.1%</text>

            {/* ── FOOTER STATUS BAR ── */}
            <rect x="14" y="149" width="292" height="9" fill="rgba(6,12,24,0.7)" />
            <rect x="14" y="149" width="292" height="0.6" fill="rgba(36,114,200,0.18)" />
            <circle cx="21" cy="153.5" r="2.2" fill="#22A05A" />
            <text x="27" y="157" fontFamily="DM Sans, sans-serif" fontSize="6.5" fontWeight="600" fill="#4A80BE">9 clients · 847 endpoints · 99.8% uptime</text>
            <text x="306" y="157" fontFamily="DM Sans, sans-serif" fontSize="6.5" fontWeight="700" fill="#3D8FE0" textAnchor="end">↗ 12:41</text>

            {/* ── HINGE ── */}
            <rect x="6" y="175" width="308" height="6" rx="1" fill="url(#ind-hinge)" />
            <rect x="6" y="175" width="308" height="1" fill="rgba(255,255,255,0.045)" />
            <rect x="6" y="180" width="308" height="0.5" fill="rgba(0,0,0,0.4)" />

            {/* ── KEYBOARD BASE ── */}
            <rect x="0" y="181" width="320" height="25" rx="9" fill="url(#ind-base)" />
            <rect x="0" y="181" width="320" height="25" rx="9" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
            {/* Top edge shine */}
            <path d="M9 181 L311 181" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
            {/* Keyboard rows */}
            <g fill="rgba(122,180,238,0.1)">
              {[14,28,42,56,70,84,98,112,126,140,154,168,182,196,210].map(x => (
                <rect key={x} x={x} y={184} width="11" height="5" rx="1.5" />
              ))}
              {[20,34,48,62,76,90,104,118,132,146,160,174,188,202].map(x => (
                <rect key={x} x={x} y={191} width="11" height="5" rx="1.5" />
              ))}
            </g>
            {/* Trackpad */}
            <rect x="128" y={184} width="64" height="18" rx="5.5" fill="rgba(255,255,255,0.03)" stroke="rgba(122,180,238,0.18)" strokeWidth="0.75" />
          </svg>
        </div>

        {/* Industry cards — fly out from laptop screen on scroll */}
        {INDUSTRIES.map((ind, i) => {
          const Icon = ind.icon;
          // Offset from each card's final position back to the laptop centre
          const ox = (LAPTOP_X - ind.x) / 100 * SCENE_W;
          const oy = (LAPTOP_Y - ind.y) / 100 * SCENE_H;
          return (
            <div
              key={ind.name}
              className="absolute"
              style={{
                left: `${ind.x}%`,
                top: `${ind.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Entry: flies from laptop centre to arc position */}
              <motion.div
                initial={{ x: ox, y: oy, opacity: 0, scale: 0.25 }}
                animate={inView
                  ? { x: 0, y: 0, opacity: 1, scale: 1 }
                  : { x: ox, y: oy, opacity: 0, scale: 0.25 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.72, ease: EASE }}
              >
                {/* Continuous float after landing */}
                <motion.div
                  animate={inView ? { y: [0, -10, 0] } : {}}
                  transition={{
                    duration: ind.dd,
                    delay: 0.5 + i * 0.08 + 0.72 + ind.fd,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col items-center gap-2.5"
                >
                  <div
                    className="relative flex items-center justify-center"
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 16,
                      background: "white",
                      border: `1.5px solid ${ind.color}28`,
                      boxShadow: [
                        "0 0 0 1px rgba(255,255,255,0.9) inset",
                        `0 8px 28px ${ind.color}22`,
                        "0 2px 8px rgba(16,35,71,0.06)",
                      ].join(", "),
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-[16px] pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 38% 30%, ${ind.color}10 0%, transparent 65%)`,
                      }}
                    />
                    <Icon size={28} color={ind.color} stroke={1.5} />
                  </div>
                  <span
                    className="text-center font-semibold text-text-muted leading-tight"
                    style={{ fontSize: 11, maxWidth: 82 }}
                  >
                    {ind.name}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile: pill grid ── */}
      <div className="lg:hidden flex flex-wrap justify-center gap-2.5 px-5 py-10">
        {INDUSTRIES.map((ind) => {
          const Icon = ind.icon;
          return (
            <div
              key={ind.name}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border"
              style={{ borderColor: `${ind.color}30` }}
            >
              <Icon size={15} color={ind.color} stroke={1.5} />
              <span className="text-[12.5px] font-semibold text-text-body">
                {ind.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="relative z-10 text-center -mt-14 lg:-mt-16 pb-8 lg:pb-10">
        <Link
          href="/industries"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold text-[14px] transition-colors duration-150"
        >
          Explore all industries
          <IconArrowRight size={15} stroke={2} />
        </Link>
      </div>
    </section>
  );
}
