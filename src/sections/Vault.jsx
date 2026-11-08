import React, { useState } from "react";
import { motion } from "framer-motion";
import { LockKeyhole, ArrowRight, Sparkles } from "lucide-react";
import Particles from "../components/Particles.jsx";
import VaultScene from "../components/VaultScene.jsx";
import { birthday } from "../config/birthday.js";

export default function Vault({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [opening, setOpening] = useState(false);

  function submit(e) {
    e.preventDefault();
    const valid = !birthday.unlockCode || code.trim().toLowerCase() === birthday.unlockCode.toLowerCase();
    if (!valid) { setError("Not quite… try the little clue again."); return; }
    setError("");
    setOpening(true);
    window.setTimeout(onUnlock, 1050);
  }

  return <main className="vault-screen">
    <Particles count={58} />
    <div className="vault-orbit orbit-one" /><div className="vault-orbit orbit-two" />
    <motion.div className={`vault-door ${opening ? "is-opening" : ""}`}
      initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: .8 }}>
      <div className="vault-rim"><div className="vault-inner">
        <div className="vault-wheel"><VaultScene /></div>
        <div className="vault-lock"><LockKeyhole size={25} /></div>
      </div></div>
    </motion.div>
    <motion.div className="vault-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>
      <p className="eyebrow"><Sparkles size={13} /> A PRIVATE LITTLE UNIVERSE</p>
      <h1>A special surprise<br /><em>awaits you.</em></h1>
      <p className="intro-copy">{birthday.intro}</p>
      <form className="unlock-form" onSubmit={submit}>
        <label htmlFor="birthday-code">Enter the secret clue</label>
        <div className="input-wrap">
          <input id="birthday-code" value={code} onChange={e => setCode(e.target.value)}
            placeholder={birthday.unlockHint} autoComplete="off" />
          <button className="icon-button" type="submit" aria-label="Unlock surprise" disabled={opening}>
            <ArrowRight size={18} />
          </button>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        {opening && <p className="success-note">The magic is opening…</p>}
      </form>
      <p className="tiny-note">MADE WITH CARE AND LOVE· JUST FOR {birthday.name.toUpperCase()}</p>
    </motion.div>
  </main>;
}
