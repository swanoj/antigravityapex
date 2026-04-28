"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { APEX_PROJECTS } from "@/lib/apex/data"
import { cn } from "@/lib/utils"

export function ProjectsApp() {
  return (
    <div className="bg-white p-10">
      <div className="mb-12 border-b border-black pb-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          // index · selected works · v.04
        </span>
        <h2 className="mt-4 text-6xl font-bold tracking-tighter text-black md:text-8xl">
          Bespoke <br />
          <span className="opacity-20 italic">Architectures.</span>
        </h2>
      </div>

      <div className="grid auto-rows-[240px] grid-cols-4 gap-4">
        {APEX_PROJECTS.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, type: "spring", stiffness: 200, damping: 25 }}
            className={cn(
              "group relative overflow-hidden border border-black/5 bg-zinc-50 transition-all hover:bg-white hover:shadow-2xl hover:shadow-black/10",
              p.span
            )}
          >
            {/* Background Grain/Noise */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay" />
            
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              <header className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                    case_{String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-black">
                    {p.client}
                  </h3>
                </div>
                <div className="h-10 w-10 border border-black/5 flex items-center justify-center rounded-sm transition group-hover:bg-black group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                </div>
              </header>

              <div className="mt-auto">
                <div 
                   className="font-mono text-[10px] uppercase tracking-widest py-1 px-2 border border-black/10 inline-block"
                   style={{ color: p.accent }}
                >
                  {p.metric}
                </div>
                <p className="mt-3 text-sm font-medium leading-relaxed text-black/60 opacity-0 transform translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                  {p.summary}
                </p>
              </div>
            </div>

            {/* Subtle Abstract Visual */}
            <div 
              className="absolute -bottom-10 -right-10 h-40 w-40 blur-3xl opacity-0 transition-opacity group-hover:opacity-10"
              style={{ backgroundColor: p.accent }}
            />
          </motion.article>
        ))}
      </div>

      <footer className="mt-12 flex items-center justify-between border-t border-black/10 pt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>ANTIGRAVITY APEX · High-Velocity Editorial</span>
        <span>© 2026 // ALL RIGHTS DOMINATED</span>
      </footer>
    </div>
  )
}
