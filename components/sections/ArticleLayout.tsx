"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Ressource } from "@/lib/ressources";
import { ressources } from "@/lib/ressources";

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let listItems: string[] = [];
  let tableRows: string[][] = [];
  let inTable = false;
  let inCodeBlock = false;
  let codeContent: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-5 space-y-2 pl-5">
          {listItems.map((item, j) => (
            <li
              key={j}
              className="text-[15px] leading-[1.8] text-white/50 list-disc marker:text-white/15"
            >
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  function flushTable() {
    if (tableRows.length > 0) {
      const header = tableRows[0];
      const body = tableRows.slice(1);
      elements.push(
        <div key={`table-${elements.length}`} className="my-8 overflow-x-auto rounded-xl border border-white/[0.06]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                {header.map((cell, j) => (
                  <th key={j} className="px-4 py-3 text-left font-semibold text-white/50">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, j) => (
                <tr key={j} className="border-b border-white/[0.03]">
                  {row.map((cell, k) => (
                    <td key={k} className="px-4 py-3 text-white/35">
                      {renderInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  }

  function renderInline(text: string): React.ReactNode {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Inline code
      const codeMatch = remaining.match(/`(.+?)`/);

      const matches = [
        boldMatch ? { index: boldMatch.index!, match: boldMatch, type: "bold" } : null,
        codeMatch ? { index: codeMatch.index!, match: codeMatch, type: "code" } : null,
      ]
        .filter(Boolean)
        .sort((a, b) => a!.index - b!.index);

      if (matches.length === 0) {
        parts.push(remaining);
        break;
      }

      const first = matches[0]!;
      if (first.index > 0) {
        parts.push(remaining.slice(0, first.index));
      }

      if (first.type === "bold") {
        parts.push(
          <strong key={key++} className="font-semibold text-white/75">
            {first.match![1]}
          </strong>
        );
      } else if (first.type === "code") {
        parts.push(
          <code
            key={key++}
            className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[13px] text-accent-start/80 font-mono"
          >
            {first.match![1]}
          </code>
        );
      }

      remaining = remaining.slice(first.index + first.match![0].length);
    }

    return parts.length === 1 ? parts[0] : <>{parts}</>;
  }

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${elements.length}`}
            className="my-6 overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
          >
            <code className="text-[13px] leading-[1.8] text-white/50 font-mono">
              {codeContent.join("\n")}
            </code>
          </pre>
        );
        codeContent = [];
        inCodeBlock = false;
      } else {
        flushList();
        flushTable();
        inCodeBlock = true;
      }
      i++;
      continue;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      i++;
      continue;
    }

    // Empty lines
    if (line.trim() === "") {
      flushList();
      flushTable();
      i++;
      continue;
    }

    // Table separator
    if (line.match(/^\|[\s-:|]+\|$/)) {
      i++;
      continue;
    }

    // Table rows
    if (line.startsWith("|")) {
      flushList();
      const cells = line
        .split("|")
        .filter((c) => c.trim() !== "");
      if (!inTable) inTable = true;
      tableRows.push(cells);
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      flushList();
      flushTable();
      elements.push(
        <h3
          key={`h3-${elements.length}`}
          className="font-display mt-10 mb-4 text-[20px] text-white/85"
        >
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      flushList();
      flushTable();
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          className="font-display mt-14 mb-5 text-[26px] leading-[1.2] text-white/90"
        >
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      flushList();
      flushTable();
      elements.push(
        <blockquote
          key={`bq-${elements.length}`}
          className="my-6 border-l-2 border-accent-start/40 pl-5 text-[15px] italic leading-[1.8] text-white/45"
        >
          {renderInline(line.slice(2))}
        </blockquote>
      );
      i++;
      continue;
    }

    // Checkbox list items
    if (line.match(/^- \[[ x]\] /)) {
      flushTable();
      const checked = line.includes("[x]");
      const text = line.replace(/^- \[[ x]\] /, "");
      listItems.push((checked ? "[done] " : "") + text);
      i++;
      continue;
    }

    // List items
    if (line.match(/^- /)) {
      flushTable();
      listItems.push(line.slice(2));
      i++;
      continue;
    }

    // Numbered list
    if (line.match(/^\d+\. /)) {
      flushTable();
      listItems.push(line.replace(/^\d+\. /, ""));
      i++;
      continue;
    }

    // Regular paragraph
    flushList();
    flushTable();
    elements.push(
      <p
        key={`p-${elements.length}`}
        className="my-4 text-[15px] leading-[1.85] text-white/45"
      >
        {renderInline(line)}
      </p>
    );
    i++;
  }

  flushList();
  flushTable();

  return elements;
}

export function ArticleLayout({ ressource }: { ressource: Ressource }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-32">
      {/* Background */}
      <div
        className="absolute -right-[20%] top-[5%] h-[500px] w-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${ressource.tagColor}20 0%, transparent 65%)`,
          filter: "blur(80px)",
          animation: "float-orb 20s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[720px] px-6">
        {/* Breadcrumb */}
        <ScrollReveal>
          <nav className="flex items-center gap-2 text-[12px] text-white/25">
            <Link
              href="/"
              className="transition-colors hover:text-white/50"
            >
              Accueil
            </Link>
            <span>/</span>
            <Link
              href="/ressources"
              className="transition-colors hover:text-white/50"
            >
              Ressources
            </Link>
            <span>/</span>
            <span className="text-white/40 truncate max-w-[200px]">
              {ressource.title}
            </span>
          </nav>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex items-center gap-3">
            <span
              className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
              style={{
                background: `${ressource.tagColor}12`,
                border: `1px solid ${ressource.tagColor}25`,
                color: ressource.tagColor,
              }}
            >
              {ressource.tag}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-white/25">
              <Clock className="h-3 w-3" />
              {ressource.readTime}
            </span>
          </div>

          <h1 className="font-display mt-6 text-[clamp(2rem,5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-white">
            {ressource.title}
          </h1>

          <p className="mt-5 text-[16px] leading-[1.7] text-white/40">
            {ressource.description}
          </p>
        </ScrollReveal>

        {/* Divider */}
        <div className="section-divider my-10" />

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="prose-challenger"
        >
          {renderMarkdown(ressource.content)}
        </motion.article>

        {/* FAQ section */}
        {ressource.faq && ressource.faq.length > 0 && (
          <div className="mt-16">
            <div className="section-divider mb-10" />
            <h2 className="font-display text-[22px] text-white/85">
              Questions fréquentes
            </h2>
            <div className="mt-6 space-y-5">
              {ressource.faq.map((item) => (
                <div
                  key={item.question}
                  className="glass-card rounded-xl p-6"
                >
                  <h3 className="text-[15px] font-semibold text-white/80">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-white/40">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16">
          <div className="section-divider mb-10" />
          <div className="glass-card rounded-2xl p-8 text-center">
            <h3 className="font-display text-[22px] text-white/90">
              Besoin d&apos;aide pour implémenter ?
            </h3>
            <p className="mt-3 text-[14px] text-white/35">
              20 ans d&apos;expertise commerciale B2B croisée avec
              l&apos;intelligence artificielle. On implémente, on ne conseille
              pas.
            </p>
            <a
              href="/#contact"
              className="btn-glow mt-6 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-[14px]"
            >
              Réserver un appel stratégique
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Related articles */}
        {ressource.relatedSlugs && ressource.relatedSlugs.length > 0 && (
          <div className="mt-16">
            <div className="section-divider mb-10" />
            <h2 className="font-display text-[22px] text-white/85">
              Articles connexes
            </h2>
            <div className="mt-6 space-y-4">
              {ressource.relatedSlugs.map((slug) => {
                const related = ressources.find((r) => r.slug === slug);
                if (!related) return null;
                return (
                  <Link
                    key={slug}
                    href={`/ressources/${slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-white/[0.04] p-5 transition-all hover:border-white/[0.08] hover:bg-white/[0.02]"
                  >
                    <span
                      className="inline-flex shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em]"
                      style={{
                        background: `${related.tagColor}12`,
                        border: `1px solid ${related.tagColor}25`,
                        color: related.tagColor,
                      }}
                    >
                      {related.tag}
                    </span>
                    <span className="flex-1 text-[14px] font-medium text-white/60 transition-colors group-hover:text-white/80">
                      {related.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-white/20 transition-all group-hover:text-white/50 group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/ressources"
            className="group inline-flex items-center gap-2 text-[13px] text-white/30 transition-colors hover:text-white/60"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Toutes les ressources
          </Link>
        </div>
      </div>
    </section>
  );
}
