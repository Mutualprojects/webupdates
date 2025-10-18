import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const LAYERS = ["#B19EEF", "#5227FF"];
const BRAND = "#07518a";

export default function MobileStaggeredMenu({ menu }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const containerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 20 },
    },
    exit: { x: "100%", transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  return (
    <>
      {/* ======= Menu Button ======= */}
      <button
        onClick={toggleMenu}
        className="fixed right-5 top-5 z-[70] flex items-center gap-2 rounded-md border border-white/40 bg-black/40 px-4 py-2 text-white backdrop-blur-md lg:hidden"
      >
        <motion.span
          key={open ? "close" : "menu"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-medium"
        >
          {open ? "Close" : "Menu"}
        </motion.span>

        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: open ? 45 : 0 }}
          className="relative h-[14px] w-[14px]"
        >
          <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-white" />
          <span
            className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-white transition-transform duration-300 ${
              open ? "rotate-90" : ""
            }`}
          />
        </motion.div>
      </button>

      {/* ======= Overlay & Menu ======= */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dim Background */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* Colored Layers */}
            {LAYERS.map((color, i) => (
              <motion.div
                key={i}
                className="fixed right-0 top-0 z-[61] h-full w-[80%] md:w-[50%]"
                style={{ backgroundColor: color }}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Menu Panel */}
            <motion.nav
              className="fixed right-0 top-0 z-[65] h-full w-[80%] md:w-[50%] overflow-y-auto rounded-l-2xl bg-white shadow-2xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b px-5 py-4">
                <span
                  className="text-lg font-semibold text-gray-900"
                  style={{ color: BRAND }}
                >
                  Menu
                </span>
                <button
                  onClick={toggleMenu}
                  className="rounded-md p-2 hover:bg-gray-100"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="px-5 py-6">
                {menu.map((m, idx) => (
                  <motion.div
                    key={m.label}
                    custom={idx}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="mb-2"
                  >
                    <Link
                      to={m.to || "#"}
                      className="block rounded-md px-2 py-3 text-[1.05rem] font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={toggleMenu}
                    >
                      {m.label}
                    </Link>

                    {m.submenu && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="ml-3 mt-1 border-l-2 border-gray-100 pl-3"
                      >
                        {m.submenu.map((s) => (
                          <Link
                            key={s.to}
                            to={s.to}
                            className="block rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={toggleMenu}
                          >
                            {s.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Footer / Social */}
              <div className="border-t px-5 py-4">
                <p className="text-sm text-gray-500">© Brihaspathi 2025</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
