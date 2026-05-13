"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import FadeUp from "@/components/FadeUp";
import Eyebrow from "@/components/Eyebrow";

/* ─────────────────────────────────────────────
   Shared Windows 11-style window chrome
───────────────────────────────────────────── */
function WinFrame({
  icon, title, toolbar, addressBar, statusLeft, statusRight, children,
}: {
  icon: ReactNode; title: string;
  toolbar?: ReactNode; addressBar?: ReactNode;
  statusLeft?: ReactNode; statusRight?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div style={{
      background: "linear-gradient(175deg,#0D1D3B,#07101E)",
      border: "1px solid rgba(122,180,238,.20)",
      borderRadius: 10, overflow: "hidden",
      boxShadow: "0 28px 64px rgba(8,14,30,.40), 0 0 0 0.5px rgba(122,180,238,.07)",
    }}>

      {/* ── Title bar ── */}
      <div style={{ display: "flex", alignItems: "center", height: 34, background: "rgba(4,9,20,.98)", borderBottom: "1px solid rgba(122,180,238,.10)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, paddingLeft: 12, flex: 1, minWidth: 0 }}>
          <span style={{ display: "flex", alignItems: "center", color: "#3D8FE0", flexShrink: 0 }}>{icon}</span>
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12.5, fontWeight: 500, color: "rgba(184,212,247,.58)", letterSpacing: "0.01em", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{title}</span>
        </div>
        {/* Controls — Windows 11 style */}
        <div style={{ display: "flex", alignSelf: "stretch", flexShrink: 0 }}>
          {[
            { sym: "─", fg: "rgba(184,212,247,.45)", bg: "transparent" },
            { sym: "□", fg: "rgba(184,212,247,.45)", bg: "transparent" },
            { sym: "✕", fg: "#ffffff",               bg: "rgba(196,43,28,.85)" },
          ].map((btn, i) => (
            <div key={i} style={{ width: 46, display: "flex", alignItems: "center", justifyContent: "center", background: btn.bg, fontFamily: "var(--font-dm-sans)", fontSize: i === 0 ? 11 : 10, fontWeight: 400, color: btn.fg, userSelect: "none", letterSpacing: 0 }}>
              {btn.sym}
            </div>
          ))}
        </div>
      </div>

      {/* ── Toolbar / menu bar ── */}
      {toolbar && (
        <div style={{ padding: "0 12px", background: "rgba(7,13,26,.92)", borderBottom: "1px solid rgba(122,180,238,.07)" }}>
          {toolbar}
        </div>
      )}

      {/* ── Address / breadcrumb bar ── */}
      {addressBar && (
        <div style={{ padding: "5px 10px", background: "rgba(7,13,26,.92)", borderBottom: "1px solid rgba(122,180,238,.08)", display: "flex", alignItems: "center", gap: 4 }}>
          {addressBar}
        </div>
      )}

      {/* ── Content ── */}
      <div>{children}</div>

      {/* ── Status bar ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 12px", height: 22, background: "rgba(4,9,20,.88)", borderTop: "1px solid rgba(122,180,238,.07)" }}>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "rgba(122,180,238,.33)" }}>{statusLeft}</span>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "rgba(122,180,238,.33)" }}>{statusRight}</span>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 01 — SynAck Monitor  (Device Manager)
───────────────────────────────────────────── */
function EnvironmentCard() {
  const rows = [
    { label: "Endpoints & Devices", val: "247", status: "Managed",   ok: true },
    { label: "Cloud Applications",  val: "23",  status: "Monitored", ok: true },
    { label: "Network Segments",    val: "4",   status: "Secured",   ok: true },
    { label: "Security Policies",   val: "31",  status: "Enforced",  ok: true },
  ];
  return (
    <WinFrame
      icon={
        <svg viewBox="0 0 14 14" style={{ width: 14, height: 14 }}>
          <rect x="1" y="1" width="12" height="9" rx="1.5" fill="none" stroke="#3D8FE0" strokeWidth="1.2" />
          <line x1="7" y1="10" x2="7" y2="13" stroke="#3D8FE0" strokeWidth="1.2" />
          <line x1="4" y1="13" x2="10" y2="13" stroke="#3D8FE0" strokeWidth="1.2" />
        </svg>
      }
      title="SynAck Monitor"
      toolbar={
        <div style={{ display: "flex" }}>
          {["View", "Devices", "Network", "Reports"].map((item, i) => (
            <span key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12.5, color: i === 0 ? "rgba(184,212,247,.58)" : "rgba(184,212,247,.38)", padding: "6px 10px", letterSpacing: "0.01em", background: i === 0 ? "rgba(36,114,200,.14)" : "transparent" }}>{item}</span>
          ))}
        </div>
      }
      statusLeft="305 managed items"
      statusRight="Last sync: 3 days ago"
    >
      {/* Column headers */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 12px 5px 28px", background: "rgba(10,20,40,.55)", borderBottom: "1px solid rgba(122,180,238,.07)" }}>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(122,180,238,.4)", flex: 1 }}>Component</span>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(122,180,238,.4)", width: 44, textAlign: "right" }}>Count</span>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(122,180,238,.4)", width: 76, textAlign: "center" }}>Status</span>
      </div>
      {/* Rows */}
      <div>
        {rows.map((row, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: i % 2 === 1 ? "rgba(122,180,238,.025)" : "transparent" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22A05A", flexShrink: 0, display: "inline-block", boxShadow: "0 0 5px rgba(34,160,90,.6)" }} />
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13.5, fontWeight: 500, color: "#B8D4F7", flex: 1 }}>{row.label}</span>
            <span style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 800, letterSpacing: "-0.01em", color: "#EAF2FC", width: 44, textAlign: "right" }}>{row.val}</span>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, color: "rgba(34,160,90,.75)", background: "rgba(34,160,90,.10)", padding: "2px 0", borderRadius: 4, border: "1px solid rgba(34,160,90,.2)", width: 76, textAlign: "center" }}>{row.status}</span>
          </div>
        ))}
      </div>
    </WinFrame>
  );
}

