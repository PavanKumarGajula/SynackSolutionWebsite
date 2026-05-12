"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import Eyebrow from "@/components/Eyebrow";
import { IconCheck, IconArrowRight } from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Service = {
  id: string;
  icon: string;
  tabLabel: string;
  tag: string;
  color: string;
  oneliner: string;
  title: string;
  desc: string;
  included: string[];
  tech: string[];
  outcomes: { title: string; body: string }[];
  bestFor: string;
};

const services: Service[] = [
  {
    id: "managed-it",
    icon: "ti-headset",
    tabLabel: "Managed IT & Help Desk",
    tag: "Foundation",
    color: "#2472C8",
    oneliner: "Your IT runs. You stop thinking about it.",
    title: "Managed IT & Help Desk",
    desc: "Most businesses have IT. Nobody owns it. We do.\n\nHandled by senior engineers. Not entry-level support. Not a call centre.",
    included: [
      "Proactive monitoring & alerting",
      "Endpoint management & patching",
      "Identity & access management",
      "Onboarding & offboarding runbooks",
      "Monthly stability reviews",
      "Fast help desk — senior engineers only",
    ],
    tech: ["NinjaRMM", "Microsoft Intune", "Microsoft Entra ID", "Apple Business Manager"],
    outcomes: [
      { title: "Issues get fixed before you notice them.", body: "Not after someone complains." },
      { title: "You stop being the IT escalation point.", body: "SynAck handles it. You find out when it's done." },
      { title: "One monthly number. Everything included.", body: "No surprise invoices." },
    ],
    bestFor: "Businesses without dedicated IT — or teams stuck firefighting every week.",
  },
  {
    id: "cybersecurity",
    icon: "ti-shield-lock",
    tabLabel: "Cybersecurity",
    tag: "Security",
    color: "#E84040",
    oneliner: "Security that's enforced — not just installed.",
    title: "Cybersecurity",
    desc: "Most businesses assume they're secure. They're not. We fix that.\n\nSecurity gaps don't stay small. The longer they sit — the more they cost.",
    included: [
      "MFA & conditional access",
      "Email security & anti-phishing",
      "Endpoint hardening & EDR",
      "Incident response planning",
      "Risk assessment & reduction",
      "Joiner/mover/leaver workflows",
    ],
    tech: ["Microsoft Defender", "Microsoft Entra ID", "Exchange Online"],
    outcomes: [
      { title: "The most common attacks stop working on your business.", body: "MFA and access policies enforced across every identity." },
      { title: "Your team stops being the weakest link.", body: "Fewer one-click incidents reach your users." },
      { title: "You can prove your security posture — to anyone.", body: "Documented controls for leadership or auditors." },
    ],
    bestFor: "Healthcare, professional services, and businesses that need controls they can actually prove.",
  },
  {
    id: "m365",
    icon: "ti-cloud",
    tabLabel: "Microsoft 365 & Cloud",
    tag: "Cloud",
    color: "#0078D4",
    oneliner: "Your M365 becomes an asset — not a mess.",
    title: "Microsoft 365 & Cloud",
    desc: "Folders nobody organized. Licenses nobody audited. Access nobody cleaned up. That's most M365 tenants. Not yours — not after we're done.",
    included: [
      "Tenant governance & security baseline",
      "SharePoint & OneDrive structure",
      "Microsoft Teams management",
      "Azure management",
      "M365 compliance policies",
      "Tenant-to-tenant migrations",
    ],
    tech: ["Microsoft 365", "Azure", "SharePoint", "Teams", "Exchange Online"],
    outcomes: [
      { title: "Files and permissions finally make sense.", body: "A structure anyone on your team can explain." },
      { title: "You stop paying for seats nobody uses.", body: "Right-sized licenses. No waste." },
      { title: "Access gets cleaned up when people leave.", body: "Conditional access and offboarding by default." },
    ],
    bestFor: "Teams growing on M365 without governance — or migrating from legacy systems.",
  },
  {
    id: "network",
    icon: "ti-network",
    tabLabel: "Network Infrastructure",
    tag: "Core",
    color: "#22A05A",
    oneliner: "Every connection documented. Every gap closed.",
    title: "Network Infrastructure",
    desc: "Built by whoever was available. Documented by nobody. Owned by no one. That's most business networks. We change that.",
    included: [
      "Wi-Fi design & management",
      "Cisco firewall management",
      "Switching & VLAN standards",
      "Network segmentation",
      "VPN & remote access",
      "Full topology documentation",
    ],
    tech: ["Cisco", "NinjaRMM"],
    outcomes: [
      { title: "Connectivity stops being the reason things fail.", body: "Reliable across every site and floor." },
      { title: "An incident in one area stays in one area.", body: "Segmentation contains problems where they start." },
      { title: "Stop relying on one person's memory.", body: "Everything documented. Everything owned." },
    ],
    bestFor: "Manufacturing, multi-site offices, and teams with mixed OT/IT environments.",
  },
  {
    id: "strategy",
    icon: "ti-trending-up",
    tabLabel: "IT Strategy & vCIO",
    tag: "Advisory",
    color: "#F59E0B",
    oneliner: "Senior IT leadership — without the full-time hire.",
    title: "IT Strategy & vCIO",
    desc: "Something breaks. Someone Googles a fix. A vendor calls with a deal. That's not a strategy. We build the plan instead.",
    included: [
      "IT roadmaps aligned to business goals",
      "Budget planning & cost control",
      "Vendor selection & management",
      "Risk register & posture reporting",
      "Compliance readiness mapping",
      "Co-managed IT for existing IT staff",
    ],
    tech: [],
    outcomes: [
      { title: "You know what's next — and what it costs.", body: "No more surprise IT decisions or invoices." },
      { title: "Fewer vendors. Less overlap. More control.", body: "Consolidated tools and right-sized licenses." },
      { title: "IT reports your board actually reads.", body: "Plain language. Clear priorities. Real decisions." },
    ],
    bestFor: "Companies without a CIO — or in-house IT leaders who need a senior partner.",
  },
  {
    id: "procurement",
    icon: "ti-package",
    tabLabel: "IT Asset Procurement",
    tag: "Lifecycle",
    color: "#8B5CF6",
    oneliner: "Devices arrive ready. People start working.",
    title: "IT Asset Procurement",
    desc: "Buy when something breaks. No standard. No plan. No tracking. That's how most companies handle hardware. It costs more than you think.",
    included: [
      "Hardware sourcing & vendor management",
      "MDM/Intune staging & enrollment",
      "Zero-touch deployment",
      "Asset tagging & lifecycle tracking",
      "Refresh cycle planning",
      "Secure wipe & certified disposal",
    ],
    tech: ["Microsoft Intune", "Apple Business Manager"],
    outcomes: [
      { title: "New hires have working devices on day one.", body: "Not week two." },
      { title: "Every device tracked. Every warranty known.", body: "Nothing falls through the gaps." },
      { title: "No hardware surprises.", body: "Refresh cycles planned and budgeted in advance." },
    ],
    bestFor: "Growing teams, multi-location offices, and companies tired of ad-hoc hardware decisions.",
  },
  {
    id: "physical",
    icon: "ti-device-cctv",
    tabLabel: "Physical Security",
    tag: "Physical",
    color: "#EC4899",
    oneliner: "Digital and physical — one owner.",
    title: "Physical Security",
    desc: "Most MSPs stop at the network edge. Your front door is not their problem. It is ours. Cameras. Badge access. Owned alongside everything else.",
    included: [
      "Camera systems via Rhombus",
      "Badge access via Brivo",
      "Role-based access permissions",
      "Joiners/movers/leavers lifecycle",
      "Full audit logs",
      "Multi-site visibility",
    ],
    tech: ["Rhombus", "Brivo"],
    outcomes: [
      { title: "One partner for both sides of your environment.", body: "Digital and physical security — fully connected." },
      { title: "Every entry logged. Every permission documented.", body: "Access you can prove to anyone who asks." },
      { title: "All locations. One dashboard.", body: "Nothing falling through the gaps between vendors." },
    ],
    bestFor: "Businesses with physical premises, multiple offices, or compliance requirements around physical access.",
  },
  {
    id: "training",
    icon: "ti-school",
    tabLabel: "Security Awareness Training",
    tag: "Training",
    color: "#F97316",
    oneliner: "Your team becomes harder to fool.",
    title: "Security Awareness Training",
    desc: "Most breaches start with a person, not a port. Your team is the target. We make them harder to fool — and give you proof it's working.",
    included: [
      "Phishing simulations",
      "Role-based training modules",
      "Password hygiene guidance",
      "Security reporting culture",
      "Ongoing campaign management",
      "Results tracking & reporting",
    ],
    tech: [],
    outcomes: [
      { title: "Your team catches phishing attempts before they click.", body: "Not after the damage is done." },
      { title: "Security awareness becomes part of how people work.", body: "Not a once-a-year checkbox." },
      { title: "You have proof of training.", body: "For compliance, insurance, or leadership reporting." },
    ],
    bestFor: "Healthcare, financial services, and any business where staff handle sensitive data.",
  },
  {
    id: "backup",
    icon: "ti-database-export",
    tabLabel: "Backup & Disaster Recovery",
    tag: "Recovery",
    color: "#14B8A6",
    oneliner: "Tested. Validated. Ready when it matters.",
    title: "Backup & Disaster Recovery",
    desc: "Everyone has backups. Almost no one tests them. We monitor, validate, and document everything — so when recovery is needed, it's not a guess.",
    included: [
      "Backup monitoring & alerting",
      "Restore validation & testing",
      "Recovery time objectives",
      "Ransomware recovery playbooks",
      "Business continuity planning",
      "Immutable backup configuration",
    ],
    tech: [],
    outcomes: [
      { title: "When something goes wrong, recovery isn't a question mark.", body: "Tested playbooks. Known timelines." },
      { title: "Ransomware doesn't mean you lose everything.", body: "Validated restores from before the incident." },
      { title: "You can show a recovery plan — not just a backup tool.", body: "For auditors, insurers, and leadership." },
    ],
    bestFor: "Any business where downtime costs money — especially professional services and healthcare.",
  },
  {
    id: "av",
    icon: "ti-presentation",
    tabLabel: "AV & Conference Rooms",
    tag: "AV",
    color: "#6366F1",
    oneliner: "Meetings that work. Every room. Every time.",
    title: "AV & Conference Rooms",
    desc: "Half the meeting spent fighting the display. The call that never connected. The room no one uses because it's always broken. We fix that — permanently.",
    included: [
      "Screen & display installation",
      "Video conferencing hardware",
      "Microsoft Teams Rooms setup",
      "Zoom Rooms configuration",
      "Multi-site AV support",
      "Ongoing management & updates",
    ],
    tech: ["Microsoft Teams Rooms", "Zoom Rooms"],
    outcomes: [
      { title: "Meetings start on time.", body: "No one wastes the first 10 minutes troubleshooting." },
      { title: "Remote participants are first-class.", body: "Audio and video that actually works." },
      { title: "Someone owns it when it breaks.", body: "Not IT. Not facilities. Us." },
    ],
    bestFor: "Businesses with conference rooms, executive suites, or remote-first teams that need AV that just works.",
  },
];

