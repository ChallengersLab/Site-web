import type { LucideIcon } from "lucide-react";
import {
  Phone,
  Users,
  BarChart3,
  Settings,
  Bot,
  LayoutDashboard,
  Zap,
  Workflow,
  Clock,
  AlertTriangle,
  CreditCard,
} from "lucide-react";

// ---------------------------------------------------------------------------
// BUConfig – shared interface for Sales and IA business-unit pages
// ---------------------------------------------------------------------------

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
    photoPlaceholder: string;
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

// ---------------------------------------------------------------------------
// Sales BU
// ---------------------------------------------------------------------------

export const salesConfig: BUConfig = {
  id: "sales",
  slug: "sales",
  badge: "Sales",
  accent: "#7B5EFF",

  headline: "Votre pipeline ne se remplit pas tout seul",
  headlineGradient: "tout seul",
  subheadline:
    "Prospection externalisée, coaching Challenger Sales, direction commerciale fractionnée. On construit votre machine à pipeline.",

  ctaLabel: "Parler à Abdelhay",
  ctaHref: "#contact-sales",
  proofText: "30 min · Gratuit · Sans engagement",

  // -- Pain points --------------------------------------------------------
  painPoints: [
    {
      stat: "60%",
      statLabel: "du temps perdu",
      icon: Clock,
      title:
        "Vos commerciaux passent plus de temps sur le CRM que face aux clients",
      description:
        "Recherche de leads manuelle, qualification approximative, relances oubliées. Votre équipe mérite mieux.",
    },
    {
      stat: "0",
      statLabel: "process reproductible",
      icon: AlertTriangle,
      title: "Votre prospection dépend encore du bouche-à-oreille",
      description:
        "Pas de séquences, pas de playbook, pas de pipeline prévisible. La croissance est aléatoire.",
    },
    {
      stat: "73%",
      statLabel: "d'échec CRM",
      icon: CreditCard,
      title: "Vous n'avez pas de process de vente reproductible",
      description:
        "73% des implémentations CRM échouent. Le problème n'est pas l'outil, c'est la méthode.",
    },
  ],

  // -- Services -----------------------------------------------------------
  services: [
    {
      isPrimary: true,
      icon: Phone,
      title: "Prospection externalisée multicanal",
      description:
        "On construit et opère votre machine de prospection. Cold call, email, LinkedIn. Pipeline qualifié, livré.",
      deliverables: [
        "Séquences multicanal personnalisées",
        "Qualification BANT systématique",
        "Reporting hebdomadaire",
        "Pipeline CRM alimenté",
      ],
    },
    {
      isPrimary: true,
      icon: BarChart3,
      title: "Head of Sales fractionné",
      description:
        "Direction commerciale externalisée sans le coût d'un CDI. Stratégie, management, coaching d'équipe.",
      deliverables: [
        "Stratégie commerciale structurée",
        "Management de l'équipe sales",
        "Coaching individuel hebdomadaire",
        "KPIs et tableaux de bord",
      ],
    },
    {
      isPrimary: false,
      icon: Users,
      title: "Coaching Challenger Sales",
      description:
        "Formation à la méthode qui domine le B2B complexe. Vos commerciaux apprennent à challenger, pas à supplier.",
      deliverables: [
        "Formation équipe complète",
        "Mise en situation terrain",
        "Playbook personnalisé",
      ],
    },
    {
      isPrimary: false,
      icon: Settings,
      title: "Setup CRM & cycle de vente",
      description:
        "Configuration CRM alignée sur votre cycle de vente réel. Pipelines, automatisations, reporting.",
      deliverables: [
        "Audit et nettoyage CRM",
        "Configuration pipelines",
        "Automatisations clés",
      ],
    },
  ],

  // -- Methodology --------------------------------------------------------
  methodology: [
    {
      number: "01",
      phase: "Audit",
      timeline: "Semaines 1–2",
      description:
        "On audite votre pipeline, vos process, votre équipe. On identifie ce qui bloque et ce qui peut scaler.",
      deliverable: "Diagnostic complet",
      accent: "#7B5EFF",
    },
    {
      number: "02",
      phase: "Déploiement",
      timeline: "Semaines 3–10",
      description:
        "On lance la prospection, on configure le CRM, on forme l'équipe. Chaque semaine, des résultats concrets.",
      deliverable: "Machine sales opérationnelle",
      accent: "#a78bfa",
    },
    {
      number: "03",
      phase: "Optimisation",
      timeline: "Semaine 10+",
      description:
        "On mesure, on itère, on scale. Taux de conversion, coût par lead, vélocité du pipeline. Zéro vanity metric.",
      deliverable: "Croissance prévisible",
      accent: "#00F5FF",
    },
  ],

  // -- Director -----------------------------------------------------------
  director: {
    name: "Abdelhay Bekkali",
    title: "Directeur BU Sales",
    bio: "Ex-Head of Sales chez Receipt Bank — premier commercial, il a construit et dirigé l'équipe commerciale. Co-fondateur de Qaal (fintech). Master 2 en Ingénierie Commerciale. 10+ ans à closer des deals B2B complexes.",
    photoPlaceholder: "AB",
  },

  // -- Testimonials -------------------------------------------------------
  testimonials: [
    {
      quote:
        "En 3 mois, notre pipeline a triplé. L'équipe ne vend pas du rêve, ils livrent.",
      name: "Thomas M.",
      role: "CEO, SaaS B2B",
      detail: "45 collaborateurs",
      metric: "×3",
      metricLabel: "pipeline",
    },
    {
      quote:
        "Le coaching Challenger Sales a transformé notre approche. On ne vend plus pareil.",
      name: "Sophie L.",
      role: "Dir. Commerciale",
      detail: "Scale-up fintech",
      metric: "+85%",
      metricLabel: "close rate",
    },
  ],

  relatedArticleSlugs: [
    "prospection-b2b-ia-guide-complet",
    "challenger-sales-methode-b2b",
  ],

  // -- SEO ----------------------------------------------------------------
  seo: {
    title:
      "Prospection B2B & Direction Commerciale Externalisée | ChallengersLab",
    description:
      "Prospection externalisée multicanal, coaching Challenger Sales et Head of Sales fractionné. ChallengersLab structure vos ventes B2B pour des résultats mesurables en 90 jours.",
    keywords: [
      "prospection externalisée B2B",
      "head of sales fractionné",
      "coaching Challenger Sales",
      "direction commerciale externalisée",
      "agence prospection B2B Paris",
      "externalisation commerciale",
      "pipeline B2B",
    ],
  },
};

