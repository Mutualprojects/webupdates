"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

/* =========================
   Data
========================= */
const brihaspathiMedia = [
  {
    title:
      "With over 12 lakh CCTVs installed, Brihaspathi Technologies is making a difference in public safety and surveillance across India",
    url: "https://www.ndtv.com/videos/embed-player/?id=933079&mute=1&autostart=1",
    platform: "NDTV",
    date: "April 30, 2025",
    category: "article",
  },
  {
    title:
      "Brihaspathi Technologies Limited Employees Pay Tribute to Padma Shri Daripalli Ramaiah by Planting Over 600 Saplings",
    url: "https://indtoday.com/brihaspathi-technologies-limited-employees-pay-tribute-to-padma-shri-daripalli-ramaiah-by-planting-over-600-saplings/",
    platform: "IND TODAY",
    date: "Apr 16, 2025",
    category: "article",
  },
  {
    title:
      "Startup Digest: Pine Labs files draft papers for ₹2,600 crore IPO, GIVA raises ₹530 crore and more",
    url: "https://www.cnbctv18.com/business/startup/startup-digest-pine-labs-files-draft-papers-for-rs-2600-crore-ipo-giva-raises-rs-530-crore-and-more-19627535.htm",
    platform: "CNBC TV18",
    date: "June 26, 2025",
    category: "article",
  },
  {
    title:
      "Brihaspathi Technologies Raises $10 Million Funding, Plans IPO Next Year",
    url: "https://www.ndtvprofit.com/business/brihaspathi-technologies-raises-10-million-funding-plans-ipo-next-year",
    platform: "NDTV",
    date: "27 Jun 2025",
    category: "article",
  },
  {
    title:
      "Brihaspathi Technologies Limited: The Indian Company Turning AI into Real-World Security",
    url: "https://republicbytes.com/brihaspathi-technologies-limited-the-indian-company-turning-ai-into-real-world-security",
    platform: "PUBLIC BYTES",
    date: "Sep 29, 2025",
    category: "article",
  },
  {
    title: "Brihaspathi Tech raises $10M, bags MSRTC deal; ready for IPO",
    url: "https://www.thehansindia.com/business/brihaspathi-tech-raises-10m-bags-msrtc-deal-ready-for-ipo-983046",
    platform: "HANSINDIA",
    date: "27 June 2025",
    category: "article",
  },
  {
    title: "Power of Women",
    image:
      "https://media.licdn.com/dms/image/v2/D5622AQE8S1m5teqe_Q/feedshare-shrink_1280/B56Zc1JBLXHgAk-/0/1748943246715",
    url: "https://www.linkedin.com/posts/brihaspathi-technologies_timespowerwomen-womenempowerment2025-breakingbarriers-activity-7339563193515548672-xzgi",
    platform: "TV9 TELUGU",
    relatedUrl: "https://www.youtube.com/watch?v=AvxqkXx31HI",
    category: "post",
  },
  {
    title: "12 Lakh CC Cameras in India Installed by Brihaspathi Technologies",
    image:
      "https://media.licdn.com/dms/image/v2/D5622AQFCDioLQad3pA/feedshare-shrink_2048_1536/B56ZgXNztmHMAo-/0/1752736153132",
    url: "https://youtu.be/eZ6RPwVYxX4",
    platform: "ETV",
    date: "Jul 16, 2025",
    category: "video",
  },
  {
    title:
      "₹7,000 Salary to ₹700 Crores: Brihaspathi Technologies MD Rajasekhar Papolu’s Inspirational Journey",
    url: "https://youtu.be/RzeD1gsg9gI",
    platform: "SUMAN TV",
    date: "Dec 16, 2024",
    category: "video",
  },
  {
    title:
      "Brihaspathi Technology Limited | Rajasekhar P MD Brihaspathi Technologies Limited",
    url: "https://youtu.be/la_vwP7oVXw",
    platform: "G16 Media",
    date: "Jun 26, 2025",
    category: "video",
  },
  {
    title: "Future of Cloud-based Surveillance Ecosystem",
    url: "https://youtu.be/954ztbKPJnM",
    platform: "JIO PODCAST",
    date: "Aug 22, 2025",
    category: "video",
  },
  {
    title:
      "తనదైన రంగంలో దూసుకుపోతున్న బృహస్పతి సంస్థ Brihaspathi Technologies Limited |",
    url: "https://youtu.be/Z_YT4ChZuf0",
    platform: "TV5",
    date: "Jun 29, 2025",
    category: "video",
  },
  {
    title: "FATHERS DAY",
    url: "https://youtube.com/shorts/Ky_0tszpVqo",
    platform: "HYBIZ",
    date: "Jun 16, 2025",
    category: "video",
  },
  {
    title:
      "AI సెక్యూరిటీ కెమెరాలు తీసుకొస్తాం.. Brihaspathi Technologies Rajasekhar Papolu, Managing Director",
    url: "https://youtu.be/GV8dBQCETjs",
    platform: "VAARTHA NEWS",
    date: "Jun 26, 2025",
    category: "video",
  },
];

