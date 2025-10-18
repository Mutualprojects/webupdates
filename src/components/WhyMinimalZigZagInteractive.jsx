// src/components/WhyMinimalZigZagInteractive.jsx
import React, { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
} from "framer-motion";

/**
 * WhyItem shape (for reference)
 * title: string
 * highlight?: string
 * description: string
 * icon?: string
 * imageSrc: string
 */

/* ===== Image paths (Vite serves from /public) ===== */
const Nationwide = "/nationawide.png";
const Expertise = "/expertise (1).png";
const Trusted = "/end---end (1).png";
const nnovation = "/innovation-1 (1).png";

/* =============== Default content =============== */
const DEFAULT_ITEMS = [
  {
    title: "Nationwide Presence",
    description:
      "With proven success across industries and government verticals.",
    imageSrc: Nationwide,
  },
  {
    title: "End-to-End Expertise",
    description:
      "From design and deployment to maintenance and service support.",
    imageSrc: Expertise,
  },
  {
    title: "Trusted by Leaders",
    description:
      "PSUs and Corporates rely on us for mission-critical projects.",
    imageSrc: Trusted,
  },
  {
    title: "Innovation",
    // highlight: "Built for Tomorrow",
    description:
      "Designed to scale with your business and evolving technology.",
    imageSrc: nnovation,
  },
];

/* =============== Motion helpers =============== */
const appear = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

/** Column parallax: whole lane glides upward with scroll */
function useLaneParallax(ref, travel = -140) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 10%", "end 10%"],
  });
  return useTransform(scrollYProgress, [0, 1], [0, travel]);
}

/** Panel follow: as you scroll, the panel moves along Y then settles to 0 */
function usePanelFollow(ref, amplitude = 26) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 30%", "end 15%"],
  });

  const raw = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [amplitude, 0, -amplitude]
  );

  // Keep a lively but controlled spring
  useVelocity(raw);
  const y = useSpring(raw, {
    stiffness: 140,
    damping: 18,
    mass: 0.4,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.75, 1, 1]);

  return { y, opacity };
}

/** Tiny float on the image itself (adds life) */
function useImageFloat(ref) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 20%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  return y;
}

/* =============== Panel (image + text with accent line) =============== */
function Panel({ item, brandHex, priority = false }) {
  const panelRef = useRef(null);
  const imgWrapRef = useRef(null);

  const follow = usePanelFollow(panelRef, 28);
  const imageFloatY = useImageFloat(imgWrapRef);

  return (
    <motion.div
      ref={panelRef}
      style={{ y: follow.y, opacity: follow.opacity }}
      {...appear(0.05)}
      className="w-full"
    >
      {/* Image */}
      <motion.div
        ref={imgWrapRef}
        style={{ y: imageFloatY }}
        className="relative w-full aspect-[32/10]"
      >
        <img
          src={item.imageSrc}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-contain p-4 md:p-6 font-extrabold font-sans"
          loading={priority ? "eager" : "lazy"}
        />
      </motion.div>

      {/* Content with vertical accent */}
      <div className="mt-4 md:mt-5 flex items-start gap-4">
        {/* Vertical accent line */}
        <div
          className="self-stretch w-[2px] rounded-full"
          style={{ backgroundColor: brandHex }}
          aria-hidden
        />

        {/* Text block */}
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            {item.icon && (
              <span className="text-xl md:text-2xl" aria-hidden>
                {item.icon}
              </span>
            )}
            {/* <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: brandHex }}
              aria-hidden
            /> */}
          </div>

          {/* Title (BOLD) */}
          <h3
            className="text-slate-900 dark:text-slate-100 text-2xl md:text-3xl leading-tight tracking-tight font-extrabold font-sans"
            style={{ color: brandHex }}
          >
            {item.title}
          </h3>

          {/* Small highlight (uppercase, bold-ish) */}
          {item.highlight && (
            <p
              className="mt-1 text-[11px] md:text-xs font-semibold tracking-widest uppercase text-slate-700 dark:text-slate-300"
              style={{ color: brandHex }}
            >
              {item.highlight}
            </p>
          )}

          {/* Description (refined line-height & contrast) */}
          <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-700">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* =============== Lane (parallax column) =============== */
function Lane({ items, brandHex, travel, offsetTop = 0, align = "start" }) {
  const laneRef = useRef(null);
  const y = useLaneParallax(laneRef, travel);

  return (
    <motion.div
      ref={laneRef}
      style={{ y }}
      className={`flex flex-col gap-16 md:gap-24 ${
        align === "end" ? "items-end" : ""
      }`}
    >
      {offsetTop > 0 && <div style={{ height: offsetTop }} aria-hidden />}
      {items.map((it, i) => (
        <div key={`${it.title}-${i}`} className="w-full md:max-w-[560px]">
          <Panel item={it} brandHex={brandHex} priority={i < 2} />
        </div>
      ))}
    </motion.div>
  );
}

/* =============== MAIN (bold heading + perfected text styles) =============== */
export default function WhyMinimalZigZagInteractive({
  items,
  title = "Why Brihaspathi?",
  brandHex = "#07518a",
}) {
  const data = useMemo(
    () => (items && items.length ? items : DEFAULT_ITEMS),
    [items]
  );

  // split into two lanes: even -> left, odd -> right
  const left = [];
  const right = [];
  data.forEach((it, idx) => (idx % 2 === 0 ? left.push(it) : right.push(it)));

  return (
    <section
      className="relative mb-0"
      // Responsive paddings for perfect layout across breakpoints
      // (tight on mobile, generous on desktop)
      style={{
        paddingTop: 80,
      }}
    >
      {/* Section Title (EXTRABOLD) */}
      <motion.h2
        {...appear(0)}
        className="mx-auto max-w-4xl px-6 text-center text-3xl sm:text-4xl md:text-5xl  leading-[1.15] tracking-tight text-slate-900  font-extrabold font-sans"
        style={{
          // subtle brand gradient clip for flair while keeping strong legibility
          backgroundImage: `linear-gradient(90deg, ${brandHex}, ${brandHex}cc)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {title}
      </motion.h2>

      {/* Underline accent */}
      <div
        className="mx-auto mt-4 h-1 w-24 rounded-full"
        style={{ background: brandHex }}
      />

      <div className="mx-auto mt-10 md:mt-14 max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          {/* Left lane — starts slightly lower, gentler travel */}
          <Lane
            items={left}
            brandHex={brandHex}
            travel={-110}
            offsetTop={60}
            align="start"
          />

          {/* Right lane — starts higher, a touch more travel */}
          <Lane
            items={right}
            brandHex={brandHex}
            travel={-150}
            offsetTop={0}
            align="end"
          />
        </div>
      </div>
    </section>
  );
}
