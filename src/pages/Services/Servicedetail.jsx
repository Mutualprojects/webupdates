"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal, message } from "antd";
import { MENU_DATA } from "../../data/menuData";

/* ============================
   Brand
============================ */
const BRAND = "#07518a";

/* ============================
   Helper
============================ */
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ServiceDetailPage() {
  const { category, slug } = useParams();
  const navigate = useNavigate();

  const cat = MENU_DATA.services.find((c) => slugify(c.title) === category);
  const service = cat?.items.find((p) => slugify(p.label) === slug) || null;
  const services = cat?.items || [];
  const currentIndex = services.findIndex((p) => slugify(p.label) === slug);
  const prevService = services[currentIndex - 1];
  const nextService = services[currentIndex + 1];

  // Scroll animations
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Keep track of failed feature icon loads
  const [failedIcons, setFailedIcons] = useState([]);

  const handleImageError = (idx) => {
    setFailedIcons((prev) => [...prev, idx]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setFailedIcons([]); // reset when route changes
  }, [slug]);

  const handleSubmit = (values) => {
    message.success("Your enquiry has been submitted!");
    console.log("Enquiry Details:", values);
    form.resetFields();
    setIsModalVisible(false);
  };

  if (!service) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Service not found
        </h2>
        <Link
          to="/services"
          className="mt-4 inline-block text-[var(--brand)] underline"
          style={{ "--brand": BRAND }}
        >
          ← Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{ ["--brand"]: BRAND }}
    >
      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #064272, #07518a)" }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          {/* === LEFT: Image + Under-Image Prev/Next === */}
          <motion.div
            style={{ y: imageY }}
            className="flex flex-col items-center"
          >
            <div className="bg-white rounded-2xl shadow-2xl flex items-center justify-center h-80 sm:h-96 w-full max-w-md overflow-hidden">
              <img
                src={service.image}
                alt={service.label}
                className="h-full w-auto object-contain transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Under-image controls */}
            <div className="mt-6 w-full max-w-md px-2">
              <div className="flex items-center justify-between gap-3">
                <Button
                  size="large"
                  icon={<ArrowLeft />}
                  disabled={!prevService}
                  onClick={() =>
                    prevService &&
                    navigate(
                      `/services/${slugify(cat.title)}/${slugify(
                        prevService.label
                      )}`
                    )
                  }
                  className={`flex-1 font-semibold rounded-full ${
                    prevService
                      ? "bg-white text-[var(--brand)] border-white hover:!bg-[var(--brand)] hover:!text-white"
                      : "bg-white/60 text-white/70 border-white/30 cursor-not-allowed"
                  }`}
                  style={{ borderColor: "transparent" }}
                >
                  Previous
                </Button>

                <div className="px-3 py-2 rounded-full bg-white/15 border border-white/25 text-white text-sm font-medium">
                  {currentIndex + 1} / {services.length}
                </div>

                <Button
                  size="large"
                  icon={<ArrowRight />}
                  iconPosition="end"
                  disabled={!nextService}
                  onClick={() =>
                    nextService &&
                    navigate(
                      `/services/${slugify(cat.title)}/${slugify(
                        nextService.label
                      )}`
                    )
                  }
                  className={`flex-1 font-semibold rounded-full ${
                    nextService
                      ? "bg-white text-[var(--brand)] border-white hover:!bg-[var(--brand)] hover:!text-white"
                      : "bg-white/60 text-white/70 border-white/30 cursor-not-allowed"
                  }`}
                  style={{ borderColor: "transparent" }}
                >
                  Next
                </Button>
              </div>
            </div>

            {/* Back to Services */}
            <Link
              to="/services"
              className="mt-5 inline-flex items-center gap-2 text-white/90 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Services
            </Link>
          </motion.div>

          {/* === RIGHT: Text / Actions / Feature Icons === */}
          <motion.div style={{ y: textY }}>
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
              {service.label}
            </h1>
            <p className="mt-5 text-white/90 text-lg leading-relaxed">
              {service.description ||
                "Comprehensive service solutions engineered for reliability, scalability, and innovation."}
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Button
                size="large"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-white text-white hover:bg-white hover:text-[var(--brand)] font-semibold px-6 py-2 rounded-full"
              >
                View Key Features
              </Button>

              <Button
                type="primary"
                size="large"
                onClick={() => setIsModalVisible(true)}
                className="bg-white text-[var(--brand)] border-none font-semibold px-6 py-2 rounded-full hover:opacity-90"
              >
                Enquire Now
              </Button>
            </div>

            {/* Feature Icons Row (conditionally rendered) */}
            {service.featureIcons?.length > 0 && (
              <div className="flex flex-wrap gap-6 mt-14">
                {service.featureIcons.map((icon, i) => {
                  if (!icon || failedIcons.includes(i)) return null;
                  return (
                    <motion.img
                      key={i}
                      src={icon}
                      alt="feature-icon"
                      onError={() => handleImageError(i)}
                      className="h-12 w-12 md:h-14 md:w-14 object-contain bg-white rounded-xl p-2 shadow-md"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= KEY FEATURES ================= */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 border-l-4 border-[var(--brand)] pl-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Key Features
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {service.features?.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-2 transition"
            >
              {service.featureIcons?.[i] &&
                !failedIcons.includes(i) &&
                service.featureIcons[i] && (
                  <img
                    src={service.featureIcons[i]}
                    alt="feature"
                    onError={() => handleImageError(i)}
                    className="h-14 w-14 mb-4 object-contain"
                  />
                )}
              <h3 className="text-[var(--brand)] font-semibold text-lg">{f}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ENQUIRY MODAL ================= */}
      <Modal
        title={`Enquire About ${service.label}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            service: service.label,
            description: service.description || "",
          }}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input size="large" placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input size="large" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Enter your phone number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            ]}
          >
            <Input size="large" placeholder="Enter your phone number" />
          </Form.Item>
          <Form.Item label="Service" name="service">
            <Input size="large" disabled />
          </Form.Item>
          <Form.Item label="Message" name="description">
            <Input.TextArea
              rows={3}
              placeholder="Describe your requirement..."
            />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="bg-[var(--brand)] text-white font-semibold w-full mt-2"
            style={{ background: BRAND }}
          >
            Submit Enquiry
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
