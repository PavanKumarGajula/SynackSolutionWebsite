"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/",            label: "Home"       },
    { href: "/industries",  label: "Industries" },
    { href: "/services",    label: "Services"   },
    { href: "/about",       label: "About"      },
    { href: "/contact",     label: "Contact"    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl border-white/60 shadow-sm shadow-black/[0.06]"
          : "bg-white/40 backdrop-blur-lg border-white/30"
      }`}
    >
      {/* Top highlight — glass edge reflection */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
      <div className="max-w-site mx-auto px-5 lg:px-10 h-[68px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img src="/logo.svg" alt="SynAck Solutions" width={38} height={38} className="flex-shrink-0" />
          <div className="flex flex-col leading-none gap-0.5">
            <span className="font-outfit text-[13px] font-black tracking-[0.08em] text-primary">SYNACK</span>
            <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-accent">Solutions</span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-[14px] font-medium tracking-[0.01em] transition-colors ${
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
        <Link
          href="/contact"
          className="hidden md:inline-flex btn-nav"
        >
          Contact Us
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-xl border-t border-white/60 px-5 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-[15px] font-medium text-text-body hover:text-primary transition-colors"
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
    </nav>
  );
}
