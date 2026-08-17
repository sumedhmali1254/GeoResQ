import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Menu,
  X,
  Search,
  AlertTriangle,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import HeaderBrand from './HeaderBrand';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'critical', message: '⚠️ LBS Marg Underpass: Critical flooding (Barricaded)', time: '5m ago' },
  { id: 2, type: 'warning', message: '⚡ JVLR Flyover Corridor: Tree fall debris cleared', time: '18m ago' },
  { id: 3, type: 'info', message: 'ℹ️ Shelter Complex: Andheri West capacity at 65%', time: '40m ago' },
];

const SEARCHABLE_ITEMS = [
  { category: 'Route', name: 'Route A — via LBS Marg Evacuation', path: '/authority/routes', desc: 'Evacuation corridor passing through Kurla West underpass.' },
  { category: 'Route', name: 'Route B — via Western Express Highway', path: '/authority/routes', desc: 'Elevated highway corridor, recommended evac pathway.' },
  { category: 'Incident', name: 'Severe Waterlogging at Kurla West', path: '/authority/incidents', desc: 'Mithi River levels overflowed onto residential streets.' },
  { category: 'Incident', name: 'Drain Overflow near BKC Junction', path: '/authority/incidents', desc: 'High risk incident node under diagnostic evaluation.' },
  { category: 'Shelter', name: 'Andheri Sports Complex Shelter', path: '/authority/facilities', desc: 'Safe relief shelter complex with high capacity.' },
  { category: 'Shelter', name: 'Kurla Municipal School Shelter', lat: 19.072, path: '/authority/facilities', desc: 'Operational neighborhood relief facility.' },
  { category: 'Settings', name: 'GIS Engine Core Health Status', path: '/authority/settings', desc: 'Map server latency and prediction processor settings.' },
  { category: 'Settings', name: 'Notification SMS Broadcast Rules', path: '/authority/settings', desc: 'SMS dispatch gateway configurations.' },
];

export default function Navbar({ onMenuToggle, isSidebarOpen }) {
  const location = useLocation();
  const isAuthority = location.pathname.startsWith('/authority');
  const [showNotifs, setShowNotifs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  
  const notifRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifs(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }
    const filtered = SEARCHABLE_ITEMS.filter(item => 
      item.name.toLowerCase().includes(val.toLowerCase()) || 
      item.category.toLowerCase().includes(val.toLowerCase()) || 
      item.desc.toLowerCase().includes(val.toLowerCase())
    );
    setSearchResults(filtered);
    setShowSearchDropdown(true);
  };

  return (
    <header className="app-header fixed top-0 left-0 right-0 z-[1050] h-[var(--spacing-header)] flex items-center justify-between px-4 border-b">
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
        <HeaderBrand />
      </div>

      {/* Center: Interactive Search Bar */}
      <div className="hidden md:block relative w-80" ref={searchRef}>
        <div className="flex items-center gap-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-full px-3 py-1.5 focus-within:border-[var(--color-accent-blue)] transition-all">
          <Search size={14} className="text-[var(--color-text-muted)] flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
            placeholder="Search incidents, evacuation routes, shelters..."
            className="bg-transparent border-none text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none w-full"
          />
          {searchQuery && (
            <button 
              onClick={() => { setSearchQuery(''); setSearchResults([]); setShowSearchDropdown(false); }}
              className="text-[0.7rem] font-bold text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Floating Search Dropdown */}
        <AnimatePresence>
          {showSearchDropdown && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-[1100] max-h-80 overflow-y-auto"
            >
              <div className="p-2 divide-y divide-slate-100">
                {searchResults.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchDropdown(false);
                    }}
                    className="block p-2.5 hover:bg-slate-50 transition-colors no-underline text-left rounded-md"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[0.65rem] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">
                        {item.category}
                      </span>
                      <span className="text-[0.6rem] text-slate-400 font-bold">Jump to →</span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 mt-1">{item.name}</div>
                    <div className="text-[0.65rem] text-slate-400 mt-0.5 font-medium leading-normal">{item.desc}</div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
          {showSearchDropdown && searchResults.length === 0 && searchQuery.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-[1100] p-4 text-center text-xs text-[var(--color-text-muted)] font-bold"
            >
              No results found for "{searchQuery}"
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Status + Notifications */}
      <div className="flex items-center gap-3">
        {/* Live Status */}
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(22, 163, 74, 0.08)', border: '1px solid rgba(22, 163, 74, 0.18)' }}
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-status-live)] relative">
            <span className="absolute inset-0 rounded-full bg-[var(--color-status-live)] animate-ping opacity-75" />
          </div>
          <span className="text-xs font-semibold text-[var(--color-status-live)]">LIVE</span>
        </motion.div>

        {/* Notifications Button & Dropdown */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors border-none cursor-pointer bg-transparent"
          >
            <Bell size={18} className="text-[var(--color-text-secondary)]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-risk-critical)] rounded-full" />
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 bg-white border border-[var(--color-border-primary)] rounded-xl shadow-lg z-[1100] overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-[var(--color-border-secondary)] bg-slate-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">Active Alarms</span>
                  <span className="text-[0.65rem] font-bold text-blue-600 cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  {MOCK_NOTIFICATIONS.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors flex gap-2">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-700 leading-normal">{n.message}</p>
                        <span className="text-[0.6rem] text-slate-400 font-bold mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-[var(--color-border-secondary)] text-center">
                  <Link to="/authority/incidents" onClick={() => setShowNotifs(false)} className="text-[0.65rem] font-bold text-blue-600 hover:underline">
                    View all active logs
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
