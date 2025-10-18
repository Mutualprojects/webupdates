import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* =========
   CONFIG
   ========= */
const BRAND = "#07518a";

const IMG_URL =
  "https://tse1.mm.bing.net/th/id/OIP.PW1EFVspJJjLXFTLyiy-SAHaHa?pid=Api&P=0&h=180";

/* =========
   DATA (DESC: latest -> earliest)
   ========= */
const JOURNEY = [
  {
    id: "2025-exam",
    year: 2025,
    title: "Examination Surveillance",
    summary:
      "We successfully expanded into education surveillance—installing 65,000+ cameras for NEET exams across India.",
    img: IMG_URL,
  },
  {
    id: "2024-election",
    year: 2024,
    title: "Election Webcasting",
    summary:
      "Nationwide election webcasting for General Elections with secure live streams and central monitoring.",
    img: IMG_URL,
  },
  {
    id: "2023-bsf",
    year: 2023,
    title: "Border Security Force",
    summary:
      "Deployed ruggedized, always-on systems across sensitive checkpoints and land ports.",
    img: IMG_URL,
  },
  {
    id: "2022-mfg",
    year: 2022,
    title: "Advancing into Manufacturing",
    summary:
      "Scaled in-house manufacturing aligned with Make in India for faster service and quality control.",
    img: IMG_URL,
  },
  {
    id: "2021-iot",
    year: 2021,
    title: "IoT Innovation & Breakthroughs",
    summary:
      "Built remote device management and edge analytics gateways for complex field challenges.",
    img: IMG_URL,
  },
  {
    id: "2020-banking",
    year: 2020,
    title: "Banking Surveillance",
    summary:
      "Hardened ATM & branch security with AI video analytics, access control, and SOC integrations.",
    img: IMG_URL,
  },
  {
    id: "2018-kaziranga",
    year: 2018,
    title: "Kaziranga National Park",
    summary:
      "Thermal & ANPR systems for conservation, perimeter protection, and incident response.",
    img: IMG_URL,
  },
  {
    id: "2016-nationwide",
    year: 2016,
    title: "Nationwide Surveillance Projects",
    summary:
      "Pan-India rollouts with compliance, audits, and a 24×7 NOC for real-time monitoring.",
    img: IMG_URL,
  },
  {
    id: "2016-web",
    year: 2016,
    title: "Marketing Services & Web Development",
    summary:
      "Established a strong base in branding, web/app development, and digital outreach.",
    img: IMG_URL,
  },
  {
    id: "2014-radio",
    year: 2014,
    title: "Surveillance with Radio Technology",
    summary:
      "Smart surveillance using licensed/unlicensed radio backhaul and power-efficient nodes.",
    img: IMG_URL,
  },
  {
    id: "2012-city",
    year: 2012,
    title: "City Surveillance – CCTV Camera",
    summary:
      "Visakhapatnam Smart City kickoff—reliable CCTV coverage with central monitoring and alerts.",
    img: IMG_URL,
  },
  {
    id: "2006-origin",
    year: 2006,
    title: "Marketing Services & Web Development",
    summary:
      "Our journey began with a strong foundation in web development and marketing services.",
    img: IMG_URL,
  },
];

/* =========
   HOOK: per-item parallax
   ========= */
function useParallax(ref) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 35%"],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [42, 0, -8]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]);

  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -4]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.12, 1], [0, 1, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1]);

  return { contentY, contentOpacity, imageY, imageOpacity, imageScale };
}

/* =========
   ITEM
   ========= */
