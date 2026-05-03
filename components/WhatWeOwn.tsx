"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import {
  MonitorCheck, ShieldCheck, Cloud, Network, LockKeyhole,
  HardDriveDownload, TrendingUp, PackageCheck, GraduationCap, Video,
} from "lucide-react";
import FadeUp from "@/components/FadeUp";
import Eyebrow from "@/components/Eyebrow";

const EASE = [0.22, 1, 0.36, 1] as const;

const tiles = [
  {
    num: "01", name: "Managed IT & Help Desk", tag: "Core Service",
    icon: MonitorCheck,
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=90",
  },
  {
    num: "02", name: "Cybersecurity", tag: "Security",
    icon: ShieldCheck,
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=90",
  },
  {
    num: "03", name: "Microsoft 365 & Cloud", tag: "Cloud",
    icon: Cloud,
    img: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=90",
  },
  {
    num: "04", name: "Network Infrastructure", tag: "Network",
    icon: Network,
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=90",
  },
  {
    num: "05", name: "Physical Security", tag: "Security",
    icon: LockKeyhole,
    img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=90",
  },
  {
    num: "06", name: "Backup & Disaster Recovery", tag: "Recovery",
    icon: HardDriveDownload,
    img: "https://images.unsplash.com/photo-1580584126903-c17d41830450?w=800&q=90",
  },
  {
    num: "07", name: "IT Strategy & vCIO", tag: "Advisory",
    icon: TrendingUp,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90",
  },
  {
    num: "08", name: "IT Asset Procurement", tag: "Hardware",
    icon: PackageCheck,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=90",
  },
  {
    num: "09", name: "Security Awareness Training", tag: "Training",
    icon: GraduationCap,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=90",
  },
  {
    num: "10", name: "AV & Conference Rooms", tag: "AV",
    icon: Video,
    img: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=90",
  },
];

export default function WhatWeOwn() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [endX, setEndX] = useState(-1500);

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return;
      const vw = window.innerWidth;
      const leftPad = Math.max(20, (vw - 1120) / 2 + 20);
      // Slide until the last card's right edge has ~60px breathing room
      setEndX(-(trackRef.current.scrollWidth - vw + leftPad + 60));
    };
    const t = setTimeout(calc, 120);
    window.addEventListener("resize", calc);
    return () => { clearTimeout(t); window.removeEventListener("resize", calc); };
  }, []);

  const rawX = useMotionValue(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      rawX.set(v * endX);
    });
  }, [scrollYProgress, endX, rawX]);

  const x = useSpring(rawX, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} style={{ height: "300vh" }}>
      <section
        ref={sectionRef}
        className="sticky top-0 h-screen bg-bg-page overflow-hidden flex flex-col pt-20 pb-6 lg:pt-24 lg:pb-8"
      >

        {/* Header */}
        <div className="pl-[max(20px,calc(50vw-520px))] lg:pl-[max(40px,calc(50vw-520px))] pr-5 lg:pr-10 mb-5">
          <FadeUp>
            <Eyebrow>What We Own</Eyebrow>
            <h2 className="font-outfit font-black text-text-heading" style={{ fontSize: "clamp(26px, 3.2vw, 44px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
              This is what we take<br />ownership of.
            </h2>
          </FadeUp>
        </div>

        {/* Track — no overflow, driven by scroll */}
        <div className="pl-[max(20px,calc(50vw-520px))] lg:pl-[max(40px,calc(50vw-520px))] overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-4 will-change-transform"
          >
            {tiles.map((tile, i) => {
              const Icon = tile.icon;
              return (
                <motion.div
                  key={tile.num}
                  className="group relative flex-shrink-0 w-[260px] h-[380px] rounded-[24px] overflow-hidden flex flex-col justify-between p-7 border border-white/[0.10] hover:border-accent/[0.35] transition-colors duration-300"
                  initial={{ opacity: 0, y: 32 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 32px 72px rgba(10,18,35,0.55)",
                    transition: { duration: 0.25, ease: EASE },
                  }}
                >
                  {/* Photo */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                    style={{ backgroundImage: `url('${tile.img}')` }}
                  />

                  {/* Gradient layers */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,16,32,0.18)] via-[rgba(8,16,32,0.28)] to-[rgba(6,12,24,0.94)]" />
                  <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[rgba(6,12,24,0.98)] to-transparent" />

                  {/* Accent tint on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.18] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Decorative number */}
                  <span className="absolute top-3 right-5 font-outfit text-[100px] font-black text-white/[0.055] leading-none pointer-events-none select-none z-10 group-hover:text-white/[0.08] transition-colors duration-300">
                    {tile.num}
                  </span>

                  {/* Top — icon */}
                  <div className="relative z-20">
                    <div
                      className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(255,255,255,0.10)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <Icon size={24} color="white" strokeWidth={1.6} />
                    </div>
                  </div>

                  {/* Bottom — name + tag */}
                  <div className="relative z-20">
                    <div className="w-7 h-[2px] rounded-full mb-4 bg-white/20 group-hover:bg-accent group-hover:w-10 transition-all duration-300" />
                    <p className="font-outfit text-[18px] font-black text-white leading-[1.2] tracking-[-0.02em] mb-3">
                      {tile.name}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-[9.5px] font-bold tracking-[0.09em] uppercase text-white/55 px-3 py-[5px] rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.13)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <span className="w-[5px] h-[5px] rounded-full bg-accent flex-shrink-0" />
                      {tile.tag}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="max-w-site mx-auto px-5 lg:px-10 mt-5">
          <div className="w-full max-w-[320px] h-[3px] bg-border-light rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              style={{ width: barWidth }}
            />
          </div>
        </div>

      </section>
    </div>
  );
}
