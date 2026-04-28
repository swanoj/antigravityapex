"use client"

import { motion } from "framer-motion"

export function Wallpaper() {
  return (
    <div className="absolute inset-0 -z-0 overflow-hidden bg-[#0a0a0b]" aria-hidden>
      {/* Vertical Data Beam */}
      <motion.div 
        animate={{ 
          x: ["-100%", "200%"],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-y-0 w-[40vw] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-20deg]"
      />

      {/* Industrial Grid */}
      <div className="absolute inset-0 opacity-[0.15]" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)', 
             backgroundSize: '60px 60px' 
           }} 
      />
      
      {/* Massive Background Type - Minimalist */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <h1 className="text-[40vw] font-black tracking-tighter leading-none text-white mix-blend-overlay">
           APEX
        </h1>
      </div>

      {/* Technical Hub - Bottom Left */}
      <div className="absolute bottom-12 left-12 flex gap-16 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
         <div className="flex flex-col gap-2 border-l border-white/10 pl-4">
            <span className="text-white/80 font-bold tracking-widest">DRIVE_UNIT_01</span>
            <div className="flex gap-1 h-1 w-20 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                  animate={{ width: ["20%", "85%", "20%"] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="h-full bg-cyan-500/50" 
               />
            </div>
         </div>
         <div className="flex flex-col gap-2 border-l border-white/10 pl-4">
            <span className="text-white/80 font-bold tracking-widest">SIGNAL_UPLINK</span>
            <span className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
               SECURE_CONNECTION
            </span>
         </div>
      </div>

      {/* Perimeter Brackets */}
      <div className="absolute inset-8 border border-white/5 pointer-events-none">
         <div className="absolute top-0 left-0 w-8 h-[1px] bg-white/20" />
         <div className="absolute top-0 left-0 w-[1px] h-8 bg-white/20" />
         <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-white/20" />
         <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-white/20" />
      </div>
    </div>
  )
}
