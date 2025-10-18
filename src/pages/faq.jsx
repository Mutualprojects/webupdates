import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Link as LinkIcon, Check } from "lucide-react";

/* =========================
   BRAND CONFIG
========================= */
const BRAND = "#07518a";
const BRAND_TINT = "#0a6ab8";

/* =========================
   FAQ CONTENT
========================= */
const FAQS = [
  {
    id: "services",
    q: "What services does Brihaspathi Technologies Limited offer?",
    a: "BTL offers a wide range of services including CCTV surveillance systems, video analytics, IoT solutions, software development, solar energy systems, EPABX/IP PBX systems, biometric devices, GPS tracking solutions, and custom automation services for various industries.",
  },
  {
    id: "experience",
    q: "Is Brihaspathi Technologies Limited experienced in handling large-scale government and corporate projects?",
    a: "Yes, Brihaspathi Technologies has successfully executed over 18,000+ projects across India, including large-scale implementations for government departments, defense, public sector units, and private enterprises.",
  },
  {
    id: "support",
    q: "Do you provide after-sales support and maintenance for your products?",
    a: "Absolutely. We offer comprehensive after-sales support including regular maintenance, technical assistance, and upgrades to ensure seamless operation of our products and systems.",
  },
  {
    id: "customization",
    q: "Can Brihaspathi Technologies customize software and hardware solutions for specific business needs?",
    a: "Yes, we specialize in providing tailor-made software and hardware solutions to meet the unique requirements of different industries including education, healthcare, manufacturing, real estate, and agriculture.",
  },
  {
    id: "locations",
    q: "Where are your service locations and offices located?",
    a: "Brihaspathi Technologies has a strong presence with offices and service teams across major cities in India including Hyderabad, Bengaluru, Chennai, Delhi, Mumbai, and more, enabling prompt support and service delivery.",
  },
  {
    id: "quote-demo",
    q: "How can I get a quote or schedule a demo for your products and solutions?",
    a: "You can request a quote or schedule a product demo by visiting our official website www.brihaspathi.com, calling our customer support, or filling out the inquiry form online. Our team will connect with you promptly.",
  },
];

/* =========================
   COMPONENT
========================= */
export default function FAQ() {
  const [openIds, setOpenIds] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const toggleItem = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const expandAll = () => setOpenIds(FAQS.map((f) => f.id));
  const collapseAll = () => setOpenIds([]);

  const copyLink = useCallback((id) => {
    const href = `${window.location.origin}/faq#${id}`;
    navigator.clipboard.writeText(href).then(() => {
      window.history.replaceState(null, "", `#${id}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  }, []);

  const allOpen = openIds.length === FAQS.length;

  /* ========== RENDER ========== */
  return (
    <main className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* ================= HERO ================= */}
      <section
        className="relative w-full text-center text-white py-20 md:py-28"
        style={{
          background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_TINT} 100%)`,
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white/90 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
          >
            Find quick answers about our products, services, and support
            offerings at Brihaspathi Technologies Limited.
          </motion.p>
        </div>

        {/* wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[80px] fill-gray-50"
          >
            <path d="M321.39,56.44c58.69,10.79,117.38,21.57,175.78,22.54,58.4.97,117.29-8.93,175.78-20.23C731.44,47.45,790.33,33,848.72,33.67c58.39.66,117.28,14.11,175.78,24.9,58.49,10.79,117.38,18.69,175.78,17.05V120H0V81.69C58.69,70.9,117.38,45.65,175.78,42.05S262.7,45.65,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* ================= CONTROLS ================= */}
      <div className="max-w-6xl mx-auto flex items-center justify-between py-5 px-6 bg-white shadow-sm rounded-xl -mt-10 z-10 relative border border-gray-200">
        <p className="text-sm text-gray-600">
          Total FAQs:{" "}
          <span className="font-semibold text-gray-900">{FAQS.length}</span>
        </p>
        <button
          onClick={allOpen ? collapseAll : expandAll}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-800 bg-white hover:bg-gray-50 transition-colors"
        >
          {allOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {allOpen ? "Collapse All" : "Expand All"}
        </button>
      </div>

      {/* ================= FAQ LIST ================= */}
      <section className="max-w-6xl mx-auto w-full px-6 py-12 space-y-6">
        {FAQS.map((item, i) => {
          const isOpen = openIds.includes(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300"
              style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.04)" }}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-start gap-4 text-left px-6 py-5 focus:outline-none"
              >
                <div
                  className={`mt-1 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="text-gray-500" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {item.q}
                </h3>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">{item.a}</p>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => copyLink(item.id)}
                          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-[color:var(--brand)] transition-colors"
                          style={{ ["--brand"]: BRAND }}
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check size={14} />
                              Copied
                            </>
                          ) : (
                            <>
                              <LinkIcon size={14} />
                              Copy Link
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </section>

      {/* ================= CTA SECTION ================= */}
      <section
        className="relative py-16 text-center text-white"
        style={{
          background: `linear-gradient(135deg, ${BRAND_TINT}, ${BRAND})`,
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Still have questions?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-white/90 text-lg max-w-2xl mx-auto mb-8"
        >
          Connect with our experts for detailed information about our products,
          services, or enterprise partnerships.
        </motion.p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/contact"
            className="px-6 py-3 bg-white text-[color:var(--brand)] font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all"
            style={{ ["--brand"]: BRAND }}
          >
            Contact Us
          </a>
          <a
            href="/contact"
            className="px-6 py-3 border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all"
          >
            Schedule a Demo
          </a>
        </div>
      </section>
    </main>
  );
}
