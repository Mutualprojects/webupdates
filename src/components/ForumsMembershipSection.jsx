import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/* =========================================
   Brand + Demo Data
========================================= */
const BRAND = "#07518a";

const FORUMS = [
  { name: "Hyderabad Angels", role: "Member", image: "/1.png" },
  { name: "TiE Hyderabad", role: "Charter Member", image: "/2.png" },
  {
    name: "Hyderabad Management Association (HMA)",
    role: "Member",
    image: "/3.png",
  },
  // Add more if needed...
];

/* =========================================
   Helpers
========================================= */
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/** Detect viewport size to determine cards per row */
function useRowSize() {
  const [size, setSize] = React.useState(4);
  React.useEffect(() => {
    const mmSm = window.matchMedia("(max-width: 640px)");
    const mmMd = window.matchMedia(
      "(min-width: 641px) and (max-width: 1024px)"
    );

    const apply = () => {
      if (mmSm.matches) setSize(2);
      else if (mmMd.matches) setSize(3);
      else setSize(4);
    };
    apply();
    mmSm.addEventListener("change", apply);
    mmMd.addEventListener("change", apply);
    return () => {
      mmSm.removeEventListener("change", apply);
      mmMd.removeEventListener("change", apply);
    };
  }, []);
  return size;
}

/* =========================================
   Small Card Component
========================================= */
function SmallForumCard({ forum, priority = false }) {
  return (
    <article
      className="group flex items-center gap-3 rounded-xl bg-white/80 p-3 shadow-sm backdrop-blur-sm transition
                 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
      aria-label={`${forum.name} membership card`}
    >
      <div className="relative shrink-0 overflow-hidden rounded-lg">
        <img
          src={forum.image}
          alt={forum.name}
          loading={priority ? "eager" : "lazy"}
          className="h-[68px] w-[68px] object-contain transition group-hover:scale-[1.03]"
        />
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-gray-900">
          {forum.name}
        </h3>
        {forum.role && (
          <p className="mt-0.5 text-xs text-gray-600">{forum.role}</p>
        )}
      </div>
    </article>
  );
}

/* =========================================
   Glide Row (moves horizontally on scroll)
========================================= */
function GlideRow({ items, dir, scrollYProgress, rowIndex }) {
  const reduce = useReducedMotion();
  const amplitude = 90 - Math.min(60, rowIndex * 10);
  const start = dir === 1 ? -amplitude : amplitude;
  const end = dir === 1 ? amplitude : -amplitude;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [start, end]
  );

  return (
    <motion.div style={{ x }} className="w-full overflow-visible">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((f, i) => (
          <SmallForumCard
            key={`${f.name}-${i}`}
            forum={f}
            priority={rowIndex === 0 && i < 3}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* =========================================
   Main Section
========================================= */
export default function ForumsMembershipSection() {
  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 15%"],
  });

  const rowSize = useRowSize();
  const rows = React.useMemo(() => chunk(FORUMS, rowSize), [rowSize]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate py-8 sm:py-10"
      aria-label="Forums & memberships"
    >
      {/* Background gradient (subtle brand hue) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(1000px 500px at 10% -10%, ${BRAND}22, transparent 60%),
                       radial-gradient(1000px 500px at 90% -10%, ${BRAND}18, transparent 60%)`,
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-4">
          <h2
            className="font-extrabold tracking-tight"
            style={{ color: BRAND, fontSize: "clamp(18px, 2.5vw, 28px)" }}
          >
            A Member of the Following Forums
          </h2>
        </header>

        <div className="flex flex-col gap-5">
          {rows.map((row, idx) => (
            <GlideRow
              key={`row-${idx}`}
              items={row}
              dir={idx % 2 === 0 ? 1 : -1}
              scrollYProgress={scrollYProgress}
              rowIndex={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
