"use client"

import { useEffect, useState } from "react"
import { Wifi, Battery, Bluetooth, Search } from "lucide-react"

const MENU_ITEMS = ["File", "Edit", "View", "Go", "Window", "Help"]

type Props = {
  focusedTitle: string
  onOpenSearch: () => void
}

export function MenuBar({ focusedTitle, onOpenSearch }: Props) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(id)
  }, [])

  const time = now
    ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "--:--"
  const date = now
    ? now.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : ""

  return (
    <div
      className="absolute inset-x-0 top-0 z-[200] flex h-10 items-center justify-between apex-chrome-glass px-6 text-[10px] text-white/85 shadow-lg border-b border-white/5"
    >
      {/* Left — logo + menu */}
      <div className="flex items-center gap-6 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
             <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse absolute -left-3 top-1/2 -translate-y-1/2" />
             <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-white">
               APEX_PRIMARY
             </span>
          </div>
        </div>
        <nav className="hidden items-center gap-4 border-l border-white/10 pl-6 md:flex">
          {MENU_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              className="font-mono uppercase tracking-widest text-white/40 transition hover:text-white"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Center — Broadcast Ticker */}
      <div className="flex-1 max-w-xl mx-8 overflow-hidden relative hidden lg:flex items-center gap-4 bg-black/20 h-6 px-4 rounded-sm border border-white/5">
         <span className="font-mono text-[9px] font-bold text-emerald-500 shrink-0">LIVE_TICKER:</span>
         <div className="flex gap-12 animate-marquee whitespace-nowrap font-mono text-[9px] text-white/40 tracking-[0.2em]">
            <span>$APEX_CORE +14.2%</span>
            <span>UPLINK_STABLE // SINGAPORE_NODE_ACTIVE</span>
            <span>ROI_INDEX // 14X_TARGET_LOCKED</span>
            <span>$DOMINANCE_INDEX +2.4%</span>
            <span>SYSTEM_PULSE // NOMINAL</span>
            <span>$APEX_CORE +14.2%</span>
            <span>UPLINK_STABLE // SINGAPORE_NODE_ACTIVE</span>
         </div>
      </div>

      {/* Right — system tray */}
      <div className="flex items-center gap-4 text-white/70">
        <div className="hidden xl:flex items-center gap-2 border-r border-white/10 pr-4 mr-2">
           <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">Focused:</span>
           <span className="font-mono text-[10px] text-white font-bold uppercase truncate max-w-[120px]">{focusedTitle}</span>
        </div>

        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center gap-2 rounded bg-white/5 border border-white/10 px-2 py-1 transition hover:bg-white/10"
        >
          <Search className="h-3 w-3" />
          <kbd className="font-mono text-[9px] text-white/40">⌘K</kbd>
        </button>
        
        <div className="hidden md:flex items-center gap-3 ml-2">
           <Wifi className="h-3 w-3" />
           <Battery className="h-3.5 w-3.5" />
           <span className="font-mono text-[10px] tracking-tighter text-white">{time}</span>
        </div>

        <div className="ml-2 w-5 h-5 flex items-center justify-center bg-white text-black font-black text-[10px]">A</div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
