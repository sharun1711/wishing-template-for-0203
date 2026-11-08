import React from "react";
import { motion } from "framer-motion";

export default function SectionFrame({ children, eyebrow, title, subtitle, id }) {
  return <motion.section id={id} className="section-shell"
    initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -18 }} transition={{ duration: .48, ease: "easeOut" }}>
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {title && <h2>{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
    {children}
  </motion.section>;
}
