"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Activity, Radar, Rocket, ShieldCheck } from "lucide-react"
import { APEX_WARROOM_PHASES, APEX_WARROOM_STREAM } from "@/lib/apex/data"
import { cn } from "@/lib/utils"

const MODES = [
  { id: "precision", label: "Precision Mode", icon: ShieldCheck, tone: "#00F0FF" },
  { id: "velocity", label: "Velocity Mode", icon: Rocket, tone: "#3B82F6" },
  { id: "amplify", label: "Amplify Mode", icon: Activity, tone: "#FF6B00" },
] as const

export function WarRoomApp() {
  const [activeMode, setActiveMode] = useState<(typeof MODES)[number]["id"]>("precision")
  const [activePhase, setActivePhase] = useState(0)

  const modeMeta = useMemo(() => MODES.find((m) => m.id === activeMode) ?? MODES[0], [activeMode])
  const phase = APEX_WARROOM_PHASES[activePhase]

  return (
    <div className="h-full overflow-y-auto bg-[#050608] text-white">
      <header className="border-b border-white/10 px-8 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
              command center // live operations
            </span>
            <h2 className="mt-4 text-5xl font-black uppercase tracking-[-0.04em] md:text-7xl">
              War <span className="text-apex-cyan">Room</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-sm border border-white/10 bg-white/5 px-4 py-3">
            <Radar className="h-4 w-4 text-apex-cyan" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
              Uplink Stable // 99.98%
            </span>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-0 border-b border-white/10 lg:grid-cols-3">
        {APEX_WARROOM_STREAM.map((stream, idx) => (
          <motion.article
            key={stream.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="border-b border-white/10 p-7 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
                  {stream.channel}
                </p>
                <p className="mt-3 text-3xl font-black tracking-tight">{stream.stat}</p>
              </div>
              <span
                className="rounded-full border px-3 py-1 font-mono text-[8px] uppercase tracking-[0.24em]"
                style={{ borderColor: `${stream.accent}66`, color: stream.accent }}
              >
                {stream.status}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{stream.note}</p>
          </motion.article>
        ))}
      </section>

      <section className="grid grid-cols-1 border-b border-white/10 xl:grid-cols-5">
        <div className="border-b border-white/10 p-7 xl:col-span-2 xl:border-b-0 xl:border-r xl:border-white/10">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">Engagement Mode</h3>
          <div className="mt-5 grid gap-3">
            {MODES.map((mode) => {
              const Icon = mode.icon
              const selected = mode.id === activeMode
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setActiveMode(mode.id)}
                  className={cn(
                    "group flex items-center gap-4 rounded-sm border px-4 py-4 text-left transition",
                    selected
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
                  )}
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-sm border"
                    style={{ borderColor: `${mode.tone}66`, color: mode.tone }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold uppercase tracking-[0.12em]">{mode.label}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                      tactical profile loaded
                    </span>
                  </span>
                  {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-7 xl:col-span-3">
          <div className="flex flex-wrap items-center gap-3">
            {APEX_WARROOM_PHASES.map((item, idx) => (
              <button
                key={item.phase}
                type="button"
                onClick={() => setActivePhase(idx)}
                className={cn(
                  "rounded-full border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.22em] transition",
                  idx === activePhase
                    ? "border-white/40 bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80",
                )}
              >
                {item.phase}
              </button>
            ))}
          </div>

          <motion.div
            key={`${activeMode}-${phase.phase}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-sm border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/45">Current Phase</p>
            <h4 className="mt-2 text-4xl font-black uppercase tracking-[-0.03em]">{phase.phase}</h4>
            <p className="mt-3 text-lg text-white/70">{phase.objective}</p>
            <ul className="mt-6 grid gap-2 md:grid-cols-3">
              {phase.deliverables.map((deliverable) => (
                <li
                  key={deliverable}
                  className="rounded-sm border border-white/10 bg-black/20 px-3 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-white/75"
                >
                  {deliverable}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                Mode Active: {modeMeta.label}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: modeMeta.tone }}>
                campaign latency under 4ms
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
