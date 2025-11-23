import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// Re-styled Wedding Guest Site — warm beige photography aesthetic
// Single-file React app (src/App.jsx). Keep react-router-dom & framer-motion installed.

// ---------- Theme tokens (new palette) ----------
const PALETTE = {
  background: "#f6eee8", // cream
  surface: "#fffdfb",
  accent: "#b18b73", // muted gold
  tan: "#e4d3c2",
  text: "#3a2f2b", // rich brown
  soft: "#a38873",
};

const PHOTOS = [
  "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1400&q=60",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=60",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=60",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1400&q=60",
  "https://images.unsplash.com/photo-1506086679525-1901c4b2a8e5?auto=format&fit=crop&w=1400&q=60",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=60",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=60",
  "https://images.unsplash.com/photo-1520975911685-8fcb2f3d6f3a?auto=format&fit=crop&w=1400&q=60",
];

const MENU_DATA = {
  Carnival: [
    { name: "Boho Salad with Toasted Seeds", type: "cuisine" },
    { name: "Street Pani Puri", type: "fastfood" },
    { name: "Mini Tacos", type: "fastfood" },
    { name: "Coconut Kulfi", type: "dessert" },
  ],
  Sangeet: [
    { name: "Charcoal Grilled Paneer", type: "cuisine" },
    { name: "Smoked Salmon Canapés", type: "cuisine" },
    { name: "Chocolate Cascade", type: "dessert" },
    { name: "Cocktail Mocktail Bar", type: "fastfood" },
  ],
  Mayra: [
    { name: "Traditional Mithai Platter", type: "dessert" },
    { name: "Samosa Chaat", type: "fastfood" },
    { name: "Tamarind Rice", type: "cuisine" },
  ],
  Reception: [
    { name: "Heritage Dal Makhani", type: "cuisine" },
    { name: "Slow-Cooked Rogan Josh", type: "cuisine" },
    { name: "Gulab Jamun Duo", type: "dessert" },
    { name: "Warm Bread Basket", type: "fastfood" },
  ],
};

// ---------- Utilities ----------
function useCountdown(targetISO) {
  const [t, setT] = useState(Math.max(0, new Date(targetISO).getTime() - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setT(Math.max(0, new Date(targetISO).getTime() - Date.now())), 1000);
    return () => clearInterval(id);
  }, [targetISO]);
  const days = Math.floor(t / (24 * 3600 * 1000));
  const hours = Math.floor((t / (3600 * 1000)) % 24);
  const minutes = Math.floor((t / (60 * 1000)) % 60);
  const seconds = Math.floor((t / 1000) % 60);
  return { days, hours, minutes, seconds, ms: t };
}

// ---------- Small UI primitives ----------
// Make the site full-bleed while keeping comfortable inner padding.
const Container = ({ children }) => (
  <div className="container">{children}</div>
);

