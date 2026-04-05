import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle2, ExternalLink, Clock } from 'lucide-react';
import { events, eventTypeLabels } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, toggleEventAttendance } = useApp();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 80 }}>
        <p style={{ color: 'var(--text-muted)' }}>イベントが見つかりませんでした。</p>
        <Link to="/events" className="btn btn-secondary" style={{ marginTop: 20, display: 'inline-flex' }}>
          一覧に戻る
        </Link>
      </div>
    );
  }

  const isAttending = user?.attendedEvents?.includes(event.id) ?? false;
  const capacityPct = (event.attendees / event.capacity) * 100;

  return (
    <div className="fade-in-up">
      <Link to="/events" className="back-btn">
        <ArrowLeft size={15} /> イベント一覧に戻る
      </Link>

      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <span className={`badge ${event.status === 'upcoming' ? 'badge-teal' : 'badge-muted'}`}>
            {event.status === 'upcoming' ? '開催予定' : '開催済み'}
          </span>
          <span className="badge badge-indigo">{eventTypeLabels[event.type] || event.type}</span>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, marginBottom: 20, lineHeight: 1.3 }}>
          {event.title}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
              <Calendar size={15} color="var(--accent-primary)" />
              <span>{event.date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13, marginTop: 8 }}>
              <Clock size={15} color="var(--accent-primary)" />
              <span>{event.time}</span>
            </div>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
              <MapPin size={15} color="var(--accent-secondary)" />
              <span>{event.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13, marginTop: 8 }}>
              <Users size={15} color="var(--accent-secondary)" />
              <span>主催：{event.host}</span>
            </div>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
          {event.description}
        </p>

        <div className="tag-list" style={{ marginBottom: 20 }}>
          {event.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>

        <div className="divider" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
                参加状況 {event.attendees}/{event.capacity}人
              </div>
              <div className="capacity-bar" style={{ width: 180 }}>
                <div className="capacity-fill" style={{ width: `${capacityPct}%` }} />
              </div>
            </div>
          </div>

          {event.status === 'upcoming' && (
            <button
              onClick={() => toggleEventAttendance(event.id)}
              className={`btn ${isAttending ? 'btn-secondary' : 'btn-primary'}`}
            >
              {isAttending ? (
                <><CheckCircle2 size={16} /> 参加予定に追加済み</>
              ) : (
                '参加予定に追加'
              )}
            </button>
          )}
        </div>
      </div>

      {/* Minutes */}
      {event.minutes && (
        <div className="minutes-box">
          <div className="section-title">
            <span className="section-title-dot" />
            イベント議事録・サマリー
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
            {event.minutes.summary}
          </p>

          <div className="section-title" style={{ fontSize: 15, marginBottom: 14 }}>
            <span className="section-title-dot" style={{ background: 'var(--accent-secondary)', boxShadow: '0 0 8px var(--accent-secondary)' }} />
            主なポイント
          </div>
          <div className="key-points" style={{ marginBottom: 24 }}>
            {event.minutes.keyPoints.map((point, i) => (
              <div key={i} className="key-point">
                <span className="key-point-dot" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          {event.minutes.nextSteps.length > 0 && (
            <>
              <div className="section-title" style={{ fontSize: 15, marginBottom: 14 }}>
                <span className="section-title-dot" style={{ background: 'var(--accent-tertiary)', boxShadow: '0 0 8px var(--accent-tertiary)' }} />
                次のアクション
              </div>
              <div className="key-points" style={{ marginBottom: 24 }}>
                {event.minutes.nextSteps.map((step, i) => (
                  <div key={i} className="key-point">
                    <span className="key-point-dot" style={{ background: 'var(--accent-tertiary)' }} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {event.minutes.resources.length > 0 && (
            <>
              <div className="section-title" style={{ fontSize: 15, marginBottom: 14 }}>
                <span className="section-title-dot" style={{ background: '#818cf8', boxShadow: '0 0 8px #818cf8' }} />
                参考リソース
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {event.minutes.resources.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-primary)',
                      fontSize: 14, transition: 'opacity var(--transition)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <ExternalLink size={13} />
                    {r.title}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
