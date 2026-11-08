import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Music2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";

import Vault from "./sections/Vault.jsx";
import Gifts from "./sections/Gifts.jsx";
import Cake from "./sections/Cake.jsx";
import Balloons from "./sections/Balloons.jsx";
import Scratch from "./sections/Scratch.jsx";
import Finale from "./sections/Finale.jsx";
import ProgressNav from "./components/ProgressNav.jsx";
import { useProgress } from "./hooks/useProgress.js";
import { birthday } from "./config/birthday.js";

const chapters = ["vault", "gifts", "cake", "balloons", "scratch", "final"];

export default function App() {
  const { unlocked, setUnlocked, reset } = useProgress();

  const [active, setActive] = useState(unlocked ? "gifts" : "vault");
  const [ambient, setAmbient] = useState(true);

  // Playlist state
  const [trackIndex, setTrackIndex] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState("");

  const audioRef = useRef(null);
  const tracks = birthday.musicTracks || [];
  const currentTrack = tracks[trackIndex];

  // Create one persistent audio player for the whole website.
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true; // Repeat the selected song continuously.
    audio.preload = "auto";
    audio.volume = 0.65;

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);

  // Change songs without creating a new audio player.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const nextSrc = currentTrack.src;

    if (!audio.src.endsWith(nextSrc)) {
      audio.src = nextSrc;
      audio.load();
    }

    if (musicPlaying) {
      audio.play()
        .then(() => setMusicError(""))
        .catch(() => {
          setMusicPlaying(false);
          setMusicError("Could not play this song. Check the file path and audio format.");
        });
    } else {
      audio.pause();
    }
  }, [trackIndex, musicPlaying]);

  async function toggleMusic() {
    const audio = audioRef.current;

    if (!audio || !currentTrack) {
      setMusicError("Add songs to musicTracks in birthday.js first.");
      return;
    }

    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
      return;
    }

    try {
      setMusicError("");
      await audio.play();
      setMusicPlaying(true);
    } catch {
      setMusicPlaying(false);
      setMusicError("Could not play this song. Check your audio file and browser permissions.");
    }
  }

  function nextSong() {
    if (!tracks.length) return;
    setTrackIndex((index) => (index + 1) % tracks.length);
  }

  function previousSong() {
    if (!tracks.length) return;
    setTrackIndex((index) => (index - 1 + tracks.length) % tracks.length);
  }

  function selectSong(event) {
    setTrackIndex(Number(event.target.value));
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--wine", birthday.theme.wine);
    document.documentElement.style.setProperty("--rose", birthday.theme.rose);
    document.documentElement.style.setProperty("--gold", birthday.theme.gold);
    document.title = `For ${birthday.name} · A Birthday Surprise`;
  }, []);

  function navigate(id) {
    if (id !== "vault" && !unlocked) return;
    setActive(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function unlock() {
    setUnlocked(true);
    setActive("gifts");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function replay() {
    reset();
    setActive("vault");
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Music deliberately keeps playing during replay.
  }

  const index = chapters.indexOf(active);
  const next = () => navigate(chapters[Math.min(index + 1, chapters.length - 1)]);
  const previous = () => navigate(chapters[Math.max(index - 1, 1)]);

  return (
    <div className="app-shell">

      {/* Persistent playlist control */}
      {tracks.length > 0 && (
        <div className="music-player">
          <div className="music-player-top">
            <Music2 size={15} />
            <span className="music-track-title">
              {currentTrack?.title || "Birthday playlist"}
            </span>
            <span className={`music-indicator ${musicPlaying ? "active" : ""}`} />
          </div>

          <div className="music-player-controls">
            <button onClick={previousSong} aria-label="Previous song">
              <SkipBack size={15} />
            </button>

            <button
              className="music-play-button"
              onClick={toggleMusic}
              aria-label={musicPlaying ? "Pause music" : "Play music"}
            >
              {musicPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{musicPlaying ? "Pause" : "Play music"}</span>
            </button>

            <button onClick={nextSong} aria-label="Next song">
              <SkipForward size={15} />
            </button>
          </div>

          {tracks.length > 1 && (
            <select
              className="music-track-select"
              value={trackIndex}
              onChange={selectSong}
              aria-label="Choose a song"
            >
              {tracks.map((track, i) => (
                <option key={track.src} value={i}>
                  {track.title}
                </option>
              ))}
            </select>
          )}

          {musicError && <p className="music-error">{musicError}</p>}
        </div>
      )}

      {active !== "vault" && active !== "final" && (
        <ProgressNav
          active={active}
          onNavigate={navigate}
          unlocked={unlocked}
        />
      )}

      {active !== "vault" && active !== "final" && (
        <div className="top-controls">
          <span className="chapter-count">
            0{index} <i>/ 05</i>
          </span>

          <button
            className="sound-toggle"
            onClick={() => setAmbient((value) => !value)}
            aria-label="Toggle ambient visual effects"
          >
            <span className={ambient ? "sound-on" : ""}>
              {ambient ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </span>
          </button>
        </div>
      )}

      <div className={ambient ? "" : "reduced-atmosphere"}>
        <AnimatePresence mode="wait">
          {active === "vault" && <Vault key="vault" onUnlock={unlock} />}
          {active === "gifts" && <Gifts key="gifts" />}
          {active === "cake" && <Cake key="cake" />}
          {active === "balloons" && <Balloons key="balloons" />}
          {active === "scratch" && <Scratch key="scratch" />}
          {active === "final" && <Finale key="final" onReplay={replay} />}
        </AnimatePresence>
      </div>

      {unlocked && active !== "vault" && active !== "final" && (
        <div className="chapter-controls">
          <button
            className="secondary-button"
            onClick={previous}
            disabled={index <= 1}
          >
            <ChevronLeft size={16} /> Back
          </button>

          <button className="primary-button" onClick={next}>
            {active === "scratch" ? "See your surprise" : "Continue"}
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {active === "final" && (
        <button className="replay-corner" onClick={replay}>
          Start again ↗
        </button>
      )}
    </div>
  );
}