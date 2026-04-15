import React, { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { events } from '../data/mockData';

const INTEREST_TAGS = [
  'LEV', 'シンギュラリティ', 'AI', '老化研究', '人生設計', 'SENS',
  '哲学', '経済', '社会設計', '心理学', '読書', '技術加速', '倫理',
];

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useApp();
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(user?.tags || []);
  const [saved, setSaved] = useState(false);

  const attendedEvents = events.filter((e) => user?.attendedEvents?.includes(e.id));

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    updateUser({ nickname, tags: selectedTags });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = nickname ? nickname.slice(0, 1).toUpperCase() : '?';

  return (
    <div className="fade-in-up">
      <div className="page-header">
        <h1>プロフィール <span className="gradient-text">設定</span></h1>
        <p>ニックネームと興味のあるテーマを設定しましょう。</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
        <div>
          <div className="card" style={{ marginBottom: 24 }}>
            <div className="section-title" style={{ marginBottom: 20 }}>
              <span className="section-title-dot" />
              基本情報
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
              <div className="profile-avatar">{initials}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>招待制メンバー</div>
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="form-label">ニックネーム</label>
              <input
                className="form-input"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="表示名を入力してください"
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ marginBottom: 10 }}>
                興味のあるテーマ（複数選択可）
              </label>
              <div className="tag-list">
                {INTEREST_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '100px',
                      fontSize: 12,
                      cursor: 'pointer',
                      transition: 'all var(--transition)',
                      fontFamily: 'inherit',
                      border: selectedTags.includes(tag)
                        ? '1px solid rgba(0,212,170,0.5)'
                        : '1px solid var(--border-subtle)',
                      background: selectedTags.includes(tag)
                        ? 'rgba(0,212,170,0.15)'
                        : 'rgba(255,255,255,0.04)',
                      color: selectedTags.includes(tag)
                        ? 'var(--accent-primary)'
                        : 'var(--text-secondary)',
                    }}
                  >
                    {selectedTags.includes(tag) ? '✓ ' : ''}{tag}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <button onClick={handleSave} className={`btn ${saved ? 'btn-secondary' : 'btn-primary'}`}>
                {saved ? <><CheckCircle size={16} /> 保存しました</> : <><Save size={16} /> 変更を保存</>}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="section-title" style={{ marginBottom: 20 }}>
              <span className="section-title-dot" style={{ background: 'var(--accent-secondary)', boxShadow: '0 0 8px var(--accent-secondary)' }} />
              参加予定のイベント
            </div>

            {attendedEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: 14 }}>
                まだ参加予定のイベントはありません。<br />
                <a href="/events" style={{ color: 'var(--accent-primary)', marginTop: 8, display: 'inline-block' }}>
                  イベントを探す →
                </a>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {attendedEvents.map((event) => (
                  <div key={event.id} style={{
                    padding: '14px 16px',
                    background: 'rgba(0,212,170,0.04)',
                    border: '1px solid rgba(0,212,170,0.12)',
                    borderRadius: 'var(--radius-sm)',
                  }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, lineHeight: 1.4 }}>{event.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{event.date} · {event.location}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedTags.length > 0 && (
            <div className="card" style={{ marginTop: 24 }}>
              <div className="section-title" style={{ marginBottom: 14 }}>
                <span className="section-title-dot" style={{ background: 'var(--accent-tertiary)', boxShadow: '0 0 8px var(--accent-tertiary)' }} />
                選択中のテーマ
              </div>
              <div className="tag-list">
                {selectedTags.map((tag) => (
                  <span key={tag} className="badge badge-teal">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
