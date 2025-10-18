// src/components/Testimonials.jsx
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

/* ====================== Default Testimonials ====================== */
const DEFAULT_TESTIMONIALS = [
  {
    name: "Registrar",
    designation: "Telangana High Court",
    quote:
      "We are impressed with the professionalism and expertise demonstrated by Brihaspathi Technologies Limited during the installation process. The team ensured efficiency and minimal disruption to our live streaming operations.",
  },
  {
    name: "Management",
    designation: "DCCB Bank (Telangana & AP)",
    quote:
      "Brihaspathi Technologies Limited offered complete transparency during our statewide CCTV project. Their detailed product insights helped us make confident, informed choices. Our ATMs are safer than ever before.",
  },
  {
    name: "Managing Director",
    designation: "IDA Bollaram",
    quote:
      "The CCTV solution delivered by Brihaspathi Technologies Limited exceeded expectations — reliable, high-performing, and excellent value for money. Their service quality stands unmatched.",
  },
  {
    name: "Director",
    designation: "AMD",
    quote:
      "We appreciate the thorough training provided by Brihaspathi Technologies Limited. Their technicians ensured our staff were fully confident in operating the system. A truly professional experience.",
  },
];

/* ===================== Component ===================== */
export default function Testimonials({
  items,
  brandColor = "#07518a",
  intervalMs = 5000,
  className,
  title = "Testimonials",
  subtitle = "What our clients say about us",
}) {
  const data = useMemo(
    () => (Array.isArray(items) && items.length > 0 ? items : DEFAULT_TESTIMONIALS),
    [items]
  );
  const total = data.length;
  const [active, setActive] = useState(0);

  /* === Clamp Index on Data Change === */
  useEffect(() => {
    if (active >= total) setActive(0);
  }, [total, active]);

  /* === In-View & Tab Visibility Tracking === */
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  /* === Progress Animation === */
  const progress = useMotionValue(0);
  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);
  const rafRef = useRef(null);
  const lastTs = useRef(null);

  const resetProgress = useCallback(() => {
    lastTs.current = null;
    progress.set(0);
  }, [progress]);

  const step = useCallback(
    (ts) => {
      if (total === 0) return;
      if (lastTs.current == null) lastTs.current = ts;
      const dt = ts - lastTs.current;
      lastTs.current = ts;
      const inc = dt / intervalMs;
      const next = Math.min(1, progress.get() + inc);
      progress.set(next);
      if (next >= 1) {
        setActive((a) => (a + 1) % total);
        resetProgress();
      } else {
        rafRef.current = requestAnimationFrame(step);
      }
    },
    [intervalMs, progress, resetProgress, total]
  );

  useEffect(() => {
    const shouldPlay = inView && tabVisible && total > 0;
    if (shouldPlay) rafRef.current = requestAnimationFrame(step);
    else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTs.current = null;
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTs.current = null;
    };
  }, [inView, tabVisible, step, total]);

  /* === Controls === */
  const handleNext = useCallback(() => {
    if (total === 0) return;
    setActive((prev) => (prev + 1) % total);
    resetProgress();
  }, [total, resetProgress]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setActive((prev) => (prev - 1 + total) % total);
    resetProgress();
  }, [total, resetProgress]);

  /* === Keyboard Navigation === */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev]);

  /* === Swipe Support === */
  const touchStartX = useRef(null);
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? handleNext() : handlePrev();
    touchStartX.current = null;
  };

  const current = total > 0 ? data[active] : null;

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-gradient-to-b from-white via-slate-50 to-[#f5f7fb] font-sans ${className || ""}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Testimonials"
    >
      {/* ===== Heading ===== */}
      <div className="mx-auto max-w-4xl px-6 pt-16 text-center sm:pt-20">
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#07518a]"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-gray-600 font-medium"
          >
            {subtitle}
          </motion.p>
        )}
        <div
          className="mx-auto mt-4 h-1.5 w-28 rounded-full"
          style={{ background: brandColor }}
        />
      </div>

      {/* ===== Carousel ===== */}
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-10 text-center">
        {current ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white uppercase tracking-wide"
                style={{ background: brandColor }}
              >
                <Quote className="h-4 w-4" />
                Featured Testimonial
              </div>

              <h3 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
                {current.name}
              </h3>
              <p className="mt-0.5 text-sm sm:text-base text-gray-600 font-medium">
                {current.designation}
              </p>

              <motion.blockquote className="relative mt-6 w-full rounded-2xl bg-white p-6 sm:p-8 text-gray-800 shadow-md ring-1 ring-gray-200 hover:shadow-lg transition-all duration-500">
                <span
                  className="absolute -left-3 -top-3 inline-flex h-9 w-9 items-center justify-center rounded-xl text-white"
                  style={{ background: brandColor }}
                >
                  <Quote className="h-4 w-4" />
                </span>
                <p className="text-base sm:text-lg leading-relaxed font-semibold italic">
                  “{current.quote}”
                </p>
              </motion.blockquote>

              {/* Progress Bar */}
              <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <motion.div
                  className="h-full"
                  style={{ width: barWidth, background: brandColor }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
            No testimonials available.
          </div>
        )}

        {/* Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            disabled={total === 0}
            className="group flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 transition-all hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
            style={{ color: brandColor }}
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            disabled={total === 0}
            className="group flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 transition-all hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
            style={{ color: brandColor }}
          >
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Pagination Dots */}
          <nav aria-label="Testimonials pagination" className="flex items-center gap-2 sm:gap-3 ml-1">
            {Array.from({ length: total }).map((_, i) => {
              const activeDot = i === active;
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (total === 0) return;
                    setActive(i);
                    resetProgress();
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    activeDot ? "w-6" : "w-2.5 opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    background: activeDot ? brandColor : `${brandColor}66`,
                  }}
                />
              );
            })}
          </nav>
        </div>
      </div>

      {/* === Subtle Animated Grid Background === */}
      <style>{`
        @keyframes grid-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .grid-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(226,232,240,0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226,232,240,0.5) 1px, transparent 1px);
          background-size: 3rem 3rem;
          animation: grid-move 45s linear infinite alternate;
          opacity: 0.35;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
