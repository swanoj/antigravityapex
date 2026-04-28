"use client"

import { motion } from "framer-motion"
import { Play, Film, Camera, Radio, Activity, Disc, Target } from "lucide-react"
import { useState } from "react"

const CHANNEL_STATS = [
  { label: "Signal", value: "98.4%", icon: Radio },
  { label: "Bitrate", value: "1.2 GB/s", icon: Activity },
  { label: "Latency", value: "4ms", icon: Disc },
]

export function VideoApp() {
  const [isLive, setIsLive] = useState(true)

  return (
    <div className="bg-black h-full flex flex-col overflow-hidden text-white font-sans relative">
      {/* Newspaper Blend Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-black">
        <div>
          <h2 className="text-4xl font-bold tracking-tighter text-black uppercase leading-none">
            Broadcast <span className="text-zinc-300 italic">Antigravity</span>
          </h2>
          <div className="flex gap-4 mt-1 font-mono text-[9px] uppercase tracking-widest text-black/40">
             <span>Station 4.82 // TOKYO-SEOUL-NYC</span>
             <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"/> LIVE FEED</span>
          </div>
        </div>
        <div className="hidden md:flex gap-8">
           {CHANNEL_STATS.map(s => (
             <div key={s.label} className="flex flex-col items-end">
                <span className="font-mono text-[8px] text-black/30 uppercase tracking-widest">{s.label}</span>
                <span className="text-xs font-bold text-black">{s.value}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Main Broadcast Monitor */}
      <div className="flex-1 relative bg-[#0a0a0a] overflow-hidden group">
         {/* Youtube Player Placeholder / Embed */}
         <div className="absolute inset-0 z-0">
           <iframe 
             className="w-full h-full opacity-80"
             src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=0&loop=1&playlist=jfKfPfyJRdk" 
             title="YouTube video player" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
           />
           {/* CRT Glitch Overlay */}
           <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] contrast-150" />
           <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
         </div>

         {/* Monitor Chrome - Technical Overlay */}
         <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none border-[12px] border-black/20">
            <div className="flex justify-between items-start">
               <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="font-mono text-[10px] font-bold tracking-widest text-white/90">TRANSMITTING... [4K_UHD]</span>
               </div>
               <div className="font-mono text-[10px] text-white/40 flex flex-col items-end">
                  <span>LAT: 35.6762° N</span>
                  <span>LNG: 139.6503° E</span>
               </div>
            </div>

            <div className="flex justify-between items-end">
               <div className="flex gap-4">
                  <div className="w-16 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: "30%" }} 
                        animate={{ width: "90%" }} 
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="h-full bg-red-600" 
                     />
                  </div>
                  <span className="font-mono text-[9px] text-white/60">BUFF_SYNCED</span>
               </div>
               <div className="flex flex-col items-end">
                  <div className="text-4xl font-black italic tracking-tighter opacity-10">APEX_CORE</div>
                  <div className="font-mono text-[10px] text-red-600 font-bold">SIGNAL_LOCKED</div>
               </div>
            </div>
         </div>
      </div>

      {/* Control Strip */}
      <div className="h-14 bg-white border-t border-black px-6 flex items-center justify-between">
         <div className="flex gap-8 items-center">
            <button className="text-black hover:text-red-600 transition-colors">
               <Play size={18} fill="currentColor" />
            </button>
            <div className="flex gap-4 font-mono text-[9px] uppercase tracking-widest text-black/60 overflow-hidden whitespace-nowrap mask-fade-right">
               <span>// ARCHIVE_001.mp4</span>
               <span>// LIVE_UPLINK_PRIMARY</span>
               <span>// FEED_SECURED</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-black font-bold text-xs font-mono">00:34:12:09</div>
            <div className="w-[1px] h-4 bg-black/10" />
            <Target size={16} className="text-black/20" />
         </div>
      </div>
    </div>
  )
}
