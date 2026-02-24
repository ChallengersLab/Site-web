import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center md:flex-row md:justify-between">
        <p className="text-sm text-white/40">
          &copy; 2026 Challengerslab. Tous droits réservés.
        </p>
        <div className="flex gap-6 text-sm text-white/40">
          <Link href="#" className="transition-colors hover:text-white/70">
            Mentions légales
          </Link>
          <Link href="#" className="transition-colors hover:text-white/70">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}
