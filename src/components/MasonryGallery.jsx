/* @refresh reset */
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTransition, animated } from "@react-spring/web";
import { Pagination } from "antd";
import "antd/dist/reset.css";

/* ---------- Utilities ---------- */
const cn = (...c) => c.filter(Boolean).join(" ");
const HEIGHTS = [220, 260, 300, 340, 380, 420];

/* =========================================================
   BUILD IMAGEKIT-BACKED DATA
   ========================================================= */
export function buildMasonryData(count = 96) {
  const baseURL = "https://ik.imagekit.io/waxuvuasch/news";
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    const ext = id <= 82 ? "jpeg" : "jpg";
    return {
      id,
      image: `${baseURL}/${id}.${ext}`,
      height: HEIGHTS[i % HEIGHTS.length],
    };
  });
}

/* =========================================================
   SMART IMAGE WITH FALLBACK + AUTO-HIDE ON FAIL
   ========================================================= */
function SmartImage({ src, alt, onLoadFail }) {
  const [current, setCurrent] = useState(src);
  const [visible, setVisible] = useState(true);
  const triedJpg = useRef(false);

  if (!visible) return null;

  return (
    <img
      src={current}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (!triedJpg.current && /\.jpeg$/i.test(current)) {
          triedJpg.current = true;
          setCurrent(current.replace(/\.jpeg$/i, ".jpg"));
        } else {
          console.warn(`Image failed to load: ${current}`);
          setVisible(false);
          onLoadFail?.();
        }
      }}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
    />
  );
}

/* =========================================================
   MASONRY GALLERY WITH PAGINATION
   ========================================================= */
export default function MasonryGalleryPaginated({ data: incomingData }) {
  const data = useMemo(
    () => (incomingData && incomingData.length ? incomingData : buildMasonryData()),
    [incomingData]
  );

  const [validData, setValidData] = useState(data);
  const [columns, setColumns] = useState(4);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const ref = useRef(null);

  const handleImageFail = (id) => {
    setValidData((prev) => prev.filter((item) => item.id !== id));
  };

  /* ----- Responsive columns ----- */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1600) setColumns(6);
      else if (w >= 1200) setColumns(5);
      else if (w >= 900) setColumns(4);
      else if (w >= 600) setColumns(3);
      else setColumns(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ----- Measure container width ----- */
  useEffect(() => {
    const measure = () => {
      if (ref.current) setContainerWidth(ref.current.offsetWidth);
    };
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (ro && ref.current) ro.observe(ref.current);
    else window.addEventListener("resize", measure);
    return () => {
      if (ro && ref.current) ro.unobserve(ref.current);
      else window.removeEventListener("resize", measure);
    };
  }, []);

  /* ----- Paginated subset of data ----- */
  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return validData.slice(start, start + pageSize);
  }, [currentPage, validData]);

  /* ----- Compute masonry layout ----- */
  const [columnHeights, gridItems] = useMemo(() => {
    if (!pagedData.length) return [[0], []];

    const cols = Math.max(columns, 1);
    const heights = new Array(cols).fill(0);
    const items = [];
    const colWidth = containerWidth / cols || 0;

    pagedData.forEach((item) => {
      const targetCol = heights.indexOf(Math.min(...heights));
      const x = colWidth * targetCol;
      const y = heights[targetCol];
      const h = Math.max(160, item.height || 220);
      heights[targetCol] += h;
      items.push({ ...item, x, y, width: colWidth, height: h });
    });

    return [heights, items];
  }, [columns, containerWidth, pagedData]);

  /* ----- Animations ----- */
  const transitions = useTransition(gridItems, {
    keys: (item) => item.id,
    from: { opacity: 0, y: 20, scale: 0.95 },
    enter: { opacity: 1, y: 0, scale: 1 },
    leave: { opacity: 0, y: 20 },
    config: { mass: 1, tension: 280, friction: 30 },
    trail: 25,
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div
        ref={ref}
        className={cn("relative w-full")}
        style={{ height: Math.max(...columnHeights, 0) }}
      >
        {transitions((style, item) => (
          <animated.div
            key={item.id}
            style={{
              ...style,
              position: "absolute",
              left: item.x,
              top: item.y,
              width: item.width,
              height: item.height,
            }}
            className="p-[8px]"
          >
            <div className="relative w-full h-full overflow-hidden rounded-xl shadow-[0_10px_35px_-10px_rgba(0,0,0,0.3)] bg-gray-100 group">
              <SmartImage
                src={item.image}
                alt={`news-${item.id}`}
                onLoadFail={() => handleImageFail(item.id)}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          </animated.div>
        ))}
      </div>

      {/* ===== Pagination ===== */}
      <div className="my-8">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={validData.length}
          onChange={setCurrentPage}
          showSizeChanger={false}
          className="text-[#07518a]"
        />
      </div>
    </div>
  );
}

/* =========================================================
   DEMO WRAPPER
   ========================================================= */
export function MasonryDemo() {
  const data = useMemo(() => buildMasonryData(96), []);
  return (
    <div className="flex w-full justify-center items-center p-6 bg-gray-50">
      <div className="w-full max-w-screen-xl mx-auto border border-gray-200 rounded-2xl shadow-lg bg-white p-4">
        <h2 className="text-2xl font-extrabold text-[#07518a] mb-6 text-center">
          Brihaspathi News Gallery
        </h2>
        <MasonryGalleryPaginated data={data} />
      </div>
    </div>
  );
}
