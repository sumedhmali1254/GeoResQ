import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bell,
  Menu,
  X,
  Shield,
} from 'lucide-react';

export default function Navbar({ onMenuToggle, isSidebarOpen }) {
  const location = useLocation();
  const isAuthority = location.pathname.startsWith('/authority');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[var(--spacing-header)] flex items-center justify-between px-4 border-b"
      style={{
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderColor: 'var(--color-border-secondary)',
      }}
    >
      {/* Left: Logo + Menu */}
      <div className="flex items-center gap-3">
        {isAuthority && (
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-1.5 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors border-none cursor-pointer bg-transparent"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X size={20} className="text-[var(--color-text-primary)]" /> : <Menu size={20} className="text-[var(--color-text-primary)]" />}
          </button>
        )}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
            <Shield size={18} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wider text-[var(--color-text-primary)] leading-tight">
              GEORESQ
            </span>
            <span className="text-[0.55rem] font-medium tracking-[0.2em] text-[var(--color-text-muted)] leading-tight uppercase">
              India
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Title */}
      {isAuthority && (
        <div className="hidden md:flex items-center gap-4">
          <span className="text-xs font-semibold tracking-[0.15em] text-[var(--color-text-muted)] uppercase">
            Command Center
          </span>
        </div>
      )}

      {/* Right: Status + Notifications */}
      <div className="flex items-center gap-3">
        {/* Live Status */}
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(22, 163, 74, 0.08)', border: '1px solid rgba(22, 163, 74, 0.18)' }}
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-2 h-2 rounded-full bg-[var(--color-status-live)] relative">
            <span className="absolute inset-0 rounded-full bg-[var(--color-status-live)] animate-ping opacity-75" />
          </div>
          <span className="text-xs font-medium text-[var(--color-status-live)]">LIVE</span>
        </motion.div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors border-none cursor-pointer bg-transparent">
          <Bell size={18} className="text-[var(--color-text-secondary)]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-risk-critical)] rounded-full" />
        </button>

        {/* Time */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-mono text-[var(--color-text-secondary)]">
            {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[0.6rem] text-[var(--color-text-muted)]">IST</span>
        </div>
      </div>
    </header>
  );
}
