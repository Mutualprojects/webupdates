"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CASE_STUDIES_BY_SECTOR } from "../../data/Casestudy";
import {
  Carousel,
  Tag,
  message as antdMsg,
  ConfigProvider,
  Button,
  Spin,
} from "antd";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Target,
  Award,
  MapPin,
  Building,
  User,
  BarChart3,
  Globe,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

/* ===== Brand colors ===== */
const BRAND = "#07518a";
const BRAND_TINT = "#0a6ab8";

/* ===== Side images ===== */
const CHALLENGE_IMG = "/c1-01.png";
const SOLUTION_IMG = "/c2-01.png";

/* ===== Helpers ===== */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function calculateReadTime(content) {
  const wordCount = content.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / 200);
}

/* ===== Motion variants ===== */
const riseIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});
const slideFromLeft = {
  initial: { x: "-15vw", opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};
const slideFromRight = {
  initial: { x: "15vw", opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};
const bridgeReveal = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

/* ===== Related carousel ===== */
function RelatedCaseStudiesCarousel({
  currentCaseSlug,
  sectorCases,
  onCaseSelect,
  sectorTitle,
}) {
  const related = useMemo(
    () => sectorCases.filter((c) => slugify(c.name) !== currentCaseSlug),
    [sectorCases, currentCaseSlug]
  );
  if (!related.length) return null;

  return (
    <motion.section {...riseIn(0)} className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <motion.h2
          {...riseIn(0.05)}
          className="text-3xl font-black text-gray-900"
        >
          More {sectorTitle} Success Stories
        </motion.h2>
      </div>
      <Carousel
        dots={false}
        slidesToShow={3}
        slidesToScroll={1}
        autoplay
        autoplaySpeed={4000}
        infinite={related.length > 3}
        responsive={[
          { breakpoint: 1024, settings: { slidesToShow: 2 } },
          { breakpoint: 640, settings: { slidesToShow: 1 } },
        ]}
      >
        {related.map((cs, i) => (
          <motion.div
            key={slugify(cs.name)}
            whileHover={{ scale: 1.02 }}
            className="px-3"
          >
            <button
              onClick={() => onCaseSelect(cs)}
              className="group relative block overflow-hidden rounded-2xl"
            >
              <img
                src={cs.avatar || "/default-case-study-image.jpg"}
                alt={cs.name}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="font-semibold">{cs.name}</p>
                <p className="text-xs opacity-80">{cs.company}</p>
              </div>
            </button>
          </motion.div>
        ))}
      </Carousel>
    </motion.section>
  );
}

/* ===== Page Component ===== */
export default function CaseStudyDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find case study
  const { caseStudy, currentSector, sectorTitle } = useMemo(() => {
    let sectorKey = null;
    let found = null;
    for (const key of Object.keys(CASE_STUDIES_BY_SECTOR)) {
      const match = CASE_STUDIES_BY_SECTOR[key].find(
        (c) => slugify(c.name) === slug
      );
      if (match) {
        found = match;
        sectorKey = key;
        break;
      }
    }
    return {
      caseStudy: found,
      currentSector: sectorKey ? CASE_STUDIES_BY_SECTOR[sectorKey] : [],
      sectorTitle: sectorKey || "Case Studies",
    };
  }, [slug]);

  if (!caseStudy)
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Case Study Not Found
        </h2>
        <Button
          type="primary"
          onClick={() => navigate("/case-studies")}
          style={{ backgroundColor: BRAND }}
        >
          Back to Case Studies
        </Button>
      </div>
    );

  const images = [caseStudy.avatar || "/default-case-study-image.jpg"];
  const badges = [caseStudy.role, caseStudy.company, caseStudy.city].filter(
    Boolean
  );
  const readTime = calculateReadTime([
    ...(caseStudy.challenges || []),
    ...(caseStudy.solutions || []),
    ...(caseStudy.results || []),
    caseStudy.quote || "",
  ]);

  const [series] = useState(currentSector);
  const currentIndex = series.findIndex((x) => x === caseStudy);

  const pushToCase = useCallback(
    (target) => navigate(`/case-studies/${slugify(target.name)}`),
    [navigate]
  );
  const gotoSibling = useCallback(
    (offset) => {
      if (!series?.length) return;
      const next = (currentIndex + offset + series.length) % series.length;
      pushToCase(series[next]);
    },
    [series, currentIndex, pushToCase]
  );

  return (
    <ConfigProvider theme={{ token: { colorPrimary: BRAND } }}>
      <DetailUI
        caseStudy={caseStudy}
        images={images}
        badges={badges}
        readTime={readTime}
        sectorTitle={sectorTitle}
        onPrev={() => gotoSibling(-1)}
        onNext={() => gotoSibling(1)}
        onCaseSelect={pushToCase}
        relatedCases={series}
        caseSlug={slug}
      />
    </ConfigProvider>
  );
}

