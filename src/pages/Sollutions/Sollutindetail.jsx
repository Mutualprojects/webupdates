"use client";
import React, { useMemo, useRef, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, animate } from "framer-motion";

/* ---------------- SAMPLE DATA ---------------- */
const solutions = [
  {
    slug: "video-analytics",
    title: "AI Video Analytics",
    summary:
      "Real-time, edge-accelerated analytics for surveillance feeds—detect, classify, and act on events as they happen.",
    image: "/sollution_images/3.jpg",
    features: [
      "Object & Person Detection",
      "Face Recognition & Watchlists",
      "ANPR / License Plate Reading",
      "Intrusion & Line-Crossing",
      "Crowd Counting & Heatmaps",
    ],
  },
  {
    slug: "access-control",
    title: "Access Control & Attendance",
    summary:
      "Unified access management with biometric, RFID, and mobile credentials—built for security, compliance, and scale.",
    image: "/sollution_images/4.jpg",
    features: [
      "Biometric & RFID",
      "Mobile Credentials",
      "Role-Based Access",
      "Visitor Management",
    ],
  },
  {
    slug: "smart-retail",
    title: "Smart Retail Analytics",
    summary:
      "Computer vision insights for stores: footfall, dwell, queues, planogram & shelf health to boost conversion.",
    image: "/sollution_images/SMart retail.jpg",
    features: [
      "Footfall & Heatmaps",
      "Queue Alerts",
      "Shelf Stock-Out Detection",
      "Loss Prevention",
    ],
  },
  {
    slug: "smart-bus",
    title: "Smart Bus Solution",
    summary:
      "Safety-first transit with onboard AI CCTV, GPS/telemetry, panic alerts, and passenger information systems.",
    image: "/sollution_images/smart bus solution.jpg",
    features: [
      "AI CCTV & DMS",
      "GPS & Geofencing",
      "SOS Workflow",
      "Cloud Archival",
    ],
  },
];

/* ---------------- COMPONENT ---------------- */
export default function SolutionDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const index = solutions.findIndex((s) => s.slug === slug);
  const solution = solutions[index];
  const prev = solutions[index - 1] || null;
  const next = solutions[index + 1] || null;
  const related = solutions.filter((s) => s.slug !== slug);

  const brand = "#07518a";
  const featuresRef = useRef(null);
  const useCasesRef = useRef(null);
  const outcomesRef = useRef(null);

  // Smooth scrolling using Framer Motion animate()
  const smoothScrollTo = useCallback((el, offset = 0) => {
    if (!el) return;
    const y = window.scrollY + el.getBoundingClientRect().top - offset;
    const start = window.scrollY;
    animate(0, 1, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (t) => {
        const cur = start + (y - start) * t;
        window.scrollTo(0, cur);
      },
    });
  }, []);

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10 },
      show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.4 },
      }),
    }),
    []
  );

  if (!solution)
    return (
      <div className="p-10 text-center text-gray-600">
        <p>Solution not found.</p>
        <button
          onClick={() => navigate("/solutions")}
          className="mt-4 rounded-md bg-[#07518a] px-4 py-2 text-white"
        >
          Back to Solutions
        </button>
      </div>
    );

  return (
    <main
      style={{ "--brand": brand }}
      className="bg-white text-gray-900 scroll-smooth"
    >
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen w-full mt-10">
        <div className="relative z-10 mx-auto grid min-h-[70vh] max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-8 md:grid-cols-2">
          {/* ===== Left Content ===== */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold text-[color:var(--brand)] ring-1"
              style={{
                backgroundColor: "rgba(7,81,138,0.08)",
                borderColor: "rgba(7,81,138,0.15)",
              }}
            >
              Solution Profile
            </span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              {solution.title}
            </h1>
            {solution.summary && (
              <p className="mt-4 text-lg leading-7 text-gray-700">
                {solution.summary}
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => smoothScrollTo(featuresRef.current, 12)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/90 px-4 py-2.5 text-sm font-semibold text-[color:var(--brand)] shadow-sm backdrop-blur transition hover:bg-white ring-1 ring-[color:var(--brand)]/30"
              >
                Explore features
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {/* ===== Right Image ===== */}
          <motion.div
            className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-white shadow-sm md:h-[420px]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {solution.image ? (
              <img
                src={solution.image}
                alt={solution.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No image
              </div>
            )}
            <div className="pointer-events-none absolute -inset-1 rounded-3xl ring-1 ring-black/5" />
          </motion.div>
        </div>

        {/* Breadcrumb + Prev/Next */}
        <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 pt-6">
          <nav className="text-sm text-gray-600">
            <Link to="/solutions" className="hover:underline">
              Solutions
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{solution.title}</span>
          </nav>
          <div className="flex gap-2">
            {prev && (
              <Link
                to={`/solutions/${prev.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </Link>
            )}
            {next && (
              <Link
                to={`/solutions/${next.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-white"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section ref={featuresRef} className="bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <motion.h2
            className="text-2xl font-semibold text-gray-900"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Key Features
          </motion.h2>

          {solution.features?.length ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {solution.features.map((f, i) => (
                <motion.div
                  key={f}
                  className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  custom={i}
                  viewport={{ once: true }}
                >
                  <div className="text-sm font-semibold text-gray-900">{f}</div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-gray-600">
              Add notable features for this solution.
            </p>
          )}

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => smoothScrollTo(useCasesRef.current, 12)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[color:var(--brand)] ring-1 ring-[color:var(--brand)]/30 hover:bg-[color:var(--brand)]/5"
            >
              See use cases
            </button>
            <button
              onClick={() => smoothScrollTo(outcomesRef.current, 12)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[color:var(--brand)] ring-1 ring-[color:var(--brand)]/30 hover:bg-[color:var(--brand)]/5"
            >
              See outcomes
            </button>
          </div>
        </div>
      </section>

      {/* ===== USE CASES ===== */}
      <section ref={useCasesRef} className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <motion.h2
            className="text-2xl font-semibold text-gray-900"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Use Cases
          </motion.h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(solution.useCases?.length
              ? solution.useCases
              : [
                  "City/Enterprise deployments",
                  "Compliance & audits",
                  "Integrations & APIs",
                ]
            ).map((u, i) => (
              <motion.div
                key={u}
                className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i}
                viewport={{ once: true }}
              >
                <div className="text-sm font-semibold text-gray-900">{u}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUTCOMES ===== */}
      <section ref={outcomesRef} className="bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <motion.h2
            className="text-2xl font-semibold text-gray-900"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Expected Outcomes
          </motion.h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(solution.outcomes?.length
              ? solution.outcomes
              : ["Faster response", "Better visibility", "Measurable ROI"]
            ).map((o, i) => (
              <motion.div
                key={o}
                className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i}
                viewport={{ once: true }}
              >
                <div className="text-sm font-semibold text-gray-900">{o}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RELATED ===== */}
      {related.length > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Related Solutions</h2>
              <Link
                to="/solutions"
                className="text-sm font-medium text-[color:var(--brand)] hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {related.map((s, i) => (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow"
                >
                  <Link to={`/solutions/${s.slug}`}>
                    <div className="relative aspect-[16/10]">
                      {s.image ? (
                        <img
                          src={s.image}
                          alt={s.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {s.title}
                      </div>
                      {s.summary && (
                        <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                          {s.summary}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BACK LINK ===== */}
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <Link
          to="/solutions"
          className="text-sm font-medium text-[color:var(--brand)] hover:underline"
        >
          ← Back to all solutions
        </Link>
      </div>
    </main>
  );
}
