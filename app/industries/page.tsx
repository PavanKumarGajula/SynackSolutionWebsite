"use client";

import Link from "next/link";
import {
  Factory, HeartPulse, Briefcase, Store,
  AlertTriangle, CheckCircle2, TrendingUp, ArrowRight,
} from "lucide-react";
import FadeUp from "@/components/FadeUp";
import type { LucideIcon } from "lucide-react";

type ActionItem = { bold: string; rest: string };
type Industry = {
  id: string;
  badge: string;
  badgeIcon: LucideIcon;
  heading: string;
  summary: string;
  pills: string[];
  reverse: boolean;
  problems: string[];
  actions: ActionItem[];
  outcomes: string[];
};

const industries: Industry[] = [
  {
    id: "manufacturing",
    badge: "Manufacturing & Industrial",
    badgeIcon: Factory,
    heading: "Production stops when IT stops.",
    summary:
      "Plant floors run on aging endpoints, flat networks, and unmanaged OT. One ransomware event or a switch failure and the line stops. We harden what matters and document what's there.",
    pills: ["Uptime", "OT/IT visibility", "Network segmentation", "Endpoint control"],
    reverse: false,
    problems: [
      "Flat networks where production, office, and guest traffic share one segment",
      "Unpatched Windows endpoints running line-of-business software no one wants to touch",
      "OT assets (PLCs, HMIs, sensors) with no inventory and no monitoring",
      "Single points of failure in the network closet — one switch dies, the line stops",
    ],
    actions: [
      { bold: "Network & Infrastructure", rest: " — segmented VLANs separating OT, production, and corporate" },
      { bold: "Cybersecurity", rest: " — endpoint detection, identity hardening, and patch baselines" },
      { bold: "Managed IT", rest: " — on-call support with documented runbooks for production-critical systems" },
      { bold: "IT Strategy", rest: " — refresh roadmaps so end-of-life hardware doesn't become end-of-line" },
    ],
    outcomes: [
      "Fewer unplanned outages and faster recovery when something does fail",
      "Clear inventory of every device, switch, and account on the network",
      "OT and corporate IT properly isolated — a phishing click no longer reaches the floor",
      "Predictable hardware lifecycle and budget you can defend",
    ],
  },
  {
    id: "healthcare",
    badge: "Healthcare & Clinics",
    badgeIcon: HeartPulse,
    heading: "Patient access can't wait. Neither can compliance.",
    summary:
      "Clinics need EHR access that just works, identity controls that pass an audit, and continuity when things go wrong. We build to HIPAA expectations from day one — not bolted on later.",
    pills: ["HIPAA-aligned", "Identity-first", "Continuity", "Endpoint encryption"],
    reverse: true,
    problems: [
      "Shared logins on shared workstations — no audit trail when something goes wrong",
      "Endpoints without disk encryption holding PHI, walking out the door in laptop bags",
      "EHR slowdowns from undersized networks or single-WAN connections with no failover",
      "Vendor accounts and former staff with access nobody has reviewed in years",
    ],
    actions: [
      { bold: "Cybersecurity", rest: " — Entra ID conditional access, MFA, and disk encryption baselines" },
      { bold: "Cloud & Microsoft 365", rest: " — tenant governance, mailbox auditing, and DLP for PHI" },
      { bold: "Network & Infrastructure", rest: " — redundant WAN, segmented clinical networks, monitored uplinks" },
      { bold: "Managed IT", rest: " — documented onboarding/offboarding so access changes track with HR" },
    ],
    outcomes: [
      "Audit-ready evidence of access control, encryption, and incident response",
      "Reliable EHR access with documented failover when the primary link drops",
      "Clear ownership: every account tied to a person, every device tracked",
      "Lower breach exposure — and a real answer when an auditor asks how you know",
    ],
  },
  {
    id: "professional-services",
    badge: "Professional Services",
    badgeIcon: Briefcase,
    heading: "Your reputation is built on protecting client work.",
    summary:
      "Law firms, accounting practices, consultancies — the work is in the documents, the email, and the M365 tenant. We govern those tightly so client trust is structural, not aspirational.",
    pills: ["Client data protection", "M365 governance", "Fast onboarding", "Email security"],
    reverse: false,
    problems: [
      "SharePoint and OneDrive sprawl — client files in places nobody can find or govern",
      "Email impersonation and wire-fraud attempts hitting partners and finance teams",
      "New hires waiting days for access; departing staff keeping access for weeks",
      "Unmanaged personal devices accessing client data with no controls",
    ],
    actions: [
      { bold: "Cloud & Microsoft 365", rest: " — tenant baselines, sensitivity labels, structured matter folders" },
      { bold: "Cybersecurity", rest: " — anti-phishing, MFA, conditional access, mailbox monitoring" },
      { bold: "Managed IT", rest: " — same-day onboarding, same-hour offboarding, documented and repeatable" },
      { bold: "IT Asset Procurement", rest: " — standardized laptops, encrypted by default, managed through Intune" },
    ],
    outcomes: [
      "Client data lives where you can govern it — labeled, logged, and access-controlled",
      "Phishing and BEC attempts caught before they reach a partner's inbox",
      "New hires productive on day one; offboarding closes access immediately",
      "A defensible answer when a client asks how you protect their information",
    ],
  },
  {
    id: "smb",
    badge: "Small & Mid-Size Business",
    badgeIcon: Store,
    heading: "Predictable IT, without hiring a department.",
    summary:
      "Growing businesses need IT that scales with them — not a break/fix loop and a part-time tech who knows where the printer driver lives. We give you the operating model of a mature IT shop, sized for your team.",
    pills: ["Predictable support", "Scalable systems", "Standardized hardware", "Security baseline"],
    reverse: true,
    problems: [
      "No documentation — when one person leaves, the knowledge leaves with them",
      "Mixed hardware from five vendors, each with its own setup and lifecycle",
      "Reactive IT spend — emergencies dictate the budget instead of strategy",
      "Security as an afterthought: no MFA, no backup verification, no incident plan",
    ],
    actions: [
      { bold: "Managed IT", rest: " — single point of contact, documented systems, predictable monthly cost" },
      { bold: "IT Asset Procurement", rest: " — standardized hardware lifecycle, ordered and managed through us" },
      { bold: "Cybersecurity", rest: " — security baseline that scales: MFA, EDR, backup verification, IR plan" },
      { bold: "IT Strategy", rest: " — quarterly reviews so spend tracks with growth, not surprises" },
    ],
    outcomes: [
      "IT runs in the background — your team works, things stay up",
      "Hardware refreshes happen on schedule, not after a failure",
      "A real security baseline that meets cyber-insurance and customer questionnaires",
      "Documented systems that survive turnover and scale with headcount",
    ],
  },
];

