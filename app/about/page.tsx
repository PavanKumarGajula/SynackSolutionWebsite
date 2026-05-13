import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import Eyebrow from "@/components/Eyebrow";
import CtaSection from "@/components/CtaSection";
import TimelineSection from "@/components/TimelineSection";
import { IconArrowRight } from "@tabler/icons-react";

/* ── Page-scoped keyframes ── */
const css = `
  @keyframes ab-blink   { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes ab-glow    { 0%,100% { opacity: .7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
  @keyframes ab-twinkle { 0%,100% { opacity: .25; transform: scale(1); } 50% { opacity: .7; transform: scale(1.15); } }
  .ab-blink   { animation: ab-blink   1.5s ease infinite; }
  .ab-glow    { animation: ab-glow    5s ease-in-out infinite; }
  .ab-twinkle { animation: ab-twinkle 4s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .ab-blink, .ab-glow, .ab-twinkle { animation: none !important; }
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
    bio:      "Leads technical direction of service delivery: the platforms, tools, and engineering practices that make full ownership possible.",
    image:    null, // replace with "/team-taha.jpg" when available
  },
];

const testimonials = [
  {
    quote: "SynAck doesn't just fix problems. They eliminated the category of problem entirely. We haven't had a repeat incident in over a year.",
    name: "Daniel R.",
    title: "COO",
    company: "Tri-State Logistics",
    industry: "Logistics",
    logo: null, // replace with "/logos/tri-state-logistics.svg"
  },
  {
    quote: "In financial services, downtime isn't inconvenient, it's a liability. SynAck understands that and operates accordingly. Our uptime has been flawless.",
    name: "Jennifer K.",
    title: "CEO",
    company: "Meridian Financial Group",
    industry: "Financial Services",
    logo: null, // replace with "/logos/meridian-financial.svg"
  },
  {
    quote: "Our shop floor runs 24/7. SynAck built us an environment we actually understand, and they own every layer of it. First IT partner that's ever done that.",
    name: "Marcus T.",
    title: "Director of Operations",
    company: "NorthBridge Manufacturing",
    industry: "Manufacturing",
    logo: null, // replace with "/logos/northbridge-manufacturing.svg"
  },
  {
    quote: "Patient records, compliance, HIPAA: the stakes are real. SynAck brought structure and documentation we never had before. I sleep better now.",
    name: "Priya S.",
    title: "Practice Administrator",
    company: "Crestview Medical Associates",
    industry: "Healthcare",
    logo: null, // replace with "/logos/crestview-medical.svg"
  },
  {
    quote: "We went through three MSPs in four years. SynAck is the first that made us feel like we weren't a client on a spreadsheet. They know our environment cold.",
    name: "Ryan O.",
    title: "Managing Partner",
    company: "Halloran & Drake Legal",
    industry: "Legal",
    logo: null, // replace with "/logos/halloran-drake.svg"
  },
];

const principles = [
  {
    num:   "PRINCIPLE 01",
    title: "Ownership is the deliverable.",
    body:  "Tickets, response times, SLAs: byproducts. Not products. The deliverable is an environment someone fully owns. Knows end to end. Can answer for. Is responsible when something goes wrong. Without that, everything else is theatre.",
  },
  {
    num:   "PRINCIPLE 02",
    title: "React less. Not faster.",
    body:  "Most managed IT companies measure response time. We measure incident frequency. A four-minute response is impressive only if you couldn't have prevented the incident. Most of the time, you could have.",
  },
  {
    num:   "PRINCIPLE 03",
    title: "If we can't explain it, we don't understand it.",
    body:  "Every environment we run, we can explain to a non-technical owner in five minutes. If we can't, the issue isn't the owner. It's the environment. The work is to close that gap.",
  },
];


function TestimonialCard({ t, dark }: { t: (typeof testimonials)[number]; dark: boolean }) {
  return (
    <div
      className="flex flex-col h-full rounded-[20px] overflow-hidden"
      style={{
        background: dark ? "linear-gradient(160deg,#102347,#0A1628)" : "#FFFFFF",
        border: dark ? "1px solid rgba(122,180,238,.18)" : "1px solid #B8D4F7",
        boxShadow: dark ? "0 16px 36px rgba(16,35,71,.14)" : "0 4px 20px rgba(16,35,71,.06)",
        padding: "32px 28px 28px",
        position: "relative",
      }}
    >
      {dark && (
        <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, background: "radial-gradient(circle, rgba(36,114,200,.35) 0%, transparent 60%)", pointerEvents: "none" }} />
      )}

      {/* Brand logo placeholder + industry pill */}
      <div className="flex items-center justify-between" style={{ position: "relative", zIndex: 1, marginBottom: 22 }}>
        {/* Brand logo — swap null for a real path when available */}
        {t.logo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={t.logo} alt={t.company} style={{ height: 28, maxWidth: 110, objectFit: "contain", filter: dark ? "brightness(0) invert(1) opacity(0.6)" : "opacity(0.55)" }} />
        ) : (
          <div
            style={{ height: 32, minWidth: 80, maxWidth: 120, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: dark ? "rgba(255,255,255,.06)" : "#F0F5FC", border: dark ? "1px solid rgba(122,180,238,.12)" : "1px solid #DDE8F5", padding: "0 10px", gap: 6 }}
            title="Logo coming soon"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.35, flexShrink: 0 }}>
              <rect x="3" y="3" width="18" height="18" rx="3" stroke={dark ? "#7AB4EE" : "#2472C8"} strokeWidth="1.5"/>
              <path d="M3 9h18M9 21V9" stroke={dark ? "#7AB4EE" : "#2472C8"} strokeWidth="1.5"/>
            </svg>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", color: dark ? "rgba(122,180,238,.45)" : "rgba(30,77,140,.4)", whiteSpace: "nowrap" }}>
              {t.company.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
        )}

        <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 999, fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: dark ? "rgba(36,114,200,.15)" : "#EAF2FC", color: dark ? "#3D8FE0" : "#2472C8", border: dark ? "1px solid rgba(61,143,224,.2)" : "1px solid #B8D4F7" }}>
          {t.industry}
        </span>
      </div>

      {/* Quote mark */}
      <div style={{ fontFamily: "var(--font-outfit)", fontSize: 56, fontWeight: 900, lineHeight: 0.7, marginBottom: 16, color: dark ? "rgba(61,143,224,.3)" : "rgba(36,114,200,.12)", position: "relative", zIndex: 1 }}>
        &ldquo;
      </div>

      {/* Quote text */}
      <p className="flex-1" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(14px,1.15vw,15.5px)", fontWeight: 500, lineHeight: 1.75, color: dark ? "#EAF2FC" : "#1E3A5F", marginBottom: 28, position: "relative", zIndex: 1 }}>
        {t.quote}
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: dark ? "rgba(122,180,238,.15)" : "#EAF2FC", marginBottom: 20 }} />

      {/* Attribution */}
      <div className="flex items-center gap-3" style={{ position: "relative", zIndex: 1 }}>
        <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 40, height: 40, background: dark ? "rgba(36,114,200,.2)" : "#EAF2FC", border: dark ? "1px solid rgba(61,143,224,.3)" : "1px solid #B8D4F7", fontFamily: "var(--font-outfit)", fontSize: 13.5, fontWeight: 800, color: dark ? "#3D8FE0" : "#2472C8" }}>
          {t.name.charAt(0)}
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 800, letterSpacing: "-0.01em", color: dark ? "#EAF2FC" : "#0A1628", lineHeight: 1.2 }}>
            {t.name}
          </div>
          <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12.5, fontWeight: 500, color: dark ? "#7AB4EE" : "#1E4D8C", marginTop: 2 }}>
            {t.title} · {t.company}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <main className="pt-[68px]">
      <style>{css}</style>

      {/* ── HERO ── */}
      <section className="relative bg-bg-page overflow-hidden" style={{ paddingTop: 0 }}>
        {/* Glows */}
        <div className="absolute pointer-events-none" style={{ bottom: 0, left: -100, width: 480, height: 480, background: "radial-gradient(circle, rgba(36,114,200,.15) 0%, transparent 60%)" }} />
        <div className="absolute pointer-events-none" style={{ top: 100, right: -80, width: 360, height: 360, background: "radial-gradient(circle, rgba(36,114,200,.08) 0%, transparent 60%)" }} />
        {/* Concentric rings */}
        <div className="absolute pointer-events-none" style={{ bottom: -200, left: "50%", transform: "translateX(-50%)", width: 1100, height: 1100, borderRadius: "50%", border: "1px solid #B8D4F7", opacity: 0.35 }}>
          <div style={{ position: "absolute", inset: 80, borderRadius: "50%", border: "1px solid #B8D4F7", opacity: 0.7 }} />
          <div style={{ position: "absolute", inset: 180, borderRadius: "50%", border: "1px solid #B8D4F7", opacity: 0.5 }} />
        </div>
        {/* Sparkles */}
        {[
          { top: 180, left: "8%",  size: 22, delay: "0s",   opacity: 0.55 },
          { top: 90,  right: "12%",size: 18, delay: "1.4s", opacity: 0.55 },
          { top: 320, left: "14%", size: 16, delay: "2.6s", opacity: 0.35 },
          { top: 240, right: "8%", size: 24, delay: ".8s",  opacity: 0.55 },
        ].map((s, i) => (
          <div key={i} className="ab-twinkle absolute pointer-events-none" style={{ top: s.top, left: s.left, right: (s as {right?:string}).right, width: s.size, height: s.size, color: "#2472C8", opacity: s.opacity, animationDelay: s.delay }}>
            <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }}><path d="M12 2 L13 10 L21 11 L13 12 L12 21 L11 12 L3 11 L11 10 Z" fill="currentColor"/></svg>
          </div>
        ))}

        {/* ── Center content ── */}
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-10 pt-20 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 mb-8 rounded-full" style={{ padding: "6px 16px 6px 8px", background: "#FFFFFF", border: "1px solid #B8D4F7", boxShadow: "0 4px 14px rgba(16,35,71,.05)" }}>
              <span className="inline-flex items-center gap-1.5 rounded-full" style={{ padding: "4px 10px", background: "rgba(34,160,90,.10)", fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "#22A05A" }}>
                <span className="ab-blink w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#22A05A" }} />
                About SynAck
              </span>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13.5, fontWeight: 600, color: "#0A1628" }}>Engineering-first MSP · NY · NJ · MD · MN</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-outfit font-black mx-auto mb-7" style={{ fontSize: "clamp(48px,7vw,88px)", letterSpacing: "-0.045em", lineHeight: 0.98, maxWidth: "18ch", color: "#0A1628" }}>
              Most IT problems aren&apos;t technical.{" "}
              They&apos;re ownership problems.
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mx-auto mb-20 font-medium text-text-muted" style={{ fontSize: "clamp(15px,1.6vw,18px)", maxWidth: "50ch", lineHeight: 1.7 }}>
              We don&apos;t manage tickets. We own environments. The difference shows up over time.
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div className="flex items-center justify-center gap-3.5 mb-20 flex-wrap">
              <Link href="/contact" className="btn btn-primary">
                Free assessment <IconArrowRight size={14} stroke={2} />
              </Link>
              <Link href="/services" className="btn btn-outline">
                How we work
              </Link>
            </div>
          </FadeUp>
        </div>

        {/* ── Card grid ── */}
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-10">
          <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.95fr 1fr 1fr 1.15fr", gap: 16, alignItems: "end" }}>

            {/* Card 1 — dark, 340px, network viz */}
            <FadeUp delay={0.3}>
              <div style={{ height: 340, background: "linear-gradient(160deg,#102347,#0A1628)", border: "1px solid rgba(122,180,238,.18)", borderRadius: 22, padding: 22, boxShadow: "0 16px 36px rgba(16,35,71,.12)", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(36,114,200,.4) 0%, transparent 60%)", pointerEvents: "none" }} />
                <span className="ab-blink" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "rgba(122,180,238,.10)", border: "1px solid rgba(122,180,238,.20)", borderRadius: 999, fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3D8FE0", alignSelf: "flex-start", position: "relative", zIndex: 1, animationName: "none" }}>
                  <span className="ab-blink w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#22A05A" }} />
                  Currently managing
                </span>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", margin: "16px 0", position: "relative", zIndex: 1 }}>
                  <svg viewBox="0 0 240 160" style={{ width: "100%", maxHeight: 160 }}>
                    {[[[120,80],[40,30]],[[120,80],[200,30]],[[120,80],[30,80]],[[120,80],[210,80]],[[120,80],[40,130]],[[120,80],[200,130]]].map(([a,b],i) => (
                      <path key={i} d={`M${a[0]},${a[1]} L${b[0]},${b[1]}`} stroke="rgba(122,180,238,.25)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
                    ))}
                    {[[40,30],[200,30],[30,80],[210,80],[40,130],[200,130]].map(([cx,cy],i) => (
                      <circle key={i} cx={cx} cy={cy} r="6" fill="#3D8FE0" opacity=".9"/>
                    ))}
                    <rect x="100" y="64" width="40" height="32" rx="8" fill="#3D8FE0"/>
                    <text x="120" y="84" textAnchor="middle" fontFamily="Outfit" fontSize="11" fontWeight="800" fill="#102347">SA</text>
                  </svg>
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontFamily: "var(--font-outfit)", fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em", color: "#EAF2FC", marginBottom: 4 }}>Managed environment</div>
                  <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12.5, color: "#7AB4EE", fontWeight: 500 }}>247 endpoints across four states</div>
                </div>
              </div>
            </FadeUp>

            {/* Card 2 — white, 260px, big stat */}
            <FadeUp delay={0.38}>
              <div style={{ height: 260, background: "#FFFFFF", border: "1px solid #B8D4F7", borderRadius: 22, padding: 22, boxShadow: "0 16px 36px rgba(16,35,71,.08)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-outfit)", fontSize: 56, fontWeight: 900, color: "#0A1628", letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 12 }}>247</div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13.5, fontWeight: 500, color: "#1E4D8C", maxWidth: "18ch", lineHeight: 1.4 }}>Endpoints under management</div>
              </div>
            </FadeUp>

            {/* Card 3 — dark, 300px, identity */}
            <FadeUp delay={0.46}>
              <div style={{ height: 300, background: "linear-gradient(160deg,#102347,#0A1628)", border: "1px solid rgba(122,180,238,.18)", borderRadius: 22, padding: 22, boxShadow: "0 16px 36px rgba(16,35,71,.12)", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(36,114,200,.4) 0%, transparent 60%)", pointerEvents: "none" }} />
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(36,114,200,.20)", border: "1px solid rgba(122,180,238,.25)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: "#3D8FE0", strokeWidth: 2, fill: "none" }}>
                    <rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontFamily: "var(--font-outfit)", fontSize: 24, fontWeight: 800, letterSpacing: "-0.025em", color: "#EAF2FC", lineHeight: 1.15, marginBottom: 6 }}>Identity.<br/>Not network.</div>
                  <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12.5, color: "#7AB4EE", fontWeight: 500, lineHeight: 1.5 }}>The perimeter moved years ago. We secure accordingly.</div>
                </div>
              </div>
            </FadeUp>

            {/* Card 4 — dark, 270px, uptime + bars */}
            <FadeUp delay={0.52}>
              <div style={{ height: 270, background: "linear-gradient(160deg,#102347,#0A1628)", border: "1px solid rgba(122,180,238,.18)", borderRadius: 22, padding: 22, boxShadow: "0 16px 36px rgba(16,35,71,.12)", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(36,114,200,.4) 0%, transparent 60%)", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontFamily: "var(--font-outfit)", fontSize: 24, fontWeight: 800, letterSpacing: "-0.025em", color: "#EAF2FC", lineHeight: 1.15, marginBottom: 6 }}>99.98%</div>
                  <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12.5, color: "#7AB4EE", fontWeight: 500 }}>Uptime, sustained</div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 70, position: "relative", zIndex: 1 }}>
                  {[30, 55, 40, 75, 100].map((h, i) => (
                    <div key={i} style={{ flex: 1, borderRadius: "4px 4px 0 0", height: `${h}%`, background: i === 4 ? "#3D8FE0" : "rgba(122,180,238,.25)", boxShadow: i === 4 ? "0 0 14px rgba(61,143,224,.5)" : "none" }} />
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Card 5 — white, 340px, regions + globe */}
            <FadeUp delay={0.58}>
              <div style={{ height: 340, background: "#FFFFFF", border: "1px solid #B8D4F7", borderRadius: 22, padding: 22, boxShadow: "0 16px 36px rgba(16,35,71,.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: "var(--font-outfit)", fontSize: 56, fontWeight: 900, letterSpacing: "-0.05em", color: "#0A1628", lineHeight: 0.95 }}>4</div>
                    <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1E4D8C" }}>Regions</div>
                  </div>
                  <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13.5, fontWeight: 500, color: "#1E4D8C", marginTop: 4 }}>Where we currently operate.</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                    {[{l:"New York",dark:true},{l:"New Jersey",dark:true},{l:"Maryland",dark:false},{l:"Minnesota",dark:false}].map((r,i) => (
                      <span key={i} style={{ padding: "5px 12px", borderRadius: 999, fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", background: r.dark ? "#102347" : "#EAF2FC", color: r.dark ? "#3D8FE0" : "#2472C8", border: r.dark ? "none" : "1px solid #B8D4F7" }}>{r.l}</span>
                    ))}
                  </div>
                </div>
                <svg style={{ alignSelf: "flex-end", width: 80, height: 80 }} viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="36" fill="#102347"/>
                  <ellipse cx="40" cy="40" rx="36" ry="14" fill="none" stroke="#7AB4EE" strokeWidth=".8" opacity=".4"/>
                  <ellipse cx="40" cy="40" rx="14" ry="36" fill="none" stroke="#7AB4EE" strokeWidth=".8" opacity=".4"/>
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#7AB4EE" strokeWidth=".8" opacity=".4"/>
                  <path d="M18 32 Q28 28 38 34 Q46 30 56 36 Q60 40 58 46 Q50 50 42 48 Q32 52 22 46 Z" fill="#3D8FE0" opacity=".7"/>
                  <circle cx="48" cy="34" r="2.5" fill="#22A05A"/>
                  <circle cx="32" cy="44" r="2.5" fill="#22A05A"/>
                </svg>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── THE NAME ── */}
      <section className="bg-bg-page py-20">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="grid md:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">

            {/* Left — text */}
            <div>
              <FadeUp><Eyebrow>The Name</Eyebrow></FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-outfit text-[clamp(34px,4.4vw,54px)] font-black tracking-[-0.04em] leading-[1.04] text-text-heading mt-2 mb-6">
                  Why SynAck.
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-[clamp(15px,1.5vw,17px)] text-text-body leading-[1.75] mb-4">
                  SynAck is the TCP three-way handshake —{" "}
                  <strong className="text-text-heading font-bold">SYN. SYN-ACK. ACK.</strong>{" "}
                  The sequence that establishes every reliable connection on the internet.
                </p>
                <p className="text-[clamp(15px,1.5vw,17px)] text-text-body leading-[1.75]">
                  The name is deliberate. Both sides agree before anything moves.{" "}
                  <span className="font-semibold">Acknowledged. Established. Documented.</span>{" "}
                  That&apos;s how we operate.
                </p>
              </FadeUp>
            </div>

            {/* Right — diagram */}
            <FadeUp delay={0.15}>
              <div
                className="rounded-[20px] overflow-hidden"
                style={{ border: "1px solid #B8D4F7", boxShadow: "0 8px 40px rgba(16,35,71,.09)" }}
              >
                {/* Dark header */}
                <div
                  className="flex items-center justify-between px-6 py-3.5"
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
                <div className="grid grid-cols-2 border-b border-border-light" style={{ background: "#F8FAFD" }}>
                  {[
                    { side: "left",  role: "Client", name: "SynAck",        initials: "SA", dark: true  },
                    { side: "right", role: "Server", name: "Your Business",  initials: "YB", dark: false },
                  ].map(p => (
                    <div
                      key={p.role}
                      className={`flex items-center gap-3 px-6 py-4 ${p.side === "right" ? "justify-end flex-row-reverse" : ""}`}
                    >
                      <div
                        className="flex items-center justify-center rounded-[9px] flex-shrink-0"
                        style={{
                          width: 36, height: 36,
                          background: p.dark ? "linear-gradient(160deg,#102347,#0A1628)" : "#FFFFFF",
                          border: p.dark ? "none" : "1.5px solid #B8D4F7",
                          fontFamily: "var(--font-outfit)",
                          fontSize: 12.5,
                          fontWeight: 800,
                          color: p.dark ? "#3D8FE0" : "#1E4D8C",
                        }}
                      >
                        {p.initials}
                      </div>
                      <div className={p.side === "right" ? "text-right" : ""}>
                        <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1E4D8C", marginBottom: 2 }}>{p.role}</div>
                        <div style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 800, letterSpacing: "-0.02em", color: "#0A1628" }}>{p.name}</div>
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
                      className="px-6 py-4"
                      style={{ borderBottom: i < arr.length - 1 ? "1px solid #EAF2FC" : "none" }}
                    >
                      <div className={`flex items-baseline gap-2.5 mb-2.5 ${s.dir === "left" ? "justify-end" : ""}`}>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, color: "rgba(36,114,200,.4)", letterSpacing: "0.06em" }}>{s.num}</span>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#2472C8" }}>{s.label}</span>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12.5, fontWeight: 400, color: "#1E4D8C" }}>— {s.desc}</span>
                      </div>
                      <div className="flex items-center h-2.5">
                        {s.dir === "right" ? (
                          <>
                            <div className="flex-1 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #2472C8 0%, rgba(36,114,200,.2) 100%)" }} />
                            <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "8px solid #2472C8" }} />
                          </>
                        ) : (
                          <>
                            <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderRight: "8px solid #2472C8" }} />
                            <div className="flex-1 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, rgba(36,114,200,.2) 0%, #2472C8 100%)" }} />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div
                  className="px-6 py-3.5 border-t border-border-light"
                  style={{ background: "#F8FAFD", fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "#1E4D8C", lineHeight: 1.6 }}
                >
                  Ownership established. Control transferred. Every action documented from this point forward.
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── WHY WE BUILT IT ── */}
      <section className="bg-bg-page py-20">
        <div className="max-w-site mx-auto px-5 lg:px-10">

          {/* Prose — full width, two columns of text */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start mb-14">
            <div>
              <FadeUp><Eyebrow>The Origin</Eyebrow></FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-outfit text-[clamp(34px,4.4vw,54px)] font-black tracking-[-0.04em] leading-[1.04] text-text-heading mt-2">
                  After enough years,{" "}
                  the patterns repeat.
                </h2>
              </FadeUp>
            </div>
            <FadeUp delay={0.2}>
              <div className="md:pt-[calc(1.5em+10px)] flex flex-col gap-4">
                <p className="text-[clamp(15px,1.5vw,17px)] text-text-body leading-[1.75]">
                  Something breaks. The previous IT company patches the symptom. Bills for the time. Leaves no documentation. Six months later, the same root cause produces a different failure, until something serious goes down and no one understands the environment well enough to fix it cleanly.
                </p>
                <p className="text-[clamp(15px,1.5vw,17px)] text-text-body leading-[1.75]">
                  In small and mid-size business IT, this isn&apos;t an exception.{" "}
                  <span className="font-semibold">It&apos;s the default.</span>{" "}
                  We built SynAck to own the environment from day one: document everything, and measure success by the absence of incidents, not the speed of response.
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Full-bleed pull-quote band */}
          <FadeUp delay={0.2}>
            <div
              className="relative rounded-[20px] overflow-hidden px-10 py-10 md:px-16 md:py-12"
              style={{
                background: "linear-gradient(100deg, #0A1628 0%, #102347 50%, #0D1D3B 100%)",
                boxShadow: "0 2px 0 rgba(61,143,224,.10) inset, 0 24px 56px rgba(10,22,40,.20)",
                border: "1px solid rgba(36,114,200,.12)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "linear-gradient(rgba(36,114,200,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(36,114,200,.04) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }} />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <p
                  className="font-outfit font-black leading-[1.15]"
                  style={{ fontSize: "clamp(22px,3vw,36px)", letterSpacing: "-0.03em", color: "#EAF2FC", maxWidth: "22ch" }}
                >
                  Not a faster ticket queue.{" "}
                  <span style={{ color: "#3D8FE0" }}>A system that doesn&apos;t generate them.</span>
                </p>
                <div className="flex-shrink-0 flex items-center gap-3">
                  <div className="w-px h-10 bg-white/10 hidden md:block" />
                  <p className="text-[13.5px] leading-[1.65]" style={{ color: "rgba(122,180,238,.6)", maxWidth: "22ch" }}>
                    The metric we optimize for isn&apos;t speed of response. It&apos;s absence of incidents.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      <TimelineSection />

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
                Not by salespeople.
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
                            fontSize: 10,
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
                        fontSize: 10,
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
                        fontSize: 17,
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

      {/* ── TESTIMONIALS ── */}
      <section className="bg-bg-page py-24">
        <div className="max-w-site mx-auto px-5 lg:px-10">

          {/* Header */}
          <div className="max-w-[640px] mx-auto text-center mb-14">
            <FadeUp>
              <div className="inline-flex items-center gap-2.5 mb-[22px]">
                <span className="w-6 h-0.5 bg-accent rounded-sm" />
                <span className="text-[11px] font-bold tracking-[0.17em] uppercase text-accent">Client Stories</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-outfit text-[clamp(34px,4.4vw,54px)] font-black tracking-[-0.04em] leading-[1.04] text-text-heading mb-[18px]">
                Don&apos;t take our word for it.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-[clamp(15px,1.5vw,17px)] text-text-body leading-[1.7] max-w-[48ch] mx-auto">
                The measure of ownership is what clients say after two years, not after two weeks.
              </p>
            </FadeUp>
          </div>

          {/* Row 1 — 3 cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-5">
            {testimonials.slice(0, 3).map((t, i) => {
              const dark = i === 1;
              return (
                <FadeUp key={t.name} delay={i * 0.12 + 0.1}>
                  <TestimonialCard t={t} dark={dark} />
                </FadeUp>
              );
            })}
          </div>

          {/* Row 2 — 2 cards centered */}
          <div className="grid md:grid-cols-2 gap-5 md:max-w-[66%] mx-auto">
            {testimonials.slice(3).map((t, i) => {
              const dark = i === 1;
              return (
                <FadeUp key={t.name} delay={i * 0.12 + 0.45}>
                  <TestimonialCard t={t} dark={dark} />
                </FadeUp>
              );
            })}
          </div>

        </div>
      </section>

      <CtaSection />
    </main>
  );
}
