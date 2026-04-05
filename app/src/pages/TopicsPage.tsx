import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { topics, categoryLabels, difficultyLabels } from '../data/mockData';

const categoryColors: Record<string, string> = {
  singularity: 'badge-indigo',
  lev: 'badge-teal',
  'how-to-live': 'badge-amber',
  society: 'badge-rose',
};

export const TopicsPage: React.FC = () => {
  const categories = ['lev', 'singularity', 'how-to-live', 'society'] as const;

  return (
    <div>
      <div className="page-header fade-in-up">
        <h1>トピック <span className="gradient-text">知識ベース</span></h1>
        <p>シンギュラリティ・長寿研究・超長寿時代の生き方に関する知識を体系的に学べます。</p>
      </div>

      {categories.map((cat) => {
        const catTopics = topics.filter((t) => t.category === cat);
        if (!catTopics.length) return null;
        return (
          <div key={cat} style={{ marginBottom: 36 }}>
            <div className="section-title">
              <span className={`badge ${categoryColors[cat]}`}>{categoryLabels[cat]}</span>
            </div>
            <div className="card-grid card-grid-2 stagger">
              {catTopics.map((topic) => (
                <Link key={topic.id} to={`/topics/${topic.slug}`} className="card topic-card">
                  <div className="topic-card-title">{topic.title}</div>
                  <div className="topic-card-sub">{topic.subtitle}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 14,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {topic.overview}
                  </p>
                  <div className="tag-list" style={{ marginBottom: 14 }}>
                    {topic.tags.slice(0, 3).map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="topic-card-footer">
                    <span className={`badge ${topic.difficulty === 'beginner' ? 'badge-teal' : topic.difficulty === 'intermediate' ? 'badge-amber' : 'badge-rose'}`}>
                      {difficultyLabels[topic.difficulty]}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <BookOpen size={11} /> 更新 {topic.lastUpdated}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
