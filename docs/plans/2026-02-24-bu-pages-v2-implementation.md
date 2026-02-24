# BU Pages v2 - Micro-sites immersifs Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace generic template BU pages with two immersive micro-sites centered on each co-founder, with unique layouts per page.

**Architecture:** Each BU page has its own set of components (components/sales/, components/ia/) with zero shared section components between them. Reuses only design-system primitives (ScrollReveal, TiltCard, glass-card, btn-glow). Each page is a server component (metadata) + client content component.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, Framer Motion, lucide-react

**Working directory:** `C:\Users\abrah\challengerslab-v2`

**Design doc:** `docs/plans/2026-02-24-bu-pages-v2-design.md`

---

### Task 1: Clean up v1 template components

**Files:**
- Delete: `lib/bu-config.ts`
- Delete: `components/sections/ServicePageHero.tsx`
- Delete: `components/sections/PainPoints.tsx`
- Delete: `components/sections/ServicesDetail.tsx`
- Delete: `components/sections/BUMethodology.tsx`
- Delete: `components/sections/TeamMember.tsx`
- Delete: `components/sections/BUTestimonials.tsx`
- Delete: `components/sections/BURessources.tsx`
- Delete: `components/sections/BUCTA.tsx`
- Delete: `app/sales/page.tsx`
- Delete: `app/sales/content.tsx`
- Delete: `app/ia/page.tsx`
- Delete: `app/ia/content.tsx`

**Step 1: Delete all v1 files**

```bash
rm lib/bu-config.ts
rm components/sections/ServicePageHero.tsx components/sections/PainPoints.tsx components/sections/ServicesDetail.tsx components/sections/BUMethodology.tsx components/sections/TeamMember.tsx components/sections/BUTestimonials.tsx components/sections/BURessources.tsx components/sections/BUCTA.tsx
rm -rf app/sales app/ia
```

**Step 2: Verify build still passes (no remaining imports)**

Run: `npx next build 2>&1 | tail -15`
Expected: Build succeeds (homepage + ressources still work)

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove v1 template BU components"
```

---

### Task 2: SalesHero — Split hero with founder timeline

**Files:**
- Create: `components/sales/SalesHero.tsx`

**Context:**
- Read `components/sections/Hero.tsx` for animation patterns (stagger, fadeUp, CountUpStat)
- Read `app/globals.css` for glass-card, btn-glow, badge-glow, gradient-text, hero-grid, float-orb classes
- Read `components/ui/ScrollReveal.tsx` and `components/ui/TiltCard.tsx` for reusable primitives

**Step 1: Create the component**

"use client". Two-column layout matching the homepage Hero refactored pattern (lg:flex-row, left 55%, right flex-1).

Left column (motion stagger + fadeUp):
- Badge: "Sales" with purple dot glow (`#7B5EFF`)
- Headline in Instrument Serif, 3 lines:
  - "Premier commercial." (white)
  - "Meilleur sales monde." (white)
  - "Puis fondateur." (gradient-text, em)
- Font size: `text-[clamp(2.2rem,5vw,4rem)]` leading-[0.95]
- Sub-copy (DM Sans, text-white/40, max-w-lg): "Abdelhay a fait le chemin complet : closer des deals chez Receipt Bank (UK), devenir #1 mondial, monter son équipe, puis créer sa boîte. Aujourd'hui, il met tout ça au service de la vôtre."
- CTA: `<a href="#contact-sales" className="btn-glow ...">Parler à Abdelhay <ArrowRight /></a>`
- Proof: "30 min · Gratuit · Sans engagement"

