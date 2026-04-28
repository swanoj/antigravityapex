"use client"

import { motion } from "framer-motion"
import { APEX_STATS, APEX_BOOT_LINES } from "@/lib/apex/data"
import { Zap, Target, Cpu, Shield } from "lucide-react"

const PRINCIPLES = [
  { icon: Zap, title: "Velocity", body: "Concept to live in weeks, not quarters. Speed is our only moat." },
  { icon: Target, title: "Outcome", body: "Every artifact tied to a measurable dominant outcome." },
  { icon: Cpu, title: "Intelligence", body: "AI-native architectures embedded in every workflow." },
  { icon: Shield, title: "Longevity", body: "98% of clients still ship with us. We play long games." },
]

export function AboutApp() {
  return (
    <div className="bg-white h-full overflow-y-auto">
      {/* Hero */}
      <div className="p-10 border-b border-black">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          // agency · inception · 2026/Q1
        </span>
        <h2 className="mt-4 text-7xl font-bold tracking-tighter text-black md:text-9xl">
          Build. Launch. <br />
          <span className="opacity-20 italic">Dominate.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-black">
        <div className="p-10 border-r border-black flex flex-col justify-between">
           <p className="text-2xl font-medium tracking-tight text-black leading-tight">
             ANTIGRAVITY APEX is an elite consulting engine engineered for high-velocity operators. We bridge the gap between abstract strategy and tactical dominance.
           </p>
           <div className="mt-20 font-mono text-[10px] uppercase tracking-widest text-black/40">
              System Release: V.0.4.82 // Stable
           </div>
        </div>
        <div className="p-10 bg-zinc-50 space-y-8">
           {PRINCIPLES.map((p, i) => (
             <div key={p.title} className="flex gap-6 items-start">
                <span className="text-black font-bold font-mono text-xs">0{i+1}</span>
                <div>
                   <h3 className="font-bold text-black uppercase tracking-widest text-[11px] mb-1">{p.title}</h3>
                   <p className="text-sm text-black/60 font-medium leading-relaxed">{p.body}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-black">
        {APEX_STATS.map((s, i) => (
          <div key={s.label} className="p-10 border-r border-black last:border-r-0 hover:bg-zinc-50 transition-colors">
            <div className="text-4xl font-bold tracking-tight text-black">{s.value}</div>
            <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-black/40">{s.label}</div>
            <div className="mt-4 text-[10px] font-bold text-black opacity-20">{s.hint}</div>
          </div>
        ))}
      </div>

      <div className="p-10 font-mono text-[11px] leading-relaxed text-black/40 bg-zinc-100 flex justify-between items-center">
         <div>
            {"> "}APEX_INIT_COMPLETE // SUCCESS_DOMINANCE_LOCKED
         </div>
         <div className="apex-cursor-blink text-black">▍</div>
      </div>
    </div>
  )
}
