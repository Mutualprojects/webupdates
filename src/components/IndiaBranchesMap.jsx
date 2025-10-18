import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

/* ------------------------------------------------
   Branch Data (unchanged)
------------------------------------------------ */
const branches = [
  {
    id: "jaisalmer",
    name: "JAISALMER",
    top: 36,
    left: 27,
    side: "left",
    info: "web casting project overall in 2014 general elections installed",
  },
  {
    id: "pune",
    name: "PUNE",
    top: 56,
    left: 35,
    side: "left",
    info: "web casting project overall in 2014 general elections installed",
  },
  {
    id: "delhi",
    name: "DELHI",
    top: 27,
    left: 38,
    side: "top",
    info: "web casting project overall in 2014 general elections installed",
  },
  {
    id: "mp",
    name: "MADHYA PRADESH",
    top: 47,
    left: 42,
    side: "left",
    info: "web casting project overall in 2014 general elections installed",
  },
  {
    id: "bangalore",
    name: "BANGALORE",
    top: 82,
    left: 39,
    side: "left",
    info: "web casting project overall in 2014 general elections installed",
  },
  {
    id: "chennai",
    name: "CHENNAI",
    top: 80,
    left: 45,
    side: "right",
    info: "web casting project overall in 2014 general elections installed",
  },
  {
    id: "kolkata",
    name: "KOLKATA",
    top: 47,
    left: 61,
    side: "right",
    info: "web casting project overall in 2014 general elections installed",
  },
  {
    id: "vizag",
    name: "VIZAG",
    top: 58,
    left: 56,
    side: "right",
    info: "web casting project overall in 2014 general elections installed",
  },
  {
    id: "vij",
    name: "VIJAYAWADA",
    top: 65,
    left: 50,
    side: "right",
    info: "web casting project overall in 2014 general elections installed",
  },
  {
    id: "kurnool",
    name: "KURNOOL",
    top: 70,
    left: 42,
    side: "right",
    info: "web casting project overall in 2014 general elections installed",
  },
  {
    id: "patna",
    name: "PATNA",
    top: 38,
    left: 59,
    side: "top",
    info: "web casting project overall in 2014 general elections installed",
  },
  {
    id: "guwahati",
    name: "GUWAHATI",
    top: 35,
    left: 70,
    side: "right",
    info: "web casting project overall in 2014 general elections installed",
  },
  {
    id: "hyderabad",
    name: "HYDERABAD (H.O)",
    top: 60,
    left: 44,
    side: "left",
    isHeadOffice: true,
    info: "web casting project overall in 2014 general elections installed",
  },
];

