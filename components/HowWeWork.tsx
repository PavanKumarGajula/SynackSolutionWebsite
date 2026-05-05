"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import FadeUp from "@/components/FadeUp";
import Eyebrow from "@/components/Eyebrow";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    num: "1",
    period: "Day 1",
    title: "Day 1 — A real start.",
    desc: "Admin taken over. Credentials centralised. Immediate risks locked down.",
  },
  {
    num: "2",
    period: "Week 1",
    title: "Your environment, mapped.",
    desc: "Users. Systems. Vendors. Gaps. Risks. A clear picture — not a dense report.",
  },
  {
    num: "3",
    period: "Weeks 2–3",
    title: "The work happens.",
    desc: "Systems connected. Security enforced. We handle the work — you stay focused.",
  },
  {
    num: "4",
    period: "Day 30",
    title: "You stop thinking about IT.",
    desc: "No escalations. No vendor calls. The environment runs.",
  },
];

export default function HowWeWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState([false, false, false, false]);

  useEffect(() => {
    if (!isInView) return;
    const timers = [0, 400, 800, 1200].map((delay, i) =>
      setTimeout(
        () => setActive(prev => prev.map((v, j) => (j === i ? true : v))),
        delay,
      )
    );
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section className="relative bg-bg-page py-12 lg:py-20">
      <div className="max-w-site mx-auto px-5 lg:px-10 flex flex-col gap-8 lg:gap-10">

        {/* Text — centered */}
        <FadeUp>
          <div className="flex flex-col items-center text-center">
            <Eyebrow>How We Work</Eyebrow>
            <h2
              className="font-outfit font-black text-h1 text-text-heading mb-5"
            >
              We come prepared. From day one.
            </h2>
            <p className="text-body-lg text-text-muted max-w-[56ch]">
              We map your environment. We bring you the plan.{" "}
              <strong className="text-text-heading font-bold">You&apos;re not managing us — we&apos;re working for you.</strong>
            </p>
          </div>
        </FadeUp>

        {/* Timeline */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 64, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 64, scale: 0.97 }}
          transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
        >
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-0">

            {/* Background line */}
            <div className="absolute top-6 left-[12.5%] right-[12.5%] h-[2px] bg-border-light hidden lg:block" />

            {/* Animated fill line */}
            <motion.div
              className="absolute top-6 left-[12.5%] h-[2px] bg-gradient-to-r from-accent to-accent-hover rounded-full hidden lg:block"
              initial={{ width: "0%" }}
              animate={isInView ? { width: "75%" } : { width: "0%" }}
              transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
            />

            {steps.map((step, i) => (
              <div
                key={step.num}
                className="flex flex-col items-center text-center px-4 relative z-10"
              >
                {/* Node */}
                <div className={[
                  "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mb-4 border-2 relative z-10",
                  "transition-all duration-300",
                  active[i]
                    ? "bg-primary border-primary scale-[1.08] ring-[6px] ring-accent/[0.10]"
                    : "bg-white border-border-light",
                ].join(" ")}>
                  <span className={`font-outfit text-[16px] font-black transition-colors duration-300 ${
                    active[i] ? "text-scale-50" : "text-text-muted"
                  }`}>
                    {step.num}
                  </span>
                </div>

                {/* Period */}
                <motion.p
                  className="text-[10px] font-bold tracking-[0.12em] uppercase text-accent mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={active[i] ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {step.period}
                </motion.p>

                {/* Title */}
                <motion.p
                  className="font-outfit text-[15px] font-extrabold text-text-heading leading-[1.3] mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={active[i] ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
                >
                  {step.title}
                </motion.p>

                {/* Desc */}
                <motion.p
                  className="text-[13px] text-text-muted leading-[1.65]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={active[i] ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
                >
                  {step.desc}
                </motion.p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
