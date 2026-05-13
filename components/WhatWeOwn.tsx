"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Eyebrow from "@/components/Eyebrow";
import { IconArrowRight } from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    num: "01",
    name: "Managed IT & Infrastructure",
    tag: "Foundation",
    color: "#2472C8",
    description:
      "The foundation that keeps the business running. From help desk to network to disaster recovery, we own the stack.",
    bullets: [
      "Managed IT & Help Desk",
      "Microsoft 365 & Cloud",
      "Network Infrastructure: Wi-Fi, firewalls, switching, VPN",
      "IT Asset Procurement & Lifecycle",
      "Backup & Disaster Recovery",
    ],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=90",
  },
  {
    num: "02",
    name: "Cybersecurity",
    tag: "Protection",
    color: "#E84040",
    description:
      "Identity-first security built around Microsoft 365, Conditional Access, MFA, and device trust.",
    bullets: [
      "Managed Detection & Response (MDR)",
      "Endpoint Security (EDR)",
      "Email Security",
      "Vulnerability Management & Pen Testing",
      "Security Awareness Training",
    ],
    img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1400&q=90",
  },
  {
    num: "03",
    name: "Compliance & Risk",
    tag: "Governance",
    color: "#F59E0B",
    description:
      "Compliance readiness and technical controls support: HIPAA, SOC 2, and NIST CSF as frameworks, not promises.",
    bullets: [
      "Compliance Readiness & Gap Assessments",
      "Technical Controls Implementation",
      "Risk Assessments",
      "Policy Development & Documentation",
      "Audit Support & Evidence Collection",
    ],
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=90",
  },
  {
    num: "04",
    name: "Modern Workplace & Identity",
    tag: "Productivity",
    color: "#22A05A",
    description:
      "Productivity, governance, and access lifecycle across the Microsoft ecosystem.",
    bullets: [
      "Microsoft 365 Governance",
      "Identity Governance & Lifecycle (JML automation)",
      "Microsoft 365 Copilot Readiness",
      "Data Protection: Purview, classification, labeling",
      "Secure Collaboration",
    ],
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=90",
  },
];