/* ===== UI ===== */
function DetailUI({
  caseStudy,
  images,
  badges,
  readTime,
  sectorTitle,
  onPrev,
  onNext,
  onCaseSelect,
  relatedCases,
  caseSlug,
}) {
  const prefersReduced = useReducedMotion();
  const imgRef = useRef(null);
  const featuresRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const { scrollYProgress: featProgress } = useScroll({
    target: featuresRef,
    offset: ["start 80%", "end 20%"],
  });
  const featWidth = useTransform(featProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="w-full bg-white overflow-hidden">
      {/* ===== HEADER ===== */}
      <motion.section
        className="relative bg-gradient-to-br from-gray-50 to-white py-10 px-6 lg:px-16"
        initial="initial"
        whileInView="animate"
        viewport={{ amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10 items-center">
          {/* Left */}
          <div className="lg:col-span-3">
            <motion.div
              {...riseIn(0)}
              className="flex items-center gap-2 text-sm text-gray-500 mb-4"
            >
              <Globe className="h-4 w-4 " />
              <span>{sectorTitle}</span>
              <span className="ml-auto text-xs text-gray-500"></span>
            </motion.div>

            <motion.h1
              {...riseIn(0.05)}
              className="text-4xl  text-gray-900 mb-6 font-extrabold font-sans"
            >
              {caseStudy.name}
            </motion.h1>

            <motion.div {...riseIn(0.08)} className="flex flex-wrap gap-3 mb-6">
              {badges.map((b, i) => (
                <Tag
                  key={i}
                  color="blue"
                  className="rounded-full px-4 py-2 text-sm font-medium border-0"
                  style={{ backgroundColor: `${BRAND}10`, color: BRAND }}
                  onClick={() => antdMsg.info(`Tag: ${b}`)}
                >
                  {b}
                </Tag>
              ))}
            </motion.div>

            <motion.blockquote
              {...riseIn(0.12)}
              className="pl-6 border-l-4 border-blue-500/70 mb-6"
            >
              <p className="text-lg leading-relaxed text-gray-700 italic">
                “{caseStudy.quote || "Outstanding results through innovation."}”
              </p>
            </motion.blockquote>

            {/* View Case Details (brand gradient) */}
            <motion.div {...riseIn(0.15)} className="flex items-center gap-4 ">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 rounded-xl px-6 py-3 text-white font-semibold shadow-md "
              style={{ background: BRAND }}
                onClick={() =>
                  featuresRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <BarChart3 className="h-5 w-5 text-white" />
                <h1 className="text-white font-bold font-sans ">
                  {" "}
                  View Case Details
                </h1>
                <ChevronDown className="h-5 w-5 text-white" />
              </motion.button>

              <div className="flex items-center rounded-xl ring-1 ring-gray-200 bg-white">
                <button onClick={onPrev} className="p-3 text-gray-700">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="h-7 w-px bg-gray-200" />
                <button onClick={onNext} className="p-3 text-gray-700">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right image */}
          <div
            className="lg:col-span-1"
            ref={imgRef}
            style={{ scale: imgScale }}
          >
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <Spin />
              </div>
            )}
            <motion.img
              src={images[0]}
              alt={caseStudy.name}
              className="w-full h-[120px] object-contain rounded-2xl shadow-lg"
              onLoad={() => setImgLoaded(true)}
            />
          </div>
        </div>
      </motion.section>

      {/* ===== DEEP DIVE ===== */}
      <section
        ref={featuresRef}
        className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 py-24 overflow-hidden"
      >
        {/* ===== Sticky Progress Bar ===== */}
        <div className="sticky top-0 z-20 h-1 w-full bg-gray-200">
          <motion.div
            className="h-full"
            style={{
              width: featWidth,
              background: `linear-gradient(90deg, ${BRAND}, ${BRAND_TINT})`,
            }}
          />
        </div>

        {/* ===== Section Title ===== */}
        <motion.div
          {...bridgeReveal}
          className="text-center mb-20 max-w-3xl mx-auto px-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 font-sans">
            Deep Dive Analysis
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Explore the comprehensive breakdown of challenges, solutions, and
            outcomes
          </p>
        </motion.div>

        {/* ===== CHALLENGES CONTAINER ===== */}
        <motion.div
          className="relative flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto gap-12 px-6 md:px-10 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Image Left */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            {...slideFromLeft}
          >
            <img
              src={CHALLENGE_IMG}
              alt="Challenges"
              className="w-full max-w-lg rounded-3xl shadow-lg object-contain"
            />
          </motion.div>

          {/* Text Right */}
          <motion.div
            className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg border border-red-100 p-8 md:p-10 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Challenges</h3>
            </div>
            <ul className="space-y-3 list-disc pl-6 text-gray-700">
              {(caseStudy.challenges || []).map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ===== SOLUTIONS CONTAINER ===== */}
        <motion.div
          className="relative flex flex-col md:flex-row-reverse items-center justify-center max-w-7xl mx-auto gap-12 px-6 md:px-10 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Image Right */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            {...slideFromRight}
          >
            <img
              src={SOLUTION_IMG}
              alt="Solutions"
              className="w-full max-w-lg rounded-3xl shadow-lg object-contain"
            />
          </motion.div>

          {/* Text Left */}
          <motion.div
            className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg border border-green-100 p-8 md:p-10 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Solutions</h3>
            </div>
            <ul className="space-y-3 list-disc pl-6 text-gray-700">
              {(caseStudy.solutions || []).map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ===== RESULTS CONTAINER ===== */}
        <motion.div
          className="max-w-5xl mx-auto px-6 md:px-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 md:p-10 relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900">
                Results & Outcomes
              </h3>
            </div>
            <ul className="space-y-3 list-disc pl-6 text-gray-700">
              {(caseStudy.results || []).map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>

            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-8 right-8 bottom-6 h-0.5 origin-left bg-gradient-to-r from-blue-400 to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== RELATED ===== */}
      <RelatedCaseStudiesCarousel
        currentCaseSlug={caseSlug}
        sectorCases={relatedCases}
        onCaseSelect={onCaseSelect}
        sectorTitle={sectorTitle}
      />
    </div>
  );
}

/* ===== Subcomponent ===== */
function DetailColumn({ tone, title, icon, items }) {
  const toneStyles =
    tone === "red"
      ? { border: "border-red-100", bg: "bg-red-50", grad: "from-red-400" }
      : tone === "green"
      ? {
          border: "border-green-100",
          bg: "bg-green-50",
          grad: "from-green-400",
        }
      : { border: "border-blue-100", bg: "bg-blue-50", grad: "from-blue-400" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative bg-white rounded-2xl shadow-lg p-8 border ${toneStyles.border}`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-12 h-12 ${toneStyles.bg} rounded-xl flex items-center justify-center`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <ul className="space-y-3 list-disc pl-6 text-gray-700">
        {items.map((item, i) => (
          <motion.li key={i}>{item}</motion.li>
        ))}
      </ul>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
        className={`absolute left-8 right-8 bottom-6 h-0.5 origin-left bg-gradient-to-r ${toneStyles.grad} to-transparent`}
      />
    </motion.div>
  );
}
