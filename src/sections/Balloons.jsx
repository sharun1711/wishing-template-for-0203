import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playPop } from "../utils/sound.js";
import SectionFrame from "../components/SectionFrame.jsx";
import { birthday } from "../config/birthday.js";

export default function Balloons() {
  const balloons = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i, wish: birthday.balloonWishes[i % birthday.balloonWishes.length],
    color: ["pink", "wine", "gold", "plum"][i % 4],
    left: `${5 + (i * 23) % 88}%`, delay: `${(i % 6) * .7}s`, duration: `${8 + (i % 5) * 1.4}s`
  })), []);
  const [popped, setPopped] = useState([]);
  const [message, setMessage] = useState("");
  function pop(balloon) {
    if (popped.includes(balloon.id)) return;
    setPopped(p => [...p, balloon.id]); setMessage(balloon.wish); playPop();
  }
  return <SectionFrame eyebrow="CHAPTER 03 · POP A LITTLE JOY" title="Catch a birthday wish"
    subtitle="Tap the floating balloons. Each one is carrying a little note for you.">
    <div className="balloon-game">
      <div className="game-score"><span>WISHES FOUND</span><strong>{popped.length.toString().padStart(2,"0")} <i>/ 12</i></strong></div>
      {balloons.map(b => !popped.includes(b.id) && <motion.button key={b.id} className={`balloon ${b.color}`}
        style={{ left: b.left, "--delay": b.delay, "--duration": b.duration }}
        initial={{ y: 250, opacity: 0 }} animate={{ y: [20, -14, 20], opacity: 1 }}
        transition={{ y: { duration: Number(b.duration.replace("s","")), repeat: Infinity, ease: "easeInOut", delay: Number(b.delay.replace("s","")) }, opacity: { duration: .5 } }}
        whileTap={{ scale: .78 }} onClick={() => pop(b)} aria-label="Pop balloon to reveal a wish">
        <i /><span />
      </motion.button>)}
      <AnimatePresence mode="wait">{message && <motion.div className="wish-toast" key={message}
        initial={{ opacity: 0, scale: .8, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
        <b>♡</b><p>{message}</p><button onClick={() => setMessage("")}>Lovely ✦</button>
      </motion.div>}</AnimatePresence>
      {popped.length === 12 && <div className="all-popped">You found every wish. Keep them all close. ♡</div>}
    </div>
    <p className="helper-note">A little sound plays when a balloon pops. Your browser may ask for an interaction first.</p>
  </SectionFrame>;
}
