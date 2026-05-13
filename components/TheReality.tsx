"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FadeUp from "@/components/FadeUp";
import Eyebrow from "@/components/Eyebrow";

const EASE = [0.22, 1, 0.36, 1] as const;

const failures = [
  {
    system: "File Server",
    icon: "ti-server",
    status: "OFFLINE",
    level: "error" as const,
    metric: "4h 23m",
    metricLabel: "since last ping",
    description: "Down since Tuesday. Finance found out on Friday.",
  },
  {
    system: "Help Desk Queue",
    icon: "ti-clipboard-list",
    status: "CRITICAL",
    level: "error" as const,
    metric: "23",
    metricLabel: "unresolved tickets",
    description: "Three are from last month. Nobody owns them.",
  },
  {
    system: "Backup & Recovery",
    icon: "ti-database-export",
    status: "CRITICAL",
    level: "error" as const,
    metric: "47 days",
    metricLabel: "since last backup",
    description: "Backup hasn't been touched in seven weeks. Nobody knows if it restores.",
  },
  {
    system: "Firewall",
    icon: "ti-shield-exclamation",
    status: "CRITICAL",
    level: "error" as const,
    metric: "2022",
    metricLabel: "last firmware update",
    description: "There's a 2023 CVE sitting on your network right now.",
  },
  {
    system: "Security Training",
    icon: "ti-users",
    status: "WARNING",
    level: "warning" as const,
    metric: "0%",
    metricLabel: "staff completion rate",
    description: "Insurer asks about training records at every renewal. There aren't any.",
  },
];

const m365Services = [
  { name: "Exchange Online",    status: "WARNING",  level: "warn" as const },
  { name: "Microsoft Teams",    status: "HEALTHY",  level: "ok"   as const },
  { name: "SharePoint Online",  status: "WARNING",  level: "warn" as const },
  { name: "OneDrive",           status: "HEALTHY",  level: "ok"   as const },
  { name: "Entra ID / MFA",     status: "CRITICAL", level: "err"  as const },
];

const m365Stats = [
  { label: "Active Users",   value: "47",    critical: false },
  { label: "Licenses Used",  value: "47/50", critical: false },
  { label: "Global Admins",  value: "0",     critical: true  },
];

const m365Alerts = [
  "The person who set this up left in 2021. Nobody has the keys.",
  "87% of users have no MFA. The finding from your last audit — still open.",
  "Your cyber insurance policy asks about this every renewal.",
];

