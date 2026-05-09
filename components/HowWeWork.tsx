"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Eyebrow from "@/components/Eyebrow";

const EASE = [0.22, 1, 0.36, 1] as const;
const STAGGER = 160;

const steps = [
  {
    period: "Day 1",
    title: "A real start.",
    desc: "Admin taken over. Credentials centralised. Immediate risks locked down.",
  },
  {
    period: "Week 1",
    title: "Your environment, mapped.",
    desc: "Users. Systems. Vendors. Gaps. Risks. A clear picture — not a dense report.",
  },
  {
    period: "Weeks 2–3",
    title: "The work happens.",
    desc: "Systems connected. Security enforced. We handle the work — you stay focused.",
  },
  {
    period: "Day 30",
    title: "You stop thinking about IT.",
    desc: "No escalations. No vendor calls. The environment runs.",
  },
];

/* ─── Icons ─── */
const ICONS = [
  <svg key="shield" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 6.5V12c0 5.25 4 9 9 10 5-1 9-4.75 9-10V6.5L12 2Z"/>
    <polyline points="9,12 11,14 15,10"/>
  </svg>,
  <svg key="search" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>,
  <svg key="gear" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1Z"/>
  </svg>,
  <svg key="check" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>,
];

/* ─── Shared chrome bar ─── */
function ChromeBar({ label }: { label: string }) {
  return (
    <div className="bg-primary px-2.5 py-1.5 flex items-center gap-2 flex-shrink-0">
      <div className="flex gap-[4px]">
        {["#FF5F57","#FEBC2E","#28C840"].map(c => <span key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      </div>
      <span className="text-[8px] font-semibold text-white/60 mx-auto">{label}</span>
    </div>
  );
}

/* ─── Mini UI mockups ─── */
function VisualDay1() {
  return (
    <div className="rounded-xl overflow-hidden border border-border-light shadow-sm flex flex-col flex-1">
      <ChromeBar label="Security Center" />
      <div className="bg-white p-2.5 flex flex-col gap-1.5 flex-1">
        {[
          { label: "Admin access", tag: "Secured"  },
          { label: "Credentials",  tag: "Locked"   },
          { label: "MFA",          tag: "Enforced" },
        ].map((r) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="text-[9px] text-text-muted w-[72px] flex-shrink-0">{r.label}</span>
            <div className="flex-1 h-[4px] bg-bg-page rounded-full overflow-hidden">
              <div className="h-full bg-status-success rounded-full w-full" />
            </div>
            <span className="text-[8px] font-bold text-status-success flex-shrink-0 w-[52px] text-right">{r.tag}</span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-1.5 border-t border-border-light mt-auto">
          <span className="text-[8.5px] text-text-muted">Risk level</span>
          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-status-success-bg text-status-success-text">LOW ↓</span>
        </div>
      </div>
    </div>
  );
}

function VisualWeek1() {
  return (
    <div className="rounded-xl overflow-hidden border border-border-light shadow-sm flex flex-col flex-1">
      <ChromeBar label="Asset Discovery" />
      <div className="bg-white p-2.5 flex flex-col gap-2 flex-1">
        <div className="grid grid-cols-3 gap-1.5">
          {[{ v: "47", l: "Assets" }, { v: "12", l: "Users" }, { v: "8", l: "Vendors" }].map((m) => (
            <div key={m.l} className="bg-bg-page rounded-lg p-1.5 text-center">
              <p className="font-outfit font-black text-[17px] text-primary leading-none">{m.v}</p>
              <p className="text-[8px] text-text-muted mt-0.5">{m.l}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <div className="flex-1 h-[4px] bg-bg-page rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full" style={{ width: "94%" }} />
          </div>
          <span className="text-[8px] font-bold text-accent flex-shrink-0">94% mapped</span>
        </div>
      </div>
    </div>
  );
}

function VisualWeeks23() {
  return (
    <div className="rounded-xl overflow-hidden border border-border-light shadow-sm flex flex-col flex-1">
      <ChromeBar label="Integration Status" />
      <div className="bg-white p-2.5 flex flex-col gap-1.5 flex-1">
        {["Azure AD connected", "Security policies applied", "Backup system active", "Monitoring enabled"].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <div className="w-[14px] h-[14px] rounded-full bg-status-success-bg flex items-center justify-center flex-shrink-0">
              <svg width="7" height="7" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-status-success">
                <polyline points="1.5,5 3.5,7.5 8.5,2"/>
              </svg>
            </div>
            <span className="text-[9px] text-text-muted">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualDay30() {
  return (
    <div className="rounded-xl overflow-hidden border border-border-light shadow-sm flex flex-col flex-1">
      <ChromeBar label="30-Day Overview" />
      <div className="bg-white p-2.5 flex flex-col flex-1">
        <div className="grid grid-cols-2 gap-1.5 flex-1">
          {[
            { v: "0",     l: "Incidents", c: "text-status-success" },
            { v: "99.9%", l: "Uptime",    c: "text-status-success" },
            { v: "A+",    l: "Score",     c: "text-accent"         },
            { v: "24/7",  l: "Monitored", c: "text-primary"        },
          ].map((m) => (
            <div key={m.l} className="bg-bg-page rounded-lg p-1.5 text-center flex flex-col items-center justify-center">
              <p className={`font-outfit font-black text-[16px] leading-none ${m.c}`}>{m.v}</p>
              <p className="text-[8px] text-text-muted mt-0.5">{m.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const VISUALS = [VisualDay1, VisualWeek1, VisualWeeks23, VisualDay30];

/* ─── Component ─── */
export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Cards are always visible — each one slides up from a small offset, staggered as you scroll
  const DRIFT = 80;
  const card0Y = useTransform(scrollYProgress, [0.10, 0.26], [DRIFT, 0]);
  const card1Y = useTransform(scrollYProgress, [0.22, 0.38], [DRIFT, 0]);
  const card2Y = useTransform(scrollYProgress, [0.34, 0.50], [DRIFT, 0]);
  const card3Y = useTransform(scrollYProgress, [0.46, 0.62], [DRIFT, 0]);
  const cardYs = [card0Y, card1Y, card2Y, card3Y];

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if      (v < 0.28) setActiveStep(0);
    else if (v < 0.44) setActiveStep(1);
    else if (v < 0.60) setActiveStep(2);
    else               setActiveStep(3);
  });

  return (
    <section ref={sectionRef} className="relative bg-bg-page" style={{ minHeight: "260vh" }}>
      <div className="sticky top-0 min-h-screen flex flex-col justify-center py-16 overflow-hidden">
        <div className="max-w-site mx-auto px-5 lg:px-10 w-full">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <Eyebrow>How We Work</Eyebrow>
            <h2 className="font-outfit font-black text-h1 text-text-heading mb-5">
              We come prepared. From day one.
            </h2>
            <p className="text-body-lg text-text-muted max-w-[56ch]">
              We map your environment. We bring you the plan.{" "}
              <strong className="text-text-heading font-bold">
                You&apos;re not managing us — we&apos;re working for you.
              </strong>
            </p>
          </div>

          {/* ── Stepper ── */}
          <div className="hidden lg:grid grid-cols-4 mb-2">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center pb-4 relative">
                <span className={`text-[10px] font-bold tracking-[0.16em] uppercase transition-colors duration-500 ${
                  activeStep >= i ? "text-accent" : "text-text-muted/40"
                }`}>
                  {step.period}
                </span>
                <div className={`mt-3 h-6 border-l-2 transition-all duration-500 ${
                  activeStep >= i ? "border-solid border-accent" : "border-dotted border-border-light"
                }`} />
              </div>
            ))}
          </div>

          {/* ── Cards — desktop staircase ── */}
          <div className="hidden lg:grid grid-cols-4 gap-5 items-stretch">
            {steps.map((step, i) => {
              const Visual = VISUALS[i];
              return (
                <motion.div
                  key={i}
                  style={{ y: cardYs[i] }}
                  className="bg-white rounded-3xl border border-border-light shadow-lg shadow-black/[0.06] flex flex-col overflow-hidden h-full"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                        activeStep >= i ? "bg-primary text-white" : "bg-bg-page text-text-muted border border-border-light"
                      }`}>
                        {ICONS[i]}
                      </div>
                      <span className={`text-[10px] font-bold tracking-[0.14em] uppercase transition-colors duration-500 ${
                        activeStep >= i ? "text-accent" : "text-text-muted/40"
                      }`}>
                        {step.period}
                      </span>
                    </div>

                    <h3 className="font-outfit text-[17px] font-black text-text-heading leading-[1.3] mb-2.5">
                      {step.title}
                    </h3>

                    <p className="text-[12.5px] text-text-muted leading-[1.7]">{step.desc}</p>

                    <div className="flex-1" />
                    <div className="mt-4 h-[155px] flex flex-col">
                      <Visual />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Cards — mobile ── */}
          <div className="lg:hidden flex flex-col gap-4">
            {steps.map((step, i) => {
              const Visual = VISUALS[i];
              return (
                <div key={i} className="bg-white rounded-2xl border border-border-light shadow-md shadow-black/[0.05] p-5 flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white flex-shrink-0">
                      {ICONS[i]}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent mb-0.5">{step.period}</p>
                      <h3 className="font-outfit text-[16px] font-black text-text-heading leading-tight">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-[13px] text-text-muted leading-[1.7]">{step.desc}</p>
                  <Visual />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
