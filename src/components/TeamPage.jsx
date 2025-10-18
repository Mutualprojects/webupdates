"use client";
import React from "react";
import { motion } from "framer-motion";

// Components (ensure these imports exist in your project)

import CapabilitiesOrbit from "../components/AnimatedCapabilitiesOrbit";
import ValuesSection from "../components/ValuesSection";
import LifeAtBTCarousel from "../components/LifeAtBrihaspathi";

const BRAND = "#07518a";

/* =========================
   Data
========================= */
const WHAT_WE_DO = [
  {
    title: "E-Security & Surveillance",
    desc: "CCTV, video analytics, access control, and fire safety integrations.",
  },
  {
    title: "Home & Building Automation",
    desc: "Smart lighting, HVAC, voice/app control, and energy optimization.",
  },
  {
    title: "AI-Driven Software",
    desc: "Analytics dashboards, workflow automation, and intelligent alerting.",
  },
  {
    title: "IoT & ELV Systems",
    desc: "Controllers, structured cabling, PA/BGM, and sensor-based systems.",
  },
  {
    title: "IT & Telecom Infrastructure",
    desc: "Networking, IP telephony, cloud connectivity, and datacenter setups.",
  },
  {
    title: "Professional Services",
    desc: "Consulting, deployment, monitoring, and complete AMC solutions.",
  },
];

/* =========================
   Motion Variants
========================= */
const group = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const line = (dir) => ({
  hidden: { opacity: 0, x: dir === "left" ? -24 : 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
});

/* =========================
   Component
========================= */
export default function TeamPage() {
  const left = WHAT_WE_DO.slice(0, 3);
  const right = WHAT_WE_DO.slice(3);

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* ===== HERO SECTION ===== */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-28 xl:py-32">
          <motion.span
            className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold border"
            style={{ color: BRAND, borderColor: BRAND }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Who we are
          </motion.span>

          <motion.h1
            className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-gray-900"
            style={{ color: BRAND }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            A solutions partner turning complex technology into powerful outcomes.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            We focus on what matters most —{" "}
            <span className="font-semibold text-gray-900">safety, uptime, and efficiency</span> — for
            enterprises, institutions, and city-scale projects across India.
          </motion.p>

          <div
            className="mt-8 h-1.5 w-28 rounded-full"
            style={{ backgroundColor: BRAND }}
          />
          <div className="mt-12">
            <CapabilitiesOrbit />
          </div>
        </div>
      </section>

      {/* ===== WHAT WE DO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Brand Slant Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute left-1/2 top-[-42%] h-[180%] w-[160vw] -translate-x-1/2 -rotate-6"
            style={{ backgroundColor: BRAND }}
          />
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(500px 260px at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 60%), radial-gradient(500px 260px at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-28 xl:py-32 text-white">
          <div className="text-center">
            <span className="inline-flex items-center justify-center rounded-full border px-3 py-1 text-[12px] font-semibold tracking-wide text-white/80 border-white/60">
              What we do
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
              Secure, automate, and connect — end to end
            </h2>
          </div>

          {/* 2-Column Layout */}
          <div className="relative mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
            {/* Vertical Center Line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/30 md:block" />

            {/* Left */}
            <motion.ul
              className="space-y-8 text-white/90"
              variants={group}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.4 }}
            >
              {left.map((it) => (
                <motion.li key={it.title} variants={line("left")} className="group">
                  <ItemRow item={it} side="left" />
                </motion.li>
              ))}
            </motion.ul>

            {/* Right */}
            <motion.ul
              className="space-y-8 text-white/90"
              variants={group}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.4 }}
            >
              {right.map((it) => (
                <motion.li key={it.title} variants={line("right")} className="group">
                  <ItemRow item={it} side="right" />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-28 xl:py-32">
          <header className="mb-12 text-center">
            <h3
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
              style={{ color: BRAND }}
            >
              Meet Our Leadership Team
            </h3>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Passionate professionals driving innovation, reliability, and impact across all domains.
            </p>
          </header>
        

          <div className="mt-16">
            <ValuesSection />
          </div>

          <div className="mt-16">
            <LifeAtBTCarousel />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ========== Subcomponent for Each Item ========== */
function ItemRow({ item, side }) {
  const bullet = {
    rest: { scale: 1, opacity: 0.9 },
    hover: { scale: 1.25, opacity: 1 },
  };
  const underline = {
    rest: { scaleX: 0, originX: side === "left" ? 0 : 1, opacity: 0.6 },
    hover: { scaleX: 1, opacity: 1 },
  };
  const nudge = {
    rest: { x: 0 },
    hover: { x: side === "left" ? 6 : -6 },
  };

  return (
    <motion.div
      className="relative flex items-start gap-4"
      initial="rest"
      whileHover="hover"
      animate="rest"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.span
        className="mt-2 inline-block h-3 w-3 rounded-full bg-white"
        variants={bullet}
      />
      <motion.div className="flex-1" variants={nudge}>
        <h4 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white leading-snug">
          {item.title}
        </h4>
        <p className="mt-1 text-sm sm:text-base md:text-lg text-white/85">
          {item.desc}
        </p>
        <motion.div
          className="mt-2 h-[2px] w-full bg-white/80"
          variants={underline}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}
