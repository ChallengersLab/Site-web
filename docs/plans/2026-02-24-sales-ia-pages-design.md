# Pages /sales et /ia - Design Document

**Date:** 2026-02-24
**Status:** Approved

## Context

ChallengersLab est structuré en deux BU :
- **BU Sales** (Abdelhay Bekkali) : prospection externalisée, DIR CO fractionné
- **BU IA & Automatisation** (Abraham Brakha) : sites IA, apps no-code, workflows automatisés

Actuellement, ces deux piliers sont présentés comme des ancres sur la homepage (`/#sales`, `/#ai`) dans le TrustBar. L'objectif est de créer deux pages dédiées complètes à `/sales` et `/ia`.

## Decisions

- **URLs** : `/sales` et `/ia` (flat, direct, mémorable)
- **CTA** : Calendly distinct par BU (placeholder pour l'instant)
- **Cas clients** : placeholder, à remplir plus tard
- **Directeurs BU** : apparaissent avec photo + bio courte
- **Cible** : PME/Scale-ups B2B (même cible pour les deux BU)
- **Design** : même structure miroir, couleur dominante différente

## Visual Identity per BU

| | Page Sales | Page IA & Auto |
|---|---|---|
| Couleur dominante | `#7B5EFF` (purple) | `#00F5FF` (cyan) |
| Directeur | Abdelhay Bekkali | Abraham Brakha |
| Calendly CTA | Placeholder (Abdelhay) | Placeholder (Abraham) |
| Badge | "Sales" | "IA & Automatisation" |

## Page Structure (mirrored for both pages)

### 1. Hero

- Badge coloré dans la couleur BU (ex: "Sales" / "IA & Automatisation")
- Headline en Instrument Serif avec `gradient-text` dans la couleur BU
  - Sales : "Vos ventes méritent mieux qu'un CRM mal configuré"
  - IA : "Automatisez ce que vos concurrents font encore à la main"
- Sous-titre (2 lignes max, DM Sans, text-muted)
- CTA principal `.btn-glow` + texte preuve ("Gratuit · Sans engagement")
- Background : orbes flottants dans la couleur BU + grid subtil

### 2. Pain Points (3 TiltCards)

3 problèmes concrets que la cible vit au quotidien. Layout identique à la section Results de la homepage (1 grande card + 2 empilées).

**Sales :**
1. "Vos commerciaux passent plus de temps sur le CRM que face aux clients"
2. "Votre prospection dépend encore du bouche-à-oreille"
3. "Vous n'avez pas de process de vente reproductible"

**IA :**
1. "Vous faites manuellement ce que l'IA fait en 3 secondes"
2. "Vos outils ne se parlent pas entre eux"
3. "Vous payez des devs pour des apps que le no-code livre en 48h"

### 3. Services détaillés (glass-cards)

Cartes avec icône lucide-react, titre, description, liste de deliverables.

**Sales (2 services principaux + 2 complémentaires) :**
- **Prospection externalisée multicanal** : cold call, email, LinkedIn. Pipeline qualifié livré.
- **Head of Sales fractionné** : direction commerciale sans embaucher. Stratégie, management, coaching.
- Coaching Challenger Sales
- Setup CRM & cycle de vente

**IA (2 services principaux + 2 complémentaires) :**
- **Sites & interfaces IA** : sites web, dashboards, interfaces métier. Live en 48h.
- **Applications métier automatisées** : apps no-code (Bubble, FlutterFlow, Retool). Connectées à votre stack.
- Prompt engineering & intégration IA
- Workflows automatisés (Make, n8n, Zapier)

### 4. Méthodologie (3 étapes, timeline)

Même pattern que Method de la homepage (sticky left + cards right). Adapté à chaque BU.

**Sales :**
1. **Audit** (Sem 1-2) : analyse pipeline, stack, process, équipe
2. **Déploiement** (Sem 3-10) : lancement prospection, setup CRM, coaching
3. **Optimisation** (Sem 10+) : itération, scaling, formation équipe

**IA :**
1. **Diagnostic** (Sem 1-2) : cartographie process, identification automatisations, audit stack
2. **Build** (Sem 3-10) : développement interfaces, workflows, intégrations IA
3. **Scale** (Sem 10+) : monitoring, optimisation, formation utilisateurs

### 5. Votre interlocuteur (section directeur BU)

Section avec fond glass-card, layout horizontal (photo à gauche, contenu à droite).

**Abdelhay Bekkali (Sales) :**
- Titre : "Directeur BU Sales"
- Bio : Ex-Head of Sales Receipt Bank (premier commercial, a monté l'équipe). Co-fondateur Qaal. Master 2 Ingénierie Commerciale (Sup de Vente). 10+ ans dans le closing B2B.
- Photo : placeholder (rond, bordure purple)

**Abraham Brakha (IA) :**
- Titre : "Directeur BU IA & Automatisation"
- Bio : 20 ans d'expertise technique et commerciale. Background en psychologie de la décision. Spécialiste IA appliquée au business B2B.
- Photo : placeholder (rond, bordure cyan)

### 6. Témoignages (placeholder)

2 cartes de témoignage par page. Structure identique à Testimonials de la homepage. Contenu placeholder.

### 7. Ressources liées

2-3 articles de `/ressources` filtrés par catégorie. Pattern RessourcesPreview.

- Sales : articles tagués "Sales" (prospection B2B, Challenger Sales, etc.)
- IA : articles tagués "IA & Auto" (Make vs n8n, automatisation CRM, etc.)

### 8. CTA final

Même pattern que FinalCTA de la homepage. Couleur orbes = couleur BU. CTA vers le Calendly du directeur de BU (placeholder href).

## Navigation Changes

- Navbar : `/#sales` → `/sales`, `/#ai` → `/ia`
- TrustBar homepage : ajouter lien "En savoir plus →" sur chaque pillar card vers `/sales` et `/ia`
- Footer : mettre à jour les liens Offres pour pointer vers les nouvelles pages

## Component Strategy

### New components to create:
- `app/sales/page.tsx` - Page Sales (server component, metadata, JSON-LD)
- `app/ia/page.tsx` - Page IA (server component, metadata, JSON-LD)
- `components/sections/ServicePageHero.tsx` - Hero réutilisable paramétré par couleur/contenu
- `components/sections/PainPoints.tsx` - Section pain points paramétrable
- `components/sections/ServicesDetail.tsx` - Cartes services détaillées
- `components/sections/BUMethodology.tsx` - Timeline méthodologie par BU
- `components/sections/TeamMember.tsx` - Section directeur BU
- `components/sections/BUTestimonials.tsx` - Témoignages par BU (placeholder)

### Components to modify:
- `components/layout/Navbar.tsx` - Liens /#sales → /sales, /#ai → /ia
- `components/sections/TrustBar.tsx` - Ajouter "En savoir plus →" links
- `components/layout/Footer.tsx` - Mettre à jour liens offres

### Reused from homepage:
- `ScrollReveal` - animations scroll
- `TiltCard` - cartes 3D
- `RessourcesPreview` pattern (adapté pour filtrage par catégorie)
- `FinalCTA` pattern (adapté couleur BU)
- Design tokens : glass-card, btn-glow, gradient-text, orbes flottants

## SEO

Chaque page aura :
- Metadata unique (title, description, keywords)
- JSON-LD : Service schema + BreadcrumbList + FAQPage
- Canonical URL
- OpenGraph + Twitter cards
