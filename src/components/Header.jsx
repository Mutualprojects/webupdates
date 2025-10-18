// src/components/Header.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search as SearchIcon,
  Box,
  Camera,
  Cpu,
  Cog,
  Shield,
  ScanFace,
  KeySquare,
  MonitorSmartphone,
  Router,
  Server,
  HardDrive,
  Cable,
  Bot,
  Store,
  Building2,
  Building,
  AppWindow,
  Layers,
  Workflow,
  CircuitBoard,
} from "lucide-react";
import { MENU_DATA } from "../data/menuData";

/* === BRAND CONFIG === */
const BRAND = "#07518a";
const WHITE_LOGO = "/highbtlogo white- tm.png";
const BLUE_LOGO = "/highbtlogo tm (1).png";

/* === HELPERS === */
function slugify(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\/&_,+]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getIcon(name) {
  const size = 28;
  const icons = {
    products: <Box size={size} />,
    services: <Cog size={size} />,
    solutions: <Shield size={size} />,
    camera: <Camera size={size} />,
    analytics: <ScanFace size={size} />,
    "access-control": <KeySquare size={size} />,
    iot: <MonitorSmartphone size={size} />,
    edge: <Cpu size={size} />,
    gateway: <Router size={size} />,
    server: <Server size={size} />,
    storage: <HardDrive size={size} />,
    cable: <Cable size={size} />,
    bot: <Bot size={size} />,
    retail: <Store size={size} />,
    enterprise: <Building2 size={size} />,
    building: <Building size={size} />,
    software: <AppWindow size={size} />,
    sdk: <Workflow size={size} />,
    api: <CircuitBoard size={size} />,
    platform: <Layers size={size} />,
  };
  const key = String(name).toLowerCase().trim();
  return icons[key] ?? <Box size={size} />;
}

