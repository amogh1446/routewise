# RouteWise — AI Trip Planner ✈️🗺️

**RouteWise** is a smart, zero-login, database-free travel planning web application. It generates personalized multi-day travel itineraries with sequential hop-by-hop transit legs, en-route food pitstops, hotel recommendations, and one-click Google Maps GPS navigation.

---

## 🌟 Key Features

* **Sequential Hop-by-Hop Itineraries:** Plans realistic routes departing from a central hotel hub, calculating commute distances (`km`), driving times, and scenic route notes between each spot.
* **En-Route Food & Café Pitstops:** Recommends authentic roadside eateries, local coffee estates, and signature regional dining spots situated directly along your driving path between attractions.
* **1-Click Multi-Stop Google Maps GPS Navigation:** Deep-links the day's complete route (`Hotel ➔ Spot 1 ➔ Pitstop ➔ Spot 2 ➔ Return`) directly into Google Maps for instant turn-by-turn driving directions.
* **Offline Portability ("Save as PDF"):** Built-in print formatting (`@media print`) that creates clean, beautiful A4 travel documents ready to save or print for offline travel.
* **Google Places API (New):** Fast, reliable destination autocomplete with session token optimization.
* **Zero-Auth & Database-Free:** All trips are stored directly in your browser's `localStorage`—no logins, passwords, or cloud database setup required.
* **Resilient Multi-Model AI Engine:** Cascades through Google's modern Gemini models (`gemini-3.5-flash`, `gemini-3.8-flash`, `gemini-3.5-flash-lite`, `gemini-3-flash-preview`) with automatic failover protection.

---

## 🛠️ Tech Stack

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Radix UI
* **Routing:** React Router v6 (SPA with `RootLayout` & hash scrolling)
* **APIs:** 
  * Google Maps Platform (Places API New, Maps JS API Loader, Directions)
  * Google Gemini Generative AI API
* **Storage:** Client-side Browser `localStorage`

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/amogh1446/routewise.git
cd routewise
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory (based on `.env.example`):
```env
VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key
VITE_GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
```

> **Security Note:** In Google Cloud Console, restrict your Google Maps API key to **Maps JavaScript API** and **Places API (New)** with HTTP referrer restrictions.

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📄 License
MIT License. Created by [amogh1446](https://github.com/amogh1446).
