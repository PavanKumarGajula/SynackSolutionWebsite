# SynAck Solutions Website — Project Reference

## 1. Project Overview

**SynAck Solutions** is a managed IT and cybersecurity services company. This site is their primary marketing presence, showcasing ownership-driven IT management across five main pages. The design language is dark-navy/bright-blue, animated, and enterprise-grade.

---

## 2. Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | Next.js | 16.2.4 |
| UI Runtime | React + React DOM | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| PostCSS | @tailwindcss/postcss | 4.x |
| Animation | Framer Motion | 12.38.0 |
| Forms | React Hook Form | 7.74.0 |
| Icons | Lucide React | 1.14.0 |
| Icons (extra) | React Icons | 5.6.0 |
| Language | TypeScript | 5.x |
| Linter | ESLint | 9.x |

**Run locally:** `npm install` → `npm run dev`  
**Deploy:** Vercel (zero-config)

---

## 3. File & Folder Structure

```
synack-website/
├── app/
│   ├── layout.tsx              Root layout: Nav + children + Footer
│   ├── globals.css             Tailwind imports, base styles, all custom CSS
│   ├── favicon.ico
│   ├── page.tsx                Homepage
│   ├── services/page.tsx       Services page
│   ├── about/page.tsx          About page
│   ├── contact/page.tsx        Contact + form page
│   └── industries/page.tsx     Industries page (~1050 lines)
│
├── components/
│   ├── Nav.tsx                 Fixed nav with scroll-triggered shrink
│   ├── Footer.tsx              Dark footer, 4-column grid
│   ├── Hero.tsx                Homepage hero + animated dashboard mockup
│   ├── FadeUp.tsx              Reusable scroll-triggered fade wrapper
│   ├── Eyebrow.tsx             Section label (accent line + uppercase text)
│   ├── CtaSection.tsx          Reusable dark CTA (appears on every page)
│   ├── WhatSynAckIs.tsx        SVG building cross-section visualization
│   ├── WhatWeOwn.tsx           Ownership scope diagram
│   ├── TheReality.tsx          Problem/challenge section
│   ├── HowWeWork.tsx           Process/workflow section
│   ├── TheStandard.tsx         Principles section
│   ├── TimelineSection.tsx     Company history timeline
│   ├── ServiceTabs.tsx         Tabbed service details (services page)
│   ├── WhereToBegin.tsx        Service-entry selection cards
│   ├── BuildingScene.tsx       3D-style building scene (services page)
│   ├── IsometricMap.tsx        Isometric map visualization
│   ├── TerminalCard.tsx        Terminal-style UI card
│   └── LogoMark.tsx            Logo component
│
├── public/
│   ├── logo.svg
│   ├── window.svg / globe.svg / file.svg / next.svg / vercel.svg
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts          Full design token definitions
├── next.config.ts              Security headers + image config
├── postcss.config.mjs
├── eslint.config.mjs
├── CLAUDE.md                   → references AGENTS.md
├── AGENTS.md                   Warning: Next.js 16 has breaking changes from prior versions
└── README.md
```

---

## 4. Configuration Details

### next.config.ts

