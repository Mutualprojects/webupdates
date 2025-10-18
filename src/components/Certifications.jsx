import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

/**
 * Place files under: /public/Certifications/1.png ... /29.png
 * (Vite serves /public at the web root, so "/Certifications/1.png" works)
 */
const IMAGES = [
  "/Certifications/1.png",
  "/Certifications/2.png",
  "/Certifications/3.png",
  "/Certifications/4.png",
  "/Certifications/5.png",
  "/Certifications/6.png",
  "/Certifications/7.png",
  "/Certifications/8.png",
  "/Certifications/9.png",
  "/Certifications/10.png",
  "/Certifications/11.png",
  "/Certifications/12.png",
  "/Certifications/13.png",
  "/Certifications/14.png",
  "/Certifications/15.png",
  "/Certifications/16.png",
  "/Certifications/17.png",
  "/Certifications/18.png",
  "/Certifications/19.png",
  "/Certifications/20.png",
  "/Certifications/21.png",
  "/Certifications/22.png",
  "/Certifications/23.png",
  "/Certifications/24.png",
  "/Certifications/25.png",
  "/Certifications/26.png",
  "/Certifications/27.png",
  "/Certifications/28.png",
  "/Certifications/29.png",
];

/* -------------------- utils -------------------- */
function splitIntoRows(arr, rows) {
  const out = Array.from({ length: rows }, () => []);
  arr.forEach((v, i) => out[i % rows].push(v));
  return out;
}

function useElementWidth() {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const measure = () => setW(el.scrollWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width: w };
}

/* -------------------- Marquee Row (no fades/background) -------------------- */
function MarqueeRow({
  icons,
  direction = "left", // "left" | "right"
  pps = 70, // pixels per second
  sizePx = 72, // icon box size
  gapPx = 28, // gap
  title, // aria label
}) {
  const reduced = useReducedMotion();
  const repeated = useMemo(() => [...icons, ...icons], [icons]);
  const controls = useAnimationControls();
  const x = useMotionValue(0);
  const { ref: laneRef, width: laneWidth } = useElementWidth();
  const [paused, setPaused] = useState(false);

  React.useEffect(() => {
    if (reduced || !laneWidth) return;
    let cancelled = false;
    async function loop() {
      while (!cancelled && !paused) {
        await controls.start({
          x: direction === "left" ? -laneWidth : 0,
          transition: { duration: laneWidth / pps, ease: "linear" },
        });
        controls.set({ x: direction === "left" ? 0 : -laneWidth });
      }
    }
    loop();
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [controls, direction, laneWidth, paused, pps, reduced]);

  const onErr = (e) => {
    e.currentTarget.style.visibility = "hidden";
  };

  return (
    <div
      className="group relative w-full overflow-hidden select-none"
      aria-label={title}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        "--gap": `${gapPx}px`,
        "--icon": `${sizePx}px`,
      }}
    >
      <motion.div
        className="flex items-center will-change-transform"
        style={{ x }}
        animate={controls}
        drag={!reduced ? "x" : false}
        dragConstraints={{ left: -laneWidth, right: 0 }}
        dragElastic={0.0001}
        onDragStart={() => setPaused(true)}
        onDragEnd={() => setPaused(false)}
      >
        <div
          ref={laneRef}
          className="flex items-center pr-[var(--gap)] gap-[var(--gap)]"
        >
          {repeated.map((src, i) => (
            <div
              key={`a-${i}-${src}`}
              className="relative"
              style={{ width: "var(--icon)", height: "var(--icon)" }}
            >
              <img
                src={src}
                alt={`${title ?? "badge"} ${i + 1}`}
                decoding="async"
                onError={onErr}
                className="w-full h-full object-contain transition-transform duration-200 grayscale group-hover:grayscale-0"
                loading={i < 6 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        <div
          className="flex items-center pr-[var(--gap)] gap-[var(--gap)]"
          aria-hidden="true"
        >
          {repeated.map((src, i) => (
            <div
              key={`b-${i}-${src}`}
              className="relative"
              style={{ width: "var(--icon)", height: "var(--icon)" }}
            >
              <img
                src={src}
                alt=""
                decoding="async"
                onError={onErr}
                className="w-full h-full object-contain transition-transform duration-200 grayscale group-hover:grayscale-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------- Main Component -------------------- */
/**
 * Props (all optional):
 * - cellHeight (number)       default 100
 * - gap (number)              default 40
 * - rounded (string)          default "rounded-md"
 * - className (string)
 * - duration (number)         default 0.55
 * - delayStep (number)        default 0.045
 * - initialScale (number)     default 0.82
 * - revealScale (number)      default 1.0
 * - marquee (bool)            default false
 * - rows (number)             default 3
 * - pps (number)              default 70
 * - sizePx (number)           default 72
 * - gapPx (number)            default 28
 */
export default function Certifications({
  /* grid */
  cellHeight = 100,
  gap = 40,
  rounded = "rounded-md",
  className,
  duration = 0.55,
  delayStep = 0.045,
  initialScale = 0.82,
  revealScale = 1.0,
  /* marquee */
  marquee = false,
  rows = 3,
  pps = 70,
  sizePx = 72,
  gapPx = 28,
}) {
  const prefersReducedMotion = useReducedMotion();

  // MARQUEE MODE
  if (marquee && !prefersReducedMotion) {
    const lanes = splitIntoRows(IMAGES, rows);
    return (
      <section className={className} aria-label="Certifications (marquee)">
        <div className="space-y-6">
          {lanes.map((icons, i) => (
            <MarqueeRow
              key={`lane-${i}`}
              icons={icons}
              direction={i % 2 === 0 ? "left" : "right"}
              pps={pps}
              sizePx={sizePx}
              gapPx={gapPx}
              title={`Certifications row ${i + 1}`}
            />
          ))}
        </div>
      </section>
    );
  }

  // GRID MODE (5 per row by default via Tailwind grid-cols-5)
  return (
    <motion.div
      role="list"
      aria-label="Certification badges"
      className={[
        "w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        className || "",
      ].join(" ")}
      style={{ gap }}
      initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
    >
      {IMAGES.map((src, i) => {
        const isFirstRow = i < 5;
        const itemDelay = prefersReducedMotion ? 0 : i * delayStep;
        return (
          <motion.div
            key={src}
            role="listitem"
            className="flex items-center justify-center"
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: initialScale, y: 12 }
            }
            whileInView={
              prefersReducedMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 1, scale: revealScale, y: 0 }
            }
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: itemDelay,
              duration,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              prefersReducedMotion
                ? undefined
                : { scale: 1.03, y: -2, transition: { duration: 0.2 } }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
          >
            <div
              className={`relative w-full ${rounded}`}
              style={{ height: cellHeight }}
            >
              <img
                src={src}
                alt={`Certification ${i + 1}`}
                decoding="async"
                className="w-full h-full object-contain grayscale hover:grayscale-0 transition duration-150"
                loading={isFirstRow ? "eager" : "lazy"}
                onError={(e) => (e.currentTarget.style.visibility = "hidden")}
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
