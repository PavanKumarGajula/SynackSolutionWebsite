import Eyebrow from "@/components/Eyebrow";
import CtaSection from "@/components/CtaSection";
import FadeUp from "@/components/FadeUp";

const services = [
  { num:"01", name:"Managed IT & Help Desk",         desc:"Full ownership of your environment. Proactive monitoring, endpoint management, identity & access control, onboarding/offboarding runbooks, monthly stability reviews." },
  { num:"02", name:"Cybersecurity",                   desc:"Identity-first protection — MFA, conditional access, email security, endpoint hardening, EDR, incident response planning. Security built in from day one." },
  { num:"03", name:"Cloud & Microsoft 365",           desc:"Tenant governance, SharePoint & OneDrive structure, Teams management, Azure, M365 compliance policies, migrations. Fully owned and documented." },
  { num:"04", name:"Network Infrastructure",          desc:"Wi-Fi design, Cisco firewall management, switching, VPN, network segmentation, full topology documentation. Every connection mapped." },
  { num:"05", name:"IT Strategy & vCIO",              desc:"IT roadmaps, budget planning, vendor management, vCIO-level advisory. We define the path. We don't ask the client what to do." },
  { num:"06", name:"IT Asset Procurement",            desc:"Hardware sourcing, staging & enrollment via MDM/Intune, asset tagging, lifecycle tracking, secure wipe and disposal. Every device accounted for." },
  { num:"07", name:"Physical Security",               desc:"Camera systems via Rhombus, badge access via Brivo — role-based permissions, joiners/movers/leavers, full audit logs, multi-site visibility." },
  { num:"08", name:"Security Awareness Training",     desc:"Phishing simulations, role-based training, password hygiene, reporting culture. Employees become the first line of defence — not the weakest link." },
  { num:"09", name:"Backup & Disaster Recovery",      desc:"Backup monitoring, restore validation, recovery time objectives, ransomware recovery playbooks, business continuity planning. Tested. Validated. Ready." },
  { num:"10", name:"Audio/Visual & Conference Rooms", desc:"Screens, cameras, conferencing hardware — installed, configured, and managed. Microsoft Teams Rooms, Zoom Rooms, multi-site AV support." },
];

const tech = [
  { cat:"Microsoft Ecosystem",   items:["Microsoft 365","Azure","Intune","Defender","Entra ID","SharePoint","Teams","Exchange Online"] },
  { cat:"Networking & Security", items:["Cisco","NinjaRMM","Rhombus","Brivo"] },
  { cat:"Device Management",     items:["Apple Business Manager","Microsoft Intune MDM"] },
];

export default function Services() {
  return (
    <main className="pt-[68px]">
      {/* Hero */}
      <section className="relative bg-bg-page pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-page to-transparent pointer-events-none" />
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-10">
          <FadeUp><Eyebrow>What We Do</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-outfit text-[clamp(32px,5vw,60px)] font-black tracking-[-0.04em] leading-[1.04] text-text-heading max-w-[20ch] mb-5">
              From the laptop on your desk to the camera at your door. Everything.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-[17px] text-text-muted leading-[1.75] max-w-[52ch]">
              Ten services. Three areas. One invoice. One accountable partner.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-bg-section py-20">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-bg-page to-transparent pointer-events-none" />
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <FadeUp><Eyebrow>Ten Services. One Owner.</Eyebrow></FadeUp>
          <div className="mt-10 grid md:grid-cols-2 gap-3">
            {services.map((s,i) => (
              <FadeUp key={s.num} delay={i*0.04}>
                <div className="flex items-start gap-5 px-6 py-6 bg-bg-card border border-border-light rounded-xl hover:bg-white hover:border-accent hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/10 transition-all duration-150">
                  <span className="font-outfit text-[11px] font-black text-accent tracking-[0.08em] flex-shrink-0 pt-1">{s.num}</span>
                  <div>
                    <p className="font-outfit text-[15px] font-bold text-text-heading mb-2">{s.name}</p>
                    <p className="text-[13.5px] text-text-muted leading-[1.65]">{s.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-bg-page py-20">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <FadeUp>
            <Eyebrow>Technology We Work With</Eyebrow>
            <h2 className="font-outfit text-[clamp(26px,3.5vw,40px)] font-black tracking-[-0.03em] text-text-heading mb-10">The platforms we use every day.</h2>
          </FadeUp>
          <div className="flex flex-col gap-8">
            {tech.map((t,i) => (
              <FadeUp key={t.cat} delay={i*0.1}>
                <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-text-muted mb-3">{t.cat}</p>
                <div className="flex flex-wrap gap-2">
                  {t.items.map(item => (
                    <span key={item} className="px-4 py-2 bg-bg-card border border-border-light rounded-full font-outfit text-[13px] font-semibold text-text-heading">
                      {item}
                    </span>
                  ))}
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
