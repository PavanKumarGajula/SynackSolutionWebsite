"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  IconArrowRight,
  IconHeadset, IconCloud, IconRouter, IconPackage, IconDatabaseExport,
  IconDeviceTv, IconBuildingWarehouse, IconRadar, IconShieldCheck,
  IconMailCheck, IconBug, IconUserShield, IconCamera, IconClipboardCheck,
  IconLock, IconChartBar, IconFileCertificate, IconFileCheck,
  IconSettings2, IconUsersGroup, IconSparkles, IconShieldLock,
  IconShare2, IconKey,
} from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type IconComp = React.ComponentType<{ size?: number; stroke?: number }>;
const ICON_MAP: Record<string, IconComp> = {
  "ti-headset":            IconHeadset,
  "ti-cloud":              IconCloud,
  "ti-router":             IconRouter,
  "ti-package":            IconPackage,
  "ti-database-export":    IconDatabaseExport,
  "ti-device-tv":          IconDeviceTv,
  "ti-building-warehouse": IconBuildingWarehouse,
  "ti-radar":              IconRadar,
  "ti-shield-check":       IconShieldCheck,
  "ti-mail-check":         IconMailCheck,
  "ti-bug":                IconBug,
  "ti-user-shield":        IconUserShield,
  "ti-camera":             IconCamera,
  "ti-clipboard-check":    IconClipboardCheck,
  "ti-lock":               IconLock,
  "ti-chart-bar":          IconChartBar,
  "ti-file-certificate":   IconFileCertificate,
  "ti-file-check":         IconFileCheck,
  "ti-settings-2":         IconSettings2,
  "ti-users-group":        IconUsersGroup,
  "ti-sparkles":           IconSparkles,
  "ti-shield-lock":        IconShieldLock,
  "ti-share-2":            IconShare2,
  "ti-key":                IconKey,
};

/* ── Types ── */
type Svc  = { icon: string; name: string; desc: string };
type Area = {
  num: string; label: string; fullName: string; count: number; color: string;
  scopeDesc: string; scopeServices: string[];
  headlineA: string; headlineItalic: string; headlineB?: string;
  sub: string; services: Svc[];
};

