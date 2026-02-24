# Sales & IA Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create dedicated `/sales` and `/ia` pages for each BU, mirroring the same section structure with distinct content and color identity.

**Architecture:** Two new page routes (`app/sales/page.tsx`, `app/ia/page.tsx`) that compose shared section components parameterized by BU config objects. Data-driven approach: each BU is defined as a config object containing colors, copy, services, methodology steps, and team member info. Shared components consume these configs.

**Tech Stack:** Next.js 16 (app router), React 19, Tailwind v4, Framer Motion, lucide-react, existing design system (glass-card, btn-glow, gradient-text, ScrollReveal, TiltCard)

**Working directory:** `C:\Users\abrah\challengerslab-v2`

---

### Task 1: Create BU config data file

**Files:**
- Create: `lib/bu-config.ts`

**Step 1: Create the shared config type and data**

```ts
import { Phone, Users, BarChart3, Settings, Bot, LayoutDashboard, Zap, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface BUConfig {
  id: "sales" | "ia";
  slug: string;
  badge: string;
  accent: string;
  headline: string;
  headlineGradient: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  proofText: string;
  painPoints: {
    stat: string;
    statLabel: string;
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  services: {
    icon: LucideIcon;
    title: string;
    description: string;
    deliverables: string[];
    isPrimary: boolean;
  }[];
  methodology: {
    number: string;
    phase: string;
    timeline: string;
    description: string;
    deliverable: string;
    accent: string;
  }[];
  director: {
    name: string;
    title: string;
    bio: string;
    photoPlaceholder: string; // initials for placeholder avatar
  };
  testimonials: {
    quote: string;
    name: string;
    role: string;
    detail: string;
    metric: string;
    metricLabel: string;
  }[];
  relatedArticleSlugs: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
```

Content for each BU:

**Sales (`#7B5EFF`):**
- Badge: "Sales"
- Headline: "Votre pipeline ne se remplit pas tout seul"
- Headline gradient: "tout seul"
- Subheadline: "Prospection externalisée, coaching Challenger Sales, direction commerciale fractionnée. On construit votre machine à pipeline."
- Pain points: 3 cards (cf design doc)
- Services: Prospection externalisée multicanal, Head of Sales fractionné, Coaching Challenger Sales, Setup CRM & cycle de vente
- Methodology: Audit → Déploiement → Optimisation (Sales-specific wording)
- Director: Abdelhay Bekkali (Receipt Bank, Qaal, Sup de Vente)
- Testimonials: 2 placeholder cards
- Related articles: `prospection-b2b-ia-guide-complet`, `challenger-sales-methode-b2b`

**IA (`#00F5FF`):**
- Badge: "IA & Automatisation"
- Headline: "Automatisez ce que vos concurrents font encore à la main"
- Headline gradient: "à la main"
- Subheadline: "Sites IA, applications métier, workflows automatisés. On connecte l'intelligence artificielle à votre business."
- Pain points: 3 cards (cf design doc)
- Services: Sites & interfaces IA, Applications métier automatisées, Prompt engineering & intégration IA, Workflows (Make, n8n, Zapier)
- Methodology: Diagnostic → Build → Scale (IA-specific wording)
- Director: Abraham Brakha (20 ans, deeptech, psychologie, IA)
- Testimonials: 2 placeholder cards
- Related articles: `automatisation-crm-workflows-ia`, `roi-ia-ventes-b2b`

**Step 2: Verify file created**

Run: `cat lib/bu-config.ts | head -5`
Expected: imports visible

**Step 3: Commit**

```bash
git add lib/bu-config.ts
git commit -m "feat: add BU config data for Sales and IA pages"
```

---

### Task 2: Create ServicePageHero component

**Files:**
- Create: `components/sections/ServicePageHero.tsx`

**Step 1: Build the hero section**

