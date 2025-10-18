"use client";

import React, { useState } from "react";
import { Card, Row, Col, Image, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  TreePine,
  Users2,
  HeartHandshake,
  Building2,
} from "lucide-react";

/* =========================
   BRAND CONFIG
========================= */
const BRAND = "#07518a";
const GRADIENT = "linear-gradient(135deg, #07518a 0%, #0a6ab8 100%)";
const IK_BASE = "https://ik.imagekit.io/waxuvuasch";

/* =========================
   EVENTS DATA
========================= */
const EVENTS = [
  {
    title: "Awards 2025",
    icon: Award,
    description:
      "Brihaspathi Technologies celebrated Awards 2025 by honoring teams and partners for innovation and excellence. A proud moment showcasing our leadership in AI-driven surveillance and digital transformation.",
    images: [
      `${IK_BASE}/Eventimages/Awards2025/1.jpg`,
      `${IK_BASE}/Eventimages/Awards2025/2.jpg`,
      `${IK_BASE}/Eventimages/Awards2025/3.jpg`,
    ],
  },
  {
    title: "Credai Expo 2025",
    icon: Building2,
    description:
      "At Credai Expo 2025, Brihaspathi Technologies showcased smart city and AI-powered security innovations, redefining safety and technology solutions across industries.",
    images: [
      `${IK_BASE}/Eventimages/EXPO/Credai Expo/1.jpg`,
      `${IK_BASE}/Eventimages/EXPO/Credai Expo/2.jpg`,
      `${IK_BASE}/Eventimages/EXPO/Credai Expo/3.jpg`,
      `${IK_BASE}/Eventimages/EXPO/Credai Expo/4.jpg`,
    ],
  },
  {
    title: "Father’s Day Celebration",
    icon: HeartHandshake,
    description:
      "Celebrating the strength and guidance of all fathers at Brihaspathi Technologies — a day of gratitude, laughter, and appreciation that united our entire BTL family.",
    images: [
      `${IK_BASE}/Eventimages/Father's Day/1.jpeg`,
      `${IK_BASE}/Eventimages/Father's Day/2.jpeg`,
      `${IK_BASE}/Eventimages/Father's Day/3.jpeg`,
    ],
  },
  {
    title: "Tree Plantation Drive",
    icon: TreePine,
    description:
      "Aligned with our sustainability mission, Brihaspathi Technologies organized a massive tree plantation drive promoting green growth and eco-responsibility across communities.",
    images: [
      `${IK_BASE}/Eventimages/Tree plantation Drive/1.JPG`,
      `${IK_BASE}/Eventimages/Tree plantation Drive/2.JPG`,
      `${IK_BASE}/Eventimages/Tree plantation Drive/3.JPG`,
      `${IK_BASE}/Eventimages/Tree plantation Drive/4.JPG`,
    ],
  },
  {
    title: "Women's Day Celebration",
    icon: Users2,
    description:
      "Brihaspathi Technologies celebrated Women's Day 2025, honoring the women leaders and innovators who inspire progress, diversity, and empowerment in technology.",
    images: [
      `${IK_BASE}/Eventimages/womens day/1.jpeg`,
      `${IK_BASE}/Eventimages/womens day/2.jpeg`,
      `${IK_BASE}/Eventimages/womens day/3.jpeg`,
    ],
  },
];

/* =========================
   ANIMATIONS
========================= */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* =========================
   MAIN COMPONENT