/* ── Data ── */
const AREAS: Area[] = [
  {
    num: "01", label: "Foundation", fullName: "Managed IT & Infrastructure",
    count: 7, color: "#2472C8",
    scopeDesc: "The foundation that keeps the business running.",
    scopeServices: ["Managed IT", "M365 & Cloud", "Network", "Backup & DR", "Procurement", "AV", "Build-outs"],
    headlineA: "Good infrastructure is",
    headlineItalic: "invisible.",
    sub: "Most foundations are whatever the last vendor left behind — an undocumented switch closet, a help desk that responds without resolving, a backup running for years but never restored. We rebuild the stack so it stops being the thing you worry about.",
    services: [
      { icon: "ti-headset",            name: "Managed IT & Help Desk",            desc: "4-min average response. Senior engineers only — no tier-1 triage." },
      { icon: "ti-cloud",              name: "Microsoft 365 & Cloud",             desc: "Tenant administration, licensing, Entra ID, migration support." },
      { icon: "ti-router",             name: "Network Infrastructure",            desc: "Wi-Fi · firewalls · switching · VPN — designed for sub-second failover." },
      { icon: "ti-package",            name: "IT Asset Procurement & Lifecycle",  desc: "From PO to e-waste certificate. Serial-tagged asset register, warranty calendar, devices wiped to NIST 800-88 at end of life." },
      { icon: "ti-database-export",    name: "Backup & Disaster Recovery",        desc: "Backups verified weekly. Restore tested monthly. RTO measured, not assumed." },
      { icon: "ti-device-tv",          name: "Audio/Visual & Conference Rooms",   desc: "Teams Rooms, Crestron, Polycom — installed, configured, supported." },
      { icon: "ti-building-warehouse", name: "Office Build-Outs & Relocations",   desc: "Cabling, network design, day-one-ready before the movers leave." },
    ],
  },
  {
    num: "02", label: "Protection", fullName: "Cybersecurity",
    count: 6, color: "#E84040",
    scopeDesc: "Identity-first security built around the M365 ecosystem.",
    scopeServices: ["MDR", "EDR", "Email Security", "Pen Test", "Awareness", "Physical Security"],
    headlineA: "The perimeter isn't the firewall. It's the",
    headlineItalic: "identity layer.",
    sub: "Identity-first security built around Microsoft 365, Conditional Access, MFA, and device trust.",
    services: [
      { icon: "ti-radar",        name: "Managed Detection & Response",  desc: "24/7 SOC. Mean response: 12 min. Containment runbooks tested quarterly." },
      { icon: "ti-shield-check", name: "Endpoint Security (EDR)",       desc: "Device trust, isolation on compromise, behavioral detection." },
      { icon: "ti-mail-check",   name: "Email Security",                desc: "DLP, anti-phishing, external sender warnings, attachment sandboxing." },
      { icon: "ti-bug",          name: "Vulnerability Mgmt & Pen Test", desc: "Quarterly internal scans. Annual third-party pen test. Tracked remediation." },
      { icon: "ti-user-shield",  name: "Security Awareness Training",   desc: "Monthly phishing simulations. Targeted training where it lands." },
      { icon: "ti-camera",       name: "Physical Security",             desc: "Rhombus cameras · Brivo access control · integrated into IT identity." },
    ],
  },
  {
    num: "03", label: "Governance", fullName: "Compliance & Risk",
    count: 5, color: "#22A05A",
    scopeDesc: "Compliance readiness — HIPAA, SOC 2, NIST CSF.",
    scopeServices: ["Gap Assessments", "Controls", "Risk", "Policy", "Audit Support"],
    headlineA: "Compliance is a",
    headlineItalic: "posture.",
    headlineB: " Not a 60-day scramble.",
    sub: "Compliance readiness and technical controls support — HIPAA, SOC 2, and NIST CSF as frameworks, not promises.",
    services: [
      { icon: "ti-clipboard-check",  name: "Compliance Readiness & Gap Assessments", desc: "Control-by-control mapping. Specific gaps with specific remediation steps. No vague \"enhance security\" findings." },
      { icon: "ti-lock",             name: "Technical Controls Implementation",       desc: "Controls deployed to your environment. Not bolted on before audit." },
      { icon: "ti-chart-bar",        name: "Risk Assessments",                        desc: "Annual review. Documented threat model. Risk register maintained." },
      { icon: "ti-file-certificate", name: "Policy Development & Documentation",      desc: "Drafted, versioned, approved. Policies that match how you actually operate." },
      { icon: "ti-file-check",       name: "Audit Support & Evidence Collection",     desc: "Year-round evidence trail. Auditor questions answered before they're asked." },
    ],
  },
  {
    num: "04", label: "Productivity", fullName: "Modern Workplace & Identity",
    count: 6, color: "#8B5CF6",
    scopeDesc: "Workplace governance & identity lifecycle.",
    scopeServices: ["M365 Governance", "JML", "Copilot", "Purview", "Collaboration", "Access Reviews"],
    headlineA: "Joiners day one. Leavers day zero.",
    headlineItalic: "Copilot",
    headlineB: " without the surprises.",
    sub: "Most M365 tenants drift the moment they're set up — shared mailboxes nobody owns, guest accounts from a 2022 vendor, Copilot enabled before Purview was configured. We bring the tenant back to a defined state, and keep it there.",
    services: [
      { icon: "ti-settings-2",  name: "Microsoft 365 Governance",        desc: "Least privilege by default. Tenant settings documented, not improvised." },
      { icon: "ti-users-group", name: "Identity Governance & Lifecycle",  desc: "JML automation across Entra. Zero orphan accounts." },
      { icon: "ti-sparkles",    name: "Microsoft 365 Copilot Readiness",  desc: "Data classification first. Then Copilot. Not the other way around." },
      { icon: "ti-shield-lock", name: "Data Protection",                  desc: "Purview sensitivity labels, classification, DLP — applied consistently." },
      { icon: "ti-share-2",     name: "Secure Collaboration",             desc: "Teams, SharePoint, external sharing — governed, not wide open." },
      { icon: "ti-key",         name: "Access Reviews",                   desc: "Quarterly automated reviews. Approvals tracked. Stale access removed." },
    ],
  },
];

const PHASES = [
  { num: "01", name: "Discover",    body: "We map the environment before we touch it. Every endpoint inventoried. Every backup tested." },
  { num: "02", name: "Standardize", body: "Identity federated. Permissions mapped. Patching standardized. The foundation gets fixed once." },
  { num: "03", name: "Stabilize",   body: "Monitoring in place. Runbooks tested. Repeat issues closed at the root, not the symptom." },
  { num: "04", name: "Improve",     body: "Forever, not until renewal. Monthly roadmap. The environment gets better every quarter." },
];

