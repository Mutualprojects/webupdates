"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Shield,
  Users,
  Home as HomeIcon,
  Zap,
  Network,
  Volume2,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ==============================
   Tiny helpers (utility fns)
============================== */
const cx = (...parts) => parts.filter(Boolean).join(" ");
const BRAND = "#07518a";

const withAlpha = (hex, alpha) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
const clamp = (v) => Math.max(0, Math.min(255, v));
const toHex = (n) => n.toString(16).padStart(2, "0");
function adjust(hex, amt) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const R = clamp(r + (255 - r) * (amt > 0 ? amt : 0) + r * (amt < 0 ? amt : 0));
  const G = clamp(g + (255 - g) * (amt > 0 ? amt : 0) + g * (amt < 0 ? amt : 0));
  const B = clamp(b + (255 - b) * (amt > 0 ? amt : 0) + b * (amt < 0 ? amt : 0));
  return `#${toHex(Math.round(R))}${toHex(Math.round(G))}${toHex(Math.round(B))}`;
}
const lighten = (c, p = 0.15) => adjust(c, +p);
const darken = (c, p = 0.1) => adjust(c, -p);
const BRAND_LIGHT = lighten(BRAND, 0.18);
const BRAND_DARK = darken(BRAND, 0.08);

const monoGradient = (base = BRAND) =>
  `linear-gradient(90deg, ${base} 0%, ${lighten(base, 0.18)} 100%)`;
const softMonoGradient = (base = BRAND, opacity = 0.12) =>
  `linear-gradient(90deg, ${withAlpha(lighten(base, 0.18), opacity)} 0%, ${withAlpha(base, opacity)} 100%)`;

const THEME = {
  bg: "#f9fafc",
  text: "#0a0a0a",
  subText: "rgba(10,10,10,0.72)",
  ring: withAlpha(BRAND, 0.22),
};

