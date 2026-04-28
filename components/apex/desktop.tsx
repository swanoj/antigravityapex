"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { APPS, type AppId } from "@/lib/apex/apps"
import { Wallpaper } from "./wallpaper"
import { MenuBar } from "./menu-bar"
import { DesktopIcons } from "./desktop-icons"
import { Dock } from "./dock"
import { Window, type WindowState } from "./window"
import { SearchBar } from "./search-bar"
import { BootLoader } from "./boot-loader"
import { BroadcastMonitor } from "./broadcast-monitor"
import { PortfolioSection } from "./portfolio/portfolio-section"

import { AboutApp } from "./apps/about-app"
import { ServicesApp } from "./apps/services-app"
import { ProcessApp } from "./apps/process-app"
import { ProjectsApp } from "./apps/projects-app"
import { VideoApp } from "./apps/video-app"
import { TerminalApp } from "./apps/terminal-app"
import { ContactApp } from "./apps/contact-app"
import { SettingsApp } from "./apps/settings-app"
import { InsightsApp } from "./apps/insights-app"
import { MusicApp } from "./apps/music-app"
import { WarRoomApp } from "./apps/war-room-app"
import { ProofVaultApp } from "./apps/proof-vault-app"

export function Desktop() {
  const [booted, setBooted] = useState(false)
  const [windows, setWindows] = useState<Record<string, WindowState>>({})
  const [order, setOrder] = useState<AppId[]>([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [containerSize, setContainerSize] = useState({ w: 1280, h: 800 })
  const containerRef = useRef<HTMLDivElement | null>(null)
  const zCounter = useRef(10)
  const positionCounter = useRef(0)

  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)

  // measure container
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const r = containerRef.current.getBoundingClientRect()
      setContainerSize({ w: r.width, h: r.height })
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const focusedApp: AppId | null =
    order.length > 0 ? order[order.length - 1] : null

  const focusedTitle = useMemo(() => {
    if (isPortfolioOpen) return "APEX Portfolio — Selected Works"
    if (!focusedApp) return "APEX Desktop"
    const w = windows[focusedApp]
    if (!w || w.minimized) return "APEX Desktop"
    return `${APPS[focusedApp].name} — ${APPS[focusedApp].subtitle}`
  }, [focusedApp, windows, isPortfolioOpen])

  const openApp = useCallback(
    (id: AppId) => {
      if (id === "search") {
        setSearchOpen(true)
        return
      }
      if (id === "projects") {
        setIsPortfolioOpen(true)
        return
      }
      setWindows((cur) => {
        const z = ++zCounter.current
        const existing = cur[id]
        if (existing) {
          // focus or un-minimize
          return {
            ...cur,
            [id]: { ...existing, minimized: false, zIndex: z },
          }
        }
        const def = APPS[id]
        const offset = (positionCounter.current++ % 6) * 28
        const w = Math.min(def.defaultSize.w, containerSize.w - 40)
        const h = Math.min(def.defaultSize.h, containerSize.h - 120)
        const x = Math.max(40, Math.round((containerSize.w - w) / 2) + offset - 60)
        const y = Math.max(60, Math.round((containerSize.h - h) / 2) + offset - 30)
        return {
          ...cur,
          [id]: {
            id,
            title: def.name,
            subtitle: def.subtitle,
            position: { x, y },
            size: { w, h },
            zIndex: z,
            minimized: false,
            maximized: false,
          },
        }
      })
      setOrder((o) => [...o.filter((x) => x !== id), id])
    },
    [containerSize.w, containerSize.h],
  )

  const closeApp = useCallback((id: AppId) => {
    setWindows((cur) => {
      const next = { ...cur }
      delete next[id]
      return next
    })
    setOrder((o) => o.filter((x) => x !== id))
  }, [])

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((cur) =>
      cur[id] ? { ...cur, [id]: { ...cur[id], minimized: true } } : cur,
    )
    setOrder((o) => o.filter((x) => x !== id))
  }, [])

  const toggleMaximize = useCallback((id: AppId) => {
    setWindows((cur) =>
      cur[id]
    ? { ...cur, [id]: { ...cur[id], maximized: !cur[id].maximized } }
        : cur,
    )
  }, [])

  const focusApp = useCallback(
    (id: AppId) => {
      setWindows((cur) => {
        if (!cur[id]) return cur
        const z = ++zCounter.current
        return { ...cur, [id]: { ...cur[id], zIndex: z, minimized: false } }
      })
      setOrder((o) => [...o.filter((x) => x !== id), id])
    },
    [],
  )

  const moveApp = useCallback(
    (id: AppId, pos: { x: number; y: number }) => {
      setWindows((cur) =>
        cur[id] ? { ...cur, [id]: { ...cur[id], position: pos } } : cur,
      )
    },
    [],
  )

  const resizeApp = useCallback(
    (id: AppId, size: { w: number; h: number }) => {
      setWindows((cur) =>
        cur[id] ? { ...cur, [id]: { ...cur[id], size } } : cur,
      )
    },
    [],
  )

  // global ⌘K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen((s) => !s)
      }
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false)
      }
      if (e.key === "Escape" && isPortfolioOpen) {
        setIsPortfolioOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [searchOpen, isPortfolioOpen])

  // open About on first boot for atmosphere
  useEffect(() => {
    if (!booted) return
    const t = setTimeout(() => {
      openApp("about")
    }, 350)
    return () => clearTimeout(t)
  }, [booted, openApp])

  const openWindowsTitles = useCallback(() => {
    return Object.values(windows)
      .filter((w) => !w.minimized)
      .map((w) => `${w.title} (${w.id})`)
  }, [windows])

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case "about":
        return <AboutApp />
      case "services":
        return <ServicesApp />
      case "process":
        return <ProcessApp />
      case "projects":
        return <ProjectsApp />
      case "video":
        return <VideoApp />
      case "terminal":
        return (
          <TerminalApp
            onCommand={(target) => openApp(target)}
            openWindowsTitles={openWindowsTitles}
          />
        )
      case "contact":
        return <ContactApp />
      case "settings":
        return <SettingsApp />
      case "insights":
        return <InsightsApp />
      case "music":
        return <MusicApp />
      case "warroom":
        return <WarRoomApp />
      case "proof":
        return <ProofVaultApp />
      default:
        return null
    }
  }

  const openSet = useMemo(
    () => new Set(Object.keys(windows) as AppId[]),
    [windows],
  )

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden bg-[#F5F5F0] text-black select-none font-sans"
    >
      {/* Desktop Layer */}
      <motion.div 
        className="relative h-full w-full"
        animate={{ 
          y: isPortfolioOpen ? "-100vh" : 0,
          scale: isPortfolioOpen ? 0.96 : 1,
          opacity: isPortfolioOpen ? 0 : 1 
        }}
        transition={{ type: "spring", damping: 30, stiffness: 90 }}
      >
        <Wallpaper />
        
        {/* Gallery Overlay - Subtle Architectural Grid */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />


        <MenuBar
          focusedTitle={focusedTitle}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenApp={(id) => openApp(id)}
        />

        <DesktopIcons onOpen={openApp} />

        {/* windows */}
        <div className="pointer-events-none absolute inset-0">
          <AnimatePresence>
            {Object.values(windows).map((w) => (
              <Window
                key={w.id}
                state={w}
                isFocused={focusedApp === w.id && !w.minimized}
                containerSize={containerSize}
                accent={APPS[w.id].tint}
                onFocus={() => focusApp(w.id)}
                onClose={() => closeApp(w.id)}
                onMinimize={() => minimizeApp(w.id)}
                onToggleMaximize={() => toggleMaximize(w.id)}
                onMove={(pos) => moveApp(w.id, pos)}
                onResize={(size) => resizeApp(w.id, size)}
              >
                <div className="relative h-full w-full">
                   {renderAppContent(w.id)}
                   {/* Window Scanline overlay */}
                   <div className="pointer-events-none absolute inset-0 z-[100] opacity-[0.015] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                </div>
              </Window>
            ))}
          </AnimatePresence>
        </div>

        <Dock
          openApps={openSet}
          focusedApp={focusedApp}
          onOpen={openApp}
          onOpenSearch={() => setSearchOpen(true)}
        />

        <SearchBar
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          onCommand={(id) => openApp(id)}
        />

        {!booted && <BootLoader onDone={() => setBooted(true)} />}

        {/* hint when nothing is open */}
        {booted && Object.keys(windows).length === 0 && (
          <div className="pointer-events-none absolute bottom-24 left-1/2 z-[140] -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
            SYSTEM_IDLE // ACCESS_COMMAND_K
          </div>
        )}
      </motion.div>

      {/* Portfolio Layer */}
      <AnimatePresence>
        {isPortfolioOpen && (
          <PortfolioSection 
            onClose={() => setIsPortfolioOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}
