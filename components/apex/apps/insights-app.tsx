"use client"

import { motion } from "framer-motion"
import { ANTIGRAVITY_INSIGHTS } from "@/lib/apex/data"
import { TrendingUp, Activity, Zap, Users, Monitor, Radio } from "lucide-react"

const ICONS = [Zap, Activity, Users, TrendingUp]

export function InsightsApp() {
  return (
    <div className="bg-white h-full overflow-y-auto font-sans relative">
      {/* Newspaper Top Branding */}
      <div className="p-10 border-b border-black flex justify-between items-end">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground block mb-2">
            // intelligence · quarterly · release
          </span>
          <h2 className="text-8xl font-bold tracking-tighter text-black uppercase leading-[0.8]">
             The <br />
             <span className="italic text-zinc-200">Alpha</span> <br />
             Report.
          </h2>
        </div>
        <div className="text-right hidden md:block">
           <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-black mb-2">Issue No. 04.82</div>
           <div className="text-sm font-medium border-t border-black pt-2">SPRING 2026 EDITION</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] border-b border-black">
        {/* Left: Live Broadcast Feed */}
        <div className="p-10 border-r border-black flex flex-col gap-6 bg-zinc-50 relative overflow-hidden">
           <div className="flex justify-between items-center z-10">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-black">Live_Uplink // Primary</h3>
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                 <span className="font-mono text-[9px] font-bold text-red-600">BROADCASTING</span>
              </div>
           </div>
           
           <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl ring-1 ring-black/10 group">
              <iframe 
                className="w-full h-full opacity-90 scale-105"
                src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=0&loop=1&playlist=jfKfPfyJRdk" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              />
              {/* Computer Screen Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
              <div className="absolute top-4 left-4 font-mono text-[9px] text-white/40 bg-black/40 px-2 py-1 backdrop-blur-sm rounded">STATION_ID: AG_PRIME_01</div>
              <div className="absolute bottom-4 right-4 flex gap-3 text-white/20">
                 <Monitor size={14} />
                 <Radio size={14} />
              </div>
           </div>

           <p className="text-sm text-black font-medium leading-relaxed max-w-xl">
             <span className="font-bold underline decoration-red-600 decoration-2">LIVE ANALYSIS:</span> Our system is currently digesting real-time market sentiment pulses across 14 APAC clusters. The broadcast feed above confirms the structural shift in high-intent conversion patterns.
           </p>
        </div>

        {/* Right: Dominance Metrics */}
        <div className="grid grid-cols-1">
          {ANTIGRAVITY_INSIGHTS.slice(0, 3).map((item, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <div key={item.metric} className="p-10 border-b border-black last:border-b-0 hover:bg-zinc-50 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <Icon className="h-4 w-4 text-black opacity-20" />
                  <span className="font-mono text-[9px] bg-black text-white px-2 py-0.5">{item.trend}</span>
                </div>
                <div className="text-4xl font-bold tracking-tighter text-black">{item.value}%</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-black/40 mt-1">{item.metric}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Text Strip */}
      <div className="p-10">
         <div className="columns-1 md:columns-2 gap-12">
            <p className="text-xs text-black leading-relaxed mb-8 break-inside-avoid">
               <span className="font-bold uppercase tracking-widest block mb-2 text-[10px]">Methodology // 001</span>
               Data is ingested via the APEX edge network, processed through a proprietary neural transform, and projected onto this editorial canvas. We prioritize verifiable signal over atmospheric noise. The goal is absolute clarity in a chaotic digital economy.
            </p>
            <p className="text-xs text-black leading-relaxed break-inside-avoid">
               <span className="font-bold uppercase tracking-widest block mb-2 text-[10px]">System Integrity // 002</span>
               All insights presented here are dynamically updated. The "Newspaper" aesthetic is a choice of density and high-information reliability, bridging the gap between hardware precision and strategic impact.
            </p>
         </div>
      </div>

      <footer className="h-16 border-t border-black flex items-center px-10 gap-8 justify-between bg-zinc-100">
         <div className="font-mono text-[9px] uppercase tracking-[0.5em] text-black/40">
            ANTIGRAVITY_APEX // SYSTEM_LOCKED
         </div>
         <div className="flex gap-4 items-center">
            <div className="flex gap-1">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className="w-1 h-3 bg-black/10" />
               ))}
            </div>
            <span className="font-mono text-[10px] font-bold text-black">SECURE_DOC</span>
         </div>
      </footer>
    </div>
  )
}
