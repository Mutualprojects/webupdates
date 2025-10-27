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
  Flag,
  Briefcase,
  Stethoscope,
} from "lucide-react";

/* =========================
   BRAND CONFIG
========================= */
const BRAND = "#07518a";
const GRADIENT = "linear-gradient(135deg, #07518a 0%, #0a6ab8 100%)";
const IK_BASE = "https://ik.imagekit.io/waxuvuasch/Eventimages";

/* =========================
   EVENTS DATA
========================= */
const EVENTS = [
  {
    title: "Independence Day Celebrations",
    icon: Flag,
    description:
      "A proud moment celebrating the spirit of freedom and patriotism. The Brihaspathi family united to honor our nation through flag hoisting, cultural events, and heartfelt tributes.",
    images: [
      `${IK_BASE}/Independencday%20Celebrations/1.jpeg?updatedAt=1760763591377`,
      `${IK_BASE}/Independencday%20Celebrations/2.jpeg?updatedAt=1760763591377`,
      `${IK_BASE}/Independencday%20Celebrations/3.jpeg?updatedAt=1760763591377`,
    ],
  },
  {
    title: "Conference Room Group Photos",
    icon: Briefcase,
    description:
      "Moments from our internal meetings and brainstorming sessions — where ideas come alive, teams collaborate, and innovation takes shape at Brihaspathi Technologies.",
    images: [
      `${IK_BASE}/Conference%20room%20Group%20photos/WhatsApp%20Image%202025-09-16%20at%2014.43.05.jpeg?updatedAt=1760763569362`,
      `${IK_BASE}/Conference%20room%20Group%20photos/WhatsApp%20Image%202025-09-16%20at%2014.43.04.jpeg?updatedAt=1760763569105`,
    ],
  },
  {
    title: "Vinayaka Chaturthi Celebrations 2025",
    icon: Award,
    description:
      "Brihaspathi Technologies celebrated Ganesh Chaturthi with devotion and joy — a day filled with prayers, decorations, and festive togetherness.",
    images: [
      `${IK_BASE}/Vinayaka%20Chaturthi%20Celebrations%20-%202025/1.jpeg?updatedAt=1760763569000`,
      `${IK_BASE}/Vinayaka%20Chaturthi%20Celebrations%20-%202025/2.jpeg?updatedAt=1760763569000`,
      `${IK_BASE}/Vinayaka%20Chaturthi%20Celebrations%20-%202025/3.jpeg?updatedAt=1760763569000`,
    ],
  },
  {
    title: "Health Campaign",
    icon: Stethoscope,
    description:
      "Promoting wellness through our Health Campaign — encouraging fitness, preventive care, and healthy habits among all Brihaspathians.",
    images: [
      `${IK_BASE}/Health%20Campign/1.jpg?updatedAt=1760763590748`,
      `${IK_BASE}/Health%20Campign/2.jpg?updatedAt=1760763590748`,
      `${IK_BASE}/Health%20Campign/3.jpg?updatedAt=1760763590748`,
      `${IK_BASE}/Health%20Campign/4.jpg?updatedAt=1760763590748`,
    ],
  },
  {
    title: "Mother’s Day Celebration",
    icon: HeartHandshake,
    description:
      "Honoring the unconditional love and strength of mothers — Brihaspathi celebrated Mother’s Day with heartfelt moments, gratitude, and appreciation.",
    images: [
      `${IK_BASE}/Mother's%20day%20Celebration/1.jpeg?updatedAt=1760763568788`,
      `${IK_BASE}/Mother's%20day%20Celebration/2.jpeg?updatedAt=1760763568788`,
      `${IK_BASE}/Mother's%20day%20Celebration/3.jpeg?updatedAt=1760763568788`,
    ],
  },
  {
    title: "Tree Plantation Drive",
    icon: TreePine,
    description:
      "Aligned with our sustainability vision, Brihaspathi Technologies organized a tree plantation drive to foster a greener, cleaner future.",
    images: [
      `${IK_BASE}/Tree%20plantation%20Drive/1.jpeg?updatedAt=1760763568788`,
      `${IK_BASE}/Tree%20plantation%20Drive/2.jpeg?updatedAt=1760763568788`,
      `${IK_BASE}/Tree%20plantation%20Drive/3.jpeg?updatedAt=1760763568788`,
      `${IK_BASE}/Tree%20plantation%20Drive/4.jpeg?updatedAt=1760763568788`,
      `${IK_BASE}/Tree%20plantation%20Drive/5.jpeg?updatedAt=1760763568788`,
      `${IK_BASE}/Tree%20plantation%20Drive/6.jpeg?updatedAt=1760763568788`,
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
  const [visible, setVisible] = useState(false);

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

        {/* ==== EVENT DISPLAY ==== */}
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

                  {/* === GALLERY BUTTON === */}
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

                  {/* === IMAGE GALLERY === */}
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
                              src={`${img}&tr=q-85`}
                              alt={`${selected.title}-${idx + 1}`}
                              width="100%"
                              style={{
                                display: "block",
                                width: "100%",
                                height: "auto",
                                objectFit: "contain",
                                borderRadius: 10,
                                background: "#f8fafc",
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
