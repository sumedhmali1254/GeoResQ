import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ArrowRight,
  Database,
  Layers,
  ShieldCheck,
  Route,
  Building2,
  Bot,
  FlaskConical,
  AlertTriangle,
  TrendingUp,
  Users,
  MapPin,
  Zap,
  ChevronDown,
  ChevronUp,
  Radio,
  Activity,
  CheckCircle2,
  CloudRain,
  Wind,
  Mountain,
  Flame,
  Waves,
  HelpCircle,
  PhoneCall,
  Lock,
  ExternalLink,
} from "lucide-react";
import HeaderBrand from "../components/HeaderBrand";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const workflowSteps = [
  {
    step: "01",
    icon: Database,
    label: "DATA",
    title: "Data Fusion",
    desc: "Multi-source weather, satellite & GIS data",
    color: "#2563eb",
  },
  {
    step: "02",
    icon: AlertTriangle,
    label: "RISK",
    title: "Hazard Engine",
    desc: "Real-time hazard intensity modeling",
    color: "#ea580c",
  },
  {
    step: "03",
    icon: TrendingUp,
    label: "IMPACT",
    title: "Exposure Analysis",
    desc: "Population & infrastructure exposure",
    color: "#7c3aed",
  },
  {
    step: "04",
    icon: ShieldCheck,
    label: "CONFIDENCE",
    title: "Verification",
    desc: "Confidence-aware data scoring",
    color: "#0891b2",
  },
  {
    step: "05",
    icon: Zap,
    label: "ACTION",
    title: "Decision Support",
    desc: "Shelters, routes & resource dispatch",
    color: "#16a34a",
  },
];

const features = [
  {
    icon: Database,
    title: "Multi-Source Data Fusion",
    desc: "Integrates weather, GIS, satellite, infrastructure, population and citizen-report data into a unified intelligence layer.",
    color: "#2563eb",
    badge: "Core Engine",
  },
  {
    icon: Layers,
    title: "Hazard → Exposure → Impact",
    desc: "Goes beyond risk mapping. Calculates who and what is affected — population, hospitals, schools, roads, buildings.",
    color: "#ea580c",
    badge: "Intelligence",
  },
  {
    icon: ShieldCheck,
    title: "Confidence-Aware Intelligence",
    desc: "Every data point carries a confidence score. Multiple citizen reports increase reliability. No unverified assumptions.",
    color: "#7c3aed",
    badge: "Trust Framework",
  },
  {
    icon: Route,
    title: "Risk-Aware Safe Routing",
    desc: "Finds the safest evacuation routes considering flood risk, road blockages, elevation and real-time conditions.",
    color: "#0891b2",
    badge: "Evacuation",
  },
  {
    icon: Building2,
    title: "Dynamic Emergency Facilities",
    desc: "Identifies and scores potential emergency facilities — schools, stadiums, community halls — not just official shelters.",
    color: "#16a34a",
    badge: "Shelter Intel",
  },
  {
    icon: FlaskConical,
    title: "Disaster Decision Simulator",
    desc: 'Test "what-if" scenarios before the situation worsens. See how changing rainfall affects risk, exposure and resource needs.',
    color: "#db2777",
    badge: "Hero Feature",
  },
  {
    icon: Bot,
    title: "AI Disaster Copilot",
    desc: "Ask questions in natural language. Get answers backed by real GIS, risk and impact data — not AI hallucinations.",
    color: "#4f46e5",
    badge: "Decision AI",
  },
];

