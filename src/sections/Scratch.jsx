import React, { useEffect, useRef, useState } from "react";
import SectionFrame from "../components/SectionFrame.jsx";
import { birthday } from "../config/birthday.js";
import { Sparkles } from "lucide-react";

export default function Scratch() {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);
  const last = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#e8c18c"); grad.addColorStop(.48, "#b87975"); grad.addColorStop(1, "#f5d8bd");
    ctx.fillStyle = grad; ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "rgba(68,24,43,.28)";
    for (let i = 0; i < 1100; i++) {
      ctx.beginPath(); ctx.arc(Math.random()*rect.width, Math.random()*rect.height, Math.random()*1.2, 0, Math.PI*2); ctx.fill();
    }
    ctx.fillStyle = "#4d2436"; ctx.textAlign = "center";
    ctx.font = "600 13px DM Sans"; ctx.fillText("A LITTLE WISH, JUST FOR YOU", rect.width/2, rect.height/2 - 8);
    ctx.font = "28px Georgia"; ctx.fillText("Scratch to reveal ♡", rect.width/2, rect.height/2 + 30);
  }, []);

  function point(e) {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function scratch(e) {
    if (!drawing.current || revealed) return;
    const ctx = canvasRef.current.getContext("2d");
    const p = point(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 34; ctx.lineCap = "round"; ctx.lineJoin = "round";
    if (last.current) { ctx.beginPath(); ctx.moveTo(last.current.x, last.current.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
    else { ctx.beginPath(); ctx.arc(p.x, p.y, 18, 0, Math.PI*2); ctx.fill(); }
    last.current = p;
    const pixels = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height).data;
    let clear = 0;
    for (let i = 3; i < pixels.length; i += 4 * 24) if (pixels[i] < 30) clear++;
    if (clear / (pixels.length / (4 * 24)) > .43) reveal();
  }
  function reveal() {
    setRevealed(true);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) { ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); }
  }
  return <SectionFrame eyebrow="CHAPTER 04 · A HIDDEN LITTLE NOTE" title="Scratch your birthday wish"
    subtitle="There is one last message waiting underneath the shimmer.">
    <div className={`scratch-card ${revealed ? "is-revealed" : ""}`}>
      <div className="scratch-under">
        <span className="scratch-heart">♡</span><p>{birthday.scratchMessage}</p><small>WITH ALL MY LOVE · ALWAYS</small>
      </div>
      {!revealed && <canvas ref={canvasRef} className="scratch-canvas" onPointerDown={e => { drawing.current = true; last.current = null; e.currentTarget.setPointerCapture(e.pointerId); scratch(e); }}
        onPointerMove={scratch} onPointerUp={() => { drawing.current = false; last.current = null; }}
        onPointerCancel={() => { drawing.current = false; last.current = null; }} />}
    </div>
    <div className="scratch-bottom"><span><Sparkles size={15} /> {revealed ? "A wish, revealed." : "Use your finger or mouse to scratch."}</span>
      {!revealed && <button className="text-button" onClick={reveal}>REVEAL MESSAGE <span>↗</span></button>}
    </div>
  </SectionFrame>;
}