// ---------------------------------------------------------------------------
// IA & Automatisation BU
// ---------------------------------------------------------------------------

export const iaConfig: BUConfig = {
  id: "ia",
  slug: "ia",
  badge: "IA & Automatisation",
  accent: "#00F5FF",

  headline: "Automatisez ce que vos concurrents font encore à la main",
  headlineGradient: "à la main",
  subheadline:
    "Sites IA, applications métier, workflows automatisés. On connecte l'intelligence artificielle à votre business.",

  ctaLabel: "Parler à Abraham",
  ctaHref: "#contact-ia",
  proofText: "30 min · Gratuit · Sans engagement",

  // -- Pain points --------------------------------------------------------
  painPoints: [
    {
      stat: "3s",
      statLabel: "vs 30 min",
      icon: Clock,
      title: "Vous faites manuellement ce que l'IA fait en 3 secondes",
      description:
        "Saisie de données, reporting, qualification de leads. Chaque minute perdue est une minute offerte à vos concurrents.",
    },
    {
      stat: "5+",
      statLabel: "outils en silo",
      icon: AlertTriangle,
      title: "Vos outils ne se parlent pas entre eux",
      description:
        "CRM, email, facturation, support. Des copier-coller entre 5 outils. Zéro vision unifiée.",
    },
    {
      stat: "48h",
      statLabel: "pas 6 mois",
      icon: Zap,
      title:
        "Vous payez des devs pour des apps que le no-code livre en 48h",
      description:
        "Dashboards, portails clients, outils internes. Le no-code livre en jours ce que le dev classique livre en mois.",
    },
  ],

  // -- Services -----------------------------------------------------------
  services: [
    {
      isPrimary: true,
      icon: LayoutDashboard,
      title: "Sites & interfaces IA",
      description:
        "Sites web, dashboards, portails clients. Propulsés par l'IA, designés pour convertir. Live en 48h.",
      deliverables: [
        "Sites web nouvelle génération",
        "Dashboards temps réel",
        "Portails clients sur mesure",
        "Chatbots IA intégrés",
      ],
    },
    {
      isPrimary: true,
      icon: Zap,
      title: "Applications métier automatisées",
      description:
        "Apps no-code connectées à votre stack. Bubble, FlutterFlow, Retool. Fonctionnelles, scalables, maintenables.",
      deliverables: [
        "Applications métier sur mesure",
        "Intégrations API complètes",
        "Base de données structurée",
        "Formation utilisateurs",
      ],
    },
    {
      isPrimary: false,
      icon: Bot,
      title: "Prompt engineering & intégration IA",
      description:
        "On intègre l'IA là où elle a un vrai impact. Pas du gadget, du ROI.",
      deliverables: [
        "Audit des cas d'usage IA",
        "Prompts optimisés production",
        "Intégrations API (OpenAI, Claude, Mistral)",
      ],
    },
    {
      isPrimary: false,
      icon: Workflow,
      title: "Workflows automatisés",
      description:
        "Make, n8n, Zapier. On connecte vos outils et on automatise vos process répétitifs.",
      deliverables: [
        "Cartographie des process",
        "Workflows Make/n8n/Zapier",
        "Monitoring et alertes",
      ],
    },
  ],

  // -- Methodology --------------------------------------------------------
  methodology: [
    {
      number: "01",
      phase: "Diagnostic",
      timeline: "Semaines 1–2",
      description:
        "On cartographie vos process, votre stack, vos données. On identifie les automatisations à fort ROI.",
      deliverable: "Cartographie & quick wins",
      accent: "#00F5FF",
    },
    {
      number: "02",
      phase: "Build",
      timeline: "Semaines 3–10",
      description:
        "On construit les interfaces, les workflows, les intégrations IA. Chaque livrable est testé et validé avec vos équipes.",
      deliverable: "Systèmes déployés",
      accent: "#a78bfa",
    },
    {
      number: "03",
      phase: "Scale",
      timeline: "Semaine 10+",
      description:
        "On monitore, on optimise, on forme vos équipes. L'objectif : autonomie totale sur vos nouveaux outils.",
      deliverable: "Autonomie & ROI",
      accent: "#7B5EFF",
    },
  ],

  // -- Director -----------------------------------------------------------
  director: {
    name: "Abraham Brakha",
    title: "Directeur BU IA & Automatisation",
    bio: "20 ans d'expertise à l'intersection du commerce et de la technologie. Background en psychologie de la décision appliquée au B2B. Spécialiste IA appliquée au business : prompt engineering, automatisation, interfaces intelligentes.",
    photoPlaceholder: "AB",
  },

  // -- Testimonials -------------------------------------------------------
  testimonials: [
    {
      quote:
        "L'automatisation qu'ils ont mise en place nous fait gagner 15h par semaine. Par personne.",
      name: "Marc K.",
      role: "COO, Agence digitale",
      detail: "30 collaborateurs",
      metric: "15h",
      metricLabel: "/ semaine",
    },
    {
      quote:
        "Notre portail client est passé de maquette à production en 10 jours. Incroyable.",
      name: "Julie R.",
      role: "CEO, SaaS RH",
      detail: "25 collaborateurs",
      metric: "10j",
      metricLabel: "delivery",
    },
  ],

  relatedArticleSlugs: [
    "automatisation-crm-workflows-ia",
    "roi-ia-ventes-b2b",
  ],

  // -- SEO ----------------------------------------------------------------
  seo: {
    title:
      "IA & Automatisation pour PME B2B | Sites IA, No-Code, Workflows | ChallengersLab",
    description:
      "Sites IA, applications no-code, workflows automatisés et intégration IA. ChallengersLab connecte l'intelligence artificielle à votre business B2B. Résultats en 48h.",
    keywords: [
      "automatisation IA B2B",
      "sites IA",
      "applications no-code",
      "workflows automatisés",
      "intégration IA entreprise",
      "Make n8n Zapier",
      "agence IA Paris",
      "prompt engineering B2B",
    ],
  },
};