const navItems = [
  { href: "#manufacturing",        label: "Manufacturing",          Icon: Factory    },
  { href: "#healthcare",           label: "Healthcare",             Icon: HeartPulse },
  { href: "#professional-services",label: "Professional Services",  Icon: Briefcase  },
  { href: "#smb",                  label: "Small & Mid-Size Business", Icon: Store  },
];

export default function Industries() {
  return (
    <main className="pt-[68px]">

      {/* ── Hero ── */}
      <header className="relative bg-primary overflow-hidden pt-14 pb-14 border-b border-border-dark">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(900px 360px at 18% 12%, rgba(36,114,200,.20) 0%, transparent 60%), radial-gradient(760px 280px at 85% 18%, rgba(122,180,238,.12) 0%, transparent 58%)",
          }}
        />
        <div className="relative z-10 max-w-site mx-auto px-5 lg:px-10">
          <div className="max-w-[880px]">
            <FadeUp>
              <p className="text-[12px] font-black tracking-[0.14em] uppercase text-accent mb-3">
                Industries
              </p>
              <h1
                className="font-outfit font-black text-text-heading-on-dark mb-3.5"
                style={{ fontSize: "clamp(30px,4vw,48px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}
              >
                IT designed around how your industry actually runs.
              </h1>
              <p className="text-[16px] leading-[1.7] max-w-[65ch] mb-6" style={{ color: "rgba(234,240,255,.78)" }}>
                The risks, workflows, and compliance pressures aren&apos;t the same in a clinic, a factory floor, or a law firm — and our engagements aren&apos;t either. Below: the four industries we know best, what breaks first, what we fix, and what changes after we deploy.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/contact" className="btn btn-white">
                  Talk to an Engineer <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
                <Link href="#manufacturing" className="btn btn-outline-white">
                  Browse Industries <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </header>

      {/* ── Sticky Industry Nav ── */}
      <nav
        className="sticky top-[68px] z-40 bg-white/92 backdrop-blur-md border-b border-border-light"
        aria-label="Industry sections"
      >
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="flex gap-1.5 overflow-x-auto py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[13px] font-semibold text-text-muted whitespace-nowrap border border-transparent transition-all duration-150 hover:border-accent/20 hover:text-accent"
                style={{ ["--hover-bg" as string]: "rgba(36,114,200,.06)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(36,114,200,.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              >
                <Icon size={14} className="flex-shrink-0" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Industry Panels ── */}
      {industries.map((ind, idx) => {
        const BadgeIcon = ind.badgeIcon;
        const isEven = idx % 2 === 1;

        const intro = (
          <FadeUp className="lg:sticky lg:top-[148px] lg:self-start">
            <span
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full text-accent text-[12px] font-extrabold tracking-[0.08em] uppercase mb-4 border"
              style={{ background: "rgba(36,114,200,.08)", borderColor: "rgba(36,114,200,.20)" }}
            >
              <BadgeIcon size={14} />
              {ind.badge}
            </span>

            <h2
              className="font-outfit font-black text-text-heading mb-3.5"
              style={{ fontSize: "clamp(26px,3vw,36px)", letterSpacing: "-0.02em", lineHeight: 1.12 }}
            >
              {ind.heading}
            </h2>

            <p className="text-[15px] text-text-muted leading-[1.7] mb-5">{ind.summary}</p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {ind.pills.map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1.5 rounded-full text-[12.5px] font-bold text-text-heading bg-white border border-border-light"
                >
                  {pill}
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[14px] font-extrabold text-accent px-3.5 py-2.5 rounded-xl border border-accent/20 transition-all duration-150 hover:translate-x-0.5"
              style={{ background: "rgba(36,114,200,.04)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(36,114,200,.10)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(36,114,200,.04)")}
            >
              Talk to us about {ind.badge.split(" &")[0].split(" & ")[0].toLowerCase()}
              <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </FadeUp>
        );

        const detail = (
          <div className="flex flex-col gap-4">
            {/* Problems */}
            <FadeUp delay={0.1}>
              <div className="bg-white border border-border-light rounded-xl p-[22px] hover:border-red-200 hover:shadow-[0_12px_32px_rgba(14,17,22,.05)] transition-all duration-200">
                <div className="flex items-center gap-3 mb-3.5">
                  <span className="w-9 h-9 inline-flex items-center justify-center rounded-[10px] bg-red-50 border border-red-200 text-red-600 flex-shrink-0">
                    <AlertTriangle size={18} />
                  </span>
                  <div>
                    <p className="text-[11px] font-black tracking-[0.14em] uppercase text-text-muted">Problems</p>
                    <h3 className="font-outfit text-[17px] font-extrabold text-text-heading tracking-[-0.01em] leading-tight mt-0.5">
                      What breaks first
                    </h3>
                  </div>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {ind.problems.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[14.5px] text-text-body leading-[1.55]">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-[9px]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* Actions */}
            <FadeUp delay={0.18}>
              <div className="bg-white border border-border-light rounded-xl p-[22px] transition-all duration-200 hover:shadow-[0_12px_32px_rgba(14,17,22,.05)]" style={{ ["--tw-border-opacity" as string]: "1" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(36,114,200,.30)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
              >
                <div className="flex items-center gap-3 mb-3.5">
                  <span
                    className="w-9 h-9 inline-flex items-center justify-center rounded-[10px] text-accent flex-shrink-0 border"
                    style={{ background: "rgba(36,114,200,.08)", borderColor: "rgba(36,114,200,.20)" }}
                  >
                    <CheckCircle2 size={18} />
                  </span>
                  <div>
                    <p className="text-[11px] font-black tracking-[0.14em] uppercase text-text-muted">Actions</p>
                    <h3 className="font-outfit text-[17px] font-extrabold text-text-heading tracking-[-0.01em] leading-tight mt-0.5">
                      What we deploy
                    </h3>
                  </div>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {ind.actions.map((a) => (
                    <li key={a.bold} className="flex gap-2.5 text-[14.5px] text-text-body leading-[1.55]">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-[9px]" />
                      <span>
                        <strong className="font-extrabold text-text-heading">{a.bold}</strong>
                        {a.rest}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* Outcomes */}
            <FadeUp delay={0.26}>
              <div className="bg-white border border-border-light rounded-xl p-[22px] hover:border-green-200 hover:shadow-[0_12px_32px_rgba(14,17,22,.05)] transition-all duration-200">
                <div className="flex items-center gap-3 mb-3.5">
                  <span className="w-9 h-9 inline-flex items-center justify-center rounded-[10px] bg-green-50 border border-green-200 text-green-700 flex-shrink-0">
                    <TrendingUp size={18} />
                  </span>
                  <div>
                    <p className="text-[11px] font-black tracking-[0.14em] uppercase text-text-muted">Outcomes</p>
                    <h3 className="font-outfit text-[17px] font-extrabold text-text-heading tracking-[-0.01em] leading-tight mt-0.5">
                      What changes
                    </h3>
                  </div>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {ind.outcomes.map((o) => (
                    <li key={o} className="flex gap-2.5 text-[14.5px] text-text-body leading-[1.55]">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0 mt-[9px]" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        );

        return (
          <section
            key={ind.id}
            id={ind.id}
            className={`py-20 border-b border-border-light ${isEven ? "bg-scale-50" : "bg-bg-page"}`}
          >
            <div className="max-w-site mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {ind.reverse ? (
                <>
                  <div className="lg:order-2">{intro}</div>
                  <div className="lg:order-1">{detail}</div>
                </>
              ) : (
                <>
                  {intro}
                  {detail}
                </>
              )}
            </div>
          </section>
        );
      })}

      {/* ── Final CTA ── */}
      <section className="bg-primary relative overflow-hidden py-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(184,212,247,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,212,247,.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(36,114,200,.18) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 max-w-site mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-8 items-center">
            <FadeUp>
              <p className="text-[12px] font-black tracking-[0.14em] uppercase text-accent mb-3">Next step</p>
              <h2
                className="font-outfit font-black text-text-heading-on-dark mb-2.5"
                style={{ fontSize: "clamp(26px,2.8vw,36px)", letterSpacing: "-0.02em", lineHeight: 1.12 }}
              >
                Tell us your industry. We&apos;ll map the right controls.
              </h2>
              <p className="text-[15px] leading-[1.7] max-w-[60ch]" style={{ color: "rgba(234,240,255,.72)" }}>
                A short call is enough to know if we&apos;re a fit. No pitch deck, no pressure — just a clear read on where you stand and what should change first.
              </p>
            </FadeUp>
            <FadeUp delay={0.15} className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="btn btn-white">
                Talk to an Engineer <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
              <Link href="/services" className="btn btn-outline-white">
                View Services <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

    </main>
  );
}
