import React, { useRef } from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/* =========================
   Brand / Helpers
========================= */
const BRAND = "#07518a";

// Fallback avatar if photo missing
const initialsAvatar = (name) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    name
  )}&backgroundType=gradientLinear&fontFamily=Arial&fontWeight=700`;

// LinkedIn logo (transparent PNG / SVG)
const LINKEDIN_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png";

/* =========================
   Data (Board of Directors)
========================= */
const BOARD = {
  id: "top-management",
  title: "Board of Directors",
  people: [
    {
      id: 1,
      name: "Rajasekhar Papolu",
      designation: "Management",
      bio: "With a Computer Science Engineering background and 18 years’ experience, Managing Director Rajasekhar Papolu drives vision and growth. He integrates AI, advances software development, strengthening presence in India. His sales-and-services expands opportunities in software and security systems. Skilled in sales, business development, and project management, he champions innovation and excellence.",
      linkedin: "https://www.linkedin.com/in/rajas2121/",
      photo: "/team/MD'S Corporate Head shot..png",
    },
    {
      id: 2,
      name: "Hymavathi Papolu",
      designation: "Director – Administration",
      bio: "Hymavathi Papolu, Director of Administration, is a seasoned leader in organizational management. She blends expertise in accounting, finance, and operations to streamline processes and boost efficiency. By applying strategic financial practices and disciplined resource management, she ensures smooth Finance and Accounts performance, driving operational excellence, accountability, and sustainable, ongoing growth.",
      linkedin: "https://www.linkedin.com/in/hyma-p-464b65145/",
      photo: "/team/HYMAVATHI.jpg",
    },
    {
      id: 3,
      name: "Murali Krishna Arasala",
      designation: "Executive Director",
      bio: "Since 2009, Murali Krishna has leveraged his MCA to excel as Chief Administration Officer, orchestrating daily operations and cross-department coordination. He oversees facilities, resources, and compliance, and leads tendering, documentation, and bid management across e-procurement platforms. Meticulous with Tender/RFP/EOI norms and tools like Tender Tiger, he drives reliable, efficient execution.",
      linkedin: "https://www.linkedin.com/in/murali-krishna-b66564365/",
      photo: "/team/Murali.jpg",
    },
  ],
};

/* =========================
   Motion helpers
========================= */
const ease = [0.16, 1, 0.3, 1];
const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};
const containerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/* =========================
   Zig-Zag Row (parallax image)
========================= */
function ZigZagRow({ person, index }) {
  const isEven = index % 2 === 0;
  const photoSrc = person.photo || initialsAvatar(person.name);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["-20% 80%", "60% 20%"],
  });

  const yImg = useTransform(
    scrollYProgress,
    [0, 1],
    isEven ? ["-10px", "10px"] : ["10px", "-10px"]
  );
  const rImg = useTransform(
    scrollYProgress,
    [0, 1],
    isEven ? ["-1.2deg", "1.2deg"] : ["1.2deg", "-1.2deg"]
  );

  const xImgInitial = isEven ? -60 : 60;
  const xTextInitial = isEven ? 60 : -60;

  return (
    <motion.div
      ref={ref}
      variants={containerStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.35, once: false }}
      className="grid items-center gap-8 py-10 md:grid-cols-2"
      style={{ scrollMarginTop: 80 }}
    >
      {/* === IMAGE === */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: xImgInitial, filter: "blur(6px)" },
          show: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: { duration: 0.9, ease },
          },
        }}
        className={isEven ? "" : "order-last md:order-none"}
      >
        <motion.div
          style={{ y: yImg, rotate: rImg }}
          className="relative mx-auto aspect-[4/4] w-full max-w-[560px] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5"
        >
          <img
            src={photoSrc}
            alt={person.name}
            loading="lazy"
            className="h-full w-full object-cover select-none"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,81,138,0) 40%, rgba(7,81,138,0.15) 100%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* === TEXT CARD === */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: xTextInitial, filter: "blur(6px)" },
          show: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: { duration: 0.9, ease, delay: 0.05 },
          },
        }}
      >
        <div className="mx-auto max-w-[640px] overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3
              className="text-2xl font-bold leading-tight"
              style={{ color: BRAND }}
            >
              {person.name}
            </h3>

            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/40"
                style={{
                  backgroundColor: BRAND,
                }}
                aria-label={`LinkedIn profile of ${person.name}`}
              >
                <img
                  src={LINKEDIN_LOGO}
                  alt="LinkedIn"
                  className="h-4 w-4 bg-white rounded-sm object-contain"
                />
                LinkedIn
              </a>
            )}
          </div>

          <span
            className="mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              color: BRAND,
              backgroundColor: "rgba(7,81,138,0.08)",
              border: "1px solid rgba(7,81,138,0.22)",
            }}
          >
            {person.designation}
          </span>

          <motion.p variants={fadeInUp} className="mt-4 text-base leading-7">
            {person.bio || "Bio coming soon."}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================
   PAGE WRAPPER
========================= */
export default function BoardPage() {
  const group = BOARD;
  const reduce = useReducedMotion();

  return (
    <MotionConfig
      transition={{ duration: 0.9, ease }}
      reducedMotion={reduce ? "always" : "never"}
    >
      <main className="relative">
        {/* gradient background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1200px 600px at 10% -10%, rgba(7,81,138,0.08), transparent 55%), radial-gradient(900px 500px at 90% 110%, rgba(7,81,138,0.07), transparent 45%)",
          }}
        />

        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="mb-10 text-center md:mb-14"
          >
            <h1
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
              style={{ color: BRAND }}
            >
              {group.title}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600">
              Meet the leaders guiding strategy, innovation, and execution.
            </p>
          </motion.header>

          {/* Team members */}
          <div className="space-y-10 md:space-y-14">
            {group.people.map((p, i) => (
              <ZigZagRow key={p.id} person={p} index={i} />
            ))}
          </div>

          {/* Divider */}
          <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent" />
        </section>
      </main>
    </MotionConfig>
  );
}
