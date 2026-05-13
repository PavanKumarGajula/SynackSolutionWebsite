"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Eyebrow from "@/components/Eyebrow";
import { IconArrowRight } from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const BRANCHES = [
  {
    id: "managed-it",
    icon: "ti-flame",
    pain: "\"Things keep breaking and no one owns it.\"",
    context: "Reactive fixes, no documentation, vendor chaos",
    tag: "Start here",
    name: "Managed IT & Help Desk",
  },
  {
    id: "cybersecurity",
    icon: "ti-shield-exclamation",
    pain: "\"We're not sure if we're actually secure.\"",
    context: "No MFA, unpatched systems, no incident plan",
    tag: "Add second",
    name: "Cybersecurity",
  },
  {
    id: "m365",
    icon: "ti-folder-x",
    pain: "\"Our Microsoft 365 is a mess nobody manages.\"",
    context: "Stale accounts, shared mailboxes, no governance",
    tag: "Fastest win",
    name: "Microsoft 365 & Cloud",
  },
];

interface Props {
  onSelect: (id: string) => void;
}

export default function WhereToBegin({ onSelect }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [svgReady, setSvgReady] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setSvgReady(true), 400);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-bg-page">
      <div className="max-w-site mx-auto px-5 lg:px-10">

        {/* Header */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <Eyebrow>Where To Begin</Eyebrow>
          <h2
            className="font-outfit font-black text-text-heading mb-3 text-balance"
            style={{ fontSize: "clamp(28px,3.5vw,46px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            We don&apos;t start with a sales pitch.{" "}
            <em className="not-italic" style={{ color: "#2472C8" }}>We start with what hurts.</em>
          </h2>
          <p className="text-text-muted" style={{ fontSize: "clamp(14px,1.2vw,16px)", maxWidth: 520 }}>
            Tell us your biggest pain point. We&apos;ll show you exactly which service solves it, and what order to add the rest.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start">

          {/* ── Left: Question card ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
            className="relative rounded-[22px] overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #102347 0%, #0d1d3a 60%, #091428 100%)",
              boxShadow: "0 20px 60px rgba(16,35,71,.35)",
              animation: inView ? "questionGlow 3s ease-in-out infinite" : "none",
            }}
          >
            {/* Subtle grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* Accent glow top-right */}
            <div
              className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
              style={{ background: "radial-gradient(circle at 80% 20%, rgba(36,114,200,.18) 0%, transparent 65%)" }}
            />

            <div className="relative z-10 p-8">
              {/* Pill tag */}
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase mb-6 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(36,114,200,.18)", color: "#7ab8f5", border: "1px solid rgba(36,114,200,.3)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2472C8]" />
                Diagnostic
              </span>

              <h3
                className="font-outfit font-black mb-4"
                style={{ fontSize: "clamp(22px,2vw,28px)", color: "#EAF2FC", letterSpacing: "-0.025em", lineHeight: 1.15 }}
              >
                What hurts <em style={{ fontStyle: "italic", color: "#7ab8f5" }}>most</em> right now?
              </h3>

              <p className="mb-8 leading-[1.7]" style={{ fontSize: 14, color: "rgba(234,242,252,.6)" }}>
                Pick the problem that keeps you up at night. Each answer maps to a specific service and a clear starting point.
              </p>

              {/* Stats row */}
              <div className="flex gap-6 mb-8">
                <div>
                  <div className="font-outfit font-black text-[26px] text-[#EAF2FC]" style={{ letterSpacing: "-0.04em" }}>10+</div>
                  <div className="text-[11px] font-medium" style={{ color: "rgba(234,242,252,.45)" }}>areas managed</div>
                </div>
                <div style={{ width: 1, background: "rgba(255,255,255,.1)" }} />
                <div>
                  <div className="font-outfit font-black text-[26px] text-[#EAF2FC]" style={{ letterSpacing: "-0.04em" }}>2–3</div>
                  <div className="text-[11px] font-medium" style={{ color: "rgba(234,242,252,.45)" }}>where most start</div>
                </div>
              </div>

              {/* Pulsing arrow */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "#2472C8",
                    animation: "arrowPulse 2s ease-in-out infinite",
                    color: "#EAF2FC",
                  }}
                >
                  <IconArrowRight size={16} stroke={2} />
                </div>
                <span className="text-[13.5px] font-semibold" style={{ color: "rgba(234,242,252,.55)" }}>
                  Choose the pain that fits
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Branch cards ── */}
          <div className="relative">

            {/* SVG connector lines (desktop only) */}
            <svg
              className="absolute left-0 top-0 w-full h-full pointer-events-none hidden lg:block"
              style={{ overflow: "visible", zIndex: 0 }}
              aria-hidden="true"
            >
              {svgReady && BRANCHES.map((_, i) => {
                const cardH = 96;
                const gap = 16;
                const y = i * (cardH + gap) + cardH / 2;
                return (
                  <path
                    key={i}
                    d={`M -20 ${y} C -40 ${y} -40 ${y} -60 ${y}`}
                    fill="none"
                    stroke="rgba(36,114,200,.25)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="wts-conn"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                );
              })}
            </svg>

            {/* Branch cards */}
            <div className="relative z-10 flex flex-col gap-4">
              {BRANCHES.map((branch, i) => {
                return (
                  <motion.button
                    key={branch.id}
                    onClick={() => onSelect(branch.id)}
                    initial={{ opacity: 0, x: 32 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.3 + i * 0.12, ease: EASE }}
                    whileHover={{ x: 6 }}
                    className="w-full text-left rounded-[16px] bg-white border border-border-light group cursor-pointer overflow-hidden"
                    style={{
                      transition: "box-shadow 200ms, border-color 200ms",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#2472C8";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(36,114,200,.12)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
                    }}
                  >
                    {/* Accent line on left */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: "linear-gradient(to bottom, #2472C8, #3D8FE0)" }}
                    />

                    <div className="relative flex items-center gap-5 p-5">
                      {/* Icon */}
                      <div
                        className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #EAF2FC 0%, #d4e8f9 100%)",
                          border: "1px solid rgba(36,114,200,.15)",
                          color: "#2472C8",
                        }}
                      >
                        <i className={`ti ${branch.icon}`} style={{ fontSize: 20 }} />
                      </div>

                      {/* Pain + context */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-semibold mb-0.5 leading-[1.4]"
                          style={{ fontSize: 14, color: "#102347" }}
                        >
                          {branch.pain}
                        </p>
                        <p className="text-[12.5px] leading-[1.4]" style={{ color: "rgba(30,77,140,.5)" }}>
                          {branch.context}
                        </p>
                      </div>

                      {/* Connector dots */}
                      <div className="flex flex-col gap-1 items-center flex-shrink-0 mx-1">
                        {[0, 1, 2].map((d) => (
                          <div
                            key={d}
                            className="w-1 h-1 rounded-full"
                            style={{ background: "rgba(36,114,200,.3)" }}
                          />
                        ))}
                      </div>

                      {/* Answer tag + name */}
                      <div className="flex-shrink-0 text-right">
                        <span
                          className="text-[10px] font-bold tracking-[0.12em] uppercase block mb-1"
                          style={{ color: "#2472C8" }}
                        >
                          {branch.tag}
                        </span>
                        <span
                          className="font-outfit font-extrabold block"
                          style={{ fontSize: 13.5, color: "#102347", letterSpacing: "-0.01em" }}
                        >
                          {branch.name}
                        </span>
                        <span style={{ color: "#2472C8" }}>
                          <span className="ml-auto mt-1 transition-transform duration-150 group-hover:translate-x-1">
                            <IconArrowRight size={14} stroke={2} />
                          </span>
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Footer note */}
            <motion.p
              className="mt-5 text-[13.5px] italic"
              style={{ color: "rgba(30,77,140,.45)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.75, ease: EASE }}
            >
              Not seeing your pain point? We manage 7 more areas, from AV &amp; conferencing to IT asset procurement.{" "}
              <button
                onClick={() => onSelect("managed-it")}
                className="underline underline-offset-2 font-semibold not-italic cursor-pointer"
                style={{ color: "#2472C8", background: "none", border: "none", padding: 0 }}
              >
                See all services ↓
              </button>
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
