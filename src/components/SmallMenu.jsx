// src/components/Header/SmallMenu.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  KeySquare,
  ScanFace,
  Store,
  BusFront,
  ChevronRight,
} from "lucide-react";

const BRAND = "#07518a";
const BRAND_TINT = "#0a6ab8";

export default function SmallMenu({ isOpen, onClose }) {
  const solutions = [
    {
      label: "AI Video Analytics",
      slug: "video-analytics",
      icon: <ScanFace size={18} />,
      desc: "Detect, track & analyze real-time behavior in CCTV feeds.",
    },
    {
      label: "Access Control & Attendance",
      slug: "access-control",
      icon: <KeySquare size={18} />,
      desc: "Smart attendance & entry solutions with face recognition.",
    },
    {
      label: "Smart Retail Analytics",
      slug: "smart-retail",
      icon: <Store size={18} />,
      desc: "Analyze customer movement, dwell time, and engagement.",
    },
    {
      label: "Smart Bus Solution",
      slug: "smart-bus",
      icon: <BusFront size={18} />,
      desc: "Onboard surveillance and analytics for passenger safety.",
    },
  ];

  const panelVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.25, 0.8, 0.25, 1],
        when: "beforeChildren",
        staggerChildren: 0.06,
      },
    },
    exit: {
      opacity: 0,
      y: 8,
      scale: 0.98,
      transition: { duration: 0.25, ease: [0.25, 0.8, 0.25, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: [0.25, 0.8, 0.25, 1] },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseLeave={onClose}
          className="absolute left-1/2 top-full z-[65] mt-3 w-80 -translate-x-1/2 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden backdrop-blur-sm"
          style={{
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-3 border-b border-gray-100">
            <h4
              className="text-sm font-semibold tracking-wide text-[#07518a]"
              style={{
                background: `linear-gradient(90deg, ${BRAND_TINT}, ${BRAND})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Solutions & Offerings
            </h4>
          </div>

          {/* List Items */}
          <div className="py-3">
            {solutions.map((s, i) => (
              <motion.div
                key={s.slug}
                variants={itemVariants}
                className="group relative"
              >
                <Link
                  to={`/solutions/${s.slug}`}
                  onClick={onClose}
                  className="flex items-start gap-3 px-5 py-3 transition-all duration-300 hover:bg-[#07518a]/5"
                >
                  <div className="mt-[2px] text-[#07518a] group-hover:scale-110 transition-transform duration-300">
                    {s.icon || <Shield size={18} />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 group-hover:text-[#07518a] transition-colors text-[0.95rem]">
                      {s.label}
                    </p>
                    <p className="text-xs text-gray-500 leading-snug mt-0.5 group-hover:text-gray-600 transition-colors">
                      {s.desc}
                    </p>
                  </div>
                  <ChevronRight
                    className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                  />
                </Link>

                {i !== solutions.length - 1 && (
                  <div className="absolute bottom-0 left-5 right-5 border-b border-gray-100" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between"
          >
            <p className="text-xs text-gray-500">
              Discover how AI can transform your operations.
            </p>
            <Link
              to="/solutions"
              onClick={onClose}
              className="text-sm font-semibold text-[#07518a] hover:text-[#0a6ab8] transition-colors"
            >
              Explore All
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
