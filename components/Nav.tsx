"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const DUR  = 0.45;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/",           label: "Home"       },
    { href: "/industries", label: "Industries" },
    { href: "/services",   label: "Services"   },
    { href: "/about",      label: "About"      },
    { href: "/contact",    label: "Contact"    },
  ];

  return (
    <motion.nav
      className="fixed z-50 left-0 right-0 flex justify-center"
      animate={{
        top:          scrolled ? 0  : 16,
        paddingLeft:  scrolled ? 0  : 16,
        paddingRight: scrolled ? 0  : 16,
      }}
      transition={{ duration: DUR, ease: EASE }}
    >
      <motion.div
        className="relative w-full overflow-hidden"
        style={{
          borderStyle:          "solid",
          borderWidth:          1,
          backdropFilter:       "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        animate={{
          borderRadius:    scrolled ? 0    : 16,
          maxWidth:        scrolled ? 9999 : 1100,
          backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.62)",
          borderColor:     scrolled ? "rgba(255,255,255,0.60)" : "rgba(255,255,255,0.30)",
          boxShadow:       scrolled
            ? "0 1px 3px rgba(0,0,0,0.07)"
            : "0 4px 20px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.04)",
        }}
        transition={{ duration: DUR, ease: EASE }}
      >
        {/* Top gloss edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

        <motion.div
          className="h-[60px] flex items-center justify-between"
          animate={{
            paddingLeft:  scrolled ? 64 : 20,
            paddingRight: scrolled ? 64 : 20,
          }}
          transition={{ duration: DUR, ease: EASE }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <img src="/logo.svg" alt="SynAck Solutions" width={34} height={34} className="flex-shrink-0" />
            <div className="flex flex-col leading-none gap-0.5">
              <span className="font-outfit text-[13.5px] font-black tracking-[0.08em] text-primary">SYNACK</span>
              <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-accent">Solutions</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-[13.5px] font-medium tracking-[0.01em] transition-colors ${
                    pathname === l.href
                      ? "text-primary font-semibold"
                      : "text-text-muted hover:text-primary"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link href="/contact" className="hidden md:inline-flex btn-nav flex-shrink-0">
            Contact Us
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <IconX size={20} stroke={2} /> : <IconMenu2 size={20} stroke={2} />}
          </button>
        </motion.div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/60 px-5 py-4 flex flex-col gap-4 bg-white/40 backdrop-blur-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-[16px] font-medium text-text-body hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary w-full justify-center"
            >
              Contact Us
            </Link>
          </div>
        )}
      </motion.div>
    </motion.nav>
  );
}
