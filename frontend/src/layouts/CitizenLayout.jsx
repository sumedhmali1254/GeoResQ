import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X, Bell } from "lucide-react";
import { motion } from "framer-motion";
import CitizenSidebar from "../components/CitizenSidebar";
import HeaderBrand from "../components/HeaderBrand";
import { useAuth } from "../context/AuthContext";

export default function CitizenLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Top bar */}
      <header className="app-header fixed top-0 left-0 right-0 z-50 h-[var(--spacing-header)] flex items-center justify-between px-4 border-b">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors border-none cursor-pointer bg-transparent"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? (
              <X size={20} className="text-[var(--color-text-primary)]" />
            ) : (
              <Menu size={20} className="text-[var(--color-text-primary)]" />
            )}
          </button>

          <HeaderBrand />
        </div>

        {/* Right: Status + Notifications */}
        <div className="flex items-center gap-3">
          {/* Live Status */}
          <motion.div
            className="flex items-center gap-2 px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(22, 163, 74, 0.08)",
              border: "1px solid rgba(22, 163, 74, 0.18)",
            }}
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-live)] relative">
              <span className="absolute inset-0 rounded-full bg-[var(--color-status-live)] animate-ping opacity-75" />
            </div>
            <span className="text-[0.6rem] font-medium text-[var(--color-status-live)]">
              LIVE
            </span>
          </motion.div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors border-none cursor-pointer bg-transparent">
            <Bell size={18} className="text-[var(--color-text-secondary)]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-risk-critical)] rounded-full" />
          </button>

          {/* Citizen Portal Label */}
          <div
            className="hidden sm:flex flex-col items-end justify-center px-3 py-2 rounded-lg border"
            style={{
              borderColor: "rgba(56, 189, 248, 0.6)",
              background:
                "linear-gradient(135deg, rgba(14, 165, 233, 0.45) 0%, rgba(30, 58, 138, 0.55) 100%)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 24px rgba(14, 165, 233, 0.2)",
            }}
          >
            <div className="text-[0.54rem] font-bold tracking-[0.18em] text-white uppercase drop-shadow-lg">
              Citizen Portal
            </div>
            <div className="mt-0.5 text-[0.68rem] font-semibold text-white drop-shadow-md">
              {formattedTime}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <CitizenSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Content */}
      <main
        className="pt-[var(--spacing-header)] h-screen overflow-hidden transition-all duration-300 flex flex-col"
        style={{
          paddingLeft: `var(${sidebarCollapsed ? "--spacing-sidebar-collapsed" : "--spacing-sidebar"})`,
        }}
      >
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </div>
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
