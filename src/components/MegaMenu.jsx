// src/components/Header/MegaMenu.jsx
import React, { useEffect, useMemo, useRef, useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Search, PanelLeft, X } from "lucide-react";
import { MENU_DATA } from "../data/menuData";

const BRAND = "#07518a";

/* Utility Functions */
const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const highlight = (text = "", q = "") => {
  if (!q.trim()) return text;
  const re = new RegExp(`(${q})`, "ig");
  return text.replace(re, "<mark class='bg-yellow-200'>$1</mark>");
};

/* Variants */
const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
};

/* ========== MegaMenu ========== */
export default function MegaMenu({ isOpen, category, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const cols = useMemo(() => MENU_DATA[category] || [], [category]);
  const filteredCols = useMemo(() => {
    if (!query) return cols;
    const q = query.toLowerCase();
    return cols
      .map((c) => ({
        ...c,
        items: (c.items || []).filter((it) =>
          it.label.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [cols, query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/10"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-1/2 top-20 z-[65] w-[50vw] -translate-x-1/2 rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* === Header === */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <PanelLeft className="h-4 w-4 text-[var(--brand)]" />
                <span className="text-[var(--brand)] font-semibold capitalize">
                  {category}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  placeholder={`Search ${category}...`}
                  className="rounded-lg border border-gray-200 px-3 py-1 text-sm outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  onClick={onClose}
                  className="rounded-md p-2 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* === Grid === */}
            <div className="grid grid-cols-[240px_1fr] h-[60vh] overflow-hidden">
              {/* Left Column */}
              <div
                className="border-r border-gray-100 overflow-y-auto"
                style={{ scrollbarWidth: "thin" }}
              >
                {filteredCols.map((col) => (
                  <div key={col.title} className="p-3 border-b border-gray-50">
                    <h3 className="text-[var(--brand)] font-semibold mb-2">
                      {col.title}
                    </h3>
                    <ul className="space-y-1">
                      {col.items.map((it) => (
                        <li key={it.label}>
                          <Link
                            to={`/${category}/${slugify(col.title)}/${slugify(
                              it.label
                            )}`}
                            onClick={onClose}
                            className="block text-sm text-gray-700 hover:text-[var(--brand)]"
                            dangerouslySetInnerHTML={{
                              __html: highlight(it.label, query),
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Right Panel */}
              <div className="p-6 bg-gradient-to-br from-[var(--brand)]/5 to-transparent">
                <h4 className="font-medium text-gray-700 text-lg mb-2">
                  Explore {category}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Discover all {category} offerings designed to deliver
                  innovation and reliability across industries.
                </p>
                <Link
                  to={`/${category}`}
                  onClick={onClose}
                  className="mt-4 inline-block rounded-full bg-[var(--brand)] text-white px-5 py-2 text-sm font-semibold hover:opacity-90"
                >
                  View all {category}
                </Link>
              </div>
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}