/* ------------------------------------------------
   Main Component
------------------------------------------------ */
export default function IndiaBranchesMap() {
  const [activeId, setActiveId] = useState("hyderabad");
  const [hoveredId, setHoveredId] = useState(null);

  const active = useMemo(
    () => branches.find((b) => b.id === activeId) || null,
    [activeId]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="w-full">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-[1fr_380px]">
        {/* =================== MAP =================== */}
        <div className="relative rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="absolute left-4 top-4 z-20 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700 ring-1 ring-slate-200">
            BRANCHES
          </div>

          <div
            className="relative h-[55vh] min-h-[420px] md:h-[60vh] md:min-h-[520px] w-full"
            onClick={(e) => {
              if (e.target.closest("button")) return;
              setActiveId(null);
            }}
          >
            {/* Map Image */}
            <img
              src="/91527425_India.jpg"
              alt="India map"
              className="absolute inset-0 w-full h-full object-contain"
              draggable={false}
            />

            {/* Pins Overlay */}
            <div className="absolute inset-0 z-10">
              {branches.map((b) => (
                <Pin
                  key={b.id}
                  b={b}
                  active={activeId === b.id}
                  hovered={hoveredId === b.id}
                  onHover={(id) => setHoveredId(id)}
                  onLeave={() => setHoveredId(null)}
                  onOpen={() => setActiveId(b.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* =================== SIDE PANEL (Desktop) =================== */}
        <aside className="hidden rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm md:block">
          <BranchDetails branch={active} onClose={() => setActiveId(null)} />
        </aside>
      </div>

      {/* =================== MOBILE DRAWER =================== */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 block rounded-t-2xl border-t border-slate-200 bg-white p-4 shadow-2xl md:hidden transition-transform duration-300 ${
          active ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-auto max-w-3xl">
          <BranchDetails branch={active} onClose={() => setActiveId(null)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------
   Branch Details
------------------------------------------------ */
function BranchDetails({ branch, onClose }) {
  if (!branch)
    return <p className="text-sm text-slate-500">Tap a pin to view details.</p>;

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold tracking-tight">
          {branch.name}
          {branch.isHeadOffice && (
            <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
              H.O
            </span>
          )}
        </h3>
        <button
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 md:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
        {branch.info || "Branch information. Wire this to your API if needed."}
      </div>
    </div>
  );
}

/* ------------------------------------------------
   Pin Component
------------------------------------------------ */
function Pin({ b, active, hovered, onHover, onLeave, onOpen }) {
  const strokeClass = b.isHeadOffice ? "text-orange-500" : "text-slate-300";
  const innerDotClass = b.isHeadOffice ? "fill-orange-500" : "fill-slate-600";
  const H_OFF = "clamp(72px, 8vw, 140px)";
  const V_OFF = "clamp(40px, 6vw, 80px)";
  const showTip = hovered || active;

  return (
    <div className="absolute" style={{ top: `${b.top}%`, left: `${b.left}%` }}>
      <button
        tabIndex={0}
        onMouseEnter={() => onHover(b.id)}
        onMouseLeave={onLeave}
        onFocus={() => onHover(b.id)}
        onBlur={onLeave}
        onClick={onOpen}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
        aria-label={`Open details for ${b.name}`}
        className="group relative -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5 outline-none ring-2 ring-transparent focus:ring-slate-400"
      >
        {(b.isHeadOffice || active) && (
          <span className="pointer-events-none absolute -inset-1 rounded-full bg-orange-400/30 animate-ping" />
        )}

        {/* Pin shape */}
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 drop-shadow-sm transition-transform group-hover:scale-110"
        >
          <path
            d="M12 2c-4.4 0-8 3.3-8 7.4 0 5.1 7.1 12 7.4 12.3.3.3.8.3 1.1 0C12.9 21.4 20 14.5 20 9.4 20 5.3 16.4 2 12 2z"
            fill="#ffffff"
            stroke="currentColor"
            strokeWidth="1.5"
            className={strokeClass}
          />
          <circle cx="12" cy="10" r="2" className={innerDotClass} />
        </svg>

        {/* Tooltip */}
        {showTip && (
          <span className="absolute left-1/2 top-[-10px] -translate-x-1/2 -translate-y-full rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white shadow md:top-[-6px]">
            {b.name}
          </span>
        )}

        {/* OUTSIDE LABELS */}
        {b.side === "left" && (
          <>
            <span
              className="pointer-events-none absolute top-1/2 right-full hidden h-px bg-orange-400 md:block"
              style={{ width: H_OFF }}
            />
            <span
              className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[11px] font-semibold tracking-wide text-slate-800 md:block"
              style={{ right: `calc(100% + 8px + ${H_OFF})` }}
            >
              {b.name}
            </span>
          </>
        )}

        {b.side === "right" && (
          <>
            <span
              className="pointer-events-none absolute top-1/2 left-full hidden h-px bg-orange-400 md:block"
              style={{ width: H_OFF }}
            />
            <span
              className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[11px] font-semibold tracking-wide text-slate-800 md:block"
              style={{ left: `calc(100% + 8px + ${H_OFF})` }}
            >
              {b.name}
            </span>
          </>
        )}

        {b.side === "top" && (
          <>
            <span
              className="pointer-events-none absolute left-1/2 bottom-full hidden w-px bg-orange-400 md:block"
              style={{ height: V_OFF }}
            />
            <span
              className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold tracking-wide text-slate-800 md:block"
              style={{ bottom: `calc(100% + 6px + ${V_OFF})` }}
            >
              {b.name}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
