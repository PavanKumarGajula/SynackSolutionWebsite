# SynAck Solutions — Website

Built with Next.js 15, Tailwind CSS, Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Click Deploy — done
4. Add your custom domain in Vercel settings

## Project Structure

```
app/
  page.tsx          # Homepage
  services/page.tsx # Services
  about/page.tsx    # About
  contact/page.tsx  # Contact
  layout.tsx        # Root layout (Nav + Footer)
  globals.css       # Fonts + Tailwind base

components/
  Nav.tsx           # Navigation
  Footer.tsx        # Footer
  FadeUp.tsx        # Scroll animation wrapper
  Eyebrow.tsx       # Section eyebrow label
  CtaSection.tsx    # Final CTA (reused on all pages)
```

## Brand Colors

All tokens are in `tailwind.config.ts`

| Token | Hex | Use |
|---|---|---|
| primary | #102347 | Headings, logo, dark sections |
| accent | #2472C8 | Buttons, labels, links |
| bg-page | #F4F7FB | Page background |
| bg-section | #EAF2FC | Alternate sections |

## Contact Form

The contact form currently logs to console.
To connect to email, install Resend:

```bash
npm install resend
```

Then create `app/api/contact/route.ts` with your Resend API key.
Get your key at resend.com — free tier handles SynAck's volume easily.
