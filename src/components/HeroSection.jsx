import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* =============================
   Brand / Assets
============================= */
const BRAND = "#07518a";
const BRAND_TINT = "#0a6ab8";
const BANNER = "/background.jpg"; // put in /public
const MAIN_IMAGE = "/Mani.jpg"; // put in /public

const withAlpha = (hex, a) => {
  let h = hex.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const r = parseInt(h.slice(0, 2), 16),
    g = parseInt(h.slice(2, 4), 16),
    b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/* =============================
   Buttons
============================= */
const PrimaryButton = ({ onClick, children }) => (
  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
    style={{ backgroundColor: BRAND, color: "#fff" }}
  >
    {children}
  </motion.button>
);

const OutlineButton = ({ onClick, children }) => (
  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2"
    style={{
      border: `2px solid ${BRAND}`,
      color: BRAND,
      background: "transparent",
    }}
  >
    {children}
  </motion.button>
);

/* =============================
   CountUp (play when visible)
============================= */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/** useInView: tiny IntersectionObserver hook */
function useInView(options = { threshold: 0.25 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options.threshold, options.rootMargin]);
  return [ref, inView];
}

/** CountUp: animates from -> to when play=true; resets when play toggles */
function CountUp({
  from = 0,
  to = 100,
  duration = 1400,
  suffix = "",
  className = "",
  style,
  play = true,
}) {
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!play) {
      setVal(from);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(from + (to - from) * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration, play]);

  const display = Number.isInteger(to)
    ? Math.round(val).toLocaleString()
    : val.toFixed(1);
  return (
    <span className={className} style={style}>
      {display}
      {suffix}
    </span>
  );
}

/* =============================
   Directional slide helper
============================= */
const slide = (dir = "left", dist = 32) => ({
  hidden: { opacity: 0, x: dir === "left" ? -dist : dist },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
});

