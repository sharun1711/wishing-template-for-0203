import React, { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Heart } from "lucide-react";
import Confetti from "../components/Confetti.jsx";
import Particles from "../components/Particles.jsx";
import { birthday } from "../config/birthday.js";

export default function Finale({ onReplay }) {
 
  return <main className="finale-screen">
    <Particles count={48} /><Confetti amount={72} />
    <motion.div className="finale-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>
      <p className="eyebrow"><Heart size={13} fill="currentColor" /> THIS MOMENT IS YOURS</p>
      <h1>HAPPY<br /><em>BIRTHDAY</em></h1>
      <p className="finale-name">{birthday.name}</p>
      <div className="gallery-grid">
        {birthday.gallery.map((photo, i) => <figure key={photo.src} className={`gallery-photo photo-${i+1}`}>
          <img src={photo.src} alt={photo.caption} onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.classList.add("gallery-fallback"); }} />
          <figcaption>{photo.caption}</figcaption>
        </figure>)}
      </div>
      <p className="final-message">{birthday.finalMessage}</p>
      <div className="final-actions">
        <button className="primary-button" onClick={onReplay}><RotateCcw size={16} /> Replay the magic</button>
      </div>
      <p className="tiny-note">A LITTLE UNIVERSE, MADE JUST FOR YOU ✦</p>
    </motion.div>
  </main>;
}
