import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeUp from "@/components/FadeUp";
import Eyebrow from "@/components/Eyebrow";
import CtaSection from "@/components/CtaSection";

/* ── Page-scoped keyframes ── */
const css = `
  @keyframes ab-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes ab-glow  { 0%,100% { opacity: .7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
  .ab-blink { animation: ab-blink 1.5s ease infinite; }
  .ab-glow  { animation: ab-glow  5s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .ab-blink, .ab-glow { animation: none !important; }
  }
`;

const team = [
  {
    initials: "MK",
    name:     "Mazhar Kapadia",
    title:    "Chief Executive",
    bio:      "Built SynAck on the principle that IT without full ownership is unacceptable. Final authority on brand, strategy, and client decisions.",
    image:    null, // replace with "/team-mazhar.jpg" when available
  },
  {
    initials: "US",
    name:     "Umar Saleem",
    title:    "Chief Information Officer",
    bio:      "Owns information strategy, technology standards, and the structure of SynAck's internal and client-facing systems.",
    image:    null, // replace with "/team-umar.jpg" when available
  },
  {
    initials: "TM",
    name:     "Taha Mohammed",
    title:    "Chief Technology Officer",
    bio:      "Leads technical direction of service delivery — the platforms, tools, and engineering practices that make full ownership possible.",
    image:    null, // replace with "/team-taha.jpg" when available
  },
];

const principles = [
  {
    num:   "PRINCIPLE 01",
    title: "Ownership is the deliverable.",
    body:  "Tickets, response times, SLAs — byproducts. Not products. The deliverable is an environment someone fully owns. Knows end to end. Can answer for. Is responsible when something goes wrong. Without that, everything else is theatre.",
  },
  {
    num:   "PRINCIPLE 02",
    title: "React less. Not faster.",
    body:  "Most managed IT companies measure response time. We measure incident frequency. A four-minute response is impressive only if you couldn't have prevented the incident. Most of the time, you could have.",
  },
  {
    num:   "PRINCIPLE 03",
    title: "If we can't explain it, we don't understand it.",
    body:  "Every environment we run, we can explain to a non-technical owner in five minutes. If we can't — the issue isn't the owner. It's the environment. The work is to close that gap.",
  },
];


