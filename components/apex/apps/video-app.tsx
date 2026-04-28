"use client"

import { motion } from "framer-motion"
import { Play, Channel, Radio, Activity, Disc, Target } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const CHANNEL_STATS = [
  { label: "Signal", value: "98.4%", icon: Radio },
  { label: "Bitrate", value: "1.2 GB/S", icon: Activity },
  { label: "Latency", value: "4MS", icon: Disc },
]

export function VideoApp() {
  return (
    <div className="bg-[#0A0A0A] h-full flex flex-col overflow-hidden text-white font-sans relative">
      {/* 1. Top Control Bar - Pure Editorial White */}
      <div className="bg-white px-8 py-4 flex justify-between items-center border-b border-[#E5E5E0]">
        <div>
          <h2 className="text-3xl font-bold tracking-[-0.04em] text-black uppercase leading-none">
            Broadcast <span className="text-[#666666] italic">Interface</span>
          </h2>
          <div className="flex gap-4 mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[#666666]">
             <span>Station_4.82 // TOK_NYC</span>
             <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"/> LIVE_STREAM</span>
          </div>
        </div>
        <div className="hidden md:flex gap-8 border-l border-[#E5E5E0] pl-8">
           {CHANNEL_STATS.map(s => (
             <div key={s.label} className="flex flex-col items-end">
                <span className="font-mono text-[8px] text-[#666666] uppercase tracking-[0.2em]">{s.label}</span>
                <span className="text-xs font-bold text-black font-mono">{s.value}</span>
             </div>
           ))}
        </div>
      </div>

      {/* 2. Main Player - The Void Focus */}
      <div className="flex-1 relative bg-[#0A0A0A] overflow-hidden group">
         <div className="absolute inset-0 z-0">
           <iframe 
             className="w-full h-full opacity-60 grayscale brightness-75 hover:grayscale-0 hover:opacity-90 hover:brightness-100 transition-all duration-1000"
             src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=0&loop=1&playlist=jfKfPfyJRdk" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
           />
           {/* Technical Grid Overlay */}
           <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:20px_20px]" />
           <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
         </div>

         {/* Monitor Meta */}
         <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none border-[1px] border-white/5">
            <div className="flex justify-between items-start">
               <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-sm flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-white">RECV_UPLINK // SECURE</span>
               </div>
               <div className="font-mono text-[9px] text-white/30 flex flex-col items-end tracking-[0.2em]">
                  <span>LAT_35.6762</span>
                  <span>LNG_139.6503</span>
               </div>
            </div>

            <div className="flex justify-between items-end pb-4">
               <div className="flex flex-col gap-2">
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">Buffer_State</div>
                  <div className="w-32 h-0.5 bg-white/10 overflow-hidden">
                     <motion.div 
                        initial={{ width: "0%" }} 
                        animate={{ width: "85%" }} 
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="h-full bg-white" 
                     />
                  </div>
               </div>
               <div className="flex flex-col items-end">
                  <div className="text-5xl font-black italic tracking-tighter text-white opacity-20">APEX_VOID</div>
                  <div className="font-mono text-[9px] text-white/40 font-bold uppercase tracking-[0.4em] mt-1">Uptim_99.98%</div>
               </div>
            </div>
         </div>
      </div>

      {/* 3. Bottom Footer Control - Editorial White */}
      <div className="h-16 bg-white border-t border-[#E5E5E0] px-8 flex items-center justify-between">
         <div className="flex gap-8 items-center">
            <button className="h-10 w-10 bg-black text-white rounded-full flex items-center justify-center lift-hover">
               <Play size={16} fill="white" className="ml-1" />
            </button>
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-black tracking-tight">DATA_SESSION_ACTIVE</span>
               <span className="text-[8px] font-mono text-[#666666] uppercase tracking-[0.2em]">AG_BROADCAST_LAB.MKV</span>
            </div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-black font-black text-xs font-mono tracking-widest bg-[#F5F5F0] px-4 py-1.5 border border-[#E5E5E0]">
               00:34:12:09
            </div>
            <Target size={16} className="text-black opacity-10" />
         </div>
      </div>
    </div>
  )
}
