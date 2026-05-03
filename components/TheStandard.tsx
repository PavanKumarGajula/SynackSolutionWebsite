"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FadeUp from "@/components/FadeUp";
import Eyebrow from "@/components/Eyebrow";

const EASE = [0.22, 1, 0.36, 1] as const;

const bars = [
  { h: 52, after: false, label: "Jan" },
  { h: 40, after: false, label: "Feb" },
  { h: 56, after: false, label: "Mar" },
  { h: 32, after: false, label: "Apr" },
  { h: 8,  after: true,  label: "May" },
  { h: 4,  after: true,  label: "Jun" },
  { h: 2,  after: true,  label: "Jul" },
];

const systems = [
  { name: "Microsoft 365", status: "Operational" },
  { name: "Network",        status: "Operational" },
  { name: "Backup & DR",    status: "Verified"    },
  { name: "Access Control", status: "Enforced"    },
];

const costLines = [
  "Managed IT & Help Desk",
  "Cybersecurity",
  "Microsoft 365",
  "Network & Infrastructure",
  "Physical Security",
  "Backup & Recovery",
];

const metrics = [
  { num: "99", suffix: ".98%", label: "Uptime" },
  { num: "4",  suffix: "min",  label: "Avg Response" },
  { num: "0",  suffix: "",     label: "Incidents" },
];

const CARD = "rounded-[20px] bg-white border border-border-light overflow-hidden hover:border-accent transition-colors duration-200";
const VISUAL = "p-5 bg-bg-page border-b border-border-light flex flex-col justify-center";
const TEXT = "px-5 py-4";