const Card = ({ children, style, className = '' }) => (
  <motion.div className={`card ${className}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ ...style }}>{children}</motion.div>
);

// ---------- Components (with new theme) ----------
function Header({ onOpen }) {
  return (
    <header className="header">
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div className="brand">
              <div className="logo">
                <img src="/images/logo.jpeg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '999px' }} />
              </div>
              <div>
                <div style={{ fontSize: 18 }}>Piyush <span style={{ color: PALETTE.accent }}>♥</span> Dhawal</div>
                <div className="muted" style={{ fontSize: 12 }}>February 9–10, 2026 · Pushkar</div>
              </div>
            </div>
          </div>

          <nav className="main-nav">
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
              <Link to="/" className="nav-link">Home</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
              <Link to="/directions" className="nav-link">Directions</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
              <Link to="/menu" className="nav-link">Menu</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
              <Link to="/itinerary" className="nav-link">Itinerary</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
              <Link to="/gallery" className="nav-link">Gallery</Link>
            </motion.div>

            <button className="mobile-button" onClick={onOpen} aria-label="open menu" style={mobileButtonStyle}>☰</button>
          </nav>
        </div>
      </Container>
    </header>
  );
}

const navLinkStyle = { textDecoration: 'none', color: PALETTE.text, padding: '8px 10px', borderRadius: 8, fontSize: 14 };
const mobileButtonStyle = { padding: '8px 10px', borderRadius: 8, background: PALETTE.tan, border: 'none', color: PALETTE.text };

function MobileDrawer({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 40 }} onClick={onClose} />
          <motion.aside initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }} style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 300, background: PALETTE.background, zIndex: 50, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18 }}>Menu</div>
              <button onClick={onClose} style={{ background: 'transparent', border: 0, fontSize: 20 }}>✕</button>
            </div>
            <nav style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/" onClick={onClose} style={{ color: PALETTE.text }}>Home</Link>
              <Link to="/directions" onClick={onClose} style={{ color: PALETTE.text }}>Directions</Link>
              <Link to="/menu" onClick={onClose} style={{ color: PALETTE.text }}>Menu</Link>
              <Link to="/itinerary" onClick={onClose} style={{ color: PALETTE.text }}>Itinerary</Link>
              <Link to="/gallery" onClick={onClose} style={{ color: PALETTE.text }}>Gallery</Link>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function AmbientBackground({ accent }) {
  const sparkles = Array.from({ length: 12 }).map((_, i) => ({ id: i, left: Math.random() * 100, top: Math.random() * 100, size: Math.random() * 8 + 3, delay: Math.random() * 5, duration: Math.random() * 8 + 6 }));
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {sparkles.map((s) => (
        <motion.div key={s.id} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: [0, 0.75, 0], y: [0, -30, 0], scale: [0.8, 1.1, 0.8] }} transition={{ repeat: Infinity, duration: s.duration, delay: s.delay, ease: 'easeInOut' }} style={{ position: 'absolute', left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, borderRadius: 999, background: accent, filter: 'blur(6px)' }} />
      ))}
    </div>
  );
}

// ---------- Pages (re-skinned) ----------
function Hero() {
  // Target: Feb 10, 2026 11:00 PM IST (UTC+05:30)
  // Use explicit offset so Date parsing respects IST regardless of the client's timezone
  const countdown = useCountdown('2026-02-10T23:00:00+05:30');
  return (
    <section style={{ background: PALETTE.background, padding: '48px 0 32px 0', position: 'relative' }}>
      <AmbientBackground accent={PALETTE.accent} />
      <Container>
  <div className="hero-grid" style={{ display: 'grid', gap: 24, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <motion.img className="hero-main" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} src={PHOTOS[1]} alt="hero-main" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }} />
            <motion.img className="hero-small" whileHover={{ scale: 1.03 }} initial={{ x: 40, y: -6, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }} src={PHOTOS[2]} alt="hero-small" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }} />
            <div style={{ position: 'absolute', left: 24, bottom: 40, background: PALETTE.surface, padding: 12, borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <div style={{ fontFamily: 'Great Vibes, cursive', fontSize: 28, color: PALETTE.text }}>Capturing the moments that captivate your heart</div>
            </div>
          </div>

          <div>
              <Card className="soft">
              <h1 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: 36, color: PALETTE.text }}>Piyush <span style={{ color: PALETTE.accent }}>♥</span> Dhawal</h1>
              <p style={{ marginTop: 8, color: PALETTE.soft, fontStyle: 'italic' }}>February 9–10, 2026 · Pushkar</p>

              <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{String(countdown.days).padStart(2, '0')}</div>
                  <div style={{ fontSize: 12, color: PALETTE.text }}>Days</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{String(countdown.hours).padStart(2, '0')}</div>
                  <div style={{ fontSize: 12, color: PALETTE.text }}>Hours</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{String(countdown.minutes).padStart(2, '0')}</div>
                  <div style={{ fontSize: 12, color: PALETTE.text }}>Minutes</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{String(countdown.seconds).padStart(2, '0')}</div>
                  <div style={{ fontSize: 12, color: PALETTE.text }}>Seconds</div>
                </div>
              </div>

              <p style={{ marginTop: 16, color: PALETTE.text }}>Join us for intimate ceremonies, joyful music and warm celebrations in Pushkar.</p>

              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <Link to="/menu" className="btn btn-primary">See Menu</Link>
                <a href="#" className="btn btn-ghost">Details</a>
              </div>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
              <motion.img className="side-image" whileHover={{ scale: 1.03 }} src={PHOTOS[3]} alt="side1" />
              <motion.img className="side-image" whileHover={{ scale: 1.03 }} src={PHOTOS[4]} alt="side2" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SectionIntro({ title, subtitle }) {
  return (
    <div style={{ background: PALETTE.background, padding: '28px 0' }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 style={{ margin: 0, fontFamily: 'Playfair Display, serif', color: PALETTE.text }}>{title}</h2>
          {subtitle && <p style={{ marginTop: 8, color: PALETTE.text }}>{subtitle}</p>}
        </motion.div>
      </Container>
    </div>
  );
}

function MenuPage() {
  const [fn, setFn] = useState('Carnival');
  const [filter, setFilter] = useState('all');
  const items = useMemo(() => {
    const list = MENU_DATA[fn] || [];
    return filter === 'all' ? list : list.filter((i) => i.type === filter);
  }, [fn, filter]);

  return (
    <div style={{ padding: '28px 0', background: PALETTE.background }}>
      <Container>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'Playfair Display, serif', color: PALETTE.text }}>Menu</h3>
              <div style={{ color: PALETTE.text, marginTop: 6 }}>Select function to view curated menu</div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              {['Carnival','Sangeet','Mayra','Reception'].map((f) => (
                <button key={f} onClick={() => setFn(f)} style={{ padding: '8px 12px', borderRadius: 999, background: fn === f ? PALETTE.accent : 'transparent', border: `1px solid ${PALETTE.tan}`, color: PALETTE.text }}>{f}</button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            {['all','cuisine','fastfood','dessert'].map((t) => (
              <button key={t} onClick={() => setFilter(t)} style={{ padding: '8px 12px', borderRadius: 999, background: filter === t ? PALETTE.tan : 'transparent', border: `1px solid ${PALETTE.tan}`, color: PALETTE.text }}>{t}</button>
            ))}
          </div>

          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
            {items.map((it, idx) => (
              <div key={idx} style={{ padding: 14, borderRadius: 10, background: PALETTE.surface, border: `1px solid ${PALETTE.tan}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: PALETTE.text }}>{it.name}</div>
                    <div style={{ fontSize: 13, color: PALETTE.text, opacity: 0.7 }}>{fn} • {it.type}</div>
                  </div>
                  <div style={{ width: 10, height: 10, borderRadius: 6, background: PALETTE.accent }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Container>
    </div>
  );
}