const hazardTypes = [
  {
    id: "flood",
    icon: CloudRain,
    name: "Urban Flood Management",
    status: "ACTIVE POC",
    color: "#2563eb",
    desc: "Active proof-of-concept modeling rainfall intensity, drainage capacity, low-lying terrain risk, and road underpass submergence across Mumbai metropolitan region.",
    metrics: [
      "80mm/hr Rainfall Threshold",
      "372 Roads Monitored",
      "82 Exposed Hospitals",
    ],
  },
  {
    id: "cyclone",
    icon: Wind,
    name: "Cyclone & Coastal Surge",
    status: "PLANNED ARCHITECTURE",
    color: "#0891b2",
    desc: "Designed for coastal states to predict storm surge inundation, high-wind damage radius, coastal shelter capacity, and port evacuation routes.",
    metrics: ["Storm Surge Level", "Wind Radius Mapping", "Coastal Evacuation"],
  },
  {
    id: "landslide",
    icon: Mountain,
    name: "Landslide & Slope Risk",
    status: "PLANNED ARCHITECTURE",
    color: "#ea580c",
    desc: "Hilly terrain stability analysis using soil moisture, slope gradient, historical landslide frequency, and highway vulnerability mapping.",
    metrics: [
      "Slope Angle Analysis",
      "Soil Saturation Rate",
      "Highway Blockage",
    ],
  },
  {
    id: "wildfire",
    icon: Flame,
    name: "Wildfire & Heat Exposure",
    status: "PLANNED ARCHITECTURE",
    color: "#dc2626",
    desc: "Forest fire perimeter tracking, thermal anomaly detection, wind spread vectors, and village evacuation warning systems.",
    metrics: [
      "Thermal Anomaly Index",
      "Wind Vector Tracking",
      "Buffer Zone Alerts",
    ],
  },
];

const faqs = [
  {
    q: "How does GeoResQ differ from traditional disaster maps?",
    a: "Traditional maps only visualize where a disaster occurs. GeoResQ turns mapping into Decision Intelligence by computing exposure (who & what is affected), assessing confidence scores, calculating dynamic facility suitability, finding risk-aware safe routes, and allowing what-if simulation before conditions worsen.",
  },
  {
    q: "What is the Hazard → Exposure → Impact workflow?",
    a: "Risk assessment alone is not enough. GeoResQ computes the full chain: Hazard (where the water or risk is) → Exposure (the people, hospitals, schools, and roads in that zone) → Impact (the severity of expected damage and resource requirements).",
  },
  {
    q: "How does the Confidence-Aware Engine work?",
    a: "Not all reports are equally reliable. GeoResQ assigns a confidence score (0-100%) to every incident based on report volume, photo evidence, source reliability, and official verification. Single unverified reports do not trigger false emergency declarations.",
  },
  {
    q: "Can GeoResQ connect to real government APIs?",
    a: "Yes. GeoResQ is built with a clean, decoupled API layer. It can connect to IMD weather APIs, CWC river gauge data, NRSC satellite feeds, and state emergency operation center (SEOC) databases via standard REST endpoints.",
  },
  {
    q: "How does the Disaster Decision Simulator work?",
    a: "The Simulator allows authorities to slide variables like rainfall intensity (e.g. 40mm to 200mm/hr) and observe real-time predicted shifts in risk scores, population exposed, hospital vulnerability, and required rescue teams.",
  },
];

