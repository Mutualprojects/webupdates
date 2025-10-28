import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bot, Send, Loader2, X, Globe } from "lucide-react";

const BRAND = "#07518a";
const BRAND_DARK = "#053a66";

// === API base ===
const CHAT_API = "https://chatbot-1-jwv1.onrender.com";

// === Animations ===
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

// === Safe HTML ===
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

// === Typing Animation ===
function TypeReveal({ text, speed = 15 }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) setDisplayed(text.slice(0, ++i));
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text]);
  return <span dangerouslySetInnerHTML={{ __html: safeHtml(displayed) }} />;
}

// === Typing Indicator ===
function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1">
      {[0, 150, 300].map((d, i) => (
        <div
          key={i}
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: `${d}ms` }}
        />
      ))}
      <span className="text-slate-400 text-sm ml-2">AI is typing...</span>
    </div>
  );
}

// === Main Component ===
export default function ChatPanel() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  const languages = [
    "English",
    "Hindi",
    "Telugu",
    "Tamil",
    "Malayalam",
    "Kannada",
    "Marathi",
    "Gujarati",
    "Bengali",
    "Punjabi",
    "Odia",
    "Urdu",
  ];

  // Session ID
  useEffect(() => {
    const id =
      localStorage.getItem("br_session_id") ||
      crypto.randomUUID?.() ||
      Math.random().toString(36).slice(2, 10);
    localStorage.setItem("br_session_id", id);
    setSessionId(id);
  }, []);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, [input]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, typing]);

  // ESC closes panel
  useEffect(() => {
    const key = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  // === Send message ===
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");

    const newHistory = [...history, { role: "user", content: text }];
    setHistory(newHistory);
    setSending(true);
    setTyping(true);

    try {
      // Send message + language info
      const { data } = await axios.post(`${CHAT_API}/chat`, {
        conversationId: sessionId,
        userText: `Translate and respond in ${language} language. User says: ${text}`,
        history: newHistory,
      });
      setHistory((h) => [
        ...h,
        { role: "assistant", content: data?.answer || "..." },
      ]);
    } catch (e) {
      setHistory((h) => [
        ...h,
        { role: "assistant", content: `⚠️ ${e.message}` },
      ]);
    } finally {
      setSending(false);
      setTyping(false);
    }
  };

  const clearChat = () => setHistory([]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full text-white font-semibold shadow-lg"
        style={{ background: BRAND }}
      >
        <Bot className="w-6 h-6 text-white" />
        <span className="hidden sm:block text-white">Brihaspathi Assist</span>
      </motion.button>

      {/* Chat Modal */}
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
                      Responding in <strong>{language}</strong>
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

              {/* Language Selector */}
              <div className="px-6 py-2 flex items-center justify-end gap-2 bg-slate-100 border-b">
                <Globe className="w-4 h-4 text-slate-600" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border border-slate-300 rounded-lg px-2 py-1 text-sm focus:ring-1 focus:ring-[#07518a] focus:border-[#07518a]"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-slate-50 to-indigo-50">
                {history.length === 0 && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-slate-700/60 text-slate-100 border border-slate-600/50 rounded-2xl px-4 py-3">
                      <TypeReveal text="Hello! Please select your preferred language and start chatting." />
                    </div>
                  </div>
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
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-slate-700/60 rounded-2xl px-4 py-3 border border-slate-600/50">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
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
                    placeholder={`Type in ${language} or English...`}
                    className="w-full min-h-[44px] max-h-[120px] resize-none rounded-xl border border-slate-300 px-4 py-3 pr-14 focus:outline-none focus:border-[#07518a] focus:ring-1 focus:ring-[#07518a]"
                    style={{ color: BRAND }}
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMessage}
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

                <div className="flex justify-between items-center">
                  <button
                    onClick={clearChat}
                    className="text-xs px-3 py-1 border rounded-lg hover:bg-slate-50"
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