interface ServiceTabsProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function ServiceTabs({ activeTab, setActiveTab }: ServiceTabsProps) {
  const current = services.find((s) => s.id === activeTab) ?? services[0];

  return (
    <section id="service-tabs" className="py-16 lg:py-20 bg-bg-page border-t border-border-light/40">
      <div className="max-w-site mx-auto px-5 lg:px-10">

        {/* Intro */}
        <FadeUp className="mb-12">
          <Eyebrow>All Services</Eyebrow>
          <h2 className="font-outfit text-h1 font-black text-text-heading mb-2">
            10 services. Full ownership across all of them.
          </h2>
          <p className="text-body text-text-muted">Most clients start with 2 or 3. Pick what matters to you.</p>
        </FadeUp>

        {/* Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-6 items-start">

          {/* ── Sidebar ── */}
          <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 lg:sticky lg:top-[88px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {services.map((s) => {
              const isActive = s.id === activeTab;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={[
                    "flex items-center gap-3 flex-shrink-0 lg:flex-shrink lg:w-full px-3.5 py-3 rounded-xl text-left border transition-all duration-200 cursor-pointer group",
                    isActive
                      ? "bg-white border-border-light shadow-md shadow-black/[0.05]"
                      : "bg-white border-border-light hover:border-border-light hover:shadow-sm",
                  ].join(" ")}
                  style={isActive ? { borderLeftColor: s.color, borderLeftWidth: 3 } : {}}
                >
                  <div
                    className={`w-[34px] h-[34px] rounded-[9px] flex items-center justify-center flex-shrink-0 border transition-all duration-200${!isActive ? " text-text-muted" : ""}`}
                    style={isActive
                      ? { background: `${s.color}18`, borderColor: `${s.color}33`, color: s.color }
                      : { background: "var(--bg-page)", borderColor: "var(--border-light)" }
                    }
                  >
                    <i className={`ti ${s.icon}`} style={{ fontSize: 16 }} />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[13.5px] font-bold text-text-heading leading-[1.2] whitespace-nowrap lg:whitespace-normal">{s.tabLabel}</span>
                    <span
                      className="text-[10px] font-extrabold tracking-[0.12em] uppercase transition-colors duration-200"
                      style={{ color: isActive ? s.color : "rgba(30,77,140,0.4)" }}
                    >
                      {s.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* ── Panel ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="rounded-[22px] border border-border-light overflow-hidden shadow-lg shadow-black/[0.06] min-w-0 w-full"
            >

              {/* ── Dark header (matches WhatWeOwn card aesthetic) ── */}
              <div
                className="relative overflow-hidden px-7 pt-8 pb-7 lg:px-9 lg:pt-10 lg:pb-8"
                style={{ background: "linear-gradient(145deg, #102347 0%, #0d1d3a 60%, #091428 100%)" }}
              >
                {/* Colored ambient glow */}
                <div
                  className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 80% 20%, ${current.color}22 0%, transparent 65%)` }}
                />
                {/* Subtle grid */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Glow border inset */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-t-[22px]"
                  style={{ boxShadow: `inset 0 0 0 1px ${current.color}22` }}
                />

                <div className="relative z-10 flex items-start gap-5">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${current.color}30 0%, ${current.color}15 100%)`,
                      border: `1.5px solid ${current.color}40`,
                      boxShadow: `0 4px 16px ${current.color}20`,
                      color: current.color,
                    }}
                  >
                    <i className={`ti ${current.icon}`} style={{ fontSize: 24 }} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    {/* Tag pill */}
                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.13em] uppercase mb-3 px-2.5 py-1 rounded-full"
                      style={{
                        background: `${current.color}20`,
                        border: `1px solid ${current.color}40`,
                        color: current.color,
                      }}
                    >
                      <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: current.color }} />
                      {current.tag}
                    </span>

