"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Phone, Mail, MapPin, Globe } from "lucide-react";
import FadeUp from "@/components/FadeUp";
import Eyebrow from "@/components/Eyebrow";

type FormData = { name:string; company:string; email:string; phone:string; message:string; source:string; };

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (_data: FormData) => {
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
  };

  const contacts = [
    { icon: Phone, label:"Sales",   val:"(858) 429-3000",             href:"tel:8584293000" },
    { icon: Phone, label:"Support", val:"(888) 563-9132",             href:"tel:8885639132" },
    { icon: Mail,  label:"Email",   val:"sales@synacksolutions.com",  href:"mailto:sales@synacksolutions.com" },
    { icon: Globe, label:"Web",     val:"synacksolutions.com",        href:"https://synacksolutions.com" },
    { icon: MapPin,label:"HQ",      val:"Maryland, USA",              href:"#" },
  ];

  const nextSteps = [
    { num:"01", title:"We review your request",                  desc:"Within a few hours of your message landing." },
    { num:"02", title:"A senior engineer contacts you",          desc:"Within 24 hours. Not a salesperson. An engineer." },
    { num:"03", title:"Free assessment scheduled",               desc:"We map your environment. You see what we see. No obligation." },
  ];

  return (
    <main className="pt-[68px]">
      {/* Hero */}
      <section className="relative bg-bg-page pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-page to-transparent pointer-events-none" />
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-10">
          <FadeUp><Eyebrow>Get In Touch</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-outfit text-[clamp(32px,5vw,60px)] font-black tracking-[-0.04em] leading-[1.04] text-text-heading max-w-[18ch] mb-5">
              Start with a free IT assessment.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-[17px] text-text-muted leading-[1.75] max-w-[50ch]">
              A senior engineer reviews your environment, maps what is broken, and tells you exactly what needs to happen. No obligation.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Form + Contact */}
      <section className="bg-bg-page py-20">
        <div className="max-w-site mx-auto px-5 lg:px-10 grid md:grid-cols-2 gap-16 items-start">

          {/* Form */}
          <FadeUp>
            <h2 className="font-outfit text-[22px] font-black tracking-[-0.02em] text-text-heading mb-6">Send us a message</h2>

            {submitted ? (
              <div className="px-6 py-8 bg-status-success-bg border border-status-success-border rounded-xl">
                <p className="font-outfit text-[16px] font-bold text-status-success-text mb-2">Message sent successfully.</p>
                <p className="text-[14px] text-status-success-text">A senior engineer will be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {[
                  { id:"name",    label:"Name",    type:"text",  placeholder:"Your full name",       required:true },
                  { id:"company", label:"Company", type:"text",  placeholder:"Company name",         required:true },
                  { id:"email",   label:"Email",   type:"email", placeholder:"your@email.com",       required:true },
                  { id:"phone",   label:"Phone",   type:"tel",   placeholder:"(000) 000-0000",       required:false },
                ].map(f => (
                  <div key={f.id}>
                    <label className="block text-[12px] font-bold tracking-[0.08em] uppercase text-text-muted mb-1.5">{f.label}{f.required && " *"}</label>
                    <input
                      {...register(f.id as keyof FormData, { required: f.required ? `${f.label} is required` : false })}
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 bg-white border border-border-light rounded-[8px] text-[14px] text-text-heading placeholder:text-border-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                    {errors[f.id as keyof FormData] && (
                      <p className="text-[12px] text-status-error mt-1">{String(errors[f.id as keyof FormData]?.message)}</p>
                    )}
                  </div>
                ))}

                <div>
                  <label className="block text-[12px] font-bold tracking-[0.08em] uppercase text-text-muted mb-1.5">Message *</label>
                  <textarea
                    {...register("message", { required:"Message is required" })}
                    rows={4}
                    placeholder="Tell us about your environment and what you're dealing with..."
                    className="w-full px-4 py-3 bg-white border border-border-light rounded-[8px] text-[14px] text-text-heading placeholder:text-border-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                  />
                  {errors.message && <p className="text-[12px] text-status-error mt-1">{errors.message.message}</p>}
                </div>

                <div>
                  <label className="block text-[12px] font-bold tracking-[0.08em] uppercase text-text-muted mb-1.5">How did you hear about us?</label>
                  <select
                    {...register("source")}
                    className="w-full px-4 py-3 bg-white border border-border-light rounded-[8px] text-[14px] text-text-heading focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  >
                    <option value="">Select one...</option>
                    <option value="referral">Referral</option>
                    <option value="search">Google / Search</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 font-sans text-[14px] font-bold text-scale-50 bg-primary hover:bg-accent disabled:opacity-60 transition-all duration-150 px-8 py-[14px] rounded-[9px] hover:-translate-y-0.5 mt-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </form>
            )}
          </FadeUp>

          {/* Contact details + next steps */}
          <div>
            <FadeUp delay={0.1}>
              <h2 className="font-outfit text-[22px] font-black tracking-[-0.02em] text-text-heading mb-6">Contact details</h2>
              <div className="flex flex-col gap-4 mb-10">
                {contacts.map(c => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-[8px] bg-bg-card border border-border-light flex items-center justify-center flex-shrink-0">
                      <c.icon size={14} className="text-accent" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.10em] uppercase text-text-muted">{c.label}</p>
                      <a href={c.href} className="text-[13.5px] font-medium text-text-heading hover:text-accent transition-colors">{c.val}</a>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-[12px] font-bold tracking-[0.14em] uppercase text-text-muted mb-4">What happens next</p>
              <div className="flex flex-col gap-3">
                {nextSteps.map((s,i) => (
                  <div key={i} className="flex items-start gap-4 px-5 py-4 bg-bg-card border border-border-light rounded-xl">
                    <span className="font-outfit text-[11px] font-black text-accent tracking-[0.06em] flex-shrink-0 pt-0.5">{s.num}</span>
                    <div>
                      <p className="text-[13.5px] font-bold text-text-heading mb-0.5">{s.title}</p>
                      <p className="text-[12px] text-text-muted">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
