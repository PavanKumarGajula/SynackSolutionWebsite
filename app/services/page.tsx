"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MonitorCheck, ShieldCheck, Cloud } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import FadeUp from "@/components/FadeUp";
import ServiceTabs from "@/components/ServiceTabs";
import HowWeWork from "@/components/HowWeWork";
import CtaSection from "@/components/CtaSection";

const EASE = [0.22, 1, 0.36, 1] as const;

const trustItems = [
  { num: "247", suffix: "+",     label: "Endpoints across active clients" },
  { num: "4",   suffix: "min",   label: "Avg response business hours" },
  { num: "99",  suffix: ".98%",  label: "Uptime guaranteed" },
  { num: "10",  suffix: "+",     label: "Services under one roof" },
];

const startCards = [
  {
    id: "managed-it", step: "Start here", featured: true,
    icon: MonitorCheck, title: "Managed IT & Help Desk",
    body: "Your foundation. If no one owns your environment — start here. Everything else is built on this.",
  },
  {
    id: "cybersecurity", step: "Add second", featured: false,
    icon: ShieldCheck, title: "Cybersecurity",
    body: "Your protection. If you're not certain your business is secure — add this second.",
  },
  {
    id: "m365", step: "Fastest win", featured: false,
    icon: Cloud, title: "Microsoft 365 & Cloud",
    body: "Your cloud. If your M365 tenant is ungoverned sprawl — this is the fastest win.",
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState("managed-it");

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const titleLines = [
    "One team.",
    "Full ownership of your IT.",
    "No gaps. No finger-pointing.",
  ];

  const handleStartCard = (id: string) => {
    setActiveTab(id);
    setTimeout(() => {
      document.getElementById("service-tabs")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <main className="pt-[68px]">

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative flex flex-col justify-center bg-bg-page overflow-hidden px-5 lg:px-10 pt-24 pb-20 min-h-[calc(100vh-68px)]"
      >
        {/* Ambient glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 90% 10%, rgba(36,114,200,.07) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(16,35,71,.05) 0%, transparent 60%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-bg-page to-transparent pointer-events-none" />

        {/* Ghost number */}
        <span
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-outfit font-black text-primary select-none pointer-events-none leading-none hidden lg:block"
          style={{ fontSize: "clamp(160px,20vw,300px)", letterSpacing: "-0.06em", opacity: 0.025 }}
          aria-hidden="true"
        >
          10
        </span>

        <div className="relative z-10 max-w-site mx-auto w-full">

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            >
              <Eyebrow>Our Services</Eyebrow>
            </motion.div>

            <h1
              className="font-outfit font-black text-text-heading mb-6"
              style={{ fontSize: "clamp(40px,6vw,72px)", letterSpacing: "-0.04em", lineHeight: 1.01 }}
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={heroInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.35 + i * 0.13, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
            >
              <p
                className="text-text-muted leading-[1.8]"
                style={{ fontSize: "clamp(15px,1.5vw,18px)" }}
              >
                From the laptop on your desk to the camera at your door. Everything.<br /><br />
                Ten services. One invoice.{" "}
                <strong className="text-text-heading font-bold">One accountable partner.</strong>
              </p>

              <div className="flex-shrink-0">
                <Link href="/contact" className="btn btn-primary">
                  Talk to us <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            </motion.div>

        </div>
      </section>

      {/* ── Trust Strip ── */}
      <div className="bg-white border-y border-border-light">
        <div className="max-w-site mx-auto grid grid-cols-2 md:grid-cols-4 [&>*]:border-border-light">
          {trustItems.map((t, i) => (
            <div
              key={t.label}
              className={[
                "px-6 py-5 text-center",
                i === 0 ? "border-r" : "",
                i === 1 ? "md:border-r" : "",
                i === 2 ? "border-r border-t md:border-t-0" : "",
                i === 3 ? "border-t md:border-t-0" : "",
              ].join(" ")}
            >
              <p className="font-outfit text-[26px] font-black tracking-[-0.03em] text-text-heading leading-none mb-1">
                {t.num}<span className="text-accent">{t.suffix}</span>
              </p>
              <p className="text-[12px] font-semibold text-text-muted leading-[1.4]">{t.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Where To Start ── */}
      <section className="py-16 lg:py-20 bg-bg-page">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <FadeUp>
            <Eyebrow>Where To Begin</Eyebrow>
            <h2 className="font-outfit text-h1 font-black text-text-heading mb-3">
              Not sure where to start?<br />Most clients begin here.
            </h2>
            <p className="text-body text-text-muted mb-1.5">
              We manage IT across 10 areas. Most clients start with 2 or 3.
            </p>
            <p className="text-[14px] italic mb-10" style={{ color: "rgba(30,77,140,.55)" }}>
              Most come to us after something goes wrong. By then, it costs more.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {startCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <FadeUp key={card.id} delay={i * 0.1}>
                  <button
                    onClick={() => handleStartCard(card.id)}
                    className={[
                      "w-full text-left rounded-[18px] p-7 relative overflow-hidden border transition-all duration-200 group cursor-pointer",
                      card.featured
                        ? "bg-primary border-primary hover:border-accent hover:shadow-[0_8px_40px_rgba(16,35,71,.25)]"
                        : "bg-white border-border-light hover:border-accent hover:shadow-[0_8px_32px_rgba(36,114,200,.12)] hover:-translate-y-0.5",
                    ].join(" ")}
                  >
                    {/* Bottom accent bar on hover (non-featured only) */}
                    {!card.featured && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent to-accent-hover rounded-b-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    )}

                    <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center mb-[18px] border ${
                      card.featured
                        ? "bg-accent/15 border-accent/30"
                        : "bg-scale-50 border-border-light"
                    }`}>
                      <Icon size={22} className="text-accent" />
                    </div>

                    <span className={`text-[10px] font-bold tracking-[0.14em] uppercase block mb-2 ${
                      card.featured ? "text-text-on-dark" : "text-accent"
                    }`}>
                      {card.step}
                    </span>

                    <p className={`font-outfit text-[17px] font-extrabold mb-2.5 ${
                      card.featured ? "text-text-heading-on-dark" : "text-text-heading"
                    }`}>
                      {card.title}
                    </p>

                    <p className={`text-[13.5px] leading-[1.65] ${
                      card.featured ? "text-text-on-dark" : "text-text-muted"
                    }`}>
                      {card.body}
                    </p>
                  </button>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Service Tabs ── */}
      <ServiceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ── How We Work ── */}
      <HowWeWork />

      {/* ── CTA ── */}
      <CtaSection />

    </main>
  );
}
