# Ultimate Birthday Surprise

A six-chapter, client-side birthday experience built with React + Vite, Framer Motion and a small React Three Fiber vault detail. The project includes the vault unlock, gift reveals, interactive cake, balloon-pop game, pointer/touch scratch card, and cinematic finale.

## 1. Requirements

- Node.js 18.18+ (Node 20 LTS recommended)
- npm

## 2. Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

Create a production build:

```bash
npm run build
npm run preview
```

## 3. Personalize the experience

Edit **`src/config/birthday.js`**. All names, messages, clue, theme colours, wishes, gallery images and music are centralized there.

Put your own images and audio in `public/media/` and update the matching paths in the config:

```text
public/
  media/
    memory-1.jpg
    memory-2.jpg
    memory-3.jpg
    gallery-1.jpg
    gallery-2.jpg
    gallery-3.jpg
    birthday-song.mp3
```

The image slots have designed visual fallbacks if a file is missing, but use your own photos for the intended personal result. To remove the unlock requirement, set `unlockCode: ""`. The default clue is `LOVE`.

Music is optional. Set `musicUrl: "/media/birthday-song.mp3"`. Browsers require a user gesture before audio playback, so the finale shows a play/pause control.

## 4. Project map

```text
src/
  components/     Shared navigation, section frame, particles, confetti
  config/         Single source of birthday personalization
  hooks/          Local progress persistence
  sections/       Six complete interactive chapters
  utils/          Small browser audio utility
  App.jsx         Chapter routing and shared shell
  main.jsx        React entry point
  styles.css      Responsive theme and animation system
public/
  media/          Add private photos and music here
```

## 5. Interaction notes

- The unlock state is stored in `localStorage`; use **Replay the magic** to reset it.
- The cake has a clickable candle fallback. Microphone mode requires HTTPS or localhost and permission.
- Balloon pops use a small Web Audio tone; no external sound file is required.
- Scratch-card input supports mouse, pen and touch. The reveal button is an accessibility/quick-reveal alternative.
- The visual-effects toggle reduces ambient particles. System `prefers-reduced-motion` is respected.

## 6. Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. No backend or environment variables are required.

You can also deploy with the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 7. Before sharing

- Replace the sample name, messages and clue in `src/config/birthday.js`.
- Add real photos/audio to `public/media/` (avoid sharing private images publicly unless intended).
- Test the experience on a phone and desktop.
- Run `npm run build` and confirm there are no build errors.

## Design / reference note

No reference screenshots were attached to the request in this conversation, so this first implementation follows the written art direction: dark wine/burgundy atmosphere, rose-gold accents, glass-like surfaces, elegant serif display type and a sequence of six cinematic chapters. If you share the screenshots, the visual system can be tuned against them.
