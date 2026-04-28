"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Music, 
  Settings2,
  ListMusic,
  Waveform
} from "lucide-react"

const TRACKS = [
  { 
    id: 1, 
    title: "NEURAL_PATHWAY", 
    artist: "APEX_LABS", 
    duration: "4:32", 
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
  },
  { 
    id: 2, 
    title: "QUANTUM_DRIFT", 
    artist: "CYBER_SIGNAL", 
    duration: "6:12", 
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
  },
  { 
    id: 3, 
    title: "VOID_SEQUENCER", 
    artist: "KINETIC_CORE", 
    duration: "3:45", 
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" 
  },
]

export function MusicApp() {
  const [currentTrack, setCurrentTrack] = useState(TRACKS[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrack])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    audio.addEventListener("timeupdate", updateProgress)
    return () => audio.removeEventListener("timeupdate", updateProgress)
  }, [])

  return (
    <div className="bg-[#050505] h-full flex flex-col text-white font-sans selection:bg-purple-500/30">
      {/* Header */}
      <div className="px-6 py-8 flex flex-col items-center">
        <div className="relative group">
          <motion.div 
            animate={isPlaying ? { scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] } : {}}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-48 h-48 bg-gradient-to-br from-purple-900 to-black border border-white/10 flex items-center justify-center relative overflow-hidden"
          >
            <Disc className="w-16 h-16 text-purple-400 opacity-20" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            
            {/* Animated Rings */}
            <AnimatePresence>
              {isPlaying && (
                <>
                  <motion.div 
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 border border-purple-500/30 rounded-full"
                  />
                  <motion.div 
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute inset-0 border border-purple-500/30 rounded-full"
                  />
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">
            {currentTrack.title}
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-purple-400 mt-2">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Visualizer Mock */}
      <div className="h-12 flex items-end gap-1 px-10 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              height: isPlaying ? [10, Math.random() * 40 + 5, 10] : 4 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 0.5 + Math.random(), 
              ease: "easeInOut" 
            }}
            className="flex-1 bg-gradient-to-t from-purple-900 to-purple-400/50"
          />
        ))}
      </div>

      {/* Controls */}
      <div className="mt-8 px-10">
        {/* Progress Bar */}
        <div className="relative h-1 bg-white/5 rounded-full overflow-hidden mb-8">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-purple-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <button className="text-white/40 hover:text-white transition-colors">
            <SkipBack size={24} />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
          </button>

          <button className="text-white/40 hover:text-white transition-colors">
            <SkipForward size={24} />
          </button>
        </div>
      </div>

      {/* Playlist */}
      <div className="mt-auto bg-white/5 p-6 border-t border-white/10 overflow-auto">
        <div className="flex items-center gap-2 mb-4">
           <ListMusic size={14} className="text-purple-400" />
           <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 italic">UPLINK_PLAYLIST</span>
        </div>
        <div className="space-y-1">
          {TRACKS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setCurrentTrack(t)
                setIsPlaying(true)
              }}
              className={`w-full flex items-center justify-between p-3 rounded group transition-colors ${
                currentTrack.id === t.id ? "bg-purple-900/40" : "hover:bg-white/5"
              }`}
            >
              <div className="flex flex-col items-start gap-1">
                <span className={`text-[11px] font-bold tracking-tight uppercase ${
                  currentTrack.id === t.id ? "text-purple-400" : "text-white/80"
                }`}>
                  {t.title}
                </span>
                <span className="text-[9px] font-mono text-white/30">{t.artist}</span>
              </div>
              <span className="text-[9px] font-mono text-white/20">{t.duration}</span>
            </button>
          ))}
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onEnded={() => setIsPlaying(false)} 
      />
    </div>
  )
}

function Disc({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