const MOTION_TIMING = { duration: 0.75, ease: [0.16, 1, 0.3, 1] };
const drift = {
  translateX: [0, 8, -6, 10, 0],
  translateY: [0, -6, 8, -10, 0],
  rotate: [0, 2, -2, 1.5, 0],
};
const floatForever = {
  animate: { ...drift },
  transition: { duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
};

function seeded(index) {
  let t = (index + 1) * 0x6d2b79f5;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
function randomDirection(index) {
  const rnd = seeded(index);
  const dirs = [
    { x: -120, y: 0 },
    { x: 120, y: 0 },
    { x: 0, y: -120 },
    { x: 0, y: 120 },
  ];
  return dirs[Math.floor(rnd() * dirs.length)];
}
function randomDelay(index, base = 0.05, spread = 0.2) {
  const rnd = seeded(index)();
  return base + rnd * spread;
}
const featureItem = (i) => ({
  hidden: { opacity: 0, x: 12 },
  show: { opacity: 1, x: 0, transition: { ...MOTION_TIMING, delay: 0.05 * i } },
});

/* ===========================
   Reusable UI Components
=========================== */
const Badge = ({ children, className, variant = "outline", ...props }) => {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2";
  const map = {
    outline: "text-slate-900 hover:bg-slate-100 hover:scale-105 backdrop-blur-sm",
    default: "bg-blue-600 text-white hover:bg-blue-700",
  };
  return (
    <div className={cx(base, map[variant] || map.outline, className)} {...props}>
      {children}
    </div>
  );
};

const Button = ({ children, className, variant = "default", ...props }) => {
  const styles = {
    default: "bg-[#07518a] text-white hover:bg-[#0a6ab8] hover:shadow-xl",
    outline:
      "border border-[#07518a] text-[#07518a] hover:bg-[#07518a]/10 hover:shadow-md",
  };
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 px-6 py-2 text-sm md:text-base",
        styles[variant] || styles.default,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ className, children, ...props }) => (
  <div
    className={cx(
      "rounded-[2rem] border border-transparent bg-white/90 text-slate-900 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-md",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

/* ===========================
   Solutions Data
=========================== */
const solutions = [
  {
    icon: Shield,
    title: "AI Surveillance & Smart CCTV",
    subtitle: "Intelligent Security Systems",
    description:
      "AI-powered surveillance with 4K imaging, advanced analytics, and real-time threat detection for proactive protection.",
    features: ["4K Ultra HD", "AI Analytics", "24/7 Monitoring", "Mobile Access"],
    image: "/Home_images/CCTV Surveillance 1.jpg",
    popular: true,
  },
  {
    icon: Users,
    title: "Extra Low Voltage (ELV) Systems",
    subtitle: "Biometric & Access Solutions",
    description:
      "Seamless access control with biometric integration — facial, fingerprint, and RFID for modern enterprises.",
    features: ["Face Recognition", "Fingerprint", "RFID Access", "Time Tracking"],
    image: "/Home_images/Biometric Access Control 1.jpg",
  },
  {
    icon: HomeIcon,
    title: "Smart Home Automation",
    subtitle: "Intelligent Living Solutions",
    description:
      "Voice and app-based control for lighting, energy, and environment, creating comfort and efficiency.",
    features: ["Voice Control", "Smart Lighting", "Climate Control", "Energy Saving"],
    image: "/Home_images/Smart Home Automation 1.jpg",
  },
  {
    icon: Zap,
    title: "Solar & Renewable Energy",
    subtitle: "Sustainable Power Systems",
    description:
      "Harnessing clean energy with advanced solar infrastructure and smart grid connectivity.",
    features: ["Smart Monitoring", "Battery Storage", "Grid Integration", "ROI Tracking"],
    image: "/Home_images/solar 1.jpg",
  },
  {
    icon: Network,
    title: "Networking & IT Infrastructure",
    subtitle: "Robust Enterprise Connectivity",
    description:
      "High-speed, secure networks that power communication, collaboration, and cloud systems.",
    features: ["Fiber Optic", "WiFi 6", "Cloud Integration", "24/7 Support"],
    image: "/Home_images/IT Infrastructure 1.jpg",
  },
  {
    icon: Volume2,
    title: "Software Development",
    subtitle: "Tailored Business Applications",
    description:
      "Building scalable ERP, HRMS, and analytics software solutions that transform operations.",
    features: ["ERP Solution", "HRMS", "Custom Software", "Data Analytics"],
    image: "/5982.jpg",
  },
];

/* ===========================
   Main Component
=========================== */
export default function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="relative overflow-hidden py-20 md:py-28 font-sans"
      style={{ backgroundColor: THEME.bg }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* === Section Header === */}
        <div className="mb-20 text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0, transition: MOTION_TIMING }}
            viewport={{ once: true }}
          >
            <Badge
              className="rounded-full border"
              style={{
                color: BRAND,
                borderColor: THEME.ring,
                background: softMonoGradient(BRAND, 0.08),
              }}
            >
              <Star className="w-3.5 h-3.5 mr-1" style={{ color: BRAND }} />
              Our Expertise
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { ...MOTION_TIMING, delay: 0.05 },
            }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#07518a] tracking-tight"
          >
            Comprehensive Technology Solutions Tailored for You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0, transition: { ...MOTION_TIMING, delay: 0.1 } }}
            viewport={{ once: true }}
            className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover a full spectrum of AI-driven, secure, and scalable technologies that
            empower modern enterprises.
          </motion.p>
        </div>

        {/* === Solutions List === */}
        <div className="space-y-24">
          {solutions.map((s, index) => {
            const isOdd = index % 2 === 1;
            const Icon = s.icon;
            const contentFrom = randomDirection(index);
            const imageFrom = { x: -contentFrom.x, y: -contentFrom.y };
            const contentDelay = randomDelay(index, 0.05, 0.25);
            const imageDelay = randomDelay(index, 0.12, 0.25);

            return (
              <div key={index} className="space-y-12">
                <div
                  className={cx(
                    "grid items-center gap-10 md:gap-16 lg:grid-cols-2",
                    isOdd && "lg:grid-flow-col-dense"
                  )}
                >
                  {/* === Text Content === */}
                  <motion.div
                    initial={{ opacity: 0, x: contentFrom.x, y: contentFrom.y }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      transition: { ...MOTION_TIMING, delay: contentDelay },
                    }}
                    viewport={{ once: false, amount: 0.35 }}
                    className={cx(isOdd && "lg:col-start-2")}
                  >
                    <div className="space-y-7">
                     

                      {/* Floating icon */}
                      {/* <motion.div {...floatForever} className="inline-flex p-4 rounded-3xl"
                        style={{ background: softMonoGradient(BRAND, 0.12) }}>
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                          style={{ background: monoGradient(BRAND_DARK) }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </motion.div> */}

                      <div className="space-y-3">
                        {s.subtitle && (
                          <p
                            className="text-sm font-semibold bg-clip-text text-transparent"
                            style={{ backgroundImage: monoGradient(BRAND) }}
                          >
                            {s.subtitle}
                          </p>
                        )}

                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0a0a0a]">
                          {s.title}
                        </h3>
                        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                          {s.description}
                        </p>
                      </div>

                      {/* Features */}
                      <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.35 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
                      >
                        {s.features.map((f, i) => (
                          <motion.div
                            key={`${f}-${i}`}
                            variants={featureItem(i)}
                            className="flex items-center gap-3"
                          >
                            <span className="w-2.5 h-2.5 rounded-full block" style={{ background: BRAND }} />
                            <span className="font-semibold text-gray-900">{f}</span>
                          </motion.div>
                        ))}
                      </motion.div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                       <Link to="/solutions">
    <Button
      as="span"
      className="hover:shadow-xl hover:scale-[1.02] h-12"
      style={{
        background: `linear-gradient(90deg, ${BRAND} 0%, )`,
        color: "#fff",
      }}
    >
      Learn More <ArrowRight className="h-4 w-4" />
    </Button>
  </Link>

  <Link to="/solutions"></Link>
        
                      </div>
                    </div>
                  </motion.div>

                  {/* === Image === */}
                  <motion.div
                    initial={{ opacity: 0, x: imageFrom.x, y: imageFrom.y }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      transition: { ...MOTION_TIMING, delay: imageDelay },
                    }}
                    viewport={{ once: false, amount: 0.35 }}
                    className={cx(isOdd && "lg:col-start-1")}
                  >
                    <div className="relative group">
                      {/* aura layers */}
                      <div
                        className="absolute inset-0 rounded-[2rem] rotate-6 group-hover:rotate-3 transition-transform duration-500"
                        style={{ background: softMonoGradient(BRAND, 0.16) }}
                      />
                      <div
                        className="absolute inset-0 rounded-[2rem] -rotate-6 group-hover:-rotate-3 transition-transform duration-500"
                        style={{ background: softMonoGradient(BRAND, 0.08) }}
                      />

                      <Card className="relative overflow-hidden group-hover:shadow-3xl hover:-translate-y-2">
                        <div className="relative w-full aspect-[4/3]">
                          <img
                            src={s.image}
                            alt={s.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading={index < 2 ? "eager" : "lazy"}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                </div>

                {/* Separator */}
                {index < solutions.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    whileInView={{
                      opacity: 1,
                      scaleX: 1,
                      transition: { ...MOTION_TIMING, delay: 0.1 },
                    }}
                    viewport={{ once: true }}
                    className="h-px w-full"
                    style={{ backgroundColor: THEME.ring }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
