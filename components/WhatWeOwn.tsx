"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Eyebrow from "@/components/Eyebrow";

const EASE = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    num: "01",
    name: "Managed IT & Infrastructure",
    tag: "Foundation",
    color: "#2472C8",
    description:
      "The foundation that keeps the business running. From help desk to network to disaster recovery — we own the stack.",
    bullets: [
      "Managed IT & Help Desk",
      "Microsoft 365 & Cloud",
      "Network Infrastructure — Wi-Fi, firewalls, switching, VPN",
      "IT Asset Procurement & Lifecycle",
      "Backup & Disaster Recovery",
      "Audio/Visual & Conference Rooms",
      "Office Build-Outs & Relocations",
    ],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=90",
  },
  {
    num: "02",
    name: "Cybersecurity",
    tag: "Protection",
    color: "#E84040",
    description:
      "Identity-first security built around Microsoft 365, Conditional Access, MFA, and device trust.",
    bullets: [
      "Managed Detection & Response (MDR)",
      "Endpoint Security (EDR)",
      "Email Security",
      "Vulnerability Management & Pen Testing",
      "Security Awareness Training",
      "Physical Security — Rhombus cameras, Brivo access",
    ],
    img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1400&q=90",
  },
  {
    num: "03",
    name: "Compliance & Risk",
    tag: "Governance",
    color: "#F59E0B",
    description:
      "Compliance readiness and technical controls support — HIPAA, SOC 2, and NIST CSF as frameworks, not promises.",
    bullets: [
      "Compliance Readiness & Gap Assessments",
      "Technical Controls Implementation",
      "Risk Assessments",
      "Policy Development & Documentation",
      "Audit Support & Evidence Collection",
    ],
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=90",
  },
  {
    num: "04",
    name: "Modern Workplace & Identity",
    tag: "Productivity",
    color: "#22A05A",
    description:
      "Productivity, governance, and access lifecycle across the Microsoft ecosystem.",
    bullets: [
      "Microsoft 365 Governance",
      "Identity Governance & Lifecycle — JML automation",
      "Microsoft 365 Copilot Readiness",
      "Data Protection — Purview, classification, labeling",
      "Secure Collaboration",
      "Access Reviews",
    ],
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=90",
  },
];

