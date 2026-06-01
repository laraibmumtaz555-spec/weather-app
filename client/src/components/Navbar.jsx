'use client';

export default function Navbar({ darkMode, setDarkMode, time }) {
  return (
    <nav style={{
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '42px', height: '42px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', boxShadow: '0 4px 15px rgba(102,126,234,0.4)'
        }}>🌤️</div>
        <div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1 }}>WeatherApp</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>PM Accelerator</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {time && (
          <div style={{
            color: 'white', fontSize: '1rem', fontWeight: 600,
            background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem',
            borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)'
          }}>
            🕐 {time}
          </div>
        )}
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>by Laraib</div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: darkMode ? '#6366f1' : 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50px', padding: '0.4rem 1rem',
            color: 'white', cursor: 'pointer', fontSize: '0.85rem',
            fontWeight: 600, transition: 'all 0.3s ease',
          }}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}