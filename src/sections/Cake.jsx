
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wind,
  Scissors,
  Mic,
  MicOff,
  Sparkles,
  Heart,
} from "lucide-react";

import Confetti from "../components/Confetti.jsx";
import SectionFrame from "../components/SectionFrame.jsx";

export default function Cake() {
  const [lit, setLit] = useState(true);
  const [cut, setCut] = useState(false);
  const [micState, setMicState] = useState("idle");

  async function listenForBlow() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicState("unsupported");
      return;
    }

    let stream;
    let ctx;
    let interval;

    try {
      setMicState("listening");

      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      ctx = new (window.AudioContext || window.webkitAudioContext)();

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();

      analyser.fftSize = 256;
      source.connect(analyser);

      const data = new Uint8Array(analyser.frequencyBinCount);
      let checks = 0;

      interval = window.setInterval(() => {
        analyser.getByteTimeDomainData(data);

        const volume =
          data.reduce((sum, value) => sum + Math.abs(value - 128), 0) /
          data.length;

        checks++;

        if (volume > 12 || checks > 90) {
          window.clearInterval(interval);
          stream.getTracks().forEach((track) => track.stop());
          ctx.close();

          if (volume > 12) setLit(false);
          setMicState("idle");
        }
      }, 100);
    } catch {
      if (interval) window.clearInterval(interval);
      if (stream) stream.getTracks().forEach((track) => track.stop());
      if (ctx) ctx.close();

      setMicState("denied");
    }
  }

  return (
    <SectionFrame
      eyebrow="CHAPTER 02 · MAKE A WISH"
      title="A little birthday magic"
      subtitle="Take a breath, make a wish, and blow out the candles."
    >
      <div className="cake-stage">
        {/* Ambient glow */}
        <motion.div
          className="cake-glow"
          animate={{
            opacity: lit ? [0.45, 0.85, 0.45] : [0.2, 0.35, 0.2],
            scale: lit ? [0.95, 1.12, 0.95] : [0.9, 1, 0.9],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating sparkles */}
        {[0, 1, 2, 3, 4].map((item) => (
          <motion.span
            key={item}
            className="cake-sparkle"
            style={{
              left: `${15 + item * 17}%`,
              top: `${15 + (item % 3) * 20}%`,
            }}
            animate={{
              y: [-8, 8, -8],
              opacity: [0.2, 1, 0.2],
              rotate: [0, 90, 180],
              scale: [0.7, 1.2, 0.7],
            }}
            transition={{
              duration: 2 + item * 0.4,
              repeat: Infinity,
              delay: item * 0.3,
            }}
          >
            ✦
          </motion.span>
        ))}

        {/* Animated cake */}
        <motion.div
          className="cake-art"
          aria-label="Illustrated birthday cake"
          initial={{ opacity: 0, y: 65, scale: 0.75, rotateX: 15 }}
          animate={{
            opacity: 1,
            y: [0, -7, 0],
            scale: 1,
            rotateX: 0,
            rotate: cut ? [-2, 2, 0] : 0,
          }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { type: "spring", stiffness: 100, damping: 12 },
            y: {
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: { duration: 0.5 },
          }}
        >
          {/* Candles */}
          <div className="candles">
            {[0, 1, 2].map((n) => (
              <motion.div
                className="candle"
                key={n}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + n * 0.15 }}
              >
                <AnimatePresence>
                  {lit && (
                    <motion.i
                      className="flame"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0.8, 1, 0.75, 1],
                        scale: [1, 1.15, 0.9, 1],
                        rotate: [-5, 5, -4, 5],
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0,
                        y: -25,
                        filter: "blur(8px)",
                      }}
                      transition={{
                        duration: 0.45 + n * 0.08,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </AnimatePresence>
                <span />
              </motion.div>
            ))}
          </div>

          {/* Cake top */}
          <motion.div
            className={`cake-top ${cut ? "cake-cut" : ""}`}
            animate={cut ? { rotate: -3, x: 5 } : { rotate: 0, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <i />
            <i />
            <i />
            <b>♡</b>
          </motion.div>

          {/* Cake layers */}
          <motion.div
            className="cake-layer layer-top"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          />
          <motion.div
            className="cake-layer layer-mid"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          />
          <motion.div
            className="cake-layer layer-bottom"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          />

          <motion.div
            className="cake-plate"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </motion.div>

        {/* Wish reveal */}
        <AnimatePresence>
          {!lit && (
            <motion.div
              className="wish-reveal"
              initial={{ opacity: 0, y: 30, scale: 0.7, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <Sparkles size={18} />
              Your wish is on its way.
              <Heart size={17} />
            </motion.div>
          )}
        </AnimatePresence>

        {cut && <Confetti amount={70} />}
      </div>

      {/* Controls */}
      <motion.div
        className="cake-controls"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          className="primary-button"
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setLit(false)}
          disabled={!lit}
        >
          <Wind size={17} />
          Blow out candles
        </motion.button>

        <motion.button
          className="secondary-button"
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.94 }}
          onClick={listenForBlow}
          disabled={!lit || micState === "listening"}
        >
          {micState === "listening" || micState === "idle" ? (
            <Mic size={17} />
          ) : (
            <MicOff size={17} />
          )}

          {micState === "listening"
            ? "Listening…"
            : "Use microphone"}
        </motion.button>

        <motion.button
          className="secondary-button"
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            setCut(true);
            setLit(false);
          }}
          disabled={cut}
        >
          <Scissors size={17} />
          {cut ? "Cake cut!" : "Cut the cake"}
        </motion.button>
      </motion.div>

      {micState === "unsupported" && (
        <p className="helper-note">
          Microphone isn't available here — use the candle button instead.
        </p>
      )}

      {micState === "denied" && (
        <p className="helper-note">
          Microphone permission was unavailable. The clickable candle button always works.
        </p>
      )}
    </SectionFrame>
  );
}
