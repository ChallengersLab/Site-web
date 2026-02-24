# TODO — Pages /sales et /ia v2 (Micro-sites immersifs)

**Status:** Task 1 done, Tasks 2-14 remaining
**Design doc:** `docs/plans/2026-02-24-bu-pages-v2-design.md`
**Implementation plan:** `docs/plans/2026-02-24-bu-pages-v2-implementation.md`

---

## Fait

- [x] **Task 1** — Suppression composants v1 (bu-config.ts, 8 composants template, app/sales/, app/ia/) — commit `3d7a406`
- [x] Nav/Footer/TrustBar déjà mis à jour (commit `572e54a`) : liens pointent vers /sales et /ia
- [x] Sitemap déjà mis à jour avec /sales et /ia

---

## Page /sales — L'univers d'Abdelhay

- [ ] **Task 2** — `components/sales/SalesHero.tsx`
  - Hero split 2 colonnes
  - Gauche : badge "Sales" purple, headline 3 lignes ("Premier commercial. Meilleur sales monde. Puis fondateur."), sous-titre bio Abdelhay, CTA "Parler à Abdelhay", proof text
  - Droite : TiltCard avec avatar placeholder + mini-timeline verticale parcours (Receipt Bank → Équipe Sales → Qaal → ChallengersLab)
  - Background : orbes purple + hero-grid
  - Animation : stagger + fadeUp (même pattern que Hero.tsx homepage)

- [ ] **Task 3** — `components/sales/SalesMetrics.tsx`
  - Section promesse de résultats (pas pain points)
  - section-divider, badge "Résultats", heading "Ce que nos clients obtiennent en 90 jours"
  - 4 stats CountUp dans glass-cards : +320% pipeline, ×3 RDV, <90j résultats, 0 recrutement
  - Utilise hook use-count-up.ts

- [ ] **Task 4** — `components/sales/SalesServices.tsx`
  - Layout accordéon expandable (PAS un grid de cards)
  - 2 services principaux cliquables qui s'ouvrent (AnimatePresence) : Prospection externalisée + Head of Sales fractionné
  - 2 services secondaires compacts : Coaching Challenger Sales + Setup CRM
  - Bordure gauche purple quand expanded, chevron qui tourne
  - Icons : Phone, BarChart3, Users, Settings

- [ ] **Task 5** — `components/sales/SalesMethod.tsx`
  - Timeline VERTICALE centrée (PAS le pattern sticky left/cards right de la homepage)
  - Ligne verticale glowing purple-to-cyan
  - 3 noeuds avec cercles lumineux, cards alternées gauche/droite (desktop), toutes à droite (mobile)
  - Étapes : Audit (sem 1-2) → Déploiement (sem 3-10) → Optimisation (sem 10+)

- [ ] **Task 6** — `components/sales/SalesProof.tsx`
  - Section compacte : 2 témoignages placeholder (TiltCard, metric badge purple) + 2 articles liés
  - Témoignages : Thomas M. (×3 pipeline), Sophie L. (+85% close rate)
  - Articles : prospection-b2b-ia-guide-complet, challenger-sales-methode-b2b

- [ ] **Task 6b** — `components/sales/SalesCTA.tsx`
  - CTA final personnel : "Réservez 30 min avec Abdelhay"
  - Orbes purple, parallax, même structure que FinalCTA.tsx
  - id="contact-sales"

- [ ] **Task 7** — Câblage page /sales
  - `app/sales/page.tsx` — server component, metadata SEO, JSON-LD (Service + BreadcrumbList + Person)
  - `app/sales/content.tsx` — "use client", compose : SalesHero → SalesMetrics → SalesServices → SalesMethod → SalesProof → SalesCTA → Footer
  - Vérifier build

---

## Page /ia — L'univers d'Abraham

- [ ] **Task 8** — `components/ia/IAHero.tsx`
  - Hero CENTRÉ plein écran (layout différent de Sales volontairement)
  - Badge cyan "IA & Automatisation", headline 2 lignes ("Formateur. COO. / Ingénieur IA."), sous-titre bio Abraham, CTA "Parler à Abraham"
  - **Terminal animé** en dessous : glass-card fond #0a0a0a, header avec 3 dots + "workflow.sh"
    - Lignes qui apparaissent une par une (typewriter) :
      ```
      $ cl connect --crm hubspot --source apollo
      ✓ Connecting CRM...                     done
      ✓ Enriching 247 leads with Clay...      done
      ✓ Building scoring model...             done
      ✓ Generating sequences (Claude)...      done
      ✓ Deploying dashboard...                live

      Pipeline ready. 247 leads scored. 3 workflows active.
      ```
  - Mini bio bar sous le terminal : avatar + nom + mini-timeline horizontale (Formation → COO → Automatisation → CL)
  - Background : orbes cyan + hero-grid

