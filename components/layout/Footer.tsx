import Link from "next/link";

const footerLinks = {
  Offres: [
    { name: "Sales", href: "/#sales" },
    { name: "AI & Automation", href: "/#ai" },
    { name: "Contact", href: "/#contact" },
  ],
  Ressources: [
    { name: "Tous les articles", href: "/ressources" },
    { name: "Guide Prospection B2B", href: "/ressources/prospection-b2b-ia-guide-complet" },
    { name: "Méthode Challenger Sales", href: "/ressources/challenger-sales-methode-b2b" },
    { name: "Make vs n8n vs Zapier", href: "/ressources/automatisation-crm-workflows-ia" },
  ],
  Entreprise: [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Confidentialité", href: "/confidentialite" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/6" role="contentinfo">
      <div className="mx-auto max-w-[1100px] px-6 py-20">
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent-start to-accent-end text-[10px] font-bold text-white shadow-[0_0_12px_rgba(123,94,255,0.3)]">
                CL
              </span>
              <span className="font-display text-[15px] text-white">
                ChallengersLab
              </span>
            </div>
            <p className="mt-5 text-[13px] leading-[1.7] text-white/25">
              20 ans d&apos;expertise commerciale B2B croisée avec
              l&apos;intelligence artificielle. Paris, France.
            </p>
          </div>

          <div className="flex flex-wrap gap-16 md:gap-20">
            {Object.entries(footerLinks).map(([cat, links]) => (
              <div key={cat}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/20">
                  {cat}
                </p>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-white/30 transition-colors hover:text-white/60"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-white/4 pt-8">
          <p className="text-[11px] text-white/15">
            &copy; 2026 ChallengersLab. Tous droits réservés. Paris, France.
          </p>
        </div>
      </div>
    </footer>
  );
}
