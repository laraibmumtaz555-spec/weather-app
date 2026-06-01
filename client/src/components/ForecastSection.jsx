'use client';

export default function ForecastSection({ forecast, darkMode }) {
  const dailyForecasts = forecast.list.filter((_, i) => i % 8 === 0).slice(0, 5);

  const getEmoji = (main) => {
    const m = main.toLowerCase();
    if (m.includes('rain')) return '🌧️';
    if (m.includes('cloud')) return '☁️';
    if (m.includes('snow')) return '❄️';
    if (m.includes('thunder')) return '⛈️';
    if (m.includes('clear')) return '☀️';
    if (m.includes('mist') || m.includes('fog')) return '🌫️';
    return '🌤️';
  };

  const getDay = (unix) =>
    new Date(unix * 1000).toLocaleDateString('en-US', { weekday: 'short' });

  const getDate = (unix) =>
    new Date(unix * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div style={{
      marginTop: '1.5rem',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(20px)',
      borderRadius: '28px',
      border: '1px solid rgba(255,255,255,0.25)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
      padding: '2rem',
    }}>
      <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1.5rem', margin: '0 0 1.5rem 0' }}>
        📅 5-Day Forecast
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
        {dailyForecasts.map((item, index) => (
          <div key={index} style={{
            background: index === 0 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '1.2rem 0.8rem',
            textAlign: 'center',
            border: `1px solid ${index === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}`,
            transition: 'transform 0.2s ease',
            cursor: 'default',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '0.9rem', margin: '0 0 2px 0' }}>
              {getDay(item.dt)}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', margin: '0 0 8px 0' }}>
              {getDate(item.dt)}
            </p>
            <div style={{ fontSize: '2.5rem', margin: '8px 0' }}>
              {getEmoji(item.weather[0].main)}
            </div>
            <p style={{ color: 'white', fontWeight: 800, fontSize: '1.4rem', margin: '0 0 4px 0' }}>
              {Math.round(item.main.temp)}°
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', textTransform: 'capitalize', margin: '0 0 8px 0' }}>
              {item.weather[0].description}
            </p>
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }}>💧 {item.main.humidity}%</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }}>💨 {item.wind.speed}m/s</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}