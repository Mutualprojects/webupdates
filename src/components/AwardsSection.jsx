import React from "react";

/* =========================
   Brand + Data
========================= */
const BRAND = "#07518a";

export const AWARDS = [
  {
    title: "Business Awards Hyderabad 2025",
    image: "/Awards/MDSU6200.JPG",
  },
  {
    title: "Business Titan Awards – Radio City (Dubai)",
    image: "/Awards/Business Titan Awards - Radio City at Dubai-1.JPG",
  },
  { title: "Economic Times Award", image: "/Awards/Economic Times Award.jpg" },
  {
    title: "Partner Leadership Award 2019",
    image: "/Awards/Partner Leadership Award 2019.jpg",
  },
  { title: "Radio City Award", image: "/Awards/Radio City Award.JPG" },
  {
    title: "Radio City ICON Awards",
    image: "/Awards/Radio City ICON Awards.JPG",
  },
  {
    title: "SKOCH Award – Wireless Radio Technology CCTV Surveillance Project",
    image:
      "/Awards/Received Skotch Award for Wireless Radio Technology CCTV Surveillance Project.jpg",
  },
  {
    title: "Backward Classes Chamber of Commerce and Industry",
    image: "/Awards/WhatsApp Image 2025-07-07 at 5.42.11 AM (1).jpeg.jpg",
  },
  {
    title: "Award",
    image: "/Awards/WhatsApp Image 2025-07-30 at 6.39.38 PM.jpeg",
  },
];

/* =========================
   Utilities (tilt + reveal)
========================= */
function useTilt(maxTilt = 6) {
  const ref = React.useRef(null);
  const [transform, setTransform] = React.useState("");

  const onMove = React.useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) * 2 - 1; // -1 to 1
      const py = (y / rect.height) * 2 - 1;
      const rx = (-py * maxTilt).toFixed(2);
      const ry = (px * maxTilt).toFixed(2);
      setTransform(`rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`);
    },
    [maxTilt]
  );

  const onLeave = React.useCallback(() => {
    setTransform("");
  }, []);

  return { ref, transform, onMove, onLeave };
}

function useReveal() {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

/* =========================
   Award Card Component
========================= */
function AwardCard({ award }) {
  const { ref, transform, onMove, onLeave } = useTilt(7);
  const reveal = useReveal();

  const brandStyle = { "--brand": BRAND };

  return (
    <article
      ref={reveal.ref}
      aria-label={award.title}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500 focus-within:outline-none ${
        reveal.shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={brandStyle}
    >
      {/* Tilt wrapper */}
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative will-change-transform transition-transform duration-300"
        style={{ transform }}
      >
        {/* Base image */}
        <div className="relative aspect-[4/3] w-full">
          <img
            src={award.image}
            alt={award.title}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        {/* Slide-up overlay */}
        <div
          className="
            absolute inset-0 translate-y-full
            bg-[var(--brand)] text-white
            transition-transform duration-500 ease-out
            group-hover:translate-y-0 group-focus-within:translate-y-0
            flex items-end
          "
          aria-hidden="true"
        >
          <div className="w-full p-4 sm:p-5">
            <h3 className="text-base font-semibold leading-snug sm:text-lg">
              {award.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Accessibility focus target */}
      <button
        className="absolute inset-0"
        aria-label={`View ${award.title}`}
      ></button>
    </article>
  );
}

/* =========================
   Awards Grid Section
========================= */
export default function AwardsSection({
  items = AWARDS,
  heading = "Awards & Recognitions",
}) {
  return (
    <section className="relative py-8 sm:py-10">
      {/* Background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(900px 460px at 10% -10%, ${BRAND}14, transparent 60%),
                       radial-gradient(900px 460px at 90% -10%, ${BRAND}10, transparent 60%),
                       linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)`,
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-6 sm:mb-8">
          <h2
            className="font-extrabold tracking-tight"
            style={{ color: BRAND, fontSize: "clamp(18px, 2.6vw, 32px)" }}
          >
            {heading}
          </h2>
        </header>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((a, i) => (
            <AwardCard key={`${a.title}-${i}`} award={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
