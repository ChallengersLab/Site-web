"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navColumns = [
  {
    label: "Services",
    links: [
      { name: "Cold Call Outsourcing", href: "#services" },
      { name: "AI Websites", href: "#services" },
    ],
  },
  {
    label: "Solutions",
    links: [
      { name: "DIR CO Externalisé", href: "#solutions" },
      { name: "Apps No-Code", href: "#solutions" },
    ],
  },
  {
    label: "Résultats",
    links: [
      { name: "Case Studies", href: "#results" },
      { name: "Live Results", href: "#results" },
    ],
  },
  {
    label: "Entreprise",
    links: [
      { name: "À propos", href: "#about" },
      { name: "Blog", href: "#blog" },
    ],
  },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full">
      <div className="bg-black/90 backdrop-blur-3xl border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <BrainCircuit
              className="h-7 w-7 text-accent-start transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(123,94,255,0.6)]"
            />
            <span className="text-lg font-bold tracking-tight text-white">
              Challengerslab
            </span>
          </Link>

          {/* Desktop 4-column nav */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-12">
            {navColumns.map((col) => (
              <div key={col.label}>
                <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                  {col.label}
                </span>
                <ul className="mt-2 space-y-1">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right side: CTA + lang + mobile */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <MagneticButton href="#audit" size="default">
                Réserver un Audit Gratuit
              </MagneticButton>
            </div>

            <button className="hidden text-xs font-medium text-white/50 transition-colors hover:text-white lg:block">
              FR/EN
            </button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden text-white p-2">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] bg-black/95 backdrop-blur-3xl border-l border-white/10 p-8"
              >
                <div className="flex flex-col gap-8 mt-8">
                  {navColumns.map((col) => (
                    <div key={col.label}>
                      <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                        {col.label}
                      </span>
                      <ul className="mt-3 space-y-2">
                        {col.links.map((link) => (
                          <li key={link.name}>
                            <SheetClose asChild>
                              <Link
                                href={link.href}
                                className="block text-base text-white/70 transition-colors hover:text-white"
                              >
                                {link.name}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-white/10">
                    <MagneticButton href="#audit" size="default">
                      Réserver un Audit Gratuit
                    </MagneticButton>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
