"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="bg-primary relative overflow-hidden py-16 lg:py-24">

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,212,247,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,212,247,.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Glows */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(36,114,200,.18) 0%, transparent 65%)" }} />
      <div className="absolute bottom-[-150px] left-[8%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(36,114,200,.08) 0%, transparent 65%)" }} />
      <div className="absolute bottom-[-100px] right-[8%] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(36,114,200,.06) 0%, transparent 65%)" }} />

      <div className="relative z-10 max-w-[800px] mx-auto px-5 lg:px-10 text-center">

        {/* Eyebrow */}
        <motion.div
          className="inline-flex items-center gap-2.5 mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="w-5 h-0.5 bg-accent rounded-full" />
          <span className="text-eyebrow font-bold uppercase text-accent">The Decision</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-outfit text-display font-black text-text-heading-on-dark mb-6 text-balance"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          Don&apos;t take our word for it. Look at how we work.{" "}
          Then decide.
        </motion.h2>

        {/* Body */}
        <motion.p
          className="text-body text-text-on-dark max-w-[52ch] mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
        >
          A senior engineer reviews your environment, maps what&apos;s broken, and tells you exactly what needs to happen. Not a template, not a sales pitch.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.34, ease: EASE }}
        >
          <Link href="/contact" className="btn btn-white">
            Talk to us
            <IconArrowRight size={14} stroke={2} />
          </Link>
          <Link href="/services" className="btn btn-outline-white">
            View Services
            <IconArrowRight size={14} stroke={2} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
