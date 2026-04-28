export const APEX_STATS = [
  { label: "Projects Delivered", value: "200+", hint: "across 4 continents" },
  { label: "Average Client ROI", value: "14×", hint: "measurable, audited" },
  { label: "Client Retention", value: "98%", hint: "long-term partnerships" },
  { label: "Avg. Time-to-Launch", value: "21d", hint: "concept → live" },
]

export const APEX_SERVICES = [
  {
    id: "marketing",
    name: "Marketing Strategy",
    tag: "Strategy",
    icon: "target",
    description:
      "Outcome-driven roadmaps engineered around acquisition, retention and revenue compounding.",
    capabilities: ["Positioning", "GTM", "Funnel Architecture", "Analytics"],
  },
  {
    id: "web",
    name: "Web Design & Development",
    tag: "Engineering",
    icon: "code",
    description:
      "Editorial-grade websites built on Next.js — fast, accessible, and conversion-tuned to the millisecond.",
    capabilities: ["Next.js", "Headless CMS", "Motion", "CRO"],
  },
  {
    id: "ecom",
    name: "eCommerce",
    tag: "Revenue",
    icon: "shopping-bag",
    description:
      "Shopify, Stripe and custom storefronts engineered to scale AOV, LTV and margin from day one.",
    capabilities: ["Shopify Plus", "Stripe", "Subscriptions", "AOV Lifts"],
  },
  {
    id: "ads",
    name: "Meta & Google Ads",
    tag: "Performance",
    icon: "line-chart",
    description:
      "Full-funnel paid media with creative, landing, and signal infrastructure that out-performs the auction.",
    capabilities: ["Meta", "Google", "Server-side", "Creative Velocity"],
  },
  {
    id: "video",
    name: "Video Production",
    tag: "Cinematic",
    icon: "film",
    description:
      "Brand films, performance creative and product cinema. Story, system and signal — all on one set.",
    capabilities: ["Brand Film", "DTC Reels", "Product", "Studio"],
  },
  {
    id: "content",
    name: "Content & Editing",
    tag: "Velocity",
    icon: "scissors",
    description:
      "High-output editing engines that turn one shoot into hundreds of platform-native, on-brand assets.",
    capabilities: ["Short-form", "Long-form", "Color", "Sound"],
  },
  {
    id: "apps",
    name: "Web Apps & SaaS",
    tag: "Product",
    icon: "boxes",
    description:
      "From MVP to scale-ready SaaS — typed, tested, observable, and built on modern serverless rails.",
    capabilities: ["Next.js", "Postgres", "Stripe", "Auth"],
  },
  {
    id: "ai",
    name: "AI Integration",
    tag: "AI-native",
    icon: "sparkles",
    description:
      "Embed LLMs, agents and computer-vision into every workflow — engineered for ROI, not novelty.",
    capabilities: ["Agents", "RAG", "Workflows", "Evaluation"],
  },
] as const

export const APEX_PROCESS = [
  {
    step: "01",
    title: "Discover",
    summary: "Audit, intel and ambition.",
    detail:
      "We map your market, math and machine. A 360° diagnostic across brand, funnel, product and data — turning intel into an attack plan.",
  },
  {
    step: "02",
    title: "Design",
    summary: "Strategy made tangible.",
    detail:
      "Positioning, system, story and surface. Every artifact is engineered around the metric that moves the business.",
  },
  {
    step: "03",
    title: "Build",
    summary: "Ship in weeks, not quarters.",
    detail:
      "Engineering, creative and media in one squad. Cinematic execution with daily velocity and zero handoff loss.",
  },
  {
    step: "04",
    title: "Dominate",
    summary: "Compound the advantage.",
    detail:
      "Optimize, scale and lock the lead. Continuous experiments, models and creative — until the category is yours.",
  },
] as const

export const ANTIGRAVITY_INSIGHTS = [
  { metric: "Velocity", value: 98, detail: "Deployment frequency per sprint", trend: "+12%" },
  { metric: "Efficiency", value: 84, detail: "Resource utilization alpha", trend: "+5%" },
  { metric: "Engagement", value: 92, detail: "User interaction density", trend: "+18%" },
  { metric: "Retention", value: 98, detail: "Client compound average", trend: "Stable" },
]

