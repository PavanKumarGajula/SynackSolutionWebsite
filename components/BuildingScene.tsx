import {
  Video, Cloud, TrendingUp, Database, GraduationCap,
  ShieldCheck, MonitorCheck, Package, Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Floor {
  num: string;
  Icon: LucideIcon;
  name: string;
  lit: [boolean, boolean, boolean];
  featured?: boolean;
}

const FLOORS: Floor[] = [
  { num: "10", Icon: TrendingUp,    name: "IT Strategy & vCIO",        lit: [true,  false, true]  },
  { num: "09", Icon: Video,         name: "AV & Conferencing",          lit: [false, true,  false] },
  { num: "08", Icon: Cloud,         name: "Microsoft 365 & Cloud",      lit: [true,  true,  false] },
  { num: "07", Icon: Database,      name: "Backup & Disaster Recovery", lit: [false, true,  true]  },
  { num: "06", Icon: GraduationCap, name: "Security Training",          lit: [true,  false, false] },
  { num: "05", Icon: ShieldCheck,   name: "Cybersecurity",              lit: [true,  true,  true]  },
  { num: "04", Icon: MonitorCheck,  name: "Managed IT & Help Desk",     lit: [true,  true,  true], featured: true },
  { num: "03", Icon: Package,       name: "IT Asset Procurement",       lit: [false, true,  false] },
  { num: "02", Icon: Lock,          name: "Physical Security",          lit: [true,  false, true]  },
];

// Positioned relative to building-wrap; floors are 50px each, roof 42px
const ANNOTATIONS = [
  { label: "Strategy", style: { top: 68  }, delay: "1.2s" },
  { label: "Security", style: { top: 268 }, delay: "1.45s" },
  { label: "Physical", style: { bottom: 48 }, delay: "1.7s" },
];

export default function BuildingScene() {
  return (
    <div
      className="relative flex items-end justify-center select-none overflow-visible"
      style={{ height: 620 }}
      aria-hidden="true"
    >

      {/* ── Atmospheric sky glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 20, right: 30, width: 220, height: 220, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(36,114,200,.13) 0%, rgba(36,114,200,.04) 40%, transparent 70%)",
          animation: "b-hover 5s ease-in-out infinite",
          filter: "blur(8px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: 60, left: 10, width: 140, height: 140, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,35,71,.05) 0%, transparent 65%)",
          animation: "b-hover 6s ease-in-out infinite reverse",
          filter: "blur(6px)",
        }}
      />

      {/* ── Subtle cloud shapes ── */}
      <div className="absolute rounded-full pointer-events-none"
        style={{ top: 72, left: 18, width: 88, height: 22,
          background: "rgba(255,255,255,.6)",
          boxShadow: "0 2px 12px rgba(36,114,200,.08)",
          animation: "b-drift 9s ease-in-out infinite" }} />
      <div className="absolute rounded-full pointer-events-none"
        style={{ top: 118, right: 160, width: 56, height: 16,
          background: "rgba(255,255,255,.5)",
          boxShadow: "0 2px 8px rgba(36,114,200,.06)",
          animation: "b-drift 12s ease-in-out infinite reverse" }} />

      {/* ── Camera / outside badge ── */}
      <div
        className="absolute flex items-center gap-3 z-10 rounded-2xl"
        style={{
          top: 48, left: 14,
          padding: "11px 16px",
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(36,114,200,.22)",
          boxShadow: "0 2px 4px rgba(16,35,71,.04), 0 8px 20px rgba(16,35,71,.10), 0 20px 48px rgba(36,114,200,.10)",
          animation: "b-hover 3.2s ease-in-out infinite",
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #2472C8 0%, #1A5FA0 100%)", boxShadow: "0 4px 12px rgba(36,114,200,.35)" }}
        >
          <Video size={16} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[8.5px] font-black tracking-[.14em] uppercase mb-0.5" style={{ color: "#2472C8" }}>Outside</p>
          <p className="text-[13px] font-bold leading-tight" style={{ color: "#0A1628" }}>Cameras + Access</p>
        </div>
        <span className="absolute pointer-events-none" style={{
          bottom: -18, right: 28, width: 1.5, height: 18,
          background: "linear-gradient(to bottom, rgba(36,114,200,.6), transparent)",
        }} />
      </div>

      {/* ── M365 cloud badge ── */}
      <div
        className="absolute flex items-center gap-3 z-10 rounded-2xl"
        style={{
          top: 22, right: 18,
          padding: "11px 16px",
          background: "linear-gradient(135deg, #102347 0%, #1A3A6B 100%)",
          border: "1px solid rgba(36,114,200,.25)",
          boxShadow: "0 2px 4px rgba(16,35,71,.06), 0 8px 24px rgba(16,35,71,.22), 0 24px 48px rgba(16,35,71,.16)",
          animation: "b-hover 3.8s ease-in-out infinite",
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, rgba(36,114,200,.35) 0%, rgba(36,114,200,.15) 100%)", border: "1px solid rgba(36,114,200,.3)" }}
        >
          <Cloud size={16} color="#7AB4EE" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[8.5px] font-black tracking-[.14em] uppercase mb-0.5" style={{ color: "#7AB4EE" }}>In the cloud</p>
          <p className="text-[13px] font-bold leading-tight" style={{ color: "#EAF2FC" }}>M365 Tenant</p>
        </div>
        <span className="absolute pointer-events-none" style={{
          bottom: -16, left: 28, width: 1.5, height: 16,
          background: "linear-gradient(to bottom, rgba(36,114,200,.6), transparent)",
        }} />
      </div>

      {/* ── WiFi arcs ── */}
      <div
        className="absolute pointer-events-none z-[4]"
        style={{ top: 86, left: "50%", transform: "translateX(-50%)", width: 72, height: 36 }}
      >
        {[
          { w: 68, h: 34, delay: "0.4s", opacity: 0.22 },
          { w: 40, h: 20, delay: "0.2s", opacity: 0.45 },
          { w: 18, h:  9, delay: "0s",   opacity: 0.80 },
        ].map(({ w, h, delay, opacity }, i) => (
          <div key={i} className="absolute" style={{
            bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: w, height: h,
            border: `1.5px solid rgba(36,114,200,${opacity})`,
            borderBottom: "none",
            borderRadius: "50% 50% 0 0",
            animation: `b-wifi 2s ease-in-out infinite ${delay}`,
          }} />
        ))}
      </div>

      {/* ── Building wrapper ── */}
      <div className="relative z-[3]" style={{ width: 372 }}>

        {/* Building card */}
        <div
          className="w-full overflow-hidden"
          style={{
            borderRadius: "14px 14px 4px 4px",
            boxShadow: [
              "0 0 0 1px rgba(36,114,200,.14)",
              "0 2px 4px rgba(16,35,71,.04)",
              "0 8px 24px rgba(16,35,71,.09)",
              "0 28px 56px rgba(16,35,71,.13)",
              "0 56px 96px rgba(16,35,71,.09)",
            ].join(", "),
          }}
        >

          {/* ── Roof ── */}
          <div
            className="relative"
            style={{
              height: 42,
              background: "linear-gradient(180deg, #0C1D3B 0%, #102347 60%, #1A3A6B 100%)",
              borderBottom: "2px solid rgba(36,114,200,.7)",
            }}
          >
            {/* Accent top strip */}
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(to right, transparent, #2472C8 30%, #2472C8 70%, transparent)" }} />

            {/* Antenna */}
            <div
              className="absolute"
              style={{ top: -26, left: "50%", transform: "translateX(-50%)", width: 2, height: 26, background: "linear-gradient(to bottom, #1E4D8C, #0C1D3B)" }}
            >
              <div className="absolute rounded-full" style={{
                top: -5, left: -3.5, width: 9, height: 9,
                background: "#2472C8",
                boxShadow: "0 0 10px rgba(36,114,200,.9), 0 0 20px rgba(36,114,200,.4)",
                animation: "b-blink 1.6s ease-in-out infinite",
              }} />
            </div>

            {/* Roof equipment */}
            <div className="absolute bottom-[6px]" style={{ left: 20, width: 30, height: 16, background: "linear-gradient(135deg, #2472C8 0%, #1A5FA0 100%)", borderRadius: 3, boxShadow: "0 2px 6px rgba(36,114,200,.3)" }} />
            <div className="absolute bottom-[5px] rounded-full" style={{ right: 20, width: 18, height: 18, background: "linear-gradient(135deg, #7AB4EE 0%, #5B9BD5 100%)", boxShadow: "0 2px 6px rgba(122,180,238,.3)" }} />
            <div className="absolute bottom-[8px]" style={{ right: 46, width: 10, height: 10, background: "rgba(36,114,200,.35)", borderRadius: 2, border: "1px solid rgba(36,114,200,.4)" }} />
          </div>

          {/* ── Floors ── */}
          {FLOORS.map((floor) => {
            const { num, Icon, name, lit, featured } = floor;
            return (
              <div key={num} className="relative group">
                {/* Featured floor ambient glow */}
                {featured && (
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: "radial-gradient(ellipse 70% 120% at 30% 50%, rgba(36,114,200,.18) 0%, transparent 70%)",
                    zIndex: 0,
                  }} />
                )}

                <div
                  className="flex items-center justify-between gap-3 relative"
                  style={{
                    height: 50,
                    paddingLeft: 0,
                    paddingRight: 16,
                    borderBottom: `1px solid ${featured ? "rgba(36,114,200,.2)" : "rgba(184,212,247,.5)"}`,
                    background: featured
                      ? "linear-gradient(135deg, #0E2040 0%, #102347 50%, #162E58 100%)"
                      : "linear-gradient(180deg, #FFFFFF 0%, #F6FAFF 100%)",
                    cursor: "default",
                    zIndex: 1,
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 flex-shrink-0"
                    style={{
                      width: 3,
                      background: featured
                        ? "linear-gradient(to bottom, #3D8FE0, #2472C8)"
                        : "linear-gradient(to bottom, rgba(36,114,200,.12), rgba(36,114,200,.06))",
                      boxShadow: featured ? "2px 0 8px rgba(36,114,200,.3)" : "none",
                    }}
                  />

                  {/* Content */}
                  <div className="flex items-center gap-2.5 min-w-0 pl-[14px]">
                    {/* Floor number */}
                    <span
                      className="font-outfit text-[10px] font-black tracking-[.06em] w-[18px] flex-shrink-0"
                      style={{ color: featured ? "rgba(36,114,200,.9)" : "rgba(184,212,247,.7)" }}
                    >
                      {num}
                    </span>

                    {/* Icon */}
                    <div
                      className="flex items-center justify-center flex-shrink-0 rounded-[8px]"
                      style={{
                        width: 28, height: 28,
                        background: featured
                          ? "linear-gradient(135deg, rgba(36,114,200,.35) 0%, rgba(36,114,200,.18) 100%)"
                          : "linear-gradient(135deg, #EAF2FC 0%, #DCEFfA 100%)",
                        border: `1px solid ${featured ? "rgba(36,114,200,.35)" : "rgba(184,212,247,.8)"}`,
                        boxShadow: featured ? "inset 0 1px 0 rgba(122,180,238,.2)" : "inset 0 1px 0 rgba(255,255,255,.8)",
                      }}
                    >
                      <Icon size={13} color={featured ? "#7AB4EE" : "#2472C8"} strokeWidth={2} />
                    </div>

                    {/* Name */}
                    <span
                      className="font-outfit text-[12px] font-bold tracking-[-0.01em] truncate"
                      style={{ color: featured ? "#EAF2FC" : "#0A1628" }}
                    >
                      {name}
                    </span>
                  </div>

                  {/* Window indicators */}
                  <div className="flex gap-[5px] flex-shrink-0">
                    {lit.map((on, i) => (
                      <div
                        key={i}
                        style={{
                          width: 7, height: 9,
                          borderRadius: 2,
                          background: on
                            ? featured
                              ? "linear-gradient(180deg, rgba(61,143,224,.9) 0%, rgba(36,114,200,.7) 100%)"
                              : "linear-gradient(180deg, rgba(61,143,224,.65) 0%, rgba(36,114,200,.5) 100%)"
                            : featured
                              ? "rgba(255,255,255,.08)"
                              : "rgba(184,212,247,.3)",
                          boxShadow: on ? `0 0 5px rgba(36,114,200,${featured ? .55 : .35})` : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* ── Foundation ── */}
          <div
            className="relative flex items-center justify-center"
            style={{
              height: 24,
              background: "linear-gradient(180deg, #1A3A6B 0%, #0C1D3B 100%)",
              borderBottom: "2.5px solid #2472C8",
              boxShadow: "0 3px 12px rgba(36,114,200,.2)",
            }}
          >
            <span
              className="font-outfit text-[8px] font-black tracking-[.16em] uppercase"
              style={{ color: "rgba(122,180,238,.85)" }}
            >
              ↯ Network Infrastructure
            </span>
          </div>

        </div>{/* /building card */}

        {/* ── Annotations ── */}
        {ANNOTATIONS.map(({ label, style: pos, delay }) => (
          <div
            key={label}
            className="absolute flex items-center gap-2 pointer-events-none"
            style={{ ...pos, right: -16, opacity: 0, animation: `b-fadein .5s ease ${delay} forwards` }}
          >
            <div
              className="w-[5px] h-[5px] rounded-full flex-shrink-0"
              style={{ background: "#2472C8", boxShadow: "0 0 6px rgba(36,114,200,.6)" }}
            />
            <div className="flex-shrink-0" style={{ width: 24, height: 1, background: "linear-gradient(to right, #2472C8, rgba(36,114,200,.4))" }} />
            <span
              className="text-[10px] font-bold tracking-[.07em] uppercase px-2.5 py-1 rounded-md"
              style={{
                background: "rgba(255,255,255,.95)",
                border: "1px solid rgba(184,212,247,.8)",
                color: "#1E4D8C",
                boxShadow: "0 2px 8px rgba(16,35,71,.08)",
                backdropFilter: "blur(8px)",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          </div>
        ))}

        {/* ── Network cable ── */}
        <div className="absolute" style={{ bottom: -2, left: -52, width: 82, height: 1.5, background: "linear-gradient(to left, #2472C8, rgba(36,114,200,.3))", zIndex: 2 }} />
        <div
          className="absolute border-[2px] border-white rounded-full"
          style={{ bottom: -7, left: -58, width: 14, height: 14, background: "#2472C8", zIndex: 2, boxShadow: "0 0 12px rgba(36,114,200,.55), 0 0 4px rgba(36,114,200,.8)" }}
        />
        <span
          className="absolute font-black tracking-[.12em] uppercase"
          style={{ bottom: -26, left: -92, fontSize: 8, color: "rgba(36,114,200,.7)", whiteSpace: "nowrap" }}
        >
          ↙ Network
        </span>

        {/* ── Ground shadow ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: -12, left: "50%", transform: "translateX(-50%)",
            width: "100%", height: 24, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(16,35,71,.28) 0%, transparent 68%)",
            filter: "blur(4px)",
          }}
        />

      </div>
    </div>
  );
}
