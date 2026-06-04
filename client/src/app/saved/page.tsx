'use client';

import { useState, useEffect } from 'react';

export default function SavedSearches() {
  const [searches, setSearches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editLabel, setEditLabel] = useState('');
  const [message, setMessage] = useState('');

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

  const fetchSearches = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/searches`);
      const data = await res.json();
      setSearches(data.data || []);
    } catch (err) {
      console.error('Failed to fetch searches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearches();
  }, []);

  const deleteSearch = async (id: string) => {
    if (!confirm('Are you sure you want to delete this search?')) return;
    try {
      await fetch(`${BACKEND_URL}/searches/${id}`, { method: 'DELETE' });
      setMessage('✅ Search deleted successfully!');
      fetchSearches();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Failed to delete search');
    }
  };

  const updateSearch = async (id: string) => {
    try {
      await fetch(`${BACKEND_URL}/searches/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: editNotes, label: editLabel }),
      });
      setMessage('✅ Search updated successfully!');
      setEditId(null);
      fetchSearches();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Failed to update search');
    }
  };

  const exportData = async (format: string) => {
    window.open(`${BACKEND_URL}/searches/export?format=${format}`, '_blank');
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric',
      year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

  const getWeatherEmoji = (condition: string) => {
    if (!condition) return '🌤️';
    const c = condition.toLowerCase();
    if (c.includes('rain')) return '🌧️';
    if (c.includes('cloud')) return '☁️';
    if (c.includes('snow')) return '❄️';
    if (c.includes('thunder')) return '⛈️';
    if (c.includes('clear')) return '☀️';
    return '🌤️';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <a href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
              ← Back to Weather App
            </a>
            <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: 800, margin: 0 }}>
              📋 Saved Searches
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.3rem', fontSize: '0.9rem' }}>
              {searches.length} searches saved in database
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['json', 'csv', 'markdown'].map((format) => (
              <button
                key={format}
                onClick={() => exportData(format)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white', border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '50px', cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                ⬇️ {format}
              </button>
            ))}
          </div>
        </div>

        {message && (
          <div style={{
            padding: '1rem', borderRadius: '16px', marginBottom: '1rem',
            background: message.includes('✅') ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
            border: message.includes('✅') ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(239,68,68,0.4)',
            color: 'white', textAlign: 'center',
          }}>
            {message}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', color: 'white', padding: '3rem' }}>
            Loading saved searches...
          </div>
        )}

        {!loading && searches.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '4rem',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '24px', color: 'white',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ margin: '0 0 0.5rem' }}>No saved searches yet</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Search for a city on the main page to save it here</p>
            <a href="/" style={{
              display: 'inline-block', marginTop: '1rem',
              padding: '0.8rem 2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 600,
            }}>
              Search Weather →
            </a>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {searches.map((search) => (
            <div key={search._id} style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.25)',
              padding: '1.5rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '2.5rem' }}>{getWeatherEmoji(search.condition)}</span>
                  <div>
                    <h3 style={{ color: 'white', margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>
                      {search.location}, {search.country}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', margin: '2px 0 0', fontSize: '0.8rem' }}>
                      {formatDate(search.searchedAt)}
                    </p>
                    {search.label && (
                      <span style={{
                        display: 'inline-block', marginTop: '4px',
                        padding: '2px 10px',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '50px', color: 'white', fontSize: '0.75rem',
                      }}>
                        🏷️ {search.label}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => { setEditId(search._id); setEditNotes(search.notes || ''); setEditLabel(search.label || ''); }}
                    style={{
                      padding: '0.4rem 1rem',
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white', border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: '50px', cursor: 'pointer', fontSize: '0.8rem',
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteSearch(search._id)}
                    style={{
                      padding: '0.4rem 1rem',
                      background: 'rgba(239,68,68,0.3)',
                      color: 'white', border: '1px solid rgba(239,68,68,0.4)',
                      borderRadius: '50px', cursor: 'pointer', fontSize: '0.8rem',
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '1rem' }}>
                {[
                  { label: 'Temp', value: `${search.temperature}°C`, icon: '🌡️' },
                  { label: 'Humidity', value: `${search.humidity}%`, icon: '💧' },
                  { label: 'Wind', value: `${search.windSpeed} m/s`, icon: '💨' },
                  { label: 'Condition', value: search.condition, icon: '☁️' },
                ].map((stat) => (
                  <div key={stat.label} style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px', padding: '0.8rem', textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '1.2rem' }}>{stat.icon}</div>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>{stat.value}</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {search.notes && (
                <div style={{
                  marginTop: '1rem', padding: '0.8rem 1rem',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px', color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem',
                }}>
                  📝 {search.notes}
                </div>
              )}

              {editId === search._id && (
                <div style={{
                  marginTop: '1rem', padding: '1rem',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)',
                }}>
                  <input
                    type="text"
                    placeholder="Add a label (e.g. Business Trip)"
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    style={{
                      width: '100%', padding: '0.7rem 1rem',
                      borderRadius: '12px', border: '1px solid rgba(255,255,255,0.3)',
                      background: 'rgba(255,255,255,0.15)', color: 'white',
                      fontSize: '0.9rem', marginBottom: '8px', outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                  <textarea
                    placeholder="Add notes about this search..."
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    rows={3}
                    style={{
                      width: '100%', padding: '0.7rem 1rem',
                      borderRadius: '12px', border: '1px solid rgba(255,255,255,0.3)',
                      background: 'rgba(255,255,255,0.15)', color: 'white',
                      fontSize: '0.9rem', outline: 'none', resize: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button
                      onClick={() => updateSearch(search._id)}
                      style={{
                        padding: '0.6rem 1.5rem',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white', border: 'none',
                        borderRadius: '50px', cursor: 'pointer', fontWeight: 600,
                      }}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      style={{
                        padding: '0.6rem 1.5rem',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white', border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '50px', cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}