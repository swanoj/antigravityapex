"use client"

import { motion } from "framer-motion"
import { BadgeCheck, Quote, Sparkles } from "lucide-react"
import { APEX_CREDENTIALS, APEX_PROOF_VAULT } from "@/lib/apex/data"

export function ProofVaultApp() {
  return (
    <div className="h-full overflow-y-auto bg-white text-black">
      <header className="border-b border-black/10 p-10">
        <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-black/40">
          evidence index // validated outcomes
        </span>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-6xl font-black uppercase tracking-[-0.05em] md:text-8xl">
            Proof <span className="italic text-black/35">Vault</span>
          </h2>
          <div className="flex items-center gap-3 rounded-sm border border-black/10 bg-black/[0.02] px-4 py-3">
            <BadgeCheck className="h-4 w-4" />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-black/55">
              Verified client signal // confidence high
            </span>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 border-b border-black/10 lg:grid-cols-3">
        {APEX_PROOF_VAULT.map((item, idx) => (
          <motion.article
            key={item.brand}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="border-b border-black/10 p-8 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-black/45">{item.brand}</p>
              <span className="rounded-full border border-black/15 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.2em]">
                {item.outcome}
              </span>
            </div>
            <div className="mt-6 flex items-start gap-3">
              <Quote className="mt-0.5 h-4 w-4 text-black/30" />
              <p className="text-[15px] leading-relaxed text-black/75">{item.quote}</p>
            </div>
            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-black/45">{item.role}</p>
          </motion.article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-0 lg:grid-cols-2">
        <div className="border-b border-r border-black/10 p-8 lg:border-b-0">
          <h3 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-black/50">
            <Sparkles className="h-3.5 w-3.5" />
            Credential Stack
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {APEX_CREDENTIALS.map((credential) => (
              <div
                key={credential}
                className="rounded-sm border border-black/10 bg-black/[0.02] px-3 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-black/65"
              >
                {credential}
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-black/50">Engagement Guarantee</h3>
          <p className="mt-4 text-3xl font-bold tracking-tight leading-tight">
            If momentum stalls, execution intensity increases until the numbers move.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/60">
            We run weekly review loops with scorecards, experiments, and implementation velocity metrics. You can see
            what shipped, what changed, and what impact it had.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Weekly scorecards", "Attribution clarity", "Creative velocity", "Owner accountability"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/15 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-black/65"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
