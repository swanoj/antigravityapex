"use client"

import { useEffect, useRef, useState } from "react"
import type { AppId } from "@/lib/apex/apps"
import { APPS } from "@/lib/apex/apps"
import { APEX_STATS } from "@/lib/apex/data"
import { cn } from "@/lib/utils"

type Line =
  | { kind: "out"; text: string; tone?: "default" | "cyan" | "orange" | "muted" | "ok" | "err" }
  | { kind: "in"; text: string }
  | { kind: "block"; node: React.ReactNode }

type Props = {
  onCommand: (id: AppId) => void
  openWindowsTitles: () => string[]
}

const HELP: { cmd: string; desc: string }[] = [
  { cmd: "help, man", desc: "list available commands" },
  { cmd: "open <app>", desc: "open about|services|process|projects|video|terminal|contact|settings" },
  { cmd: "stats", desc: "show key APEX metrics" },
  { cmd: "launch campaign", desc: "ignite a new campaign sequence" },
  { cmd: "windows", desc: "list currently open windows" },
  { cmd: "clear", desc: "clear the terminal buffer" },
  { cmd: "whoami", desc: "identify the operator" },
  { cmd: "exit", desc: "close the terminal" },
]

const APP_KEYS: Record<string, AppId> = {
  about: "about",
  services: "services",
  process: "process",
  projects: "projects",
  video: "video",
  "video lab": "video",
  terminal: "terminal",
  contact: "contact",
  settings: "settings",
}

export function TerminalApp({ onCommand, openWindowsTitles }: Props) {
  const [lines, setLines] = useState<Line[]>(() => banner())
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  
  // Real-time uplink to system audio
  const [audioState, setAudioState] = useState("IDLE")
  const [location, setLocation] = useState("LOC_UNKNOWN")

  useEffect(() => {
    try {
      const loc = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).format(new Date()).split(' ').pop() || "UTC"
      setLocation(loc)
    } catch (e) {
      setLocation("UTC")
    }
  }, [])
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  const push = (line: Line | Line[]) => {
    setLines((cur) => cur.concat(line))
  }

  const exec = async (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return
    push({ kind: "in", text: cmd })

    const lower = cmd.toLowerCase()

    if (lower === "help" || lower === "man") {
      push({
        kind: "block",
        node: (
          <div className="my-1 space-y-0.5">
            <div className="text-[color:var(--apex-cyan)]">› apex commands</div>
            {HELP.map((h) => (
              <div key={h.cmd} className="grid grid-cols-[200px_1fr] gap-2">
                <span className="text-white">{h.cmd}</span>
                <span className="text-white/50">{h.desc}</span>
              </div>
            ))}
          </div>
        ),
      })
      return
    }

    if (lower === "clear") {
      setLines([])
      return
    }

    if (lower === "whoami") {
      push({ kind: "out", text: "operator · anonymous · clearance: tier-1", tone: "cyan" })
      return
    }

    if (lower === "exit") {
      onCommand("terminal") // toggle - parent handles close on second open? we'll just print.
      push({ kind: "out", text: "session closed. (press the red dot to fully exit)", tone: "muted" })
      return
    }

    if (lower === "windows") {
      const titles = openWindowsTitles()
      if (titles.length === 0) {
        push({ kind: "out", text: "no windows currently open.", tone: "muted" })
      } else {
        push({
          kind: "block",
          node: (
            <div>
              <div className="text-[color:var(--apex-cyan)]">› open windows ({titles.length})</div>
              {titles.map((t, i) => (
                <div key={i} className="text-white/70">
                  - {t}
                </div>
              ))}
            </div>
          ),
        })
      }
      return
    }

    if (lower === "stats") {
      push({
        kind: "block",
        node: (
          <div className="my-1">
            <div className="text-[color:var(--apex-cyan)]">› apex performance signals</div>
            <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-0.5 sm:grid-cols-4">
              {APEX_STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-white/40 text-[10px] uppercase tracking-[0.18em]">
                    {s.label}
                  </div>
                  <div className="text-white text-lg">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      })
      return
    }

    if (lower === "launch campaign" || lower === "launch") {
      setBusy(true)
      const seq = [
        "› priming creative engine ........... ok",
        "› aligning bid signals ........... ok",
        "› deploying to meta + google ........... ok",
        "› compounding ........... 🔥",
        "[ CAMPAIGN LIVE — DOMINATING ]",
      ]
      for (const s of seq) {
        await sleep(380)
        push({
          kind: "out",
          text: s,
          tone: s.startsWith("[") ? "orange" : "default",
        })
      }
      setBusy(false)
      return
    }

    // open <app>
    const openMatch = lower.match(/^(?:open|launch|show|go to|goto|focus)\s+(.+)$/)
    if (openMatch) {
      const target = openMatch[1].trim()
      const id = APP_KEYS[target]
      if (id) {
        push({ kind: "out", text: `› opening ${APPS[id].name} ...`, tone: "cyan" })
        onCommand(id)
        return
      }
      push({
        kind: "out",
        text: `unknown target "${target}". try: about, services, process, projects, video, terminal, contact, settings.`,
        tone: "err",
      })
      return
    }

    // direct app name shortcuts
    if (APP_KEYS[lower]) {
      const id = APP_KEYS[lower]
      push({ kind: "out", text: `› opening ${APPS[id].name} ...`, tone: "cyan" })
      onCommand(id)
      return
    }

    push({
      kind: "out",
      text: `command not found: ${cmd}. type "help" for the list.`,
      tone: "err",
    })
  }

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !busy) {
      e.preventDefault()
      const cmd = input
      setInput("")
      if (cmd.trim()) {
        setHistory((h) => [...h, cmd])
        setHIdx(null)
      }
      await exec(cmd)
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length === 0) return
      const next =
        hIdx === null ? history.length - 1 : Math.max(0, hIdx - 1)
      setHIdx(next)
      setInput(history[next])
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (hIdx === null) return
      const next = hIdx + 1
      if (next >= history.length) {
        setHIdx(null)
        setInput("")
      } else {
        setHIdx(next)
        setInput(history[next])
      }
    }
  }

  return (
    <div
      className="relative h-full bg-[#0A0A0A] font-mono text-[11px] leading-snug text-white/90 selection:bg-white/20"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Hardware Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] z-0" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] z-0" />

      <div
        className="apex-scroll relative h-full overflow-y-auto px-6 py-6 z-10"
        ref={scrollRef}
        style={{ textShadow: "0 0 5px rgba(255,255,255,0.2)" }}
      >
        {lines.map((l, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap break-words">
            {l.kind === "in" ? (
              <div className="flex items-center gap-2">
                <span className="text-white/20 select-none">›</span>
                <span className="text-white font-bold">{l.text}</span>
              </div>
            ) : l.kind === "out" ? (
              <div className={cn("pl-4 border-l border-white/5", toneClass(l.tone))}>
                {l.text}
              </div>
            ) : (
              <div className="pl-4">{l.node}</div>
            )}
          </div>
        ))}

        {/* prompt */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-emerald-500 animate-pulse select-none">●</span>
          <span className="text-white/20 select-none">›</span>
          <input
            ref={inputRef}
            value={input}
            disabled={busy}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            aria-label="Terminal input"
            className="flex-1 border-0 bg-transparent p-0 font-mono text-[11px] text-white outline-none placeholder:text-white/10 tracking-widest"
            placeholder={busy ? "PROCESSING..." : "ENTER_COMMAND"}
          />
        </div>
      </div>
    </div>
  )
}

