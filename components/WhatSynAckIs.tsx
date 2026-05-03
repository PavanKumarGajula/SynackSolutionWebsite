"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WhatSynAckIs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-bg-page">

      {/* Top bleed */}
      <div className="absolute top-0 left-0 right-0 h-[100px] pointer-events-none z-[1] bg-gradient-to-b from-bg-page to-transparent" />
      {/* Bottom bleed */}
      <div className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none z-[1] bg-gradient-to-t from-bg-page to-transparent" />

      {/* Ghost word */}
      <div
        className="absolute right-[-40px] top-1/2 -translate-y-1/2 font-outfit font-black leading-none text-primary pointer-events-none select-none hidden lg:block"
        style={{ fontSize: "clamp(180px, 22vw, 320px)", opacity: 0.028, letterSpacing: "-0.06em" }}
        aria-hidden="true"
      >
        OWN
      </div>

      {/* Subtle glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none bg-accent opacity-5" />

      {/* Grid */}
      <div
        ref={ref}
        className="relative z-[2] max-w-site mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-20 items-center"
      >

        {/* LEFT — Statement wall */}
        <div className="relative pl-7">

          {/* Animated left border */}
          <motion.div
            className="absolute left-0 top-0 w-[3px] rounded-full bg-accent"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
          />

          {/* Line 1 — small, muted */}
          <div className="overflow-hidden pb-1">
            <motion.span
              className="block font-outfit font-extrabold text-h2 text-text-muted"
              initial={{ opacity: 0, x: -60, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -60, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              Not support.
            </motion.span>
          </div>

          {/* Line 2 — medium */}
          <div className="overflow-hidden pb-1">
            <motion.span
              className="block font-outfit font-black text-h1 text-primary"
              initial={{ opacity: 0, x: -60, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -60, y: 20 }}
              transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
            >
              Not partial responsibility.
            </motion.span>
          </div>

          {/* Line 3 — largest */}
          <div className="overflow-hidden">
            <motion.span
              className="block font-outfit font-black text-display text-text-heading"
              initial={{ opacity: 0, x: -60, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -60, y: 20 }}
              transition={{ duration: 0.8, delay: 0.36, ease: EASE }}
            >
              Complete{" "}
              <span className="text-accent">ownership.</span>
            </motion.span>
          </div>
        </div>

        {/* RIGHT — Supporting content */}
        <motion.div
          initial={{ opacity: 0, y: 64, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 64, scale: 0.97 }}
          transition={{ duration: 0.85, delay: 0.45, ease: EASE }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-5 h-[2px] bg-accent rounded-full flex-shrink-0" />
            <p className="text-eyebrow font-bold uppercase text-accent">What SynAck Is</p>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-4 mb-8">
            <p className="text-[16px] text-text-muted leading-[1.8]">
              We take <strong className="text-text-heading font-bold">full ownership of your environment</strong> — systems, security, and how everything works together.
            </p>
            <p className="text-[16px] text-text-muted leading-[1.8]">
              We operate as your complete IT department. Or alongside your existing team. Either way —{" "}
              <strong className="text-text-heading font-bold">one partner. Full responsibility.</strong>
            </p>
            <p className="text-[16px] text-text-muted leading-[1.8]">
              Your IT runs. You don&apos;t think about it. That is the job.
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