/* === SMALL MENU (for Solutions / About / Resources) === */
function SmallMenu({ isOpen, items, category, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          className="absolute left-1/2 top-full z-[65] mt-2 w-56 -translate-x-1/2 rounded-xl bg-white shadow-lg ring-1 ring-black/5"
          onMouseLeave={onClose}
        >
          {items.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={s.to}
                onClick={onClose}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#07518a]/10 hover:text-[#07518a] font-medium"
              >
                {s.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* === MegaMenu (for Products / Services) === */
function MegaMenu({ isOpen, category, menuData, id, onClose }) {
  const wrapperRef = useRef(null);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const cols = useMemo(
    () => (Array.isArray(menuData) ? menuData : MENU_DATA?.[category] || []),
    [menuData, category]
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          id={id}
          role="menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          ref={wrapperRef}
          className="fixed left-0 right-0 z-[65] bg-[#f6f8fa] border-t border-gray-200 shadow-2xl overflow-y-auto"
          style={{
            top: "81px",
            maxHeight: "calc(100vh - 100px)",
          }}
        >
          <div className="mx-auto max-w-[120rem] px-10 py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
              {cols.map((col, colIdx) => (
                <motion.div
                  key={col.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: colIdx * 0.05, duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex flex-col items-center mb-5">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md border border-gray-200 overflow-hidden">
                      {col.titleIcon ? (
                        <img
                          src={col.titleIcon}
                          alt={`${col.title} icon`}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <span className="text-[#07518a]">
                          {getIcon(col.icon || col.title)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-gray-900 text-base text-center font-sans font-extrabold mt-2">
                      {col.title}
                    </h3>
                  </div>
                  <ul className="space-y-3 w-full flex flex-col items-start">
                    {(col.items || []).map((item) => {
                      const route = `/${category}/${slugify(
                        col.title
                      )}/${slugify(item.label)}`;
                      const active = hoveredLabel === item.label;
                      return (
                        <li key={item.label}>
                          <Link
                            to={route}
                            onClick={onClose}
                            onMouseEnter={() => setHoveredLabel(item.label)}
                            onMouseLeave={() => setHoveredLabel(null)}
                            className={`group flex items-center gap-2 px-3 py-1.5 rounded-md text-[0.95rem] font-medium transition-all duration-200 ${
                              active
                                ? "bg-[#07518a]/10 text-[#07518a]"
                                : "text-gray-700 hover:text-[#07518a] hover:bg-[#07518a]/5"
                            }`}
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#07518a]" />
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

/* === Header Component === */
export default function Header() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [bgProgress, setBgProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hoverTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () =>
      setBgProgress(Math.min(1, Math.max(0, window.scrollY / 140)));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = bgProgress < 0.45;

  const menu = useMemo(
    () => [
      { name: "home", label: "Home", to: "/" },
      { name: "products", label: "Products", to: "/products", mega: true },
      { name: "services", label: "Services", to: "/services", mega: true },
      {
        name: "solutions",
        label: "Solutions",
        to:"solutions",
        submenu: [
          { label: "AI Video Analytics", to: "/solutions/video-analytics" },
          { label: "Access Control", to: "/solutions/access-control" },
          { label: "Smart Retail", to: "/solutions/smart-retail" },
          { label: "Smart Bus", to: "/solutions/smart-bus" },
        ],
      },
      {
        name: "about",
        label: "About",
         to:"about",
        submenu: [
          { label: "Who We Are", to: "/who-we-are" },
          { label: "Our Journey", to: "/our-journey" },
          { label: "Our Managing Director", to: "/founder" },
          { label: "Our Board of Directors", to: "/board-of-directors" },
          { label: "Our Team", to: "/our-team" },
        ],
      },
      {
        name: "resources",
        label: "Resources",
        submenu: [
          { label: "News", to: "/new-and-media" },
          { label: "Events", to: "/events" },
          { label: "Case Studies", to: "/case-studies" },
        ],
      },
      { name: "contact", label: "Contact", to: "/contact" },
    ],
    []
  );

  const activeTop =
    menu.find((m) => m.to !== "/" && location.pathname.startsWith(m.to)) ??
    menu.find((m) => m.to === location.pathname) ??
    menu[0];

  const handleMouseEnter = (name) => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setOpenDropdown(name), 120);
  };
  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setOpenDropdown(null), 180);
  };

  return (
    <>
      {/* Scroll Progress */}
      <motion.div
        className="fixed left-0 top-0 z-[70] h-1 w-full origin-left"
        style={{
          background: BRAND,
          transform: `scaleX(${Math.max(0, Math.min(1, bgProgress))})`,
          opacity: bgProgress > 0.02 ? 1 : 0,
        }}
      />

      <nav className="fixed top-0 z-[60] h-18 w-full backdrop-blur-[6px]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, ${BRAND} 0%, #0a6ab8 100%)`,
              opacity: 1 - bgProgress,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(255,255,255,0.96)",
              opacity: bgProgress,
            }}
          />
        </div>

        <div className="mx-auto max-w-[120rem] px-6">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                src={onDark ? WHITE_LOGO : BLUE_LOGO}
                alt="Logo"
                className="h-10 w-auto"
              />
            </Link>

            {/* === DESKTOP NAVIGATION === */}
            <div
              className="hidden lg:flex items-center gap-2"
              onMouseLeave={handleMouseLeave}
            >
              {menu.map((m) => {
                const isActive = activeTop?.name === m.name;
                return (
                  <div
                    key={m.name}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(m.name)}
                  >
                    <Link
                      to={m.to || "#"}
                      className={`relative flex items-center gap-1 px-4 py-2 text-[0.95rem] font-medium ${
                        onDark
                          ? isActive
                            ? "text-white"
                            : "text-white/90 hover:text-white"
                          : isActive
                          ? "text-[#07518a]"
                          : "text-gray-700 hover:text-[#07518a]"
                      }`}
                    >
                      {m.label}
                      {(m.submenu || m.mega) && (
                        <ChevronDown
                          className={`h-3.5 w-3.5 ml-1 transition-transform ${
                            openDropdown === m.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Link>

                    {/* Menus */}
                    {m.mega && (
                      <MegaMenu
                        isOpen={openDropdown === m.name}
                        category={m.name}
                        onClose={() => setOpenDropdown(null)}
                      />
                    )}
                    {m.submenu && (
                      <SmallMenu
                        isOpen={openDropdown === m.name}
                        items={m.submenu}
                        category={m.name}
                        onClose={() => setOpenDropdown(null)}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* === RIGHT ICONS === */}
            <div className="flex items-center gap-3">
              <button
                className={`p-2 rounded-md ${
                  onDark
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-gray-700 hover:text-[#07518a] hover:bg-gray-100"
                }`}
              >
                <SearchIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className={`p-2 lg:hidden rounded-md ${
                  onDark
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-gray-700 hover:text-[#07518a] hover:bg-gray-100"
                }`}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* === MOBILE DRAWER === */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[55] bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.section
              className="fixed left-0 right-0 top-0 z-[60] lg:hidden"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            >
              <div className="mx-auto w-full max-w-screen-sm overflow-hidden rounded-b-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <span className="text-base font-semibold text-gray-900">
                    Menu
                  </span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md p-2 hover:bg-gray-100"
                  >
                    <X className="h-6 w-6 text-gray-700" />
                  </button>
                </div>

                <nav className="max-h-[85vh] overflow-y-auto px-2 py-3">
                  {menu.map((m, idx) => (
                    <motion.div
                      key={m.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="px-1"
                    >
                      <Link
                        to={m.to || "#"}
                        className="block rounded-md px-3 py-3 text-[0.98rem] font-medium text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        {m.label}
                      </Link>
                      {m.submenu && (
                        <div className="ml-2 mt-1 space-y-1 border-l-2 border-gray-100 pl-3">
                          {m.submenu.map((s) => (
                            <Link
                              key={s.to}
                              to={s.to}
                              className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setMobileOpen(false)}
                            >
                              {s.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
