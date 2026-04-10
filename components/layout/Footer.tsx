import Link from "next/link";

const footerLinks = {
  Offres: [
    { name: "Sales", href: "/sales" },
    { name: "AI & Automation", href: "/ia" },
    { name: "Contact", href: "/#contact" },
  ],
  Ressources: [
    { name: "Tous les articles", href: "/ressources" },
    { name: "Guide Prospection B2B", href: "/ressources/prospection-b2b-ia-guide-complet" },
    { name: "Méthode Challenger Sales", href: "/ressources/challenger-sales-methode-b2b" },
    { name: "Make vs n8n vs Zapier", href: "/ressources/automatisation-crm-workflows-ia" },
    { name: "Agence Sales & IA : le guide", href: "/ressources/agence-sales-ia-b2b-pourquoi" },
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
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28" aria-hidden="true">
                <rect width="48" height="48" rx="11" fill="#1A1A1A"/>
                <path d="M15 11L10 11L10 37L15 37" stroke="#EEFF66" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M33 11L38 11L38 37L33 37" stroke="#4ECBA0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M26.5 12L20 25L24.5 25L21.5 36L29 23L24.5 23Z" fill="#EEFF66"/>
              </svg>
              <span className="text-[15px] font-medium tracking-[-0.03em] text-[#E8E8E2]">
                <span style={{ color: "#EEFF66" }}>C</span>hallengers<span style={{ color: "#4ECBA0" }}>L</span>ab
              </span>
            </div>
            <p className="mt-4 text-[12px] leading-[1.7] text-white/30">
              Sales × IA pour les PME B2B.<br />Paris, France.
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