/* =============================
   Hero
============================= */
export default function HeroSection() {
  // 3D tilt on the right visual
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const visualRef = useRef(null);

  const onPointerMove = (e) => {
    const el = visualRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const max = 10;
    tiltY.set((px - 0.5) * max);
    tiltX.set(-(py - 0.5) * max);
  };
  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Stats visibility to trigger CountUp (replays each time it becomes visible)
  const [statsRef, statsInView] = useInView({ threshold: 0.35 });

  return (
    <section
      id="home"
      className="relative flex items-center overflow-hidden pt-12"
      style={{
        minHeight: "95vh", // <-- as requested
        paddingBottom: "6rem",
        backgroundImage: `url(${BANNER})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      aria-label="Hero"
    >
      {/* Decorative layers */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${BRAND_TINT}20, ${BRAND}20)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(2,6,23,.06) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full font-bold">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 py-6">
            {/* LEFT: slide from left on view */}
            <div className="order-2 lg:order-1 text-left">
              <motion.div
                variants={slide("left")}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.3, once: false }}
                className="inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-bold backdrop-blur-sm border "
                style={{
                  color: BRAND,
                  backgroundColor: withAlpha(BRAND, 0.08),
                  borderColor: withAlpha(BRAND, 0.22),
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full mr-2 font-bold"
                  style={{ backgroundColor: BRAND }}
                />
                India’s Most Trusted System Integrator
              </motion.div>

              <motion.h1
                variants={slide("left")}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.3, once: false }}
                className="mt-3 font-bold leading-tight text-slate-900 tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 2.25vw + 0.75rem, 2.25rem)" }}
              >
                <span className="block font-bold text-3xl ">
                  Where Technology Meets Innovation.
                </span>
                <span
                  className="block font-bold text-3xl"
                  style={{ color: BRAND }}
                >
                  Trusted surveillance, ELV, and smart technology partner for
                  forward-thinking Business.
                </span>
              </motion.h1>

              <motion.p
                variants={slide("left")}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.3, once: false }}
                className="mt-3 text-slate-700 "
                style={{ maxWidth: 720, lineHeight: 1.6 }}
              >
                From AI-powered surveillance to sustainable solar solutions,{" "}
                <span style={{ color: BRAND, fontWeight: 800 }}>
                  we’re not just building technology — we’re crafting the
                </span>{" "}
                intelligent infrastructure that powers tomorrow’s world with
                cutting-edge IoT, automation, and enterprise solutions.
              </motion.p>

              <motion.div
                variants={slide("left")}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.3, once: false }}
                className="mt-5 flex flex-col sm:flex-row gap-3 justify-start"
              >
                <PrimaryButton onClick={() => console.log("Explore Solution")}>
                  Explore Solution <ArrowRight className="ml-2 h-5 w-5" />
                </PrimaryButton>
                <OutlineButton
                  onClick={() => console.log("Schedule Consultation")}
                >
                  Schedule Consultation
                </OutlineButton>
              </motion.div>

              {/* Stats — alternate left/right; CountUp triggers on view */}
              <div
                ref={statsRef}
                className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-3xl"
              >
                {[
                  { from: 200, to: 300, label: "Workforce", suffix: "+" },
                  {
                    from: 8000,
                    to: 12000,
                    label: "Global Clients",
                    suffix: "+",
                  },
                  { from: 70, to: 99, label: "Success Rate", suffix: "%" },
                  { from: 1, to: 18, label: "Years Experience", suffix: "+" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    variants={slide(i % 2 ? "right" : "left", 20)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.3, once: false }}
                    className="text-left"
                  >
                    <CountUp
                      from={s.from}
                      to={s.to}
                      duration={1400}
                      suffix={s.suffix}
                      play={statsInView} // <-- start / replay on view
                      className="block text-xl sm:text-2xl font-extrabold tracking-tight"
                      style={{ color: BRAND }}
                    />
                    <div
                      className="mt-1 font-bold text-[0.85rem]"
                      style={{ color: BRAND }}
                    >
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT: slide from right; buttery tilt */}
            <div className="order-1 lg:order-2">
              <motion.div
                variants={slide("right")}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.3, once: false }}
                ref={visualRef}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                style={{
                  transformStyle: "preserve-3d",
                  rotateX: tiltX,
                  rotateY: tiltY,
                }}
                className="relative mx-auto w-full max-w-[min(560px,92%)] h-[240px] sm:h-[340px] md:h-[420px] lg:h-[420px]"
              >
                {/* glow backdrop */}
                <motion.div
                  className="absolute inset-0 rounded-[2rem]"
                  style={{
                    transform: "translateZ(-36px)",
                    background: `linear-gradient(135deg,
                      ${withAlpha(BRAND, 0.16)} 0%,
                      ${withAlpha(BRAND, 0.1)} 45%,
                      ${withAlpha(BRAND, 0.16)} 100%)`,
                    boxShadow: `0 40px 120px ${withAlpha(BRAND, 0.25)}`,
                  }}
                  animate={{ opacity: [0.35, 0.6, 0.35] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* frame */}
                <div
                  className="absolute inset-0 rounded-[2rem] bg-white/40 backdrop-blur-[2px] shadow-[0_0_60px_-12px_rgba(2,6,23,0.12)]"
                  style={{ border: `1px solid ${withAlpha(BRAND, 0.28)}` }}
                />
                {/* image panel */}
                <div
                  className="absolute inset-3.5 rounded-[1.5rem] overflow-hidden bg-white ring-1"
                  style={{
                    boxShadow: `0 12px 28px ${withAlpha(BRAND, 0.14)}`,
                    borderColor: withAlpha(BRAND, 0.2),
                  }}
                >
                  <img
                    src={MAIN_IMAGE}
                    alt="Innovation Visual"
                    className="object-cover w-full h-full"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, ${withAlpha(
                        "#ffffff",
                        0.3
                      )} 100%)`,
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
