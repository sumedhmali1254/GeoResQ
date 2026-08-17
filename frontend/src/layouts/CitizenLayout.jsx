import { NavLink, Outlet, Link } from 'react-router-dom';
import { Shield, Home, AlertTriangle, Map, Building2, FileWarning, ArrowLeft } from 'lucide-react';

const bottomNavItems = [
  { path: '/citizen', label: 'Home', icon: Home, end: true },
  { path: '/citizen/risk', label: 'Risk', icon: AlertTriangle },
  { path: '/citizen/safe-route', label: 'Route', icon: Map },
  { path: '/citizen/facilities', label: 'Shelters', icon: Building2 },
  { path: '/citizen/report', label: 'Report', icon: FileWarning },
];

export default function CitizenLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col font-sans">
      {/* Top bar */}
      <header
        className="sticky top-0 z-50 h-[var(--spacing-header)] flex items-center justify-between px-4 border-b shadow-xs"
        style={{
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px)',
          borderColor: 'var(--color-border-secondary)',
        }}
      >
        <div className="flex items-center gap-3">
          <Link to="/" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors p-1" title="Back to Home">
            <ArrowLeft size={18} />
          </Link>
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shadow-xs"
              style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
              <Shield size={14} className="text-white" />
            </div>
            <span className="text-sm font-extrabold tracking-wider text-[var(--color-text-primary)]">
              GEORESQ
            </span>
          </Link>
        </div>
        <span className="text-[0.65rem] font-bold tracking-[0.12em] text-[var(--color-accent-blue)] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full uppercase">
          Citizen Portal
        </span>
      </header>

      {/* Content */}
      <main className="flex-1 pb-20 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t flex items-center justify-around px-2 py-1.5 shadow-lg"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          borderColor: 'var(--color-border-secondary)',
        }}
      >
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-lg no-underline transition-colors"
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-accent-blue)' : 'var(--color-text-muted)',
                fontWeight: isActive ? '700' : '500',
              })}
            >
              <Icon size={20} />
              <span className="text-[0.6rem]">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