export default function WhatWeOwn() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIdx(Math.min(3, Math.floor(v * 4)));
  });

  return (
    <>
      {/* ── Desktop: scroll-driven horizontal accordion ── */}
      <div ref={containerRef} className="hidden lg:block" style={{ height: "400vh" }}>
        <section className="sticky top-0 h-screen bg-bg-page overflow-hidden flex flex-col">

          {/* Header */}
          <div className="max-w-site mx-auto px-10 w-full pt-14 pb-7 flex-shrink-0 flex items-end justify-between">
            <div>
              <Eyebrow>What We Own</Eyebrow>
              <h2
                className="font-outfit font-black text-text-heading"
                style={{ fontSize: "clamp(26px,2.8vw,40px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
              >
                Four areas.{" "}
                <em className="not-italic text-accent">One team.</em>{" "}
                Nothing falls between.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-primary transition-colors duration-150 flex-shrink-0 mb-1"
            >
              View all 24 services
              <IconArrowRight size={13} stroke={2} />
            </Link>
          </div>

          {/* Accordion cards */}
          <div
            className="max-w-site mx-auto px-10 w-full pb-12 flex gap-3"
            style={{ flex: 1, minHeight: 0 }}
          >
            {services.map((svc, i) => {
              const isActive = i === activeIdx;
              return (
                <motion.div
                  key={svc.num}
                  className="relative rounded-[18px] overflow-hidden"
                  initial={{ flexGrow: i === 0 ? 5 : 1 }}
                  animate={{ flexGrow: isActive ? 5 : 1 }}
                  transition={{ duration: 0.65, ease: EASE }}
                  style={{ flexBasis: 0, flexShrink: 0, minWidth: 0 }}
                >
                  {/* Background photo */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${svc.img}')` }}
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(6,12,24,0.55)] to-[rgba(6,12,24,0.92)]" />
                  <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[rgba(6,12,24,1)] to-transparent" />

                  {/* Color border */}
                  <motion.div
                    className="absolute inset-0 rounded-[18px] pointer-events-none"
                    animate={{
                      boxShadow: isActive
                        ? `inset 0 0 0 1.5px ${svc.color}55, 0 0 60px ${svc.color}18`
                        : "inset 0 0 0 1px rgba(255,255,255,0.06)",
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* ── Collapsed label ── */}
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-between py-8 px-0"
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: isActive ? 0.15 : 0.3, delay: isActive ? 0 : 0.2 }}
                    style={{ pointerEvents: isActive ? "none" : "auto" }}
                  >
                    <span className="font-outfit text-[11px] font-black text-white/25 tracking-[0.06em]">
                      {svc.num}
                    </span>
                    <span
                      className="font-outfit text-[10.5px] font-semibold text-white/40 whitespace-nowrap"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.05em" }}
                    >
                      {svc.name}
                    </span>
                    <span
                      className="w-[5px] h-[5px] rounded-full"
                      style={{ background: svc.color, opacity: 0.7 }}
                    />
                  </motion.div>

                  {/* ── Expanded content ── */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-8"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: isActive ? 0.3 : 0 }}
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                  >
                    {/* Step progress pills */}
                    <div className="flex items-center gap-1.5 mb-6">
                      {services.map((_, j) => (
                        <motion.div
                          key={j}
                          className="h-[2.5px] rounded-full"
                          animate={{
                            width: j === activeIdx ? 26 : 7,
                            opacity: j < activeIdx ? 0.35 : j === activeIdx ? 1 : 0.2,
                            backgroundColor: j <= activeIdx ? svc.color : "#ffffff",
                          }}
                          transition={{ duration: 0.4 }}
                        />
                      ))}
                    </div>

                    {/* Tag pill */}
                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase mb-4 self-start px-3 py-1.5 rounded-full"
                      style={{
                        background: `${svc.color}18`,
                        border: `1px solid ${svc.color}50`,
                        color: svc.color,
                      }}
                    >
                      <span className="w-[4px] h-[4px] rounded-full flex-shrink-0" style={{ background: svc.color }} />
                      {svc.tag}
                    </span>

                    {/* Service name */}
                    <h3
                      className="font-outfit font-black text-white mb-3"
                      style={{ fontSize: "clamp(22px,2.4vw,36px)", letterSpacing: "-0.03em", lineHeight: 1.06 }}
                    >
                      {svc.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[14px] text-white/55 leading-[1.7] mb-5 max-w-[44ch]">
                      {svc.description}
                    </p>

                    {/* Key services list */}
                    <div className="flex flex-col gap-2">
                      {svc.bullets.slice(0, 4).map((b) => (
                        <div key={b} className="flex items-center gap-2.5">
                          <span
                            className="w-[4px] h-[4px] rounded-full flex-shrink-0 mt-px"
                            style={{ background: svc.color }}
                          />
                          <span className="text-[12px] text-white/45 leading-none">{b}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                </motion.div>
              );
            })}
          </div>

        </section>
      </div>

      {/* ── Mobile: stacked cards ── */}
      <section className="lg:hidden bg-bg-page py-16 px-5">
        <div className="mb-10">
          <Eyebrow>What We Own</Eyebrow>
          <h2
            className="font-outfit font-black text-text-heading"
            style={{ fontSize: "clamp(28px,7vw,40px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
          >
            Four areas.{" "}
            <em className="not-italic text-accent">One team.</em>{" "}
            Nothing falls between.
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {services.map((svc) => (
            <div
              key={svc.num}
              className="relative rounded-[18px] overflow-hidden h-[260px]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${svc.img}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(6,12,24,0.45)] to-[rgba(6,12,24,0.95)]" />
              <div
                className="absolute inset-0 rounded-[18px]"
                style={{ border: `1.5px solid ${svc.color}40` }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase mb-3 self-start px-2.5 py-1 rounded-full"
                  style={{
                    background: `${svc.color}18`,
                    border: `1px solid ${svc.color}44`,
                    color: svc.color,
                  }}
                >
                  {svc.tag}
                </span>
                <p
                  className="font-outfit font-black text-white mb-2"
                  style={{ fontSize: 22, letterSpacing: "-0.025em", lineHeight: 1.1 }}
                >
                  {svc.name}
                </p>
                <p className="text-[13px] text-white/55 leading-[1.55]">{svc.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/services"
          className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent hover:text-white transition-colors duration-150"
        >
          View all 24 services
          <IconArrowRight size={13} stroke={2} />
        </Link>
      </section>
    </>
  );
}
