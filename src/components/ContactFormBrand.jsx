"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Form, Input, message } from "antd";
import { Mail, Phone, MapPin, Send, Home, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const BRAND = "#07518a";
/** ⚠️ Replace with your real public logo URL */
const LOGO = "/highbtlogo tm (1).png";

/* ===== Motion helpers ===== */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
});
const stagger = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: { opacity: 0 },
};
const btnWhile = {
  whileHover: { scale: 1.03, y: -1 },
  whileTap: { scale: 0.98, y: 0 },
};

export default function ContactFormBrand() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);

    const serviceID = "service_octtqss";
    const templateID = "template_h9493t4";
    const publicKey = "58795tHcPT-Gj8W3F";

    const templateParams = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      title: "Website Enquiry",
      message: values.message,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        setSubmitted(true);
        message.success(
          "✅ Thank you for contacting Brihaspathi Technologies!"
        );
        form.resetFields();
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        message.error("❌ Failed to send message. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* subtle brand background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          background:
            "radial-gradient(600px 300px at 10% 5%, rgba(7,81,138,0.08), transparent), radial-gradient(600px 300px at 90% 95%, rgba(7,81,138,0.08), transparent)",
        }}
      />

      <AnimatePresence mode="wait">
        {!submitted ? (
          /* ===================== FORM ===================== */
          <motion.div
            key="contact-form"
            {...fadeUp(0)}
            className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:grid-cols-2"
          >
            {/* ========= Left Info ========= */}
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="relative p-8 md:p-10"
            >
              {/* Divider */}
              <div
                className="absolute inset-y-0 right-0 hidden w-px md:block"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, #e5e7eb, transparent)",
                }}
              />

              {/* Brand logo */}
              <motion.div variants={fadeUp(0)}>
                <img
                  src={LOGO}
                  alt="Brihaspathi Technologies"
                  className="h-10 w-auto mb-6 object-contain"
                />
              </motion.div>

              <motion.h2
                variants={fadeUp(0.03)}
                className="mb-2 text-4xl font-extrabold tracking-tight"
                style={{ color: BRAND, letterSpacing: "-0.01em" }}
              >
                Get in touch
              </motion.h2>

              <motion.p variants={fadeUp(0.06)} className="mb-8 text-gray-600">
                Have questions about our products or services? Fill out the form
                and our team will get back to you within one business day.
              </motion.p>

              <motion.div variants={stagger} className="space-y-5">
                {/* Email */}
                <motion.div
                  variants={fadeUp(0.08)}
                  className="flex items-start gap-4"
                >
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl bg-gray-50"
                    style={{ border: `1px solid ${BRAND}20` }}
                  >
                    <Mail style={{ color: BRAND }} />
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: BRAND }}
                    >
                      Email
                    </div>
                    <div className="text-gray-700">info@brihaspathi.com</div>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  variants={fadeUp(0.1)}
                  className="flex items-start gap-4"
                >
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl bg-gray-50"
                    style={{ border: `1px solid ${BRAND}20` }}
                  >
                    <Phone style={{ color: BRAND }} />
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: BRAND }}
                    >
                      Phone
                    </div>
                    <div className="text-gray-700">+91 98858 88835</div>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div
                  variants={fadeUp(0.12)}
                  className="flex items-start gap-4"
                >
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl bg-gray-50"
                    style={{ border: `1px solid ${BRAND}20` }}
                  >
                    <MapPin style={{ color: BRAND }} />
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: BRAND }}
                    >
                      Address
                    </div>
                    <div className="text-gray-700 leading-snug not-italic">
                      01, 508-510, Shangrila Plaza, Road No. 2, Park View
                      Enclave, Banjara Hills, Hyderabad, Telangana - 500034
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ========= Right Form ========= */}
            <motion.div
              className="p-8 md:p-10 bg-gray-50/50"
              variants={fadeUp(0.02)}
              initial="initial"
              animate="animate"
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                className="space-y-3"
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name!" },
                    { min: 3, message: "Name must be at least 3 characters." },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Your full name"
                    style={{
                      borderRadius: "12px",
                      borderColor: "#dcdcdc",
                      boxShadow: "none",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    {
                      type: "email",
                      message: "Please enter a valid email address.",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="you@example.com"
                    style={{
                      borderRadius: "12px",
                      borderColor: "#dcdcdc",
                      boxShadow: "none",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true, message: "Please enter your phone!" },
                    {
                      pattern: /^[6-9]\d{9}$/,
                      message: "Enter a valid 10-digit Indian phone number.",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="+91 98765 43210"
                    style={{
                      borderRadius: "12px",
                      borderColor: "#dcdcdc",
                      boxShadow: "none",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Message"
                  name="message"
                  rules={[
                    { required: true, message: "Please enter your message!" },
                    {
                      min: 10,
                      message: "Message should be at least 10 characters.",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={5}
                    placeholder="Tell us a bit about your query..."
                    style={{
                      borderRadius: "12px",
                      borderColor: "#dcdcdc",
                      boxShadow: "none",
                    }}
                  />
                </Form.Item>

                <Form.Item>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold shadow-md transition flex items-center justify-center gap-2"
                    style={{ backgroundColor: BRAND, color: "white" }}
                    {...btnWhile}
                  >
                    {loading ? "Sending..." : "Submit"}
                    <Send
                      className="transition group-hover:translate-x-0.5"
                      size={18}
                    />
                  </motion.button>
                </Form.Item>
              </Form>
            </motion.div>
          </motion.div>
        ) : (
          /* ===================== THANK YOU ===================== */
          <motion.div
            key="thank-you"
            {...fadeUp(0)}
            className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:grid-cols-2"
          >
            {/* Left: brand panel with logo + message */}
            <motion.div
              className="relative p-8 md:p-10 bg-gradient-to-br from-white to-gray-50"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              <motion.img
                variants={fadeUp(0)}
                src={LOGO}
                alt="Brihaspathi Technologies"
                className="h-10 w-auto mb-6 object-contain"
              />

              <motion.h2
                variants={fadeUp(0.03)}
                className="text-4xl font-extrabold tracking-tight"
                style={{ color: BRAND, letterSpacing: "-0.01em" }}
              >
                Thank you!
              </motion.h2>

              <motion.p
                variants={fadeUp(0.06)}
                className="mt-2 text-gray-600 max-w-md"
              >
                We’ve received your message. Our team will reach out shortly to
                understand your requirements and craft the best solution for
                you.
              </motion.p>

              <motion.div
                variants={fadeUp(0.12)}
                className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                <motion.button
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white shadow-md"
                  onClick={() => navigate("/")}
                  {...btnWhile}
                >
                  <Home size={18} />
                  Home
                </motion.button>

                <motion.button
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white shadow-md"
                  onClick={() => navigate("/founder")}
                  {...btnWhile}
                >
                  <UserRound size={18} />
                  Our Founder
                </motion.button>

                <motion.button
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-gray-800 ring-1 ring-gray-300 bg-white shadow-sm"
                  onClick={() => setSubmitted(false)}
                  {...btnWhile}
                >
                  Send another
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right: celebratory panel */}
            <motion.div
              className="relative p-8 md:p-10 bg-gray-50/60 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {/* animated glow */}
              <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background:
                    "radial-gradient(500px 250px at 30% 30%, rgba(7,81,138,0.10), transparent), radial-gradient(500px 250px at 70% 70%, rgba(7,81,138,0.10), transparent)",
                }}
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                className="text-center"
              >
                <motion.img
                  src={LOGO}
                  alt="Brihaspathi"
                  className="h-12 w-auto mx-auto mb-4 object-contain"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
                <motion.h3
                  className="text-2xl font-extrabold text-gray-900"
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.28 }}
                >
                  We’ll be in touch soon
                </motion.h3>
                <motion.p
                  className="mt-2 text-gray-600 max-w-sm mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  Thank you for choosing{" "}
                  <span style={{ color: BRAND, fontWeight: 700 }}>
                    Brihaspathi Technologies
                  </span>
                  . Together, let’s build secure, scalable, enterprise-ready
                  solutions.
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