export default function WhatWeOwn() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  /*
   * Map scroll progress so the fill line reaches each dot center at the exact
   * moment the active index flips (every 25% of scroll).
   * With w-10 dots and gap-10 spacing, dot centers fall at 0, 1/3, 2/3, 1
   * of the total line height.
   */
  const lineScaleY = useTransform(
    smooth,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1 / 3, 2 / 3, 1, 1],
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIdx(Math.min(3, Math.floor(v * 4)));
  });

  return (
    <>
      {/* ── Desktop: scroll-driven sticky layout ── */}
      <div
        ref={containerRef}
        className="hidden lg:block"
        style={{ height: "400vh" }}
      >
        <section className="sticky top-0 h-screen bg-bg-page overflow-hidden flex">

          {/* ── Left: timeline ── */}
          <div className="flex flex-col justify-center pl-[max(40px,calc(50vw-560px))] pr-10 w-[380px] flex-shrink-0">

            <div className="mb-10">
              <Eyebrow>What We Run</Eyebrow>
              <h2
                className="font-outfit font-black text-text-heading"
                style={{
                  fontSize: "clamp(26px,3vw,40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                }}
              >
                This is what we<br />take responsibility for.
              </h2>
            </div>

            {/* Timeline dots + line */}
            <div className="relative">
              {/* Static background line */}
              <div className="absolute left-[19px] top-[20px] bottom-[20px] w-[2px] bg-border-light rounded-full" />

              {/* Animated fill line */}
              <motion.div
                className="absolute left-[19px] top-[20px] w-[2px] bg-accent rounded-full origin-top"
                style={{
                  height: "calc(100% - 40px)",
                  scaleY: lineScaleY,
                }}
              />

              <div className="flex flex-col gap-10 relative z-10">
                {services.map((svc, i) => (
                  <div key={svc.num} className="flex items-center gap-5">
                    {/* Dot */}
                    <div
                      className={[
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2",
                        "transition-all duration-500",
                        i === activeIdx
                          ? "bg-primary border-primary scale-110 ring-4 ring-accent/20"
                          : i < activeIdx
                          ? "bg-accent border-accent"
                          : "bg-white border-border-light",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "font-outfit text-[13px] font-black transition-colors duration-300",
                          i <= activeIdx ? "text-white" : "text-text-muted",
                        ].join(" ")}
                      >
                        {svc.num}
                      </span>
                    </div>

                    {/* Label */}
                    <div>
                      <p
                        className={[
                          "text-[10px] font-bold tracking-[0.1em] uppercase mb-0.5 transition-colors duration-300",
                          i === activeIdx ? "text-accent" : "text-text-muted/50",
                        ].join(" ")}
                      >
                        {svc.tag}
                      </p>
                      <p
                        className={[
                          "font-outfit font-extrabold text-[14px] leading-[1.25] transition-colors duration-300",
                          i === activeIdx ? "text-text-heading" : "text-text-muted/50",
                        ].join(" ")}
                      >
                        {svc.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: active card ── */}
          <div className="flex-1 flex items-center py-8 pr-[max(40px,calc(50vw-560px))] pl-6">
            <div className="relative w-full h-full rounded-[28px] overflow-hidden">
              {services.map((svc, i) => {
                const isActive = i === activeIdx;
                return (
                  <motion.div
                    key={svc.num}
                    className="absolute inset-0 rounded-[28px] overflow-hidden"
                    animate={{
                      opacity: isActive ? 1 : 0.18,
                      scale: isActive ? 1 : 0.97,
                      filter: isActive ? "blur(0px)" : "blur(2px)",
                    }}
                    transition={{ duration: 0.55, ease: EASE }}
                    style={{ zIndex: isActive ? 2 : 1 }}
                  >
                    {/* Photo */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${svc.img}')` }}
                    />

                    {/* Dark overlays */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(6,12,24,0.45)] to-[rgba(6,12,24,0.88)]" />
                    <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-[rgba(6,12,24,1)] to-transparent" />

                    {/* Glow border */}
                    <motion.div
                      className="absolute inset-0 rounded-[28px] pointer-events-none"
                      animate={{
                        boxShadow: isActive
                          ? `inset 0 0 0 1.5px ${svc.color}55, 0 0 80px ${svc.color}25`
                          : "inset 0 0 0 0px transparent, 0 0 0px transparent",
                      }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-10">
                      {/* Tag pill */}
                      <span
                        className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] uppercase mb-5 self-start px-3 py-1.5 rounded-full"
                        style={{
                          background: `${svc.color}20`,
                          border: `1px solid ${svc.color}44`,
                          color: svc.color,
                        }}
                      >
                        <span
                          className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                          style={{ background: svc.color }}
                        />
                        {svc.tag}
                      </span>

                      {/* Service name */}
                      <h3
                        className="font-outfit font-black text-white mb-3"
                        style={{
                          fontSize: "clamp(28px,3.2vw,48px)",
                          letterSpacing: "-0.03em",
                          lineHeight: 1.05,
                        }}
                      >
                        {svc.name}
                      </h3>

                      {/* Description */}
                      <p className="text-[15px] text-white/65 leading-[1.65] mb-7 max-w-[52ch]">
                        {svc.description}
                      </p>

                      {/* Bullet grid */}
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                        {svc.bullets.map((b) => (
                          <div key={b} className="flex items-start gap-2.5">
                            <span
                              className="w-[5px] h-[5px] rounded-full mt-[7px] flex-shrink-0"
                              style={{ background: svc.color }}
                            />
                            <span className="text-[13px] text-white/55 leading-[1.5]">
                              {b}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </section>
      </div>

      {/* ── Mobile: stacked cards ── */}
      <section className="lg:hidden bg-bg-page py-16 px-5">
        <div className="mb-10">
          <Eyebrow>What We Run</Eyebrow>
          <h2
            className="font-outfit font-black text-text-heading"
            style={{ fontSize: "clamp(28px,7vw,40px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
          >
            This is what we<br />take responsibility for.
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {services.map((svc) => (
            <div
              key={svc.num}
              className="relative rounded-[20px] overflow-hidden h-[280px]"
              style={{ boxShadow: `0 8px 32px ${svc.color}22` }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${svc.img}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(6,12,24,0.45)] to-[rgba(6,12,24,0.92)]" />
              <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-[rgba(6,12,24,1)] to-transparent" />
              <div
                className="absolute inset-0 rounded-[20px]"
                style={{ border: `1.5px solid ${svc.color}44` }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span
                  className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.12em] uppercase mb-3 self-start px-2.5 py-1 rounded-full"
                  style={{
                    background: `${svc.color}20`,
                    border: `1px solid ${svc.color}44`,
                    color: svc.color,
                  }}
                >
                  {svc.tag}
                </span>
                <p
                  className="font-outfit font-black text-white mb-2"
                  style={{ fontSize: 22, letterSpacing: "-0.025em", lineHeight: 1.1 }}
                >
                  {svc.name}
                </p>
                <p className="text-[13px] text-white/60 leading-[1.55]">{svc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
