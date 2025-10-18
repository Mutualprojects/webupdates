import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Globe2 } from "lucide-react";

const BRAND = "#07518a";
const HERO_IMAGE = "/MD_S_Corporate_Head_shot.-removebg-preview.png";

export default function Hero({ data }) {
  const reduce = useReducedMotion();
  const entrance = {
    initial: { x: "-10%", opacity: 0 },
    animate: { x: "6%", opacity: 1 },
    transition: reduce
      ? { duration: 0.01 }
      : { type: "tween", duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <section
      className="relative overflow-hidden h-[92svh] min-h-[560px]"
      style={{ backgroundColor: BRAND }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at -10% -20%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(1200px 600px at 110% -10%, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />
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

      <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={entrance.initial}
          animate={entrance.animate}
          transition={entrance.transition}
          className="relative"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <Globe2 size={14} />
            <span>{data.company}</span>
          </div>

          <h1
            className="mt-3 font-black tracking-tight text-white"
            style={{ fontSize: "clamp(28px,4.5vw,56px)", lineHeight: 1.08 }}
          >
            {data.name}
          </h1>

          <blockquote
            className="mt-5 border-l-4 pl-4 text-white/95 sm:mt-6"
            style={{ borderColor: "rgba(255,255,255,0.6)" }}
          >
            <p
              className="leading-relaxed"
              style={{ fontSize: "clamp(16px,2.3vw,20px)" }}
            >
              “He envisions technology not just as innovation, but as governance
              in motion — transforming cities, securing nations, and empowering
              enterprises through the intelligence of AI and the precision of
              IoT.”
            </p>
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ y: 8, scale: 0.99, opacity: 0.95 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={
            reduce
              ? { duration: 0.01 }
              : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
          }
          className="relative mx-auto w-full max-w-[520px] sm:max-w-[560px] mt-12"
        >
          <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
            <img
              src={HERO_IMAGE}
              alt={data.name}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