/* =========================
   Helpers
========================= */
const YT_RE = /(?:youtube\.com|youtu\.be)/i;
const VIMEO_RE = /vimeo\.com/i;
const DIRECT_VIDEO_RE = /\.(mp4|webm|ogg)(\?|#|$)/i;

const isYouTube = (url) => YT_RE.test(url);
const isVimeo = (url) => VIMEO_RE.test(url);
const isDirectVideo = (url) => DIRECT_VIDEO_RE.test(url);

const toYouTubeEmbed = (url) => {
  try {
    const u = new URL(url);
    const id = u.hostname.includes("youtu.be")
      ? u.pathname.slice(1)
      : u.searchParams.get("v") || u.pathname.split("/").filter(Boolean).pop();
    return id ? `https://www.youtube.com/embed/${id}?rel=0` : url;
  } catch {
    return url;
  }
};

const toVimeoEmbed = (url) => {
  try {
    const u = new URL(url);
    const id = u.pathname.split("/").filter(Boolean).pop();
    return id ? `https://player.vimeo.com/video/${id}` : url;
  } catch {
    return url;
  }
};

/* =========================
   UI Components
========================= */
const Chip = ({ children }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-black/70 text-white text-[10px] font-medium px-2 py-0.5 backdrop-blur-sm">
    {children}
  </span>
);

const MediaVisual = ({ item }) => {
  // YouTube/Vimeo
  if (item.category === "video" && (isYouTube(item.url) || isVimeo(item.url))) {
    const src = isYouTube(item.url)
      ? toYouTubeEmbed(item.url)
      : toVimeoEmbed(item.url);
    return (
      <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-xl">
        <iframe
          src={src}
          title={item.title}
          className="absolute inset-0 w-full h-full rounded-xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  // Direct MP4 video
  if (item.category === "video" && isDirectVideo(item.url)) {
    return (
      <div className="relative w-full overflow-hidden rounded-xl">
        <video
          src={item.url}
          controls
          playsInline
          className="block w-full rounded-xl"
          style={{ aspectRatio: "16/9" }}
        />
      </div>
    );
  }

  // Image
  if (item.image) {
    return (
      <div className="relative w-full h-48 sm:h-52 md:h-56 rounded-xl overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    );
  }

  // Fallback gradient
  return (
    <div className="relative w-full h-48 sm:h-52 md:h-56 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-600 via-sky-500 to-cyan-400" />
  );
};

const Card = ({ item, idx }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 16, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 16 }}
    transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.2) }}
    className="group rounded-2xl ring-1 ring-gray-200 bg-white hover:shadow-lg transition overflow-hidden"
  >
    <div className="p-3 pb-0">
      <MediaVisual item={item} />
    </div>

    <div className="p-5 pt-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Chip>
          {item.category === "video"
            ? "Video"
            : item.category === "post"
            ? "Post"
            : "Article"}
        </Chip>
        <Chip>{item.platform}</Chip>
        {item.date && <Chip>{item.date}</Chip>}
      </div>

      <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug">
        {item.title}
      </h3>

      <div className="mt-4 flex items-center gap-3">
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-semibold px-4 py-2 hover:bg-indigo-700 transition"
        >
          Open Link
        </a>

        {item.relatedUrl && (
          <a
            href={item.relatedUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-800 text-xs font-semibold px-4 py-2 hover:bg-gray-200 transition"
          >
            Related
          </a>
        )}
      </div>
    </div>
  </motion.article>
);

/* =========================
   Main Page
========================= */
export default function BrihaspathiMediaShowcase() {
  const [tab, setTab] = useState("all");

  const filtered = useMemo(() => {
    return tab === "all"
      ? brihaspathiMedia
      : brihaspathiMedia.filter((m) => m.category === tab);
  }, [tab]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
          In the News & Media
        </h2>
        <p className="text-gray-600">
          Coverage, videos, and social highlights featuring Brihaspathi
          Technologies.
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {["all", "article", "video", "post"].map((key) => {
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium ring-1 transition",
                active
                  ? "bg-indigo-600 text-white ring-indigo-600"
                  : "bg-white text-gray-700 ring-gray-300 hover:bg-gray-50",
              ].join(" ")}
            >
              {key === "all"
                ? "All"
                : key === "article"
                ? "Articles"
                : key === "video"
                ? "Videos"
                : "Posts"}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <LayoutGroup>
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={false}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <Card key={`${item.title}-${i}`} item={item} idx={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
  );
}
