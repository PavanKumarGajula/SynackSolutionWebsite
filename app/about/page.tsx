import Eyebrow from "@/components/Eyebrow";
import CtaSection from "@/components/CtaSection";
import FadeUp from "@/components/FadeUp";

const team = [
  { initials:"MK", name:"Mazhar Kapadia",  title:"Chief Executive Officer", bio:"Built SynAck on the belief that IT without full ownership is unacceptable. Final authority on all brand, strategic, and client decisions. Brand Guardian." },
  { initials:"US", name:"Umar Saleem",     title:"Chief Information Officer", bio:"Responsible for information strategy, technology standards, and the structure of SynAck's internal and client-facing IT systems." },
  { initials:"TM", name:"Taha Mohammed",   title:"Chief Technology Officer", bio:"Leads the technical direction of SynAck's service delivery — the platforms, tools, and engineering practices that make full ownership possible." },
];

const beliefs = [
  { quote:"We don't ask you to explain your IT. We explain it to you.",              sub:"Before being hired, we map your environment. You see what we see. That's the first moment you feel the difference." },
  { quote:"This isn't an IT problem. It's an ownership problem.",                    sub:"The environment was broken before we arrived. No one owned how it worked together. That's what we fix." },
  { quote:"Control without thinking about it.",                                      sub:"The goal isn't fast response. It's a system that doesn't need you involved. That's what ownership looks like." },
];

export default function About() {
  return (
    <main className="pt-[68px]">
      {/* Hero */}
      <section className="relative bg-bg-page pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-page to-transparent pointer-events-none" />
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-10">
          <FadeUp><Eyebrow>Who We Are</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-outfit text-[clamp(32px,5vw,60px)] font-black tracking-[-0.04em] leading-[1.04] text-text-heading max-w-[22ch] mb-5">
              An engineering-first company where technology is understood at its foundation.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-[17px] text-text-muted leading-[1.75] max-w-[46ch]">Not treated as a black box.</p>
          </FadeUp>
        </div>
      </section>

      {/* Origin */}
      <section className="bg-bg-section py-20">
        <div className="max-w-site mx-auto px-5 lg:px-10 grid md:grid-cols-2 gap-16 items-start">
          <FadeUp>
            <Eyebrow>The Name</Eyebrow>
            <h2 className="font-outfit text-[clamp(24px,3vw,36px)] font-black tracking-[-0.025em] text-text-heading mb-5">Why SynAck.</h2>
            <div className="space-y-4 text-[15px] text-text-muted leading-[1.8]">
              <p>SynAck comes from the TCP three-way handshake — <strong className="text-text-heading font-bold">SYN → SYN-ACK → ACK.</strong> The fundamental sequence that establishes every secure connection on the internet.</p>
              <p>It reflects exactly who we are: an engineering-first company where technology is understood at its foundation — not treated as a black box.</p>
              <p>When you connect with SynAck, ownership is established. Control is transferred. Everything that follows is structured, documented, and secure.</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <Eyebrow>Why We Started</Eyebrow>
            <h2 className="font-outfit text-[clamp(24px,3vw,36px)] font-black tracking-[-0.025em] text-text-heading mb-5">The founding anger.</h2>
            <div className="bg-primary rounded-xl px-6 py-6 mb-5">
              <p className="font-outfit text-[15px] font-bold text-text-heading-on-dark leading-[1.6]">
                The IT industry normalized negligence. Patch it, bill it, say nothing. Businesses running one failure away from collapse — while the people responsible stayed comfortable and silent.
              </p>
            </div>
            <p className="text-[15px] text-text-muted leading-[1.8]">SynAck exists because someone saw that — and couldn't look away. IT without full ownership is not just bad service. It is unacceptable.</p>
          </FadeUp>
        </div>
      </section>

      {/* Beliefs */}
      <section className="bg-bg-page py-20">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <FadeUp>
            <Eyebrow>The Philosophy</Eyebrow>
            <h2 className="font-outfit text-[clamp(26px,3.5vw,40px)] font-black tracking-[-0.03em] text-text-heading mb-10">Three things we believe.</h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-4">
            {beliefs.map((b,i) => (
              <FadeUp key={i} delay={i*0.1}>
                <div className="px-6 py-6 bg-bg-card border border-border-light rounded-xl h-full">
                  <p className="font-outfit text-[15px] font-bold text-text-heading leading-[1.45] mb-4 italic">&ldquo;{b.quote}&rdquo;</p>
                  <p className="text-[13px] text-text-muted leading-[1.65]">{b.sub}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-bg-section py-20">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <FadeUp>
            <Eyebrow>The Team</Eyebrow>
            <h2 className="font-outfit text-[clamp(26px,3.5vw,40px)] font-black tracking-[-0.03em] text-text-heading mb-10">Run by engineers. Not salespeople.</h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-4">
            {team.map((m,i) => (
              <FadeUp key={m.name} delay={i*0.1}>
                <div className="px-6 py-8 bg-bg-card border border-border-light rounded-xl text-center">
                  <div className="w-14 h-14 rounded-full bg-primary border-2 border-accent/30 flex items-center justify-center mx-auto mb-4">
                    <span className="font-outfit text-[16px] font-black text-accent">{m.initials}</span>
                  </div>
                  <p className="font-outfit text-[15px] font-bold text-text-heading mb-1">{m.name}</p>
                  <p className="text-[11px] font-bold tracking-[0.06em] uppercase text-accent mb-4">{m.title}</p>
                  <p className="text-[13px] text-text-muted leading-[1.6] text-left">{m.bio}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
