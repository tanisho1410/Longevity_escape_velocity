import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Sparkles, Loader2 } from 'lucide-react';
import { topics, categoryLabels, difficultyLabels } from '../data/mockData';

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i}>{line.slice(4)}</h3>);
    } else if (line.startsWith('- ')) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        const itemContent = lines[i].slice(2);
        const parts = itemContent.split(/(\*\*[^*]+\*\*)/g);
        listItems.push(
          <li key={i}>
            {parts.map((p, j) =>
              p.startsWith('**') && p.endsWith('**')
                ? <strong key={j}>{p.slice(2, -2)}</strong>
                : p
            )}
          </li>
        );
        i++;
      }
      elements.push(<ul key={`ul-${i}`}>{listItems}</ul>);
      continue;
    } else if (line.trim() === '') {
      // skip blank lines
    } else {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <p key={i}>
          {parts.map((p, j) =>
            p.startsWith('**') && p.endsWith('**')
              ? <strong key={j}>{p.slice(2, -2)}</strong>
              : p
          )}
        </p>
      );
    }
    i++;
  }
  return elements;
}

export const TopicDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const topic = topics.find((t) => t.slug === slug);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  if (!topic) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 80 }}>
        <p style={{ color: 'var(--text-muted)' }}>トピックが見つかりませんでした。</p>
        <Link to="/topics" className="btn btn-secondary" style={{ marginTop: 20, display: 'inline-flex' }}>
          一覧に戻る
        </Link>
      </div>
    );
  }

  const handleAiSummary = async () => {
    // ★★★ [1] APIキーの読み込み場所 ★★★
    // ブラウザの保存領域（localStorage）または入力フォームからキーを取得します
    const key = apiKey || localStorage.getItem('openai_key') || '';

    // ★★★ [2] キーがない場合の処理 ★★★
    // キーが空の場合、ユーザーに入力フォームを表示して処理を中断します
    if (!key) {
      setShowKeyInput(true);
      return;
    }

    setAiLoading(true);
    setAiSummary('');
    try {
      // ★★★ [3] OpenAI API へのリクエスト送信 ★★★
      // ここで Authorization ヘッダーに APIキー（key）をセットして通信します
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'あなたはシンギュラリティ・長寿研究の専門的な解説者です。与えられたトピックを、日本語で3〜4段落にわたって分かりやすく要約してください。初心者にも理解できるような言葉を使いながらも、専門的な洞察を含めてください。',
            },
            {
              role: 'user',
              content: `以下のトピックを要約してください：\n\nタイトル：${topic.title}\n\n${topic.content}`,
            },
          ],
          max_tokens: 600,
          temperature: 0.7,
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.choices?.[0]?.message?.content || '';
      setAiSummary(text);

      // ★★★ [4] 入力されたキーの保存 ★★★
      // 入力されたキーをブラウザに保存し、次回から入力を不要にします
      if (apiKey) localStorage.setItem('openai_key', apiKey);
    } catch (err: any) {
      setAiSummary(`エラーが発生しました：${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="fade-in-up">
      <Link to="/topics" className="back-btn">
        <ArrowLeft size={15} /> トピック一覧に戻る
      </Link>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <span className="badge badge-muted">{categoryLabels[topic.category]}</span>
        <span className={`badge ${topic.difficulty === 'beginner' ? 'badge-teal' : topic.difficulty === 'intermediate' ? 'badge-amber' : 'badge-rose'}`}>
          {difficultyLabels[topic.difficulty]}
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
          最終更新：{topic.lastUpdated}
        </span>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, marginBottom: 8, lineHeight: 1.3 }}>
        {topic.title}
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 24 }}>{topic.subtitle}</p>

      <div className="card" style={{ marginBottom: 24 }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8 }}>{topic.overview}</p>
      </div>

      {/* AI Summary */}
      <div className="ai-summary-box" style={{ marginBottom: 28 }}>
        <div className="ai-summary-header">
          <span className="ai-badge"><Sparkles size={12} /> AI要約</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>OpenAI GPT-4o-mini</span>
        </div>

        {!aiSummary && !aiLoading && (
          <div>
            {showKeyInput && (
              <div className="form-group" style={{ marginBottom: 14 }}>
                <label className="form-label">OpenAI APIキー（一度入力すると保存されます）</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            )}
            <button onClick={handleAiSummary} className="btn btn-secondary btn-sm">
              <Sparkles size={13} /> このトピックをAIが要約する
            </button>
          </div>
        )}

        {aiLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: 14 }}>
            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            AIが要約を生成中です...
          </div>
        )}

        {aiSummary && (
          <div>
            <div className="ai-summary-text">{aiSummary}</div>
            <button onClick={() => setAiSummary('')} className="btn btn-ghost btn-sm" style={{ marginTop: 14 }}>
              再生成する
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="card" style={{ marginBottom: 28 }}>
        <div className="section-title" style={{ marginBottom: 20 }}>
          <span className="section-title-dot" />
          詳細解説
        </div>
        <div className="topic-content">
          {renderMarkdown(topic.content)}
        </div>
      </div>

      {/* Key Figures */}
      {topic.keyFigures.length > 0 && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="section-title" style={{ marginBottom: 16 }}>
            <span className="section-title-dot" style={{ background: 'var(--accent-secondary)', boxShadow: '0 0 8px var(--accent-secondary)' }} />
            関連する人物
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {topic.keyFigures.map((fig, i) => (
              <div key={i} style={{
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'var(--gradient-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <User size={15} color="#030712" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{fig.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{fig.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="tag-list">
        {topic.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  );
};
