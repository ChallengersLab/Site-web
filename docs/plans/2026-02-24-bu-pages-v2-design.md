# Pages /sales et /ia v2 - Micro-sites immersifs

**Date:** 2026-02-24
**Status:** Approved
**Replaces:** 2026-02-24-sales-ia-pages-design.md (template approach, rejected)

## Concept

Chaque page BU est un **micro-site immersif** centré sur son co-fondateur. Pas un template paramétré. Deux expériences visuelles distinctes avec leur propre layout, leur propre rythme, leur propre personnalité.

La homepage reste intouchée. Les pages BU sont autonomes (un visiteur peut atterrir directement dessus).

## Cleanup

Supprimer les composants v1 (template approach) :
- `lib/bu-config.ts`
- `components/sections/ServicePageHero.tsx`
- `components/sections/PainPoints.tsx`
- `components/sections/ServicesDetail.tsx`
- `components/sections/BUMethodology.tsx`
- `components/sections/TeamMember.tsx`
- `components/sections/BUTestimonials.tsx`
- `components/sections/BURessources.tsx`
- `components/sections/BUCTA.tsx`
- `app/sales/page.tsx`, `app/sales/content.tsx`
- `app/ia/page.tsx`, `app/ia/content.tsx`

## Visual Identity

| | Page Sales | Page IA |
|---|---|---|
| Couleur dominante | `#7B5EFF` (purple) | `#00F5FF` (cyan) |
| Orbes, glow, accents | Tout purple | Tout cyan |
| Co-fondateur | Abdelhay Bekkali | Abraham Brakha |
| Layout hero | Split 2 colonnes (texte + timeline) | Plein écran + terminal animé |
| Section "proof" | Métriques CountUp | Before/After |
| Layout services | Accordéon / expandable | Bento grid asymétrique |
| Section unique | Timeline verticale (méthode) | Stack technique (logos outils) |

---

## Page /sales - L'univers d'Abdelhay

### Section 1 : Hero split — Le fondateur

Layout deux colonnes (même pattern que le hero homepage refacto).

**Gauche :**
- Badge purple : "Sales"
- Headline Instrument Serif : "Premier commercial." (blanc) / "Meilleur sales monde." (blanc) / "Puis fondateur." (gradient-text purple)
- Sous-titre DM Sans : "Abdelhay a fait le chemin complet : closer des deals chez Receipt Bank (UK), devenir #1 mondial, monter son équipe, puis créer sa boîte. Aujourd'hui, il met tout ça au service de la vôtre."
- CTA btn-glow : "Parler à Abdelhay" (placeholder href)
- Proof : "30 min · Gratuit · Sans engagement"

**Droite :**
- glass-card avec mini-timeline verticale du parcours :
  - Ligne verticale glowing purple connectant 4 noeuds
  - Noeud 1 : "Receipt Bank" — Premier commercial → #1 mondial
  - Noeud 2 : "Équipe Sales" — Recrutement, management, coaching
  - Noeud 3 : "Qaal" — CEO & Co-fondateur
  - Noeud 4 : "ChallengersLab" — Co-fondateur, Directeur BU Sales
  - Chaque noeud : petit cercle glowing + label bold + description muted
- Photo placeholder en haut de la card (rond, bordure purple glow)

Background : orbes purple, hero-grid.

### Section 2 : La promesse — Métriques

Pas des pain points. La promesse de résultats.

- Badge : "Résultats"
- Heading : "Ce que nos clients obtiennent" / gradient "en 90 jours"
- Ligne horizontale de 4 stats CountUp avec glow :
  - +320% pipeline
  - ×3 RDV qualifiés
  - <90j premiers résultats
  - 0 recrutement nécessaire
- Style : chaque stat dans un mini glass-card, bordure subtle, le chiffre en font-display grande taille dans la couleur accent
- Sous-texte : "Pas de vanity metrics. Des résultats mesurables sur votre pipeline."

### Section 3 : Services — Accordéon expandable

- Badge : "Ce qu'on fait"
- Heading : "Concrètement." (gradient)
- 2 services principaux : grands blocs cliquables/hoverable
  - Au repos : icône + titre + une ligne de description
  - Expanded : description complète + liste deliverables + CTA "En savoir plus"
  - Transition smooth (framer-motion AnimatePresence height auto)
  - Bordure gauche colorée purple quand expanded