Right column (motion initial opacity 0, scale 0.95 → animate):
- TiltCard as container, intensity={4}
- Top: circular avatar placeholder (h-20 w-20 rounded-full, bg-gradient purple, initials "AB" white font-display)
- Below: vertical timeline with 4 nodes
- Timeline structure:
  - Vertical line: `w-px bg-gradient-to-b from-[#7B5EFF] to-transparent` in a relative container
  - Each node: `absolute` circle (h-3 w-3 rounded-full bg-[#7B5EFF] shadow-[0_0_12px_#7B5EFF]) + content to the right
  - Node content: company name (text-[13px] font-semibold text-white/80) + role (text-[12px] text-white/30)
  - 4 nodes:
    1. "Receipt Bank" — "Premier commercial → #1 mondial"
    2. "Équipe Sales" — "Recrutement, management, coaching"
    3. "Qaal" — "CEO & Co-fondateur"
    4. "ChallengersLab" — "Co-fondateur, Directeur BU Sales"
- Right column hidden on mobile (hidden lg:block)

Background: 2 orbs both #7B5EFF (same pattern as Hero.tsx), hero-grid overlay.
Section: min-h-screen, flex items-center, overflow-hidden.

**Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```bash
git add components/sales/SalesHero.tsx
git commit -m "feat(sales): add hero with founder timeline"
```

---

### Task 3: SalesMetrics — Promise metrics line

**Files:**
- Create: `components/sales/SalesMetrics.tsx`

**Context:**
- Read `hooks/use-count-up.ts` for the CountUp hook pattern
- Read Hero.tsx CountUpStat component for reference

**Step 1: Create the component**

"use client". Import useCountUp from hooks.

Layout:
- section with py-24 overflow-hidden
- section-divider at top (horizontal gradient line)
- Badge: "Résultats"
- Heading: "Ce que nos clients obtiennent" / `<em className="gradient-text">en 90 jours</em>`
- Grid of 4 stat cards (grid-cols-2 lg:grid-cols-4 gap-5)
- Each stat card: glass-card padding, CountUp number (font-display text-4xl md:text-5xl, color #7B5EFF), label below (text-[13px] text-white/30)
- Stats:
  1. prefix="+", end=320, suffix="%" — "Croissance pipeline"
  2. prefix="×", end=3, suffix="" — "RDV qualifiés"
  3. prefix="<", end=90, suffix="j" — "Premiers résultats"
  4. end=0, suffix="" — "Recrutement nécessaire" (just show "0" static, no animation needed)
- Below grid: `<p className="mt-8 text-center text-[14px] text-white/25">Pas de vanity metrics. Des résultats mesurables sur votre pipeline.</p>`

**Step 2: Commit**

```bash
git add components/sales/SalesMetrics.tsx
git commit -m "feat(sales): add promise metrics section"
```

---

### Task 4: SalesServices — Accordion expandable

**Files:**
- Create: `components/sales/SalesServices.tsx`

**Context:**
- Uses framer-motion AnimatePresence + motion.div for expand/collapse
- Uses TiltCard for the cards

**Step 1: Create the component**

"use client". Uses useState for expanded index.

Layout:
- Badge: "Ce qu'on fait"
- Heading: font-display, gradient-text on "Concrètement."
- Primary services (2): large expandable blocks
  - Default state: glass-card with icon box (h-10 w-10 rounded-xl, purple bg/border) + title (font-display text-xl) + short description (one line, text-white/35) + chevron icon right side
  - Expanded state: AnimatePresence, height auto animation. Shows full description + deliverables list (checkmark icon in purple + text-[13px] text-white/40) + purple left border (border-l-2)
  - Click/tap toggles. Only one expanded at a time.
  - Cursor pointer on hover
- Secondary services (2): compact row below (lg:grid-cols-2)
  - glass-card, smaller padding (p-6), icon box + title + short description. Not expandable.

Primary services data:
1. icon: Phone, title: "Prospection externalisée multicanal", shortDesc: "Cold call, email, LinkedIn. Pipeline qualifié, livré.", fullDesc: "On construit et opère votre machine de prospection. Sourcing intelligent, séquences multicanal personnalisées, qualification BANT systématique. Vous recevez des rendez-vous qualifiés dans votre CRM.", deliverables: ["Séquences multicanal personnalisées", "Qualification BANT systématique", "Reporting hebdomadaire", "Pipeline CRM alimenté"]
2. icon: BarChart3, title: "Head of Sales fractionné", shortDesc: "Direction commerciale sans le coût d'un CDI.", fullDesc: "Un directeur commercial senior qui connaît votre business, manage votre équipe, et structure votre croissance. Sans les charges d'un recrutement.", deliverables: ["Stratégie commerciale structurée", "Management de l'équipe sales", "Coaching individuel hebdomadaire", "KPIs et tableaux de bord"]

Secondary services data:
3. icon: Users, title: "Coaching Challenger Sales", desc: "Spécialiste discovery. Vos commerciaux apprennent à challenger, pas à supplier."
4. icon: Settings, title: "Setup CRM & cycle de vente", desc: "Configuration alignée sur votre cycle réel. Pipelines, automatisations, reporting."

**Step 2: Commit**

```bash
git add components/sales/SalesServices.tsx
git commit -m "feat(sales): add accordion services section"
```

---

### Task 5: SalesMethod — Vertical timeline

**Files:**
- Create: `components/sales/SalesMethod.tsx`

**Step 1: Create the component**

"use client". Vertical centered timeline.

Layout:
- section-divider at top
- Badge: "Notre méthode"
- Heading: "3 étapes. 90 jours." / gradient "Des résultats."
- Centered timeline container (max-w-3xl mx-auto mt-16):
  - Vertical line: absolute, left-1/2, w-px, h-full, bg-gradient-to-b from-[#7B5EFF] via-[#a78bfa] to-[#00F5FF], opacity-30
  - 3 step nodes, each with:
    - Circle on the line: absolute left-1/2 -translate-x-1/2, h-4 w-4 rounded-full, bg matching step accent, shadow glow
    - Card on alternating sides: odd steps → right side (ml-[calc(50%+2rem)]), even steps → left side (mr-[calc(50%+2rem)] text-right on heading)
    - Card content: TiltCard with step number (font-display text-5xl opacity-20 → opacity-60 on hover), phase name, timeline pill, description, deliverable badge
  - ScrollReveal on each step with staggered delay
  - On mobile: all cards on the right (line on left side), no alternation

Steps:
1. accent "#7B5EFF", number "01", phase "Audit", timeline "Semaines 1–2", desc "On audite votre pipeline, vos process, votre équipe. On identifie ce qui bloque et ce qui peut scaler.", deliverable "Diagnostic complet"
2. accent "#a78bfa", number "02", phase "Déploiement", timeline "Semaines 3–10", desc "On lance la prospection, on configure le CRM, on forme l'équipe. Chaque semaine, des résultats concrets.", deliverable "Machine sales opérationnelle"
3. accent "#00F5FF", number "03", phase "Optimisation", timeline "Semaine 10+", desc "On mesure, on itère, on scale. Taux de conversion, coût par lead, vélocité du pipeline. Zéro vanity metric.", deliverable "Croissance prévisible"

**Step 2: Commit**

```bash
git add components/sales/SalesMethod.tsx
git commit -m "feat(sales): add vertical timeline methodology"
```

---

### Task 6: SalesProof + SalesCTA

**Files:**
- Create: `components/sales/SalesProof.tsx`
- Create: `components/sales/SalesCTA.tsx`

**Step 1: SalesProof**

"use client". Compact section combining testimonials + related articles.

Layout:
- Badge: "Ils nous font confiance"
- 2 testimonial TiltCards (md:grid-cols-2)
  - Same pattern as Testimonials.tsx: metric badge (purple), blockquote, author
  - Testimonial 1: metric "×3", metricLabel "pipeline", quote "En 3 mois, notre pipeline a triplé. L'équipe ne vend pas du rêve, ils livrent.", name "Thomas M.", role "CEO, SaaS B2B", detail "45 collaborateurs"
  - Testimonial 2: metric "+85%", metricLabel "close rate", quote "Le coaching Challenger Sales a transformé notre approche. On ne vend plus pareil.", name "Sophie L.", role "Dir. Commerciale", detail "Scale-up fintech"
- Below: 2 article links (same pattern as RessourcesPreview cards but just 2, md:grid-cols-2)
  - Slugs: "prospection-b2b-ia-guide-complet", "challenger-sales-methode-b2b"
  - Import ressources from lib/ressources.ts, filter by slug

**Step 2: SalesCTA**

"use client". Personal CTA for Abdelhay.

Mirror FinalCTA.tsx structure but:
- Heading: "Réservez 30 min" / gradient "avec Abdelhay"
- Sub-copy: "On identifie ce qu'on peut faire pour vous — et surtout ce qu'on ne fera pas."
- CTA: "Parler à Abdelhay", href "#contact-sales"
- Proof: "Gratuit · Sans engagement"
- Both orbs use #7B5EFF only
- id="contact-sales" on section

**Step 3: Commit**

```bash
git add components/sales/SalesProof.tsx components/sales/SalesCTA.tsx
git commit -m "feat(sales): add proof section and personal CTA"
```

---

### Task 7: Wire up /sales page

**Files:**
- Create: `app/sales/page.tsx`
- Create: `app/sales/content.tsx`

**Step 1: app/sales/content.tsx**

"use client". Imports and composes:
```
SalesHero → SalesMetrics → SalesServices → SalesMethod → SalesProof → SalesCTA → Footer
```

**Step 2: app/sales/page.tsx**

Server component. Exports metadata (title, description, keywords, canonical /sales, openGraph). JSON-LD: Service schema + BreadcrumbList + Person (Abdelhay Bekkali). Renders `<SalesPageContent />`.

Metadata:
- title: "Prospection B2B & Direction Commerciale Externalisée | ChallengersLab"
- description: "Prospection externalisée multicanal, coaching Challenger Sales et Head of Sales fractionné. ChallengersLab structure vos ventes B2B pour des résultats mesurables en 90 jours."

**Step 3: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: /sales route listed

**Step 4: Commit**

```bash
git add app/sales/
git commit -m "feat(sales): wire up /sales page with all sections"
```

---

### Task 8: IAHero — Full-screen with animated terminal

**Files:**
- Create: `components/ia/IAHero.tsx`

**Context:**
- This hero is DIFFERENT from SalesHero: centered layout, no split columns
- Terminal animation uses framer-motion with staggered delays

**Step 1: Create the component**

"use client". Full-screen centered layout.

Top section (motion stagger + fadeUp):
- Badge: "IA & Automatisation" with cyan dot glow (#00F5FF)
- Headline centered, Instrument Serif:
  - "Formateur. COO." (white)
  - "Ingénieur IA." (gradient-text, em)
- Font size: `text-[clamp(2.5rem,6vw,5rem)]`, text-center
- Sub-copy centered (max-w-2xl mx-auto): "Abraham a formé des centaines de professionnels, opéré une startup de A à Z, et construit des systèmes d'automatisation depuis 4 ans. Il ne parle pas d'IA. Il la construit."
- CTA centered: "Parler à Abraham"
- Proof text centered

Terminal block (below CTA, mt-16, max-w-2xl mx-auto):
- glass-card with bg-[#0a0a0a], border cyan/10, rounded-2xl, overflow-hidden
- Header bar: h-10, bg-white/[0.03], border-b border-white/6, 3 dots (red #ff5f57, yellow #ffbd2e, green #27c93f, each h-2.5 w-2.5 rounded-full), title "workflow.sh" centered text-[11px] text-white/20
- Terminal body: p-6, font-mono text-[13px]
- Lines array with staggered animation (each line appears after previous):
  ```
  { prefix: "$ ", text: "cl connect --crm hubspot --source apollo", color: "text-white/60" }
  { prefix: "✓ ", text: "Connecting CRM...", suffix: "done", color: "text-white/30", suffixColor: "text-green-400" }
  { prefix: "✓ ", text: "Enriching 247 leads with Clay...", suffix: "done", color: "text-white/30", suffixColor: "text-green-400" }
  { prefix: "✓ ", text: "Building scoring model...", suffix: "done", color: "text-white/30", suffixColor: "text-green-400" }
  { prefix: "✓ ", text: "Generating sequences (Claude)...", suffix: "done", color: "text-white/30", suffixColor: "text-green-400" }
  { prefix: "✓ ", text: "Deploying dashboard...", suffix: "live", color: "text-white/30", suffixColor: "text-cyan-400" }
  { prefix: "", text: "", color: "text-transparent" }
  { prefix: "", text: "Pipeline ready. 247 leads scored. 3 workflows active.", color: "text-[#00F5FF]" }
  ```
- Each line: motion.div with initial={{ opacity: 0, x: -10 }}, animate={{ opacity: 1, x: 0 }}, transition={{ delay: 1.5 + i * 0.4, duration: 0.5 }}
- Suffix ("done"/"live") appears with additional 0.3s delay after the line

Below terminal (mt-12):
- Small bio bar centered: flex items-center gap-4
  - Avatar placeholder (h-12 w-12 rounded-full, cyan gradient, "AB" initials)
  - "Abraham Brakha · Co-fondateur & Directeur BU IA"
  - Mini horizontal timeline: 4 dots connected by a line, labels below (Formation → COO → Automatisation → CL), text-[10px] text-white/20

Background: 2 orbs #00F5FF, hero-grid.

**Step 2: Commit**

```bash
git add components/ia/IAHero.tsx
git commit -m "feat(ia): add hero with animated terminal"
```

---

### Task 9: IABeforeAfter — Visual comparison

**Files:**
- Create: `components/ia/IABeforeAfter.tsx`

**Step 1: Create the component**

"use client".

Layout:
- section-divider at top
- Badge: "Le déclic"
- Heading: "Avant." / gradient "Après."
- Grid 2 columns (lg:grid-cols-2, gap-5, mt-16):

Left card "Avant" (TiltCard, intensity 3):
- Header: "Avant" in text-white/20 uppercase tracking-wider text-[11px]
- 4 items, each:
  - flex items-center gap-3
  - X icon (lucide X or XCircle) in text-white/15
  - Text with line-through, text-white/20, text-[15px]
  - Items: "30 min de saisie manuelle", "5 outils déconnectés", "6 mois de développement", "Reporting approximatif"
- Overall: opacity-60, border more muted

Right card "Après" (TiltCard, intensity 5):
- Header: "Après" in cyan uppercase
- 4 items, each:
  - flex items-center gap-3
  - Check icon in #00F5FF
  - Text in text-white/70, text-[15px]
  - Items: "3 secondes, automatisé", "1 workflow unifié", "48h en no-code", "Dashboard temps réel"
- Border: subtle cyan glow (box-shadow on the TiltCard)
- Corner glow: absolute div with cyan blur (same hover pattern as TrustBar cards but always visible at opacity 20)

Animation: ScrollReveal on left card first, right card with delay 0.2.

**Step 2: Commit**

```bash
git add components/ia/IABeforeAfter.tsx
git commit -m "feat(ia): add before/after comparison section"
```

---

### Task 10: IAServices — Bento grid

**Files:**
- Create: `components/ia/IAServices.tsx`

**Step 1: Create the component**

"use client".

Layout:
- Badge: "Ce qu'on fait"
- Heading: gradient "Concrètement."
- Bento grid (mt-16):
  - Row 1: `grid grid-cols-1 lg:grid-cols-3 gap-5`
    - Card 1 (lg:col-span-2): "Sites & interfaces IA" — LARGE card
    - Card 2 (lg:col-span-1): "Workflows automatisés" — small card
  - Row 2: `grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5`
    - Card 3 (lg:col-span-1): "Prompt engineering & intégration IA" — small card
    - Card 4 (lg:col-span-2): "Applications métier" — LARGE card

Each card: TiltCard with:
- Hover corner glow (cyan, absolute, blur 50px)
- Icon box (same style: rounded-xl, cyan bg/border)
- Title (font-display, large cards text-xl, small cards text-lg)
- Description (text-[14px] text-white/35)
- Deliverables list on large cards only (Check icon cyan + text-[13px] text-white/40)

Service data:
1. (large) icon: LayoutDashboard, title: "Sites & interfaces IA", desc: "Sites web, dashboards, portails clients. Propulsés par l'IA, designés pour convertir. Live en 48h.", deliverables: ["Sites web nouvelle génération", "Dashboards temps réel", "Portails clients sur mesure", "Chatbots IA intégrés"]
2. (small) icon: Workflow, title: "Workflows automatisés", desc: "Make, n8n, Zapier. On connecte vos outils et on automatise vos process répétitifs."
3. (small) icon: Bot, title: "Prompt engineering & intégration IA", desc: "OpenAI, Claude, Mistral. On intègre l'IA là où elle a un vrai impact. Du ROI, pas du gadget."
4. (large) icon: Zap, title: "Applications métier", desc: "Apps no-code connectées à votre stack. Bubble, FlutterFlow, Retool. Fonctionnelles, scalables, maintenables.", deliverables: ["Applications métier sur mesure", "Intégrations API complètes", "Base de données structurée", "Formation utilisateurs"]

**Step 2: Commit**

```bash
git add components/ia/IAServices.tsx
git commit -m "feat(ia): add bento grid services section"
```

---

### Task 11: IAStack — Tools grid

**Files:**
- Create: `components/ia/IAStack.tsx`

**Step 1: Create the component**

"use client".

Layout:
- section-divider at top
- Badge: "Notre stack"
- Heading: "Les outils" / gradient "qu'on maîtrise"
- Grid: `grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-12`
- Each tool: glass-card, p-4, text-center, hover → border cyan glow + scale 1.02 transition
  - Tool name (text-[13px] font-medium text-white/50, hover text-white/80)
  - Optionally: small icon or emoji above the name (text-xl)

Tools array:
```
[
  { name: "Make", emoji: "⚡" },
  { name: "n8n", emoji: "🔗" },
  { name: "Zapier", emoji: "⚡" },
  { name: "Bubble", emoji: "🫧" },
  { name: "FlutterFlow", emoji: "📱" },
  { name: "Retool", emoji: "🛠" },
  { name: "OpenAI", emoji: "🤖" },
  { name: "Claude", emoji: "🧠" },
  { name: "Mistral", emoji: "🌀" },
  { name: "Airtable", emoji: "📊" },
  { name: "Notion", emoji: "📝" },
  { name: "HubSpot", emoji: "🎯" },
]
```

Each card is interactive: `group cursor-default` with `transition-all duration-300 hover:border-[#00F5FF]/20 hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] hover:scale-[1.02]`

**Step 2: Commit**

```bash
git add components/ia/IAStack.tsx
git commit -m "feat(ia): add tech stack grid section"
```

---

### Task 12: IAProof + IACTA

**Files:**
- Create: `components/ia/IAProof.tsx`
- Create: `components/ia/IACTA.tsx`

**Step 1: IAProof**

Same pattern as SalesProof but cyan accent.

Testimonials:
1. metric "15h", metricLabel "/ semaine", quote "L'automatisation qu'ils ont mise en place nous fait gagner 15h par semaine. Par personne.", name "Marc K.", role "COO, Agence digitale", detail "30 collaborateurs"
2. metric "10j", metricLabel "delivery", quote "Notre portail client est passé de maquette à production en 10 jours. Incroyable.", name "Julie R.", role "CEO, SaaS RH", detail "25 collaborateurs"

Article slugs: "automatisation-crm-workflows-ia", "roi-ia-ventes-b2b"

**Step 2: IACTA**

Same pattern as SalesCTA but cyan accent:
- Heading: "Réservez 30 min" / gradient "avec Abraham"
- CTA: "Parler à Abraham", href "#contact-ia"
- Orbs: #00F5FF
- id="contact-ia"

**Step 3: Commit**

```bash
git add components/ia/IAProof.tsx components/ia/IACTA.tsx
git commit -m "feat(ia): add proof section and personal CTA"
```

---

### Task 13: Wire up /ia page

**Files:**
- Create: `app/ia/page.tsx`
- Create: `app/ia/content.tsx`

**Step 1: content.tsx**

"use client". Composes:
```
IAHero → IABeforeAfter → IAServices → IAStack → IAProof → IACTA → Footer
```

**Step 2: page.tsx**

Server component. Metadata + JSON-LD (Service + BreadcrumbList + Person for Abraham).

Metadata:
- title: "IA & Automatisation pour PME B2B | Sites IA, No-Code, Workflows | ChallengersLab"
- description: "Sites IA, applications no-code, workflows automatisés et intégration IA. ChallengersLab connecte l'intelligence artificielle à votre business B2B. Résultats en 48h."

**Step 3: Verify full build**

Run: `npx next build 2>&1 | tail -20`
Expected: both /sales and /ia routes listed, 0 errors

**Step 4: Commit**

```bash
git add app/ia/
git commit -m "feat(ia): wire up /ia page with all sections"
```

---

### Task 14: Final build verification + cleanup

**Step 1: Check for any new commits from user**

Run: `git log --oneline -5`
Make sure we haven't overwritten any parallel changes.

**Step 2: Full build**

Run: `npx next build 2>&1 | tail -25`
Expected: all pages build, /sales and /ia present

**Step 3: Verify nav links still work**

Read Navbar.tsx and Footer.tsx to confirm /sales and /ia links are correct (they were updated in the earlier commit and should still be fine).

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: final polish for v2 BU pages"
```
