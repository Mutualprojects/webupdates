import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

/* ========== Simple utils ========== */
const cn = (...classes) => classes.filter(Boolean).join(" ");
const splitIntoRows = (arr, rows) => {
  const out = Array.from({ length: rows }, () => []);
  arr.forEach((v, i) => out[i % rows].push(v));
  return out;
};
const dedupe = (arr) => Array.from(new Set(arr));

/* ========== Assets ========== */
const clints = "/loyal-customer.png";

/* ========== Data ========== */
const BANKS = [
  "/Sector%20was%20Clients/BANKS/1.png",
  "/Sector%20was%20Clients/BANKS/2.png",
  "/Sector%20was%20Clients/BANKS/3.png",
  "/Sector%20was%20Clients/BANKS/4.png",
  "/Sector%20was%20Clients/BANKS/5.png",
  "/Sector%20was%20Clients/BANKS/6.png",
  "/Sector%20was%20Clients/BANKS/7.png",
  "/Sector%20was%20Clients/BANKS/8.png",
  "/Sector%20was%20Clients/BANKS/9.png",
  "/Sector%20was%20Clients/BANKS/10.png",
  "/Sector%20was%20Clients/BANKS/11.png",
];
const CENTRAL_STATE_GOVT = [
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/1.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/2.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/3.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/4.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/5.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/6.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/7.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/8.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/9.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/10.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/11.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/12.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/13.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/14.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/15.png",
  "/Sector%20was%20Clients/Central%20nd%20state%20Government%20logos/16.png",
];
const CORPORATES = [
  "/Sector%20was%20Clients/corporates%20logo/1.png",
  "/Sector%20was%20Clients/corporates%20logo/2.png",
  "/Sector%20was%20Clients/corporates%20logo/3.png",
  "/Sector%20was%20Clients/corporates%20logo/4.png",
  "/Sector%20was%20Clients/corporates%20logo/5.png",
  "/Sector%20was%20Clients/corporates%20logo/6.png",
];
const HOSPITALS = [
  "/Sector%20was%20Clients/Hospitals%20logo/1.png",
  "/Sector%20was%20Clients/Hospitals%20logo/2.png",
  "/Sector%20was%20Clients/Hospitals%20logo/3.png",
  "/Sector%20was%20Clients/Hospitals%20logo/4.png",
  "/Sector%20was%20Clients/Hospitals%20logo/5.png",
  "/Sector%20was%20Clients/Hospitals%20logo/6.png",
];
const INDUSTRIES = [
  "/Sector%20was%20Clients/INDUSTRIES/1.png",
  "/Sector%20was%20Clients/INDUSTRIES/2.png",
  "/Sector%20was%20Clients/INDUSTRIES/3.png",
  "/Sector%20was%20Clients/INDUSTRIES/4.png",
  "/Sector%20was%20Clients/INDUSTRIES/5.png",
  "/Sector%20was%20Clients/INDUSTRIES/6.png",
  "/Sector%20was%20Clients/INDUSTRIES/7.png",
  "/Sector%20was%20Clients/INDUSTRIES/8.png",
  "/Sector%20was%20Clients/INDUSTRIES/9.png",
  "/Sector%20was%20Clients/INDUSTRIES/10.png",
  "/Sector%20was%20Clients/INDUSTRIES/11.png",
];
const INSTITUTIONS = [
  "/Sector%20was%20Clients/Instutions/6.png",
  "/Sector%20was%20Clients/Instutions/7.png",
  "/Sector%20was%20Clients/Instutions/8.png",
  "/Sector%20was%20Clients/Instutions/9.png",
  "/Sector%20was%20Clients/Instutions/10.png",
];
const REAL_ESTATE = [
  "/Sector%20was%20Clients/real%20estate%20logos/1.png",
  "/Sector%20was%20Clients/real%20estate%20logos/2.png",
  "/Sector%20was%20Clients/real%20estate%20logos/3.png",
  "/Sector%20was%20Clients/real%20estate%20logos/4.png",
  "/Sector%20was%20Clients/real%20estate%20logos/5.png",
  "/Sector%20was%20Clients/real%20estate%20logos/6.png",
  "/Sector%20was%20Clients/real%20estate%20logos/7.png",
  "/Sector%20was%20Clients/real%20estate%20logos/8.png",
  "/Sector%20was%20Clients/real%20estate%20logos/9.png",
];
const SCHOOLS = [
  "/Sector%20was%20Clients/Schools%20logos/1.png",
  "/Sector%20was%20Clients/Schools%20logos/2.png",
  "/Sector%20was%20Clients/Schools%20logos/3.png",
  "/Sector%20was%20Clients/Schools%20logos/4.png",
  "/Sector%20was%20Clients/Schools%20logos/5.png",
  "/Sector%20was%20Clients/Schools%20logos/6.png",
];
const TEMPLES = [
  "/Sector%20was%20Clients/temples/11.png",
  "/Sector%20was%20Clients/temples/12.png",
  "/Sector%20was%20Clients/temples/13.png",
  "/Sector%20was%20Clients/temples/14.png",
];
const UNIVERSITIES = [
  "/Sector%20was%20Clients/Universities/1.png",
  "/Sector%20was%20Clients/Universities/2.png",
  "/Sector%20was%20Clients/Universities/3.png",
  "/Sector%20was%20Clients/Universities/4.png",
  "/Sector%20was%20Clients/Universities/5.png",
];

