import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift as GiftIcon, X, Sparkles } from "lucide-react";
import Confetti from "../components/Confetti.jsx";
import SectionFrame from "../components/SectionFrame.jsx";
import { birthday } from "../config/birthday.js";

export default function Gifts() {
  const [opened, setOpened] = useState(null);
  return <SectionFrame eyebrow="CHAPTER 01 · THREE LITTLE SECRETS" title="Choose your mystery gift"
    subtitle="There is something lovely tucked inside each one. Follow your curiosity.">
    <div className="gift-grid">
      {birthday.gifts.map((gift, i) => <motion.button key={gift.title} className="gift-card"
        whileHover={{ y: -9, rotate: i === 1 ? 0 : i === 0 ? -1 : 1 }} whileTap={{ scale: .97 }}
        onClick={() => setOpened(i)}>
        <span className="gift-number">{gift.eyebrow}</span>
        <div className={`gift-illustration gift-${i + 1}`}><div className="gift-box"><i /><b /><span /></div><Sparkles className="gift-spark" /></div>
        <strong>{gift.title}</strong><small>UNWRAP YOUR SURPRISE ↗</small>
      </motion.button>)}
    </div>
    <AnimatePresence>
      {opened !== null && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpened(null)}>
        <motion.div className="memory-modal" initial={{ y: 30, scale: .94 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} onClick={e => e.stopPropagation()}>
          <Confetti amount={24} />
          <button className="modal-close" onClick={() => setOpened(null)} aria-label="Close"><X /></button>
          <p className="eyebrow">{birthday.gifts[opened].eyebrow}</p>
          <h3>{birthday.gifts[opened].title}</h3>
          <div className="memory-image">
            <img src={birthday.gifts[opened].image} alt={birthday.gifts[opened].imageAlt}
              onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.classList.add("image-fallback"); }} />
            <span>♡</span>
          </div>
          <p>{birthday.gifts[opened].message}</p>
          <button className="text-button" onClick={() => setOpened(null)}>KEEP THIS CLOSE <span>✦</span></button>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </SectionFrame>;
}
