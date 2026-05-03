"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type LineType = "cmd" | "header" | "row" | "status" | "blank";

const LINES: { text: string; type: LineType }[] = [
  { text: "> synack-agent v2.1.4",            type: "cmd"    },
  { text: "> connecting to environment...",   type: "cmd"    },
  { text: "",                                 type: "blank"  },
  { text: "ENDPOINTS",                        type: "header" },
  { text: "  Online          247 / 247",      type: "row"    },
  { text: "  Last scan       2 min ago",      type: "row"    },
  { text: "",                                 type: "blank"  },
  { text: "THREATS (24h)",                    type: "header" },
  { text: "  Blocked         14",             type: "row"    },
  { text: "  Critical        0",              type: "row"    },
  { text: "",                                 type: "blank"  },
  { text: "SECURITY",                         type: "header" },
  { text: "  Score           94 / 100",       type: "row"    },
  { text: "  MFA             100%",           type: "row"    },
  { text: "  Patches         98.7%",          type: "row"    },
  { text: "",                                 type: "blank"  },
  { text: "SYSTEMS",                          type: "header" },
  { text: "  M365            ● OPERATIONAL",  type: "status" },
  { text: "  Network         ● OPERATIONAL",  type: "status" },
  { text: "  Backup          ● OPERATIONAL",  type: "status" },
  { text: "  Physical        ● OPERATIONAL",  type: "status" },
];

const LINE_COLOR: Record<LineType, string> = {
  cmd:    "var(--color-terminal-green)",
  header: "var(--color-text-on-dark)",
  row:    "var(--color-border-light)",
  status: "var(--color-terminal-green)",
  blank:  "transparent",
};

export default function TerminalCard() {
  const [typed, setTyped] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    const displayedLines: string[] = [];
    let tid: ReturnType<typeof setTimeout>;

    function tick() {
      if (lineIdx >= LINES.length) {
        setDone(true);
        return;
      }
      const { text, type } = LINES[lineIdx];

      if (charIdx === 0) {
        displayedLines.push("");
        setTyped([...displayedLines]);
      }

      if (charIdx < text.length) {
        displayedLines[displayedLines.length - 1] = text.slice(0, charIdx + 1);
        charIdx++;
        setTyped([...displayedLines]);
        tid = setTimeout(tick, type === "cmd" ? 28 : 12);
      } else {
        charIdx = 0;
        lineIdx++;
        const pause = type === "cmd" ? 100 : type === "blank" ? 20 : 45;
        tid = setTimeout(tick, pause);
      }
    }

    tid = setTimeout(tick, 600);
    return () => clearTimeout(tid);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border overflow-hidden select-none"
      style={{ background: "var(--color-bg-footer)", borderColor: "var(--color-border-dark)" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-[11px] border-b"
        style={{ background: "var(--color-bg-terminal)", borderColor: "var(--color-border-dark)" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: "var(--color-status-error)", opacity: 0.75 }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "var(--color-status-warning)", opacity: 0.75 }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "var(--color-status-success)", opacity: 0.75 }} />
        <span
          className="ml-3 text-[11px] font-medium tracking-[0.1em]"
          style={{ color: "var(--color-border-dark)", fontFamily: "var(--font-jetbrains), monospace" }}
        >
          synack-monitor — bash
        </span>
      </div>

      {/* Body */}
      <div
        className="px-5 py-5 min-h-[420px]"
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "12.5px",
          lineHeight: "1.85",
        }}
      >
        {typed.map((line, i) => {
          const lineType = LINES[i]?.type ?? "row";
          const isLast = i === typed.length - 1;
          return (
            <div key={i} style={{ color: LINE_COLOR[lineType], minHeight: "1.85em" }}>
              {line}
              {isLast && !done && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                  style={{ color: "var(--color-terminal-green)" }}
                >
                  ▋
                </motion.span>
              )}
            </div>
          );
        })}
        {done && (
          <div>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              style={{ color: "var(--color-terminal-green)" }}
            >
              ▋
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