export default function Landing() {
  const [activeHazard, setActiveHazard] = useState("flood");
  const [openFaq, setOpenFaq] = useState(null);

  const selectedHazardObj = hazardTypes.find((h) => h.id === activeHazard);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans antialiased">
      {/* ===== LANDING NAVBAR ===== */}
      <header className="app-header sticky top-0 z-50 h-[var(--spacing-header)] flex items-center justify-between md:justify-center px-3 md:px-6 border-b relative">
        {/* Logo - Left on desktop, center on mobile */}
        <div className="flex items-center gap-2 md:absolute md:left-6 z-20">
          <HeaderBrand />
        </div>

        {/* Center Nav Links - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium text-[var(--color-text-secondary)]">
          <a
            href="#overview"
            className="hover:text-[var(--color-accent-blue)] transition-colors"
          >
            Overview
          </a>
          <a
            href="#hazards"
            className="hover:text-[var(--color-accent-blue)] transition-colors"
          >
            Multi-Hazard
          </a>
          <a
            href="#workflow"
            className="hover:text-[var(--color-accent-blue)] transition-colors"
          >
            Workflow
          </a>
          <a
            href="#capabilities"
            className="hover:text-[var(--color-accent-blue)] transition-colors"
          >
            Capabilities
          </a>
          <a
            href="#faq"
            className="hover:text-[var(--color-accent-blue)] transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Header CTAs - Right aligned, responsive */}
        <div className="flex items-center gap-2 md:absolute md:right-6">
          <Link
            to="/login"
            className="btn-secondary btn-xs md:btn-sm hidden sm:inline-flex whitespace-nowrap text-[0.7rem] md:text-xs"
          >
            <Users size={13} />{" "}
            <span className="hidden sm:inline">Citizen</span>
          </Link>
          <Link
            to="/login?role=authority"
            className="btn-primary btn-xs md:btn-sm whitespace-nowrap text-[0.7rem] md:text-xs"
          >
            <Activity size={13} />{" "}
            <span className="hidden sm:inline">Command</span>
          </Link>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section
        id="overview"
        className="relative pt-12 pb-20 px-6 overflow-hidden border-b border-[var(--color-border-secondary)] bg-gradient-to-b from-white to-[var(--color-bg-primary)]"
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full shadow-xs"
            style={{
              background: "rgba(37, 99, 235, 0.08)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-2 h-2 rounded-full bg-[var(--color-status-live)] animate-ping" />
            <span className="text-xs font-semibold tracking-wider text-[var(--color-accent-blue)] uppercase">
              PAN-INDIA GEOSPATIAL DISASTER INTELLIGENCE PLATFORM
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            From Disaster Mapping <br />
            <span className="bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
              To Disaster Decision Intelligence
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transforming weather, GIS, satellite, infrastructure, population and
            citizen data into actionable emergency intelligence for authorities
            across India.
          </motion.p>

          {/* Hero Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/login?role=authority"
              className="btn-primary btn-lg group shadow-md w-full sm:w-auto"
            >
              <span>Enter Command Center</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              to="/login?role=authority"
              className="btn-secondary btn-lg shadow-xs w-full sm:w-auto"
            >
              <FlaskConical
                size={18}
                className="text-[var(--color-accent-purple)]"
              />
              <span>Launch Simulator</span>
            </Link>
            <Link
              to="/login"
              className="btn-secondary btn-lg shadow-xs w-full sm:w-auto"
            >
              <Users size={18} className="text-[var(--color-accent-blue)]" />
              <span>Citizen Portal</span>
            </Link>
          </motion.div>

          {/* Hero Live Metric Cards */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              {
                label: "Active Incidents",
                val: "47",
                sub: "Mumbai Region",
                color: "#dc2626",
                icon: AlertTriangle,
              },
              {
                label: "Critical Zones",
                val: "19",
                sub: "High Flood Risk",
                color: "#ea580c",
                icon: MapPin,
              },
              {
                label: "Population at Risk",
                val: "2.4M",
                sub: "Exposed Residents",
                color: "#2563eb",
                icon: Users,
              },
              {
                label: "Confidence Score",
                val: "94.8%",
                sub: "Multi-Source Fusion",
                color: "#16a34a",
                icon: ShieldCheck,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-4 text-left border hover:border-[var(--color-border-accent)] transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.65rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <stat.icon size={16} style={{ color: stat.color }} />
                </div>
                <div className="text-2xl font-black font-mono text-[var(--color-text-primary)]">
                  {stat.val}
                </div>
                <div className="text-[0.65rem] text-[var(--color-text-muted)] mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== USP STATEMENT BANNER ===== */}
      <section className="py-12 px-6 bg-blue-600 text-white shadow-inner">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200 mb-2">
            Core Product Message
          </p>
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-snug">
            “Don't just show where the disaster is. Tell authorities what is
            affected, where people should go, what resources are needed, and
            what happens if the situation gets worse.”
          </blockquote>
        </div>
      </section>

      {/* ===== MULTI-HAZARD DISASTER INTELLIGENCE SECTION ===== */}
      <section
        id="hazards"
        className="py-20 px-6 border-b border-[var(--color-border-secondary)] bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="section-title">Multi-Disaster Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)] mt-1">
              Scalable Across All Major Disasters
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto mt-2">
              GeoResQ is architected for extensible multi-hazard decision
              support across urban flooding, cyclones, landslides, and
              wildfires.
            </p>
          </motion.div>

          {/* Hazard Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {hazardTypes.map((hazard) => {
              const Icon = hazard.icon;
              const isSelected = activeHazard === hazard.id;
              return (
                <button
                  key={hazard.id}
                  onClick={() => setActiveHazard(hazard.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[var(--color-accent-blue)] text-white border-[var(--color-accent-blue)] shadow-sm"
                      : "bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border-[var(--color-border-secondary)] hover:border-[var(--color-border-primary)]"
                  }`}
                >
                  <Icon size={16} />
                  <span>{hazard.name}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Hazard Card Showcase */}
          <AnimatePresence mode="wait">
            {selectedHazardObj && (
              <motion.div
                key={selectedHazardObj.id}
                className="glass-card p-8 border-2"
                style={{ borderColor: `${selectedHazardObj.color}40` }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="p-3 rounded-xl"
                        style={{ background: `${selectedHazardObj.color}15` }}
                      >
                        <selectedHazardObj.icon
                          size={24}
                          style={{ color: selectedHazardObj.color }}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-[var(--color-text-primary)]">
                          {selectedHazardObj.name}
                        </h3>
                        <span
                          className="text-[0.65rem] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full"
                          style={{
                            background: `${selectedHazardObj.color}15`,
                            color: selectedHazardObj.color,
                          }}
                        >
                          {selectedHazardObj.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                      {selectedHazardObj.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {selectedHazardObj.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-secondary)] text-xs font-semibold text-[var(--color-text-primary)]"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-emerald-600"
                          />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-64 p-5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-secondary)]">
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-3">
                      Module Readiness
                    </span>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between font-semibold">
                        <span className="text-[var(--color-text-secondary)]">
                          Data Pipeline
                        </span>
                        <span className="text-emerald-600">Ready</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-[var(--color-text-secondary)]">
                          Exposure Model
                        </span>
                        <span className="text-emerald-600">Ready</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-[var(--color-text-secondary)]">
                          Safe Routing
                        </span>
                        <span className="text-emerald-600">Ready</span>
                      </div>
                    </div>
                    <Link
                      to="/authority/dashboard"
                      className="btn-primary btn-sm w-full mt-5"
                    >
                      Explore Active Demo
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ===== WORKFLOW PIPELINE SECTION ===== */}
      <section
        id="workflow"
        className="py-20 px-6 border-b border-[var(--color-border-secondary)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="section-title">End-to-End Pipeline</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)] mt-1">
              Data → Fusion → Hazard → Exposure → Impact → Decision
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto mt-2">
              Every stage transforms raw geospatial inputs into verified
              actionable intelligence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {workflowSteps.map((ws, i) => {
              const Icon = ws.icon;
              return (
                <motion.div
                  key={ws.step}
                  className="glass-card p-5 relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: ws.color }}
                  />
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-black font-mono"
                        style={{ color: ws.color }}
                      >
                        {ws.step}
                      </span>
                      <Icon size={18} style={{ color: ws.color }} />
                    </div>
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--color-text-muted)] block mb-1">
                      {ws.label}
                    </span>
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">
                      {ws.title}
                    </h4>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {ws.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM CAPABILITIES GRID ===== */}
      <section
        id="capabilities"
        className="py-20 px-6 bg-white border-b border-[var(--color-border-secondary)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="section-title">System Features</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)] mt-1">
              Built For Emergency Command Operations
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {features.map((feature, i) => {
              const isFinalCenteredCard =
                i === features.length - 1 && features.length % 3 === 1;

              return (
                <motion.div
                  key={feature.title}
                  className={`glass-card p-6 border hover:border-[var(--color-border-accent)] transition-all duration-300 group flex flex-col justify-between ${isFinalCenteredCard ? "md:col-start-2" : ""}`}
                  style={
                    isFinalCenteredCard
                      ? { width: "min(100%, 420px)" }
                      : undefined
                  }
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div>
                    <div className="flex items-center justify-center mb-4">
                      <div
                        className="rounded-2xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-[1.03]"
                        style={{
                          background: `${feature.color}13`,
                          border: `1px solid ${feature.color}26`,
                          width: 52,
                          height: 52,
                          boxShadow: `0 8px 20px ${feature.color}18`,
                        }}
                      >
                        <img
                          src="/main-logo.png"
                          alt="GeoResQ logo"
                          className="object-contain"
                          style={{ width: 28, height: 28 }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center mb-3">
                      <span
                        className="text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{
                          background: `${feature.color}10`,
                          color: feature.color,
                        }}
                      >
                        {feature.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-2 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed text-center">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== AGENCY & DATA COMPATIBILITY ===== */}
      <section className="py-16 px-6 border-b border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="section-title">
            Government & Institutional Alignment
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-text-primary)] mt-1 mb-8">
            Designed for Integration with Indian Disaster Protocols
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "NDRF / SDMA", role: "Response Protocols" },
              { name: "IMD Weather", role: "Rainfall & Radar Feeds" },
              { name: "ISRO / NRSC", role: "Bhuvan Satellite GIS" },
              { name: "CWC Hydrological", role: "River Level Sensors" },
            ].map((agency) => (
              <div key={agency.name} className="glass-card p-4 text-center">
                <ShieldCheck
                  size={20}
                  className="mx-auto mb-2 text-[var(--color-accent-blue)]"
                />
                <div className="text-xs font-bold text-[var(--color-text-primary)]">
                  {agency.name}
                </div>
                <div className="text-[0.6rem] text-[var(--color-text-muted)]">
                  {agency.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FREQUENTLY ASKED QUESTIONS (FAQ) ===== */}
      <section
        id="faq"
        className="py-20 px-6 bg-white border-b border-[var(--color-border-secondary)]"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="section-title">Frequently Asked Questions</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)] mt-1">
              Everything You Need To Know About GeoResQ
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="glass-card overflow-hidden border">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none"
                  >
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp
                        size={18}
                        className="text-[var(--color-accent-blue)]"
                      />
                    ) : (
                      <ChevronDown
                        size={18}
                        className="text-[var(--color-text-muted)]"
                      />
                    )}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 text-xs text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border-secondary)] pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-14 px-6 bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md flex items-center justify-center bg-blue-600">
                <Shield size={16} className="text-white" />
              </div>
              <span className="text-base font-black tracking-wider text-white">
                GEORESQ INDIA
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pan-India Geospatial Disaster Intelligence & Decision Support
              Platform. Turning disaster mapping into actionable emergency
              decisions.
            </p>
            <span className="inline-block text-[0.6rem] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full">
              ● System Online — Live Monitoring
            </span>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
              Quick Navigation
            </span>
            <ul className="list-none p-0 m-0 space-y-2 text-xs">
              <li>
                <Link
                  to="/authority/dashboard"
                  className="text-slate-400 hover:text-white no-underline transition-colors"
                >
                  Command Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/authority/map"
                  className="text-slate-400 hover:text-white no-underline transition-colors"
                >
                  GIS Live Map
                </Link>
              </li>
              <li>
                <Link
                  to="/authority/simulator"
                  className="text-slate-400 hover:text-white no-underline transition-colors"
                >
                  Disaster Simulator
                </Link>
              </li>
              <li>
                <Link
                  to="/authority/copilot"
                  className="text-slate-400 hover:text-white no-underline transition-colors"
                >
                  AI Disaster Copilot
                </Link>
              </li>
              <li>
                <Link
                  to="/citizen"
                  className="text-slate-400 hover:text-white no-underline transition-colors"
                >
                  Citizen Emergency Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency Contacts */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
              Emergency Response
            </span>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <PhoneCall size={14} className="text-red-400" />
                <span>
                  National Emergency:{" "}
                  <strong className="text-white">112</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall size={14} className="text-amber-400" />
                <span>
                  NDRF Helpline:{" "}
                  <strong className="text-white">011-24363260</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall size={14} className="text-blue-400" />
                <span>
                  State Disaster Mgmt:{" "}
                  <strong className="text-white">1070</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Architecture & Security */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
              Architecture & Standards
            </span>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              REST & WebSocket ready architecture, JWT authentication layer,
              PostGIS geospatial database prepared.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Lock size={14} className="text-emerald-400" />
              <span>Government Grade Security</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="max-w-6xl mx-auto border-t border-slate-800 pt-4 md:pt-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center md:justify-start">
            <img
              src="/text-logo.png"
              alt="GeoResQ India"
              className="h-4 md:h-5 w-auto"
            />
            <span className="text-center md:text-left text-[0.7rem] md:text-xs">
              Â© 2026 GeoResQ India â€" Disaster Decision Intelligence Platform.
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center text-[0.65rem] md:text-xs">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              Vite + React
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              Leaflet GIS
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              Recharts
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
