# ⚡ 10xPost — 1 Video In. 10x Reach Out.

> **AI Short-Form Video Multiplication Platform**  
> Multiply a single long-form podcast or talking-head video into 10 distinct, photorealistic vertical clips with custom viral hooks, cloned creator voice, and automated multi-channel scheduling.

---

## 🌟 Key Features

- **Dual Video Ingestion:**
  - Drag-and-drop local video upload (`.mp4`, `.mov`, `.webm`) with real-time browser HTML5 playback.
  - Video link ingestion for Instagram Reels, TikTok, and YouTube Shorts.
- **Biometric Avatar & Voice Profiling:**
  - 468 facial landmark mesh calibration and LivePortrait background preservation.
  - ElevenLabs 44.1kHz studio voice identity synthesis.
- **AI Angle Multiplication:**
  - Gemini 2.0 Flash engine generating 2 to 10 distinct psychological hook angles (Contrarian, Personal Story, 3-Step Framework, Cost of Inaction, Myth Buster, etc.).
  - Groq Whisper-large-v3 word-level timestamps and animated Hormozi/Karaoke subtitles.
- **Interactive Variations Carousel:**
  - Single-row horizontal carousel with real-time video simulation and script editing.
- **Social Multi-Post Scheduler:**
  - Multi-platform publishing to YouTube Shorts, Instagram, and TikTok.
  - Smart 15-minute platform stagger to optimize organic discovery without cannibalization.
- **Monthly Social Calendar & Creator Asset Vault:**
  - Full 35-day month calendar matrix by default with queued post previews.
  - Creator Asset Vault with compact video asset thumbnails, batch filters, and direct 1080p MP4 export.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with Obsidian dark theme (`#090b0e`) & electric emerald accents (`#00e599`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **AI & Video Models:**
  - Google Gemini 2.0 Flash (Angles & Scripts)
  - ElevenLabs (Voice Cloning & Audio Generation)
  - Groq Whisper (Word Timestamps & Captions)
  - Fal.ai LatentSync / LivePortrait (Video Lip-Sync)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/tushadvrse-spec/10xPost.git
cd 10xPost
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your API keys (optional — the app includes high-fidelity simulated fallbacks for all endpoints):
```env
GEMINI_API_KEY=your_gemini_key
ELEVENLABS_API_KEY=your_elevenlabs_key
FAL_KEY=your_fal_key
GROQ_API_KEY=your_groq_key
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build
```bash
npm run build
npm run start
```

---

## 📄 License
MIT License. Created by [tushadvrse-spec](https://github.com/tushadvrse-spec).
