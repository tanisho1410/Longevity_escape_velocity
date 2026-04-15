import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, BookOpen, User, LogOut, Dna } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { to: '/home', label: 'ダッシュボード', icon: LayoutDashboard },
  { to: '/events', label: 'イベント', icon: Calendar },
  { to: '/topics', label: 'トピック', icon: BookOpen },
  { to: '/profile', label: 'プロフィール', icon: User },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Dna size={22} color="#00d4aa" />
            <div>
              <div className="logo-text">LEV Circle</div>
              <div className="logo-sub">招待制コミュニティ</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
            return (
              <Link key={item.to} to={item.to} className={`nav-item ${isActive ? 'active' : ''}`}>
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          {user?.nickname && (
            <div style={{ padding: '8px 14px 12px', fontSize: 13, color: 'var(--text-muted)' }}>
              👤 {user.nickname}
            </div>
          )}
          <button className="nav-item btn-ghost" onClick={handleLogout} style={{ width: '100%' }}>
            <LogOut size={17} />
            ログアウト
          </button>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
