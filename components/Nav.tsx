"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX, IconArrowRight } from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const DUR = 0.4;

const links = [
  { href: "/",           label: "Home"       },
  { href: "/industries", label: "Industries" },
  { href: "/services",   label: "Services"   },
  { href: "/about",      label: "About"      },
  { href: "/contact",    label: "Contact"    },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <motion.nav
      className="fixed z-50 left-0 right-0 flex justify-center"
      animate={{
        top:          scrolled ? 0  : 14,
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
          backdropFilter:       scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        }}
        animate={{
          borderRadius:    scrolled ? 0 : 16,
          maxWidth:        scrolled ? 9999 : 1120,
          backgroundColor: scrolled
            ? "rgba(248,250,253,0.96)"
            : "rgba(255,255,255,0)",
          borderColor: scrolled
            ? "rgba(184,212,247,0.45)"
            : "rgba(255,255,255,0)",
          boxShadow: scrolled
            ? "0 1px 0 rgba(184,212,247,0.50), 0 2px 16px rgba(16,35,71,.05)"
            : "none",
        }}
        transition={{ duration: DUR, ease: EASE }}
      >
        {/* Top gloss edge */}
        {scrolled && (
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none z-10"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.95) 80%, transparent 100%)",
            }}
          />
        )}

        {/* Main bar */}
        <motion.div
          className="h-16 flex items-center justify-between"
          animate={{
            paddingLeft:  scrolled ? 56 : 22,
            paddingRight: scrolled ? 56 : 22,
          }}
          transition={{ duration: DUR, ease: EASE }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src="/logo.svg"
              alt="SynAck Solutions"
              width={36}
              height={36}
              className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-none gap-[5px]">
              <span className="font-outfit text-[14px] font-black tracking-[0.09em] text-primary">
                SYNACK
              </span>
              <span className="text-[9.5px] font-semibold tracking-[0.16em] uppercase text-accent">
                Solutions
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-0.5">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`relative flex items-center px-3.5 py-[7px] text-nav font-medium transition-colors duration-150 ${
                      active
                        ? "text-primary"
                        : "text-text-muted hover:text-primary"
                    }`}
                  >
                    {l.label}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-accent" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-[7px] flex-shrink-0 group font-sans text-[13.5px] font-bold leading-none text-[#EAF2FC] bg-primary px-5 py-[10px] rounded-[10px] border border-primary transition-all duration-150 hover:bg-accent hover:border-accent hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(36,114,200,0.28)]"
          >
            Get Started
            <IconArrowRight size={13} stroke={2.5} className="transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-[9px] text-primary transition-colors hover:bg-primary/[0.06]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  <IconX size={20} stroke={2} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate:  45, opacity: 0 }}
                  animate={{ rotate:  0,  opacity: 1 }}
                  exit={{   rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  <IconMenu2 size={20} stroke={2} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{   height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="md:hidden overflow-hidden"
            >
              <div
                className="px-3 pb-4 pt-1 flex flex-col gap-0.5"
                style={{ borderTop: "1px solid rgba(184,212,247,0.35)" }}
              >
                {links.map((l) => {
                  const active = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-3 rounded-[9px] text-[15px] font-medium transition-colors ${
                        active
                          ? "text-primary"
                          : "text-text-muted hover:text-primary"
                      }`}
                    >
                      {active && (
                        <span className="w-[3px] h-4 rounded-full bg-accent flex-shrink-0" />
                      )}
                      {!active && (
                        <span className="w-[3px] h-4 flex-shrink-0" />
                      )}
                      {l.label}
                    </Link>
                  );
                })}

                <div
                  className="pt-3 mt-1.5"
                  style={{ borderTop: "1px solid rgba(184,212,247,0.25)" }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full text-[14px] font-bold text-[#EAF2FC] bg-primary px-5 py-3 rounded-[10px] transition-colors hover:bg-accent"
                  >
                    Get Started
                    <IconArrowRight size={14} stroke={2.5} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
}