Security headers applied on all routes (`/**`):
- `X-Frame-Options: DENY` — clickjacking protection
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy` — allows `unsafe-inline` / `unsafe-eval` (needed by Next.js + Framer Motion), permits `fonts.googleapis.com`, `fonts.gstatic.com`, `images.unsplash.com`

Image remotePatterns: `images.unsplash.com` (HTTPS only)

### tsconfig.json

- Target: ES2017, Module: esnext, JSX: react-jsx
- Path alias: `@/*` → project root
- Strict mode on, incremental compilation on

### eslint.config.mjs

Extends `eslint-config-next` (core-web-vitals + typescript).  
Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

### postcss.config.mjs

Single plugin: `@tailwindcss/postcss`

---

## 5. Design System (tailwind.config.ts)

### Color Tokens

| Token | Hex | Use |
|---|---|---|
| `primary` | `#102347` | Dark navy — hero backgrounds, buttons |
| `accent` | `#2472C8` | Bright blue — links, highlights |
| `accent-hover` | `#3D8FE0` | Button hover state |
| `bg-page` | `#F4F7FB` | Page background |
| `bg-section` | `#EAF2FC` | Alternating section background |
| `bg-card` | `#F0F5FB` | Card backgrounds |
| `bg-dark` | `#102347` | Dark sections |
| `bg-footer` | `#0A1628` | Footer |
| `text-heading` | `#0A1628` | Heading text |
| `text-body` | `#163360` | Body text |
| `text-muted` | `#1E4D8C` | Muted/secondary text |
| `text-on-dark` | `#7AB4EE` | Text on dark backgrounds |
| `border-light` | `#B8D4F7` | Light borders |
| `border-dark` | `#1E4D8C` | Dark borders |
| `terminal-green` | `#4ADE80` | Terminal text |
| `bg-terminal` | `#080F1E` | Terminal background |

Status colors (each has `-bg`, `-border`, `-text` variants):  
`success` / `error` / `warning` / `info`

Blue scale: `scale-50` through `scale-950` (12 stops)

### Fonts

| Variable | Font | Use |
|---|---|---|
| `font-outfit` | Outfit | Headings, UI labels, logo |
| `font-sans` | DM Sans | Body text |
| `font-mono` | DM Sans | Code/terminal display |

Loaded via Google Fonts in `app/layout.tsx`.  
Outfit weights: 400–900. DM Sans weights: 300–700.

### Typography Scale

| Class | Size | Line-height | Letter-spacing |
|---|---|---|---|
| `text-display` | clamp(42px, 5.5vw, 68px) | 1.02 | -0.04em |
| `text-h1` | clamp(32px, 4vw, 52px) | 1.06 | -0.03em |
| `text-h2` | clamp(22px, 2.8vw, 34px) | 1.12 | -0.025em |
| `text-h3` | 17px | 1.3 | -0.01em |
| `text-closing` | (large heading variant) | — | — |
| `text-body-lg` | 17px | 1.8 | — |
| `text-body` | 16px | 1.75 | — |
| `text-body-sm` | 13.5px | 1.65 | — |
| `text-eyebrow` | 11px | — | 0.17em |
| `text-nav` | 14px | — | 0.01em |
| `text-stat` | large numerals | — | — |
| `text-logo` | logo sizing | — | — |

### Spacing & Grid

- Max site width: `1120px`
- Background grid tile: `56px × 56px`
- Grid CSS: `.bg-grid` utility class

### Animations (Tailwind keyframes)

| Name | Duration | Behavior |
|---|---|---|
| `fade-up` | 0.6s | opacity 0→1 + translateY 20px→0 |
| `marquee` | 30s infinite | horizontal scroll (logo carousel) |

---

## 6. Global CSS (app/globals.css)

332 lines total. Key sections:

### Base Reset
```css
html { scroll-behavior: smooth }
body { bg-page color, text-body, -webkit-font-smoothing: antialiased }
h1-h6 { font-outfit, text-heading }
```

### Button Classes (9 variants)
```
.btn-primary      dark bg (#102347), light text, hover → accent + shadow  [STANDARD PRIMARY]
.btn-outline      transparent, dark border/text, hover → dark bg            [STANDARD SECONDARY]
.btn-outline-accent transparent, accent border/text
.btn-accent       accent bg, hover → lighter accent
.btn-white        light bg (#EAF2FC), dark text — for dark section CTAs    [DARK-BG PRIMARY]
.btn-outline-white transparent, white border — for dark section secondary  [DARK-BG SECONDARY]
.btn-nav          navbar-specific (smaller)
.btn-sm           small button
.btn-sm-outline   small outline button
.btn-icon         42×42 icon button, light bg
```

### Button Usage Rules (sitewide standard)

All buttons use `className="btn btn-<variant>"`. Never use inline styles or raw Tailwind for buttons.

| Context | Primary CTA | Secondary CTA |
|---|---|---|
| Light sections | `btn btn-primary` | `btn btn-outline` |
| Dark sections (navy bg) | `btn btn-white` | `btn btn-outline-white` |
| Form submit | `btn btn-primary justify-center` | — |

Arrow icons inside buttons: always `<i className="ti ti-arrow-right" style={{ fontSize: 14 }} />`. Never use a custom SVG arrow — it bypasses the hover slide animation. The `.btn:hover i` CSS in globals.css drives the 3px translateX slide on hover for all button variants.

### Industry Page Animations
- `.ind-status-blink` — 1.5s opacity blink
- `.ind-glow-blob` — 4s ambient glow
- `.ind-node-pop` — entry pop for diagram nodes

### Manufacturing Section
- `.mfg-pane-img` — grayscale filter → color on hover, scale up

### Healthcare Annotations
- `.hc-photo-img` — grayscale base
- `.hc-ring` — 3s expanding circle animation (4 delay stages for multiple rings)

### Collage Cards (About / Industries)
- `.collage-card` — absolutely positioned, box shadow, gradient overlay
- 4 cards with unique rotations + staggered animation timing
- Hover: scale up, brighten, deeper shadow
- Respects `prefers-reduced-motion`

### Building Scene Keyframes
```
.b-hover    vertical bob (float effect)
.b-blink    opacity + box-shadow blink
.b-wifi     wifi signal pulse
.b-drift    horizontal drift
```

### Pulse Effects
```
.pulse-dot   2.2s opacity pulse
.pulse-ring  2.2s scale + opacity expanding ring
```

### Where To Begin Path Animation
```
.questionGlow  glow shadow pulse
.arrowPulse    scale + box-shadow pulse
.wts-conn      SVG stroke-dashoffset draw (0.7s)
```

### Industries Carousel
- `.industries-carousel-track` — 36s infinite horizontal scroll (duplicated content for seamless loop)

### Utilities
```
.bg-grid            CSS background grid (56×56px)
.font-outfit        Force Outfit font
.flow-to-section    80px gradient fade at section bottom
```

---

## 7. Pages

### app/layout.tsx
- Root layout for the entire site
- Applies Google Fonts via CSS variables (`--font-outfit`, `--font-dm-sans`)
- Renders: `<Nav />` → `{children}` → `<Footer />`
- Metadata: `title`, `description`

### app/page.tsx — Homepage
**Client component.** Section order:
1. `<Hero />` — animated dashboard mockup + stat counters + logo marquee
2. `<WhatSynAckIs />` — SVG building cross-section
3. `<WhatWeOwn />` — ownership scope
4. `<TheReality />` — problem framing
5. `<HowWeWork />` — process/workflow
6. `<TheStandard />` — principles
7. `<CtaSection />` — dark CTA

### app/services/page.tsx — Services
**Client component.** Section order:
1. Hero — "One building. Every layer owned." with animated entrance text
2. `<BuildingScene />` — 3D-style building visualization
3. `<WhereToBegin />` — service selection cards
4. `<ServiceTabs />` — tabbed service details, `activeTab` state
   - Tabs: `managed-it`, `security`, `m365`, `network`, `physical-security`, `backup-dr`
5. `<HowWeWork />` — shared process section
6. `<CtaSection />` — dark CTA

### app/about/page.tsx — About
Section order:
1. Hero — 5-panel card grid: 247 endpoints stat, 99.98% uptime, 4 regions, network visualization
2. **The Name** — TCP three-way handshake diagram explaining "SynAck"
3. **Why We Built It** — origin story + pull quote
4. `<TimelineSection />` — company history
5. **The Team** — 3 cards:
   - Mazhar Kapadia — CEO
   - Umar Saleem — CIO
   - Taha Mohammed — CTO
6. **Testimonials** — 5 client testimonials, 3+2 grid layout (some dark-card alternates)
7. `<CtaSection />`

### app/contact/page.tsx — Contact
Section order:
1. Hero — "Start with a free IT assessment"
2. Two-column layout:
   - **Left:** Contact form (React Hook Form)
     - Fields: name, company, email, phone, message, how-did-you-hear dropdown
     - Shows success message after submit
     - Currently logs to console (no email backend wired yet)
   - **Right:** Contact details sidebar
     - Phone numbers, emails, website URL, HQ location
     - "What Happens Next" — 3-step timeline
3. `<CtaSection />`

### app/industries/page.tsx — Industries (~1050 lines)
Section order:
1. **Hero** — 5-star trust signal, industry badges, marquee carousel (8 cards × 2 for loop)
2. **Manufacturing (01)** — "Your line is the business"
   - 3-pane image layout: Corporate IT | Segmentation Firewall | OT/Production
   - Stat boxes: Reality / Pressure / Trust
   - Inline construction diagram
3. **Healthcare (02)** — "The fine isn't the cost. The investigation is."
   - Annotated photo with 4 floating labels (HIPAA compliance features)
   - OCR investigation HIPAA timeline flow
4. **Professional Services (03)** — "One misdirected email can end a career"
   - 3 scenario cards: wrong recipient, lost laptop, lateral network move
   - Outcome badges for each
5. **Growing Business (04)** — "You didn't fail because you grew"
   - Desktop: animated growth curve with 4 breakpoints (30 / 75 / 120 / 200+ employees)
   - `CountUp` animation component (animates numbers on scroll)
   - Mobile: simplified list fallback
6. **Construction (05)** — via inline `<IndustrySection />` subcomponent
7. **Also Serving** — pill badges: Retail, Finance, Education, Nonprofit, Real Estate, Insurance
8. `<CtaSection />`

---

## 8. Components

### Nav.tsx
- Fixed, `z-50`
- **Scroll behavior:** at `scrollY > 20`, applies tighter padding + border-radius + box-shadow + background opacity via Framer Motion
- Easing: `[0.22, 1, 0.36, 1]`
- Desktop links: Home, Industries, Services, About, Contact + "Contact Us" CTA
- Mobile: hamburger icon → dropdown menu
- Active route detection: `usePathname()`
- Logo: icon + "SYNACK / Solutions" text

### Footer.tsx
- Background: `bg-footer` (#0A1628)
- 4-column grid: Brand | Pages | Services | Contact
- Brand column: logo, tagline, social icons (LinkedIn, Gmail, Phone)
- All columns fade up on scroll via `<FadeUp>` with staggered delays
- Services listed: Managed IT, Cybersecurity, Microsoft 365, Network Infrastructure, Physical Security, Backup & DR
- Contact: 2 phones, 2 emails, web URL
- Regions: NY, NJ, MD, MN (+ "and expanding")

### Hero.tsx (571 lines)
**Browser dashboard mockup** with:
- Chrome bar (primary bg, red/yellow/green traffic lights)
- Sidebar: client selector + nav items
- Main panel: System Overview, endpoint grid (counter), security score, incidents feed
- Right panel: SynAck Score (A+, 98/100), live activity feed (shuffles every 3s)
- Uptime chart: animated SVG path → 99.98% average

**Logo marquee:** 8 partner/tech logos, infinite scroll

**Stat counter strip (4 rolling-digit counters):**
- 650+ Projects Done
- 25+ Years of Experience
- 99% Positive Reviews
- 24/7 Monitoring

**Endpoint animation:** simulates 247 → 246 → 247 device count changing

### FadeUp.tsx
```tsx
<FadeUp delay={0.1}>children</FadeUp>
```
- Wraps children in `motion.div`
- Animates: opacity 0→1, y 56→0, scale 0.97→1
- Duration: 0.8s, trigger once when element enters viewport (margin -80px)
- Delay prop: number in seconds

### Eyebrow.tsx
```tsx
<Eyebrow dark>SECTION LABEL</Eyebrow>
```
- Inline-flex: accent line (2px wide, 24px tall) + uppercase text
- Text: 11px, bold, letter-spacing 0.17em, accent color
- `dark` prop available (currently both modes use accent color)
- Margin-bottom: 3.5rem

### CtaSection.tsx
Used on every page as the final section:
- Background: `primary` (dark navy)
- CSS grid overlay + ambient glow blobs
- Headline: "Don't take our word for it. Look at how we work. Then decide."
- Body: "A senior engineer reviews your environment..."
- Buttons: "Talk to us" (`btn-white`) + "View Services" (`btn-outline-white`)
- All elements use `<FadeUp>` with staggered delays

### WhatSynAckIs.tsx
- **Desktop:** SVG building visualization
  - 7 connected devices: camera, laptop, phone, router, server, cloud, badge reader
  - Each device has `.pulse-dot` + `.pulse-ring`
  - SynAck hub at center with pulse rings
  - SVG paths animate `stroke-dashoffset` when in view
- **Mobile:** Text pill "OWNED BY SynAck Solutions"
- Calls `useReducedMotion()` for accessibility

### ServiceTabs.tsx
- Tab IDs: `managed-it`, `security`, `m365`, `network`, `physical-security`, `backup-dr`
- Active tab lifted to parent (`services/page.tsx`) via prop

### BuildingScene.tsx
- 3D-style building illustration for services hero
- Uses `.b-hover`, `.b-blink`, `.b-wifi`, `.b-drift` CSS animations

### WhereToBegin.tsx
- Service-selection entry cards
- SVG path drawing via `.wts-conn` (stroke-dashoffset animation)
- `.questionGlow` + `.arrowPulse` for interactive accents

### TimelineSection.tsx
- Company history with dated milestones
- Animated on scroll

### LogoMark.tsx
- Logo rendered as a component (SVG or styled element)

### IsometricMap.tsx
- Isometric-projection map visualization

### TerminalCard.tsx
- Terminal UI with `bg-terminal` (#080F1E) + `terminal-green` (#4ADE80) text

---

## 9. Shared Patterns & Conventions

### Animation Pattern
Every section uses `<FadeUp>` for scroll-triggered entrance:
```tsx
<FadeUp delay={0}>
  <Eyebrow>LABEL</Eyebrow>
</FadeUp>
<FadeUp delay={0.1}>
  <h2>Heading</h2>
</FadeUp>
<FadeUp delay={0.2}>
  <p>Body text</p>
</FadeUp>
```

### Page Structure Pattern
All pages are `"use client"` where animations are needed. Shared structure:
```
Hero section → Content sections → <HowWeWork /> (optional) → <CtaSection />
```

### Framer Motion Standard Easing
`[0.22, 1, 0.36, 1]` — used in Nav and other motion elements

### Reduced Motion
`useReducedMotion()` from Framer Motion checked in SVG-heavy components; `prefers-reduced-motion` media query in CSS for collage cards.

### Path Aliases
`@/` resolves to the project root. Components are imported as `@/components/ComponentName`.

### Contact Form
React Hook Form handles validation. On submit, currently `console.log`s the data. To wire a real backend, integrate Resend (per README).

---

## 10. Brand Voice & Content

**Tagline:** Ownership-driven IT management  
**Positioning:** "One building. Every layer owned."  
**Tone:** Direct, technical, confident. No fluff.

**Services:**
1. Managed IT
2. Cybersecurity
3. Microsoft 365
4. Network Infrastructure
5. Physical Security
6. Backup & Disaster Recovery

**Industries served:**
1. Manufacturing
2. Healthcare
3. Professional Services
4. Growing Businesses
5. Construction
6. (Also: Retail, Finance, Education, Nonprofit, Real Estate, Insurance)

**Team:**
- Mazhar Kapadia — CEO
- Umar Saleem — CIO
- Taha Mohammed — CTO

**Coverage regions:** NY, NJ, MD, MN (expanding)

**Contact:**
- 2 phone lines, 2 email addresses (in Footer/Contact page)

---

## 11. Key Stats Used on Site

| Stat | Value |
|---|---|
| Projects Done | 650+ |
| Experience | 25+ years |
| Positive Reviews | 99% |
| Monitoring | 24/7 |
| Uptime | 99.98% |
| Endpoints (dashboard) | 247 |
| SynAck Score | A+ / 98 of 100 |

---

## 12. Icon System — Tabler Edition (v2.0)

### Overview

Tabler Icons is the **locked** icon library for the entire site. 5,500+ MIT-licensed SVGs on a 24×24 grid with a 2px stroke. Brand cohesion comes from how icons are **contained, sized, and colored** — not from custom-drawn glyphs. One library. Never mix.

- **Library:** Tabler Icons — `tabler.io/icons`
- **License:** MIT
- **Catalog:** 5,500+ icons
- **Stroke width:** 2px (never override)
- **Set:** Outline (default); filled only for tiny status indicators

### Integration

**`@tabler/icons-react` npm package (the only method used on this site):**

```tsx
import { IconArrowRight, IconShieldLock } from "@tabler/icons-react";

// Always pass size and stroke explicitly:
<IconArrowRight size={14} stroke={2} />
<IconShieldLock size={22} stroke={2} />
```

- `size` maps to the pixel dimensions (replaces `fontSize` from the old webfont approach)
- `stroke` must always be `2` — never override
- Color is inherited from the parent via `currentColor` (same as before)
- No CDN link in `<head>` — the npm package bundles only what you import (tree-shaken)
- `lucide-react` and `react-icons` have been removed from package.json — do not re-add them

**Dynamic icon rendering from data arrays** (e.g. BuildingScene floors, contact icons):  
Store the component reference directly in the data object:
```tsx
import { IconHeadset } from "@tabler/icons-react";
const items = [{ Icon: IconHeadset, name: "..." }];
// render:
<item.Icon size={16} stroke={2} />
```

For large maps where the data uses string keys (e.g. services page), use a lookup map:
```tsx
const ICON_MAP: Record<string, React.ComponentType<{size?:number;stroke?:number}>> = {
  "managed-it": IconHeadset,
};
const I = ICON_MAP[key];
return I ? <I size={16} stroke={2} /> : null;
```

### Icon Container (`.icon-box`)

The container drives every visual state — the icon glyph never changes.

| Class | Size | Border-radius | Icon font-size |
|---|---|---|---|
| `.icon-box.s28` | 28×28px | 8px | 14px |
| `.icon-box.s32` | 32×32px | 9px | 16px |
| `.icon-box.s36` | 36×36px | 10px | 18px |
| `.icon-box.s44` | 44×44px | 12px | 22px |
| `.icon-box.s56` | 56×56px | 14px | 26px |

**Three color states:**

| State | Icon color | Background | Border |
|---|---|---|---|
| Default (light) | `--accent` #2472C8 | `--scale-50` #EAF2FC | `--border` #B8D4F7 |
| Hover (on card) | stays `--accent` | accent @ 12% opacity | `--accent` |
| Dark (`.dark` modifier) | `--accent-h` #3D8FE0 | accent @ 20% opacity | accent @ 40% opacity |

Usage:
```html
<!-- Light (default) -->
<div class="icon-box s44"><i class="ti ti-shield-lock"></i></div>

<!-- Dark (inside dark components) -->
<div class="icon-box s44 dark"><i class="ti ti-shield-lock"></i></div>
```

### Brand Mark — The One Exception

The SynAck handshake glyph (two endpoints connected through a dashed line) is the only custom icon on the site. Used in navbar, footer, and signature surfaces. Everything else is Tabler.

```svg
<!-- SynAck logomark SVG -->
<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"
     stroke-linecap="square" stroke-linejoin="miter" fill="none">
  <path d="M2 12 L7 7 M2 12 L7 17"/>
  <path d="M22 12 L17 7 M22 12 L17 17"/>
  <path d="M7 12 L17 12" stroke-dasharray="2 1.5"/>
  <circle cx="12" cy="12" r="2.2" fill="#2472C8" stroke="none"/>
</svg>
```

Sizes: 80px (hero/page-level), 32px (nav/footer lockup), 20px (inline/favicon)

### Service Icons

| # | Service | Tabler class |
|---|---|---|
| 01 | Managed IT & Help Desk | `.ti-headset` |
| 02 | Cybersecurity | `.ti-shield-lock` |
| 03 | Cloud & Microsoft 365 | `.ti-cloud` |
| 04 | Network Infrastructure | `.ti-network` |
| 05 | IT Strategy & Consulting | `.ti-trending-up` |
| 06 | IT Asset Procurement | `.ti-package` |
| 07 | Physical Security | `.ti-device-cctv` |
| 08 | Security Awareness Training | `.ti-school` |
| 09 | Backup & Disaster Recovery | `.ti-database-export` |
| 10 | Audio/Visual & Conference Rooms | `.ti-presentation` |

### Industry Icons

| Industry | Tabler class |
|---|---|
| Manufacturing | `.ti-building-factory-2` |
| Healthcare | `.ti-stethoscope` |
| Professional Services | `.ti-briefcase` |
| Small & Mid-Size Business | `.ti-building-skyscraper` |

### Phase Icons (Security Lifecycle)

| Phase | Icon | Tabler class |
|---|---|---|
| 01 — Prevent | Shield Check | `.ti-shield-check` |
| 02 — Detect | Radar | `.ti-radar-2` |
| 03 — Respond | Bolt | `.ti-bolt` |

### Differentiator Icons

| Differentiator | Tabler class |
|---|---|
| Digital + physical security | `.ti-shield-half-filled` |
| Senior engineers | `.ti-user-cog` |
| Proactive, not reactive | `.ti-bolt` |
| Security-first by default | `.ti-lock` |
| Full or co-managed | `.ti-arrows-shuffle-2` |
| Enterprise at SMB scale | `.ti-stack-2` |

### Contact Icons

| Channel | Tabler class |
|---|---|
| Sales / Phone | `.ti-phone` |
| Support / Helpdesk | `.ti-headset` |
| Service Regions | `.ti-map-pin` |
| Web / Online | `.ti-world` |

### Sizing Reference

| Container | Box size | Icon size | Use |
|---|---|---|---|
| `.s28` | 28px | 14px | Inline / navbar |
| `.s32` | 32px | 16px | List item |
| `.s36` | 36px | 18px | Compact card |
| `.s44` | 44px | 22px | Service card (standard) |
| `.s56` | 56px | 26px | Feature / hero |

### Six Rules (Never Break)

1. **Tabler only** — no Lucide, Phosphor, Heroicons, or any other library
2. **Stroke width stays at 2** — Tabler is designed at 2; 1.5 looks weak, 2.5 looks heavy
3. **Color comes from the container** — never set `stroke` or `color` directly on the SVG/`<i>`
4. **Outline set only** — filled (`-filled` suffix) reserved for tiny status indicators
5. **If Tabler doesn't have it, change the metaphor** — 5,500 icons is enough for any need
6. **The brand mark is the one exception** — SynAck logomark stays custom; everything else is Tabler

### Eight Don'ts

1. Don't mix icon libraries
2. Don't use the filled set as defaults
3. Don't change the stroke weight
4. Don't apply gradients to icons — single solid color from the palette only
5. Don't put an icon next to every word — icons are signal, not decoration
6. Don't use class names without verifying on tabler.io/icons first
7. Don't replace the SynAck logomark with a Tabler icon
8. Don't animate the icon glyph itself — animate the container only

---

## 13. Known TODOs / Integration Points

- **Contact form backend:** Currently logs to console. README recommends Resend for email delivery.
- **Team photos:** Placeholders used in About page team cards.
- **Partner logos:** Marquee uses placeholder/icon logos — can be replaced with real partner SVGs.
- **Industries Construction section:** Rendered via inline `<IndustrySection />` subcomponent within `industries/page.tsx`.
- **CSP `unsafe-eval`:** Required by Framer Motion and Next.js dev; consider tightening in production.