========================= */
export default function EventGallery() {
  const [selected, setSelected] = useState(EVENTS[0]);
  const [visible, setVisible] = useState(false); // manual preview control

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-sans">
      {/* === HERO SECTION === */}
      <section
        className="text-center py-20 md:py-28 relative overflow-hidden"
        style={{ background: GRADIENT }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-white"
        >
          Brihaspathi Events & Celebrations
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white/80 mt-4 text-lg max-w-2xl mx-auto"
        >
          A glimpse into our vibrant culture, innovation, and togetherness that
          define Brihaspathi Technologies.
        </motion.p>
      </section>

      {/* === MAIN CONTENT === */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-10 px-5 gap-6">
        {/* ==== SIDEBAR ==== */}
        <aside
          className="md:w-72 bg-white rounded-xl shadow-md border border-gray-100 md:sticky md:top-24 md:h-[80vh] flex-shrink-0"
          style={{ overflowY: "auto" }}
        >
          <div
            className="py-4 px-5 text-center font-bold text-white text-lg rounded-t-xl"
            style={{ background: GRADIENT }}
          >
            Event Categories
          </div>
          <div className="flex md:flex-col flex-wrap md:gap-1 gap-2 mt-3 pb-4 px-3 justify-center md:justify-start">
            {EVENTS.map((event, i) => {
              const active = selected.title === event.title;
              return (
                <motion.div
                  key={i}
                  onClick={() => setSelected(event)}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-2 px-4 py-2 md:py-3 cursor-pointer rounded-lg border-l-4 md:w-auto transition-all ${
                    active
                      ? "bg-[#f0f5ff] border-[#07518a]"
                      : "border-transparent hover:bg-gray-100"
                  }`}
                >
                  <event.icon
                    size={20}
                    strokeWidth={2}
                    color={active ? BRAND : "#555"}
                  />
                  <span
                    className={`text-sm font-medium ${
                      active ? "text-[#07518a]" : "text-gray-700"
                    }`}
                  >
                    {event.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </aside>

        {/* ==== EVENTS DISPLAY ==== */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.title}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                bordered={false}
                className="rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300"
              >
                <div className="p-6">
                  {/* === TITLE === */}
                  <div className="flex items-center gap-3 mb-4">
                    <selected.icon size={28} strokeWidth={2.3} color={BRAND} />
                    <h2 className="text-2xl font-extrabold text-[#07518a]">
                      {selected.title}
                    </h2>
                  </div>

                  {/* === DESCRIPTION === */}
                  <p className="text-gray-700 mb-6 leading-relaxed text-base">
                    {selected.description}
                  </p>

                  {/* === MANUAL GALLERY BUTTON === */}
                  <Button
                    type="primary"
                    style={{
                      background: BRAND,
                      borderColor: BRAND,
                      borderRadius: 8,
                      marginBottom: 20,
                    }}
                    onClick={() => setVisible(true)}
                  >
                    View Full Gallery
                  </Button>

                  {/* === IMAGES + PREVIEW GROUP (NO CROPPING) === */}
                  <Image.PreviewGroup
                    preview={{
                      visible,
                      onVisibleChange: (vis) => setVisible(vis),
                    }}
                  >
                    <Row gutter={[16, 24]}>
                      {selected.images.map((img, idx) => (
                        <Col xs={24} sm={24} md={12} lg={8} key={idx}>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.25 }}
                            className="rounded-xl overflow-hidden relative group"
                            style={{
                              background: "#fff",
                              border: "1px solid rgba(0,0,0,0.06)",
                              borderRadius: 12,
                              padding: 12,
                            }}
                          >
                            <Image
                              // Use ImageKit params only for quality; keep real size (no forced width/height)
                              src={`${img}?tr=q-85`}
                              alt={`${selected.title}-${idx + 1}`}
                              // FULL WIDTH + NATURAL HEIGHT
                              width="100%"
                              // height not set → auto
                              style={{
                                display: "block",
                                width: "100%",
                                height: "auto",
                                objectFit: "contain", // ensures no cropping
                                borderRadius: 10,
                                background: "#f8fafc", // subtle backdrop behind transparent areas
                              }}
                              preview={{
                                mask: (
                                  <div className="text-sm text-white font-semibold">
                                    Preview
                                  </div>
                                ),
                              }}
                              placeholder
                            />
                          </motion.div>
                        </Col>
                      ))}
                    </Row>
                  </Image.PreviewGroup>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
