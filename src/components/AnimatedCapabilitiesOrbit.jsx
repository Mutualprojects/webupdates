import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useAnimationControls,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Camera,
  RadioTower,
  Home,
  Lightbulb,
  Network,
  Brain,
} from "lucide-react";

/* ===== Brand & virtual canvas ===== */
const BRAND = "#07518a";

/** Virtual design size used for positioning (kept proportional) */
const VW = 1200;
const VH = 600;
const CX = VW / 2;
const CY = VH / 2;

/* ===== Node placement (mirrors your image) ===== */
const NODES = [
  {
    id: "esec",
    label: "E-Security",
    x: 430,
    y: 120,
    align: "left",
    Icon: Camera,
  },
  {
    id: "it",
    label: "IT/Telecom",
    x: 980,
    y: 90,
    align: "right",
    Icon: RadioTower,
  },
  {
    id: "home",
    label: "Home Automation",
    x: 1060,
    y: 310,
    align: "right",
    Icon: Home,
  },
  { id: "elv", label: "ELV", x: 900, y: 480, align: "right", Icon: Lightbulb },
  {
    id: "iot",
    label: "Internet of Things",
    x: 360,
    y: 520,
    align: "left",
    Icon: Network,
  },
  {
    id: "ai",
    label: "AI-driven Software",
    x: 210,
    y: 360,
    align: "left",
    Icon: Brain,
  },
];

/* ===== Helpers ===== */
function curvePathTo(x, y) {
  const vx = x - CX,
    vy = y - CY;
  const mx = CX + vx * 0.5,
    my = CY + vy * 0.5;
  const len = Math.hypot(vx, vy) || 1;
  const px = (-vy / len) * (len * 0.18);
  const py = (vx / len) * (len * 0.18);
  const cpx = mx + px,
    cpy = my + py;
  return `M ${CX},${CY} Q ${cpx},${cpy} ${x},${y}`;
}

