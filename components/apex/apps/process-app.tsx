"use client"

import { motion } from "framer-motion"
import { APEX_PROCESS } from "@/lib/apex/data"

export function ProcessApp() {
  return (
    <div className="bg-white h-full overflow-y-auto">
      <div className="p-10 border-b border-black">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          // operations · alignment · v.04
        </span>
        <h2 className="mt-4 text-7xl font-bold tracking-tighter text-black md:text-9xl">
          The <br />
          <span className="opacity-20 italic">Method.</span>
        </h2>
      </div>

      <div className="flex flex-col">
        {APEX_PROCESS.map((p, i) => (
          <motion.div 
            key={p.step}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative flex border-b border-black last:border-b-0"
          >
            {/* Step Number Bar */}
            <div className="w-20 md:w-40 border-r border-black flex items-center justify-center bg-zinc-50 group-hover:bg-black transition-colors">
               <span className="text-4xl md:text-6xl font-bold tracking-tighter text-black group-hover:text-white transition-colors">
                  0{p.step}
               </span>
            </div>

            <div className="flex-1 p-10 md:p-20">
               <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4">
                  {p.summary}
               </div>
               <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-black">
                  {p.title}
               </h3>
               <p className="mt-8 text-lg font-medium leading-relaxed text-black/60 max-w-2xl">
                  {p.detail}
               </p>
               
               <div className="mt-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {["Linear Alignment", "Atomic Verification", "Hyper-Iteration"].map(tag => (
                    <span key={tag} className="flex-none font-mono text-[9px] uppercase tracking-widest border border-black/10 px-3 py-1 bg-zinc-50 text-black/40">
                       {tag}
                    </span>
                  ))}
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-20 bg-[#fafafa] border-t border-black">
         <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div>
               <h4 className="text-2xl font-bold tracking-tight text-black italic">The 90-Day Guarantee.</h4>
               <p className="mt-2 text-sm text-black/40 font-medium">If the needle doesn't move, we don't stop. Simple.</p>
            </div>
            <div className="h-16 w-1px bg-black hidden md:block" />
            <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-black/20 text-center md:text-left">
               AUTHENTICATED OPERATIONS // SEALED 2026
            </div>
         </div>
      </div>
    </div>
  )
}
