# 🌤️ Weather App — PM Accelerator Technical Assessment

**Built by:** Laraib Mumtaz  
**Assessment:** Full Stack Engineer (Tech Assessment #1 + #2)  
**Company:** PM Accelerator — Product Manager Accelerator helps aspiring Product Managers break into product management through mentorship, training, and real-world experience.

---

## 🚀 Features

### Frontend (Tech Assessment #1)
- 🔍 Search weather by city, zip code, GPS coordinates, or landmarks
- 📍 Auto-detect current location via browser geolocation
- 🌡️ Current weather: temperature, humidity, wind speed, pressure, visibility
- 🌅 Sunrise & sunset times
- 📅 5-day weather forecast
- 🌙 Dark / Light mode toggle
- ⚠️ Full error handling (invalid city, API failure, network issues)
- 📱 Fully responsive design (desktop, tablet, mobile)

### Backend (Tech Assessment #2)
- ✅ **CREATE** — Save weather searches to MongoDB with validation
- ✅ **READ** — Retrieve all saved weather searches
- ✅ **UPDATE** — Edit notes and labels on saved searches
- ✅ **DELETE** — Remove saved searches
- ✅ **Export** — Download data as CSV, JSON, or Markdown
- 🗺️ Google Maps embed for searched locations
- 🎬 YouTube travel videos for searched locations
- 🔒 Input validation and error handling throughout

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| APIs | OpenWeatherMap, Google Maps, YouTube Data API v3 |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- API keys (OpenWeatherMap, Google Cloud)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENWEATHER_API_KEY=your_key
YOUTUBE_API_KEY=your_key
GOOGLE_MAPS_API_KEY=your_key
```

```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
```

Create `client/.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
```

```bash
npm run dev
```

### 4. Open in browser
http://localhost:3000
---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/searches` | Get all saved searches |
| POST | `/api/searches` | Save a new weather search |
| GET | `/api/searches/:id` | Get single search |
| PUT | `/api/searches/:id` | Update notes/label |
| DELETE | `/api/searches/:id` | Delete a search |
| GET | `/api/searches/export?format=csv` | Export as CSV |
| GET | `/api/searches/export?format=json` | Export as JSON |
| GET | `/api/searches/export?format=markdown` | Export as Markdown |
| GET | `/api/searches/youtube?location=London` | Get YouTube videos |

---

## 🌐 Deployment

- **Frontend:** Vercel — https://your-app.vercel.app
- **Backend:** Render — https://your-api.render.com
- **Database:** MongoDB Atlas

---

## 📸 Screenshots

> Search for any city, zip code, GPS coordinates or landmark

---

## 👩‍💻 About PM Accelerator

Product Manager Accelerator helps aspiring Product Managers break into product management through mentorship, community, and hands-on experience. Learn more at [LinkedIn](https://www.linkedin.com/company/product-manager-accelerator).