export default function TheStandard() {
  const topRef = useRef(null);
  const botRef = useRef(null);
  const topInView = useInView(topRef, { once: true, margin: "-80px" });
  const botInView = useInView(botRef, { once: true, margin: "-80px" });

  return (
    <section className="bg-bg-page py-12 lg:py-20">
      <div className="max-w-site mx-auto px-5 lg:px-10 flex flex-col gap-8 lg:gap-10">

        <FadeUp>
          <div>
            <Eyebrow>The Standard</Eyebrow>
            <h2 className="font-outfit text-h1 font-black text-text-heading mb-4">
              Support reacts.<br />Ownership prevents.
            </h2>
            <p className="text-body text-text-muted">
              Most IT providers wait for failure, then respond. We don&apos;t.
            </p>
          </div>
        </FadeUp>

        <div>

          {/* ── Top row — 3 cards ── */}
          <div ref={topRef} className="grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* Card 1 — Incident graph */}
            <motion.div
              className={CARD}
              initial={{ opacity: 0, y: 56, scale: 0.96 }}
              animate={topInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 56, scale: 0.96 }}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
              whileHover={{ y: -4, boxShadow: "0 8px 40px rgba(36,114,200,0.10)" }}
            >
              <div className={VISUAL}>
                <p className="text-[11px] font-semibold text-text-muted mb-1">Incidents this month</p>
                <p className="font-outfit text-[32px] font-black tracking-[-0.04em] text-text-heading leading-none mb-1">0</p>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-status-success-text bg-status-success-bg border border-status-success-border px-2 py-0.5 rounded-full mb-4 self-start">
                  ↓ 100% vs last quarter
                </div>
                <div className="flex items-end gap-1 h-[60px]">
                  {bars.map((b) => (
                    <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        className={`w-full rounded-t-[3px] ${
                          b.after
                            ? "bg-status-success-bg border border-status-success-border"
                            : "bg-red-100 border border-red-200"
                        }`}
                        initial={{ height: 0 }}
                        animate={topInView ? { height: b.h } : { height: 0 }}
                        transition={{ duration: 0.55, delay: 0.35, ease: EASE }}
                      />
                      <span className="text-[8.5px] text-text-muted font-semibold leading-none">{b.label}</span>
                    </div>
                  ))}
                </div>
                <div
                  className="flex justify-between mt-2 text-[9px] font-semibold tracking-[0.04em]"
                  style={{ color: "rgba(30,77,140,0.35)" }}
                >
                  <span>← Before SynAck</span><span>After →</span>
                </div>
              </div>
              <div className={TEXT}>
                <p className="font-outfit text-[15px] font-extrabold text-text-heading mb-1.5">Prevent failure at the source</p>
                <p className="text-[13px] text-text-muted leading-[1.65]">Systems designed to reduce incidents, not just respond to them.</p>
              </div>
            </motion.div>

            {/* Card 2 — Status monitoring */}
            <motion.div
              className={CARD}
              initial={{ opacity: 0, y: 56, scale: 0.96 }}
              animate={topInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 56, scale: 0.96 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              whileHover={{ y: -4, boxShadow: "0 8px 40px rgba(36,114,200,0.10)" }}
            >
              <div className={VISUAL}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-bold text-text-heading">System Status</p>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.08em] uppercase text-status-success">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-status-success flex-shrink-0"
                      animate={{ opacity: [1, 0.35, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    Live
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  {systems.map((s) => (
                    <div key={s.name} className="flex items-center justify-between px-2.5 py-[7px] bg-white border border-border-light rounded-[7px]">
                      <span className="text-[11.5px] font-semibold text-text-body">{s.name}</span>
                      <span className="text-[9.5px] font-bold text-status-success-text bg-status-success-bg border border-status-success-border px-1.5 py-0.5 rounded-[4px]">{s.status}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2.5 text-[10.5px] text-text-muted">
                  Last issue detected: <span className="font-bold text-accent">47 days ago</span>
                </p>
              </div>
              <div className={TEXT}>
                <p className="font-outfit text-[15px] font-extrabold text-text-heading mb-1.5">Detect before disruption</p>
                <p className="text-[13px] text-text-muted leading-[1.65]">We see issues before they impact your operations.</p>
              </div>
            </motion.div>

            {/* Card 3 — Engineer chat */}
            <motion.div
              className={CARD}
              initial={{ opacity: 0, y: 56, scale: 0.96 }}
              animate={topInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 56, scale: 0.96 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
              whileHover={{ y: -4, boxShadow: "0 8px 40px rgba(36,114,200,0.10)" }}
            >
              <div className={VISUAL}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-bold text-text-heading">Support Request</p>
                  <span className="text-[10px] font-bold text-text-muted bg-scale-50 border border-border-light px-2 py-0.5 rounded-[4px]">#SR-2847</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="px-3 py-2.5 rounded-[10px] rounded-br-[2px] bg-scale-50 border border-border-light text-[11.5px] text-text-body leading-[1.5]">
                    VPN dropping for remote users since this morning.
                  </div>
                  <div className="px-3 py-2.5 rounded-[10px] rounded-bl-[2px] bg-primary text-[11px] text-text-heading-on-dark leading-[1.5]">
                    On it. Firewall misconfiguration — fixing now. Done in 8 min.
                  </div>
                  <p className="text-[9px] font-semibold text-status-success mt-0.5">
                    Senior Engineer · Responded in 4 min · No tiers. No handoffs.
                  </p>
                </div>
              </div>
              <div className={TEXT}>
                <p className="font-outfit text-[15px] font-extrabold text-text-heading mb-1.5">Direct engineer access</p>
                <p className="text-[13px] text-text-muted leading-[1.65]">No tiers. No handoffs. Real expertise, directly available.</p>
              </div>
            </motion.div>

          </div>

          {/* ── Bottom row — 2 wide cards ── */}
          <div ref={botRef} className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">

            {/* Card 4 — Cost */}
            <motion.div
              className={CARD}
              initial={{ opacity: 0, y: 56, scale: 0.96 }}
              animate={botInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 56, scale: 0.96 }}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
              whileHover={{ y: -4, boxShadow: "0 8px 40px rgba(36,114,200,0.10)" }}
            >
              <div className={VISUAL}>
                <p className="text-[11px] font-semibold text-text-muted mb-1">Monthly IT Investment</p>
                <p className="text-[13px] text-text-muted mb-3.5">One number. Every month. No variables.</p>
                <div className="h-px bg-border-light mb-3" />
                {costLines.map((name, i) => (
                  <div
                    key={name}
                    className={`flex items-center justify-between py-1.5 ${i < costLines.length - 1 ? "border-b border-border-light" : ""}`}
                  >
                    <span className="text-[12px] text-text-body">{name}</span>
                    <span className="text-[11px] font-bold text-status-success-text bg-status-success-bg border border-status-success-border px-1.5 py-0.5 rounded-[4px]">
                      Included
                    </span>
                  </div>
                ))}
              </div>
              <div className={TEXT}>
                <p className="font-outfit text-[15px] font-extrabold text-text-heading mb-1.5">Predictable cost structure</p>
                <p className="text-[13px] text-text-muted leading-[1.65]">One fixed monthly investment. No surprises, no exceptions.</p>
              </div>
            </motion.div>

            {/* Card 5 — Performance metrics */}
            <motion.div
              className={CARD}
              initial={{ opacity: 0, y: 56, scale: 0.96 }}
              animate={botInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 56, scale: 0.96 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              whileHover={{ y: -4, boxShadow: "0 8px 40px rgba(36,114,200,0.10)" }}
            >
              <div className={VISUAL}>
                <p className="text-[11px] font-bold text-text-heading mb-4">Performance · Last 30 Days</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {metrics.map((m) => (
                    <div key={m.label} className="text-center py-4 px-3 bg-white border border-border-light rounded-[12px]">
                      <p className="font-outfit text-[26px] font-black tracking-[-0.03em] text-text-heading leading-none mb-1">
                        {m.num}
                        <span className="text-[14px] font-semibold text-accent">{m.suffix}</span>
                      </p>
                      <p className="text-[10px] font-semibold text-text-muted">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={TEXT}>
                <p className="font-outfit text-[15px] font-extrabold text-text-heading mb-1.5">Measured. Transparent. Accountable.</p>
                <p className="text-[13px] text-text-muted leading-[1.65]">Most IT companies measure response time. We measure how rarely you need us.</p>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