export default function About() {
  return (
    <main className="pt-[68px]">
      <style>{css}</style>

      {/* ── HERO ── */}
      <section className="relative bg-bg-page pt-20 pb-20 overflow-hidden">
        {/* Blueprint grid — fades toward edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(184,212,247,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(184,212,247,.4) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 80%)",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 80%)",
            opacity: 0.6,
          }}
        />
        {/* Single soft glow */}
        <div
          className="absolute pointer-events-none"
          style={{ top: "-20%", right: "-5%", width: 560, height: 560, background: "radial-gradient(circle, rgba(36,114,200,.07) 0%, transparent 65%)" }}
        />

        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-10">
          <div className="grid md:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">

            {/* Left — text */}
            <div>
              <FadeUp>
                <Eyebrow>About SynAck</Eyebrow>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="font-outfit text-[clamp(40px,5vw,68px)] font-black tracking-[-0.045em] leading-[1.0] text-text-heading mb-6">
                  Most IT problems aren&apos;t technical.{" "}
                  <span className="text-accent">They&apos;re ownership problems.</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-[clamp(15px,1.5vw,17px)] leading-[1.75] text-text-body max-w-[48ch]">
                  Systems patched but never owned. Vendors managed but never coordinated. Risks logged but never closed.{" "}
                  <strong className="text-text-heading font-semibold">The same gaps, different company name.</strong>
                </p>
              </FadeUp>
              {/* Meta bar */}
              <FadeUp delay={0.3}>
                <div className="flex items-center gap-6 mt-8 pt-6 border-t border-border-light flex-wrap">
                  {[
                    { label: "Founded",   value: "Maryland, USA"     },
                    { label: "Operating", value: "NY · NJ · MD · MN" },
                    { label: "Run by",    value: "Engineers"          },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-6">
                      {i > 0 && <div className="w-px h-5 bg-border-light" />}
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9.5px] font-bold tracking-[0.14em] uppercase text-text-muted">{m.label}</span>
                        <span className="text-[13px] font-semibold text-text-heading">{m.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right — single clean dark panel */}
            <FadeUp delay={0.15}>
              <div
                className="relative rounded-[20px] overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, #102347 0%, #0A1628 100%)",
                  boxShadow: "0 2px 0 rgba(61,143,224,.12) inset, 0 32px 64px rgba(10,22,40,.22)",
                  border: "1px solid rgba(36,114,200,.14)",
                }}
              >
                {/* Subtle inner glow — top right */}
                <div
                  className="absolute pointer-events-none rounded-full"
                  style={{ top: -60, right: -60, width: 220, height: 220, background: "radial-gradient(circle, rgba(36,114,200,.28) 0%, transparent 65%)" }}
                />

                {/* Header strip */}
                <div
                  className="flex items-center justify-between px-7 py-4 border-b"
                  style={{ borderColor: "rgba(122,180,238,.10)" }}
                >
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "#3D8FE0", textTransform: "uppercase" }}>
                    SynAck / About
                  </span>
                  <span className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 9.5, fontWeight: 700, color: "#22A05A", letterSpacing: "0.10em" }}>
                    <span className="ab-blink w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#22A05A" }} />
                    Active
                  </span>
                </div>

                {/* Central statement */}
                <div className="px-7 pt-8 pb-7 relative z-10">
                  <p
                    className="font-outfit font-black leading-[1.1] mb-8"
                    style={{ fontSize: "clamp(26px, 3.2vw, 38px)", letterSpacing: "-0.03em", color: "#EAF2FC" }}
                  >
                    Own the environment.{" "}
                    <span style={{ color: "#3D8FE0" }}>End to end.</span>
                  </p>

                  {/* Four beliefs — clean lines, no code syntax */}
                  <div className="flex flex-col" style={{ gap: 0 }}>
                    {[
                      { n: "01", text: "Full responsibility. No partial ownership." },
                      { n: "02", text: "No silent patches. No undocumented changes." },
                      { n: "03", text: "Measure incidents prevented, not response time." },
                      { n: "04", text: "Senior engineers on every environment." },
                    ].map((row, i, arr) => (
                      <div
                        key={row.n}
                        className="flex items-start gap-4 py-4"
                        style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(122,180,238,.08)" : "none" }}
                      >
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, color: "rgba(61,143,224,.5)", letterSpacing: "0.06em", paddingTop: 2, flexShrink: 0 }}>
                          {row.n}
                        </span>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 500, color: "#B8D4F7", lineHeight: 1.55 }}>
                          {row.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── THE NAME ── */}
      <section className="bg-bg-page py-24 border-t border-border-light">
        <div className="max-w-[760px] mx-auto px-5 lg:px-10">

          {/* Centered text block */}
          <FadeUp><Eyebrow>The Name</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-outfit text-[clamp(34px,4.4vw,54px)] font-black tracking-[-0.04em] leading-[1.04] text-text-heading mb-6">
              Why SynAck.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-[clamp(15px,1.5vw,17px)] text-text-body leading-[1.75]">
              SynAck is the TCP three-way handshake —{" "}
              <strong className="text-text-heading font-bold">SYN. SYN-ACK. ACK.</strong>{" "}
              The sequence that establishes every reliable connection on the internet. The name is deliberate. Both sides agree before anything moves.{" "}
              <span className="text-accent">Acknowledged. Established. Documented.</span>{" "}
              That&apos;s how we operate.
            </p>
          </FadeUp>

          {/* Handshake diagram */}
          <FadeUp delay={0.2}>
            <div
              className="mt-10 rounded-[20px] overflow-hidden"
              style={{ border: "1px solid #B8D4F7", boxShadow: "0 8px 40px rgba(16,35,71,.09)" }}
            >
              {/* Dark header */}
              <div
                className="flex items-center justify-between px-7 py-4"
                style={{ background: "linear-gradient(90deg, #102347 0%, #0D1D3B 100%)" }}
              >
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3D8FE0" }}>
                  TCP/IP — Three-way Handshake
                </span>
                <span className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, color: "#22A05A", letterSpacing: "0.08em" }}>
                  <span className="ab-blink w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#22A05A" }} />
                  ESTABLISHED
                </span>
              </div>

              {/* Party row */}
              <div
                className="grid grid-cols-2 border-b border-border-light"
                style={{ background: "#F8FAFD" }}
              >
                {[
                  { side: "left",  role: "Client", name: "SynAck",       initials: "SA", dark: true  },
                  { side: "right", role: "Server", name: "Your Business", initials: "YB", dark: false },
                ].map(p => (
                  <div
                    key={p.role}
                    className={`flex items-center gap-3 px-7 py-5 ${p.side === "right" ? "justify-end flex-row-reverse" : ""}`}
                  >
                    <div
                      className="flex items-center justify-center rounded-[10px] flex-shrink-0"
                      style={{
                        width: 40, height: 40,
                        background: p.dark ? "linear-gradient(160deg,#102347,#0A1628)" : "#FFFFFF",
                        border: p.dark ? "none" : "1.5px solid #B8D4F7",
                        fontFamily: "var(--font-outfit)",
                        fontSize: 13,
                        fontWeight: 800,
                        color: p.dark ? "#3D8FE0" : "#1E4D8C",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {p.initials}
                    </div>
                    <div className={p.side === "right" ? "text-right" : ""}>
                      <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1E4D8C", marginBottom: 2 }}>{p.role}</div>
                      <div style={{ fontFamily: "var(--font-outfit)", fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em", color: "#0A1628" }}>{p.name}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Steps */}
              <div style={{ background: "#FFFFFF" }}>
                {[
                  { num: "01", label: "SYN",     dir: "right", desc: "Connection requested"  },
                  { num: "02", label: "SYN-ACK", dir: "left",  desc: "Request acknowledged"  },
                  { num: "03", label: "ACK",     dir: "right", desc: "Connection established" },
                ].map((s, i, arr) => (
                  <div
                    key={s.num}
                    className="px-7 py-5"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #EAF2FC" : "none" }}
                  >
                    {/* Step label + description */}
                    <div className={`flex items-baseline gap-3 mb-3 ${s.dir === "left" ? "justify-end" : ""}`}>
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 9.5, fontWeight: 700, color: "rgba(36,114,200,.45)", letterSpacing: "0.06em" }}>{s.num}</span>
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#2472C8" }}>{s.label}</span>
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, fontWeight: 400, color: "#1E4D8C" }}>— {s.desc}</span>
                    </div>
                    {/* Arrow track */}
                    <div className="relative flex items-center h-3">
                      {s.dir === "right" ? (
                        <>
                          <div className="flex-1 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #2472C8 0%, rgba(36,114,200,.25) 100%)" }} />
                          <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "9px solid #2472C8" }} />
                        </>
                      ) : (
                        <>
                          <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderRight: "9px solid #2472C8" }} />
                          <div className="flex-1 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, rgba(36,114,200,.25) 0%, #2472C8 100%)" }} />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="px-7 py-4 border-t border-border-light"
                style={{ background: "#F8FAFD", fontFamily: "var(--font-dm-sans)", fontSize: 11.5, color: "#1E4D8C", lineHeight: 1.6 }}
              >
                Ownership established. Control transferred. Every action documented from this point forward.
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ── WHY WE BUILT IT ── */}
      <section className="bg-bg-page py-24">
        <div className="max-w-[900px] mx-auto px-5 lg:px-10">
          <FadeUp><Eyebrow>The Origin</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-outfit text-[clamp(34px,4.4vw,54px)] font-black tracking-[-0.04em] leading-[1.04] text-text-heading mb-8">
              After enough years,{" "}
              <span className="text-accent">the patterns repeat.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-[clamp(15px,1.5vw,17px)] text-text-body leading-[1.7] max-w-[56ch]">
              Something breaks. The previous IT company patches the symptom. Bills for the time. Leaves no documentation. Six months later, the same root cause produces a different failure. The cycle repeats — until something serious goes down. By then, no one understands the environment well enough to fix it cleanly.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-[clamp(15px,1.5vw,17px)] text-text-body leading-[1.7] max-w-[56ch] mt-[18px]">
              In small and mid-size business IT, this isn&apos;t an exception.{" "}
              <span className="text-accent">It&apos;s the default.</span>{" "}
              Technology gets touched. Never owned. The business pays the gap every time.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-[clamp(15px,1.5vw,17px)] text-text-body leading-[1.7] max-w-[56ch] mt-[18px]">
              We built SynAck to be the alternative.{" "}
              <strong className="text-text-heading font-bold">Own the environment from day one.</strong>{" "}
              Document it as a matter of course. Measure success by the absence of incidents — not the speed of response to them.
            </p>
          </FadeUp>

          {/* Pull quote */}
          <FadeUp delay={0.2}>
            <div
              className="mt-14 rounded-[14px]"
              style={{ padding: "40px 48px", background: "#FFFFFF", borderLeft: "3px solid #2472C8", border: "1px solid #B8D4F7", borderLeftWidth: 3, borderLeftColor: "#2472C8" }}
            >
              <p className="font-outfit text-[clamp(20px,2.2vw,26px)] font-black tracking-[-0.02em] leading-[1.3] text-text-heading">
                The goal isn&apos;t a faster ticket queue.{" "}
                <span className="text-accent">It&apos;s a system that doesn&apos;t generate them.</span>
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section className="bg-bg-page py-24 border-t border-border-light">
        <div className="max-w-site mx-auto px-5 lg:px-10">

          {/* Header */}
          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-10 border-b border-border-light">
              <div>
                <Eyebrow>How We Think</Eyebrow>
                <h2 className="font-outfit text-[clamp(30px,3.8vw,48px)] font-black tracking-[-0.04em] leading-[1.04] text-text-heading mt-1">
                  Three things we don&apos;t{" "}
                  <span className="text-accent">compromise on.</span>
                </h2>
              </div>
              <p className="text-[14px] text-text-muted leading-[1.65] max-w-[28ch] md:text-right flex-shrink-0">
                Every engagement runs through these.<br />They&apos;re not negotiable.
              </p>
            </div>
          </FadeUp>

          {/* ── PRINCIPLE 01 — Ownership is the deliverable ── */}
          <FadeUp delay={0.05}>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 py-12 border-b border-border-light items-center">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-accent">Principle 01</span>
                <h3 className="font-outfit text-[clamp(22px,2.8vw,34px)] font-black tracking-[-0.025em] leading-[1.12] text-text-heading">
                  Ownership is the deliverable.
                </h3>
                <p className="text-[15px] text-text-body leading-[1.75]">
                  Tickets, response times, SLAs — byproducts. Not products. The deliverable is an environment someone fully owns. Knows end to end. Can answer for. Without that, everything else is theatre.
                </p>
              </div>

              {/* Visual: environment ownership stack */}
              <div className="rounded-[16px] border border-border-light bg-white overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(16,35,71,.06)" }}>
                <div className="flex items-center justify-between px-5 py-3 border-b border-border-light">
                  <span className="text-[9.5px] font-bold tracking-[0.14em] uppercase text-text-muted">Environment Stack</span>
                  <span className="flex items-center gap-1.5 text-[9.5px] font-bold tracking-[0.08em]" style={{ color: "#22A05A" }}>
                    <span className="ab-blink w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#22A05A" }} />
                    Fully Owned
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  {[
                    { layer: "Cloud & SaaS",      pct: 100 },
                    { layer: "Cybersecurity",      pct: 100 },
                    { layer: "Network",            pct: 100 },
                    { layer: "Endpoints & Devices",pct: 100 },
                  ].map((l, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-[9px] bg-bg-page border border-border-light">
                      <div
                        className="w-1.5 h-4 rounded-full flex-shrink-0"
                        style={{ background: `rgba(36,114,200,${0.3 + i * 0.18})` }}
                      />
                      <span className="text-[13px] font-semibold text-text-heading flex-1">{l.layer}</span>
                      <span className="text-[9px] font-bold tracking-[0.10em] uppercase text-accent">Managed</span>
                    </div>
                  ))}
                  <div
                    className="mt-1 px-3 py-2.5 rounded-[9px] text-center"
                    style={{ background: "linear-gradient(90deg, #102347, #0A1628)" }}
                  >
                    <span className="text-[9.5px] font-bold tracking-[0.14em] uppercase" style={{ color: "#3D8FE0" }}>
                      SynAck — Single point of ownership
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* ── PRINCIPLE 02 — React less, not faster ── */}
          <FadeUp delay={0.05}>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 py-12 border-b border-border-light items-center">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-accent">Principle 02</span>
                <h3 className="font-outfit text-[clamp(22px,2.8vw,34px)] font-black tracking-[-0.025em] leading-[1.12] text-text-heading">
                  React less. Not faster.
                </h3>
                <p className="text-[15px] text-text-body leading-[1.75]">
                  Most managed IT companies measure response time. We measure incident frequency. A four-minute response is impressive only if you couldn&apos;t have prevented the incident. Most of the time, you could have.
                </p>
              </div>

              {/* Visual: incident metric dashboard */}
              <div className="rounded-[16px] border border-border-light bg-white overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(16,35,71,.06)" }}>
                <div className="flex items-center justify-between px-5 py-3 border-b border-border-light">
                  <span className="text-[9.5px] font-bold tracking-[0.14em] uppercase text-text-muted">Performance Metrics</span>
                  <span className="text-[9.5px] font-bold tracking-[0.08em] text-text-muted">Last 6 months</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border-light">
                  <div className="px-5 py-5">
                    <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-text-muted mb-2">Others measure</div>
                    <div className="font-outfit font-black leading-none mb-1 text-text-heading" style={{ fontSize: 40 }}>
                      4<span className="text-[16px] font-bold text-text-muted ml-0.5">min</span>
                    </div>
                    <div className="text-[11px] font-medium text-text-muted">Response time</div>
                  </div>
                  <div className="px-5 py-5">
                    <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-text-muted mb-2">We measure</div>
                    <div className="font-outfit font-black leading-none mb-1" style={{ fontSize: 40, color: "#22A05A" }}>0</div>
                    <div className="text-[11px] font-medium text-text-muted">Incidents this month</div>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-1">
                  <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-text-muted mb-2.5">Incident frequency — declining</div>
                  <div className="flex items-end gap-1.5" style={{ height: 48 }}>
                    {[90, 72, 55, 36, 18, 0].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-[3px] transition-all"
                        style={{
                          height: `${Math.max(h, 0)}%`,
                          background: i === 5 ? "#22A05A" : `rgba(36,114,200,${0.15 + i * 0.13})`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[9px] text-text-muted">6 mo ago</span>
                    <span className="text-[9px] font-bold" style={{ color: "#22A05A" }}>Now</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* ── PRINCIPLE 03 — If we can't explain it ── */}
          <FadeUp delay={0.05}>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 py-12 items-center">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-accent">Principle 03</span>
                <h3 className="font-outfit text-[clamp(22px,2.8vw,34px)] font-black tracking-[-0.025em] leading-[1.12] text-text-heading">
                  If we can&apos;t explain it, we don&apos;t understand it.
                </h3>
                <p className="text-[15px] text-text-body leading-[1.75]">
                  Every environment we run, we can explain to a non-technical owner in five minutes. If we can&apos;t — the issue isn&apos;t the owner. It&apos;s the environment. The work is to close that gap.
                </p>
              </div>

              {/* Visual: technical → plain English translation */}
              <div className="rounded-[16px] border border-border-light bg-white overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(16,35,71,.06)" }}>
                {/* Technical side */}
                <div className="px-5 py-4" style={{ background: "#080F1E" }}>
                  <div className="text-[9px] font-bold tracking-[0.14em] uppercase mb-3" style={{ color: "#4ADE80" }}>
                    // What your environment looks like
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { key: "VLAN trunk",  val: "802.1Q — untagged on port 24" },
                      { key: "FW policy",   val: "deny 0.0.0.0/0 outbound:443" },
                      { key: "Patch delta", val: "CVE-2024-1182 — unmitigated"  },
                    ].map((r, i) => (
                      <div key={i} className="flex items-baseline gap-2">
                        <span className="text-[10px] font-bold flex-shrink-0" style={{ color: "#3D8FE0", fontFamily: "monospace" }}>{r.key}</span>
                        <span className="text-[10px]" style={{ color: "rgba(122,180,238,.55)", fontFamily: "monospace" }}>{r.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 px-5 py-2.5 border-y border-border-light bg-bg-page">
                  <div className="flex-1 h-px bg-border-light" />
                  <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-accent flex-shrink-0">We translate it</span>
                  <div className="flex-1 h-px bg-border-light" />
                </div>

                {/* Plain English side */}
                <div className="px-5 py-4">
                  <div className="text-[9px] font-bold tracking-[0.14em] uppercase text-text-muted mb-3">
                    What we tell you — in 5 minutes
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      "Your network is segmented correctly — no leaks.",
                      "External access is locked by default.",
                      "One security gap found. Fixed within 24 hours.",
                    ].map((line, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="text-[13px] flex-shrink-0 mt-px" style={{ color: "#22A05A" }}>✓</span>
                        <span className="text-[13px] font-medium text-text-heading leading-[1.5]">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ── THE TEAM ── */}
      <section className="bg-bg-page py-24">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="max-w-[720px] mx-auto text-center mb-14">
            <FadeUp>
              <div className="inline-flex items-center gap-2.5 mb-[22px]">
                <span className="w-6 h-0.5 bg-accent rounded-sm" />
                <span className="text-[11px] font-bold tracking-[0.17em] uppercase text-accent">The Team</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-outfit text-[clamp(34px,4.4vw,54px)] font-black tracking-[-0.04em] leading-[1.04] text-text-heading mb-[22px]">
                Run by engineers.{" "}
                <span className="text-accent">Not by salespeople.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-[clamp(15px,1.5vw,17px)] text-text-body leading-[1.7] max-w-[56ch] mx-auto">
                Built and operated by people who&apos;ve spent careers in IT and security at the operational level. Building, breaking, and rebuilding the systems businesses run on. Every decision the company makes is made by someone who has done the work.
              </p>
            </FadeUp>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {team.map((m, i) => (
              <FadeUp key={m.name} delay={i * 0.1 + 0.1}>
                <div
                  className="bg-white border border-border-light rounded-[20px] overflow-hidden transition-all duration-[250ms] hover:-translate-y-1 hover:border-accent hover:shadow-[0_12px_28px_rgba(36,114,200,.12)]"
                  style={{ boxShadow: "0 4px 16px rgba(16,35,71,.04)" }}
                >
                  {/* Photo area */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ height: 220 }}
                  >
                    {m.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={m.image} alt={m.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      /* Placeholder */
                      <div
                        className="w-full h-full flex flex-col items-center justify-center gap-3"
                        style={{
                          background: "linear-gradient(160deg, #102347 0%, #0A1628 60%, #0E1E3A 100%)",
                          backgroundImage: "linear-gradient(160deg, #102347 0%, #0A1628 60%, #0E1E3A 100%), linear-gradient(rgba(36,114,200,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(36,114,200,.06) 1px, transparent 1px)",
                          backgroundSize: "100% 100%, 28px 28px, 28px 28px",
                        }}
                      >
                        <div
                          className="flex items-center justify-center rounded-full"
                          style={{
                            width: 72, height: 72,
                            background: "rgba(36,114,200,.15)",
                            border: "1.5px solid rgba(61,143,224,.35)",
                            fontFamily: "var(--font-outfit)",
                            fontSize: 24,
                            fontWeight: 800,
                            color: "#3D8FE0",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {m.initials}
                        </div>
                        <span
                          style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "rgba(122,180,238,.4)",
                          }}
                        >
                          Photo coming soon
                        </span>
                      </div>
                    )}
                    {/* Title badge — floats bottom-left over photo */}
                    <div
                      className="absolute bottom-3 left-3"
                      style={{
                        background: "rgba(10,22,40,.75)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        border: "1px solid rgba(36,114,200,.3)",
                        borderRadius: 8,
                        padding: "4px 10px",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: 9.5,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#3D8FE0",
                      }}
                    >
                      {m.title}
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "24px 28px 28px" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-outfit)",
                        fontSize: 18,
                        fontWeight: 800,
                        color: "#0A1628",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                        marginBottom: 12,
                      }}
                    >
                      {m.name}
                    </div>
                    <p className="text-[14px] text-text-body leading-[1.65]">{m.bio}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
