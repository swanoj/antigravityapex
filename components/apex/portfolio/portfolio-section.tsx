"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion"
import { APEX_PROJECTS } from "@/lib/apex/data"
import { ArrowLeft, ChevronRight, Share2, Plus, X, Globe, ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface PortfolioSectionProps {
  onClose: () => void
}

// Noise / Grain Component
const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.05] mix-blend-soft-light">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
)

// Music Ticker Ticker
const MusicTicker = () => (
  <div className="fixed top-6 right-8 z-[1000] flex items-center gap-3 overflow-hidden whitespace-nowrap bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-xl rounded-full">
    <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
    <motion.div 
      animate={{ x: [0, -100, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/60"
    >
      Now Playing: APEX_SYSTEM_FEED_VOL.01 — SYNC_ARCHIVE — 
    </motion.div>
  </div>
)

export function PortfolioSection({ onClose }: PortfolioSectionProps) {
  const [activeProject, setActiveProject] = useState(0)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [expansionRect, setExpansionRect] = useState<DOMRect | null>(null)
  
  // Custom Horizontal Scroll Logic with Momentum
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const targetX = useMotionValue(0)
  const currentX = useSpring(targetX, { stiffness: 50, damping: 20, mass: 0.5 })
  
  // Progress tracking
  const progress = useTransform(currentX, [0, -4000], [0, 100]) // Dynamic range needed
  
  // Handle Wheel Event for Horizontal Scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Delta can be vertical or horizontal
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      targetX.set(targetX.get() - delta * 2)
      
      // Boundaries
      if (targetX.get() > 0) targetX.set(0)
      if (scrollContainerRef.current) {
        const maxScroll = -(scrollContainerRef.current.scrollWidth - window.innerWidth + 400)
        if (targetX.get() < maxScroll) targetX.set(maxScroll)
      }
    }
    
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [targetX])

  // Track active project
  useEffect(() => {
    const unsubscribe = currentX.onChange((latest) => {
      const index = Math.min(
        APEX_PROJECTS.length - 1,
        Math.max(0, Math.round(Math.abs(latest) / (window.innerWidth * 0.4)))
      )
      setActiveProject(index)
    })
    return () => unsubscribe()
  }, [currentX])

  const handleProjectClick = (project: any, rect: DOMRect) => {
    setExpansionRect(rect)
    setSelectedProject(project)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex flex-col bg-[#080808] text-white overflow-hidden font-sans select-none"
    >
      <NoiseOverlay />
      <MusicTicker />

      {/* 1. The 'Ghost' Typography Layer */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[25vw] font-black tracking-tighter text-white/[0.03] uppercase leading-none opacity-40">
          PROJECTS®
        </h1>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-[100]">
        <button 
          onClick={onClose}
          className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 pl-3 pr-5 py-2 rounded-full transition-all active:scale-95"
        >
          <X className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Close</span>
        </button>
      </div>

      {/* 2. The Horizontal Physics / Gallery */}
      <div className="flex-1 relative flex items-center overflow-visible">
        <motion.div
           ref={scrollContainerRef}
           style={{ x: currentX }}
           className="flex items-center gap-[10vw] px-[20vw]"
        >
          {APEX_PROJECTS.map((project, i) => (
            <ScatteredProjectCard 
              key={project.id} 
              project={project} 
              index={i} 
              onClick={(rect) => handleProjectClick(project, rect)}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[2px] bg-white/5 z-[1000]">
        <motion.div 
          className="h-full bg-[#00F0FF] origin-left"
          style={{ scaleX: useTransform(progress, [0, 100], [0, 1]) }}
        />
      </div>

      {/* Bottom Label (TLB Style) */}
      <div className="fixed bottom-8 left-12 z-[100] flex flex-col gap-1">
        <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em]">Viewing_Archive</span>
        <div className="flex items-end gap-2">
           <span className="text-4xl font-black italic tracking-tighter leading-none">
             {String(activeProject + 1).padStart(2, '0')}
           </span>
           <span className="text-white/20 font-mono text-xs mb-1">/ {APEX_PROJECTS.length}</span>
        </div>
      </div>

      {/* 3. The 'Project Expansion' Logic */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailView 
            project={selectedProject} 
            rect={expansionRect}
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </motion.section>
  )
}

function ScatteredProjectCard({ project, index, onClick }: { project: any, index: number, onClick: (rect: DOMRect) => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Varying offsets and ratios for the scattered look
  const yOffset = useMemo(() => (index % 3 === 0 ? '-12%' : index % 3 === 1 ? '12%' : '2%'), [index])
  const aspectRatio = useMemo(() => (index % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[3.5/5]'), [index])
  const rotation = useMemo(() => (index % 2 === 0 ? -1 : 1), [index])
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotate: rotation * 5 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ delay: index * 0.05, duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
      className={`relative flex-shrink-0 group cursor-pointer w-[400px] md:w-[500px] ${aspectRatio} overflow-hidden bg-black/40 border border-white/5 transition-colors duration-700 hover:border-[#00F0FF]/30 hover:shadow-[0_0_100px_rgba(0,240,255,0.03)]`}
      style={{ y: yOffset }}
      onClick={() => {
        if (cardRef.current) onClick(cardRef.current.getBoundingClientRect())
      }}
    >
      {/* The 'Mix-Blend-Mode' Effect over the background text */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-difference group-hover:scale-105 transition-transform duration-[2000ms] ease-out-expo overflow-hidden">
         <Image 
           src={project.image} 
           alt={project.client}
           fill
           className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] blur-[2px] group-hover:blur-0"
         />
      </div>

      {/* Project Banner Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
         <div className="overflow-hidden h-4 mb-2">
           <motion.div 
             initial={{ y: "100%" }}
             whileInView={{ y: 0 }}
             className="text-[9px] font-mono text-[#00F0FF] uppercase tracking-[0.5em] flex items-center gap-2"
           >
             01_EXPLORE <div className="w-8 h-px bg-[#00F0FF]/30" />
           </motion.div>
         </div>
         <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.8] mb-1">
           {project.client}
         </h2>
         <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">{project.category}</div>
      </div>

      <div className="absolute top-8 right-10 z-20 mix-blend-difference">
         <span className="text-[10px] font-mono text-white/60 uppercase tracking-[0.3em] font-bold">{project.metric}</span>
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
      className="fixed inset-0 z-[2000] bg-[#050505] flex flex-col overflow-y-auto overflow-x-hidden"
    >
      {/* 1. The Expansion Transition */}
      <motion.div 
        initial={{ 
          top: rect.top, 
          left: rect.left, 
          width: rect.width, 
          height: rect.height,
          position: 'fixed'
        }}
        animate={{ 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '75vh',
          transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] }
        }}
        className="z-0 overflow-hidden"
      >
         <Image 
           src={project.image} 
           alt={project.client}
           fill
           className="object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20" />
      </motion.div>

      {/* Overlay UI */}
      <div className="relative z-10 w-full min-h-full flex flex-col px-8 md:px-24">
         {/* Top Actions */}
         <div className="flex justify-between items-center py-12">
            <button 
              onClick={onClose}
              className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full hover:bg-[#00F0FF] transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Back to Gallery</span>
            </button>
            <a href="#" className="flex items-center gap-2 text-white/40 hover:text-[#00F0FF] transition-colors group">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Source_Link</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
         </div>

         {/* Hero Title */}
         <div className="mt-auto mb-24">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[12vw] font-black uppercase leading-[0.8] tracking-tighter"
            >
              {project.client}
            </motion.h1>
         </div>

         {/* 4. Two-Column Grid Logic */}
         <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-32 border-t border-white/10 pt-12">
            <div className="md:col-span-4 space-y-8">
               <div>
                  <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-4">Metadata_01</h4>
                  <div className="text-2xl font-bold font-mono">2024 / Q2</div>
                  <div className="text-white/40 text-sm">{project.category}</div>
               </div>
               <div>
                  <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-4">Metadata_02</h4>
                  <div className="text-2xl font-bold font-mono">{project.metric}</div>
                  <div className="text-white/40 text-sm">Growth metrics enabled</div>
               </div>
            </div>
            
            <div className="md:col-span-8">
               <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-8">Summary</h4>
               <p className="text-2xl md:text-3xl leading-relaxed font-light text-white/90 text-justify hyphens-auto">
                 {project.summary} Experience a new era of digital immersion where the boundaries between hardware and software dissolve. Our collaboration with {project.client} pushed the limits of spatial design and real-time interaction, resulting in a project that redefined the sector.
               </p>
               
               <div className="mt-16 grid grid-cols-2 gap-8">
                  <div className="aspect-video bg-white/5 overflow-hidden border border-white/5">
                     <Image src={`/api/placeholder/800/600`} alt="Detail" fill className="object-cover opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="aspect-video bg-white/5 overflow-hidden border border-white/5">
                     <Image src={`/api/placeholder/800/600`} alt="Detail" fill className="object-cover opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </motion.div>
  )
}
