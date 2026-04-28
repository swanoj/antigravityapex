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
  const w = isMax ? containerSize.w : state.size.w
  const h = isMax ? containerSize.h - 32 : state.size.h
  const x = isMax ? 0 : state.position.x
  const y = isMax ? 32 : state.position.y

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
        w: Math.max(420, Math.min(containerSize.w, startRef.current.w + dx)),
        h: Math.max(320, Math.min(containerSize.h - 32, startRef.current.h + dy)),
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

  const isVoidApp = state.id === "terminal" || state.id === "video"

  return (
    <div
      ref={constraintsRef}
      className="pointer-events-none absolute inset-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          x,
          width: w,
          height: h,
          top: y,
          left: 0,
        }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30, 
          mass: 1 
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
        style={{ zIndex: state.zIndex }}
        className={cn(
          "pointer-events-auto absolute flex flex-col bg-white overflow-hidden",
          isVoidApp ? "bg-[#0A0A0A] text-white" : "bg-white text-black",
          "soft-shadow",
          isMax ? "rounded-none" : "rounded-sm"
        )}
      >
        {/* Title bar - Minimal Editorial */}
        <div
          onPointerDown={(e) => {
            onFocus()
            if (!isMax) dragControls.start(e)
          }}
          onDoubleClick={onToggleMaximize}
          className={cn(
            "relative flex h-10 shrink-0 items-center justify-between px-6 select-none z-20 border-b",
            isMax ? "cursor-default" : "cursor-grab active:cursor-grabbing",
            isVoidApp ? "border-white/10 bg-[#0A0A0A]" : "border-[#E5E5E0] bg-white"
          )}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="h-2.5 w-2.5 rounded-full bg-[#000000]/10 hover:bg-[#ff5f57] border border-black/5" />
            <button onClick={onMinimize} className="h-2.5 w-2.5 rounded-full bg-[#000000]/10 hover:bg-[#febc2e] border border-black/5" />
            <button onClick={onToggleMaximize} className="h-2.5 w-2.5 rounded-full bg-[#000000]/10 hover:bg-[#28c840] border border-black/5" />
          </div>

          {/* Centered Title */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
             <span className="font-mono text-[7px] uppercase tracking-[0.4em] opacity-30">APP_{state.id}</span>
             <span className="font-sans text-[10px] font-bold uppercase tracking-[0.15em]">{state.title}</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[7px] uppercase tracking-[0.3em] opacity-20">
            {w}X{h}
          </div>
        </div>

        {/* Body */}
        <div className={cn(
          "relative flex-1 overflow-auto",
          isVoidApp ? "bg-[#0A0A0A]" : "bg-white"
        )}>
          {children}
        </div>

        {/* Resize handle */}
        {!isMax && (
          <button
            onPointerDown={startResize}
            className="absolute bottom-0 right-0 z-50 h-3 w-3 cursor-nwse-resize"
          >
            <div className="h-full w-full border-b-2 border-r-2 border-black/5" />
          </button>
        )}
      </motion.div>
    </div>
  )
}
