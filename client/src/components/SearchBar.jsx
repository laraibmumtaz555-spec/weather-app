'use client';
import { useState } from 'react';

export default function SearchBar({ onSearch, onLocationSearch, darkMode }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const quickCities = ['London', 'New York', 'Tokyo', 'Dubai', 'Paris', 'Karachi'];

  return (
    <div style={{
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '1.5rem',
      border: '1px solid rgba(255,255,255,0.25)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <span style={{
            position: 'absolute', left: '16px', top: '50%',
            transform: 'translateY(-50%)', fontSize: '1.1rem'
          }}>🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, zip code, coordinates (lat,lon)..."
            style={{
              width: '100%', padding: '1rem 1rem 1rem 3rem',
              borderRadius: '16px', border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.2)', color: 'white',
              fontSize: '0.95rem', outline: 'none',
              backdropFilter: 'blur(10px)',
            }}
          />
        </div>
        <button type="submit" style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white', border: 'none', borderRadius: '16px',
          fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
          whiteSpace: 'nowrap',
        }}>
          Search
        </button>
      </form>

      <button
        onClick={onLocationSearch}
        style={{
          width: '100%', marginTop: '12px', padding: '0.8rem',
          background: 'rgba(255,255,255,0.1)', color: 'white',
          border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px',
          cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600,
          transition: 'all 0.2s ease',
        }}
      >
        📍 Use My Current Location
      </button>

      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
        {quickCities.map((city) => (
          <button
            key={city}
            onClick={() => onSearch(city)}
            style={{
              padding: '0.4rem 1rem',
              background: 'rgba(255,255,255,0.15)',
              color: 'white', border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '50px', cursor: 'pointer',
              fontSize: '0.8rem', fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}