import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bot, Send, Loader2, X } from "lucide-react";

// ========= BRAND COLORS =========
const BRAND = "#07518a";
const BRAND_DARK = "#053a66";

// ========= API ENDPOINTS =========
const CHAT_API = import.meta.env.VITE_CHAT_API || "http://localhost:8787";
const APP_API = import.meta.env.VITE_APP_API || "http://localhost:8788";

// ========= ANIMATIONS =========
const fadeVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const sheetVariant = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } },
};

const messageVariant = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// ========= HELPERS =========
const safeHtml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(
      /(https?:\/\/[^\s)]+)(?=\)|\s|$)/g,
      `<a href="$1" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline" style="color:#60a5fa">$1</a>`
    );

// ========= TYPE REVEAL =========
function TypeReveal({ text, speed = 15 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span dangerouslySetInnerHTML={{ __html: safeHtml(displayedText) }} />;
}

// ========= TYPING INDICATOR =========
function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1">
      <div className="flex space-x-1">
        <div
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <span className="text-slate-400 text-sm ml-2">AI is typing...</span>
    </div>
  );
}

// ========= MAIN CHAT PANEL =========
export default function ChatPanel() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [open, setOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  // product & service forms
  const [productForm, setProductForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    productName: "",
    quantity: 1,
  });
  const [serviceForm, setServiceForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    serviceName: "",
    quantity: 1,
  });

  const chatRef = useRef(null);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  // ========= Session Setup =========
  useEffect(() => {
    const id =
      localStorage.getItem("br_session_id") ||
      (crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2, 18));
    localStorage.setItem("br_session_id", id);
    setSessionId(id);
  }, []);

  // ========= Textarea Resize =========
  useEffect(() => {
    if (textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, [input]);

  // ========= Auto Scroll =========
  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [history, typing, activeForm]);

  // ========= ESC to close =========
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ========= SEND MESSAGE =========
  const sendMessage = async (text) => {
    const content = (text ?? input).trim();
    if (!content || sending) return;
    if (!text) setInput("");

    const newHistory = [...history, { role: "user", content }];
    setHistory(newHistory);
    setSending(true);
    setTyping(true);

    try {
      const { data } = await axios.post(`${CHAT_API}/chat`, {
        conversationId: sessionId,
        userText: content,
        history: newHistory,
      });
      const answer = String(data?.answer || "I received your message!");
      setHistory((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (err) {
      setHistory((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${err.message}` },
      ]);
    } finally {
      setSending(false);
      setTyping(false);
    }
  };

  // ========= SUBMIT LEAD =========
  const submitLead = async (payload) => {
    try {
      await axios.post(`${APP_API}/api/leads`, payload);
      return true;
    } catch (error) {
      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Submit failed. Please try again later.",
        },
      ]);
      return false;
    }
  };

  // ========= FORM HANDLERS =========
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const { name, email, address, phone, productName, quantity } = productForm;
    if (!name || !email || !address || !phone || !productName)
      return alert("Please fill all fields");
    const payload = {
      type: "product",
      name,
      email,
      phone,
      productInquiry: {
        product: productName,
        quantity,
        notes: `Address: ${address}`,
      },
    };
    const success = await submitLead(payload);
    if (success) {
      setHistory((p) => [
        ...p,
        {
          role: "assistant",
          content: "✅ Product enquiry submitted successfully.",
        },
      ]);
      await sendMessage(`Product enquiry for ${productName}, qty ${quantity}.`);
      setActiveForm(null);
      setProductForm({
        name: "",
        email: "",
        address: "",
        phone: "",
        productName: "",
        quantity: 1,
      });
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    const { name, email, address, phone, serviceName, quantity } = serviceForm;
    if (!name || !email || !address || !phone || !serviceName)
      return alert("Please fill all fields");
    const payload = {
      type: "service",
      name,
      email,
      phone,
      serviceRequest: {
        service: serviceName,
        details: `Address: ${address} | Qty: ${quantity}`,
      },
    };
    const success = await submitLead(payload);
    if (success) {
      setHistory((p) => [
        ...p,
        {
          role: "assistant",
          content: "✅ Service request submitted successfully.",
        },
      ]);
      await sendMessage(`Service enquiry for ${serviceName}.`);
      setActiveForm(null);
      setServiceForm({
        name: "",
        email: "",
        address: "",
        phone: "",
        serviceName: "",
        quantity: 1,
      });
    }
  };

  const clearChat = () => setHistory([]);

  // ========= RENDER =========
  return (
    <>
      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full text-white font-semibold shadow-lg"
        style={{ background: BRAND }}
      >
        <Bot className="w-6 h-6" />
        <span className="hidden sm:block text-white">Chat</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            {...fadeVariant}
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setOpen(false)}
            />
            <motion.div
              {...sheetVariant}
              className="relative w-full max-w-2xl h-[70vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="px-6 py-4 text-white flex items-center justify-between"
                style={{
                  background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
                }}
              >
                <div className="flex items-center gap-3">
                  <Bot className="w-8 h-8" />
                  <div>
                    <h2 className="font-semibold text-lg">AI Assistant</h2>
                    <p className="text-sm opacity-90">
                      How can I help you today?
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={chatRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-slate-50 to-indigo-50"
              >
                {history.length === 0 && !activeForm && (
                  <motion.div
                    variants={messageVariant}
                    initial="initial"
                    animate="animate"
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-slate-700/60 text-slate-100 border border-slate-600/50 rounded-2xl px-4 py-3">
                      <TypeReveal text="Hello! I'm your AI assistant. How can I assist you today?" />
                    </div>
                  </motion.div>
                )}

                {history.map((msg, i) => (
                  <motion.div
                    key={i}
                    variants={messageVariant}
                    initial="initial"
                    animate="animate"
                    className={`flex items-start gap-3 ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        msg.role === "user"
                          ? "text-white"
                          : "bg-slate-700 text-white"
                      }`}
                      style={msg.role === "user" ? { background: BRAND } : {}}
                    >
                      {msg.role === "user" ? (
                        <User className="w-5 h-5" />
                      ) : (
                        <Bot className="w-5 h-5" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                        msg.role === "user"
                          ? "text-white rounded-tr-none"
                          : "bg-slate-700/60 text-slate-100 border border-slate-600/50 rounded-tl-none"
                      }`}
                      style={msg.role === "user" ? { background: BRAND } : {}}
                    >
                      {msg.role === "user" ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: safeHtml(msg.content),
                          }}
                        />
                      ) : (
                        <TypeReveal text={msg.content} />
                      )}
                    </div>
                  </motion.div>
                ))}

                {typing && (
                  <motion.div
                    variants={messageVariant}
                    initial="initial"
                    animate="animate"
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-slate-700/60 rounded-2xl px-4 py-3 border border-slate-600/50">
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-200 p-4 bg-white">
                <div className="relative mb-3">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full min-h-[44px] max-h-[120px] resize-none rounded-xl border border-slate-300 px-4 py-3 pr-14 focus:outline-none focus:border-[#07518a] focus:ring-1 focus:ring-[#07518a]"
                    style={{ color: BRAND }}
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sendMessage()}
                    disabled={sending || !input.trim()}
                    className={`absolute right-2 bottom-2 w-10 h-10 rounded-lg flex items-center justify-center ${
                      sending || !input.trim() ? "bg-slate-300" : "text-white"
                    }`}
                    style={{
                      background: sending || !input.trim() ? undefined : BRAND,
                    }}
                  >
                    {sending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveForm("product")}
                    className="px-4 py-2 text-sm border rounded-lg hover:bg-slate-50"
                    style={{ borderColor: BRAND, color: BRAND }}
                  >
                    Product Enquiry
                  </button>
                  <button
                    onClick={() => setActiveForm("service")}
                    className="px-4 py-2 text-sm border rounded-lg hover:bg-slate-50"
                    style={{ borderColor: BRAND, color: BRAND }}
                  >
                    Service Enquiry
                  </button>
                  <button
                    onClick={clearChat}
                    className="ml-auto text-xs px-3 py-1 border rounded-lg hover:bg-slate-50"
                    style={{ borderColor: BRAND, color: BRAND }}
                  >
                    Clear Chat
                  </button>
                  <span className="text-xs text-slate-500">
                    Session: <code>{sessionId.slice(0, 8)}...</code>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
