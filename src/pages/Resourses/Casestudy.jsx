import React, { useMemo, useState } from "react";
import {
  Building2,
  Stethoscope,
  GraduationCap,
  ShoppingCart,
  Banknote,
  Car,
  Plane,
  Utensils,
  Zap,
  Shield,
  Hammer,
  Users,
  Briefcase,
  MapPin,
  User,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CASE_STUDIES_BY_SECTOR } from "../../data/Casestudy";

const BRAND = "#07518a";

/* ===== Helpers ===== */
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function highlight(text, q) {
  if (!q.trim()) return text;
  const re = new RegExp(`(${escapeRegExp(q)})`, "ig");
  return text.replace(
    re,
    "<mark class='bg-yellow-200 rounded px-0.5'>$1</mark>"
  );
}

/* ===== Icons ===== */
const sectorIcons = {
  education: GraduationCap,
  healthcare: Stethoscope,
  technology: Building2,
  retail: ShoppingCart,
  finance: Banknote,
  automotive: Car,
  travel: Plane,
  food: Utensils,
  energy: Zap,
  security: Shield,
  construction: Hammer,
  consulting: Users,
  business: Briefcase,
  default: Briefcase,
};
function getSectorIcon(sectorName) {
  const key = sectorName.toLowerCase();
  const match = Object.keys(sectorIcons).find((k) => key.includes(k));
  return sectorIcons[match || "default"];
}

/* =====================================================
   IMAGE WITH TEXT FALLBACK COMPONENT
===================================================== */
function ImageWithFallback({ src, alt, fallbackText }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex items-center justify-center h-20 w-20 bg-gray-100 text-[var(--brand)] text-[11px] text-center font-semibold px-2 leading-tight rounded">
        {fallbackText?.length > 25
          ? fallbackText.slice(0, 25) + "..."
          : fallbackText}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-20 w-20 object-contain"
      onError={() => setFailed(true)}
    />
  );
}

/* =====================================================
   MAIN COMPONENT
===================================================== */
export default function CaseStudiesPage() {
  const [activeSector, setActiveSector] = useState(
    Object.keys(CASE_STUDIES_BY_SECTOR)[0]
  );
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name-asc");

  const sectors = useMemo(
    () =>
      Object.entries(CASE_STUDIES_BY_SECTOR).map(([name, items]) => ({
        name,
        count: items.length,
        icon: getSectorIcon(name),
      })),
    []
  );

  const items = CASE_STUDIES_BY_SECTOR[activeSector] || [];

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    let res = items.filter((cs) => cs.name.toLowerCase().includes(q));
    if (sortKey === "name-asc") res.sort((a, b) => a.name.localeCompare(b.name));
    if (sortKey === "name-desc")
      res.sort((a, b) => b.name.localeCompare(a.name));
    return res;
  }, [items, query, sortKey]);

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <main className="mx-auto max-w-7xl py-8 px-4 md:px-6" style={{ "--brand": BRAND }}>
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
        {/* Sidebar - Responsive Scrollable Tabs on Small Screens */}
        <aside className="lg:col-span-3">
          <div className="sticky top-6 bg-white shadow rounded-xl overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" /> Industry Sectors
            </div>

            {/* Scrollable sectors list */}
            <div className="flex lg:block overflow-x-auto lg:overflow-visible p-2 space-x-3 lg:space-x-0">
              {sectors.map((s) => {
                const Icon = s.icon;
                const isActive = s.name === activeSector;
                return (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <div
                      className={`flex items-center justify-between p-3 mb-1 rounded-lg cursor-pointer min-w-[150px] lg:min-w-0 ${
                        isActive ? "bg-blue-50" : "bg-white hover:bg-blue-50"
                      }`}
                      onClick={() => setActiveSector(s.name)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isActive
                              ? "bg-[var(--brand)] text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="font-medium capitalize whitespace-nowrap">
                          {s.name}
                        </span>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded hidden lg:block">
                        {s.count}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="lg:col-span-9">
          <motion.div
            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2"
            initial="hidden"
            animate="visible"
            variants={listVariants}
          >
            <AnimatePresence>
              {filteredItems.map((cs) => (
                <motion.div key={cs.id} variants={itemVariants}>
                  <Link to={`/case-studies/${slugify(cs.name)}`} state={{ cs }}>
                    <article className="group relative overflow-hidden rounded-xl bg-[var(--brand)] text-white shadow-lg hover:-translate-y-1 transition-transform">
                      <div className="flex flex-col sm:flex-row h-full">
                        <div className="sm:w-32 bg-white border-b sm:border-r flex items-center justify-center p-3">
                          <ImageWithFallback
                            src={cs.avatar}
                            alt={cs.name}
                            fallbackText={cs.name}
                          />
                        </div>
                        <div className="flex-1 p-5">
                          <h3
                            className="text-base font-semibold group-hover:underline underline-offset-4"
                            dangerouslySetInnerHTML={{
                              __html: highlight(cs.name, query),
                            }}
                          />
                          <p className="mt-1 text-xs text-white/80 flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" /> {cs.city || "—"}
                          </p>
                          <p className="mt-1 text-xs text-white/80 flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />{" "}
                            {cs.company || "Brihaspathi Technologies"}
                          </p>
                          <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/70 px-2.5 py-1.5 text-sm">
                            Read Case Study <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-sm">
              No case studies found for this sector.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