function toneClass(tone?: "default" | "cyan" | "orange" | "muted" | "ok" | "err") {
  switch (tone) {
    case "cyan":
      return "text-cyan-400 font-bold tracking-widest"
    case "orange":
      return "text-orange-400 font-bold"
    case "muted":
      return "text-white/30 italic"
    case "ok":
      return "text-emerald-400"
    case "err":
      return "text-rose-500 font-bold animate-pulse"
    default:
      return "text-white/80"
  }
}

function banner(): Line[] {
  return [
    { kind: "out", text: " " },
    { 
      kind: "block", 
      node: (
        <div className="font-black text-[10px] leading-tight text-white mb-4">
          <div>█████╗ ██████╗ ███████╗██╗  ██╗</div>
          <div>██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝</div>
          <div>███████║██████╔╝█████╗   ╚███╔╝ </div>
          <div>██╔══██║██╔═══╝ ██╔══╝   ██╔██╗ </div>
          <div>██║  ██║██║     ███████╗██╔╝ ██╗</div>
          <div>╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝</div>
        </div>
      )
    },
    { kind: "out", text: "KERNEL_UPLINK_09 // STABLE", tone: "cyan" },
    { kind: "out", text: "SESSION_AUTH: OPERATOR_LEVEL_4", tone: "muted" },
    { kind: "out", text: " " },
    { 
      kind: "block", 
      node: (
        <div className="flex gap-4 border-y border-white/5 py-2 my-2 font-mono text-[9px] uppercase tracking-widest text-white/40 overflow-hidden">
          <span className="text-cyan-400">AUDIO: CONNECTED</span>
          <span className="animate-pulse">SIGNAL: OPTIMAL</span>
          <span>LOCATION: {location}</span>
        </div>
      )
    },
  ]
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}
