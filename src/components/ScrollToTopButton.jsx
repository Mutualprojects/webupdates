// src/components/ScrollToTopButton.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const BRAND = "#07518a";

export default function ScrollToTopButton({
  side = "left", // "left" | "right"
  offsetY = "120px", // vertical offset
  offsetX = "240px", // horizontal offset
  showAt = 130, // px scrolled before showing
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const location = useLocation();

  // Show/hide + percent
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const percent = Math.min(
        100,
        Math.max(0, Math.round((scrollTop / docHeight) * 100))
      );
      setScrollPercent(percent);
      setIsVisible(scrollTop > showAt);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAt]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Dynamic positioning (left or right)
  const positionClass =
    side === "left" ? `left-[${offsetX}]` : `right-[${offsetX}]`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          aria-label="Scroll to top"
          className={`fixed z-[60] ${positionClass}`}
          style={{
            bottom: offsetY,
            // For Safari/iOS safe area:
            paddingBottom: "max(0px, env(safe-area-inset-bottom))",
          }}
        >
          <div
            className="relative w-12 h-12 rounded-full shadow-xl flex items-center justify-center"
            style={{ background: BRAND }}
          >
            {/* Progress ring */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeDasharray="100"
                strokeDashoffset={100 - scrollPercent}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
            </svg>

            {/* Up arrow */}
            <ArrowUp size={20} className="text-white relative z-10" />
          </div>

          {/* % badge (small, optional) */}
          <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 text-xs font-medium text-slate-600">
            {scrollPercent}%
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
