"use client"

import { motion } from "framer-motion"
import {
  Target,
  Code2,
  ShoppingBag,
  LineChart,
  Film,
  Scissors,
  Boxes,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { APEX_SERVICES } from "@/lib/apex/data"

const ICONS = {
  target: Target,
  code: Code2,
  "shopping-bag": ShoppingBag,
  "line-chart": LineChart,
  film: Film,
  scissors: Scissors,
  boxes: Boxes,
  sparkles: Sparkles,
} as const

export function ServicesApp() {
  return (
    <div className="bg-white h-full overflow-y-auto">
      <div className="p-10 border-b border-black">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          // core · capabilities · v.04
        </span>
        <h2 className="mt-4 text-7xl font-bold tracking-tighter text-black md:text-9xl">
          Complete <br />
          <span className="opacity-20 italic">Architectures.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-black">
        {APEX_SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon as keyof typeof ICONS] ?? Sparkles
          return (
            <motion.article 
              key={s.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-10 border-r border-b border-black last:border-b-0 even:border-r-0 group hover:bg-zinc-50 transition-colors"
            >
               <div className="flex justify-between items-start">
                  <div className="h-12 w-12 border border-black flex items-center justify-center">
                     <Icon className="h-5 w-5 text-black" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">0{i + 1}</span>
               </div>
               
               <h3 className="mt-12 text-4xl font-bold tracking-tighter text-black">
                  {s.name}
               </h3>
               <p className="mt-4 text-sm font-medium leading-relaxed text-black/60 max-w-sm">
                  {s.description}
               </p>

               <ul className="mt-8 flex flex-wrap gap-2">
                 {s.capabilities.map((c) => (
                   <li key={c} className="font-mono text-[9px] uppercase tracking-widest border border-black/10 px-2 py-1 bg-zinc-100 italic">
                      {c}
                   </li>
                 ))}
               </ul>

               <div className="mt-12 flex items-center gap-2 group-hover:gap-4 transition-all cursor-pointer">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">Deploy Strategy</span>
                  <ArrowRight className="h-3 w-3 text-black" />
               </div>
            </motion.article>
          )
        })}
      </div>

      <div className="p-20 text-center bg-black text-white">
         <h3 className="text-4xl font-bold tracking-tighter">Ready to dominate?</h3>
         <p className="mt-4 text-white/40 font-mono text-[10px] uppercase tracking-widest">Inception to hyper-scale in under 90 days.</p>
         <button className="mt-10 px-10 py-5 border border-white font-mono text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Secure the engagement
         </button>
      </div>
    </div>
  )
}
