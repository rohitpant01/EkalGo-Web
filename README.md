# ✈️ EkalGo Web — AI Travel Companion

> **Find Your Travel Soulmate** — The web companion to the EkalGo mobile app.

A production-ready React + Vite web application with real AI itinerary generation (Google Gemini), real Google Places photos, waitlist system, and locked feature gates that drive app installs.

---

## 🚀 Quick Start (5 Minutes)

### 1. Setup Environment Variables
```bash
cd ekalgo-web
cp .env.example .env
```

Edit `.env`:
```env
VITE_GEMINI_API_KEY=your_gemini_key_here
VITE_GOOGLE_PLACES_API_KEY=your_google_places_key_here
VITE_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.ekalgo.app
VITE_APP_STORE_URL=https://apps.apple.com/app/ekalgo/id000000000
```

### 2. Install & Run
```bash
npm install
npm run dev
```

Open → http://localhost:5173

---

## 🔑 API Keys Setup

### Gemini AI (FREE — generates itineraries)
1. Go to → https://aistudio.google.com/app/apikey
2. Click **Create API Key**
3. Paste into `VITE_GEMINI_API_KEY`
> ✅ Free tier: 15 requests/minute, 1M tokens/day — plenty for development

### Google Places API (for real place photos)
1. Go to → https://console.cloud.google.com
2. Create/select a project
3. Enable these APIs:
   - **Places API**
   - **Maps JavaScript API**
4. Go to **Credentials → Create API Key**
5. Paste into `VITE_GOOGLE_PLACES_API_KEY`
> ⚠️ Restrict your key to your domain in production!

---

## 📁 Project Structure

```
ekalgo-web/
├── public/
│   └── favicon.svg               ← EkalGo logo SVG
├── src/
│   ├── components/
│   │   ├── Logo.jsx              ← Brand logo component
│   │   ├── Navbar.jsx            ← Sticky nav with mobile menu
│   │   ├── Hero.jsx              ← Full-screen animated hero
│   │   ├── SearchBar.jsx         ← AI search with suggestions
│   │   ├── Itinerary.jsx         ← Day-by-day trip display
│   │   ├── PlaceCard.jsx         ← Place card w/ Google photo
│   │   ├── Features.jsx          ← Feature showcase grid
│   │   ├── HowItWorks.jsx        ← 4-step process
│   │   ├── AppCTA.jsx            ← Download CTA w/ phone mockup
│   │   ├── Footer.jsx            ← Site footer
│   │   ├── WaitlistModal.jsx     ← Email waitlist (localStorage)
│   │   ├── LockedModal.jsx       ← Feature gate → app install
│   │   ├── SkeletonCard.jsx      ← Loading skeleton UI
│   │   └── ErrorState.jsx        ← Error + API key helper
│   ├── hooks/
│   │   └── useItinerary.js       ← Itinerary fetch + enrichment
│   ├── pages/                    ← (extend with React Router here)
│   ├── services/
│   │   └── api.js                ← Gemini AI + Google Places calls
│   ├── utils/
│   │   ├── redirect.js           ← Play Store / App Store redirect
│   │   ├── waitlist.js           ← localStorage waitlist manager
│   │   └── toast.js              ← Styled toast notifications
│   ├── assets/                   ← Images, icons
│   ├── App.jsx                   ← Root component + state
│   ├── main.jsx                  ← React entry point
│   └── index.css                 ← Global styles + Tailwind
├── .env.example                  ← Template — copy to .env
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🧠 How Features Work

### AI Itinerary Generation
1. User types trip query → `SearchBar.jsx`
2. `useItinerary` hook calls `generateItinerary(query)` in `api.js`
3. Gemini AI returns structured JSON with days + places
4. Places are displayed immediately with skeleton loading
5. In background, each place is enriched with Google Places photos

### Real Google Photos
- Uses Google Places `findplacefromtext` → get `place_id`
- Then fetches `photo_reference` → builds photo URL
- Falls back gracefully if no photo found
- All proxied through Vite dev server (no CORS issues)

### Locked Feature Gates
- "Nearby places", "Hidden gems", "Smart routes" trigger `LockedModal`
- Modal shows app features + Download / Waitlist buttons
- Waitlist emails saved to `localStorage` under `ekalgo_waitlist`

### Waitlist System
```javascript
// Data structure in localStorage:
localStorage.getItem('ekalgo_waitlist')
// → '["user1@email.com", "user2@email.com"]'
```

---

## 🌐 Deployment

### Vercel (Recommended — Free)
```bash
npm install -g vercel
vercel login
vercel --prod
# → Add env variables in Vercel dashboard
```

### Netlify
```bash
npm run build
# Upload /dist folder to Netlify drag-and-drop
# Or: netlify deploy --prod --dir=dist
```

### Build for Production
```bash
npm run build    # → /dist folder
npm run preview  # → Preview production build
```

> **Important**: In production, the Google Places API calls need a backend proxy.
> The Vite proxy only works in development. For production, add a serverless function
> or backend endpoint to proxy Google Places requests.

---

## 🔒 Production Checklist

- [ ] Restrict Google API key to your domain
- [ ] Add Google Places proxy backend for production
- [ ] Set up proper CORS on any backend
- [ ] Add Google Analytics or Posthog
- [ ] Connect waitlist emails to a real backend / Airtable / Mailchimp
- [ ] Update Play Store / App Store URLs in `.env`
- [ ] Add real OG image for social sharing

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary font | Playfair Display (headings) |
| Body font | DM Sans |
| Mono font | JetBrains Mono |
| Primary color | Ocean `#0A7FDC` |
| Accent | Amber `#E4B250` → Ember `#FF6B35` |
| Background | Ocean 900 `#021A2C` |
| Glass effect | `rgba(4,51,88,0.4)` + `backdrop-filter: blur(20px)` |

---

*Built with React + Vite + Tailwind CSS + Gemini AI + Google Places*
