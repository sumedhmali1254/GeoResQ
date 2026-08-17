import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Map,
  AlertTriangle,
  BarChart3,
  Building2,
  Route,
  Package,
  FlaskConical,
  Bot,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const navItems = [
  { path: '/authority/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/authority/map', label: 'Live Map', icon: Map },
  { path: '/authority/incidents', label: 'Incidents', icon: AlertTriangle },
  { path: '/authority/impact', label: 'Impact', icon: BarChart3 },
  { path: '/authority/facilities', label: 'Facilities', icon: Building2 },
  { path: '/authority/routes', label: 'Routes', icon: Route },
  { path: '/authority/resources', label: 'Resources', icon: Package },
  { path: '/authority/simulator', label: 'Simulator', icon: FlaskConical, highlight: true },
  { path: '/authority/copilot', label: 'AI Copilot', icon: Bot },
];

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-[var(--spacing-header)] left-0 bottom-0 z-40 flex flex-col border-r transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          width: isCollapsed ? 'var(--spacing-sidebar-collapsed)' : 'var(--spacing-sidebar)',
          background: 'var(--color-sidebar-bg)',
          borderColor: 'var(--color-sidebar-border)',
        }}
      >
        {/* Nav Items */}
        <nav className="flex-1 py-3 px-2 overflow-y-auto">
          {!isCollapsed && (
            <div className="text-[0.6rem] font-semibold tracking-[0.15em] text-[var(--color-text-muted)] uppercase px-3 mb-2">
              Operations
            </div>
          )}
          <ul className="list-none p-0 m-0 flex flex-col gap-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    title={isCollapsed ? item.label : undefined}
                    className={`flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-all duration-200 ${
                      isCollapsed ? 'justify-center px-2' : 'px-3'
                    }`}
                    style={{
                      color: isActive ? 'var(--color-sidebar-text-active)' : 'var(--color-sidebar-text)',
                      background: isActive ? 'rgba(59, 130, 246, 0.18)' : 'transparent',
                      borderLeft: isCollapsed ? 'none' : isActive ? '2px solid var(--color-accent-blue)' : '2px solid transparent',
                    }}
                  >
                    <Icon
                      size={18}
                      style={{
                        color: isActive
                          ? '#60a5fa'
                          : item.highlight
                          ? '#a78bfa'
                          : 'var(--color-sidebar-text)',
                      }}
                    />
                    {!isCollapsed && (
                      <>
                        <span>{item.label}</span>
                        {item.highlight && !isActive && (
                          <span className="ml-auto text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                            NEW
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Toggle — only on desktop */}
        <div className="hidden lg:block px-2 py-2 border-t" style={{ borderColor: 'var(--color-sidebar-border)' }}>
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer border-none"
            style={{
              background: 'var(--color-sidebar-hover)',
              color: 'var(--color-sidebar-text)',
            }}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronsRight size={16} /> : <><ChevronsLeft size={16} /> <span>Collapse</span></>}
          </button>
        </div>

        {/* Footer - System Status */}
        {!isCollapsed && (
          <div className="p-3 border-t" style={{ borderColor: 'var(--color-sidebar-border)' }}>
            <div className="text-[0.6rem] font-semibold tracking-[0.15em] text-[var(--color-text-muted)] uppercase mb-2">
              System Status
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                { label: 'GIS Engine', status: true },
                { label: 'Risk Engine', status: true },
                { label: 'Data Pipeline', status: true },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{s.label}</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${s.status ? 'bg-emerald-400' : 'bg-red-400'}`} />
                    <span className={`text-[0.6rem] ${s.status ? 'text-emerald-400' : 'text-red-400'}`}>
                      {s.status ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
