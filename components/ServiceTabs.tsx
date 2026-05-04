"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  MonitorCheck, ShieldCheck, Cloud, Network, TrendingUp,
  PackageCheck, LockKeyhole, GraduationCap, HardDriveDownload,
  Video, Check, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import Eyebrow from "@/components/Eyebrow";
import type { LucideIcon } from "lucide-react";

type Service = {
  id: string;
  icon: LucideIcon;
  tabLabel: string;
  tag: string;
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
    icon: MonitorCheck,
    tabLabel: "Managed IT & Help Desk",
    tag: "Foundation",
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
    icon: ShieldCheck,
    tabLabel: "Cybersecurity",
    tag: "Security",
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
    icon: Cloud,
    tabLabel: "Microsoft 365 & Cloud",
    tag: "Cloud",
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
    icon: Network,
    tabLabel: "Network Infrastructure",
    tag: "Core",
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
    icon: TrendingUp,
    tabLabel: "IT Strategy & vCIO",
    tag: "Advisory",
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
    icon: PackageCheck,
    tabLabel: "IT Asset Procurement",
    tag: "Lifecycle",
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
    icon: LockKeyhole,
    tabLabel: "Physical Security",
    tag: "Physical",
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
    icon: GraduationCap,
    tabLabel: "Security Awareness Training",
    tag: "Training",
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
    icon: HardDriveDownload,
    tabLabel: "Backup & Disaster Recovery",
    tag: "Recovery",
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
    icon: Video,
    tabLabel: "AV & Conference Rooms",
    tag: "AV",
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

          {/* Sidebar */}
          <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 lg:sticky lg:top-[88px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {services.map((s) => {
              const Icon = s.icon;
              const isActive = s.id === activeTab;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={[
                    "flex items-center gap-3 flex-shrink-0 lg:flex-shrink lg:w-full px-3.5 py-3 rounded-xl text-left border transition-all duration-150 cursor-pointer",
                    isActive
                      ? "bg-scale-50 border-accent shadow-[inset_3px_0_0_#2472C8]"
                      : "bg-white border-border-light hover:border-accent hover:bg-scale-50",
                  ].join(" ")}
                >
                  <div className={`w-[34px] h-[34px] rounded-[9px] flex items-center justify-center flex-shrink-0 border transition-all duration-150 ${
                    isActive ? "bg-accent/10 border-accent/25" : "bg-bg-page border-border-light"
                  }`}>
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[13px] font-bold text-text-heading leading-[1.2] whitespace-nowrap lg:whitespace-normal">{s.tabLabel}</span>
                    <span className="text-[9.5px] font-extrabold tracking-[0.12em] uppercase text-accent">{s.tag}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-border-light rounded-[18px] p-7 lg:p-9 min-w-0 w-full"
            >
              {/* Head */}
              <div className="mb-7 pb-6 border-b border-border-light">
                <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
                  <span className="text-[10px] font-extrabold tracking-[0.12em] uppercase text-accent bg-scale-50 border border-border-light px-2.5 py-[5px] rounded-full">
                    {current.tag}
                  </span>
                  <span className="text-[14px] font-semibold text-text-muted italic">{current.oneliner}</span>
                </div>
                <h3 className="font-outfit font-black text-text-heading leading-[1.1] tracking-[-0.025em] mb-3" style={{ fontSize: "clamp(22px,2.5vw,30px)" }}>
                  {current.title}
                </h3>
                <p className="text-[15px] text-text-muted leading-[1.8] max-w-[64ch] whitespace-pre-line">
                  {current.desc}
                </p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-7">

                {/* Included */}
                <div>
                  <p className="text-[11px] font-extrabold tracking-[0.12em] uppercase text-text-heading mb-4">What&apos;s included</p>
                  <ul className="flex flex-col gap-2.5">
                    {current.included.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[14px] text-text-body leading-[1.5]">
                        <span className="w-[18px] h-[18px] rounded-full bg-scale-50 border border-border-light flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={9} className="text-accent" strokeWidth={2.5} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {current.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {current.tech.map((t) => (
                        <span key={t} className="text-[11px] font-semibold text-text-muted bg-bg-page border border-border-light px-3 py-1 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Outcomes */}
                <div>
                  <p className="text-[11px] font-extrabold tracking-[0.12em] uppercase text-text-heading mb-4">Outcomes you&apos;ll see</p>
                  <ul className="flex flex-col gap-2.5">
                    {current.outcomes.map((o) => (
                      <li key={o.title} className="px-4 py-3.5 bg-bg-page border border-border-light rounded-[10px] hover:border-accent transition-colors duration-150">
                        <p className="text-[13.5px] font-bold text-text-heading mb-0.5">{o.title}</p>
                        <p className="text-[12.5px] text-text-muted leading-[1.55]">{o.body}</p>
                      </li>
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
                <Link href="/contact" className="btn btn-primary flex-shrink-0">
                  Talk to us <ArrowRight size={13} strokeWidth={2.5} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
