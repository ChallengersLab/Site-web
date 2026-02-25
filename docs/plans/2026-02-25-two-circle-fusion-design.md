# Design : Animation "Deux Cercles → Fusion"

## Concept narratif

**Problème + Solution = Résultat**

- Cercle 1 (rouge) : le client coincé dans son cercle vicieux
- Cercle 2 (cyan) : ChallengersLab, la bonne méthode
- Fusion (doré) : les résultats de l'accompagnement

## Scène & Dimensions

- Canvas : 1920x1080, 30fps, 540 frames (18s)
- Cercle 1 rayon : 200px, centre initial (620, 540)
- Cercle 2 rayon : 200px, centre initial (1300, 540)
- Cercle fusionné rayon : 240px, centre (960, 540)

## Approche technique

**Slide horizontal** : les deux cercles glissent l'un vers l'autre, se chevauchent en Venn, puis fusionnent au centre.

## Timeline

| Phase | Frames | Durée | Action |
|-------|--------|-------|--------|
| 1. Cercle vicieux | 0-165 | 5.5s | Cercle 1 rouge apparaît, nodes + flash words douleurs |
| 2. Entrée méthode | 165-270 | 3.5s | Cercle 2 cyan apparaît à droite, nodes + flash words méthode |
| 3. Rapprochement | 270-360 | 3s | Les deux glissent vers le centre, moment Venn |
| 4. Fusion | 360-400 | 1.3s | Flash lumineux, un seul cercle doré émerge |
| 5. Bénéfices | 400-510 | 3.7s | Cercle doré pulse, bénéfices apparaissent |
| 6. Outro | 510-540 | 1s | Fade out |

## Phase 1 — Cercle vicieux (0-165)

- Frames 0-15 : fade in global
- Frames 15-35 : cercle 1 se dessine (stroke-dasharray), couleur `#FF4444`
- Frames 30-50 : 3 nodes (haut, bas, gauche) — "Tâches manuelles", "Données en silo", "Croissance bloquée"
- Frames 55-155 : 4 flash words positionnés en arc autour du cercle 1 (angle + offset radial)
- LightTracer rouge tourne avec easing **saccadé/jerky** — métaphore du cycle vicieux, on tourne en rond

### Flash words cercle 1
- "Encore un tableur" / "Relance manuelle" / "Pas de suivi" / "Aucune visibilité"
- Positionnés à 320-380px du centre (120-180px au-delà du bord du cercle)

## Phase 2 — Entrée méthode (165-270)

- Frames 165-185 : cercle 2 se dessine, couleur `#00F5FF`
- Frames 180-200 : 3 nodes — "Audit & Diagnostic", "Stratégie sur-mesure", "Automatisation IA"
- Frames 200-260 : 4 flash words autour du cercle 2
- LightTracer cyan tourne de manière **fluide** dès le départ — contraste avec le saccadé du cercle 1
- Cercle 1 reste visible, ses flash words ont disparu, ses nodes restent

### Flash words cercle 2
- "CRM optimisé" / "Playbook sales" / "Scoring IA" / "Process scalable"

## Phase 3 — Rapprochement (270-360)

- Cercle 1 : x=620 → x=960 (ease-in-out)
- Cercle 2 : x=1300 → x=960 (ease-in-out)
- Nodes des deux cercles fadeout pendant le slide
- Frames 310-340 : zone de chevauchement Venn brille (blend additif) — nouveau composant VennGlow
- Les deux LightTracers accélèrent pendant le rapprochement

## Phase 4 — Fusion (360-400)

- Frames 360-370 : pulse d'énergie (scale 1.0 → 1.15 → 1.0)
- Frames 365-375 : flash blanc (overlay 0 → 70% → 0)
- Frames 370-400 : les deux cercles deviennent un seul cercle doré `#FFD700` avec glow or
- Rayon fusionné : 240px (plus grand que chaque cercle individuel)
- Nouveau LightTracer doré, mouvement **fluide et accélérant** — cycle vertueux, momentum positif

## Phase 5 — Bénéfices (400-510)

### Nodes (4)
- "Visibilité totale" / "Équipe alignée" / "Process qui scale" / "Croissance prévisible"

### Flash words (4)
- "Pipeline structuré" / "Décisions data-driven" / "Revenue prévisible" / "Temps retrouvé"

- Cercle pulse doucement (glow breathing)
- Particules dorées flottent

## Phase 6 — Outro (510-540)

- Fade out global vers noir

## Circularité — élément clé

La circularité porte la métaphore :
- **Cercle 1 (vicieux)** : LightTracer jerky/saccadé — on est coincé, ça tourne en rond
- **Cercle 2 (méthode)** : LightTracer fluide — approche maîtrisée
- **Cercle fusionné** : LightTracer fluide + accélérant — cycle vertueux, chaque tour amplifie le précédent

## Composants conservés
- ParticleField (couleur s'adapte à la phase)
- GrainOverlay (toujours actif)
- AmbientGlow (rouge → cyan split → doré)

## Composants modifiés
- CircleRing : accepte `centerX`, `centerY` animés + couleur
- NodeLabel : positionné par angle relatif à un centre de référence
- FlashWord : positionné par angle + distance depuis un centre (plus de % écran)
- LightTracer : accepte un centre de référence
- TransitionEffect : flash + pulse (pas de blackout)

## Nouveau composant
- VennGlow : overlay additif dans la zone d'intersection pendant le rapprochement

## Couleurs

| Phase | Primaire | Glow |
|-------|----------|------|
| Vicieux | `#FF4444` | rouge |
| Méthode | `#00F5FF` | cyan |
| Fusionné | `#FFD700` | or |
