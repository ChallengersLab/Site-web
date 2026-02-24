"use client";

import { motion } from "framer-motion";

const barData = [35, 52, 44, 68, 78, 62, 88, 95, 72, 85, 91, 97];
const maxBar = Math.max(...barData);

export function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative"
      style={{ perspective: 1000 }}
    >
      {/* Ambient glow behind dashboard */}
      <div
        className="absolute -inset-10 rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(123,94,255,0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="glass-card relative overflow-hidden p-6 md:p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-accent-start" style={{ boxShadow: "0 0 8px rgba(123,94,255,0.6)" }} />
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/30">
              Pipeline Analytics
            </span>
          </div>
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Main metric */}
        <div className="mt-6 flex items-end gap-3">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-display text-4xl tracking-tight text-white md:text-5xl"
          >
            +320%
          </motion.span>
          <span className="mb-1.5 text-[10px] uppercase tracking-widest text-accent-end/60">
            pipeline growth
          </span>
        </div>

        {/* Chart bars */}
        <div className="mt-6 flex items-end gap-[3px] h-[80px] md:h-[100px]">
          {barData.map((value, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                delay: 1.0 + i * 0.06,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="flex-1 origin-bottom rounded-t-sm"
              style={{
                height: `${(value / maxBar) * 100}%`,
                background: i >= barData.length - 3
                  ? `linear-gradient(to top, rgba(123,94,255,0.6), rgba(0,245,255,0.4))`
                  : `rgba(255,255,255,${0.04 + (value / maxBar) * 0.08})`,
              }}
            />
          ))}
        </div>

        {/* Bottom stats row */}
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/6 pt-5">
          {[
            { label: "Deals actifs", value: "142", change: "+23%" },
            { label: "Taux closing", value: "34%", change: "+8pts" },
            { label: "Revenu MRR", value: "89k", change: "+41%" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
            >
              <p className="text-[10px] uppercase tracking-widest text-white/20">
                {item.label}
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-lg text-white/80">
                  {item.value}
                </span>
                <span className="text-[10px] text-accent-end/70">
                  {item.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating mini cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute -right-4 top-16 glass-card !rounded-xl px-4 py-3 md:block hidden"
          style={{ transform: "rotate(3deg)" }}
        >
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-accent-end/20 flex items-center justify-center">
              <svg className="h-3 w-3 text-accent-end" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-white/40">Conversion</p>
              <p className="text-[13px] font-semibold text-white/80">+85%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