const SECTOR_LOGOS = [
  { images: BANKS },
  { images: CENTRAL_STATE_GOVT },
  { images: CORPORATES },
  { images: HOSPITALS },
  { images: INDUSTRIES },
  { images: INSTITUTIONS },
  { images: REAL_ESTATE },
  { images: SCHOOLS },
  { images: TEMPLES },
  { images: UNIVERSITIES },
];

/* ========== Row (marquee) ========== */
function IconRow({ icons, broken, markBroken, direction = "left", speedSeconds = 12, sizePx = 80, gapPx = 35 }) {
  const safeIcons = useMemo(() => icons.filter((s) => !broken.has(s)), [icons, broken]);
  if (!safeIcons.length) return null;
  return (
    <div
      className="cmh-row group relative w-full overflow-hidden select-none"
      style={{ "--speed": `${speedSeconds}s`, "--gap": `${gapPx}px`, "--icon": `${sizePx}px` }}
    >
      <div className={cn("cmh-track flex items-center", direction === "left" ? "cmh-animate-left" : "cmh-animate-right")}>
        <div className="cmh-lane flex items-center">
          {safeIcons.map((src, i) => (
            <div key={`a-${src}-${i}`} className="cmh-icon">
              <LazyLoadImage src={src} alt={`logo ${i}`} effect="blur" width={sizePx} height={sizePx} onError={() => markBroken(src)} />
            </div>
          ))}
        </div>
        <div className="cmh-lane flex items-center" aria-hidden="true">
          {safeIcons.map((src, i) => (
            <div key={`b-${src}-${i}`} className="cmh-icon">
              <LazyLoadImage src={src} alt="" effect="blur" width={sizePx} height={sizePx} onError={() => markBroken(src)} />
            </div>
          ))}
        </div>
      </div>
      <div className="cmh-fade cmh-fade-left" />
      <div className="cmh-fade cmh-fade-right" />
    </div>
  );
}