/* ── FI: fade-in animation wrapper ── */
function FI({
  children, delay = 0, y = 18, className = "", style,
}: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ── PhaseColumns: line-draw sequential reveal ── */
function PhaseColumns() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      {/* 4 columns — number top, content bottom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0" style={{ height: 280 }}>
        {PHASES.map((phase, i) => (
          <motion.div
            key={phase.num}
            initial={{ opacity: 0.18 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: i * 0.5, ease: EASE }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              paddingBottom: 40,
              paddingRight: 28,
              paddingLeft: 28,
              borderRight: i < PHASES.length - 1 ? "1px solid rgba(30,77,140,.12)" : "none",
            }}
          >
            {/* Number at top */}
            <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, fontWeight: 500, color: "#1E4D8C", letterSpacing: "0.02em" }}>
              {phase.num}
            </div>

            {/* Heading + body pinned to bottom */}
            <div>
              <div className="font-outfit font-black" style={{ fontSize: "clamp(17px,1.8vw,24px)", color: "#0A1628", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 10 }}>
                {phase.name}
              </div>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13.5, color: "#1E4D8C", lineHeight: 1.75 }}>
                {phase.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Track + animated fill + dots — desktop only */}
      <div className="hidden lg:block">
        <div style={{ height: 1, background: "rgba(30,77,140,.12)", position: "relative", overflow: "hidden" }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 2, delay: 0.05, ease: EASE }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#2472C8,#3D8FE0)", transformOrigin: "left" }}
          />
        </div>
        <div className="grid grid-cols-4" style={{ marginTop: -7 }}>
          {PHASES.map((_, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "center" }}>
              <motion.div
                initial={{ scale: 0.35, backgroundColor: "rgba(36,114,200,.22)" }}
                animate={inView ? { scale: 1, backgroundColor: "#2472C8" } : {}}
                transition={{ duration: 0.35, delay: i * 0.5 + 0.05, ease: EASE }}
                style={{ width: 13, height: 13, borderRadius: "50%" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function Services() {
  const heroRef  = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="pt-[68px]">

      {/* ══════════════════ HERO ══════════════════ */}
      <section
        ref={heroRef}
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: "calc(100vh - 68px)", background: "#F4F7FB" }}
      >
        {/* Ambient glow */}
        <div className="absolute pointer-events-none" style={{ top: "18%", left: "32%", width: 600, height: 600, background: "radial-gradient(circle,rgba(36,114,200,.07) 0%,transparent 65%)" }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top,#F4F7FB,transparent)" }} />

        <div className="relative z-10 max-w-site mx-auto px-5 lg:px-10 w-full py-24">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

            {/* Left: text */}
            <div className="max-w-[700px]">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
                className="inline-flex items-center gap-2.5 mb-8"
              >
                <span className="w-5 h-px rounded-full" style={{ background: "#2472C8" }} />
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2472C8" }}>
                  What We Do
                </span>
              </motion.div>

              <h1 className="font-outfit font-black mb-8" style={{ fontSize: "clamp(38px,5.5vw,70px)", letterSpacing: "-0.04em", lineHeight: 1.02, color: "#0A1628" }}>
                {(["From the help desk ticket", "to the"] as const).map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: "110%" }}
                      animate={heroInView ? { y: 0 } : {}}
                      transition={{ duration: 0.75, delay: 0.18 + i * 0.13, ease: EASE }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={heroInView ? { y: 0 } : {}}
                    transition={{ duration: 0.75, delay: 0.44, ease: EASE }}
                  >
                    <span style={{ color: "#2472C8" }}>SOC 2 audit.</span>{" "}
                    <span>One owner.</span>
                  </motion.span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.64, ease: EASE }}
                style={{ fontSize: "clamp(15px,1.35vw,17px)", color: "#1E4D8C", lineHeight: 1.82, marginBottom: 40, maxWidth: "58ch" }}
              >
                A help desk ticket that bounces between two MSPs for three days. An audit nobody has the documentation for. A new hire who can&apos;t log in until Tuesday because the M365 admin is on vacation. We own those seams — twenty-four services, four areas, one accountable team.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
              >
                <Link href="/contact" className="btn btn-primary">
                  Talk to us <IconArrowRight size={14} stroke={2} />
                </Link>
              </motion.div>
            </div>

            {/* Right: 24 stat + breakdown */}
            <motion.div
              className="hidden lg:block flex-shrink-0"
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.48, ease: EASE }}
            >
              <div style={{ background: "#FFFFFF", border: "1px solid #B8D4F7", borderRadius: 22, overflow: "hidden", boxShadow: "0 8px 32px rgba(16,35,71,.08)", minWidth: 268 }}>
                {/* Big number */}
                <div style={{ padding: "32px 36px 24px", borderBottom: "1px solid #B8D4F7" }}>
                  <div className="font-outfit font-black" style={{ fontSize: 100, color: "#2472C8", letterSpacing: "-0.06em", lineHeight: 1 }}>24</div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13.5, fontStyle: "italic", color: "rgba(30,77,140,.45)", lineHeight: 1.5, maxWidth: "18ch", marginTop: 8 }}>
                    Services covered under one contract
                  </p>
                </div>
                {/* Area breakdown */}
                <div>
                  {AREAS.map((a, i) => (
                    <div key={a.num} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 24px", borderBottom: i < AREAS.length - 1 ? "1px solid rgba(30,77,140,.08)" : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, flexShrink: 0, display: "inline-block" }} />
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13.5, fontWeight: 500, color: "#1E4D8C" }}>{a.label}</span>
                      </div>
                      <span style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 800, color: a.color }}>{a.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════ SCOPE STRIP ══════════════════ */}
      <section style={{ background: "#FFFFFF" }}>
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderLeft: "1px solid #B8D4F7" }}>
            {AREAS.map((area, i) => (
              <FI key={area.num} delay={i * 0.09} y={12}
                className="px-7 py-10"
                style={{ borderRight: "1px solid #B8D4F7", borderTop: "1px solid #B8D4F7" } as React.CSSProperties}
              >
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: area.color, marginBottom: 10 }}>
                  {area.num} · {area.label}
                </div>
                <div className="font-outfit font-black" style={{ fontSize: 52, color: "#0A1628", letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 6 }}>
                  {area.count}
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13.5, color: "#1E4D8C", marginBottom: 18, lineHeight: 1.6 }}>
                  {area.scopeDesc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5 }}>
                  {area.scopeServices.map(svc => (
                    <span key={svc} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 999, background: `${area.color}14`, border: `1px solid ${area.color}28`, color: area.color }}>
                      {svc}
                    </span>
                  ))}
                </div>
              </FI>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ AREA SECTIONS ══════════════════ */}
      {AREAS.map((area, aIdx) => {
        const bg      = aIdx % 2 === 0 ? "#FFFFFF" : "#F4F7FB";
        const cardBg  = bg === "#FFFFFF" ? "#F4F7FB" : "#FFFFFF";
        const isOdd   = area.services.length % 2 !== 0;
        return (
          <section key={area.num} style={{ background: bg, paddingTop: 96, paddingBottom: 96 }}>
            <div className="max-w-site mx-auto px-5 lg:px-10">

              {/* Area label bar */}
              <FI y={8} className="flex items-center gap-4 pb-5 mb-16">
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 800, letterSpacing: "0.20em", textTransform: "uppercase" as const, color: area.color, flexShrink: 0 }}>
                  {area.num} · {area.label}
                </span>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(30,77,140,.2)", flexShrink: 0, display: "inline-block" }} />
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase" as const, color: "rgba(30,77,140,.38)", flexShrink: 0 }}>
                  {area.fullName}
                </span>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(30,77,140,.32)", flexShrink: 0 }}>
                  {area.count} services
                </span>
              </FI>

              {/* Headline left · cards right */}
              <div className="grid lg:grid-cols-[2fr_3fr] gap-16 lg:gap-20 items-start">

                {/* Sticky headline */}
                <FI className="lg:sticky lg:top-[100px]">
                  {/* Faint area number watermark */}
                  <div
                    aria-hidden
                    style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(80px,10vw,120px)", fontWeight: 900, color: area.color, opacity: 0.06, lineHeight: 1, letterSpacing: "-0.06em", userSelect: "none" as const, marginBottom: -20, marginLeft: -4 }}
                  >
                    {area.num}
                  </div>
                  <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(27px,3vw,42px)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.1, color: "#0A1628", marginBottom: 20 }}>
                    {area.headlineA}{" "}
                    <em style={{ fontStyle: "italic", color: area.color }}>{area.headlineItalic}</em>
                    {area.headlineB ?? ""}
                  </h2>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16, color: "#1E4D8C", lineHeight: 1.82, marginBottom: 32 }}>
                    {area.sub}
                  </p>
                  <Link
                    href="/contact"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 700, color: area.color, textDecoration: "none" }}
                  >
                    Get a free assessment <IconArrowRight size={14} stroke={2} />
                  </Link>
                </FI>

                {/* Service cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {area.services.map((svc, si) => (
                    <FI
                      key={svc.name}
                      delay={si * 0.07}
                      className={isOdd && si === area.services.length - 1 ? "md:col-span-2" : ""}
                    >
                      <div style={{ background: cardBg, borderLeft: `3px solid ${area.color}`, borderRadius: 14, padding: "20px 22px", height: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${area.color}15`, border: `1px solid ${area.color}28`, display: "flex", alignItems: "center", justifyContent: "center", color: area.color, flexShrink: 0 }}>
                            {(() => { const I = ICON_MAP[svc.icon]; return I ? <I size={16} stroke={2} /> : null; })()}
                          </div>
                          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(30,77,140,.32)" }}>
                            {area.num}.{String(si + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 800, color: "#0A1628", letterSpacing: "-0.01em", lineHeight: 1.3, marginBottom: 8 }}>
                          {svc.name}
                        </div>
                        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13.5, color: "#1E4D8C", lineHeight: 1.65 }}>
                          {svc.desc}
                        </p>
                      </div>
                    </FI>
                  ))}
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ══════════════════ PROCESS ══════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#F4F7FB", paddingTop: 96, paddingBottom: 96 }}
      >
        <div className="relative z-10 max-w-site mx-auto px-5 lg:px-10">

          {/* Header */}
          <FI y={14} className="mb-16">
            <div className="inline-flex items-center gap-2.5 mb-6">
              <span className="w-5 h-px rounded-full" style={{ background: "#2472C8" }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#2472C8" }}>The Process</span>
            </div>
            <h2 className="font-outfit font-black" style={{ fontSize: "clamp(30px,3.5vw,48px)", letterSpacing: "-0.04em", lineHeight: 1.08, color: "#0A1628", maxWidth: "24ch", marginBottom: 16 }}>
              Four phases. The same every time.{" "}
              <em style={{ fontStyle: "italic", color: "#2472C8" }}>Documented</em> from day one.
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16, color: "#1E4D8C", lineHeight: 1.78, maxWidth: "50ch" }}>
              We don&apos;t show up and start fixing. Every engagement follows the same model — same outcome: IT you stop thinking about.
            </p>
          </FI>

          {/* Phase columns — sequential reveal */}
          <PhaseColumns />

        </div>
      </section>

      {/* ══════════════════ FINAL CTA ══════════════════ */}
      <section className="bg-primary relative overflow-hidden py-16 lg:py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(184,212,247,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,212,247,.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(36,114,200,.18) 0%, transparent 65%)" }} />
        <div className="absolute bottom-[-150px] left-[8%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(36,114,200,.08) 0%, transparent 65%)" }} />
        <div className="relative z-10 max-w-[800px] mx-auto px-5 lg:px-10 text-center">
          <div className="inline-flex items-center gap-2.5 mb-7">
            <span className="w-5 h-0.5 bg-accent rounded-full" />
            <span className="text-eyebrow font-bold uppercase text-accent">Talk To Us</span>
          </div>
          <h2 className="font-outfit text-display font-black text-text-heading-on-dark mb-6 text-balance">
            Four areas. Twenty-four services.{" "}
            <span className="text-accent">One conversation</span> to start.
          </h2>
          <p className="text-body text-text-on-dark max-w-[52ch] mx-auto mb-10">
            A senior engineer walks your environment, maps what&apos;s missing or broken, and tells you exactly which area to begin with. Not a template, not a sales pitch.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/contact" className="btn btn-white">
              Talk to us <IconArrowRight size={14} stroke={2} />
            </Link>
            <Link href="/industries" className="btn btn-outline-white">
              Industries we serve <IconArrowRight size={14} stroke={2} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
