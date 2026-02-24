# Hero Video Remotion — "Le diagnostic brutal"

**Date:** 2026-02-24
**Status:** Approved

## Context

Le Hero de la homepage a un placeholder "Video a venir" (glass-card aspect-video, cote droit du two-column layout). L'objectif est de creer une video Remotion qui remplace ce placeholder. La video doit parler a l'intelligence d'un fondateur B2B, illustrer les douleurs et l'USP de ChallengersLab.

## Specs techniques

| Param | Valeur |
|-------|--------|
| Duree | ~25s (750 frames @ 30fps) |
| Resolution | 1920x1080 (16:9, aspect-video du Hero) |
| Format export | WebM (primaire) + MP4 (fallback) |
| Loop | Oui — la fin fond vers le noir du debut |
| Audio | Aucun (autoplay muted dans le Hero) |

## Palette (reprise du design system)

- **Fond** : `#0A0A0F` (bg du site)
- **Texte principal** : `#FFFFFF`
- **Accent purple** : `#7B5EFF` (BU Sales)
- **Accent cyan** : `#00F5FF` (BU IA)
- **Gradient text** : linear `#7B5EFF` -> `#00F5FF`
- **Gris terminal** : `#888888` (texte tape)

## Typographie

- **Terminal/diagnostic** : `JetBrains Mono` ou monospace systeme (Acte 1)
- **Headlines** : `Instrument Serif` (font-display du site)
- **Corps** : `DM Sans` (font du site)

## Scenario valide

### Acte 1 — Le miroir (0-8s)

Le fondateur se reconnait. Pas de faux chiffres, pas de stats inventees. Deux phrases qui nomment sa realite.

```
[0-3s]    Typewriter, monospace, gris #888 :
          "Les bons elements, vous les avez."

[3-8s]    Fade-in, blanc pur, plus grand :
          "Le playbook pour les faire performer, non."

          Pause 1s apres apparition — laisser le poids s'installer.
```

### Acte 2 — La rupture (8-12s)

Le pivot emotionnel. On soulage avant de recadrer.

```
[8-9.5s]  Glitch/distorsion sur le texte de l'Acte 1
          (chromatic aberration, decalage RGB, lignes de scan)

[9.5-12s] Fond noir. Texte blanc pur, Instrument Serif, grande taille :
          "Le probleme, c'est pas votre equipe."

          Apparition nette (opacity 0->1, leger scale)
          Debut de lueur orbe tres subtile en fond
```

### Acte 3 — La reponse (12-20s)

Ce que ChallengersLab apporte. Resultats, pas outils. Methode, pas jargon.

```
[12-14s]  Les orbes ChallengersLab se forment :
          - Orbe purple (#7B5EFF, blur 80px) depuis la gauche
          - Orbe cyan (#00F5FF, blur 80px) depuis la droite
          - Grille hero-grid apparait en fondu

          Texte Instrument Serif : "Ce qu'on livre :"

[14-16s]  Split-screen apparait
          Gauche (lueur purple) : "Un process de vente reproductible."
          Droite (lueur cyan)  : "Des automatisations qui tiennent."

          Separateur central : ligne fine gradient purple->cyan

[16-20s]  Le split fusionne vers le centre
          Texte gradient : "Vos equipes performent. Votre croissance accelere."

          Pause 1s
```

### Acte 4 — La promesse (20-25s)

La baseline. On ferme la boucle.

```
[20-23.5s] Orbes en fond, grille subtile
           Instrument Serif :
           "On ne vend pas des missions."
           gradient-text, italic :
           "On resout vos problemes."

[23.5-25s] Fondu progressif vers noir
           -> retour seamless au frame 1
```

## Effets techniques Remotion

| Effet | Implementation |
|-------|---------------|
| Typewriter | `interpolate()` sur le nombre de caracteres affiches |
| Glitch | Composant custom : chromatic aberration via layers R/G/B decales + noise overlay |
| Orbes | Divs avec `radial-gradient` + `blur(80px)` + `interpolate()` pour position/opacity |
| Grille | CSS grid identique au `hero-grid` du site |
| Fade transitions | `spring()` ou `interpolate()` avec easing |
| Split-screen | Deux containers animes avec `translateX` + clip-path |

## Integration dans le Hero

Le placeholder actuel dans `components/sections/Hero.tsx` :

```tsx
<div className="glass-card aspect-video w-full rounded-2xl overflow-hidden">
  <div className="flex h-full items-center justify-center">
    <p className="text-[13px] text-white/15">Video a venir</p>
  </div>
</div>
```

Sera remplace par :

```tsx
<div className="glass-card aspect-video w-full rounded-2xl overflow-hidden">
  <video autoPlay muted loop playsInline className="w-full h-full object-cover">
    <source src="/videos/hero-diagnostic.webm" type="video/webm" />
    <source src="/videos/hero-diagnostic.mp4" type="video/mp4" />
  </video>
</div>
```

## Structure projet Remotion

```
remotion/
  src/
    Root.tsx              — entry point, composition declaration
    HeroDiagnostic/
      index.tsx           — composition principale (~750 frames, 30fps)
      scenes/
        Act1Mirror.tsx    — typewriter + diagnostic text
        Act2Rupture.tsx   — glitch + pivot text
        Act3Response.tsx  — orbes + split-screen + resultats
        Act4Promise.tsx   — baseline + fade to black
      components/
        Typewriter.tsx    — effet typewriter reutilisable
        GlitchEffect.tsx  — chromatic aberration + noise
        Orb.tsx           — orbe gradient animee
        GridOverlay.tsx   — grille hero-grid
        GradientText.tsx  — texte avec gradient purple->cyan
        SplitScreen.tsx   — layout split anime
  remotion.config.ts
  package.json
```

## Decisions

- **Pas de visages** : motion graphics pur, texte + formes
- **Pas de musique** : autoplay muted, la video doit fonctionner silencieuse
- **Pas de faux chiffres** : toutes les phrases sont des verites, pas des stats inventees
- **Loop seamless** : le dernier frame fond vers le noir du premier frame
- **Meme design tokens** : couleurs, typos, effets du site reutilises dans la video
- **Projet Remotion separe** : dans un dossier `remotion/` a la racine, exporte vers `public/videos/`
