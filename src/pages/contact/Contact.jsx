import React from "react";
import { motion } from "framer-motion";
import IndiaBranchesMap from "../../components/IndiaBranchesMap";
import ContactFormBrand from "../../components/ContactFormBrand";

/* Brand colors */
const BRAND = "#07518a";
const BRAND_TINT = "#0a6ab8";

/* Animation presets */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Contact() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* ===============================
          HERO SECTION
      =============================== */}
      <section
        className="relative flex items-center justify-center w-full overflow-hidden bg-gradient-to-br from-[color:var(--brand)] via-[color:var(--brand-tint)] to-sky-600 text-white"
        style={{
          ["--brand"]: BRAND,
          ["--brand-tint"]: BRAND_TINT,
        }}
      >
        {/* background texture */}
        <div className="absolute inset-0 bg-[url('/texture.png')] bg-cover bg-center opacity-10" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-24 md:py-32">
          <motion.h1
            {...fadeUp(0)}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Contact{" "}
            <span className="text-yellow-300">Brihaspathi Technologies</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="mt-5 text-lg md:text-xl text-white/90 leading-relaxed"
          >
            Connect with our experts for inquiries, collaborations, or service
            assistance. We’re here to help you harness the power of AI, IoT, and
            next-generation technology for your business.
          </motion.p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[80px] fill-white"
          >
            <path d="M321.39,56.44c58.69,10.79,117.38,21.57,175.78,22.54,58.4.97,117.29-8.93,175.78-20.23C731.44,47.45,790.33,33,848.72,33.67c58.39.66,117.28,14.11,175.78,24.9,58.49,10.79,117.38,18.69,175.78,17.05V120H0V81.69C58.69,70.9,117.38,45.65,175.78,42.05S262.7,45.65,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* ===============================
          INTRODUCTION SECTION
      =============================== */}
      <section className="py-14 px-6 bg-white border-b border-gray-100 text-center">
        <motion.h2
          {...fadeUp(0)}
          className="text-3xl md:text-4xl font-bold text-[color:var(--brand)]"
          style={{ ["--brand"]: BRAND }}
        >
          Let’s Collaborate and Innovate
        </motion.h2>
        <motion.p
          {...fadeUp(0.3)}
          className="mt-4 max-w-3xl mx-auto text-gray-600 leading-relaxed"
        >
          At{" "}
          <span className="font-semibold text-gray-800">
            Brihaspathi Technologies Limited
          </span>
          , we’ve been driving innovation for over a decade — empowering
          businesses, government agencies, and institutions with secure,
          scalable, and intelligent technology solutions.
        </motion.p>
      </section>

      {/* ===============================
          BRANCH MAP SECTION
      =============================== */}
      <section className="relative bg-gray-50 py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.h3
            {...fadeUp(0)}
            className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-10"
          >
            Our Nationwide Presence
          </motion.h3>
          <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
            With branches spread across India, Brihaspathi Technologies
            continues to deliver excellence in technology implementation, AI
            surveillance, IoT innovation, and enterprise solutions.
          </p>
          <IndiaBranchesMap />
        </div>
      </section>

      {/* ===============================
          CONTACT FORM SECTION
      =============================== */}
      <section className="relative bg-white py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.h3
            {...fadeUp(0)}
            className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-10"
          >
            Get in Touch With Us
          </motion.h3>
          <ContactFormBrand />
        </div>
      </section>

      {/* ===============================
          CTA / FOOTER SECTION
      =============================== */}
      <section
        className="relative bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-tint)] text-white text-center py-16"
        style={{
          ["--brand"]: BRAND,
          ["--brand-tint"]: BRAND_TINT,
        }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            {...fadeUp(0)}
            className="text-3xl font-bold mb-4 leading-snug"
          >
            Together, Let’s Build the Future of Intelligent Technology
          </motion.h2>
          <p className="text-white/90 mb-8 leading-relaxed">
            Our mission is to empower organizations through AI, automation, and
            digital transformation. Let’s collaborate to bring your vision to
            life.
          </p>
          <a
            href="mailto:info@brihaspathi.com"
            className="inline-block rounded-full bg-white text-[color:var(--brand)] font-semibold px-6 py-3 hover:bg-gray-100 transition shadow-md"
          >
            info@brihaspathi.com
          </a>
        </div>
      </section>
    </main>
  );
}
