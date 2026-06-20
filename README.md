Pricing Page

A pixel-accurate implementation of a banking/payments SaaS pricing page, built as a Day 5 design challenge. Matches a Figma design using Next.js, Tailwind CSS v4, and GSAP.

## Tech Stack

- **Next.js 15.3** — App Router
- **React 19** — with `'use client'` components
- **Tailwind CSS v4** — utility classes + custom design tokens
- **GSAP 3.12** + **@gsap/react** — custom cursor animation
- **TypeScript**
- Local fonts only — no Google Fonts dependency

## Features

- Three pricing tiers (Essential, Advanced, Global) with monthly/yearly toggle
- Hover state reveals coloured outer card background + savings badge
- CTA button fills blue on card hover
- Custom GSAP cursor — dot + lagging ring, expands on interactive elements
- FAQ accordion section with design-system toggle icons
- Fully offline-capable (all fonts served locally)
- Responsive layout (stacked on mobile, three columns on desktop)

## Fonts

Stored in `/public/fonts/` — not fetched from any CDN:

| File | Weight | Usage |
|---|---|---|
| `Phudu-SemiBold.ttf` | 600 | Headings, prices |
| `Inter_18pt-Regular.ttf` | 400 | Body text |
| `Inter_18pt-Medium.ttf` | 500 | UI labels, buttons |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** Uses `next dev` without `--turbopack` to avoid a Win32 SWC binary error.

## Project Structure

```
app/
  page.tsx       # All components (PricingCard, FAQSection, CustomCursor…)
  globals.css    # Font-face declarations, design tokens, base reset
  layout.tsx     # Root layout, metadata
public/
  fonts/         # Local TTF files
  Pinstripe.svg  # Repeating background texture
  Save20.svg     # Figma-exported "Save 20%" asset
```

## Design Tokens

Defined as CSS custom properties in `globals.css`:

```
--color-primary:   #335CFF
--color-dark:      #171717
--color-gray:      #5C5C5C
--font-phudu:      'Phudu', sans-serif
--font-inter:      'Inter', sans-serif
```

Card shadow matches Figma exactly:
```
0px 3px 3px -1.5px rgba(23,23,23,0.06),
0px 1px 1px -0.5px rgba(23,23,23,0.06),
0px 0px 0px 1px rgba(23,23,23,0.02)
```