function ItineraryPage() {
  const schedule = [
    { name: 'Carnival', time: '2026-02-09 11:00–15:00', desc: 'Boho welcome & lunch' },
    { name: 'Sangeet', time: '2026-02-09 19:00–24:00', desc: 'Music, dance & sparkle' },
    { name: 'Mayra', time: '2026-02-10 10:00–15:00', desc: 'Family rituals and blessings' },
    { name: 'Reception', time: '2026-02-10 17:00–24:00', desc: 'Dinner & toasts' },
  ];

  return (
    <div style={{ padding: '28px 0', background: PALETTE.background }}>
      <Container>
        <div style={{ display: 'grid', gap: 12 }}>
          {schedule.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} style={{ padding: 16, borderRadius: 10, background: PALETTE.surface, border: `1px solid ${PALETTE.tan}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: PALETTE.text }}>{s.name}</div>
                  <div style={{ color: PALETTE.text, opacity: 0.75 }}>{s.time}</div>
                  <div style={{ marginTop: 8, color: PALETTE.text, opacity: 0.8 }}>{s.desc}</div>
                </div>
                <div>
                  <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" style={{ color: PALETTE.accent }}>Get directions →</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

function GalleryPage({ onOpen }) {
  return (
    <div style={{ padding: '28px 0', background: PALETTE.background }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {PHOTOS.map((p, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} style={{ borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }} onClick={() => onOpen(i)}>
              <motion.img className="gallery-img" src={p} alt={`photo-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.04 }} />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

// RSVP removed — page intentionally deleted

// Directions page included to avoid missing reference
function DirectionsPage() {
  return (
    <div style={{ padding: '28px 0', background: PALETTE.background }}>
      <Container>
        <Card>
          <h3 style={{ margin: 0, fontFamily: 'Playfair Display, serif', color: PALETTE.text }}>Directions</h3>
          <p style={{ color: PALETTE.text, marginTop: 8 }}>Map placeholder — open in Google Maps for full directions.</p>
          <div style={{ marginTop: 12 }}>
            <iframe
              title="Pushkar map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.6975405075393!2d74.554301!3d26.489769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396be6d3ac4b0bfb%3A0x75f2a6a69aaf3c17!2sPushkar%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1678456423450!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: 8 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </Card>
      </Container>
    </div>
  );
}

// ---------- App (routing + drawer + lightbox) ----------
export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lightbox, setLightbox] = useState(-1);

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: PALETTE.background, color: PALETTE.text, fontFamily: "'Lora', 'Georgia', serif", paddingBottom: 96 }}>
        <Header onOpen={() => setDrawerOpen(true)} />
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        <Routes>
          <Route path="/" element={<>
            <Hero />
            <SectionIntro title="Our Story" subtitle="Because beautiful moments pass & imagery lasts." />
            <HomeContent onOpenLightbox={(i) => setLightbox(i)} />
          </>} />
          <Route path="/directions" element={<DirectionsPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/gallery" element={<GalleryPage onOpen={(i) => setLightbox(i)} />} />
        </Routes>

        <AnimatePresence>
          {lightbox >= 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 80, display: 'grid', placeItems: 'center' }} onClick={() => setLightbox(-1)}>
              <img src={PHOTOS[lightbox]} alt="lightbox" style={{ maxWidth: '95%', maxHeight: '90%', borderRadius: 10 }} />
            </motion.div>
          )}
        </AnimatePresence>

  <footer className="footer-fixed">© 2026 Piyush & Dhawal — Pushkar</footer>
      </div>
    </BrowserRouter>
  );
}

