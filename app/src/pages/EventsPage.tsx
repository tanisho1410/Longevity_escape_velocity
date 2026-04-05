import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Filter } from 'lucide-react';
import { events, eventTypeLabels } from '../data/mockData';

export const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filtered = events.filter((e) => {
    if (filter === 'all') return true;
    return e.status === filter;
  });

  return (
    <div>
      <div className="page-header fade-in-up">
        <h1>イベント <span className="gradient-text">一覧</span></h1>
        <p>勉強会・討論会・読書会など、コミュニティメンバーが企画したイベントを確認できます。</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        {(['all', 'upcoming', 'past'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Filter size={12} />
            {f === 'all' ? 'すべて' : f === 'upcoming' ? '開催予定' : '過去のイベント'}
          </button>
        ))}
      </div>

      <div className="card-grid card-grid-2 stagger">
        {filtered.map((event) => (
          <Link key={event.id} to={`/events/${event.id}`} className="card event-card">
            <div className="event-card-header">
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <span className={`badge ${event.status === 'upcoming' ? 'badge-teal' : 'badge-muted'}`}>
                    {event.status === 'upcoming' ? '開催予定' : '開催済み'}
                  </span>
                  <span className="badge badge-indigo">
                    {eventTypeLabels[event.type] || event.type}
                  </span>
                </div>
                <div className="event-card-title">{event.title}</div>
              </div>
            </div>
            <div className="event-meta">
              <div className="event-meta-item"><Calendar size={13} />{event.date} {event.time}</div>
              <div className="event-meta-item"><MapPin size={13} />{event.location}</div>
              <div className="event-meta-item"><Users size={13} />主催：{event.host}</div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.6,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {event.description}
            </p>
            <div className="tag-list" style={{ marginTop: 12 }}>
              {event.tags.slice(0, 3).map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
            {event.status === 'upcoming' && (
              <div className="event-capacity">
                <div className="capacity-bar">
                  <div className="capacity-fill" style={{ width: `${(event.attendees / event.capacity) * 100}%` }} />
                </div>
                <span className="capacity-text">{event.attendees}/{event.capacity}人</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
