import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* === BRAND CONFIG === */
const BRAND_BASE = "#07518a";
const BRAND_TINT = "#0a6ab8";
const LOGO_WHITE = "/highbtlogo white- tm.png"; // Your logo for preloader

/* === Slides === */
const SLIDES = [
  { type: "text", content: "Empowering the Future of Technology" },
  { type: "text", content: "Connecting Innovation with Intelligence" },
  { type: "image", src: LOGO_WHITE, alt: "Brihaspathi Logo" },
];

export default function PreloaderCorporateFullBar({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [whitePhase, setWhitePhase] = useState(false);
  const [done, setDone] = useState(false);

  /* === Progress simulation === */
  useEffect(() => {
    let frame = 0;
    const duration = 6000;
    const step = 20;
    const total = duration / step;
    const timer = setInterval(() => {
      frame++;
      setProgress(Math.min(100, (frame / total) * 100));
      if (frame >= total) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, []);

  /* === Slide sequence === */
  useEffect(() => {
    if (index < SLIDES.length - 1) {
      const delay = index === 0 ? 1600 : 1800;
      const next = setTimeout(() => setIndex(index + 1), delay);
      return () => clearTimeout(next);
    } else {
      const fadeTimer = setTimeout(() => setWhitePhase(true), 1800);
      const completeTimer = setTimeout(() => {
        setDone(true);
        setTimeout(() => onComplete?.(), 1000);
      }, 3200);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [index, onComplete]);

  const current = SLIDES[index];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden select-none"
          style={{
            backgroundColor: whitePhase ? "#ffffff" : BRAND_BASE,
            transition: "background-color 1.2s ease-in-out",
          }}
        >
          {/* === Background glow === */}
          {!whitePhase && (
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  `radial-gradient(circle at 30% 40%, ${BRAND_TINT}44, transparent 70%)`,
                  `radial-gradient(circle at 70% 60%, ${BRAND_BASE}44, transparent 70%)`,
                  `radial-gradient(circle at 30% 40%, ${BRAND_TINT}44, transparent 70%)`,
                ],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* === Center slides === */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.98 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="z-20 flex flex-col items-center justify-center text-center px-6"
            >
              {current.type === "text" ? (
                <motion.h1
                  className={`font-semibold leading-tight tracking-tight text-[clamp(1.4rem,5vw,2.6rem)] ${
                    whitePhase ? "text-[#07518a]" : "text-white"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {current.content}
                </motion.h1>
              ) : (
                <motion.img
                  src={current.src}
                  alt={current.alt}
                  className="w-[180px] sm:w-[240px] md:w-[260px] object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: [1, 1.05, 1],
                    y: whitePhase ? -60 : 0,
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: whitePhase ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* === Full-width progress bar === */}
          <motion.div
            className="absolute bottom-0 left-0 h-1.5 w-full bg-white/25 overflow-hidden z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="h-full bg-white/90 rounded-tr-full rounded-br-full"
              style={{
                width: `${progress}%`,
                backgroundColor: whitePhase ? BRAND_BASE : "#ffffff",
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          {/* === Percentage indicator (above bar) === */}
          <motion.span
            key={Math.floor(progress)}
            className={`absolute bottom-5 right-6 text-sm md:text-base font-medium tracking-wide ${
              whitePhase ? "text-[#07518a]" : "text-white/80"
            }`}
          >
            {Math.floor(progress)}%
          </motion.span>

          {/* === White fade overlay === */}
          {whitePhase && (
            <motion.div
              className="absolute inset-0 bg-white pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