export const APEX_PROJECTS = [
  {
    id: "atlas",
    client: "Atlas Athletics",
    category: "DTC eCommerce",
    metric: "+312% revenue",
    summary: "Re-platformed to Shopify Plus, scaled paid social to 8-figures.",
    accent: "#00F0FF",
    image: "/portfolio/atlas-athletics.svg",
    span: "col-span-2 row-span-2",
  },
  {
    id: "voltron",
    client: "Voltron AI",
    category: "SaaS · Web App",
    metric: "0 → $2.4M ARR",
    summary: "Designed, built and launched the entire product surface in 9 weeks.",
    accent: "#3B82F6",
    image: "/portfolio/voltron-ai.svg",
    span: "col-span-2 row-span-1",
  },
  {
    id: "noir",
    client: "NOIR Studio",
    category: "Brand · Video",
    metric: "47M views",
    summary: "Cinematic launch film + 60-asset performance creative system.",
    accent: "#FF6B00",
    image: "/portfolio/noir-studio.svg",
    span: "col-span-1 row-span-1",
  },
  {
    id: "helix",
    client: "Helix Health",
    category: "HealthTech",
    metric: "−42% CAC",
    summary: "Rebuilt funnel + server-side tracking, unlocked profitable scale.",
    accent: "#00F0FF",
    image: "/portfolio/helix-health.svg",
    span: "col-span-1 row-span-1",
  },
  {
    id: "northwind",
    client: "Northwind Capital",
    category: "Finance · Web",
    metric: "9× lead volume",
    summary: "Editorial site + LLM-powered research assistant for analysts.",
    accent: "#3B82F6",
    image: "/portfolio/northwind-capital.svg",
    span: "col-span-2 row-span-2",
  },
  {
    id: "kinetic",
    client: "Kinetic Apparel",
    category: "Fashion · Ads",
    metric: "4.8 ROAS",
    summary: "High-velocity creative engine + full-funnel Meta + Google.",
    accent: "#FF6B00",
    image: "/portfolio/kinetic-apparel.svg",
    span: "col-span-2 row-span-1",
  },
] as const

export const APEX_WARROOM_STREAM = [
  {
    id: "signal",
    channel: "Signal Integrity",
    status: "Optimal",
    stat: "99.2%",
    note: "Attribution confidence across paid + owned channels.",
    accent: "#00F0FF",
  },
  {
    id: "velocity",
    channel: "Creative Velocity",
    status: "Accelerating",
    stat: "42 assets/week",
    note: "From concept to publish under 36 hours average.",
    accent: "#3B82F6",
  },
  {
    id: "scale",
    channel: "Scale Readiness",
    status: "Locked",
    stat: "6 markets live",
    note: "Replication playbooks deployed with local tuning.",
    accent: "#FF6B00",
  },
] as const

export const APEX_WARROOM_PHASES = [
  {
    phase: "Acquire",
    objective: "Own attention in high-intent segments.",
    deliverables: ["Creative test matrix", "Offer architecture", "Landing system"],
  },
  {
    phase: "Convert",
    objective: "Turn qualified traffic into profitable buyers.",
    deliverables: ["Checkout optimization", "Trust stack", "Fast-response nurture"],
  },
  {
    phase: "Compound",
    objective: "Increase LTV and repeat conversion loops.",
    deliverables: ["Retention automations", "Expansion campaigns", "Referral engine"],
  },
] as const

export const APEX_PROOF_VAULT = [
  {
    brand: "Atlas Athletics",
    outcome: "+312% Revenue",
    quote:
      "Antigravity rebuilt our entire growth system. We finally had one team that could think, build, and ship at speed.",
    role: "Founder",
  },
  {
    brand: "Voltron AI",
    outcome: "$2.4M ARR in Year 1",
    quote:
      "The blend of product design + go-to-market execution was insane. They made the impossible timeline normal.",
    role: "CEO",
  },
  {
    brand: "Helix Health",
    outcome: "−42% CAC",
    quote:
      "Tracking, funnel, and creative came together into one clean machine. Every week felt measurable.",
    role: "Growth Lead",
  },
] as const

export const APEX_CREDENTIALS = [
  "Meta Business Partner",
  "Google Ads Certified",
  "Shopify Plus Specialists",
  "Next.js Production Team",
  "Server-side Tracking Experts",
  "AI Workflow Integrators",
] as const

export const APEX_BOOT_LINES = [
  "[ INITIALISING ANTIGRAVITY APEX MATRIX v4.0 ]",
  "loading kernel modules ........... ok",
  "mounting /strategy /creative /engineering ............ ok",
  "calibrating performance signals ........... ok",
  "syncing client intelligence layer ........... ok",
  "compiling dominance protocol ........... ok",
  "[ SYSTEM READY — WELCOME TO ANTIGRAVITY ]",
]