/* ─────────────────────────────────────────────
   Card 02 — Incident Analytics  (Perf Monitor)
───────────────────────────────────────────── */
function IncidentChartCard() {
  const beforeH = [58, 74, 48, 69, 53, 64];
  const labels  = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  return (
    <WinFrame
      icon={
        <svg viewBox="0 0 14 14" style={{ width: 14, height: 14 }}>
          <rect x="1" y="5"  width="3" height="8" rx=".6" fill="#3D8FE0" opacity=".55" />
          <rect x="5.5" y="2" width="3" height="11" rx=".6" fill="#3D8FE0" opacity=".8" />
          <rect x="10" y="7" width="3" height="6"  rx=".6" fill="#22A05A" />
        </svg>
      }
      title="Incident Analytics"
      toolbar={
        <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "5px 0" }}>
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "rgba(184,212,247,.3)", marginRight: 6 }}>Range:</span>
          {["30D", "90D", "1Y"].map((t, i) => (
            <span key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: i === 2 ? 700 : 400, color: i === 2 ? "#3D8FE0" : "rgba(184,212,247,.35)", padding: "3px 10px", borderRadius: 4, background: i === 2 ? "rgba(36,114,200,.16)" : "transparent", border: i === 2 ? "1px solid rgba(61,143,224,.28)" : "1px solid transparent" }}>{t}</span>
          ))}
        </div>
      }
      statusLeft="Jan 2025 – Dec 2025"
      statusRight="Source: SynAck NOC"
    >
      <div style={{ padding: "14px 16px 10px" }}>
        <svg viewBox="0 0 256 96" style={{ width: "100%", overflow: "visible", display: "block" }}>
          {[0, 25, 50, 75].map((y) => (
            <line key={y} x1="8" y1={84 - y} x2="248" y2={84 - y} stroke="rgba(122,180,238,.07)" strokeWidth="1" />
          ))}
          {beforeH.map((h, i) => (
            <rect key={i} x={12 + i * 20} y={84 - h} width={13} height={h} rx="2.5" fill="rgba(200,95,45,.42)" />
          ))}
          <line x1="122" y1="6" x2="122" y2="86" stroke="rgba(61,143,224,.35)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="130" y="13" fontFamily="DM Sans, sans-serif" fontSize="6.5" fontWeight="700" fill="rgba(61,143,224,.55)">SynAck →</text>
          {[0,1,2,3,4,5].map((i) => (
            <rect key={i} x={130 + i * 20} y={81} width={13} height={3} rx="1.5" fill="rgba(34,160,90,.65)" />
          ))}
          <line x1="8" y1="84" x2="248" y2="84" stroke="rgba(122,180,238,.18)" strokeWidth="1" />
          {labels.map((m, i) => (
            <text key={i} x={12 + i * 20 + 6.5} y={94} textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="7" fill="rgba(122,180,238,.32)">{m}</text>
          ))}
        </svg>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(122,180,238,.08)" }}>
          <div>
            <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "rgba(200,95,45,.65)", marginBottom: 2 }}>Before</div>
            <div style={{ fontFamily: "var(--font-outfit)", fontSize: 24, fontWeight: 900, letterSpacing: "-0.03em", color: "rgba(200,95,45,.45)", lineHeight: 1 }}>10.2<span style={{ fontSize: 11, fontWeight: 600, marginLeft: 3 }}>avg / mo</span></div>
          </div>
          <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16, color: "rgba(122,180,238,.2)" }}>→</div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "rgba(34,160,90,.72)", marginBottom: 2 }}>After SynAck</div>
            <div style={{ fontFamily: "var(--font-outfit)", fontSize: 24, fontWeight: 900, letterSpacing: "-0.03em", color: "#22A05A", lineHeight: 1, textShadow: "0 0 18px rgba(34,160,90,.45)" }}>0<span style={{ fontSize: 11, fontWeight: 600, marginLeft: 3, color: "rgba(34,160,90,.65)" }}>avg / mo</span></div>
          </div>
        </div>
      </div>
    </WinFrame>
  );
}

