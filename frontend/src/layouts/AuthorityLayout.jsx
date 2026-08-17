import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function AuthorityLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isSidebarOpen={sidebarOpen}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main
        className="pt-[var(--spacing-header)] min-h-screen transition-all duration-300"
        style={{
          paddingLeft: `var(${sidebarCollapsed ? '--spacing-sidebar-collapsed' : '--spacing-sidebar'})`,
        }}
      >
        <Outlet />
      </main>

      {/* Mobile: hide the desktop padding */}
      <style>{`
        @media (max-width: 1023px) {
          main { padding-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
