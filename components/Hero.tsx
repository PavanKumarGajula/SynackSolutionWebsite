"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { SiCisco, SiApple } from "react-icons/si";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Marquee logos ── */
const logos = [
  {
    name: "NinjaOne",
    icon: (
      <svg viewBox="0 0 100 100" width="22" height="22" className="flex-shrink-0">
        <rect width="100" height="100" rx="18" fill="#003151"/>
        <path fill="#00E5A0" d="M15,82 L15,48 L25,18 L35,18 C35,6 85,6 85,34 L85,82 L65,82 L65,42 C65,30 50,26 35,34 L35,82 Z"/>
      </svg>
    ),
  },
  {
    name: "Microsoft 365",
    icon: (
      <svg viewBox="0 0 22 22" width="18" height="18" className="flex-shrink-0">
        <rect x="0"  y="0"  width="10" height="10" fill="#F25022"/>
        <rect x="12" y="0"  width="10" height="10" fill="#7FBA00"/>
        <rect x="0"  y="12" width="10" height="10" fill="#00A4EF"/>
        <rect x="12" y="12" width="10" height="10" fill="#FFB900"/>
      </svg>
    ),
  },
  {
    name: "Azure",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#0078D4" className="flex-shrink-0">
        <path d="M13.05 4.24L6.56 20.13H2l6.46-11.18 4.59-4.71zm.45 0l3.57 9.79-6.79 7.34 7.89-.07 3.83-10.73z"/>
      </svg>
    ),
  },
  {
    name: "Cisco",
    icon: <SiCisco size={20} color="#1BA0D7" className="flex-shrink-0" />,
  },
  {
    name: "Apple Business",
    icon: <SiApple size={18} color="#555" className="flex-shrink-0" />,
  },
  {
    name: "Intune",
    icon: (
      <svg viewBox="0 0 128 128" width="20" height="20" className="flex-shrink-0">
        <path d="M0 19.3C0 3 21.4-5.9 35.5 4.5L66.2 27.2L92.1 12.5C105.8 5 127.7 10.4 128 30.8V106C128 122.3 107.3 130.9 93.1 120.4L61.9 97.3L35.9 111.9C22.1 119.5 0 113.7 0 93.8V19.3Z" fill="#0078D4"/>
        <path d="M35.5 46.2C21.4 35.7 0 44.7 0 61V19.3C0 3 21.4-5.9 35.5 4.5L92.5 46.6C109.7 58.8 128 44.7 128 30.8V73.4C128 89.8 106.6 98.7 92.5 88.3L35.5 46.2Z" fill="#23C0FE"/>
      </svg>
    ),
  },
  {
    name: "Rhombus",
    icon: (
      <svg viewBox="5 35 242 242" width="20" height="20" className="flex-shrink-0">
        <defs>
          <linearGradient id="rh-g" x1="57.32" y1="224.5" x2="191.86" y2="89.95" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2A7DE1"/>
            <stop offset="1" stopColor="#00c1de"/>
          </linearGradient>
        </defs>
        <path fill="url(#rh-g)" d="M242.08,140.17L141.65,39.73c-9.42-9.42-24.69-9.42-34.11,0L7.1,140.17c-9.42,9.42-9.42,24.69,0,34.11l100.44,100.44c9.42,9.42,24.69,9.42,34.11,0l100.44-100.44c9.42-9.42,9.42-24.69,0-34.11Zm-116.29,53.65c-21.17,.68-38.47-16.62-37.8-37.79,.61-19.17,16.23-34.79,35.4-35.4,21.17-.68,38.47,16.63,37.79,37.8-.61,19.17-16.23,34.79-35.4,35.4Z"/>
      </svg>
    ),
  },
  {
    name: "Brivo",
    icon: (
      <svg viewBox="0 0 105 105" width="20" height="20" className="flex-shrink-0">
        <path fillRule="evenodd" fill="#739dd2" d="M11.68,52.58c0,22.47 18.22,40.69 40.69,40.69c22.47,0 40.69,-18.22 40.69,-40.69c0,-22.47 -18.22,-40.69 -40.69,-40.69c-22.47,0 -40.69,18.22 -40.69,40.69Zm93.18,-0.01c0,28.96 -23.47,52.43 -52.43,52.43c-28.96,0 -52.43,-23.47 -52.43,-52.43c0,-28.96 23.47,-52.43 52.43,-52.43c28.96,0 52.43,23.47 52.43,52.43Z"/>
        <path fillRule="evenodd" fill="#739dd2" d="M45.2,64.22c0,12.05 9.77,21.83 21.83,21.83c12.05,0 21.83,-9.77 21.83,-21.83c0,-12.05 -9.77,-21.83 -21.83,-21.83c-12.05,0 -21.83,9.77 -21.83,21.83Zm55.63,0c0,18.67 -15.14,33.81 -33.81,33.81c-18.67,0 -33.81,-15.14 -33.81,-33.81c0,-18.67 15.14,-33.81 33.81,-33.81c18.67,0 33.81,15.14 33.81,33.81Z"/>
      </svg>
    ),
  },
];