- 2 services secondaires : ligne compacte en dessous (icône + titre + description courte, pas expandable)

Services :
1. **Prospection externalisée multicanal** (principal) — Cold call, email, LinkedIn. Pipeline qualifié, livré.
2. **Head of Sales fractionné** (principal) — Direction commerciale sans CDI. Stratégie, management, coaching.
3. **Coaching Challenger Sales** (secondaire) — Spécialiste discovery. Vos commerciaux apprennent à challenger.
4. **Setup CRM & cycle de vente** (secondaire) — Configuration alignée sur votre cycle réel.

### Section 4 : Méthode — Timeline verticale

Pas le pattern sticky left/cards right de la homepage.

- Badge : "Notre méthode"
- Heading : "3 étapes. 90 jours." / gradient "Des résultats."
- Timeline verticale centrée :
  - Ligne verticale glowing purple (gradient top to bottom, opacity fading)
  - 3 noeuds avec cercle lumineux
  - Cards alternées gauche/droite (odd left, even right)
  - Chaque card : TiltCard avec numéro, phase, timeline, description, deliverable badge

Étapes :
1. Audit (Sem 1-2) — Pipeline, process, équipe. Diagnostic complet.
2. Déploiement (Sem 3-10) — Prospection lancée, CRM configuré, équipe formée.
3. Optimisation (Sem 10+) — Mesure, itération, scaling. Croissance prévisible.

### Section 5 : Social proof compact

- 2 témoignages placeholder (même TiltCard pattern) en md:grid-cols-2
- 2 articles liés (prospection B2B, Challenger Sales)
- Compact, une seule section au lieu de deux

### Section 6 : CTA final

- Centré sur Abdelhay : "Réservez 30 min avec Abdelhay"
- Sous-texte personnel : "On identifie ce qu'on peut faire pour vous — et surtout ce qu'on ne fera pas."
- Orbes purple, parallax
- Proof text

---

## Page /ia - L'univers d'Abraham

### Section 1 : Hero plein écran + terminal

Layout centré (pas split comme Sales — différent volontairement).

**Centre :**
- Badge cyan : "IA & Automatisation"
- Headline Instrument Serif : "Formateur. COO." (blanc) / "Ingénieur IA." (gradient-text cyan)
- Sous-titre : "Abraham a formé des centaines de professionnels, opéré une startup de A à Z, et construit des systèmes d'automatisation depuis 4 ans. Il ne parle pas d'IA. Il la construit."
- CTA btn-glow : "Parler à Abraham" (placeholder href)
- Proof text

