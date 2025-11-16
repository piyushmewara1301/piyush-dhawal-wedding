import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function App() {
  const targetDate = new Date("2026-02-09T00:00:00");
  const [timeLeft, setTimeLeft] = useState({ days: '--', hours: '--', minutes: '--', seconds: '--' });
  const [theme, setTheme] = useState("rose");
  const audioRef = useRef(null);

  // Install / A2HS state
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIosModal, setShowIosModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, targetDate - now);
      setTimeLeft({
        days: Math.floor(diff / (1000*60*60*24)),
        hours: Math.floor((diff/(1000*60*60)) % 24),
        minutes: Math.floor((diff/(1000*60)) % 60),
        seconds: Math.floor((diff/1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function onBeforeInstall(e){
      e.preventDefault();
      setDeferredPrompt(e);
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
  }, []);

  // Try autoplay on mount; if blocked, show a hint so user can tap to enable
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // attach play/pause listeners to keep state in sync
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    // attempt muted autoplay (many browsers allow autoplay if muted)
    audio.muted = true;
    audio.play().then(() => {
      // playing but muted — treat as autoplay success
      setIsPlaying(true);
      setAutoplayBlocked(false);
    }).catch(() => {
      // autoplay blocked by browser
      setAutoplayBlocked(true);
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      // If audio is muted due to autoplay attempt, unmute on user gesture then play
      if (audio.muted) audio.muted = false;
      await audio.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
    } catch (err) {
      setAutoplayBlocked(true);
      console.warn('Autoplay blocked:', err);
    }
  };

  const pauseMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  };

  const themeClasses = {
    rose: "from-rose-50 to-red-100",
    gold: "from-yellow-50 to-yellow-200",
    lavender: "from-purple-50 to-purple-200"
  };

  async function handleInstallClick(){
    if(deferredPrompt){
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      // you can log or track choice.outcome
      setDeferredPrompt(null);
    } else {
      // show iOS instructions fallback
      setShowIosModal(true);
    }
  }

  return (
    <div className={"min-h-screen text-gray-800 bg-gradient-to-b " + themeClasses[theme]}>
  <audio ref={audioRef} src="/audio/sitar-serinity-255303.mp3" loop />

      <div className="p-6">
        <img src="/logo.jpeg" alt="logo" className="logo" />

        <h1 className="text-4xl font-bold text-center mb-4">Piyush ❤️ Dhawal</h1>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center text-3xl my-4">
          {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
        </motion.div>

        <div className="coming-soon">Coming soon</div>

        <div style={{ display:'flex', justifyContent:'center', gap:12, marginTop:20 }}>
          {/* Always show the button so users can click; fallback modal will appear if prompt isn't available */}
          <button className="install-btn" onClick={handleInstallClick}>Add to Home Screen</button>
        </div>

        <div className="flex justify-center gap-4 my-6">
          <button onClick={() => setTheme("rose")}>Rose</button>
          <button onClick={() => setTheme("gold")}>Gold</button>
          <button onClick={() => setTheme("lavender")}>Lavender</button>
        </div>

        <div className="flex justify-center gap-4 mt-6" style={{flexDirection:'column', alignItems:'center'}}>
          {autoplayBlocked && (
            <div style={{color:'#a38873', marginBottom:8}}>Audio autoplay was blocked — tap the button below to enable sound.</div>
          )}
          <div>
            <button onClick={() => isPlaying ? pauseMusic() : playMusic()} className="install-btn">
              {isPlaying ? 'Pause Music' : 'Play Music'}
            </button>
          </div>
        </div>
      </div>

      {showIosModal && (
        <div className="ios-modal">
          <div className="panel">
            <strong style={{display:'block', marginBottom:8}}>Add to Home Screen — iOS</strong>
            <ol style={{margin:'0 0 8px 18px'}}>
              <li>Tap the Share button at the bottom of Safari.</li>
              <li>Choose "Add to Home Screen" from the share sheet.</li>
              <li>Tap "Add" to install the shortcut.</li>
            </ol>
            <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
              <button className="install-btn" onClick={() => setShowIosModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}