"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Sales", href: "#sales" },
  { name: "AI & Auto", href: "#ai" },
  { name: "Méthode", href: "#method" },
  { name: "Résultats", href: "#results" },
];

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="fixed top-0 z-50 w-full"
    >
      <div className="mx-auto max-w-6xl px-6 pt-4">
        <div className="glassmorphism-strong flex items-center justify-between rounded-2xl px-6 py-3">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-start to-accent-end text-xs font-bold text-white">
              CL
            </span>
            <span className="font-display text-base font-bold tracking-tight text-white">
              ChallengersLab
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] md:inline-flex"
            >
              Parlons-en
              <span className="text-base">&#8594;</span>
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <button className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white md:hidden">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] border-l border-white/8 bg-[#0a0a0a]/95 backdrop-blur-2xl p-8"
              >
                <div className="mt-8 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <SheetClose key={link.name} asChild>
                      <Link
                        href={link.href}
                        className="rounded-xl px-4 py-3 text-lg font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                  <div className="mt-6 border-t border-white/8 pt-6">
                    <a
                      href="#contact"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
                    >
                      Parlons-en &#8594;
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
