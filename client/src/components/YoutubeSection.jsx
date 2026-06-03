'use client';
import { useState, useEffect } from 'react';

export default function YoutubeSection({ location }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (!location) return;
    const fetchVideos = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `${BACKEND_URL}/searches/youtube?location=${encodeURIComponent(location)}`
        );
        const data = await res.json();
        if (data.success) {
          setVideos(data.data);
        } else {
          setError('Could not load videos');
        }
      } catch (err) {
        setError('Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [location]);

  if (!location) return null;

  const cardStyle = {
    borderRadius: '16px',
    overflow: 'hidden',
    background: 'rgba(0,0,0,0.3)',
    cursor: 'pointer',
  };

  const imgStyle = {
    width: '100%',
    height: '140px',
    objectFit: 'cover' as const,
  };

  return (
    <div style={{
      marginTop: '1.5rem',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(20px)',
      borderRadius: '28px',
      border: '1px solid rgba(255,255,255,0.25)',
      padding: '2rem',
    }}>
      <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', margin: '0 0 1.5rem 0' }}>
        🎬 Travel Videos — {location}
      </h3>

      {loading && (
        <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>Loading videos...</p>
      )}

      {error && (
        <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>⚠️ {error}</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {videos.map((video) => {
          const videoId = video.id.videoId;
          const title = video.snippet.title;
          const thumbnail = video.snippet.thumbnails.medium.url;
          const channel = video.snippet.channelTitle;
          const url = 'https://www.youtube.com/watch?v=' + videoId;
          return (
            <a key={videoId} href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div style={cardStyle}>
                <img src={thumbnail} alt={title} style={imgStyle} />
                <div style={{ padding: '0.8rem' }}>
                  <p style={{ color: 'white', fontSize: '0.8rem', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
                    {title}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', marginTop: '4px' }}>
                    {channel}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}