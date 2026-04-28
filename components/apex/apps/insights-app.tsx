"use client"

import { motion } from "framer-motion"
import { ANTIGRAVITY_INSIGHTS } from "@/lib/apex/data"
import { TrendingUp, Activity, Zap, Users, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const ICONS = [Zap, Activity, Users, TrendingUp]

export function InsightsApp() {
  return (
    <div className="bg-white h-full overflow-y-auto font-sans relative text-black">
      {/* 1. Header Logic - Editorial Newspaper */}
      <div className="p-12 border-b border-[#E5E5E0] flex flex-col md:flex-row justify-between items-end gap-8 bg-white">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#666666] block mb-4">
            QUARTERLY_INTELLIGENCE // INDEX_REPORT_V4
          </span>
          <h2 className="text-7xl md:text-8xl font-bold tracking-[-0.05em] uppercase leading-[0.85]">
             The <br />
             <span className="text-[#666666]">Strategic</span> <br />
             Pulse.
          </h2>
        </div>
        <div className="text-right border-l border-[#E5E5E0] pl-8 hidden md:block">
           <div className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Issue_04.82</div>
           <div className="text-[11px] font-bold tracking-tight text-[#666666]">EST. DATA_SYSTEMS // 2026</div>
        </div>
      </div>

      {/* 2. Core Dashboard Grid - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[#E5E5E0]">
        {/* Left: The Narrative */}
        <div className="md:col-span-4 p-12 bg-[#F5F5F0]/30 border-r border-[#E5E5E0] flex flex-col justify-between">
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-black" />
                 <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">Core_Analysis</h3>
              </div>
              <p className="text-xl font-bold tracking-tight leading-tight">
                Market velocity remains high as decentralized logic cores begin to saturate the tertiary nodes.
              </p>
              <p className="text-sm text-[#666666] leading-relaxed">
                We are tracking a +14% delta in operational efficiency across the Apex Edge network. This report synthesizes all real-time signal logic into a clarified strategic briefing.
              </p>
           </div>
           
           <div className="pt-12">
              <button className="w-full py-4 border border-black hover:bg-black hover:text-white transition-all text-[11px] font-bold uppercase tracking-widest">
                 Download_Full_PDF
              </button>
           </div>
        </div>

        {/* Right: The Metrics Bento */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E5E5E0]">
           {ANTIGRAVITY_INSIGHTS.map((item, i) => {
             const Icon = ICONS[i % ICONS.length]
             return (
               <div key={item.metric} className="p-12 bg-white hover:bg-[#F5F5F0]/50 transition-colors group">
                 <div className="flex justify-between items-start mb-12">
                   <div className="h-10 w-10 border border-[#E5E5E0] flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                      <Icon className="h-4 w-4" />
                   </div>
                   <span className="font-mono text-[9px] bg-black text-white px-3 py-1 font-bold">{item.trend}</span>
                 </div>
                 <div className="text-6xl font-black font-mono tracking-tighter text-black mb-2">{item.value}%</div>
                 <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#666666]">{item.metric}</div>
               </div>
             )
           })}
        </div>
      </div>

      {/* 3. Deep Dive Columns */}
      <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-[#E5E5E0] bg-white">
         <div className="space-y-6">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#666666]">01_Logic_Flow</h4>
            <p className="text-[13px] leading-relaxed">
               Our ingestion pipelines are now operating at sub-millisecond latency. This allows for near-instantaneous pivot logic when market conditions fluctuate outside the standard sigmoid range.
            </p>
         </div>
         <div className="space-y-6">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#666666]">02_Node_Integrity</h4>
            <div className="flex items-center gap-4 text-emerald-600">
               <ShieldCheck className="w-8 h-8" />
               <div className="flex flex-col leading-none">
                  <span className="text-lg font-bold">VERIFIED_99.9%</span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.1em]">All systems operational</span>
               </div>
            </div>
            <p className="text-[13px] leading-relaxed">
               All systems maintain high integrity states, with triple-redundancy failover active in the Tokyo and New York clusters.
            </p>
         </div>
         <div className="space-y-6">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#666666]">03_Uplink</h4>
            <div className="bg-black p-4 rounded-sm">
               <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-1/3 h-full bg-white" 
                  />
               </div>
               <div className="mt-2 text-[8px] font-mono text-white/40 uppercase tracking-[0.2em] flex justify-between">
                  <span>Syncing...</span>
                  <span>78.2 MB/S</span>
               </div>
            </div>
         </div>
      </div>

      <footer className="p-12 flex justify-between items-center text-[#666666]">
         <span className="font-mono text-[9px] uppercase tracking-[0.4em]">APEX_INSIGHTS // (C) 2026_AG_CORP</span>
         <div className="flex gap-8 text-[10px] font-bold uppercase">
            <button className="hover:text-black">Privacy</button>
            <button className="hover:text-black">System_Log</button>
         </div>
      </footer>
    </div>
  )
}