**En dessous du CTA :**
- Faux terminal animé (glass-card avec fond #0a0a0a, bordure cyan subtle) :
  - Header terminal : 3 dots (rouge/jaune/vert) + "workflow.sh"
  - Lignes qui apparaissent une par une (typewriter effect, framer-motion) :
    ```
    $ cl connect --crm hubspot --source apollo
    ✓ Connecting CRM...                          done
    ✓ Enriching 247 leads with Clay...           done
    ✓ Building scoring model...                  done
    ✓ Generating sequences (Claude)...           done
    ✓ Deploying dashboard...                     live

    Pipeline ready. 247 leads scored. 3 workflows active.
    ```
  - Chaque ligne apparaît avec un délai de ~400ms
  - Les "done" / "live" apparaissent en vert/cyan après un court délai

**Sous le terminal :**
- Mini bio card discrète : photo placeholder + "Abraham Brakha · Co-fondateur & Directeur BU IA" + mini-timeline horizontale (Formation → COO → Automatisation → ChallengersLab)

Background : orbes cyan, hero-grid.

### Section 2 : Before/After

Pas des métriques (c'est Sales). Un comparatif visuel.

- Badge : "Le déclic"
- Heading : "Avant." / gradient "Après."
- Layout 2 colonnes :

  **Gauche "Avant" :**
  - Fond plus sombre, opacité réduite, bordure gris
  - Items barrés ou atténués :
    - "30 min de saisie manuelle"
    - "5 outils déconnectés"
    - "6 mois de développement"
    - "Reporting approximatif"

  **Droite "Après" :**
  - Fond légèrement lumineux, bordure cyan glow
  - Items avec check cyan :
    - "3 secondes, automatisé"
    - "1 workflow unifié"
    - "48h en no-code"
    - "Dashboard temps réel"

- Animation : la colonne "Avant" est visible d'abord, puis "Après" slide/fade in avec un léger delay

### Section 3 : Services — Bento grid

Pas d'accordéon (c'est Sales). Layout bento asymétrique façon Linear.

- Badge : "Ce qu'on fait"
- Heading : "Concrètement." (gradient)
- Grid bento :
  - Row 1 : 1 grande card (2/3 width) + 1 card (1/3)
  - Row 2 : 1 card (1/3) + 1 card (2/3)
  - Chaque card : TiltCard avec icône, titre, description, deliverables
  - La grande card a un micro-visuel (pattern dots, ou mini schema workflow)

Services :
1. **Sites & interfaces IA** (grande) — Sites web, dashboards, portails clients. Live en 48h.
2. **Workflows automatisés** (petite) — Make, n8n, Zapier. On connecte vos outils.
3. **Prompt engineering & intégration IA** (petite) — OpenAI, Claude, Mistral. Du ROI, pas du gadget.
4. **Applications métier** (grande) — Apps no-code (Bubble, FlutterFlow, Retool). Fonctionnelles et scalables.

### Section 4 : Stack technique

Section unique à /ia (pas sur /sales).

- Badge : "Notre stack"
- Heading : "Les outils qu'on maîtrise"
- Grid de logos/noms d'outils dans des mini glass-cards :
  - Make, n8n, Zapier, Bubble, FlutterFlow, Retool, OpenAI, Claude, Mistral, Airtable, Notion, HubSpot
- Chaque card : hover → bordure cyan glow + scale légère
- Layout : grid 4-6 colonnes responsive
- Même vibe que le MarqueeBanner mais en grid statique avec interaction

### Section 5 : Social proof compact

- 2 témoignages placeholder + 2 articles liés (automatisation CRM, ROI IA)
- Même pattern compact que Sales

### Section 6 : CTA final

- "Réservez 30 min avec Abraham"
- Orbes cyan, parallax
- Personnel comme Sales

---

## Composants à créer

### Spécifiques Sales :
- `components/sales/SalesHero.tsx` — hero split avec timeline parcours
- `components/sales/SalesMetrics.tsx` — ligne de stats CountUp
- `components/sales/SalesServices.tsx` — accordéon expandable
- `components/sales/SalesMethod.tsx` — timeline verticale
- `components/sales/SalesProof.tsx` — témoignages + articles compact
- `components/sales/SalesCTA.tsx` — CTA final Abdelhay

### Spécifiques IA :
- `components/ia/IAHero.tsx` — hero centré + terminal animé
- `components/ia/IABeforeAfter.tsx` — comparatif visuel
- `components/ia/IAServices.tsx` — bento grid
- `components/ia/IAStack.tsx` — grid outils
- `components/ia/IAProof.tsx` — témoignages + articles compact
- `components/ia/IACTA.tsx` — CTA final Abraham

### Partagés (gardés du design system) :
- `ScrollReveal`, `TiltCard` — réutilisés
- `Footer` — réutilisé
- Design tokens : glass-card, btn-glow, gradient-text, badge-glow, orbes

### Pages :
- `app/sales/page.tsx` — metadata + JSON-LD
- `app/sales/content.tsx` — composition SalesHero → SalesCTA
- `app/ia/page.tsx` — metadata + JSON-LD
- `app/ia/content.tsx` — composition IAHero → IACTA

## SEO

Chaque page garde :
- Metadata unique (title, description, keywords)
- JSON-LD : Service + BreadcrumbList + Person (pour le co-fondateur)
- Canonical, OpenGraph, Twitter cards

## Co-fondateurs

### Abdelhay Bekkali
- Co-fondateur ChallengersLab, Directeur BU Sales
- Ex-Receipt Bank (UK) : premier commercial → meilleur sales monde → a monté l'équipe
- Co-fondateur & CEO de Qaal (fintech)
- Master 2 Ingénierie Commerciale (Sup de Vente)
- Spécialiste discovery, méthode Challenger Sales
- 10+ ans de closing B2B
- Peut être bras droit, dir co, ou monter une équipe from scratch

### Abraham Brakha
- Co-fondateur ChallengersLab, Directeur BU IA & Automatisation
- 4 ans de formation : étudiants, reconversion, marketing, écoles de commerce
- Business Developer → COO de startup
- 4 ans de pratique automatisations (Make, n8n, workflows)
- Ingénieur IA (formation continue, pas juste utilisateur)
- Double casquette business + tech
