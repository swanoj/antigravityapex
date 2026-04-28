"use client"

import { useEffect, useState } from "react"
import { Wifi, Battery, Search, Command } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AppId } from "@/lib/apex/apps"

const MENU_ITEMS: { label: string; target: AppId }[] = [
  { label: "Portfolio", target: "projects" },
  { label: "Archive", target: "proof" },
  { label: "Studio", target: "warroom" },
  { label: "Inquiry", target: "contact" },
]

type Props = {
  focusedTitle: string
  onOpenSearch: () => void
  onOpenApp: (id: AppId) => void
}

export function MenuBar({ focusedTitle, onOpenSearch, onOpenApp }: Props) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(id)
  }, [])

  const time = now
    ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "--:--"

  return (
    <div
      className={cn(
        "absolute inset-x-0 top-0 z-[200] flex h-10 items-center justify-between px-6 border-b",
        "bg-white/40 backdrop-blur-md border-[#E5E5E0] text-[10px] text-black"
      )}
    >
      {/* Left — logo + menu */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-black flex items-center justify-center">
             <span className="text-[10px] text-white font-black leading-none">A</span>
          </div>
          <span className="font-bold uppercase tracking-[0.25em]">APEX® OS</span>
        </div>
        
        <nav className="hidden items-center gap-6 md:flex">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => onOpenApp(item.target)}
              className="font-bold uppercase tracking-[0.15em] text-black/40 hover:text-black transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Center — Status Ticker */}
      <div className="hidden lg:flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] bg-black/5 px-4 h-6 rounded-sm">
         <span className="opacity-30">SYSTEM_STATUS:</span>
         <span className="font-bold">ALL_NODES_NOMINAL</span>
         <div className="w-1 h-1 rounded-full bg-black animate-pulse" />
      </div>

      {/* Right — System Tray */}
      <div className="flex items-center gap-6">
        <div className="hidden xl:flex items-center gap-3">
           <span className="font-mono text-[9px] text-black/20 uppercase tracking-[0.2em]">VIEW:</span>
           <span className="font-bold uppercase truncate max-w-[150px] tracking-tight">{focusedTitle}</span>
        </div>

        <button
          onClick={onOpenSearch}
          className="flex items-center gap-3 hover:opacity-60 transition-opacity"
        >
          <Search className="h-3 w-3" />
          <div className="flex items-center gap-1 opacity-20">
             <Command className="h-2.5 w-2.5" />
             <span className="font-bold">K</span>
          </div>
        </button>
        
        <div className="flex items-center gap-4 border-l border-black/10 pl-6 h-4">
           <Wifi className="h-3 w-3 opacity-30" />
           <Battery className="h-3.5 w-3.5 opacity-30" />
           <span className="font-bold tracking-tighter">{time}</span>
        </div>
      </div>
    </div>
  )
}
