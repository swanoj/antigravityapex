"use client"

import { motion, useDragControls } from "framer-motion"
import { useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { AppId } from "@/lib/apex/apps"

export type WindowState = {
  id: AppId
  title: string
  subtitle?: string
  position: { x: number; y: number }
  size: { w: number; h: number }
  zIndex: number
  minimized: boolean
  maximized: boolean
}

type Props = {
  state: WindowState
  isFocused: boolean
  containerSize: { w: number; h: number }
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
  onToggleMaximize: () => void
  onMove: (pos: { x: number; y: number }) => void
  onResize: (size: { w: number; h: number }) => void
  children: ReactNode
  /** Optional accent color for window glow */
  accent?: string
}

export function Window({
  state,
  isFocused,
  containerSize,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  onResize,
  children,
  accent = "#00F0FF",
}: Props) {
  const dragControls = useDragControls()
  const constraintsRef = useRef<HTMLDivElement | null>(null)
  const [resizing, setResizing] = useState(false)
  const startRef = useRef<{
    x: number
    y: number
    w: number
    h: number
  } | null>(null)

  const isMax = state.maximized
  const w = isMax ? containerSize.w - 16 : state.size.w
  const h = isMax ? containerSize.h - 96 : state.size.h
  const x = isMax ? 8 : state.position.x
  const y = isMax ? 40 : state.position.y

  const startResize = (e: React.PointerEvent) => {
    if (isMax) return
    e.stopPropagation()
    e.preventDefault()
    setResizing(true)
    startRef.current = {
      x: e.clientX,
      y: e.clientY,
      w: state.size.w,
      h: state.size.h,
    }
    const onMoveEv = (ev: PointerEvent) => {
      if (!startRef.current) return
      const dx = ev.clientX - startRef.current.x
      const dy = ev.clientY - startRef.current.y
      onResize({
        w: Math.max(420, Math.min(containerSize.w - 16, startRef.current.w + dx)),
        h: Math.max(320, Math.min(containerSize.h - 96, startRef.current.h + dy)),
      })
    }
    const onUp = () => {
      setResizing(false)
      startRef.current = null
      window.removeEventListener("pointermove", onMoveEv)
      window.removeEventListener("pointerup", onUp)
    }
    window.addEventListener("pointermove", onMoveEv)
    window.addEventListener("pointerup", onUp)
  }

  const isDarkApp = state.id === "terminal" || state.id === "video"

  return (
    <div
      ref={constraintsRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden={false}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40, filter: "brightness(2) contrast(1.5)" }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x,
          width: w,
          height: h,
          top: y,
          left: 0,
          filter: "brightness(1) contrast(1)",
        }}
        exit={{ opacity: 0, scale: 0.95, y: 20, filter: "brightness(0)" }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30, 
          mass: 0.8,
          filter: { duration: 0.2 } 
        }}
        drag={!isMax && !resizing}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{
          top: 32,
          left: 0,
          right: containerSize.w - w,
          bottom: containerSize.h - 96,
        }}
        onDragEnd={(_, info) => {
          onMove({
            x: Math.max(0, Math.min(containerSize.w - w, x + info.offset.x)),
            y: Math.max(32, Math.min(containerSize.h - 96, y + info.offset.y)),
          })
        }}
        onPointerDown={onFocus}
        style={{
          zIndex: state.zIndex,
        }}
        className={cn(
          "pointer-events-auto absolute apex-editorial-window overflow-hidden border border-black/10",
          "flex flex-col shadow-2xl transition-shadow",
          isDarkApp ? "bg-black text-white shadow-red-900/10" : "bg-white text-black shadow-zinc-900/20",
          isFocused ? "z-[100]" : "z-[10]",
          // Chromatic aberration feel
          "before:content-[''] before:absolute before:inset-[-1px] before:border before:border-red-500/5 before:pointer-events-none before:z-0",
          "after:content-[''] after:absolute after:inset-[-2px] after:border after:border-blue-500/5 after:pointer-events-none after:z-0"
        )}
      >
        {/* Title bar — Editorial Style */}
        <div
          onPointerDown={(e) => {
            onFocus()
            if (!isMax) dragControls.start(e)
          }}
          onDoubleClick={onToggleMaximize}
          className={cn(
            "relative flex h-12 shrink-0 items-center justify-between border-b px-6 select-none z-10",
            isMax ? "cursor-default" : "cursor-grab active:cursor-grabbing",
            isDarkApp ? "border-white/10 bg-zinc-900" : "border-black/5 bg-zinc-50/50"
          )}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onClose}
              className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] border border-black/10"
            />
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onMinimize}
              className="h-2.5 w-2.5 rounded-full bg-[#febc2e] border border-black/10"
            />
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onToggleMaximize}
              className="h-2.5 w-2.5 rounded-full bg-[#28c840] border border-black/10"
            />
          </div>

          {/* Title - Centered & Bolt */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
             <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-muted-foreground/40">
               {state.id}
            </span>
            <span className={cn(
              "font-sans text-[11px] font-black uppercase tracking-[0.3em]",
              isDarkApp ? "text-white" : "text-black"
            )}>
              {state.title}
            </span>
          </div>

          {/* Right meta - High precision */}
          <div className="flex items-center gap-4 font-mono text-[8px] uppercase tracking-[0.4em] text-black/20">
            <span>RES_{w}x{h}</span>
          </div>
        </div>

        {/* Body */}
        <div className={cn(
          "apex-scroll relative flex-1 overflow-auto",
          isDarkApp ? "bg-[#0a0a0a]" : "bg-white"
        )}>
          {children}
          
          {/* Internal Hardware Grain */}
          <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-[99]" />
          
          {/* Editorial Stamp */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none z-0">
             <div className="border-[12px] border-black p-8 rotate-[-12deg]">
                <span className="text-[14vw] font-black tracking-tighter uppercase whitespace-nowrap">SYSTEM_AG</span>
             </div>
          </div>
        </div>

        {/* Resize handle */}
        {!isMax && (
          <button
            type="button"
            aria-label="Resize window"
            onPointerDown={startResize}
            className="absolute bottom-1.5 right-1.5 z-50 h-4 w-4 cursor-nwse-resize opacity-10 hover:opacity-100 transition"
          >
            <div className="h-full w-full border-b-2 border-r-2 border-black" />
          </button>
        )}
      </motion.div>
    </div>
  )
}
