"use client";

import React from "react";
import { motion } from "framer-motion";
import MasonryGallery, { buildMasonryData } from "../components/MasonryGallery";
import BrihaspathiMediaShowcase from "../components/BrihaspathiMediaShowcase";

/* ====== Brand Colors ====== */
const BRAND = "#07518a";
const BRAND_TINT = "#0a6ab8";

/* ====== Masonry Data ====== */
const data = buildMasonryData(96);

export default function News() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* ===============================
           HERO SECTION
      =============================== */}
      <section
        className="relative w-full overflow-hidden bg-gradient-to-br from-[color:var(--brand)] via-[color:var(--brand-tint)] to-sky-600 text-white"
        style={{
          ["--brand"]: BRAND,
          ["--brand-tint"]: BRAND_TINT,
        }}
      >
        <div className="absolute inset-0 bg-[url('/texture.png')] bg-cover bg-center opacity-10" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            News & Media
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/90"
          >
            Stay updated with the latest news, videos, and media coverage about{" "}
            <span className="font-semibold text-white">
              Brihaspathi Technologies.
            </span>{" "}
            Discover how we’re transforming technology, innovation, and
            AI-driven security across India.
          </motion.p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[80px] fill-white"
          >
            <path d="M321.39,56.44c58.69,10.79,117.38,21.57,175.78,22.54,58.4.97,117.29-8.93,175.78-20.23C731.44,47.45,790.33,33,848.72,33.67c58.39.66,117.28,14.11,175.78,24.9,58.49,10.79,117.38,18.69,175.78,17.05V120H0V81.69C58.69,70.9,117.38,45.65,175.78,42.05S262.7,45.65,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* ===============================
           INTRO SECTION (About)
      =============================== */}
      <section className="relative bg-white py-14 px-6 border-b border-gray-100">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-semibold text-[color:var(--brand)]"
            style={{ ["--brand"]: BRAND }}
          >
            About Brihaspathi Technologies in the Media
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Brihaspathi Technologies Limited has made a mark in the tech and AI
            industry with a presence across government, defense, and enterprise
            sectors. Our innovations in video analytics, AI-driven surveillance,
            and IoT solutions have been featured in renowned publications like
            NDTV, CNBC, and TV9. Here’s a look at how the world sees us.
          </motion.p>
        </div>
      </section>

      {/* ===============================
           PHOTO WALL / MASONRY FIRST
      =============================== */}
      <section className="relative bg-white py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-semibold text-gray-900 mb-4"
          >
            News Gallery
          </motion.h3>

          <p className="text-gray-600 mb-8 max-w-3xl">
            Explore moments from our media coverage, corporate events, and
            celebrations that showcase Brihaspathi Technologies’ journey and
            innovation spirit.
          </p>

          <div className="rounded-2xl overflow-hidden ring-1 ring-gray-200 shadow-md bg-gray-50">
            <MasonryGallery data={data} />
          </div>
        </div>
      </section>

      {/* ===============================
           MEDIA SHOWCASE SECOND
      =============================== */}
      <section className="relative bg-gray-50 py-12 px-6 border-t border-gray-200">
        <div className="mx-auto max-w-6xl">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-semibold text-gray-900 mb-4"
          >
            Featured Articles & Videos
          </motion.h3>

          <div className="bg-white rounded-2xl shadow-sm p-6 ring-1 ring-gray-200">
            <BrihaspathiMediaShowcase />
          </div>
        </div>
      </section>

      {/* ===============================
           FOOTER CTA
      =============================== */}
      <section
        className="relative bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-tint)] text-white py-14 text-center"
        style={{
          ["--brand"]: BRAND,
          ["--brand-tint"]: BRAND_TINT,
        }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Transforming the Future of AI and Security
          </motion.h2>
          <p className="text-white/90 mb-8">
            From smart surveillance to AI innovation — Brihaspathi Technologies
            continues to redefine how India connects, protects, and grows.
          </p>
          <a
            href="/contact"
            className="inline-block rounded-full bg-white text-[color:var(--brand)] font-semibold px-6 py-3 hover:bg-gray-100 transition shadow-md"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