Pattern: mirrors `components/sections/Hero.tsx` but parameterized. Uses `motion` stagger + `fadeUp` for animation. Badge in BU color, headline with `font-display`, gradient text on the emphasis part, sub-copy, CTA `.btn-glow`, proof text. Background: orbs in BU accent color + hero-grid.

Key differences from homepage Hero:
- No CountUpStat bar
- Single CTA (BU-specific Calendly placeholder)
- Orbs use the BU accent color only (not mixed purple/cyan)
- Smaller headline scale than homepage (clamp 2.5rem → 5.5rem)

Props: `config: BUConfig`

The gradient text needs dynamic color. For Sales (#7B5EFF): use existing `gradient-text`. For IA (#00F5FF): create an inline style with `background: linear-gradient(135deg, #00F5FF, #7B5EFF)` or use `gradient-text` since it already goes cyan→purple. Both can use the same `gradient-text` class.

**Step 2: Verify renders without error**

Run: `cd C:\Users\abrah\challengerslab-v2 && npx next build 2>&1 | tail -20`

**Step 3: Commit**

```bash
git add components/sections/ServicePageHero.tsx
git commit -m "feat: add ServicePageHero component for BU pages"
```

---

### Task 3: Create PainPoints component

**Files:**
- Create: `components/sections/PainPoints.tsx`

**Step 1: Build the pain points section**

Pattern: mirrors `components/sections/Results.tsx` exactly. Same asymmetric grid layout (lg:grid-cols-5, featured card spans 3, two stacked span 2). Uses `ScrollReveal`, `TiltCard`, `motion` parallax orb. Icons from the config. Accent colors from config.

Props: `painPoints: BUConfig["painPoints"]`, `accent: string`

The orb uses the BU accent color.

**Step 2: Commit**

```bash
git add components/sections/PainPoints.tsx
git commit -m "feat: add PainPoints section component"
```

---

### Task 4: Create ServicesDetail component

**Files:**
- Create: `components/sections/ServicesDetail.tsx`

**Step 1: Build services detail section**

Layout: badge "Nos services" + heading + grid of cards. Primary services get larger cards (lg:col-span-1 each, side by side), secondary services get smaller cards below.

Each card: TiltCard with icon box (same style as TrustBar features), title (font-display), description, bullet list of deliverables. Hover: corner glow in accent color (same pattern as TrustBar pillar cards).

Props: `services: BUConfig["services"]`, `accent: string`

```
[badge: "Nos services"]
[heading: "Ce qu'on fait. Concrètement."]

[=== Primary card 1 ===] [=== Primary card 2 ===]
[= Secondary card 1 =] [= Secondary card 2 =]
```

**Step 2: Commit**

```bash
git add components/sections/ServicesDetail.tsx
git commit -m "feat: add ServicesDetail section component"
```

---

### Task 5: Create BUMethodology component

**Files:**
- Create: `components/sections/BUMethodology.tsx`

**Step 1: Build methodology section**

Pattern: mirrors `components/sections/Method.tsx` exactly. Sticky left panel + right step cards. Same layout, same animations, same TiltCard pattern.

Differences:
- Steps come from config instead of hardcoded
- Left panel heading adapts to BU ("Notre méthode Sales" vs "Notre méthode IA")
- Left panel CTA links to a relevant article from config
- No section-divider at top (hero + pain points precede it)

Props: `methodology: BUConfig["methodology"]`, `accent: string`, `badge: string`, `articleSlug?: string`

**Step 2: Commit**

```bash
git add components/sections/BUMethodology.tsx
git commit -m "feat: add BUMethodology section component"
```

---

### Task 6: Create TeamMember component

**Files:**
- Create: `components/sections/TeamMember.tsx`

**Step 1: Build the director section**

Layout: section-divider at top, then centered content with badge "Votre interlocuteur".

Horizontal card (TiltCard): left = circular placeholder avatar (initials on gradient background matching BU accent), right = name (font-display, large), title, bio paragraph.

```
[section-divider]
[badge: "Votre interlocuteur"]

[=== TiltCard =====================================]
[ [AB]  Abdelhay Bekkali                           ]
[ avatar Directeur BU Sales                        ]
[       Bio text 3-4 lines...                      ]
[==================================================]
```

Props: `director: BUConfig["director"]`, `accent: string`

Avatar placeholder: `h-24 w-24 rounded-full` with `bg-gradient-to-br` using BU accent, showing initials in white `font-display text-2xl`.

**Step 2: Commit**

```bash
git add components/sections/TeamMember.tsx
git commit -m "feat: add TeamMember section component"
```

---

### Task 7: Create BUTestimonials component

**Files:**
- Create: `components/sections/BUTestimonials.tsx`

**Step 1: Build testimonials section**

Pattern: mirrors `components/sections/Testimonials.tsx` but with 2 cards instead of 3 (md:grid-cols-2). Same TiltCard, same metric badge, same blockquote pattern.

Props: `testimonials: BUConfig["testimonials"]`, `accent: string`

**Step 2: Commit**

```bash
git add components/sections/BUTestimonials.tsx
git commit -m "feat: add BUTestimonials section component"
```

---

### Task 8: Create BURessources component

**Files:**
- Create: `components/sections/BURessources.tsx`

**Step 1: Build filtered resources preview**

Pattern: mirrors `components/sections/RessourcesPreview.tsx`. Imports from `lib/ressources.ts`, filters by `relatedArticleSlugs` from config. Shows 2-3 article cards with same TiltCard pattern.

Props: `articleSlugs: string[]`, `accent: string`

**Step 2: Commit**

```bash
git add components/sections/BURessources.tsx
git commit -m "feat: add BURessources section component"
```

---

### Task 9: Create BUCTA component

**Files:**
- Create: `components/sections/BUCTA.tsx`

**Step 1: Build BU-specific final CTA**

Pattern: mirrors `components/sections/FinalCTA.tsx`. Same parallax orbs, same centered layout. But orbs use only the BU accent color (not mixed). CTA button links to BU-specific Calendly (placeholder href).

Props: `config: BUConfig`

Headline: "Parlons de vos ventes" (Sales) / "Parlons de vos automatisations" (IA)
Sub: "30 minutes avec {director.name}. On identifie ce qu'on peut faire pour vous."
CTA label: config.ctaLabel

**Step 2: Commit**

```bash
git add components/sections/BUCTA.tsx
git commit -m "feat: add BUCTA final CTA component"
```

---

### Task 10: Create /sales page

**Files:**
- Create: `app/sales/page.tsx`

**Step 1: Create the Sales page**

Server component with metadata and JSON-LD. Imports `salesConfig` from `lib/bu-config.ts` and all section components. Composes them in order:

```tsx
import { Metadata } from "next";
import { salesConfig } from "@/lib/bu-config";
import { ServicePageHero } from "@/components/sections/ServicePageHero";
import { PainPoints } from "@/components/sections/PainPoints";
import { ServicesDetail } from "@/components/sections/ServicesDetail";
import { BUMethodology } from "@/components/sections/BUMethodology";
import { TeamMember } from "@/components/sections/TeamMember";
import { BUTestimonials } from "@/components/sections/BUTestimonials";
import { BURessources } from "@/components/sections/BURessources";
import { BUCTA } from "@/components/sections/BUCTA";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: salesConfig.seo.title,
  description: salesConfig.seo.description,
  keywords: salesConfig.seo.keywords,
  alternates: { canonical: "/sales" },
  openGraph: { ... },
};

// JSON-LD: Service + BreadcrumbList

export default function SalesPage() {
  return (
    <main id="main-content">
      <ServicePageHero config={salesConfig} />
      <PainPoints painPoints={salesConfig.painPoints} accent={salesConfig.accent} />
      <ServicesDetail services={salesConfig.services} accent={salesConfig.accent} />
      <BUMethodology methodology={salesConfig.methodology} accent={salesConfig.accent} badge={salesConfig.badge} />
      <TeamMember director={salesConfig.director} accent={salesConfig.accent} />
      <BUTestimonials testimonials={salesConfig.testimonials} accent={salesConfig.accent} />
      <BURessources articleSlugs={salesConfig.relatedArticleSlugs} accent={salesConfig.accent} />
      <BUCTA config={salesConfig} />
      <Footer />
    </main>
  );
}
```

**Step 2: Verify build**

Run: `cd C:\Users\abrah\challengerslab-v2 && npx next build 2>&1 | tail -20`
Expected: `/sales` route listed in output

**Step 3: Commit**

```bash
git add app/sales/page.tsx
git commit -m "feat: add /sales page composing all BU sections"
```

---

### Task 11: Create /ia page

**Files:**
- Create: `app/ia/page.tsx`

**Step 1: Create the IA page**

Identical structure to `/sales` but imports `iaConfig` instead. Same component composition, different data.

**Step 2: Verify build**

Run: `cd C:\Users\abrah\challengerslab-v2 && npx next build 2>&1 | tail -20`
Expected: `/ia` route listed in output

**Step 3: Commit**

```bash
git add app/ia/page.tsx
git commit -m "feat: add /ia page composing all BU sections"
```

---

### Task 12: Update navigation links

**Files:**
- Modify: `components/layout/Navbar.tsx:10-14` (navLinks array)
- Modify: `components/layout/Footer.tsx:4-7` (footerLinks.Offres)
- Modify: `components/sections/TrustBar.tsx:117-124` (CTA links in pillar cards)

**Step 1: Update Navbar links**

Change navLinks:
```ts
const navLinks = [
  { name: "Sales", href: "/sales" },
  { name: "AI & Auto", href: "/ia" },
  { name: "Ressources", href: "/ressources" },
];
```

**Step 2: Update Footer links**

Change footerLinks.Offres:
```ts
Offres: [
  { name: "Sales", href: "/sales" },
  { name: "AI & Automation", href: "/ia" },
  { name: "Contact", href: "/#contact" },
],
```

**Step 3: Update TrustBar pillar links**

Change the `href="#contact"` link in each pillar card to point to the dedicated page:
```tsx
<Link
  href={`/${pillar.id === "ai" ? "ia" : pillar.id}`}
  className="group/link inline-flex items-center gap-2 text-[13px] font-semibold transition-all"
  style={{ color: pillar.accent }}
>
  En savoir plus
  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
</Link>
```

**Step 4: Verify build**

Run: `cd C:\Users\abrah\challengerslab-v2 && npx next build 2>&1 | tail -20`

**Step 5: Commit**

```bash
git add components/layout/Navbar.tsx components/layout/Footer.tsx components/sections/TrustBar.tsx
git commit -m "feat: update nav links to point to /sales and /ia pages"
```

---

### Task 13: Update sitemap

**Files:**
- Modify: `app/sitemap.ts`

**Step 1: Add /sales and /ia routes to sitemap**

Add entries with priority 0.9 (high, just below homepage).

**Step 2: Verify build**

Run: `cd C:\Users\abrah\challengerslab-v2 && npx next build 2>&1 | tail -20`

**Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: add /sales and /ia to sitemap"
```

---

### Task 14: Visual QA and polish

**Step 1: Start dev server and check both pages**

Run: `cd C:\Users\abrah\challengerslab-v2 && npm run dev`

Check:
- `/sales` renders all 8 sections correctly
- `/ia` renders all 8 sections correctly
- Nav links work (no more /#sales, /#ai)
- TrustBar "En savoir plus" links to /sales and /ia
- Footer links work
- Mobile menu links work
- Scroll animations work on both pages
- Orb colors match BU accent

**Step 2: Fix any visual issues found**

**Step 3: Final commit**

```bash
git add -A
git commit -m "fix: visual polish for Sales and IA pages"
```
