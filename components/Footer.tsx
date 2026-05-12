"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconMail, IconPhone } from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const pages = [
  { href: "/",         label: "Home"    },
  { href: "/services", label: "Services"},
  { href: "/about",    label: "About"   },
  { href: "/contact",  label: "Contact" },
];

const services = [
  "Managed IT", "Cybersecurity", "Microsoft 365",
  "Network", "Physical Security", "Backup & DR",
];

const contact = [
  { val: "(858) 429-3000",              href: "tel:8584293000" },
  { val: "(888) 563-9132",              href: "tel:8885639132" },
  { val: "sales@synacksolutions.com",   href: "mailto:sales@synacksolutions.com" },
  { val: "support@synacksolutions.com", href: "mailto:support@synacksolutions.com" },
  { val: "synacksolutions.com",         href: "https://synacksolutions.com" },
];

const regions = ["New York", "New Jersey", "Maryland", "Minnesota"];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer ref={ref} className="bg-bg-footer" style={{ borderTop: "1px solid rgba(184,212,247,.06)" }}>
      <div className="max-w-site mx-auto px-5 lg:px-10 pt-[72px]">

        {/* Top grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 pb-14"
          style={{ borderBottom: "1px solid rgba(184,212,247,.08)" }}
        >

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0, ease: EASE }}
          >
            <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit group">
              <img src="/logo.svg" alt="SynAck Solutions" width={42} height={42} className="flex-shrink-0" />
              <div>
                <span className="block font-outfit text-[13.5px] font-black tracking-[0.09em] text-text-heading-on-dark">SYNACK</span>
                <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-accent mt-0.5">Solutions</span>
              </div>
            </Link>

            <p className="text-[13.5px] leading-[1.7] max-w-[28ch] mb-5 text-text-on-dark/60">
              Your Complete IT Partner. Secure by Design. Maryland, USA.
            </p>

            {/* Social */}
            <div className="flex gap-2">
              <a
                href="https://www.linkedin.com/company/synacksolutions"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center transition-colors duration-150 bg-white/[0.04] hover:bg-accent/[0.15] border border-border-light/10 hover:border-accent/30"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(122,180,238,1)">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:sales@synacksolutions.com"
                aria-label="Email"
                className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center transition-colors duration-150 bg-white/[0.04] hover:bg-accent/[0.15] border border-border-light/10 hover:border-accent/30 text-[rgba(122,180,238,1)]"
              >
                <IconMail size={15} stroke={2} />
              </a>
              <a
                href="tel:8584293000"
                aria-label="Phone"
                className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center transition-colors duration-150 bg-white/[0.04] hover:bg-accent/[0.15] border border-border-light/10 hover:border-accent/30 text-[rgba(122,180,238,1)]"
              >
                <IconPhone size={15} stroke={2} />
              </a>
            </div>
          </motion.div>

          {/* Pages */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase mb-[18px] text-text-on-dark/40">Pages</p>
            <div className="flex flex-col gap-2.5">
              {pages.map((p) => (
                <Link
                  key={p.label}
                  href={p.href}
                  className="text-[13.5px] font-medium text-text-on-dark/65 hover:text-text-heading-on-dark transition-colors duration-150"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          >
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase mb-[18px] text-text-on-dark/40">Services</p>
            <div className="flex flex-col gap-2.5">
              {services.map((s) => (
                <Link
                  key={s}
                  href="/services"
                  className="text-[13.5px] font-medium text-text-on-dark/65 hover:text-text-heading-on-dark transition-colors duration-150"
                >
                  {s}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
          >
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase mb-[18px] text-text-on-dark/40">Contact</p>
            <div className="flex flex-col gap-2.5">
              {contact.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  className="text-[13.5px] font-medium text-text-on-dark/65 hover:text-text-heading-on-dark transition-colors duration-150"
                >
                  {c.val}
                </a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Bottom */}
        <motion.div
          className="py-6 flex items-center justify-between gap-5 flex-wrap"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        >
          <p className="text-[12.5px] text-text-on-dark/35">
            © 2024 SynAck Solutions LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[12.5px] text-text-on-dark/35">
            {regions.map((r, i) => (
              <span key={r} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="w-[3px] h-[3px] rounded-full bg-text-on-dark/25 flex-shrink-0" />
                )}
                {r}
              </span>
            ))}
            <span className="flex items-center gap-2">
              <span className="w-[3px] h-[3px] rounded-full bg-text-on-dark/25 flex-shrink-0" />
              and expanding
            </span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