function polarToCartesian(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function describeArc(cx, cy, r, start, end) {
  const s = polarToCartesian(cx, cy, r, end);
  const e = polarToCartesian(cx, cy, r, start);
  const largeArc = end - start <= 180 ? "0" : "1";
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 0 ${e.x} ${e.y}`;
}

/* ===== Framer variants ===== */
const root = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { when: "beforeChildren" } },
};
const centerOrb = {
  hidden: { scale: 0.6, opacity: 0, rotate: -8 },
  show: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
};
const nodeVariant = {
  hidden: { opacity: 0, scale: 0.86, y: 10 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.28 + i * 0.08,
    },
  }),
};
const pathVariant = (i, duration = 1.3) => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration, ease: [0.42, 0, 0.2, 1], delay: 0.12 + i * 0.06 },
      opacity: { duration: 0.3, delay: 0.12 + i * 0.06 },
    },
  },
});

export default function AnimatedCapabilitiesOrbit() {
  const [hoveredId, setHoveredId] = useState(null);

  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.35 });
  const controls = useAnimationControls();
  const reduce = useReducedMotion();

  // gentle parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useTransform(my, [-0.5, 0.5], [6, -6]);
  const tiltY = useTransform(mx, [-0.5, 0.5], [-6, 6]);
  const nudgeX = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const nudgeY = useTransform(my, [-0.5, 0.5], [-6, 6]);

  useEffect(() => {
    if (inView) controls.start("show");
  }, [inView, controls]);

  const paths = useMemo(() => NODES.map((n) => curvePathTo(n.x, n.y)), []);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="text-center mb-8 md:mb-10">
          <h2
            className="text-2xl md:text-3xl font-extrabold tracking-tight"
            style={{ color: BRAND }}
          >
            Our Capabilities
          </h2>
          <p className="mt-2 text-slate-600 text-sm md:text-base">
            Security, automation, software, and connectivity—integrated
            end-to-end.
          </p>
        </div>

        <motion.div
          ref={wrapRef}
          variants={root}
          initial="hidden"
          animate={controls}
          className="relative w-full overflow-hidden rounded-2xl bg-white shadow-sm"
          style={{
            rotateX: reduce ? 0 : tiltX,
            rotateY: reduce ? 0 : tiltY,
            transformStyle: "preserve-3d",
            perspective: 900,
          }}
          onMouseMove={onMove}
          onMouseLeave={() => {
            mx.set(0);
            my.set(0);
            setHoveredId(null);
          }}
        >
          {/* Keep a fixed aspect to match the reference art on all screens */}
          <div
            className="relative w-full"
            style={{ paddingTop: `${(VH / VW) * 100}%` }}
          >
            {/* SVG layer */}
            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              className="absolute inset-0 w-full h-full"
            >
              {paths.map((d, i) => {
                const id = NODES[i].id;
                const isHover = hoveredId === id;
                return (
                  <motion.path
                    key={`p-${id}`}
                    d={d}
                    stroke={BRAND}
                    strokeWidth={isHover ? 5 : 3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="10 12"
                    fill="none"
                    variants={pathVariant(i)}
                    style={{
                      filter: "url(#shadow)",
                      pointerEvents: "stroke",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setHoveredId(id)}
                    onMouseLeave={() =>
                      setHoveredId((cur) => (cur === id ? null : cur))
                    }
                    animate={{ opacity: isHover ? 1 : 0.9 }}
                    transition={{ opacity: { duration: 0.2 } }}
                  />
                );
              })}

              {/* Center orb */}
              <motion.g variants={centerOrb}>
                <circle
                  cx={CX}
                  cy={CY}
                  r={116}
                  stroke={BRAND}
                  strokeOpacity="0.08"
                  strokeWidth={28}
                  fill="none"
                />
                <circle cx={CX} cy={CY} r={92} fill={BRAND} />
                <path
                  d={describeArc(CX, CY, 84, 210, 360)}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={18}
                  strokeLinecap="round"
                />
                <text
                  x={CX}
                  y={CY + 10}
                  textAnchor="middle"
                  fontSize="72"
                  fontWeight="700"
                  fill="#fff"
                  style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
                >
                  β
                </text>
              </motion.g>

              <defs>
                <filter
                  id="shadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="2"
                    floodColor={BRAND}
                    floodOpacity="0.12"
                  />
                </filter>
              </defs>
            </svg>

            {/* HTML nodes (crisp icons + labels) */}
            {NODES.map((n, i) => {
              const left = (n.x / VW) * 100;
              const top = (n.y / VH) * 100;
              const isHover = hoveredId === n.id;

              return (
                <motion.div
                  key={n.id}
                  custom={i}
                  variants={nodeVariant}
                  className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    x: reduce ? 0 : nudgeX,
                    y: reduce ? 0 : nudgeY,
                  }}
                  onMouseEnter={() => setHoveredId(n.id)}
                  onMouseLeave={() =>
                    setHoveredId((cur) => (cur === n.id ? null : cur))
                  }
                >
                  <motion.div
                    className="flex items-center justify-center rounded-full shadow-sm"
                    style={{
                      backgroundColor: BRAND,
                      width: "4rem", // 64px
                      height: "4rem",
                      cursor: "pointer",
                    }}
                    animate={{
                      scale: isHover ? 1.18 : 1,
                      boxShadow: isHover
                        ? "0 18px 40px -10px rgba(7,81,138,0.35)"
                        : "0 10px 25px -5px rgba(0,0,0,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <n.Icon size={28} color="#fff" />
                  </motion.div>

                  <motion.div
                    className={`mt-2 text-[13px] sm:text-sm md:text-base font-medium ${
                      n.align === "right" ? "text-right" : "text-left"
                    }`}
                    style={{ color: BRAND, pointerEvents: "none" }}
                    animate={{ scale: isHover ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  >
                    {n.label}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
