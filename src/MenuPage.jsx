import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { weddingMenus } from "./MenuData";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const card = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function getActiveEvent() {
  const now = Date.now();
  return weddingMenus.find(e => {
    const s = new Date(e.start).getTime();
    const en = new Date(e.end).getTime();
    return now >= s && now <= en;
  });
}

export default function MenuPage() {
  const event = useMemo(getActiveEvent, []);

  if (!event) {
    return (
      <div className="menu-empty">
        <h2>Menu will be available during the event 🍽️</h2>
      </div>
    );
  }

  return (
    <section className="menu-modern">
      {/* Header */}
      <motion.div
        className="menu-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>{event.title}</h1>
        <div className="menu-meta">
          <span>📍 {event.location}</span>
          <span>🕒 11:00 – 15:30</span>
        </div>
      </motion.div>

      {/* Menu Cards */}
      <motion.div
        className="menu-grid-modern"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {Object.entries(event.menu).map(([section, items]) => (
          <motion.div
            key={section}
            variants={card}
            whileHover={{ y: -6 }}
            className="menu-card-modern"
          >
            <h3>{section}</h3>
            <ul>
              {items.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
