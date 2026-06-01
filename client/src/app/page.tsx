'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastSection from '@/components/ForecastSection';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navbar from '@/components/Navbar';
import YoutubeSection from '@/components/YoutubeSection';
import MapEmbed from '@/components/MapEmbed';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

  const saveToDatabase = async (weatherData: any) => {
    try {
      const body = {
        location: weatherData.name,
        country: weatherData.sys.country,
        coordinates: {
          lat: weatherData.coord.lat,
          lon: weatherData.coord.lon,
        },
        temperature: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        condition: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        pressure: weatherData.main.pressure,
        visibility: weatherData.visibility,
        sunrise: weatherData.sys.sunrise,
        sunset: weatherData.sys.sunset,
      };

      await fetch(`${BACKEND_URL}/searches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save to database:', err);
    }
  };

  const fetchWeather = async (query: string) => {
    if (!query.trim()) { setError('Please enter a location'); return; }
    setLoading(true); setError(''); setWeather(null); setForecast(null); setSaved(false);

    try {
      const isCoords = /^-?\d+\.?\d*,\s*-?\d+\.?\d*$/.test(query);
      let weatherUrl, forecastUrl;

      if (isCoords) {
        const [lat, lon] = query.split(',');
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat.trim()}&lon=${lon.trim()}&appid=${API_KEY}&units=metric`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat.trim()}&lon=${lon.trim()}&appid=${API_KEY}&units=metric`;
      } else {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}&units=metric`;
      }

      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) {
        if (weatherRes.status === 404) throw new Error('City not found. Please check the name and try again.');
        throw new Error('Failed to fetch weather data. Please try again.');
      }

      const weatherData = await weatherRes.json();
      const forecastRes = await fetch(forecastUrl);
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      setForecast(forecastData);
      await saveToDatabase(weatherData);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchByLocation = () => {
    if (!navigator.geolocation) { setError('Geolocation not supported.'); return; }
    setLoading(true); setError('');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => fetchWeather(`${coords.latitude},${coords.longitude}`),
      () => { setError('Location access denied.'); setLoading(false); }
    );
  };

  const getBg = () => {
    if (!weather) return darkMode ? '#0f172a' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    const main = weather.weather[0].main.toLowerCase();
    if (darkMode) return '#0f172a';
    if (main.includes('rain')) return 'linear-gradient(135deg, #373B44 0%, #4286f4 100%)';
    if (main.includes('cloud')) return 'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)';
    if (main.includes('snow')) return 'linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)';
    if (main.includes('thunder')) return 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)';
    if (main.includes('clear')) return 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #fda085 100%)';
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  return (
    <div style={{ background: getBg(), minHeight: '100vh', transition: 'background 1s ease' }}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} time={time} />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: '3rem', fontWeight: 800, color: 'white',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)', margin: 0
          }}>
            🌤️ Weather App
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Real-time weather data powered by OpenWeatherMap
          </p>
        </div>

        {/* Search */}
        <SearchBar
          onSearch={fetchWeather}
          onLocationSearch={fetchByLocation}
          darkMode={darkMode}
        />

        {/* Saved notification */}
        {saved && (
          <div style={{
            marginTop: '1rem', padding: '0.8rem 1.5rem',
            background: 'rgba(34,197,94,0.2)',
            border: '1px solid rgba(34,197,94,0.4)',
            borderRadius: '16px', color: 'white', textAlign: 'center',
          }}>
            ✅ Search saved to database!
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            marginTop: '1rem', padding: '1rem 1.5rem',
            background: 'rgba(239,68,68,0.2)',
            border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: '16px', color: 'white', textAlign: 'center',
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {loading && <LoadingSpinner />}

        {/* Weather Card */}
        {weather && !loading && (
          <WeatherCard weather={weather} darkMode={darkMode} />
        )}

        {/* 5-Day Forecast */}
        {forecast && !loading && (
          <ForecastSection forecast={forecast} darkMode={darkMode} />
        )}

        {/* Google Map */}
        {weather && !loading && (
          <MapEmbed location={weather.name} />
        )}

        {/* YouTube Videos */}
        {weather && !loading && (
          <YoutubeSection location={weather.name} />
        )}

        {/* View Saved Searches */}
        {weather && !loading && (
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <a href="/saved" style={{
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '0.6rem 1.5rem',
              borderRadius: '50px',
              background: 'rgba(255,255,255,0.1)',
            }}>
              📋 View All Saved Searches →
            </a>
          </div>
        )}

      </main>

      <footer style={{
        textAlign: 'center', padding: '2rem',
        color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem'
      }}>
        Built by Laraib for PM Accelerator Technical Assessment ·
        Product Manager Accelerator helps aspiring PMs break into product management
      </footer>
    </div>
  );
}