/* ─────────────────────────────────────────────
   Card 03 — Documentation  (File Explorer)
───────────────────────────────────────────── */
function DocumentationCard() {
  const files = [
    { label: "Network topology",  status: "Documented",  time: "3 days ago", green: true  },
    { label: "Access controls",   status: "Mapped 98%",  time: "1 day ago",  green: true  },
    { label: "Security posture",  status: "Reviewed",    time: "5 days ago", green: true  },
    { label: "Firewall ruleset",  status: "In review",   time: "Today",      green: false },
  ];
  return (
    <WinFrame
      icon={
        <svg viewBox="0 0 14 14" style={{ width: 14, height: 14 }}>
          <path d="M1 3h5l1.5 2H13v7H1z" fill="rgba(36,114,200,.3)" stroke="#3D8FE0" strokeWidth=".85" strokeLinejoin="round" />
        </svg>
      }
      title="Documentation Manager"
      addressBar={
        <div style={{ display: "flex", alignItems: "center", gap: 4, width: "100%" }}>
          {["←", "→", "↑"].map((a, i) => (
            <span key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12.5, color: "rgba(122,180,238,.28)", padding: "0 3px", userSelect: "none", lineHeight: 1 }}>{a}</span>
          ))}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 5, background: "rgba(122,180,238,.07)", border: "1px solid rgba(122,180,238,.13)", borderRadius: 4, padding: "3px 9px", marginLeft: 4 }}>
            {["Environments", "Client_247", "Documentation"].map((crumb, i, arr) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: i === arr.length - 1 ? "rgba(184,212,247,.7)" : "rgba(122,180,238,.38)" }}>{crumb}</span>
                {i < arr.length - 1 && <span style={{ color: "rgba(122,180,238,.3)", fontSize: 10 }}>›</span>}
              </span>
            ))}
          </div>
        </div>
      }
      statusLeft="4 items"
      statusRight="1 in review · Next cycle: May 15"
    >
      {/* Column headers */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 12px 5px 30px", background: "rgba(10,20,40,.55)", borderBottom: "1px solid rgba(122,180,238,.07)" }}>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(122,180,238,.4)", flex: 1 }}>Name</span>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(122,180,238,.4)", width: 84 }}>Status</span>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(122,180,238,.4)", width: 68, textAlign: "right" }}>Modified</span>
      </div>
      {/* File rows */}
      <div>
        {files.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: i % 2 === 1 ? "rgba(122,180,238,.025)" : "transparent" }}>
            {/* File icon */}
            <svg viewBox="0 0 11 14" style={{ width: 11, height: 14, flexShrink: 0 }}>
              <path d="M1 1h6.5L10 3.5V13H1z" fill={f.green ? "rgba(36,114,200,.22)" : "rgba(212,160,23,.18)"} stroke={f.green ? "rgba(61,143,224,.5)" : "rgba(212,160,23,.55)"} strokeWidth=".8" strokeLinejoin="round" />
              <path d="M7.5 1v2.5H10" fill="none" stroke={f.green ? "rgba(61,143,224,.5)" : "rgba(212,160,23,.55)"} strokeWidth=".8" />
            </svg>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13.5, fontWeight: 500, color: "#B8D4F7", flex: 1 }}>{f.label}</span>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 600, color: f.green ? "rgba(34,160,90,.75)" : "rgba(212,160,23,.88)", width: 84 }}>{f.status}</span>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "rgba(122,180,238,.32)", width: 68, textAlign: "right" }}>{f.time}</span>
          </div>
        ))}
      </div>
    </WinFrame>
  );
}

