# Animation Cercle Vicieux / Cercle Vertueux — Design

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Animation cinématique courte (10-12s) illustrant la transformation d'un cercle vicieux en cercle vertueux, mappé aux deux BU de Challengers Lab (Sales + IA/Automatisation).

**Architecture:** Composition Remotion unique. Un cercle lumineux vit dans un espace 3D atmosphérique. Des mots-flash surgissent et disparaissent dans tout le frame — pas collés au cercle, ils flottent dans la profondeur comme des titres de film. Chaque pixel sert l'émotion et la compréhension.

**Tech Stack:** Remotion 4, React, SVG + CSS 3D transforms, springs physics.

---

## Concept narratif

L'animation raconte une histoire en 3 temps :

1. **Le cercle vicieux tourne** (0-4s) — Tout semble occupé mais rien n'avance. Ambiance pesante, rouge, oppressante.
2. **La rupture** (4-6s) — Le cercle éclate, un souffle traverse l'écran, les couleurs changent.
3. **Le cercle vertueux tourne** (6-12s) — Tout s'aligne, la croissance accélère. Ambiance lumineuse, cyan, énergisante.

## Les 4 nœuds du cercle

| Position | Cercle vicieux | Cercle vertueux |
|----------|---------------|-----------------|
| Haut | Tâches manuelles | Process automatisés |
| Droite | Prospection au hasard | Prospection structurée |
| Bas | Données en silo | Données qui circulent |
| Gauche | Croissance bloquée | Croissance composée |

**Mapping aux BU :**
- "Process automatisés" / "Tâches manuelles" → BU IA & Automatisation
- "Prospection structurée" / "Prospection au hasard" → BU Sales
- "Données qui circulent" / "Données en silo" → Les deux BU ensemble (le lien)
- "Croissance composée" / "Croissance bloquée" → Le résultat business

## Mots-flash cinématiques

Les mots ne sont PAS dans le cercle. Ils flottent dans tout le frame, à des tailles et profondeurs différentes, comme les mots-clés dans un générique de film ou une intro Netflix. Ils surgissent, persistent ~0.5s, et se dissolvent.

