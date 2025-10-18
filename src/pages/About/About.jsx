import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Home,
  Network,
  Radio,
  Factory,
  Sparkles,
  Target,
  Eye,
  Trophy,
  Users2,
  Camera,
  Building2,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

// 👉 Update these paths to match your Vite project structure
import CapabilitiesOrbit from "../../components/AnimatedCapabilitiesOrbit";
import OurJourney from "../../components/Ourjourney";
import ValuesSection from "../../components/ValuesSection";

/** ----------------------------------------------------------------
 *  Brand & Motion (re-trigger on every scroll)
 *  ----------------------------------------------------------------*/
const BRAND = "#07518a";

const slideVariants = (dir, delay = 0) => {
  const x = dir === "left" ? -40 : 40;
  return {
    hidden: { opacity: 0, x },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay },
    },
  };
};

const containerStagger = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const whileHoverLift = {
  whileHover: { y: -4, scale: 1.01, transition: { duration: 0.2 } },
};

function Section({ className = "", id, children }) {
  return (
    <section
      className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
      id={id}
    >
      {children}
    </section>
  );
}

/** Reveal that re-plays on every enter/leave */
function RevealSlideLoop({
  children,
  className,
  dir,
  amount = 0.25,
  delay = 0,
  margin = "0px 0px -10% 0px",
}) {
  const controls = useAnimation();
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={controls}
      variants={slideVariants(dir, delay)}
      viewport={{ amount, margin, once: false }}
      onViewportEnter={() => controls.start("visible")}
      onViewportLeave={() => controls.start("hidden")}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { icon: Trophy, label: "Years of Excellence", value: "18+" },
  { icon: Users2, label: "Customers", value: "12,000+" },
  { icon: Camera, label: "Cameras Installed", value: "2M+" },
  { icon: Building2, label: "Team", value: "300+" },
];

