import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Search as SearchIcon,
  X,
  Box,
  Grid,
  Camera,
  Cpu,
  Cog,
  Shield,
  ScanFace,
  KeySquare,
  MonitorSmartphone,
  CircuitBoard,
  Layers,
  Database,
  Cable,
  Bot,
  Workflow,
  Package,
  Tag,
  Waypoints,
  AppWindow,
  Building2,
  Building,
  Store,
  Router,
  Server,
  HardDrive,
  PanelLeft,
} from "lucide-react";

// 👇 Update this path for your Vite project structure
import { MENU_DATA } from "../data/menuData";

const BRAND = "#07518a";

/* ===== Helpers ===== */
function slugify(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

/** Map string icon keys → Lucide icons (fallbacks) */
function getIcon(name) {
  const size = 18;
  const dict = {
    products: <Box size={size} />,
    services: <Cog size={size} />,
    solutions: <Grid size={size} />,
    camera: <Camera size={size} />,
    cctv: <Camera size={size} />,
    video: <Camera size={size} />,
    analytics: <ScanFace size={size} />,
    "video-analytics": <ScanFace size={size} />,
    "access-control": <KeySquare size={size} />,
    security: <Shield size={size} />,
    iot: <MonitorSmartphone size={size} />,
    edge: <Cpu size={size} />,
    gateway: <Router size={size} />,
    server: <Server size={size} />,
    storage: <HardDrive size={size} />,
    nvr: <HardDrive size={size} />,
    dvr: <HardDrive size={size} />,
    cable: <Cable size={size} />,
    network: <Router size={size} />,
    database: <Database size={size} />,
    software: <AppWindow size={size} />,
    platform: <Layers size={size} />,
    sdk: <Workflow size={size} />,
    api: <CircuitBoard size={size} />,
    package: <Package size={size} />,
    bot: <Bot size={size} />,
    retail: <Store size={size} />,
    enterprise: <Building2 size={size} />,
    building: <Building size={size} />,
    tags: <Tag size={size} />,
    routes: <Waypoints size={size} />,
  };
  if (!name) return <Box size={size} />;
  const key = name.toLowerCase().trim();
  return dict[key] ?? <Box size={size} />;
}

/* ===== Motion variants ===== */
const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
};

const columnVariants = {
  hidden: { opacity: 0, y: 4, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  }),
};

const itemHoverVariants = {
  hover: { scale: 1.02, y: -1, transition: { duration: 0.12 } },
  tap: { scale: 0.98, transition: { duration: 0.08 } },
};

const searchFocusVariants = {
  focus: {
    scale: 1.01,
    boxShadow: "0 0 0 3px rgba(7, 81, 138, 0.1)",
    transition: { duration: 0.18 },
  },
};

/* === tiny: clamp util for grid focus === */
function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}