### Pendant le cercle vicieux (0-4s)
Mots en blanc, glow rouge-orangé diffus, typographie variable (40-72px). Ils apparaissent dans des zones périphériques autour du cercle, légèrement en perspective 3D (certains plus gros = proches, d'autres plus petits/flous = lointains).

- "Encore un tableur"
- "Relance manuelle"
- "Pas de suivi"
- "Aucune visibilité"
- "Réunion de plus"
- "Perdu dans le CRM"

**Animation :** Scale depuis 0.6 + légère rotation 3D → taille finale + face caméra, puis fade-out + scale down 0.9. Chaque mot a un léger motion blur (box-shadow qui trail).

### Pendant le cercle vertueux (6-12s)
Mots en blanc, glow cyan diffus, même mécanique mais plus vive, plus rapide.

- "Automatisé"
- "Pipeline clair"
- "Données en temps réel"
- "Relance intelligente"
- "Score prédictif"
- "Croissance visible"

## Direction visuelle cinématique

### Espace et profondeur
- **Fond :** Noir profond (#08080C) avec un très léger gradient radial (centre légèrement plus clair)
- **Grain cinéma :** Texture de grain subtil sur tout le frame (composant existant GrainTexture ou nouveau)
- **Particules atmosphériques :** Flottantes, très lentes, très peu opaques (0.03-0.08), comme de la poussière dans un faisceau de lumière
- **Le cercle vit dans un espace** — pas plaqué sur un fond plat. Il émet de la lumière qui réagit sur les particules environnantes.

### Lumière et glow
- **Le cercle EST une source de lumière.** Il émet un glow diffus (box-shadow multi-layered) qui colore l'atmosphère.
- **Vicieux :** Glow rouge sombre, pulsant irrégulièrement (comme un cœur qui bat trop vite). L'atmosphère est rouge-orangé.
- **Vertueux :** Glow cyan lumineux, pulsant régulièrement (calme, confiant). L'atmosphère est cyan-bleu.
- **Les nœuds ont un halo** quand le flux passe dessus — ils s'illuminent brièvement à chaque "tour".
- **Bloom effect** sur les éléments les plus lumineux (multi-layered box-shadow avec blur croissant)

### Le cercle lui-même
- **SVG circulaire** avec stroke animé (dash-offset qui tourne = flux visible)
- **Trait lumineux qui parcourt le cercle** — un arc plus brillant (~60° de large) tourne autour du cercle, illuminant chaque nœud à son passage
- **4 nœuds** positionnés à 0°, 90°, 180°, 270° — des capsules arrondies avec le texte, fond semi-transparent + border lumineuse
- **Vicieux :** Le trait lumineux avance par saccades, ralentit entre les nœuds, accélère soudainement — instable, imprévisible
- **Vertueux :** Le trait lumineux avance de manière fluide et constante, de plus en plus rapide — stable, puissant
- **Direction :** Sens horaire pour les deux (la direction ne change pas, c'est la qualité du mouvement qui change)

### Transition — "La rupture" (4-6s)
1. Le trait lumineux vicieux ralentit... s'arrête.
2. Le cercle pulse une fois violemment (scale 1→1.05→1, glow intensifié ×3)
3. Les connexions entre nœuds se fragmentent (dash-array qui s'écarte, morceaux qui flottent)
4. Flash de lumière blanc (3-4 frames, opacité 0→0.8→0)
5. Silence visuel — écran quasi-noir, 8-10 frames. Juste les particules.
6. Le cercle se reforme en cyan — le trait lumineux redémarre doucement
7. Les labels crossfade : texte vicieux fade-out, texte vertueux fade-in
8. Le rythme accélère progressivement

### Couleurs
- **Palette vicieuse :** #FF4444 (rouge), #FF6B35 (orangé), #FF8800 (ambre) — glow diffus
- **Palette vertueuse :** #00F5FF (cyan), #00D4AA (teal), #7B5EFF (purple accent) — glow diffus
- **Fond :** #08080C constant
- **Texte :** #FFFFFF toujours (les couleurs viennent des glows, pas du texte)

### Typographie
- **Labels des nœuds :** DM Sans Medium, 24-28px
- **Mots-flash :** DM Sans Bold, 40-72px (variable pour la profondeur)
- **Tout en blanc** — la couleur vient de l'éclairage ambiant, pas de la typo

## Structure technique (Remotion)

```
Composition: CircleAnimation
├── durationInFrames: 360 (12s × 30fps)
├── fps: 30
├── width: 1920
├── height: 1080
│
├── Layer 0: Background
│   ├── Solid #08080C
│   ├── RadialGradient (subtil, center)
│   └── GrainOverlay (noise texture, opacity 0.03)
│
├── Layer 1: Atmosphere
│   ├── ParticleField (count: 30, very slow, very faint)
│   └── AmbientGlow (orb coloré qui pulse, derrière le cercle)
│
├── Layer 2: Circle
│   ├── CircleRing (SVG, stroke animé, glow multi-layered)
│   ├── LightTracer (arc lumineux qui parcourt le cercle)
│   ├── NodeLabel ×4 (capsules avec texte, illumination au passage)
│   └── ConnectionFragments (seulement pendant la transition)
│
├── Layer 3: Flash Words
│   ├── FlashWord ×6 (vicieux, frames 15-120)
│   └── FlashWord ×6 (vertueux, frames 210-345)
│
└── Layer 4: Transition Effects
    ├── PulseEffect (frame ~130)
    ├── WhiteFlash (frames 140-144)
    └── BlackoutSilence (frames 144-155)
```

## Timing détaillé (30fps = 360 frames)

| Frames | Secondes | Événement |
|--------|----------|-----------|
| 0-10 | 0-0.3s | Fade-in du fond, particules apparaissent |
| 10-20 | 0.3-0.7s | Le cercle se dessine (stroke-dashoffset animation) |
| 20-30 | 0.7-1s | Les 4 nœuds vicieux apparaissent (staggered fade-in) |
| 30-120 | 1-4s | Cercle vicieux tourne, mots-flash négatifs surgissent (1 tous les ~15 frames) |
| 120-130 | 4-4.3s | Le trait lumineux ralentit, s'arrête |
| 130-135 | 4.3-4.5s | Pulse violent du cercle |
| 135-140 | 4.5-4.7s | Connexions se fragmentent |
| 140-144 | 4.7-4.8s | Flash blanc |
| 144-160 | 4.8-5.3s | Silence noir, juste particules |
| 160-180 | 5.3-6s | Cercle se reforme en cyan, labels crossfade |
| 180-345 | 6-11.5s | Cercle vertueux tourne (accélère), mots-flash positifs |
| 345-360 | 11.5-12s | Fade-out progressif |

## Ce que les gens comprennent

1. **"Je reconnais cette situation"** (0-4s) — Le cercle rouge qui tourne avec les mots "Encore un tableur", "Relance manuelle"... c'est leur quotidien. Les labels nomment précisément les douleurs.
2. **"Quelque chose change"** (4-6s) — La rupture est dramatique mais brève. Le silence crée la tension.
3. **"C'est comme ça que ça devrait marcher"** (6-12s) — Le même cercle, les mêmes 4 dimensions, mais tout est fluide. Les mots-flash positifs renforcent : "Automatisé", "Pipeline clair".
4. **Takeaway :** La différence n'est pas les gens (mêmes 4 nœuds) mais le système (les connexions et la direction).

## Fichiers à créer

### Nouveaux fichiers
- `remotion/src/CircleAnimation/index.tsx` — Composition principale, layering
- `remotion/src/CircleAnimation/config.ts` — Couleurs, timings, textes, positions
- `remotion/src/CircleAnimation/components/CircleRing.tsx` — SVG cercle + stroke animé + glow
- `remotion/src/CircleAnimation/components/LightTracer.tsx` — Arc lumineux parcourant le cercle
- `remotion/src/CircleAnimation/components/NodeLabel.tsx` — Capsule nœud avec texte + illumination
- `remotion/src/CircleAnimation/components/FlashWord.tsx` — Mot cinématique (3D scale, glow, fade)
- `remotion/src/CircleAnimation/components/AmbientGlow.tsx` — Orb lumineuse d'ambiance
- `remotion/src/CircleAnimation/components/GrainOverlay.tsx` — Texture grain cinéma
- `remotion/src/CircleAnimation/components/TransitionEffect.tsx` — Pulse + flash + blackout

### Fichiers à modifier
- `remotion/src/Root.tsx` — Ajouter la nouvelle Composition CircleAnimation