/* ── Rolling digit ── */
function RollingDigit({ digit, active, delay = 0 }: { digit: string; active: boolean; delay?: number }) {
  const idx = "0123456789".indexOf(digit);
  if (idx === -1) return <span>{digit}</span>;
  return (
    <span className="inline-block overflow-hidden" style={{ height: "1em", lineHeight: "1em" }}>
      <motion.span
        className="flex flex-col"
        initial={{ y: 0 }}
        animate={active ? { y: `${-idx}em` } : { y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ lineHeight: "1em" }}
      >
        {"0123456789".split("").map((d) => (
          <span key={d} className="block" style={{ height: "1em", lineHeight: "1em" }}>{d}</span>
        ))}
      </motion.span>
    </span>
  );
}

/* ── Stat counter ── */
function StatCounter({ val, numStatic, suffix, label }: {
  val: number | null; numStatic?: string; suffix: string; label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const numStr = val !== null ? String(val) : (numStatic ?? "");

  return (
    <div ref={ref} className="px-6 py-8 lg:py-10 text-center">
      <p className="font-outfit font-black text-h1 mb-1.5 leading-none tracking-[-0.03em]">
        <span className="text-primary inline-flex items-end">
          {numStr.split("").map((char, i) => (
            <RollingDigit key={i} digit={char} active={inView} delay={0.1 + i * 0.08} />
          ))}
        </span>
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="text-[13px] font-semibold text-text-muted tracking-[0.02em]">{label}</p>
    </div>
  );
}

const ACTIVITY_POOL = [
  "Backup complete",
  "0 threats detected",
  "Patch deployed",
  "247 devices online",
  "Firewall updated",
  "SSL cert renewed",
  "VPN tunnel verified",
  "MFA audit passed",
  "Antivirus updated",
  "Disk health: normal",
  "Email filter active",
  "Remote access OK",
];
const ACTIVITY_AGES = ["just now", "3m ago", "12m ago", "28m ago", "45m ago"];
type ActivityItem = { id: number; label: string; time: string };
let _actId = 0;

export default function Hero() {
  const dashRef    = useRef(null);
  const dashInView = useInView(dashRef, { once: true, margin: "-40px" });

  const [activities, setActivities] = useState<ActivityItem[]>(() =>
    ACTIVITY_POOL.slice(0, 5).map((label, i) => ({ id: _actId++, label, time: ACTIVITY_AGES[i] }))
  );
  const [endpoints, setEndpoints] = useState(247);
  const [syncSec, setSyncSec]     = useState(60);

  useEffect(() => {
    let poolIdx = 5;
    const iv = setInterval(() => {
      setActivities(prev => [
        { id: _actId++, label: ACTIVITY_POOL[poolIdx++ % ACTIVITY_POOL.length], time: "just now" },
        ...prev.slice(0, 4).map((a, i) => ({ ...a, time: ACTIVITY_AGES[i + 1] })),
      ]);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const iv = setInterval(() => {
      setEndpoints(246);
      t = setTimeout(() => setEndpoints(247), 2000);
    }, 9000);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setSyncSec(s => s + 30), 30000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-bg-page">


      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[280px] pointer-events-none z-[2] bg-gradient-to-t from-bg-page to-transparent" />



      {/* ── Center content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-[100px] pb-12 lg:pt-[120px] lg:pb-16 px-5 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center gap-2.5 mb-8"
        >
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 22 22" width="13" height="13" className="flex-shrink-0">
              <rect x="0"  y="0"  width="10" height="10" fill="#F25022"/>
              <rect x="12" y="0"  width="10" height="10" fill="#7FBA00"/>
              <rect x="0"  y="12" width="10" height="10" fill="#00A4EF"/>
              <rect x="12" y="12" width="10" height="10" fill="#FFB900"/>
            </svg>
            <SiApple size={12} color="#6B7280" className="flex-shrink-0" />
            <svg viewBox="0 0 24 24" width="13" height="13" fill="#0078D4" className="flex-shrink-0">
              <path d="M13.05 4.24L6.56 20.13H2l6.46-11.18 4.59-4.71zm.45 0l3.57 9.79-6.79 7.34 7.89-.07 3.83-10.73z"/>
            </svg>
          </div>
          <span className="w-px h-3 bg-border-light flex-shrink-0" />
          <span className="text-eyebrow font-bold uppercase text-accent">Managed IT Provider</span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-outfit font-black text-display text-text-heading mb-6 max-w-[680px]">
          <span className="block">We run, secure, and</span>
          <span className="block">connect your IT systems.</span>
        </h1>

        {/* Subtext */}
        <p className="text-body-lg mb-7 max-w-[48ch]">
          <span className="text-text-muted">
            If no one owns your environment, no one is responsible when it fails.
          </span>
        </p>

        {/* CTAs + trust */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col items-center gap-5"
        >
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/contact" className="btn btn-primary">
              Contact Us
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="7" x2="11" y2="7"/><polyline points="7,3 11,7 7,11"/>
              </svg>
            </Link>
            <Link href="/services" className="btn btn-outline">
              View Services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="7" x2="11" y2="7"/><polyline points="7,3 11,7 7,11"/>
              </svg>
            </Link>
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            {["We handle IT — you stay focused", "One partner. Full responsibility.", "Predictable monthly cost"].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <polyline points="1.5,5 3.5,7.5 8.5,2"/>
                  </svg>
                </div>
                <span className="text-[13px] font-medium text-text-muted">{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Dashboard mockup ── */}
        <motion.div
          ref={dashRef}
          initial={{ opacity: 0, y: 44, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          className="w-full max-w-[900px] mx-auto mt-14 rounded-2xl overflow-hidden border border-border-light shadow-2xl shadow-primary/[0.16]"
        >
          {/* Chrome bar */}
          <div className="bg-primary flex items-center gap-4 px-5 py-3">
            <div className="flex items-center gap-[5px] flex-shrink-0">
              <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
            </div>
            <div className="flex items-center gap-2 flex-1 justify-center">
              <div className="w-[18px] h-[18px] rounded-[4px] bg-accent/30 flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-scale-50">
                  <polyline points="2,8 5,5 9,9 14,4" /><polyline points="2,12 5,9 9,13 14,8" />
                </svg>
              </div>
              <span className="text-[11.5px] font-semibold text-scale-50 tracking-[0.02em]">SynAck Command Center</span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-scale-300">
                <path d="M8 1C5.24 1 3 3.24 3 6v4L1.5 12.5h13L13 10V6C13 3.24 10.76 1 8 1Z" /><path d="M6.5 13.5a1.5 1.5 0 003 0" />
              </svg>
              <div className="flex items-center gap-1.5">
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2 h-2 rounded-full bg-terminal-green flex-shrink-0"
                />
                <span className="text-[10.5px] font-semibold text-terminal-green">Live</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex bg-white">

            {/* Sidebar */}
            <div className="hidden lg:flex flex-col w-[150px] bg-bg-page border-r border-border-light flex-shrink-0">
              <div className="px-4 py-3 border-b border-border-light">
                <p className="text-[8.5px] font-bold tracking-[0.12em] uppercase text-text-muted">Client</p>
                <p className="text-[12px] font-semibold text-text-heading mt-0.5 leading-tight">Acme Corp</p>
              </div>
              <nav className="flex flex-col gap-0.5 p-2 flex-1">
                <div className="flex items-center gap-2.5 px-3 py-[7px] rounded-[6px] bg-primary text-scale-50 cursor-default">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M2 8L8 2L14 8V14H10V10H6V14H2V8Z" /></svg>
                  <span className="text-[11px] font-medium">Overview</span>
                </div>
                {[
                  { label: "Devices",  icon: <><rect x="1" y="2" width="14" height="10" rx="1.5" /><path d="M5 14h6M8 12v2" /></> },
                  { label: "Security", icon: <path d="M8 1L1 4.5V9c0 3.5 3 6 7 7 4-1 7-3.5 7-7V4.5L8 1Z" /> },
                  { label: "Reports",  icon: <><path d="M3 1h8l3 3v11H3V1Z" /><path d="M6 7h5M6 10h4" /></> },
                  { label: "Alerts",   icon: <><path d="M8 1C5.24 1 3 3.24 3 6v4L1.5 12h13L13 10V6C13 3.24 10.76 1 8 1Z" /><path d="M6.5 13.5a1.5 1.5 0 003 0" /></> },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 px-3 py-[7px] rounded-[6px] text-text-muted cursor-default">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">{item.icon}</svg>
                    <span className="text-[11px] font-medium">{item.label}</span>
                  </div>
                ))}
              </nav>
              <div className="px-3 py-2.5 border-t border-border-light">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-[8px] font-black text-white">JD</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-text-heading leading-tight">John D.</p>
                    <p className="text-[8.5px] text-text-muted leading-tight">Admin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col p-4 min-w-0 bg-bg-page">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[13.5px] font-bold text-text-heading leading-tight">System Overview</p>
                  <p className="text-[9px] text-text-muted mt-0.5">
                    May 3, 2026 · Sync{" "}
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={syncSec}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.25 }}
                        className="inline-block"
                      >
                        {syncSec < 60 ? "just now" : `${Math.floor(syncSec / 60)} min ago`}
                      </motion.span>
                    </AnimatePresence>
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-success-bg border border-status-success-border flex-shrink-0 ml-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-success flex-shrink-0" />
                  <span className="text-[9px] font-semibold text-status-success-text whitespace-nowrap">All Systems Healthy</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {/* Endpoints — live */}
                <div className="bg-white border border-border-light rounded-[8px] p-3.5">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[8.5px] font-bold tracking-[0.08em] uppercase text-text-muted leading-tight">Endpoints</p>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={endpoints === 247 ? "full" : "partial"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className={`text-[7.5px] font-bold px-1.5 py-[2px] rounded-full flex-shrink-0 ml-1 whitespace-nowrap ${endpoints === 247 ? "bg-status-success-bg text-status-success-text" : "bg-yellow-50 text-yellow-700"}`}
                      >
                        {endpoints === 247 ? "100%" : "99.6%"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <p className="font-outfit text-[24px] font-black tracking-[-0.03em] leading-none mb-1 text-status-success">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={endpoints}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.25 }}
                        className="inline-block"
                      >
                        {endpoints}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-[12px] font-semibold text-text-muted ml-0.5">/247</span>
                  </p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={endpoints === 247 ? "online" : "reconnecting"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[8.5px] font-medium text-text-muted"
                    >
                      {endpoints === 247 ? "All online" : "1 reconnecting…"}
                    </motion.p>
                  </AnimatePresence>
                </div>
                {/* Static cards */}
                {[
                  { label: "Security Score",  value: "A+", unit: "",  badge: "↑ from B", sub: "Excellent"    },
                  { label: "Incidents Today", value: "0",  unit: "",  badge: "↓ 100%",   sub: "Zero threats" },
                ].map((m) => (
                  <div key={m.label} className="bg-white border border-border-light rounded-[8px] p-3.5">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-[8.5px] font-bold tracking-[0.08em] uppercase text-text-muted leading-tight">{m.label}</p>
                      <span className="text-[7.5px] font-bold px-1.5 py-[2px] rounded-full bg-status-success-bg text-status-success-text flex-shrink-0 ml-1 whitespace-nowrap">{m.badge}</span>
                    </div>
                    <p className="font-outfit text-[24px] font-black tracking-[-0.03em] leading-none mb-1 text-status-success">
                      {m.value}<span className="text-[12px] font-semibold text-text-muted ml-0.5">{m.unit}</span>
                    </p>
                    <p className="text-[8.5px] text-text-muted font-medium">{m.sub}</p>
                  </div>
                ))}
              </div>
              <div className="flex-1 bg-white border border-border-light rounded-[8px] p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[9.5px] font-black tracking-[0.1em] uppercase text-text-heading">System Uptime</p>
                    <p className="text-[8px] text-text-muted mt-0.5">Last 30 days</p>
                  </div>
                  <span className="text-[8px] font-semibold text-status-success bg-status-success-bg border border-status-success-border px-2 py-[3px] rounded-full whitespace-nowrap">99.98% avg</span>
                </div>
                <div className="relative pl-7">
                  <div className="absolute left-0 top-0 flex flex-col justify-between pointer-events-none" style={{ height: 80 }}>
                    {["100%","99%","98%"].map((v) => <span key={v} className="text-[6.5px] text-text-muted leading-none">{v}</span>)}
                  </div>
                  <svg viewBox="0 0 300 72" preserveAspectRatio="none" fill="none" className="w-full" style={{ height: 80 }}>
                    <defs>
                      <linearGradient id="heroUptimeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22A05A" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#22A05A" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    {[24,48].map((y) => <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#B8D4F7" strokeWidth="0.5" strokeDasharray="4,3" />)}
                    <path d="M0,22 C15,22 20,16 35,16 C50,16 55,20 70,18 C85,16 90,10 105,10 C120,10 125,14 140,12 C155,10 160,8 175,8 C190,8 195,12 210,10 C225,8 230,14 245,12 C260,10 265,8 280,10 C295,10 298,12 300,12 L300,72 L0,72 Z" fill="url(#heroUptimeGrad)" />
                    <motion.path
                      d="M0,22 C15,22 20,16 35,16 C50,16 55,20 70,18 C85,16 90,10 105,10 C120,10 125,14 140,12 C155,10 160,8 175,8 C190,8 195,12 210,10 C225,8 230,14 245,12 C260,10 265,8 280,10 C295,10 298,12 300,12"
                      stroke="#22A05A" strokeWidth="2" strokeLinecap="round" fill="none"
                      initial={{ pathLength: 0 }}
                      animate={dashInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 2.2, delay: 1.0, ease: EASE }}
                    />
                    <motion.circle cx="300" cy="12" r="3" fill="#22A05A" stroke="white" strokeWidth="1.5"
                      initial={{ opacity: 0 }}
                      animate={dashInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.4, delay: 3.0 }}
                    />
                  </svg>
                  <div className="flex justify-between mt-1.5">
                    {["Day 1","Day 10","Day 20","Today"].map((d) => (
                      <span key={d} className={`text-[7px] ${d === "Today" ? "text-status-success font-bold" : "text-text-muted"}`}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="hidden lg:flex flex-col w-[175px] border-l border-border-light bg-white flex-shrink-0">
              <div className="px-4 pt-4 pb-3.5 border-b border-border-light">
                <p className="text-[8px] font-bold tracking-[0.12em] uppercase text-text-muted mb-2">SynAck Score</p>
                <div className="flex items-end gap-1.5 mb-2.5">
                  <span className="font-outfit font-black leading-none text-status-success" style={{ fontSize: 34 }}>A+</span>
                  <span className="text-[8.5px] font-semibold text-status-success mb-1">Excellent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-border-light rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-status-success rounded-full"
                      initial={{ width: "0%" }}
                      animate={dashInView ? { width: "98%" } : { width: "0%" }}
                      transition={{ duration: 1.4, delay: 1.2, ease: EASE }}
                    />
                  </div>
                  <span className="text-[8px] font-bold text-status-success flex-shrink-0">98/100</span>
                </div>
              </div>
              <div className="p-3 border-b border-border-light">
                <div className="w-full rounded-[7px] py-2.5 bg-accent flex items-center justify-center gap-1.5 cursor-default">
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M7 1v8M4 6l3 3 3-3" /><path d="M2 11h10" />
                  </svg>
                  <span className="text-[10.5px] font-bold text-white">View Report</span>
                </div>
              </div>
              <div className="p-3 flex-1 overflow-hidden">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[8px] font-bold tracking-[0.1em] uppercase text-text-muted">Activity</p>
                  <span className="text-[8px] font-semibold text-accent cursor-default">See All</span>
                </div>
                <div className="flex flex-col gap-2.5 overflow-hidden">
                  <AnimatePresence initial={false} mode="popLayout">
                    {activities.map((a) => (
                      <motion.div
                        key={a.id}
                        layout
                        initial={{ opacity: 0, x: -12, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0, x: 12, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-start gap-2 flex-shrink-0"
                      >
                        <div className="w-4 h-4 rounded-full bg-status-success-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg width="7" height="7" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-status-success">
                            <polyline points="1.5,5 3.5,7.5 8.5,2" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] font-medium text-text-heading leading-tight">{a.label}</p>
                          <p className="text-[7.5px] text-text-muted">{a.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── Logo marquee ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-[900px] mx-auto mt-10 overflow-hidden"
          style={{ maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)" }}
        >
          <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max">
            {[...logos, ...logos].map((logo, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-[10px] bg-white border border-border-light flex-shrink-0">
                {logo.icon}
                <span className="text-[12px] font-semibold text-text-muted whitespace-nowrap">{logo.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── Stat strip ── */}
      <div className="relative z-10 bg-bg-page/90 backdrop-blur-sm">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            <StatCounter val={650}  suffix="+"   label="Projects Done"       />
            <StatCounter val={25}   suffix="+"   label="Years of Experience" />
            <StatCounter val={99}   suffix="%"   label="Positive Reviews"    />
            <StatCounter val={null} numStatic="24" suffix="/7" label="Monitoring" />
          </div>
        </div>
      </div>

    </section>
  );
}
