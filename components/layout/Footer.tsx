import Link from "next/link";

const footerLinks = {
  Offres: [
    { name: "Sales", href: "#sales" },
    { name: "AI & Automation", href: "#ai" },
  ],
  Entreprise: [
    { name: "Contact", href: "#contact" },
    { name: "Mentions légales", href: "#" },
    { name: "Confidentialité", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/6">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent-start to-accent-end text-[10px] font-bold text-white">
                CL
              </span>
              <span className="font-display text-sm font-bold tracking-tight text-white">
                ChallengersLab
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/30">
              Agence AI & Sales pour les PME et scale-ups B2B qui refusent le
              statu quo.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex gap-16">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/25">
                  {category}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/40 transition-colors hover:text-white/70"
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

        <div className="mt-16 flex flex-col items-center gap-3 border-t border-white/6 pt-8 md:flex-row md:justify-between">
          <p className="text-xs text-white/20">
            &copy; 2026 ChallengersLab. Tous droits réservés. Paris, France.
          </p>
        </div>
      </div>
    </footer>
  );
}
