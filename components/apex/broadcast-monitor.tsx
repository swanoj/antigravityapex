"use client"

import { motion } from "framer-motion"
import { Radio, Maximize2, ExternalLink } from "lucide-react"

export function BroadcastMonitor() {
  return (
    <motion.div 
      drag
      dragMomentum={false}
      initial={{ x: 40, y: 120, opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute z-[50] w-72 bg-black border border-white/10 rounded-lg shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing group"
    >
      {/* Header */}
      <div className="bg-zinc-900 px-3 py-2 flex justify-between items-center border-b border-white/5">
         <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] font-bold text-white/60 tracking-widest uppercase">Uplink_AG_01</span>
         </div>
         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 size={10} className="text-white/40" />
            <ExternalLink size={10} className="text-white/40" />
         </div>
      </div>

      {/* Video Content */}
      <div className="aspect-video relative bg-black bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat">
         <iframe 
            className="w-full h-full opacity-60 grayscale blur-[0.5px]"
            src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=0&loop=1&playlist=jfKfPfyJRdk" 
            allow="autoplay; encrypted-media" 
         />
         {/* Scanline Overlay */}
         <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_3px)] bg-[length:100%_4px]" />
         
         {/* Data Overlay */}
         <div className="absolute bottom-2 left-2 font-mono text-[8px] text-red-600 font-bold bg-black/40 px-1">
            REC // 00:34:12:09
         </div>
         <div className="absolute top-2 right-2 font-mono text-[8px] text-white/20">
            CHN_SELECT: L_01
         </div>
      </div>

      {/* Footer Meta */}
      <div className="px-3 py-1.5 bg-zinc-950 flex justify-between items-center">
         <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-0.5 h-2 bg-white/10" />
            ))}
         </div>
         <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest italic">Global_Signal_Secured</span>
      </div>
    </motion.div>
  )
}
