import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  AlertTriangle,
  Map,
  Building2,
  FileWarning,
  Phone,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import SidebarCollapseButton from "./SidebarCollapseButton";

const navItems = [
  {
    path: "/citizen",
    label: "Home",
    shortLabel: "Home",
    icon: Home,
    end: true,
  },
  {
    path: "/citizen/risk",
    label: "Risk Assessment",
    shortLabel: "Risk",
    icon: AlertTriangle,
  },
  {
    path: "/citizen/safe-route",
    label: "Safe Route",
    shortLabel: "Route",
    icon: Map,
  },
  {
    path: "/citizen/facilities",
    label: "Shelters",
    shortLabel: "Shel",
    icon: Building2,
  },
  {
    path: "/citizen/report",
    label: "Report Incident",
    shortLabel: "Report",
    icon: FileWarning,
    highlight: true,
  },
];

export default function CitizenSidebar({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
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

      <aside
        className={`fixed top-[var(--spacing-header)] left-0 bottom-0 z-40 flex flex-col border-r transition-[width,transform] duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: isCollapsed
            ? "var(--spacing-sidebar-collapsed)"
            : "var(--spacing-sidebar)",
          background: "linear-gradient(180deg, #0c1929 0%, #0f2340 100%)",
          borderColor: "#1a3050",
        }}
      >
        {!isCollapsed && (
          <div
            className="px-3 py-3 border-b"
            style={{
              borderColor: "#1a3050",
              background: "rgba(148, 163, 184, 0.04)",
            }}
          >
            {user && (
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9, #2563eb)",
                  }}
                >
                  <User size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">
                    {user.name || "Citizen"}
                  </div>
                  <div className="text-[0.65rem] text-sky-400/70 truncate">
                    {user.area || user.email || "Mumbai, Maharashtra"}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <nav className="flex-1 py-3 px-2 overflow-y-auto">
          {!isCollapsed && (
            <div className="text-[0.6rem] font-semibold tracking-[0.15em] text-sky-400/50 uppercase px-3 mb-2">
              Navigation
            </div>
          )}
          <ul className="list-none p-0 m-0 flex flex-col gap-0.5">
            {navItems.map((item) => {
              const isActive = item.end
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.end}
                    onClick={onClose}
                    title={isCollapsed ? item.label : undefined}
                    className={`flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-all duration-200 ${
                      isCollapsed ? "justify-center px-1.5 py-2" : "px-3"
                    }`}
                    style={{
                      color: isActive ? "#ffffff" : "#8eafc8",
                      background: isActive
                        ? "rgba(14, 165, 233, 0.18)"
                        : "transparent",
                      borderLeft: isCollapsed
                        ? "none"
                        : isActive
                          ? "2px solid #0ea5e9"
                          : "2px solid transparent",
                    }}
                  >
                    {isCollapsed ? (
                      <div className="flex flex-col items-center justify-center gap-1 text-center leading-none">
                        <Icon
                          size={18}
                          style={{
                            color: isActive
                              ? "#38bdf8"
                              : item.highlight
                                ? "#f59e0b"
                                : "#8eafc8",
                          }}
                        />
                        <span className="text-[0.5rem] font-semibold tracking-[0.04em] uppercase leading-tight">
                          {item.shortLabel || item.label}
                        </span>
                      </div>
                    ) : (
                      <>
                        <Icon
                          size={18}
                          style={{
                            color: isActive
                              ? "#38bdf8"
                              : item.highlight
                                ? "#f59e0b"
                                : "#8eafc8",
                          }}
                        />
                        <span>{item.label}</span>
                        {item.highlight && !isActive && (
                          <span className="ml-auto text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                            SOS
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

        <div className="relative border-t" style={{ borderColor: "#1a3050" }}>
          {!isCollapsed && (
            <div className="px-3 py-3">
              <a
                href="tel:112"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-bold no-underline transition-all"
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  color: "#f87171",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
              >
                <Phone size={16} />
                <span>Emergency SOS — 112</span>
              </a>
            </div>
          )}

          {!isCollapsed && (
            <div className="px-3 pb-3">
              <button
                onClick={logout}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-medium cursor-pointer border-none transition-colors"
                style={{ background: "transparent", color: "#8eafc8" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1a3050";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          {isCollapsed && (
            <div className="py-3 flex justify-center">
              <button
                onClick={logout}
                className="flex items-center justify-center w-10 py-2 rounded-lg text-red-400 hover:bg-red-50/10 cursor-pointer border-none bg-transparent transition-colors"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}

          <SidebarCollapseButton
            isCollapsed={isCollapsed}
            onToggle={onToggleCollapse}
          />
        </div>
      </aside>
    </>
  );
}