/* ========== Main Component ========== */
export default function ClientsMarqueeHero({
  brandHex = "#07518a",
  ctaHref = "/case-studies",
  ctaLabel = "View case studies",
}) {
  const allIcons = useMemo(() => dedupe(SECTOR_LOGOS.flatMap((s) => s.images)), []);
  const ROWS = useMemo(() => splitIntoRows(allIcons, 4), [allIcons]);
  const [broken, setBroken] = useState(new Set());
  const markBroken = useCallback((src) => setBroken((p) => new Set(p).add(src)), []);

  return (
    <section className="relative w-screen overflow-hidden bg-white py-16 sm:py-20 lg:py-24 overflow-x-hidden">
      {/* dotted backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative w-full text-center px-4 sm:px-6 lg:px-8 xl:px-10 mx-auto">
        <span
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm rounded-full border bg-white"
          style={{ borderColor: brandHex, color: brandHex }}
        >
          <img src={clints} alt="Our Clients" width={20} height={20} className="object-contain" />
          <span>Our Clients</span>
        </span>

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight mt-1"
          style={{
            backgroundImage: `linear-gradient(90deg, ${brandHex}, ${brandHex})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Trusted Across Sectors
        </h1>

        <p className="mt-4 text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 max-w-3xl mx-auto">
          We partner with <strong style={{ color: brandHex }}>banks</strong>,{" "}
          <strong style={{ color: brandHex }}>government</strong>,{" "}
          <strong style={{ color: brandHex }}>enterprises</strong>, and{" "}
          <strong style={{ color: brandHex }}>education & healthcare</strong> institutions across India.
        </p>

        <Link
          to={ctaHref}
          className="inline-flex items-center justify-center mt-8 px-6 py-3 rounded-full font-medium transition hover:opacity-90"
          style={{ backgroundColor: brandHex, color: "#fff" }}
        >
          {ctaLabel}
        </Link>

        <div className="mt-12 sm:mt-16 space-y-6 sm:space-y-8 lg:space-y-10 w-full overflow-hidden">
          {ROWS.map((r, i) => (
            <IconRow
              key={i}
              icons={r}
              broken={broken}
              markBroken={markBroken}
              direction={i % 2 === 0 ? "left" : "right"}
              speedSeconds={14}
              sizePx={120}
              gapPx={35}
            />
          ))}
        </div>
      </div>

      {/* Styles */}
      <style>{`
        html, body { overscroll-behavior-x: none; }
        .cmh-track { will-change: transform; transform: translate3d(0,0,0); }
        .cmh-lane { gap: var(--gap); padding-right: var(--gap); display: flex; align-items: center; }
        .cmh-icon { width: var(--icon); height: var(--icon); flex: 0 0 auto; }
        .cmh-icon img, .cmh-icon picture, .cmh-icon .lazy-load-image-background img {
          width: 100%; height: 100%; object-fit: contain; user-select: none;
        }

        @keyframes cmh-marquee-left { from { transform: translate3d(0,0,0);} to { transform: translate3d(-50%,0,0);} }
        @keyframes cmh-marquee-right { from { transform: translate3d(-50%,0,0);} to { transform: translate3d(0,0,0);} }
        .cmh-animate-left { animation: cmh-marquee-left var(--speed) linear infinite; }
        .cmh-animate-right { animation: cmh-marquee-right var(--speed) linear infinite; }
        .cmh-row:hover .cmh-animate-left, .cmh-row:hover .cmh-animate-right { animation-play-state: paused; }

        .cmh-fade { position: absolute; top:0; bottom:0; width:120px; pointer-events:none; }
        .cmh-fade-left { left:0; background:linear-gradient(to right, white 0%, transparent 100%); }
        .cmh-fade-right { right:0; background:linear-gradient(to left, white 0%, transparent 100%); }

        @media (max-width:640px){ .cmh-row{--icon:44px;--gap:20px;} }
        @media (min-width:641px) and (max-width:1023px){ .cmh-row{--icon:60px;--gap:26px;} }
        @media (min-width:1024px) and (max-width:1535px){ .cmh-row{--icon:72px;--gap:32px;} }
        @media (min-width:1536px){ .cmh-row{--icon:90px;--gap:40px;} }
      `}</style>
    </section>
  );
}