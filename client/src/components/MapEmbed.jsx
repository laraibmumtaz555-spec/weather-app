'use client';

export default function MapEmbed({ location }) {
  if (!location) return null;

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(location)}&zoom=10`;

  return (
    <div style={{
      marginTop: '1.5rem',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(20px)',
      borderRadius: '28px',
      border: '1px solid rgba(255,255,255,0.25)',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '1.5rem 2rem 1rem' }}>
        <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>
          🗺️ Map — {location}
        </h3>
      </div>
      <iframe
        src={mapUrl}
        width="100%"
        height="350"
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}