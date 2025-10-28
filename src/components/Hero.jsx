import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Globe2 } from "lucide-react";

const BRAND = "#07518a";
const HERO_IMAGE = "/MD_S_Corporate_Head_shot.-removebg-preview.png";

export default function Hero({ data }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const entrance = {
    initial: { x: "-10%", opacity: 0 },
    animate: { x: "0%", opacity: 1 },
    transition: reduce
      ? { duration: 0.01 }
      : { type: "spring", duration: 1.2, bounce: 0.3 },
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: BRAND,
        height: "92svh",
        minHeight: "580px",
      }}
    >
      {/* Gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at -10% -20%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(1200px 600px at 110% -10%, rgba(255,255,255,0.08), transparent 60%)",
          opacity: reduce ? 1 : bgOpacity,
        }}
      />

      {/* Decorative glow stripe */}
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0.45 }}
        transition={
          reduce
            ? { duration: 0.01 }
            : { duration: 2.2, repeat: Infinity, repeatType: "reverse" }
        }
        className="absolute -left-[10%] top-1/2 h-[120%] w-[70%] -translate-y-1/2 rotate-[12deg] bg-white/10 blur-3xl"
      />

      {/* ===================== GRID ===================== */}
      <div
        className="relative z-10 grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2 items-center gap-8 px-[4vw]"
        style={{ height: "100%" }}
      >
        {/* ===================== LEFT SECTION ===================== */}
        <motion.div
          initial={entrance.initial}
          animate={entrance.animate}
          transition={entrance.transition}
          style={{
            y: reduce ? 0 : textY,
            opacity: reduce ? 1 : textOpacity,
          }}
          className="flex flex-col justify-center h-full mt-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs sm:text-sm font-semibold text-white w-fit"
            style={{
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <Globe2 size={14} />
            <span>{data.company}</span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-[2vh] font-black tracking-tight text-white leading-tight"
            style={{
              fontSize: "clamp(24px, 5vw, 60px)",
              maxWidth: "90%",
            }}
          >
            {data.name}
          </motion.h1>

          <motion.blockquote
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-[2vh] border-l-4 pl-4 text-white/95"
            style={{
              borderColor: "rgba(255,255,255,0.6)",
              fontSize: "clamp(14px, 2.2vw, 20px)",
              lineHeight: 1.6,
              maxWidth: "95%",
            }}
          >
            “He envisions technology not just as innovation, but as governance
            in motion — transforming cities, securing nations, and empowering
            enterprises through the intelligence of AI and the precision of
            IoT.”
          </motion.blockquote>
        </motion.div>

        {/* ===================== RIGHT SECTION ===================== */}
        <motion.div
          initial={{ y: 30, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={
            reduce
              ? { duration: 0.01 }
              : { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }
          }
          style={{
            y: reduce ? 0 : imageY,
            scale: reduce ? 1 : imageScale,
          }}
          className="relative flex justify-center items-center"
        >
          <div
            className="relative w-full flex justify-center items-end"
            style={{
              aspectRatio: "4/5",
              maxWidth: "min(90vw, 620px)",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
              <img
                src={HERO_IMAGE}
                alt={data.name}
                className="relative w-full h-full object-contain object-bottom drop-shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* --- Ensure scaling consistency across all widths --- */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            min-height: 550px !important;
          }
          h1 {
            font-size: clamp(22px, 6vw, 48px) !important;
          }
          blockquote {
            font-size: clamp(14px, 3.2vw, 18px) !important;
          }
        }

        @media (max-width: 480px) {
          section {
            min-height: 520px !important;
          }
          h1 {
            font-size: clamp(20px, 7vw, 38px) !important;
          }
          blockquote {
            font-size: clamp(13px, 4vw, 16px) !important;
          }
          img {
            object-position: center bottom !important;
            transform: scale(0.98);
          }
        }
      `}</style>
    </section>
  );
}