/* ─────────────────────────────────────────────
   Steps
───────────────────────────────────────────── */
const steps = [
  {
    num: "01", color: "#2472C8",
    eyebrow: "Principle 01",
    headline: "Ownership is the deliverable.",
    body: "We've spent 25 years cleaning up environments nobody owned. The pattern never changes. The only way to stop it is to be the one who owns it, fully, accountably, with your name on it.",
    side: "left" as const,
    visual: <EnvironmentCard />,
  },
  {
    num: "02", color: "#3D8FE0",
    eyebrow: "Principle 02",
    headline: "React less. Not faster.",
    body: "Two decades of incident reports teach you one thing: most of them didn't have to happen. We stopped optimizing for response time and started optimizing for the absence of incidents worth responding to.",
    side: "right" as const,
    visual: <IncidentChartCard />,
  },
  {
    num: "03", color: "#102347",
    eyebrow: "Principle 03",
    headline: "If we can't explain it, we don't understand it.",
    body: "A complex environment isn't a sign of sophistication, it's a sign of accumulated neglect. After 25 years, we've learned that clarity is the work. If we can't hand you a plain picture of your environment, we haven't done our job.",
    side: "left" as const,
    visual: <DocumentationCard />,
  },
];

/* ─────────────────────────────────────────────
   Section
───────────────────────────────────────────── */
export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 25%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="bg-bg-page py-20">
      <div className="max-w-site mx-auto px-5 lg:px-10">

        <div className="max-w-[560px] mb-20">
          <FadeUp><Eyebrow>How We Think</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-outfit text-[clamp(34px,4.4vw,54px)] font-black tracking-[-0.04em] leading-[1.04] text-text-heading mt-2">
              What 25 years in the field{" "}
              <span className="text-accent">teaches you.</span>
            </h2>
          </FadeUp>
        </div>

        <div ref={ref} className="relative">
          {/* Track ghost */}
          <div className="absolute top-6 bottom-6 pointer-events-none" style={{ left: "50%", transform: "translateX(-50%)", width: 2, background: "rgba(184,212,247,.3)", borderRadius: 2 }} />
          {/* Track fill */}
          <motion.div
            className="absolute top-6 pointer-events-none"
            style={{ left: "50%", transform: "translateX(-50%)", width: 2, background: "linear-gradient(180deg,#2472C8 0%,#3D8FE0 50%,#102347 100%)", borderRadius: 2, bottom: 24, scaleY, transformOrigin: "top" }}
          />

          <div className="flex flex-col gap-24">
            {steps.map((step) => (
              <FadeUp key={step.num} delay={0.05}>
                <div className="grid grid-cols-[1fr_80px_1fr] items-center gap-4">

                  <div>
                    {step.side === "left" ? (
                      <div className="pr-10">
                        <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#2472C8", marginBottom: 14 }}>{step.eyebrow}</div>
                        <h3 className="font-outfit text-[clamp(22px,2.6vw,32px)] font-black tracking-[-0.03em] leading-[1.1] text-text-heading mb-4">{step.headline}</h3>
                        <p className="text-[16px] text-text-body leading-[1.75]">{step.body}</p>
                      </div>
                    ) : (
                      <div className="pl-2">{step.visual}</div>
                    )}
                  </div>

                  <div className="flex items-center justify-center relative z-10">
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg,${step.color} 0%,${step.color}cc 100%)`, boxShadow: `0 0 0 5px #F4F7FB,0 0 0 7px ${step.color}28,0 8px 22px ${step.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 900, color: "#EAF2FC", letterSpacing: "-0.01em" }}>
                      {step.num}
                    </div>
                  </div>

                  <div>
                    {step.side === "right" ? (
                      <div className="pl-10">
                        <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#2472C8", marginBottom: 14 }}>{step.eyebrow}</div>
                        <h3 className="font-outfit text-[clamp(22px,2.6vw,32px)] font-black tracking-[-0.03em] leading-[1.1] text-text-heading mb-4">{step.headline}</h3>
                        <p className="text-[16px] text-text-body leading-[1.75]">{step.body}</p>
                      </div>
                    ) : (
                      <div className="pr-2">{step.visual}</div>
                    )}
                  </div>

                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
