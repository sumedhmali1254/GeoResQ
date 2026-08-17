import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import SidebarCollapseButton from "./SidebarCollapseButton";

const navItems = [
  {
    path: "/authority/dashboard",
    label: "Dashboard",
    shortLabel: "Dash",
    icon: LayoutDashboard,
  },
  { path: "/authority/map", label: "Live Map", shortLabel: "Map", icon: Map },
  {
    path: "/authority/incidents",
    label: "Incidents",
    shortLabel: "Inc",
    icon: AlertTriangle,
  },
  {
    path: "/authority/impact",
    label: "Impact",
    shortLabel: "Impact",
    icon: BarChart3,
  },
  {
    path: "/authority/facilities",
    label: "Facilities",
    shortLabel: "Fac",
    icon: Building2,
  },
  {
    path: "/authority/routes",
    label: "Routes",
    shortLabel: "Route",
    icon: Route,
  },
  {
    path: "/authority/resources",
    label: "Resources",
    shortLabel: "Res",
    icon: Package,
  },
  {
    path: "/authority/simulator",
    label: "Simulator",
    shortLabel: "Sim",
    icon: FlaskConical,
    highlight: true,
  },
  {
    path: "/authority/copilot",
    label: "AI Copilot",
    shortLabel: "AI",
    icon: Bot,
  },
  {
    path: "/authority/settings",
    label: "Settings",
    shortLabel: "Set",
    icon: Settings,
  },
];

export default function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1039] bg-black/40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed top-[var(--spacing-header)] left-0 bottom-0 z-[1040] flex flex-col border-r transition-[width,transform] duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: isCollapsed
            ? "var(--spacing-sidebar-collapsed)"
            : "var(--spacing-sidebar)",
          background: "var(--color-sidebar-bg)",
          borderColor: "var(--color-sidebar-border)",
        }}
      >
        <nav className="flex-1 py-4 px-2 overflow-y-auto">
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
                      isCollapsed ? "justify-center px-1.5 py-2" : "px-3"
                    }`}
                    style={{
                      color: isActive
                        ? "var(--color-sidebar-text-active)"
                        : "var(--color-sidebar-text)",
                      background: isActive
                        ? "rgba(59, 130, 246, 0.18)"
                        : "transparent",
                      borderLeft: isCollapsed
                        ? "none"
                        : isActive
                          ? "2px solid var(--color-accent-blue)"
                          : "2px solid transparent",
                    }}
                  >
                    {isCollapsed ? (
                      <div className="flex flex-col items-center justify-center gap-1 text-center leading-none">
                        <Icon
                          size={18}
                          style={{
                            color: isActive
                              ? "#60a5fa"
                              : item.highlight
                                ? "#a78bfa"
                                : "var(--color-sidebar-text)",
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
                              ? "#60a5fa"
                              : item.highlight
                                ? "#a78bfa"
                                : "var(--color-sidebar-text)",
                          }}
                        />
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

        <div
          className="p-3 border-t relative"
          style={{ borderColor: "var(--color-sidebar-border)" }}
        >
          {!isCollapsed ? (
            <>
              <div className="mb-3 px-3 py-2 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)] text-center">
                <div className="text-[0.55rem] font-bold tracking-[0.15em] text-[var(--color-text-muted)] uppercase mb-0.5">
                  Role Context
                </div>
                <div className="text-[0.7rem] font-black text-[var(--color-text-secondary)] uppercase">
                  Command Center
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer border-none transition-colors"
                style={{
                  background: "transparent",
                  color: "var(--color-sidebar-text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "var(--color-sidebar-hover)";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--color-sidebar-text)";
                }}
              >
                <LogOut size={14} className="text-red-400" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <button
              onClick={logout}
              className="flex items-center justify-center w-full py-2.5 rounded-lg text-red-400 hover:bg-red-50/10 cursor-pointer border-none bg-transparent transition-colors"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
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
