import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dna, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 600));
    const success = login(code);
    setLoading(false);
    if (success) {
      navigate('/home');
    } else {
      setError('招待コードが正しくありません。');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-bg-orb login-bg-orb-1" />
      <div className="login-bg-orb login-bg-orb-2" />

      <div className="login-card fade-in-up">
        <div className="login-logo">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'linear-gradient(135deg, #00d4aa, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Dna size={26} color="#030712" />
            </div>
          </div>
          <div className="login-logo-text">LEV Circle</div>
          <div className="login-logo-sub">Longevity Escape Velocity Community</div>
        </div>

        <p className="login-desc">
          シンギュラリティと寿命脱出速度を学び、<br />
          長寿時代の生き方を共に考えるコミュニティへようこそ。<br />
          <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>招待制のクローズドコミュニティです。</span>
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">招待コード</label>
            <input
              className="form-input"
              type="text"
              placeholder="招待コードを入力"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoFocus
              style={{ textAlign: 'center', letterSpacing: 3, fontSize: 18, fontWeight: 600 }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading || !code.trim()}
            style={{ justifyContent: 'center', width: '100%' }}
          >
            {loading ? <span className="spinner" /> : <><span>コミュニティに入る</span><ArrowRight size={16} /></>}
          </button>
          {error && <div className="login-error">{error}</div>}
          <div className="login-hint">招待コードは主催者からお受け取りください</div>
        </form>
      </div>
    </div>
  );
};
