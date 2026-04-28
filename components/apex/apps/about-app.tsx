"use client"

import { motion } from "framer-motion"
import { APEX_STATS } from "@/lib/apex/data"
import { Zap, Target, Cpu, Shield } from "lucide-react"

const PRINCIPLES = [
  { icon: Zap, title: "Velocity", body: "Concept to live in weeks, not quarters. Speed is our only moat." },
  { icon: Target, title: "Outcome", body: "Every artifact tied to a measurable dominant outcome." },
  { icon: Cpu, title: "Intelligence", body: "AI-native architectures embedded in every workflow." },
  { icon: Shield, title: "Longevity", body: "98% of clients still ship with us. We play long games." },
]

export function AboutApp() {
  return (
    <div className="bg-white h-full overflow-y-auto text-black font-sans">
      {/* Hero */}
      <div className="p-12 border-b border-[#E5E5E0]">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#666666]">
          INTENTION // AG_AGENCY_INCEPTION
        </span>
        <h2 className="mt-8 text-7xl md:text-9xl font-bold tracking-[-0.05em] text-black leading-[0.8]">
          Build. <br />
          Launch. <br />
          <span className="text-[#666666] italic">Dominate.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#E5E5E0]">
        <div className="p-12 border-r border-[#E5E5E0] flex flex-col justify-between bg-white">
           <p className="text-3xl font-bold tracking-tight text-black leading-tight">
             APEX® IS AN ELITE REVENUE ENGINE FOR MODERN OPERATORS. WE BRIDGE THE GAP BETWEEN THEORETICAL STRATEGY AND ABSOLUTE MARKET DOMINANCE.
           </p>
           <div className="mt-24 font-mono text-[10px] uppercase tracking-[0.3em] text-[#666666]">
              Rel_4.82 // Stable_Build_102
           </div>
        </div>
        <div className="p-12 bg-[#F5F5F0]/30 space-y-12">
           {PRINCIPLES.map((p, i) => (
             <div key={p.title} className="flex gap-8 items-start group">
                <span className="text-black font-bold font-mono text-xs opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                <div>
                   <h3 className="font-bold text-black uppercase tracking-[0.2em] text-[11px] mb-2">{p.title}</h3>
                   <p className="text-[13px] text-[#666666] font-medium leading-relaxed max-w-sm">{p.body}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Stats - Bento Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#E5E5E0]">
        {APEX_STATS.map((s, i) => (
          <div key={s.label} className="p-12 border-r border-[#E5E5E0] last:border-r-0 hover:bg-[#F5F5F0]/50 transition-colors">
            <div className="text-5xl font-black font-mono tracking-tighter text-black">{s.value}</div>
            <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#666666]">{s.label}</div>
            <div className="mt-6 text-[10px] font-bold text-black opacity-10 uppercase">{s.hint}</div>
          </div>
        ))}
      </div>

      <div className="p-12 font-mono text-[11px] uppercase tracking-[0.1em] text-[#666666] bg-white flex justify-between items-center">
         <div className="flex gap-4">
            <span className="text-black font-bold">READY_STATE</span>
            <span>//</span>
            <span>SYSTEM_DOMINANCE_VERIFIED</span>
         </div>
         <div className="w-1.5 h-3 bg-black animate-pulse" />
      </div>
    </div>
  )
}