function TimelineItem({ item, index }) {
  const imageOnLeft = index % 2 === 1; // alternate sides
  const liRef = React.useRef(null);
  const { contentY, contentOpacity, imageY, imageOpacity, imageScale } =
    useParallax(liRef);

  return (
    <li
      id={item.id}
      ref={liRef}
      className="relative py-16 sm:py-24 scroll-mt-28 sm:scroll-mt-40"
      style={{ contain: "content" }}
    >
      {/* Sticky rail dot + image bubble (desktop) */}
      <div className="hidden lg:block sticky top-[32vh] h-0 pointer-events-none">
        {/* Center dot */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: BRAND,
              boxShadow: `0 0 0 8px #ffffff, 0 0 0 9px ${BRAND}40`,
            }}
          />
        </div>

        {/* Connector from rail to image */}
        <div
          className={[
            "absolute top-1/2 -translate-y-1/2 h-px w-[min(140px,16vw)]",
            imageOnLeft ? "right-[calc(50%-1px)]" : "left-[calc(50%-1px)]",
          ].join(" ")}
          style={{ backgroundColor: `${BRAND}33` }}
        />

        {/* Image bubble */}
        <motion.div
          style={{
            y: imageY,
            opacity: imageOpacity,
            scale: imageScale,
            willChange: "transform, opacity",
          }}
          transition={{
            type: "tween",
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={[
            "absolute top-1/2 -translate-y-1/2 rounded-full bg-white overflow-hidden grid place-items-center",
            "h-24 w-24",
            imageOnLeft
              ? "right-[calc(50%+min(140px,16vw))]"
              : "left-[calc(50%+min(140px,16vw))]",
          ].join(" ")}
          role="img"
          aria-label={item.title}
        >
          {item.img && (
            <img
              src={item.img}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </motion.div>
      </div>

      {/* Mobile image bubble + dot */}
      <div className="lg:hidden relative mb-6">
        <div className="absolute left-1/2 -translate-x-1/2 top-5">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: BRAND,
              boxShadow: `0 0 0 6px #ffffff, 0 0 0 7px ${BRAND}40`,
            }}
          />
        </div>

        <div
          className={[
            "absolute top-[22px] h-px w-[40%]",
            imageOnLeft ? "left-1/2" : "right-1/2",
          ].join(" ")}
          style={{ backgroundColor: `${BRAND}33` }}
        />

        <motion.div
          style={{
            y: imageY,
            opacity: imageOpacity,
            scale: imageScale,
            willChange: "transform, opacity",
          }}
          transition={{
            type: "tween",
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={[
            "mx-auto rounded-full bg-white overflow-hidden grid place-items-center",
            "h-20 w-20",
            imageOnLeft ? "mr-auto" : "ml-auto",
          ].join(" ")}
        >
          {item.img && (
            <img
              src={item.img}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </motion.div>
      </div>

      {/* Content (opposite side of image) */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
          willChange: "transform, opacity",
        }}
        transition={{ type: "tween", duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "relative mx-auto grid max-w-none items-start gap-6 lg:grid-cols-2",
          imageOnLeft ? "lg:pl-[min(54%,340px)]" : "lg:pr-[min(54%,340px)]",
        ].join(" ")}
      >
        <div
          className={[
            imageOnLeft
              ? "lg:col-start-2 lg:text-left"
              : "lg:col-start-1 lg:text-right",
          ].join(" ")}
        >
          {/* optional content-side connector */}
          <div className="hidden lg:block">
            <div
              className={[
                "absolute top-[32vh] h-px w-[min(120px,14vw)]",
                imageOnLeft ? "right-[calc(50%-1px)]" : "left-[calc(50%-1px)]",
              ].join(" ")}
              style={{ backgroundColor: `${BRAND}33` }}
            />
          </div>

          <div className={imageOnLeft ? "" : "lg:ml-auto"}>
            <div
              className="text-4xl sm:text-5xl font-extrabold leading-none"
              style={{ color: BRAND }}
            >
              {item.year}
            </div>
            <h3 className="mt-3 text-2xl sm:text-3xl font-semibold text-neutral-900">
              {item.title}
            </h3>
            <p className="mt-3 max-w-prose text-neutral-600">{item.summary}</p>
          </div>
        </div>
      </motion.div>
    </li>
  );
}

/* =========
   PARENT
   ========= */
export default function OurJourney() {
  return (
    <section id="our-journey" className="relative bg-white">
      {/* Header */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-12 sm:pt-16">
        <div className="text-center">
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wider"
            style={{
              borderColor: `${BRAND}22`,
              color: BRAND,
              background: "#fff",
            }}
          >
            OUR JOURNEY
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
            A Roadmap of Milestones
          </h2>
          <p className="mt-3 text-neutral-600">
            Start from <strong>{JOURNEY[0].year}</strong> and travel back to{" "}
            <strong>{JOURNEY[JOURNEY.length - 1].year}</strong>.
          </p>
        </div>
      </div>

      {/* Timeline + center rail */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 rounded"
          style={{ backgroundColor: BRAND }}
        />
        <ol className="relative">
          {JOURNEY.map((j, i) => (
            <TimelineItem key={j.id} item={j} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