/* ===== Component ===== */
export function MegaMenu({
  isOpen,
  category, // "products" | "services" | "solutions"
  menuData = (MENU_DATA || {})[category] || [],
  id,
  onClose,
}) {
  const uid = useId();
  const wrapperRef = useRef(null);
  const firstFocusableRef = useRef(null);

  const [query, setQuery] = useState("");
  const [selectedCol, setSelectedCol] = useState(0);
  const [openMap, setOpenMap] = useState({});
  const rightPaneRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const cols = useMemo(() => menuData ?? [], [menuData]);

  // search in label + description
  const filteredCols = useMemo(() => {
    if (!query.trim()) return cols;
    const q = query.toLowerCase();
    return cols
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (it) =>
            it.label.toLowerCase().includes(q) ||
            (it.description && it.description.toLowerCase().includes(q))
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [cols, query]);

  const effectiveSelected = useMemo(() => {
    const sel = filteredCols[selectedCol] ? selectedCol : 0;
    return Math.max(0, Math.min(sel, filteredCols.length - 1));
  }, [filteredCols, selectedCol]);

  /* Close on outside click */
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onClose?.();
      }
    }
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  /* Autofocus search */
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => firstFocusableRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [isOpen]);

  /* Mobile: pre-open first two */
  useEffect(() => {
    if (!isOpen) return;
    const initial = {};
    filteredCols.slice(0, 2).forEach((c) => (initial[c.title] = true));
    setOpenMap(initial);
  }, [isOpen, filteredCols]);

  /* Desktop key nav (left rail + right grid) */
  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;
    const handleKeyDown = (e) => {
      const inRight =
        document.activeElement &&
        rightPaneRef.current?.contains(document.activeElement);

      const list = filteredCols[effectiveSelected]?.items ?? [];
      const gridCols = 2;
      if (inRight && list.length > 0) {
        if (
          ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)
        ) {
          e.preventDefault();
        }
        if (e.key === "ArrowRight")
          setFocusedIndex((i) => clamp(i + 1, 0, list.length - 1));
        if (e.key === "ArrowLeft")
          setFocusedIndex((i) => clamp(i - 1, 0, list.length - 1));
        if (e.key === "ArrowDown")
          setFocusedIndex((i) => clamp(i + gridCols, 0, list.length - 1));
        if (e.key === "ArrowUp")
          setFocusedIndex((i) => clamp(i - gridCols, 0, list.length - 1));
        if (e.key === "Enter" && focusedIndex >= 0) {
          const it = list[focusedIndex];
          if (!it) return;
          const href = `/${category}/${slugify(
            filteredCols[effectiveSelected].title
          )}/${slugify(it.label)}?name=${encodeURIComponent(it.label)}`;
          window.location.href = href;
        }
      }

      // Global
      if (
        e.key === "ArrowDown" &&
        filteredCols.length > effectiveSelected + 1
      ) {
        e.preventDefault();
        setSelectedCol(effectiveSelected + 1);
      } else if (e.key === "ArrowUp" && effectiveSelected > 0) {
        e.preventDefault();
        setSelectedCol(effectiveSelected - 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        wrapperRef.current
          ?.querySelector('[data-left-rail="true"] button[aria-current="true"]')
          ?.focus();
      } else if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    filteredCols,
    effectiveSelected,
    category,
    focusedIndex,
    onClose,
  ]);

  const linkId = (href) => `mm-link-${uid}-${slugify(href)}`;

  /* Layout constants */
  const HEADER_H = 56; // px
  const PANEL_VH_DESKTOP = 40;
  const PANEL_VH_MOBILE = 70;

  /* Panel */
  const panel = (
    <motion.section
      id={id}
      role="menu"
      aria-label={`${category} mega menu`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="fixed left-1/2 top-16 md:top-20 z-[65] -translate-x-1/2"
      style={{ width: "50vw" }}
    >
      <div
        ref={wrapperRef}
        className="rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden relative"
        style={{
          ["--brand"]: BRAND,
          height: `clamp(${PANEL_VH_MOBILE}vh, 70vh, ${PANEL_VH_DESKTOP}vh)`,
        }}
      >
        {/* Top hairline */}
        <div
          className="absolute left-0 right-0 top-[56px] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent pointer-events-none z-10"
          aria-hidden
        />

        {/* Header */}
        <div
          className="flex items-center justify-between gap-2 px-3 py-2"
          style={{ height: HEADER_H }}
        >
          <motion.div
            className="relative w-full max-w-[480px]"
            variants={searchFocusVariants}
            whileFocus="focus"
          >
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              ref={firstFocusableRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${category}...`}
              aria-label={`Search ${category}`}
              className="w-full rounded-lg border-0 bg-gray-50/80 pl-9 pr-3 py-2 text-sm outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[var(--brand)]/20"
              style={{ ["--brand"]: BRAND }}
            />
          </motion.div>

          <div className="hidden items-center gap-2 lg:flex">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={`/${category}`}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: BRAND }}
                onClick={onClose}
              >
                Explore all {category}
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50/80"
              aria-label="Close menu"
            >
              Close
            </motion.button>
          </div>

          {/* Mobile close */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 transition-all duration-200 hover:bg-gray-50/80 lg:hidden"
            style={{ color: BRAND }}
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Body */}
        <div
          className="h-full"
          style={{ height: `calc(100% - ${HEADER_H}px)` }}
        >
          {/* Mobile accordions */}
          <div className="px-3 py-3 lg:hidden h-full overflow-y-auto">
            <div className="sticky -top-3 h-3 bg-gradient-to-b from-white/80 to-transparent z-10 pointer-events-none" />
            <AnimatePresence mode="wait">
              {filteredCols.map((col, idx) => {
                const open = !!openMap[col.title];
                return (
                  <motion.div
                    key={col.title}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ delay: idx * 0.04, duration: 0.22 }}
                    className="mb-2 rounded-xl border bg-white/90 backdrop-blur-sm shadow-sm"
                  >
                    <motion.button
                      whileHover={{ backgroundColor: "rgba(7,81,138,0.06)" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full items-center justify-between rounded-t-xl px-3 py-2.5 text-left text-sm font-semibold transition-all duration-200"
                      onClick={() =>
                        setOpenMap((m) => ({
                          ...m,
                          [col.title]: !m[col.title],
                        }))
                      }
                      aria-expanded={open}
                      aria-controls={`acc-${slugify(col.title)}`}
                    >
                      <span className="inline-flex items-center gap-3">
                        {col.titleIcon ? (
                          <span
                            className="h-8 w-8 rounded-md bg-[var(--brand)]/10 grid place-items-center overflow-hidden"
                            style={{ ["--brand"]: BRAND }}
                          >
                            <img
                              src={col.titleIcon}
                              alt={`${col.title} icon`}
                              className="h-7 w-7 object-contain"
                              loading="lazy"
                            />
                          </span>
                        ) : (
                          <span
                            className="p-1.5 rounded-md bg-[var(--brand)]/10"
                            style={{ ["--brand"]: BRAND }}
                          >
                            {getIcon(col.icon)}
                          </span>
                        )}
                        <span className="text-gray-900">{col.title}</span>
                      </span>
                      <motion.div
                        animate={{ rotate: open ? 90 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.ul
                          id={`acc-${slugify(col.title)}`}
                          initial={{ height: 0, opacity: 0, y: -8 }}
                          animate={{ height: "auto", opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: -8 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden px-3 py-2 space-y-1"
                          role="group"
                          aria-label={col.title}
                        >
                          {col.items.map((it, itemIdx) => (
                            <motion.li
                              key={it.label}
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIdx * 0.04 }}
                            >
                              <motion.div
                                variants={itemHoverVariants}
                                whileHover="hover"
                                whileTap="tap"
                              >
                                <Link
                                  to={`/${category}/${slugify(
                                    col.title
                                  )}/${slugify(
                                    it.label
                                  )}?name=${encodeURIComponent(it.label)}`}
                                  onClick={onClose}
                                  className="block rounded-lg px-3 py-2 text-sm transition-all duration-200 text-[var(--brand)]/90 hover:bg-[var(--brand)]/10 hover:text-[var(--brand)] font-medium"
                                  style={{ ["--brand"]: BRAND }}
                                  dangerouslySetInnerHTML={{
                                    __html: highlight(it.label, query),
                                  }}
                                />
                              </motion.div>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredCols.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl bg-white/85 p-6 text-center backdrop-blur-sm"
              >
                <p className="text-sm text-gray-500">
                  No matches for “{query}”.
                </p>
              </motion.div>
            )}
          </div>

          {/* Desktop layout */}
          <div className="hidden lg:grid lg:grid-cols-[260px_1fr] lg:gap-4 lg:px-4 lg:py-4 h-full relative">
            <div className="pointer-events-none absolute inset-x-4 top-4 h-6 bg-gradient-to-b from-white/70 to-transparent rounded-lg" />
            <div className="pointer-events-none absolute inset-x-4 bottom-4 h-6 bg-gradient-to-t from-white/70 to-transparent rounded-lg" />

            {/* Left rail */}
            <motion.aside
              data-left-rail="true"
              className="h-full rounded-xl overflow-hidden flex flex-col border"
              initial={{ x: -16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.22 }}
              style={{ borderColor: `${BRAND}22` }}
            >
              <div
                className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white"
                style={{ background: BRAND }}
              >
                <PanelLeft className="h-3.5 w-3.5" />
                {category}
              </div>
              <ul className="flex-1 overflow-auto p-2 space-y-1">
                <AnimatePresence mode="wait">
                  {filteredCols.map((col, idx) => {
                    const active = idx === effectiveSelected;
                    return (
                      <motion.li
                        key={col.title}
                        custom={idx}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={columnVariants}
                      >
                        <motion.button
                          variants={itemHoverVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() => {
                            setSelectedCol(idx);
                            setFocusedIndex(-1);
                          }}
                          className={[
                            "w-full text-left flex items-center justify-between rounded-lg px-2.5 py-2 text-[13px] transition-all duration-200",
                            active
                              ? "bg-[var(--brand)]/15 text-[var(--brand)] ring-1 ring-[var(--brand)]/20"
                              : "text-gray-800 hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]",
                          ].join(" ")}
                          style={{ ["--brand"]: BRAND }}
                          aria-current={active ? "true" : undefined}
                        >
                          <span className="inline-flex items-center gap-3">
                            {col.titleIcon ? (
                              <span
                                className={`h-8 w-8 rounded-md ${
                                  active
                                    ? "bg-[var(--brand)]/20"
                                    : "bg-[var(--brand)]/10"
                                } grid place-items-center overflow-hidden`}
                                style={{ ["--brand"]: BRAND }}
                              >
                                <img
                                  src={col.titleIcon}
                                  alt={`${col.title} icon`}
                                  className="h-7 w-7 object-contain"
                                  loading="lazy"
                                />
                              </span>
                            ) : (
                              <span
                                className={`p-1.5 rounded-md ${
                                  active
                                    ? "bg-[var(--brand)]/20"
                                    : "bg-gray-100"
                                }`}
                              >
                                {getIcon(col.icon)}
                              </span>
                            )}
                            <span className="truncate">{col.title}</span>
                          </span>
                        </motion.button>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </motion.aside>

            {/* Right content */}
            <motion.section
              className="h-full rounded-xl bg-white/90 backdrop-blur-sm shadow-sm overflow-hidden flex flex-col relative border"
              initial={{ x: 16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.22 }}
              key={effectiveSelected}
              style={{ borderColor: `${BRAND}22` }}
            >
              {/* right header */}
              {filteredCols.length > 0 ? (
                <div
                  className="px-3 py-2 text-[11px] font-semibold tracking-wide text-white"
                  style={{ background: BRAND }}
                >
                  {filteredCols[effectiveSelected]?.title}
                </div>
              ) : (
                <div
                  className="px-3 py-2"
                  style={{ background: `${BRAND}0D` }}
                />
              )}

              {/* grid */}
              <div
                ref={rightPaneRef}
                className="flex-1 overflow-auto p-3 grid grid-cols-2 gap-2"
                role="grid"
                aria-label={`${
                  filteredCols[effectiveSelected]?.title || ""
                } items`}
              >
                {filteredCols.length === 0 ? (
                  <div className="col-span-2 flex h-full items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        No matches for “{query}”.
                      </p>
                    </div>
                  </div>
                ) : (
                  filteredCols[effectiveSelected]?.items.map((it, idx) => {
                    const href = `/${category}/${slugify(
                      filteredCols[effectiveSelected].title
                    )}/${slugify(it.label)}?name=${encodeURIComponent(
                      it.label
                    )}`;
                    const isFocused = idx === focusedIndex;
                    return (
                      <motion.div
                        key={it.label}
                        custom={idx}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={columnVariants}
                      >
                        <Link
                          id={linkId(href)}
                          to={href}
                          onClick={onClose}
                          onFocus={() => setFocusedIndex(idx)}
                          className={[
                            "group relative block rounded-lg px-3 py-2 text-[13px] transition-all duration-200",
                            isFocused
                              ? "ring-2 ring-[var(--brand)]/30"
                              : "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30",
                            "text-gray-800 hover:text-[var(--brand)]",
                          ].join(" ")}
                          style={{ ["--brand"]: BRAND }}
                          dangerouslySetInnerHTML={{
                            __html: highlight(it.label, query),
                          }}
                        />
                        <ChevronRight
                          className="h-4 w-4 text-gray-400 group-hover:text-[var(--brand)] transition-colors duration-200"
                          aria-hidden
                        />
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      {/* Regular <style> (since styled-jsx is Next-only) */}
      <style>{`
        @media (max-width: 1023px) {
          [aria-label="${category} mega menu"] {
            width: 92vw !important;
            min-width: 0 !important;
          }
        }
        /* Nicer scrollbars */
        [aria-label="${category} mega menu"] .overflow-auto {
          scrollbar-width: thin;
          scrollbar-color: ${BRAND} #e5e7eb;
        }
        [aria-label="${category} mega menu"] .overflow-auto::-webkit-scrollbar {
          height: 10px;
          width: 8px;
        }
        [aria-label="${category} mega menu"] .overflow-auto::-webkit-scrollbar-thumb {
          background: ${BRAND}22;
          border-radius: 9999px;
        }
        [aria-label="${category} mega menu"] .overflow-auto::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 9999px;
        }
      `}</style>
    </motion.section>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
            onClick={onClose}
            transition={{ duration: 0.18 }}
          />
          {panel}
        </>
      )}
    </AnimatePresence>
  );
}
