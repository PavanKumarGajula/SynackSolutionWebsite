"use client";

import CtaSection from "@/components/CtaSection";
import WhatSynAckIs from "@/components/WhatSynAckIs";
import WhatWeOwn from "@/components/WhatWeOwn";
import TheReality from "@/components/TheReality";
import HowWeWork from "@/components/HowWeWork";
import Hero from "@/components/Hero";
import TheStandard from "@/components/TheStandard";
import IndustriesStrip from "@/components/IndustriesStrip";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatSynAckIs />
      <TheReality />
      <WhatWeOwn />
      <IndustriesStrip />
      <HowWeWork />
      <TheStandard />
      <CtaSection />
    </main>
  );
}
