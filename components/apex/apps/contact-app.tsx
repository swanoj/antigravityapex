"use client"

import { motion } from "framer-motion"
import { Check, Send } from "lucide-react"
import { useState } from "react"

export function ContactApp() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white h-full flex flex-col items-center justify-center p-20 text-center">
         <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="space-y-6"
         >
           <div className="h-20 w-20 bg-black rounded-full flex items-center justify-center mx-auto">
              <Check className="text-white h-10 w-10" />
           </div>
           <h2 className="text-5xl font-bold tracking-tighter text-black">Transmission <br/> Complete.</h2>
           <p className="text-sm font-medium text-black/40 max-w-xs mx-auto">
             Your brief has been ingested. An operator will contact you within 12 hours to discuss the attack plan.
           </p>
           <button 
             onClick={() => setSubmitted(false)}
             className="mt-8 px-8 py-4 border border-black font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all"
           >
             Acknowledge // Close
           </button>
         </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-white h-full relative overflow-hidden flex flex-col">
       <div className="p-10 border-b border-black flex justify-between items-end">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              // contact · access portal
            </span>
            <h2 className="mt-4 text-6xl font-bold tracking-tighter text-black">
              Start The <br />
              <span className="opacity-20">Engagement.</span>
            </h2>
          </div>
          <div className="hidden md:block text-right font-mono text-[10px] uppercase tracking-widest text-black/40">
             hello@antigravity.apex <br/>
             +1 (888) APEX-LVL
          </div>
       </div>

       <div className="flex-1 flex items-center justify-center p-10">
          <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-12">
             <div className="space-y-8">
                <div className="group border-b border-black/10 focus-within:border-black transition-colors pb-2">
                   <label className="font-mono text-[9px] uppercase tracking-widest text-black/40">Identification</label>
                   <input 
                     required
                     type="text"
                     placeholder="Full name or organization"
                     className="w-full bg-transparent text-3xl font-bold tracking-tight text-black outline-none placeholder:text-black/5 py-2"
                     value={form.name}
                     onChange={(e) => setForm({...form, name: e.target.value})}
                   />
                </div>

                <div className="group border-b border-black/10 focus-within:border-black transition-colors pb-2">
                   <label className="font-mono text-[9px] uppercase tracking-widest text-black/40">Secure Return</label>
                   <input 
                     required
                     type="email"
                     placeholder="email@example.com"
                     className="w-full bg-transparent text-3xl font-bold tracking-tight text-black outline-none placeholder:text-black/5 py-2"
                     value={form.email}
                     onChange={(e) => setForm({...form, email: e.target.value})}
                   />
                </div>

                <div className="group border-b border-black/10 focus-within:border-black transition-colors pb-2">
                   <label className="font-mono text-[9px] uppercase tracking-widest text-black/40">The Brief</label>
                   <textarea 
                     required
                     rows={1}
                     placeholder="What are we building?"
                     className="w-full bg-transparent text-3xl font-bold tracking-tight text-black outline-none placeholder:text-black/5 py-2 resize-none leading-tight"
                     value={form.message}
                     onChange={(e) => setForm({...form, message: e.target.value})}
                   />
                </div>
             </div>

             <button 
               type="submit"
               className="group relative flex items-center gap-6 px-12 py-6 border border-black hover:bg-black transition-all"
             >
                <span className="font-mono text-[12px] font-bold uppercase tracking-[0.4em] text-black group-hover:text-white">Transmit Request</span>
                <Send className="h-5 w-5 text-black group-hover:text-white transform group-hover:translate-x-2 transition-transform" />
             </button>
          </form>
       </div>

       <footer className="p-10 border-t border-black/5 font-mono text-[10px] uppercase tracking-widest text-black/20 text-center">
          HIGH-VELOCITY EXECUTION // NO RETAINER ROULETTE
       </footer>
    </div>
  )
}
