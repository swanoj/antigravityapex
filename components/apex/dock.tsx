"use client"

import { motion } from "framer-motion"
import { APPS, DOCK_APP_ORDER, type AppId } from "@/lib/apex/apps"
import { useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
  openApps: Set<AppId>
  focusedApp: AppId | null
  onOpen: (id: AppId) => void
  onOpenSearch: () => void
}

export function Dock({ openApps, focusedApp, onOpen, onOpenSearch }: Props) {
  const [hovered, setHovered] = useState<AppId | null>(null)

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-[150] flex justify-center px-3">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 24 }}
        className="pointer-events-auto flex max-w-[calc(100vw-1.5rem)] items-end gap-2 overflow-x-auto bg-white/20 backdrop-blur-xl border border-[#E5E5E0] soft-shadow rounded-sm px-3 py-2"
      >
        {DOCK_APP_ORDER.map((id) => {
          const app = APPS[id]
          const Icon = app.icon
          const isOpen = openApps.has(id)
          const isFocused = focusedApp === id
          const isHovered = hovered === id

          return (
            <div
              key={id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered((h) => (h === id ? null : h))}
            >
              {/* Tooltip - Editorial */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? -4 : 4,
                }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute -top-10 whitespace-nowrap bg-black text-white px-3 py-1 font-bold text-[9px] uppercase tracking-[0.2em] rounded-sm"
              >
                {app.name}
              </motion.div>

              <motion.button
                type="button"
                onClick={() => {
                  if (id === "search") onOpenSearch()
                  else onOpen(id)
                }}
                animate={{
                  y: isHovered ? -6 : 0,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className={cn(
                  "relative flex h-11 w-11 items-center justify-center rounded-sm transition-all duration-300",
                  isFocused ? "bg-black/5" : "bg-transparent hover:bg-black/5"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors duration-300",
                    isHovered ? "text-black" : "text-black/40"
                  )}
                  aria-hidden
                />
              </motion.button>

              {/* Active Indicator - Architectural Dot */}
              <div
                className={cn(
                  "mt-1.5 h-0.5 w-3 rounded-full transition-all duration-500",
                  isOpen ? "bg-black opacity-100" : "bg-transparent opacity-0"
                )}
              />
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