function HomeContent({ onOpenLightbox }) {
  return (
    <main>
      <section style={{ padding: '32px 0', background: PALETTE.background }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18 }}>
            <div>
              <Card style={{ overflow: 'hidden' }}>
                <img src={PHOTOS[5]} alt="story" style={{ width: '100%', height: 420, objectFit: 'cover', borderRadius: 8 }} />
                <div style={{ paddingTop: 12 }}>
                  <h3 style={{ margin: 0, fontFamily: 'Playfair Display, serif' }}>Christ Anna Photography</h3>
                  <p style={{ color: PALETTE.text, opacity: 0.8, marginTop: 8 }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </Card>
            </div>

            <div>
              <Card>
                <h4 style={{ margin: 0, fontFamily: 'Playfair Display, serif' }}>Ready for an Adventure ?</h4>
                <p style={{ color: PALETTE.text, opacity: 0.85 }}>View All Packages</p>
                <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <img src={PHOTOS[6]} alt="pack1" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
                    <img src={PHOTOS[2]} alt="pack2" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
                  </div>
                  <img src={PHOTOS[3]} alt="pack3" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

const Itinerary = () => {
  const events = [
    {
      date: "9th February, 2026",
      items: [
        { time: "8:00 AM", title: "Welcome", image: "/images/welcome.png" },
        { time: "9:00 AM", title: "Breakfast", image: "/images/breakfast.png" },
        { time: "11:00 AM", title: "Carnival", image: "/images/carnival.png" },
        { time: "4:00 PM", title: "High Tea", image: "/images/tea.png" },
        { time: "7:00 PM", title: "Sangeet", image: "/images/sangeet.png" },
      ],
    },
    {
      date: "10th February, 2026",
      items: [
        { time: "8:00 AM", title: "Breakfast", image: "/images/breakfast.png" },
        { time: "10:00 AM", title: "Mayra", image: "/images/mayra.png" },
        { time: "4:00 PM", title: "High Tea", image: "/images/tea.png" },
        { time: "5:30 PM", title: "Baarat", image: "/images/baraat.png" },
        { time: "7:00 PM", title: "Reception", image: "/images/reception.png" },
        { time: "11:00 PM", title: "Phere", image: "/images/phere.png" },
      ],
    },
  ];

  return (
    <section id="itinerary" className="py-16 bg-[#fffaf2] text-dark">
      <motion.h2
        className="text-4xl font-bold text-center text-[#c19a6b] mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Wedding Itinerary
      </motion.h2>

      {events.map((day, index) => (
        <motion.div
          key={index}
          className="max-w-5xl mx-auto mb-16 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: index * 0.3 }}
        >
          {/* Date Title */}
          <h3 className="text-2xl text-center font-semibold text-[#a47c48] mb-10">
            {day.date}
          </h3>

          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#e8d8b0] h-full rounded-full"></div>

          {/* Timeline Events */}
          <div className="space-y-16 relative z-10">
            {day.items.map((event, i) => (
              <motion.div
                key={i}
                className={`flex flex-col md:flex-row items-center ${
                  i % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse text-right md:text-left"
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                {/* Event Image */}
                <div className="flex-1 flex justify-center md:justify-end px-6">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-28 h-28 object-contain"
                    onError={(e) => (e.target.src = "/images/placeholder.png")}
                  />
                </div>

                {/* Connector Dot */}
                <div className="w-6 h-6 bg-[#c19a6b] rounded-full border-4 border-[#fffaf2] shadow-md"></div>

                {/* Text */}
                <div className="flex-1 px-6">
                  <h4 className="text-2xl font-bold text-[#a47c48] uppercase">
                    {event.title}
                  </h4>
                  <p className="text-md text-[#7a5e3c] mt-1">{event.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
};
