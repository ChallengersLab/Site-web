# Repositionnement ChallengersLab — MVP SaaS Founders

**Date:** 2026-04-11
**Approche:** Refonte chirurgicale (copy uniquement, design intact)
**Statut:** Approuvé en brainstorming

---

## Contexte

ChallengersLab pivote de "Sales x IA pour PME B2B" vers un positionnement centré sur les fondateurs SaaS :

> On accompagne les fondateurs qui lancent leur SaaS a l'ere de l'IA : on construit votre MVP complet (app + site web optimise SEO/GEO), on automatise vos process, et on vous accompagne jusqu'aux premiers clients payants.

**Equipe :** 2 personnes, ton "on" partout.
**Charte graphique :** Inchangee (dark theme, Volt/Mint/Iris).
**3 piliers :** Build / Automate / Grow.

---

## Decisions cles

- **Ton :** "on" (equipe de 2), pas "je"
- **Automatisations :** Integrees au MVP + vendables separement (pilier a part entiere)
- **Grow :** SEO/GEO + accompagnement hands-on premieres ventes (coaching, process, outreach)
- **Page /offre :** Une seule page longue avec 3 piliers en scroll (fusion /sales + /ia)
- **Articles :** Garder "Prospection B2B + IA" et "Make vs n8n vs Zapier", retirer "Challenger Sales"
- **Nav :** Accueil - Offre - Realisations - Ressources - Contact
- **Lisibilite :** Attention au contraste des couleurs (jaune Volt notamment), pas de blanc pur systematique

---

## Section 1 — Hero (Hero.tsx)

**Changement :** Copy uniquement. Video, layout, animations, glow button intacts.

| Element | Ancien | Nouveau |
|---------|--------|---------|
| Badge | Sales x IA -- Paris | MVP x Automatisation x Premiers clients -- Paris |
| Ligne 1 | Mieux vendre. | Votre meilleure idee |
| Ligne 2 | Builder plus vite. | merite d'exister. |
| Sous-titre | On structure vos ventes et on automatise vos process, on implemente et mesure, vous avancez. | On accompagne les fondateurs qui lancent leur SaaS a l'ere de l'IA : on construit votre MVP complet (app + site web optimise SEO/GEO), on automatise vos process, et on vous accompagne jusqu'aux premiers clients payants. |
| Tags verts (IA) | MVP - Process metier - Automatisation - CRM sur mesure | MVP App - Site SEO/GEO - Automatisations |
| Tags jaunes (Sales) | Coaching commercial B2B - Strategie GTM - Playbook scaling | Acquisition - Premiers clients - SEO/GEO |
| CTA primaire | Parlons de votre projet | Concretiser mon idee |
| CTA secondaire | Voir la methode | Voir l'offre |
| Stats bar | 20+ entreprises accompagnees - <90j pour les premiers resultats - A la carte | X MVPs livres - <90j -> premiers clients - Build + Automate + Grow |

**Inchange :** Video de fond, layout, animations, gradients, responsive, glow button, "30 min - Gratuit - Sans engagement".

---

## Section 2 — Pain Points (Results.tsx)

**Changement :** Copy des 3 cartes uniquement. Layout, couleurs, animations intacts.

**Badge :** "Le constat" (inchange)
**Heading :** "Vous etes dans l'une de ces situations ?" (inchange)

### Carte 1 (Bleu #7C9EFF)
- **Ancien :** "Le bouche-a-oreille a ses limites"
- **Nouveau :** "Vous avez l'idee, mais pas le CTO"
- **Description :** Votre concept est solide, mais entre le prototype et un vrai produit, il y a un gouffre. Recruter un CTO coute cher et prend du temps. Vous avez besoin de quelqu'un qui build -- maintenant.

### Carte 2 (Jaune #EEFF66 -- attention lisibilite)
- **Ancien :** "Vous perdez des heures sur des taches evitables"
- **Nouveau :** "Vos process sont manuels et ne scalent pas"
- **Description :** Onboarding a la main, relances oubliees, donnees eparpillees. Vous passez plus de temps a gerer qu'a construire. Ce qui marchait a 10 utilisateurs explose a 100.
- **Note :** Ajuster le contraste du titre jaune pour la lisibilite.

