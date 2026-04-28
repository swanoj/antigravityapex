"use client"

import { motion } from "framer-motion"
import { ANTIGRAVITY_INSIGHTS } from "@/lib/apex/data"
import { TrendingUp, Activity, Zap, Users } from "lucide-react"

const ICONS = [Zap, Activity, Users, TrendingUp]

export function InsightsApp() {
  return (
    <div className="bg-white h-full overflow-y-auto">
      <div className="p-10 border-b border-black">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          // core · system · analytics
        </span>
        <h2 className="mt-4 text-7xl font-bold tracking-tighter text-black">
          Dominance <br />
          <span className="opacity-20">Dynamics.</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-black">
        {ANTIGRAVITY_INSIGHTS.map((item, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <motion.div
              key={item.metric}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
              className="p-10 border-r border-black last:border-r-0 group hover:bg-zinc-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <Icon className="h-5 w-5 text-black opacity-20 group-hover:opacity-100 transition-opacity" />
                <span className="font-mono text-[10px] text-emerald-500 font-bold">{item.trend}</span>
              </div>
              <div className="mt-8">
                <div className="text-5xl font-bold tracking-tighter text-black">
                  {item.value}%
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-black/40">
                  {item.metric}
                </div>
                <p className="mt-4 text-xs font-medium text-black/60 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-black italic">Execution Velocity</h3>
            <p className="mt-4 text-sm text-black/60 leading-relaxed font-medium">
              Our proprietary stack allows for sub-atomic iteration speeds. We don't just ship; we evolve the baseline of what's possible in digital commerce. Every sprint is a leap.
            </p>
            <div className="mt-8 flex gap-2">
               {[...Array(12)].map((_, i) => (
                 <motion.div 
                   key={i}
                   initial={{ scaleY: 0.1 }}
                   animate={{ scaleY: [0.1, 1, 0.4, 0.8, 0.2] }}
                   transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                   className="w-1 h-8 bg-black/10 origin-bottom"
                 />
               ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-black italic">Client Compound Alpha</h3>
            <p className="mt-4 text-sm text-black/60 leading-relaxed font-medium">
              We focus on long-term terminal value. By optimizing the entire ecosystem—from brand DNA to server-side logic—we create a compounding effect that traditional agencies cannot replicate.
            </p>
             <div className="mt-8 p-6 bg-zinc-100 border border-black/5 rounded-sm">
                <div className="font-mono text-[9px] uppercase tracking-widest text-black/40 mb-3">Live Feed // Performance</div>
                <div className="space-y-2">
                   <div className="h-1 bg-black/5 w-full overflow-hidden">
                      <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 3 }} className="h-full bg-black w-1/3" />
                   </div>
                   <div className="h-1 bg-black/5 w-full overflow-hidden">
                      <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 5, delay: 0.5 }} className="h-full bg-black w-1/4" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <footer className="p-10 border-t border-black/5 flex justify-between items-center bg-zinc-50">
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/30">
            Internal Document · Restricted Access · v 98.2
          </div>
          <button className="px-4 py-2 border border-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
            Request Audit
          </button>
      </footer>
    </div>
  )
}
