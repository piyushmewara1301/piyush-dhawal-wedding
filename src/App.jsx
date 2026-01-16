import React, { useEffect, useState, useRef, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Countdown hook
function useCountdown(targetISO) {
  const [t, setT] = useState(new Date(targetISO).getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => {
      setT(new Date(targetISO).getTime() - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  return {
    days: Math.floor(t / (24 * 3600 * 1000)),
    hours: Math.floor((t / (3600 * 1000)) % 24),
    minutes: Math.floor((t / (60 * 1000)) % 60),
    seconds: Math.floor((t / 1000) % 60)
  };
}

// Coming Soon Page
function ComingSoon() {
  return (
    <div className="comingsoon-page">
      <div className="comingsoon-content">
        <h1>Coming Soon</h1>
        <p>We are working on this page. Stay tuned!</p>
      </div>
    </div>
  );
}

// HEADER
function Header({ onOpen }) {
  return (
    <header className="header-premium">
      <div className="header-inner">
        <div className="logo-group">
          <img src={`${process.env.PUBLIC_URL}/images/new-logo.jpeg`} className="logo-gold" alt="logo" />
          <h2 className="couple-name">Piyush ♥ Dhawal</h2>
        </div>

        <nav className="desktop-nav">
          {["Home", "Menu", "Itinerary", "Gallery", "Directions"].map((t) => (
            <Link
              key={t}
              className="nav-premium"
              to={t === "Home" ? "/" : "/" + t.toLowerCase()}
            >
              {t}
            </Link>
          ))}
        </nav>

        <button className="mobile-toggle" onClick={onOpen}>☰</button>
      </div>
    </header>
  );
}

// MOBILE DRAWER
function MobileDrawer({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="drawer-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="drawer-panel"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
          >
            {["Home", "Menu", "Itinerary", "Gallery", "Directions"].map((t) => (
              <Link
                key={t}
                className="drawer-link"
                to={t === "Home" ? "/" : "/" + t.toLowerCase()}
                onClick={onClose}
              >
                {t}
              </Link>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// HERO SECTION
function Hero() {
  const heroStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/cover_photo.png)`,
    backgroundSize: "cover",
    // backgroundPosition: "50% 10%",
    // backgroundAttachment: "fixed",
    height: "100vh",
    width: "100%",
    // position: "relative"
  };

  const { days, hours, minutes, seconds } = useCountdown(
    "2026-02-10T23:00:00+05:30"
  );

  return (
    <section className="hero-full" style={heroStyle}>
      <div className="hero-content">
        <h1 className="hero-title">
          Piyush <span>♥</span> Dhawal
        </h1>
        <p className="hero-date">February 9–10, 2026 · Pushkar</p>
        <div className="timer-wrapper">
          {[{ label: "Days", v: days }, { label: "Hours", v: hours },
            { label: "Minutes", v: minutes }, { label: "Seconds", v: seconds }].map((x) => (
            <div key={x.label} className="timer-box">
              <div className="timer-value">{String(x.v).padStart(2, "0")}</div>
              <div className="timer-label">{x.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// OUR STORY SECTION
function OurStorySection() {
  return (
    <section className="our-story-section">
      <motion.div
        className="gold-divider"
        initial={{ width: 0 }}
        whileInView={{ width: "120px" }}
        transition={{ duration: 0.8 }}
      />

      <motion.h2
        className="our-story-title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Story
      </motion.h2>

      <pre className="story-pre">
{`
Ten years ago, it started with a smile.
Just two people who didn’t know that life had already chosen them for each other.

What began as small conversations slowly turned into long nights filled with laughter, dreams, and silly arguments no one even remembers now. Over the years, they celebrated little victories, survived difficult days, stood by each other through every high and low, and kept choosing each other—every single time.

They grew up together.
They built their world together.
They became each other's safest place.

From surprise late-night calls to endless movie marathons, from travelling new places to learning from each other’s mistakes, from supporting crazy ambitions to fighting over food—every moment became a chapter in a story only they could write.

There were challenges too, of course.
Life tested them, distance tested them, time tested them.
But love stayed—kind, patient, and unshakably strong.

And now, after a beautiful decade of memories, they’re stepping into the next chapter… as partners for life.

The same smile that started everything ten years ago is still there—stronger, brighter, and filled with a promise.
A promise to keep growing together.
A promise to protect each other’s dreams.
A promise to love, always.

Ten years down, forever to go.
And finally… they’re getting married. ❤️
`}
      </pre>
    </section>
  );
}

// VIDEO CAROUSEL
function VideoCarousel() {
  const videos = useMemo(() => [
    { id: "eLxczJ3oNuM", caption: "Pre-Wedding Teaser" },
    { id: "9HxPM_nkXSA", caption: "35 Days To Go" },
    { id: "wekrB6k22zg", caption: "Milan Abhi Aadha Adhure hai" },
    { id: "Al-Yn35YBHk", caption: "45 Days To Go" },
    { id: "rKUio800zAU", caption: "Invitation Reveal" }
  ], []);

  const [index, setIndex] = useState(0);
  const scrollRef = useRef();

  const scrollToIndex = (i) => {
    setIndex(i);
    const container = scrollRef.current;
    const item = container.children[i];
    container.scrollTo({
      left: item.offsetLeft - container.offsetWidth / 2 + item.offsetWidth / 2,
      behavior: "smooth"
    });
  };

  useEffect(() => scrollToIndex(index), []);

  return (
    <section className="video-section">
      <motion.div
        className="gold-divider"
        initial={{ width: 0 }}
        whileInView={{ width: "120px" }}
        transition={{ duration: 0.8 }}
      />
      <motion.h2
        className="our-story-title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Wedding Videos
      </motion.h2>

      <div className="video-carousel" ref={scrollRef}>
        {videos.map((v, i) => {
          const isActive = i === index;
          const thumb = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;

          return (
            <motion.div
              key={i}
              className={`video-item ${isActive ? "active-video" : ""}`}
              onClick={() => scrollToIndex(i)}
              whileHover={{ scale: 1.05 }}
            >
              {isActive ? (
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  className="carousel-iframe"
                  allowFullScreen
                />
              ) : (
                <img src={thumb} className="carousel-thumb" alt={v.caption} />
              )}
              <p className="video-caption">{v.caption}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button onClick={() => scrollToIndex((index - 1 + videos.length) % videos.length)}>‹</button>
        <button onClick={() => scrollToIndex((index + 1) % videos.length)}>›</button>
      </div>
    </section>
  );
}

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <BrowserRouter basename="/piyush-dhawal-wedding">
      <Header onOpen={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Routes>
        <Route path="/" element={<><Hero /><OurStorySection /><VideoCarousel /></>} />
        <Route path="/menu" element={<ComingSoon />} />
        <Route path="/itinerary" element={<ComingSoon />} />
        <Route path="/gallery" element={<ComingSoon />} />
        <Route path="/directions" element={<ComingSoon />} />
      </Routes>

      <footer className="footer-premium">
        © 2026 Piyush & Dhawal — Pushkar
      </footer>
    </BrowserRouter>
  );
}