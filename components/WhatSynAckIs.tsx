"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WhatSynAckIs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const anim = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section className="relative overflow-hidden bg-bg-page py-[120px]" ref={ref}>
      <div className="max-w-site mx-auto px-5 lg:px-10">

        {/* Eyebrow */}
        <motion.div className="flex items-center gap-2.5 mb-14" {...anim(0.1)}>
          <span className="w-6 h-[2px] bg-accent rounded-full flex-shrink-0" />
          <span className="font-mono text-[11px] font-bold tracking-[0.17em] uppercase text-accent">
            What SynAck Is
          </span>
        </motion.div>

        {/* Display heading — staggered lines */}
        <div className="mb-14">
          <motion.p
            className="font-outfit font-black text-text-heading"
            style={{
              fontSize: "clamp(54px,8vw,112px)",
              letterSpacing: "-0.05em",
              lineHeight: 0.92,
            }}
            {...anim(0.18)}
          >
            Your business
          </motion.p>

          <motion.p
            className="font-outfit font-black text-text-heading"
            style={{
              fontSize: "clamp(54px,8vw,112px)",
              letterSpacing: "-0.05em",
              lineHeight: 0.92,
              paddingLeft: "clamp(20px,9%,148px)",
            }}
            {...anim(0.27)}
          >
            is the priority.
          </motion.p>

          <motion.p
            className="font-outfit font-black text-text-muted"
            style={{
              fontSize: "clamp(20px,2.8vw,38px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              paddingLeft: "clamp(10px,4%,64px)",
              marginTop: "clamp(10px,1.4vw,22px)",
            }}
            {...anim(0.36)}
          >
            Your IT shouldn&apos;t compete with it.
          </motion.p>
        </div>

        {/* Rule — draws left to right on scroll */}
        <motion.div
          style={{
            height: 1,
            background: "rgba(30,77,140,.14)",
            marginBottom: "clamp(40px,5vw,72px)",
            transformOrigin: "left",
          }}
          initial={reduced ? false : { scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.44, ease: EASE }}
        />

        {/* Body — editorial split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end">

          {/* Left: the problem */}
          <motion.p
            className="text-text-muted leading-[1.75]"
            style={{ fontSize: "clamp(16px,1.5vw,18px)", maxWidth: "44ch" }}
            {...anim(0.52)}
          >
            Most businesses lose ten hours a week to IT — fighting fires, chasing vendors,
            second-guessing whether things are secure.
          </motion.p>

          {/* Right: the answer */}
          <div>
            <motion.p
              className="text-text-muted leading-[1.75] mb-5"
              style={{ fontSize: "clamp(16px,1.5vw,18px)" }}
              {...anim(0.60)}
            >
              That&apos;s not your job.
            </motion.p>

            <motion.p
              className="font-outfit font-black text-accent"
              style={{
                fontSize: "clamp(68px,9.5vw,132px)",
                letterSpacing: "-0.055em",
                lineHeight: 0.88,
              }}
              {...anim(0.68)}
            >
              It&apos;s ours.
            </motion.p>
          </div>

        </div>

      </div>
    </section>
  );
}