                    <h3
                      className="font-outfit font-black text-[#EAF2FC] leading-[1.08] tracking-[-0.03em] mb-2"
                      style={{ fontSize: "clamp(22px,2.4vw,32px)" }}
                    >
                      {current.title}
                    </h3>
                    <p className="text-[14px] font-semibold italic" style={{ color: "rgba(234,242,252,0.55)" }}>
                      {current.oneliner}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Body ── */}
              <div className="bg-white px-7 pt-7 pb-8 lg:px-9 lg:pt-8 lg:pb-9">

                {/* Description */}
                <p className="text-[16px] text-text-muted leading-[1.85] mb-8 max-w-[64ch] whitespace-pre-line border-b border-border-light pb-7">
                  {current.desc}
                </p>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                  {/* Included */}
                  <div>
                    <p className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-text-heading mb-4 flex items-center gap-2">
                      <span
                        className="w-[3px] h-[14px] rounded-full flex-shrink-0"
                        style={{ background: current.color }}
                      />
                      What&apos;s included
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {current.included.map((item, i) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05, ease: EASE }}
                          className="flex items-start gap-2.5 text-[14px] text-text-body leading-[1.55]"
                        >
                          <span
                            className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${current.color}12`, border: `1px solid ${current.color}30`, color: current.color }}
                          >
                            <IconCheck size={9} stroke={2} />
                          </span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                    {current.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {current.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-semibold text-text-muted bg-bg-page border border-border-light px-3 py-1 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Outcomes */}
                  <div>
                    <p className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-text-heading mb-4 flex items-center gap-2">
                      <span
                        className="w-[3px] h-[14px] rounded-full flex-shrink-0"
                        style={{ background: current.color }}
                      />
                      Outcomes you&apos;ll see
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {current.outcomes.map((o, i) => (
                        <motion.li
                          key={o.title}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.07, ease: EASE }}
                          className="px-4 py-3.5 bg-bg-page border border-border-light rounded-[10px] transition-colors duration-150"
                          style={{ borderLeftColor: `${current.color}40`, borderLeftWidth: 2 }}
                        >
                          <p className="text-[13.5px] font-bold text-text-heading mb-0.5">{o.title}</p>
                          <p className="text-[12.5px] text-text-muted leading-[1.55]">{o.body}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-border-light">
                  <p className="text-[13.5px] text-text-muted leading-[1.55]">
                    <strong className="text-text-heading font-bold">Best for: </strong>
                    {current.bestFor}
                  </p>
                  <Link
                    href="/contact"
                    className="btn btn-primary flex-shrink-0"
                  >
                    Talk to us <IconArrowRight size={13} stroke={2} />
                  </Link>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
