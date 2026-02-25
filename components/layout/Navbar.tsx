"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, ArrowRight } from "lucide-react";
import {
  Sheet, SheetContent, SheetTrigger, SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Sales", href: "/sales" },
  { name: "AI & Auto", href: "/ia" },
  { name: "Ressources", href: "/ressources" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="fixed top-0 z-50 w-full"
    >
      <div className="mx-auto max-w-[1100px] px-6 pt-5">
        <div
          className={`flex items-center justify-between px-5 py-3 rounded-[20px] border transition-all duration-300 ${
            isScrolled
              ? "bg-[#080808]/85 backdrop-blur-xl border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "glass-card"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent-start to-accent-end text-[10px] font-bold text-white shadow-[0_0_12px_rgba(123,94,255,0.4)]">
              CL
            </span>
            <span className="font-display text-[15px] text-white">
              ChallengersLab
            </span>
          </Link>

          {/* Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isHash = link.href.includes("#");
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : !isHash && pathname.startsWith(link.href);
              const Tag = isHash ? "a" : Link;
              return (
                <Tag
                  key={link.name}
                  href={link.href}
                  className={`rounded-lg px-4 py-2 text-[13px] font-medium transition-colors duration-200 hover:bg-white/[0.04] hover:text-white/80 ${
                    isActive ? "text-white/90" : "text-white/40"
                  }`}
                >
                  {link.name}
                </Tag>
              );
            })}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              className="btn-glow hidden items-center gap-2 rounded-lg px-5 py-2 text-[13px] md:inline-flex"
            >
              Parlons-en
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/[0.04] hover:text-white md:hidden"
                  aria-label="Ouvrir le menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] border-l border-white/6 bg-[#080808]/95 backdrop-blur-2xl p-8"
              >
                <div className="mt-8 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <SheetClose key={link.name} asChild>
                      <Link
                        href={link.href}
                        className="rounded-xl px-4 py-3.5 text-[16px] font-medium text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                  <div className="mt-6 border-t border-white/6 pt-6">
                    <a
                      href="/#contact"
                      className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px]"
                    >
                      Parlons-en <ArrowRight className="h-3.5 w-3.5" />
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
