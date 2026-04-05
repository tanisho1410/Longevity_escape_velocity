import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, BookOpen, Users, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { events, topics, categoryLabels } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { user } = useApp();
  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3);
  const featuredTopics = topics.slice(0, 3);

  return (
    <div className="stagger">
      <div className="dashboard-hero">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge badge-teal" style={{ marginBottom: 16 }}>
            <Zap size={11} /> 招待制コミュニティ
          </div>
          <h1>
            {user?.nickname ? `ようこそ、${user.nickname}さん` : 'ようこそ、LEV Circle へ'}
            <br />
            <span className="gradient-text">未来の生き方を、共に考えよう。</span>
          </h1>
          <p>
            寿命脱出速度（LEV）の到達後、私たちはどのようにして生き、誰と何をして生きていくのか。
            シンギュラリティ・長寿・人生設計について学び、議論する招待制コミュニティです。
          </p>
          <div className="dashboard-hero-actions">
            <Link to="/events" className="btn btn-primary">
              <Calendar size={16} /> 次のイベントを見る <ArrowRight size={14} />
            </Link>
            <Link to="/topics" className="btn btn-secondary">
              <BookOpen size={16} /> トピックを探す
            </Link>
          </div>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-value gradient-text">{events.length}</span>
          <span className="stat-label">総イベント数</span>
        </div>
        <div className="stat-item">
          <span className="stat-value gradient-text">{events.filter((e) => e.status === 'upcoming').length}</span>
          <span className="stat-label">開催予定</span>
        </div>
        <div className="stat-item">
          <span className="stat-value gradient-text">{topics.length}</span>
          <span className="stat-label">トピック数</span>
        </div>
        <div className="stat-item">
          <span className="stat-value gradient-text">
            {events.reduce((sum, e) => sum + e.attendees, 0)}+
          </span>
          <span className="stat-label">延べ参加者数</span>
        </div>
      </div>

      {/* Upcoming Events */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div className="section-title">
            <span className="section-title-dot" />
            開催予定のイベント
          </div>
          <Link to="/events" className="btn btn-ghost btn-sm">
            すべて見る <ArrowRight size={13} />
          </Link>
        </div>
        <div className="card-grid card-grid-3">
          {upcomingEvents.map((event) => (
            <Link key={event.id} to={`/events/${event.id}`} className="card event-card">
              <div className="event-card-header">
                <div className="event-card-title">{event.title}</div>
                <span className={`badge ${event.type === 'online' || event.type === 'study' ? 'badge-teal' : 'badge-indigo'}`}>
                  {event.type === 'study' ? '勉強会' : event.type === 'discussion' ? '討論' : event.type === 'reading' ? '読書会' : event.type}
                </span>
              </div>
              <div className="event-meta">
                <div className="event-meta-item">
                  <Calendar size={13} />
                  {event.date} {event.time}
                </div>
              </div>
              <div className="tag-list" style={{ marginTop: 8 }}>
                {event.tags.slice(0, 2).map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="event-capacity">
                <div className="capacity-bar">
                  <div className="capacity-fill" style={{ width: `${(event.attendees / event.capacity) * 100}%` }} />
                </div>
                <span className="capacity-text"><Users size={10} style={{ display: 'inline' }} /> {event.attendees}/{event.capacity}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Topics */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div className="section-title">
            <span className="section-title-dot" style={{ background: 'var(--accent-secondary)', boxShadow: '0 0 12px var(--accent-secondary)' }} />
            注目トピック
          </div>
          <Link to="/topics" className="btn btn-ghost btn-sm">
            すべて見る <ArrowRight size={13} />
          </Link>
        </div>
        <div className="card-grid card-grid-3">
          {featuredTopics.map((topic) => (
            <Link key={topic.id} to={`/topics/${topic.slug}`} className="card topic-card">
              <div className="topic-category">{categoryLabels[topic.category]}</div>
              <div className="topic-card-title">{topic.title}</div>
              <div className="topic-card-sub">{topic.subtitle}</div>
              <div className="tag-list">
                {topic.tags.slice(0, 2).map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="topic-card-footer">
                <span className={`badge ${topic.difficulty === 'beginner' ? 'badge-teal' : topic.difficulty === 'intermediate' ? 'badge-amber' : 'badge-rose'}`}>
                  {topic.difficulty === 'beginner' ? '入門' : topic.difficulty === 'intermediate' ? '中級' : '上級'}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>更新 {topic.lastUpdated}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
