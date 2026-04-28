"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Search, ArrowRight, Command } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { APPS, type AppId } from "@/lib/apex/apps"

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
  {
    q: "what is your roi",
    answer:
      "Average client ROI is 14× across 200+ projects with 98% retention.",
    route: "about",
  },
  {
    q: "how do you work",
    answer: "Discover → Design → Build → Dominate. Open Process for the full system.",
    route: "process",
  },
  {
    q: "book a call",
    answer: "Opening Contact — pick a slot or drop a brief.",
    route: "contact",
  },
  {
    q: "show me work",
    answer: "Opening selected projects.",
    route: "projects",
  },
]

function fuzzyScore(query: string, target: string): number {
  if (!query) return 0
  const q = query.toLowerCase()
  const t = target.toLowerCase()
  if (t === q) return 100
  if (t.startsWith(q)) return 80
  if (t.includes(q)) return 60
  // letter-by-letter
  let qi = 0
  let score = 0
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) {
      score += 2
      qi++
    }
  }
  return qi === q.length ? score : 0
}

export function SearchBar({ open, onClose, onCommand }: Props) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (open) {
      setQuery("")
      // delay focus until after motion paints
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

    if (!q) {
      return candidates
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(({ score: _s, ...rest }) => rest)
    }

    // command shortcuts: "open xxx", "launch xxx", "show xxx"
    const cmdMatch = q.match(/^(?:open|launch|show|go to|goto|focus)\s+(.+)$/)
    const target = cmdMatch ? cmdMatch[1] : q

    candidates.forEach((c) => {
      const app = APPS[c.id]
      const targets = [app.name, ...app.aliases]
      c.score = Math.max(...targets.map((t) => fuzzyScore(target, t)))
      if (cmdMatch) c.score += 10
    })

    // FAQ overlay (highest priority on natural language matches)
    const faq = FAQ.find((f) => target.includes(f.q.split(" ")[0]) && fuzzyScore(target, f.q) > 30)
    const ranked = candidates
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(({ score: _s, ...rest }) => rest)

    if (faq && faq.route && !ranked.find((r) => r.id === faq.route)) {
      ranked.unshift({
        id: faq.route,
        label: faq.answer,
        hint: "answer · enter to open",
        action: "open",
      })
    }
    return ranked
  }, [query])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
      if (e.key === "Enter") {
        const first = suggestions[0]
        if (first) {
          e.preventDefault()
          onCommand(first.id)
          onClose()
        }
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
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-[300] bg-black/55 backdrop-blur-[2px]"
          />
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-20 z-[310] w-[min(620px,92vw)] -translate-x-1/2"
          >
            <div className="apex-chrome-glass overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
              <div className="flex items-center gap-4 border-b border-white/5 px-6 py-5">
                <Search className="h-5 w-5 text-white/40" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Summon any protocol..."
                  className="flex-1 bg-transparent font-sans text-lg font-bold tracking-tight text-white placeholder:text-white/20 focus:outline-none"
                  aria-label="Global search"
                />
                <kbd className="hidden items-center gap-1 rounded-sm border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-white/30 md:flex">
                  <Command className="h-2.5 w-2.5" />K
                </kbd>
              </div>

              <ul className="max-h-[400px] overflow-y-auto apex-scroll p-2">
                {suggestions.length === 0 && (
                  <li className="px-6 py-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">
                    protocol not found // try "services"
                  </li>
                )}
                {suggestions.map((s, i) => {
                  const app = APPS[s.id]
                  const Icon = app.icon
                  return (
                    <li key={`${s.id}-${i}`}>
                      <button
                        type="button"
                        onClick={() => {
                          onCommand(s.id)
                          onClose()
                        }}
                        className="group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-white/[0.08]"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/40 text-white ring-1 ring-white/10 group-hover:ring-white/30 transition-shadow">
                          <Icon className="h-5 w-5" style={{ color: app.tint }} />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <span className="text-base font-bold tracking-tight text-white">{s.label}</span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                            {s.hint}
                          </span>
                        </div>
                        <div className="opacity-0 transform translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                           <ArrowRight className="h-4 w-4 text-white/40" />
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="flex items-center justify-between border-t border-white/5 bg-black/40 px-6 py-3 font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
                <span>Select protocol then click Enter</span>
                <span className="text-white/40">ANTIGRAVITY APEX · LOCKED</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
