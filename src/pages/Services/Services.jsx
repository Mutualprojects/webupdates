"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { LayoutGrid, List, ChevronRight } from "lucide-react";
import { MENU_DATA } from "../../data/menuData";

const BRAND = "#07518a";

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function getItemImage(i) {
  return i.image || i.img || i.icon || "/default-service.png";
}
function getCategoryIconSrc(c) {
  return (
    c.titleIcon || c.icon || c.iconUrl || c.image || "/default-category.png"
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

export default function ServicesPage() {
  const prefersReducedMotion = useReducedMotion();
  const categories = MENU_DATA.services ?? [];

  const allItems = useMemo(() => {
    const out = [];
    categories.forEach((c) =>
      c.items.forEach((i) => out.push({ ...i, __cat: c.title }))
    );
    return out;
  }, [categories]);

  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid");

  const filtered = useMemo(() => {
    const source =
      activeCat === "All"
        ? allItems
        : allItems.filter((i) => i.__cat === activeCat);
    if (!query.trim()) return source;
    const q = query.toLowerCase();
    return source.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        (i.features || []).some((f) => f.toLowerCase().includes(q))
    );
  }, [allItems, activeCat, query]);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const headingScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -10]);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => (document.body.style.overflowX = "");
  }, []);

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section
        ref={heroRef}
        className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] text-white overflow-hidden"
        style={{ ["--brand"]: BRAND }}
      >
        <div className="absolute inset-0 bg-[var(--brand)]" />
        <motion.span
          className="absolute -top-28 right-10 h-96 w-96 rounded-full bg-white/10 blur-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center">
          <motion.h1
            style={{ scale: headingScale, y: headingY }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
          >
            Services We Plan & Deliver
          </motion.h1>
          <motion.p
            className="mt-5 text-white/90 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Delivering end-to-end AI, IoT, software, and automation services —
            designed for digital transformation.
          </motion.p>

          {/* Category icons */}
          <div className="mt-14 flex flex-wrap justify-center gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="flex flex-col items-center text-white/90"
              >
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <img
                    src={getCategoryIconSrc(cat)}
                    alt={cat.title}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <span className="mt-2 text-sm font-medium">{cat.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FILTER BAR ===================== */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between py-3 gap-2">
          <div className="flex flex-wrap gap-2">
            {["All", ...categories.map((c) => c.title)].map((title) => {
              const cat = categories.find((c) => c.title === title);
              const iconSrc = cat ? getCategoryIconSrc(cat) : null;
              const selected = activeCat === title;
              return (
                <button
                  key={title}
                  onClick={() => setActiveCat(title)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                    selected
                      ? "bg-[var(--brand)] text-white border-[var(--brand)] shadow-md"
                      : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {iconSrc && (
                    <img
                      src={iconSrc}
                      alt=""
                      className="h-5 w-5 object-contain"
                    />
                  )}
                  {title}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-md border transition ${
                view === "grid"
                  ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-md border transition ${
                view === "list"
                  ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ===================== CONTENT ===================== */}
      <div
        id="services"
        className="mx-auto max-w-7xl px-4 py-12"
        style={{ ["--brand"]: BRAND }}
      >
        <p className="mb-6 text-gray-500 text-sm">
          Showing {filtered.length} service{filtered.length === 1 ? "" : "s"}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCat}-${view}`}
            {...fadeUp}
            className={
              view === "grid"
                ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid gap-4"
            }
          >
            {filtered.map((item) => {
              const img = getItemImage(item);
              const href = `/services/${slugify(item.__cat)}/${slugify(
                item.label
              )}`;

              return view === "grid" ? (
                // ===== GRID CARD =====
                <Link
                  key={href}
                  to={href}
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  <div className="h-52 bg-gray-50 flex items-center justify-center">
                    <img
                      src={img}
                      alt={item.label}
                      className="h-full w-full object-contain p-6 transition-transform group-hover:scale-105"
                    />
                  </div>
                  {/* Brand title band */}
                  <div className="absolute inset-x-0 bottom-0 bg-[var(--brand)] px-4 py-3 text-white flex justify-between items-center">
                    <span className="font-semibold">{item.label}</span>
                    <ChevronRight className="h-5 w-5 opacity-90" />
                  </div>
                </Link>
              ) : (
                // ===== LIST ROW =====
                <Link
                  key={href}
                  to={href}
                  className="group flex items-center gap-4 bg-white border rounded-xl p-4 hover:shadow-lg transition"
                >
                  <img
                    src={img}
                    alt={item.label}
                    className="h-16 w-16 object-contain flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="inline-flex max-w-full items-center gap-2 px-3 py-1 rounded-md bg-[var(--brand)] text-white font-semibold text-sm">
                      <span className="truncate">{item.label}</span>
                    </span>
                    <p className="mt-2 text-xs text-gray-500 line-clamp-1">
                      {item.features?.[0]}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
