"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { APEX_PROJECTS } from "@/lib/apex/data"
import { ArrowLeft, X, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface PortfolioSectionProps {
  onClose: () => void
}

const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.02] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
)

export function PortfolioSection({ onClose }: PortfolioSectionProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [expansionRect, setExpansionRect] = useState<DOMRect | null>(null)
  
  const handleProjectClick = (project: any, rect: DOMRect) => {
    setExpansionRect(rect)
    setSelectedProject(project)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex flex-col bg-[#F5F5F0] text-black overflow-y-auto font-sans select-none scroll-smooth"
    >
      <NoiseOverlay />

      {/* 1. The 'Ghost' Typography Layer - Fixed Desktop Background */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[25vw] font-bold tracking-[-0.06em] text-black/[0.03] uppercase leading-none">
          PROJECTS®
        </h1>
      </div>

      {/* Header - Editorial Style */}
      <div className="sticky top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-[100] glass-editorial border-b border-[#E5E5E0]">
        <div className="flex items-center gap-6">
           <button 
             onClick={onClose}
             className="group flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-sm lift-hover transition-all duration-300"
           >
             <X className="w-4 h-4" />
             <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Exit_Gallery</span>
           </button>
           <div className="h-4 w-px bg-black/10 hidden md:block" />
           <div className="hidden md:flex flex-col">
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-black/40">Archive_Ref</span>
              <span className="text-[10px] font-bold tracking-tight">SYST_PORTFOLIO_V3.0</span>
           </div>
        </div>
        
        <div className="flex items-center gap-8 font-mono text-[9px] uppercase tracking-[0.4em] text-black/40">
           <span className="hidden sm:inline">LOC_GLOBAL_NET</span>
           <span className="text-black font-bold">2024_INDEX</span>
        </div>
      </div>

      {/* 2. The Bento Box Grid */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {APEX_PROJECTS.map((project, i) => (
            <BentoCard 
              key={project.id} 
              project={project} 
              index={i} 
              onClick={(rect) => handleProjectClick(project, rect)}
            />
          ))}
        </div>
      </div>

      {/* 3. Project Detail Expansion */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectDetailView 
            project={selectedProject} 
            rect={expansionRect}
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <footer className="relative z-10 w-full p-12 border-t border-[#E5E5E0] mt-24 bg-white">
         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2">
               <span className="text-3xl font-bold tracking-[-0.04em]">APEX® SYSTEMS</span>
               <span className="text-[10px] font-mono text-black/40 uppercase tracking-[0.3em]">Built for the modern edge.</span>
            </div>
            <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em]">
               <button className="hover:opacity-50 transition-opacity">INQUIRE</button>
               <button className="hover:opacity-50 transition-opacity">INSTAGRAM</button>
               <button className="hover:opacity-50 transition-opacity">X.COM</button>
            </div>
         </div>
      </footer>
    </motion.section>
  )
}

function BentoCard({ project, index, onClick }: { project: any, index: number, onClick: (rect: DOMRect) => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Custom bento spanning logic
  const spanClass = [
    "md:col-span-2 md:row-span-2", // 0
    "md:col-span-2 md:row-span-1", // 1
    "md:col-span-1 md:row-span-1", // 2
    "md:col-span-1 md:row-span-2", // 3
    "md:col-span-2 md:row-span-1", // 4
    "md:col-span-2 md:row-span-2", // 5
  ][index % 6]

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className={cn(
        "relative group cursor-pointer overflow-hidden bg-white soft-shadow lift-hover transition-all duration-700",
        spanClass
      )}
      onClick={() => {
        if (cardRef.current) onClick(cardRef.current.getBoundingClientRect())
      }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
         <Image 
           src={project.image} 
           alt={project.client}
           fill
           className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
         />
         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
      </div>

      {/* Label Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-10 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-white via-white/80 to-transparent">
         <div className="flex items-center justify-between">
            <div className="flex flex-col">
               <span className="text-[9px] font-mono text-[#666666] uppercase tracking-[0.2em] mb-1">{project.category}</span>
               <h2 className="text-2xl font-bold tracking-tight uppercase">{project.client}</h2>
            </div>
            <div className="h-10 w-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
               <ArrowUpRight className="w-4 h-4" />
            </div>
         </div>
      </div>
      
      {/* Accent Index */}
      <div className="absolute top-6 right-8 z-10">
         <span className="text-[10px] font-mono text-black opacity-20 font-bold">
           {String(index + 1).padStart(2, '0')}
         </span>
      </div>
    </motion.div>
  )
}

function ProjectDetailView({ project, rect, onClose }: { project: any, rect: DOMRect | null, onClose: () => void }) {
  if (!rect) return null

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] bg-[#F5F5F0] flex flex-col overflow-y-auto"
    >
      {/* expansion image */}
      <motion.div 
        initial={{ 
          top: rect.top, 
          left: rect.left, 
          width: rect.width, 
          height: rect.height,
          position: 'fixed',
          zIndex: 50
        }}
        animate={{ 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '60vh',
          transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] }
        }}
        className="overflow-hidden"
      >
         <Image 
           src={project.image} 
           alt={project.client}
           fill
           className="object-cover"
         />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full mt-[60vh] bg-white min-h-screen">
         <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-24">
            <div className="flex justify-between items-start mb-24">
               <div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-[11px] font-mono text-[#666666] uppercase tracking-[0.4em] mb-4"
                  >
                    {project.category} // ARCHIVE_24
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-7xl md:text-9xl font-bold tracking-[-0.04em] uppercase leading-[0.85]"
                  >
                    {project.client}
                  </motion.h1>
               </div>
               
               <button 
                 onClick={onClose}
                 className="flex items-center gap-3 bg-black text-white px-8 py-3 rounded-sm lift-hover"
               >
                 <ArrowLeft className="w-4 h-4" />
                 <span className="text-[11px] font-bold uppercase tracking-widest">Back</span>
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-24 border-t border-[#E5E5E0] pt-16">
               <div className="md:col-span-4 space-y-12">
                  <div>
                    <h4 className="text-[10px] font-mono text-[#666666] uppercase tracking-[0.4em] mb-4">Core_Metric</h4>
                    <div className="text-4xl font-bold tracking-tighter italic">{project.metric}</div>
                  </div>
                  <div className="pt-8 border-t border-[#E5E5E0]">
                    <h4 className="text-[10px] font-mono text-[#666666] uppercase tracking-[0.4em] mb-4">Focus_Area</h4>
                    <ul className="space-y-4 text-[13px] font-bold uppercase tracking-wide">
                       <li>→ High Precision Design</li>
                       <li>→ Strategic Experience</li>
                       <li>→ Performance Engineering</li>
                    </ul>
                  </div>
               </div>
               
               <div className="md:col-span-8">
                  <p className="text-2xl md:text-4xl leading-tight font-medium text-black tracking-tight">
                    {project.summary} Redefining the intersection of digital utility and pure aesthetic momentum. Our team engaged with {project.client} to build a vision that transcends standard product definitions.
                  </p>
                  
                  <div className="mt-24 space-y-24">
                     <div className="aspect-[16/9] relative soft-shadow group overflow-hidden">
                        <Image src={project.image} alt="Detail" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110" />
                     </div>
                     <div className="grid grid-cols-2 gap-12">
                        <div className="aspect-[4/5] bg-[#F5F5F0] soft-shadow" />
                        <div className="aspect-[4/5] bg-[#F5F5F0] soft-shadow" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </motion.div>
  )
}