- [ ] **Task 9** — `components/ia/IABeforeAfter.tsx`
  - Comparatif visuel Avant/Après (PAS des métriques comme Sales)
  - 2 colonnes : gauche "Avant" (atténué, items barrés), droite "Après" (lumineux, check cyan)
  - Avant : 30 min saisie, 5 outils déconnectés, 6 mois dev, reporting approximatif
  - Après : 3 secondes, 1 workflow unifié, 48h no-code, dashboard temps réel
  - Animation : gauche d'abord, droite slide in avec delay

- [ ] **Task 10** — `components/ia/IAServices.tsx`
  - Layout BENTO grid asymétrique (PAS accordéon comme Sales)
  - Row 1 : grande card (2/3) "Sites & interfaces IA" + petite (1/3) "Workflows automatisés"
  - Row 2 : petite (1/3) "Prompt engineering" + grande (2/3) "Applications métier"
  - Grandes cards : deliverables list. Petites : description seule.
  - Icons : LayoutDashboard, Workflow, Bot, Zap

- [ ] **Task 11** — `components/ia/IAStack.tsx`
  - Grid de logos/noms d'outils (section unique à /ia)
  - Grid 3→4→6 colonnes responsive
  - 12 outils : Make, n8n, Zapier, Bubble, FlutterFlow, Retool, OpenAI, Claude, Mistral, Airtable, Notion, HubSpot
  - Chaque card : glass-card, emoji + nom, hover → bordure cyan glow + scale

- [ ] **Task 12** — `components/ia/IAProof.tsx`
  - Même pattern compact que SalesProof mais cyan
  - Témoignages : Marc K. (15h/semaine), Julie R. (10j delivery)
  - Articles : automatisation-crm-workflows-ia, roi-ia-ventes-b2b

- [ ] **Task 12b** — `components/ia/IACTA.tsx`
  - CTA final : "Réservez 30 min avec Abraham"
  - Orbes cyan, id="contact-ia"

- [ ] **Task 13** — Câblage page /ia
  - `app/ia/page.tsx` — metadata SEO, JSON-LD
  - `app/ia/content.tsx` — compose : IAHero → IABeforeAfter → IAServices → IAStack → IAProof → IACTA → Footer
  - Vérifier build

---

## Finalisation

- [ ] **Task 14** — Build final + vérification
  - Checker git log pour commits parallèles du user
  - Full build next.js
  - Vérifier nav links (Navbar, Footer, TrustBar)
  - Commit final si fixes nécessaires

---

## Contexte technique

- **Projet** : `C:\Users\abrah\challengerslab-v2`
- **Stack** : Next.js 16, React 19, Tailwind v4, Framer Motion, lucide-react
- **Design system** : glass-card, btn-glow, gradient-text, badge-glow, hero-grid, section-divider, float-orb
- **Composants réutilisables** : ScrollReveal, TiltCard, useCountUp
- **Pattern pages** : server component (page.tsx metadata) + client component (content.tsx rendu)
- **Couleurs** : Sales = #7B5EFF (purple), IA = #00F5FF (cyan)
- **Branch** : master
- **Dernier commit** : `3d7a406` (cleanup v1)

## Profils co-fondateurs

### Abdelhay Bekkali (Sales)
- Premier commercial Receipt Bank (UK) → meilleur sales monde → monté l'équipe
- CEO & Co-fondateur Qaal (fintech)
- Master 2 Ingénierie Commerciale (Sup de Vente)
- Spécialiste discovery, méthode Challenger Sales
- Co-fondateur ChallengersLab

### Abraham Brakha (IA)
- 4 ans formateur (étudiants, reconversion, marketing, écoles de commerce)
- Business Developer → COO startup
- 4 ans automatisations (Make, n8n, workflows)
- Ingénieur IA (formation continue)
- Co-fondateur ChallengersLab