export default function TheReality() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-bg-page py-16 lg:py-24">
      <div className="max-w-site mx-auto px-5 lg:px-10">

        {/* Text row */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-end mb-14">
          <FadeUp>
            <Eyebrow>The Reality</Eyebrow>
            <h2 className="font-outfit text-h1 font-black text-text-heading mb-4 text-balance">
              Most businesses don&apos;t have IT. They have pieces.
            </h2>
            <p className="text-[16px] text-text-muted leading-[1.75]">
              Systems. Vendors. Tools. Access. Risk. All moving separately. No one owns how they work together.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="bg-primary rounded-[12px] px-6 py-5">
              <p className="font-outfit text-[16px] font-bold text-text-heading-on-dark leading-[1.5]">
                This is what we find in the first 30 minutes.
              </p>
              <p className="text-[14px] text-text-on-dark leading-[1.65] mt-2">
                Not edge cases. Not surprises. The same gaps, different company name.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* Dashboard shell */}
        <motion.div
          initial={{ opacity: 0, y: 64, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 64, scale: 0.97 }}
          transition={{ duration: 0.85, delay: 0.28, ease: EASE }}
          className="rounded-2xl border border-border-light overflow-hidden shadow-2xl shadow-primary/[0.10]"
        >

          {/* Title bar */}
          <div className="bg-primary flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3">
              <div className="w-[26px] h-[26px] rounded-[6px] bg-accent/25 flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-scale-50">
                  <polyline points="2,8 5,5 9,9 14,4" />
                  <polyline points="2,12 5,9 9,13 14,8" />
                </svg>
              </div>
              <span className="text-[12.5px] font-semibold text-scale-50 tracking-[0.02em]">
                IT Environment Overview — Audit Report
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-scale-600 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-scale-600 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-scale-600 opacity-70" />
            </div>
          </div>

          {/* Alert banner */}
          <div className="bg-status-error-bg border-b border-status-error-border flex items-center gap-3 px-5 py-2.5">
            <span className="relative flex items-center justify-center flex-shrink-0 w-2 h-2">
              <motion.span
                animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.8, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-3.5 h-3.5 rounded-full bg-status-error"
              />
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-2 h-2 rounded-full bg-status-error"
              />
            </span>
            <span className="text-[12.5px] font-semibold text-status-error-text flex-1">
              7 critical issues detected across your environment
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-status-error text-scale-50 tracking-[0.07em] uppercase">
              Critical
            </span>
          </div>

          {/* ── Failure cards grid ── */}
          <div className="bg-bg-page p-4 grid grid-cols-2 lg:grid-cols-5 gap-3">
            {failures.map((item, i) => {
              const isErr = item.level === "error";
              return (
                <motion.div
                  key={item.system}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.07, ease: EASE }}
                  className="bg-white rounded-[10px] border border-border-light p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="relative flex items-center justify-center flex-shrink-0 w-2 h-2">
                        <motion.span
                          animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.9, 1] }}
                          transition={{ duration: isErr ? 1.1 : 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                          className={`absolute w-3 h-3 rounded-full ${isErr ? "bg-status-error" : "bg-status-warning"}`}
                        />
                        <span className={`relative w-1.5 h-1.5 rounded-full ${isErr ? "bg-status-error" : "bg-status-warning"}`} />
                      </span>
                      <span className="text-text-muted flex-shrink-0">
                        <i className={`ti ${item.icon}`} style={{ fontSize: 12 }} />
                      </span>
                      <span className="text-[11px] font-semibold text-text-body truncate">{item.system}</span>
                    </div>
                  </div>
                  <div>
                    <p className={`font-outfit text-[20px] font-black tracking-[-0.03em] leading-none ${isErr ? "text-status-error" : "text-status-warning-text"}`}>
                      {item.metric}
                    </p>
                    <p className="text-[10px] text-text-muted mt-1 font-medium">{item.metricLabel}</p>
                  </div>
                  <p className="text-[11px] text-text-muted leading-[1.5] border-t border-border-light pt-3">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* ── Microsoft 365 server panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.55, delay: 0.85, ease: EASE }}
            className="border-t border-border-light"
          >
            {/* Panel title bar */}
            <div className="bg-[#0A1628] flex items-center justify-between px-5 py-2.5">
              <div className="flex items-center gap-2.5">
                {/* Microsoft four-squares icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" className="flex-shrink-0">
                  <rect x="0" y="0" width="7" height="7" fill="#f25022" rx="1" />
                  <rect x="9" y="0" width="7" height="7" fill="#7fba00" rx="1" />
                  <rect x="0" y="9" width="7" height="7" fill="#00a4ef" rx="1" />
                  <rect x="9" y="9" width="7" height="7" fill="#ffb900" rx="1" />
                </svg>
                <span className="text-[12.5px] font-semibold text-scale-100 tracking-[0.02em]">
                  Microsoft 365 — Admin Center
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-[3px] rounded bg-status-error text-white tracking-[0.07em] uppercase">
                Critical
              </span>
            </div>

            {/* Panel body */}
            <div className="bg-bg-page grid lg:grid-cols-[200px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-border-light">

              {/* Left — services list */}
              <div className="p-4">
                <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-text-muted mb-3">
                  Services
                </p>
                <div className="flex flex-col gap-0">
                  {m365Services.map((svc, i) => (
                    <motion.div
                      key={svc.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                      transition={{ duration: 0.4, delay: 0.95 + i * 0.06, ease: EASE }}
                      className="flex items-center justify-between py-2 border-b border-border-light/60 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="relative flex items-center justify-center flex-shrink-0 w-1.5 h-1.5">
                          {svc.level === "err" && (
                            <motion.span
                              animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2, 1] }}
                              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                              className="absolute w-2.5 h-2.5 rounded-full bg-status-error"
                            />
                          )}
                          <span className={`relative w-1.5 h-1.5 rounded-full ${
                            svc.level === "ok" ? "bg-status-success"
                            : svc.level === "warn" ? "bg-status-warning"
                            : "bg-status-error"
                          }`} />
                        </span>
                        <span className="text-[11px] text-text-body font-medium">{svc.name}</span>
                      </div>
                      <span className={`text-[10px] font-bold tracking-[0.07em] uppercase ${
                        svc.level === "ok"   ? "text-status-success"
                        : svc.level === "warn" ? "text-status-warning-text"
                        : "text-status-error"
                      }`}>
                        {svc.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right — stats + alerts */}
              <div className="p-4 flex flex-col gap-4">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {m365Stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.4, delay: 0.95 + i * 0.07, ease: EASE }}
                      className="bg-white border border-border-light rounded-[8px] p-3"
                    >
                      <p className="text-[10px] font-bold tracking-[0.09em] uppercase text-text-muted mb-2">
                        {s.label}
                      </p>
                      <p className={`font-outfit text-[20px] font-black tracking-[-0.03em] leading-none ${s.critical ? "text-status-error" : "text-text-heading"}`}>
                        {s.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Alerts */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-text-muted mb-2">
                    Critical Alerts
                  </p>
                  <div className="bg-white border border-border-light rounded-[8px] divide-y divide-border-light overflow-hidden">
                    {m365Alerts.map((alert, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.4, delay: 1.1 + i * 0.08, ease: EASE }}
                        className="flex items-start gap-3 px-3.5 py-2.5"
                      >
                        <span className="w-[3px] h-[3px] rounded-full bg-status-error mt-[7px] flex-shrink-0" />
                        <span className="text-[12.5px] text-text-body leading-[1.5]">{alert}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
