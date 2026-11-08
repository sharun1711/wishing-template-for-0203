import React from "react";
import { LockKeyhole, Gift, Cake, PartyPopper, Sparkles, Heart } from "lucide-react";

const items = [
  ["vault", "Vault", LockKeyhole], ["gifts", "Gifts", Gift],
  ["cake", "Cake", Cake], ["balloons", "Balloons", PartyPopper],
  ["scratch", "Wish", Sparkles], ["final", "Finale", Heart]
];

export default function ProgressNav({ active, onNavigate, unlocked }) {
  return <nav className="progress-nav" aria-label="Birthday chapters">
    {items.map(([id, label, Icon], index) => {
      const disabled = !unlocked && index > 0;
      return <button key={id} className={`nav-dot ${active === id ? "active" : ""}`}
        disabled={disabled} onClick={() => onNavigate(id)} aria-label={label}
        title={label}>
        <Icon size={15} /><span>{label}</span>
      </button>;
    })}
  </nav>;
}
