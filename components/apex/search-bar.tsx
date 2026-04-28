"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Search, ArrowRight, Command } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { APPS, type AppId } from "@/lib/apex/apps"
import { cn } from "@/lib/utils"

type Suggestion = {
  id: AppId
  label: string
  hint: string
  action: "open" | "focus"
}

type Props = {
  open: boolean
  onClose: () => void
  onCommand: (id: AppId) => void
}

const FAQ: { q: string; answer: string; route?: AppId }[] = [
  { q: "roi", answer: "Average ROI +14×. Open About for records.", route: "about" },
  { q: "process", answer: "Open Process to see the Strategic Engine.", route: "process" },
  { q: "book", answer: "Opening Contact interface.", route: "contact" },
]

function fuzzyScore(query: string, target: string): number {
  if (!query) return 0
  const q = query.toLowerCase()
  const t = target.toLowerCase()
  if (t === q) return 100
  if (t.startsWith(q)) return 80
  if (t.includes(q)) return 60
  return 0
}

export function SearchBar({ open, onClose, onCommand }: Props) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (open) {
      setQuery("")
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const suggestions = useMemo<Suggestion[]>(() => {
    const q = query.trim().toLowerCase()
    const apps = Object.values(APPS).filter((a) => a.id !== "search")

    const candidates = apps.flatMap((a) => {
      const targets = [a.name, ...a.aliases]
      const best = Math.max(...targets.map((t) => fuzzyScore(q, t)))
      return [
        {
          id: a.id,
          label: q ? `Open ${a.name}` : a.name,
          hint: a.subtitle,
          action: "open" as const,
          score: best,
        },
      ]
    })

    if (!q) return candidates.sort((a, b) => a.label.localeCompare(b.label))

    return candidates
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  }, [query])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "Enter" && suggestions[0]) {
        onCommand(suggestions[0].id)
        onClose()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose, onCommand, suggestions])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-[300] bg-white/20 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-1/2 top-1/4 z-[310] w-[min(580px,92vw)] -translate-x-1/2"
          >
            <div className="bg-white soft-shadow rounded-sm overflow-hidden border border-[#E5E5E0]">
              <div className="flex items-center gap-5 px-8 py-6 border-b border-[#E5E5E0]">
                <Search className="h-5 w-5 text-black opacity-30" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Summon protocol..."
                  className="flex-1 bg-transparent font-sans text-xl font-bold tracking-tight text-black placeholder:text-black/10 focus:outline-none"
                />
                <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-black/20 uppercase tracking-widest bg-[#F5F5F0] px-3 py-1 border border-[#E5E5E0]">
                   <Command className="h-2.5 w-2.5" /> <span>K</span>
                </div>
              </div>

              <ul className="p-3">
                {suggestions.length === 0 && (
                  <li className="px-8 py-12 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-black/20">
                    Protocol_Not_Found // Try "Portfolio"
                  </li>
                )}
                {suggestions.map((s, i) => {
                  const app = APPS[s.id]
                  const Icon = app.icon
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => {
                          onCommand(s.id)
                          onClose()
                        }}
                        className="group flex w-full items-center gap-5 rounded-sm px-5 py-4 text-left hover:bg-[#F5F5F0] transition-colors"
                      >
                        <div className="flex h-11 w-11 items-center justify-center bg-black text-white group-hover:scale-105 transition-transform">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <span className="text-lg font-bold tracking-tight text-black flex items-center gap-3">
                            {s.label}
                            {i === 0 && <span className="text-[8px] font-mono bg-black text-white px-1.5 py-0.5 tracking-widest">BEST_MATCH</span>}
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#666666] mt-1">
                            {s.hint}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-black opacity-0 group-hover:opacity-20 transition-opacity" />
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="flex items-center justify-between bg-[#F5F5F0] px-8 py-3 font-mono text-[9px] uppercase tracking-[0.3em] text-black/30 border-t border-[#E5E5E0]">
                <span>APEX_SYSTEM_QUERY</span>
                <span className="font-bold">2024_INDEX</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