const capabilities = [
  {
    icon: ShieldCheck,
    title: "E-Security & ELV",
    desc: "CCTV, ANPR, Fire/Intrusion Alarms, Access Control, VMS.",
  },
  {
    icon: Home,
    title: "Home Automation",
    desc: "Smart homes with secure access, surveillance and energy control.",
  },
  {
    icon: Cpu,
    title: "AI-Driven Software",
    desc: "Video analytics, face recognition, VMS, dashboards, automations.",
  },
  {
    icon: Radio,
    title: "IoT & Edge",
    desc: "Smart poles, sensors, GPS/MDVR, analytics at the edge.",
  },
  {
    icon: Network,
    title: "IT & Telecom",
    desc: "Servers, networking, fiber, data centers, IP PBX/EPABX.",
  },
  {
    icon: Factory,
    title: "Make-in-India",
    desc: "In-house manufacturing: TrinAI cameras, TechnoRack, systems.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-b from-white to-slate-50/60">
      {/* ---------- HERO ---------- */}
      <div className="relative overflow-hidden">
        {/* backdrop blobs (brand color) */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[rgba(7,81,138,0.10)] blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[rgba(7,81,138,0.10)] blur-3xl" />
        </div>

        <Section className="pt-14 sm:pt-20 md:pt-24 lg:pt-28">
          <div className="grid items-center gap-8 md:gap-10 lg:gap-12 md:grid-cols-2">
            {/* Hero text (left) */}
            <RevealSlideLoop dir="left">
              <motion.div
                variants={containerStagger}
                initial="hidden"
                animate="visible"
              >
                <motion.span
                  variants={slideVariants("left")}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-slate-700"
                  aria-label="Company tagline"
                  style={{ backgroundColor: "rgba(7,81,138,0.06)" }}
                >
                  <Sparkles className="h-3.5 w-3.5" style={{ color: BRAND }} />
                  Since 2006 • Next-Gen Innovation
                </motion.span>

                <motion.h1
                  variants={slideVariants("left")}
                  className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight"
                >
                  Building a{" "}
                  <span
                    className="text-[color:var(--brand)]"
                    style={{ "--brand": BRAND }}
                  >
                    Connected, Secure
                  </span>{" "}
                  &{" "}
                  <span
                    className="text-[color:var(--brand)]"
                    style={{ "--brand": BRAND }}
                  >
                    Sustainable
                  </span>{" "}
                  Future
                </motion.h1>

                <motion.p
                  variants={slideVariants("left")}
                  className="mt-4 max-w-2xl text-slate-600 text-sm sm:text-base"
                >
                  Brihaspathi Technologies delivers E-Security, Home Automation,
                  AI-driven Software, IoT, ELV and IT/Telecom solutions —
                  engineered to transform industries and cities.
                </motion.p>

                <motion.div
                  variants={slideVariants("left")}
                  className="mt-6 flex flex-wrap items-center gap-3"
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-95"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${BRAND}, ${BRAND})`,
                    }}
                  >
                    Talk to us <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Link
                    to="/solutions"
                    className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100"
                    style={{ backgroundColor: "white" }}
                  >
                    Explore Solutions
                  </Link>
                </motion.div>

                {/* stats */}
                <motion.div
                  variants={containerStagger}
                  className="mt-8 grid w-full grid-cols-2 gap-4 sm:grid-cols-4"
                >
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      variants={slideVariants(i % 2 === 0 ? "left" : "right")}
                      className="rounded-xl bg-white/90 p-4 text-center shadow-sm backdrop-blur"
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        type: "spring",
                        stiffness: 240,
                        damping: 18,
                      }}
                    >
                      <s.icon
                        className="mx-auto h-5 w-5"
                        style={{ color: BRAND }}
                      />
                      <div className="mt-2 text-lg sm:text-xl font-semibold text-slate-900">
                        {s.value}
                      </div>
                      <div className="text-xs text-slate-500">{s.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </RevealSlideLoop>

            {/* Hero image / orbit (right) */}
            <CapabilitiesOrbit />
          </div>
        </Section>
      </div>

      {/* ---------- MISSION / VISION ---------- */}
      <Section className="mt-16 md:mt-20 lg:mt-24" id="mission-vision">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Target,
              title: "Our Mission",
              desc: "Design and deliver state-of-the-art security & surveillance solutions that address today’s challenges and strengthen safety.",
            },
            {
              icon: Eye,
              title: "Our Vision",
              desc: "Lead the surveillance industry with tailor-made, innovative, integrated solutions at competitive prices — built on long-term trust.",
            },
          ].map((card, i) => (
            <RevealSlideLoop
              key={card.title}
              dir={i % 2 === 0 ? "left" : "right"}
            >
              <div
                className="group relative h-full overflow-hidden rounded-2xl bg-white p-6 shadow-sm"
                {...whileHoverLift}
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-transparent to-transparent transition group-hover:from-[rgba(7,81,138,0.05)] group-hover:to-[rgba(7,81,138,0.05)]" />
                <card.icon className="h-6 w-6" style={{ color: BRAND }} />
                <h3 className="mt-3 text-base sm:text-lg font-semibold text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {card.desc}
                </p>
              </div>
            </RevealSlideLoop>
          ))}
        </div>
      </Section>

      {/* ---------- WHAT WE DO ---------- */}
      <Section className="mt-16 md:mt-20 lg:mt-24" id="capabilities">
        <RevealSlideLoop dir="left" className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            End-to-End Capability. Enterprise Scale.
          </h2>
        </RevealSlideLoop>
        <RevealSlideLoop dir="right" className="text-center">
          <p className="mx-auto mt-3 max-w-3xl text-slate-600 text-sm sm:text-base">
            From edge devices to platforms and field execution, we bring
            integrated solutions across E-Security, Software, IoT and
            IT/Telecom.
          </p>
        </RevealSlideLoop>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <RevealSlideLoop key={c.title} dir={i % 2 === 0 ? "left" : "right"}>
              <div
                className="h-full rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
                {...whileHoverLift}
              >
                <c.icon className="h-6 w-6" style={{ color: BRAND }} />
                <h3 className="mt-3 text-sm sm:text-base font-semibold text-slate-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
              </div>
            </RevealSlideLoop>
          ))}
        </div>
      </Section>

      {/* ---------- TIMELINE ---------- */}
      <OurJourney />

      {/* ---------- VALUES ---------- */}
      <ValuesSection />

      {/* ---------- ACHIEVEMENTS HIGHLIGHTS ---------- */}
      <Section className="mt-16 md:mt-20 lg:mt-24" id="achievements">
        <RevealSlideLoop dir="left">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5" style={{ color: BRAND }} />
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                Recent Milestones
              </h3>
            </div>
            <ul className="mt-3 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
              <li>
                • General Elections 2024: deployed 100,000+ cameras & command
                centers.
              </li>
              <li>
                • NEET-NTA 2025: 65,000+ cameras; centralized real-time
                monitoring.
              </li>
              <li>• MHCET 2025: 4,500+ cameras across Maharashtra.</li>
              <li>• TGBIE IPE 2025: 8,500+ cameras, live monitored.</li>
              <li>
                • BSF Borders (Rajasthan & Bengal): 674 cameras for perimeter
                security.
              </li>
              <li>
                • Kaziranga National Park: IP thermal & ANPR for conservation.
              </li>
              <li>
                • Solar/Smart Pole rollouts, REIL 5MW & MEDA school rooftops.
              </li>
            </ul>
            <div className="mt-4">
              <Link
                to="/case-studies"
                className="inline-flex items-center text-sm font-medium hover:underline"
                style={{ color: BRAND }}
              >
                Browse case studies <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </RevealSlideLoop>
      </Section>

      {/* ---------- CTA ---------- */}
      <Section className="my-16 md:my-20 lg:my-24">
        <RevealSlideLoop dir="right">
          <div
            className="relative overflow-hidden rounded-2xl p-6 text-white"
            style={{
              backgroundImage: `linear-gradient(90deg, ${BRAND}, ${BRAND})`,
            }}
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <h3 className="text-lg sm:text-xl font-semibold">
              Ready to secure what matters?
            </h3>
            <p className="mt-1 max-w-2xl text-white/90 text-sm sm:text-base">
              Speak with our experts about enterprise surveillance, AI video
              analytics, and IoT-enabled deployments.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-white/90"
              >
                Get a Quote
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
              >
                View Products
              </Link>
            </div>
          </div>
        </RevealSlideLoop>
      </Section>
    </main>
  );
}