### Carte 3 (Cyan #4ECBA0)
- **Ancien :** "Sales et tech ne parlent pas le meme langage"
- **Nouveau :** "Un site en ligne ne suffit pas -- il faut des clients"
- **Description :** Votre app est live, votre landing page est jolie, mais personne ne vient. Le SEO prend des mois, les ads coutent cher, et vous ne savez pas par ou commencer pour signer vos premiers payants.

**Inchange :** Layout 3 cartes, couleurs Bleu/Jaune/Cyan, animations, hover effects.

---

## Section 3 — Piliers (TrustBar.tsx)

**Changement :** Passe de 2 piliers a 3. Adaptation du composant pour 3 colonnes.

| Element | Ancien | Nouveau |
|---------|--------|---------|
| Badge | Nos deux piliers | Notre offre |
| Heading | Sales x IA : deux expertises, une seule equipe | De l'idee aux premiers revenus. Tout compris. |

### Pilier 1 — Build (Mint #4ECBA0)
- **Titre :** On construit votre MVP
- **Description :** Application sur mesure, site web optimise, propulse par l'IA. Du prototype au produit pret a vendre.
- **Features :** Application web / SaaS, Site vitrine haute conversion, Dashboards & interfaces metier, Integration IA (chatbots, generation)
- **CTA :** En savoir plus -> /offre#build

### Pilier 2 — Automate (Volt #EEFF66 -- attention lisibilite)
- **Titre :** On automatise vos process
- **Description :** Workflows intelligents, integrations, CRM. Vos taches repetitives tournent toutes seules.
- **Features :** Workflows (Make, n8n, Zapier), CRM & outils internes, Automatisation end-to-end, Prompt engineering & IA
- **CTA :** En savoir plus -> /offre#automate

### Pilier 3 — Grow (Iris #7C9EFF)
- **Titre :** On vous amene vos premiers clients
- **Description :** SEO/GEO, strategie d'acquisition, accompagnement hands-on jusqu'aux premieres ventes.
- **Features :** SEO & GEO (IA search), Strategie d'acquisition, Coaching premieres ventes, Outreach & conversion
- **CTA :** En savoir plus -> /offre#grow

**Adaptation technique :** Passer le grid de 2 colonnes a 3. Conserver le style des cartes existant (bordures, radius, hover). Sur mobile, empiler verticalement.

**Inchange :** Style des cartes, animations, charte couleur.

---

## Section 4 — Methode (Method.tsx)

**Changement :** Copy uniquement. Layout timeline intact.

**Badge :** "Notre methode" (inchange)
**Heading :** "3 etapes. 90 jours. Des resultats." (inchange)
**Sous-texte :** "De l'idee au premier euro. Un process clair, des livrables concrets." (ancien: "Un process clair, des livrables concrets, du ROI des le depart.")
**CTA secondaire :** "Voir l'offre complete" -> /offre (ancien: "Auditez votre stack sales gratuitement" -> checklist)

### Etape 1 — Cadrage (Semaines 1-2)
- **Ancien :** Diagnostic / Roadmap priorisee
- **Nouveau :** Cadrage / Scope MVP + roadmap
- **Description :** On valide votre idee, on definit le MVP juste -- pas plus, pas moins. On mappe vos process et on identifie ce qu'on peut automatiser des le depart.

### Etape 2 — Construction (Semaines 3-10)
- **Ancien :** Implementation / Systemes operationnels
- **Nouveau :** Construction / MVP + site + automatisations
- **Description :** On build votre app, votre site optimise SEO/GEO, et vos workflows automatises. Propulse par l'IA, teste avec de vrais utilisateurs.

### Etape 3 — Premiers clients (Semaine 10+)
- **Ancien :** Optimisation / Croissance mesurable
- **Nouveau :** Premiers clients / Revenue + clients payants
- **Description :** SEO/GEO en place, strategie d'acquisition lancee, accompagnement hands-on sur vos premieres ventes. On ne part pas tant que ca ne rapporte pas.

