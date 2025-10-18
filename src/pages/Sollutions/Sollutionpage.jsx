"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ================== Data ================== */
const solutions = [
  {
    slug: "video-analytics",
    title: "AI Video Analytics",
    summary:
      "Real-time, edge-accelerated analytics for surveillance feeds—detect, classify, and act on events as they happen.",
    image: "/sollution_images/3.jpg",
    features: [
      "Object & Person Detection",
      "Face Recognition & Watchlists",
      "ANPR / License Plate Reading",
      "Intrusion & Line-Crossing",
      "Crowd Counting & Heatmaps",
    ],
  },
  {
    slug: "access-control",
    title: "Access Control & Attendance",
    summary:
      "Unified access management with biometric, RFID, and mobile credentials—built for security, compliance, and scale.",
    image: "/sollution_images/4.jpg",
    features: [
      "Biometric & RFID",
      "Mobile Credentials",
      "Role-Based Access",
      "Visitor Management",
    ],
  },
  {
    slug: "smart-retail",
    title: "Smart Retail Analytics",
    summary:
      "Computer vision insights for stores: footfall, dwell, queues, planogram & shelf health to boost conversion.",
    image: "/sollution_images/SMart retail.jpg",
    features: [
      "Footfall & Heatmaps",
      "Queue Alerts",
      "Shelf Stock-Out Detection",
      "Loss Prevention",
    ],
  },
  {
    slug: "smart-bus",
    title: "Smart Bus Solution",
    summary:
      "Safety-first transit with onboard AI CCTV, GPS/telemetry, panic alerts, and passenger information systems.",
    image: "/sollution_images/smart bus solution.jpg",
    features: [
      "AI CCTV & DMS",
      "GPS & Geofencing",
      "SOS Workflow",
      "Cloud Archival",
    ],
  },
];

const BRAND = "#07518a";
const CATEGORY_FOR_SLUG = {
  "video-analytics": "Security AI",
  "access-control": "Access & Identity",
  "smart-retail": "Retail",
  "smart-bus": "Transportation",
};

/* ================== Component ================== */
const enter = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function SolutionsPage() {
  const navigate = useNavigate();

  const items = useMemo(
    () =>
      solutions.map((s) => ({
        ...s,
        category: CATEGORY_FOR_SLUG[s.slug] ?? "Other",
      })),
    []
  );

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        (i.summary ?? "").toLowerCase().includes(q) ||
        i.features.some((f) => f.toLowerCase().includes(q))
    );
  }, [items, query]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setQuery("");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8" style={{ "--brand": BRAND }}>
      {/* ===== HERO SECTION ===== */}
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-[#07518a] to-[#0a6ab8] text-white">
        <div className="absolute inset-0">
          {/* <img
            src="/banners/solutions-hero.jpg"
            alt="Solutions Banner"
            className="h-full w-full object-cover opacity-20"
          /> */}
        </div>
        <div className="relative z-10 flex flex-col items-start justify-center px-8 py-20 md:px-16 lg:px-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold md:text-5xl"
          >
            What We Offer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 max-w-2xl text-lg text-gray-100"
          >
            Brihaspathi Technologies provides intelligent, future-ready
            solutions across AI Video Analytics, Access Control, Smart Retail,
            and Transportation to empower safer, smarter, and more efficient
            operations.
          </motion.p>
        </div>
      </div>

      {/* ===== SEARCH BAR ===== */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Explore Our Solutions
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Search or browse through AI-driven innovations that redefine
            surveillance, security, and automation.
          </p>
        </div>

        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search solutions or features…"
            className="w-full rounded-lg border border-gray-200 bg-white pl-9 pr-8 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* ===== GRID ===== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={query || "all"}
          variants={enter}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.length === 0 && (
            <div className="col-span-full rounded-lg border border-dashed p-8 text-center text-gray-500">
              No matches found.
            </div>
          )}

          {filtered.map((item) => (
            <motion.div
              key={item.slug}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer"
              onClick={() => navigate(`/solutions/${item.slug}`)}
            >
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition hover:shadow-lg">
                <div className="relative aspect-[16/9] w-full bg-gray-50">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: "var(--brand)" }}
                      />
                      <span style={{ color: "var(--brand)" }}>
                        {item.category}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[var(--brand)]" />
                  </div>

                  <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  {item.summary && (
                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                      {item.summary}
                    </p>
                  )}

                  {item.features.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
                        >
                          {f}
                        </span>
                      ))}
                      {item.features.length > 3 && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-500">
                          +{item.features.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-[11px] text-gray-600">
                      View details
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
