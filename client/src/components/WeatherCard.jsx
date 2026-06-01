'use client';

export default function WeatherCard({ weather, darkMode }) {
  const { name, sys, main, weather: conditions, wind, visibility } = weather;
  const condition = conditions[0];
  const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@4x.png`;

  const formatTime = (unix) =>
    new Date(unix * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const card = {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(20px)',
    borderRadius: '28px',
    border: '1px solid rgba(255,255,255,0.25)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    marginTop: '1.5rem',
    overflow: 'hidden',
  };

  const statBox = {
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '1rem',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.15)',
  };

  return (
    <div style={card}>
      {/* Main weather info */}
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1.5rem' }}>📍</span>
            <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>{name}</h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            {sys.country} · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', textTransform: 'capitalize', marginBottom: '1rem' }}>
            {condition.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            <span style={{ fontSize: '5rem', fontWeight: 900, color: 'white', lineHeight: 1, textShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              {Math.round(main.temp)}°
            </span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.5rem', marginBottom: '0.8rem' }}>C</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
            Feels like {Math.round(main.feels_like)}°C · H:{Math.round(main.temp_max)}° L:{Math.round(main.temp_min)}°
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src={iconUrl} alt={condition.description} style={{ width: '140px', height: '140px', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))' }} />
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 2rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {[
          { icon: '💧', value: `${main.humidity}%`, label: 'Humidity' },
          { icon: '💨', value: `${wind.speed} m/s`, label: 'Wind Speed' },
          { icon: '👁️', value: `${(visibility/1000).toFixed(1)} km`, label: 'Visibility' },
          { icon: '🌡️', value: `${main.pressure} hPa`, label: 'Pressure' },
        ].map((s) => (
          <div key={s.label} style={statBox}>
            <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>{s.icon}</div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{s.value}</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginTop: '2px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Sunrise/Sunset */}
      <div style={{
        margin: '0 2rem 2rem',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-around',
        border: '1px solid rgba(255,255,255,0.15)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem' }}>🌅</div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{formatTime(sys.sunrise)}</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Sunrise</div>
        </div>
        <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem' }}>🌇</div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{formatTime(sys.sunset)}</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Sunset</div>
        </div>
      </div>
    </div>
  );
}