**Inchange :** Layout timeline, animations, structure du composant.

---

## Section 5 — FinalCTA (FinalCTA.tsx)

**Changement :** Aucun. Le formulaire et le copy restent pertinents.

**Inchange :** Heading, sous-texte, formulaire, Calendly, "Gratuit - Sans engagement".

---

## Section 6 — Navigation (Navbar.tsx)

| Ancien | Nouveau |
|--------|---------|
| Accueil - Sales - AI & Auto - Ressources - Contact | Accueil - Offre - Realisations - Ressources - Contact |

**Note :** "Realisations" pointe vers une page future. Peut etre masque en attendant du contenu, ou afficher un placeholder.

---

## Section 7 — Footer (Footer.tsx)

| Element | Ancien | Nouveau |
|---------|--------|---------|
| Tagline | Sales x IA pour les PME B2B. Paris, France. | De l'idee aux premiers revenus. Paris, France. |
| Section Offres | Sales, AI & Automation, Contact | Offre, Contact |
| Section Ressources | All articles, Prospection B2B, Challenger Sales, Make vs n8n, Agency guide | Tous les articles, Prospection B2B + IA, Make vs n8n vs Zapier |

---

## Section 8 — Marquee Banner (MarqueeBanner.tsx)

**Changement :** Reorganiser les outils par pilier. Retirer les outils purement sales (Lemlist, La Growth Machine, etc.).

**Garder :** Next.js, SvelteKit, Supabase, Vercel, Stripe, Make, n8n, Zapier, OpenAI, Claude, Mistral, Retool, Airtable, HubSpot, Notion.
**Retirer :** Lemlist, La Growth Machine, Apollo.io, Dropcontact, Modjo, Clay.
**Label :** "Les outils qu'on maitrise" (inchange).

---

## Nouvelle page — /offre

**Structure :** Page longue avec 3 sections ancrees.

1. **Hero /offre** — Heading + sous-texte + 3 piliers resumes
2. **#build** — Detail du pilier Build (reutiliser le layout bento grid de /ia)
3. **#automate** — Detail du pilier Automate (reutiliser le layout bento grid de /ia)
4. **#grow** — Detail du pilier Grow (nouveau contenu, meme layout)
5. **CTA final** — Reutiliser le composant FinalCTA

**Meta SEO /offre :**
- Title : "Offre -- MVP SaaS, Automatisations & Premiers Clients | ChallengersLab"
- Description : "On construit votre MVP, on automatise vos process, et on vous accompagne jusqu'aux premiers clients payants. Decouvrez notre offre complete."

---

## Redirections

- `/sales` -> 301 -> `/offre#grow`
- `/ia` -> 301 -> `/offre#build`

---

## Meta SEO (page d'accueil)

| Element | Ancien | Nouveau |
|---------|--------|---------|
| Title | ChallengersLab -- Sales x IA pour PME B2B | ChallengersLab -- MVP SaaS, Automatisations & Premiers Clients |
| Description | On structure vos ventes et on automatise vos process... | On accompagne les fondateurs qui lancent leur SaaS a l'ere de l'IA : MVP complet, automatisations, et accompagnement jusqu'aux premiers clients payants. |

---

## Articles

- **Garder :** "Prospection B2B en 2026 : le guide complet pour integrer l'IA"
- **Garder :** "Automatiser son CRM avec l'IA : Make, n8n ou Zapier ?"
- **Retirer :** "Challenger Sales : pourquoi cette methode ecrase les autres en B2B"

---

## Contraintes techniques

- **Lisibilite :** Ajuster le contraste des couleurs Volt (#EEFF66) sur fond sombre. Ne pas utiliser de blanc pur systematique -- suivre les nuances existantes dans la charte.
- **TrustBar :** Adapter le grid de 2 a 3 colonnes (seul changement structurel).
- **Responsive :** Verifier que les 3 piliers s'empilent correctement sur mobile.
- **Pas de refonte de composants** : On reutilise Hero.tsx, Results.tsx, TrustBar.tsx, Method.tsx, FinalCTA.tsx, Navbar.tsx, Footer.tsx, MarqueeBanner.tsx tels quels.
