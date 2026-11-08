import React from "react";
import { motion } from "framer-motion";

export default function Confetti({ amount = 46 }) {
  return <div className="confetti-layer" aria-hidden="true">
    {Array.from({ length: amount }, (_, i) => <motion.i key={i}
      initial={{ y: -30, x: `${(i * 29) % 100}vw`, rotate: 0, opacity: 1 }}
      animate={{ y: "110vh", rotate: 720 + i * 9, opacity: 0 }}
      transition={{ duration: 2.4 + (i % 9) * .24, delay: (i % 13) * .06, ease: "easeIn" }}
      style={{ left: 0, background: ["#f5c98c", "#ff77a8", "#fff0df", "#c85a83"][i % 4] }} />)}
  </div>;
}
