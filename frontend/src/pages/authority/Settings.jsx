import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Server, Bell, Link2, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Inspector Sumedh Mali',
    email: user?.email || 'admin@ndma.gov.in',
    badgeId: user?.badgeId || 'MDMA-2847',
    department: 'National Disaster Response Force (NDRF)',
  });

  const [notifSettings, setNotifSettings] = useState({
    smsAlerts: true,
    emailAlerts: true,
    sirenActivation: false,
    autoEvacAlerts: true,
  });

  const [engines, setEngines] = useState({
    gis: { label: 'GIS Map Engine', status: 'Online', latency: '42ms', uptime: '99.98%' },
    risk: { label: 'Hazard Risk Processor', status: 'Online', latency: '18ms', uptime: '99.99%' },
    data: { label: 'OSRM Route Server Pipeline', status: 'Online', latency: '85ms', uptime: '99.95%' },
  });

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-container">
      <div className="pb-4 border-b border-[var(--color-border-secondary)] mb-6">
        <h1 className="page-title !mb-1">Control Center Config & Settings</h1>
        <p className="page-subtitle font-medium">Configure operational settings, manage profile credentials, and inspect system core engine health</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Sub-sidebar styled with light slate shade matching app theme (Col span 3) */}
        <div className="lg:col-span-3 glass-card border border-[var(--color-border-primary)] shadow-sm rounded-xl overflow-hidden h-fit" style={{ background: '#f8fafc' }}>
          <div className="px-4 py-3 border-b text-[0.6rem] font-extrabold tracking-[0.1em] text-[var(--color-text-muted)] uppercase border-[var(--color-border-secondary)] bg-[#f1f5f9]">
            Settings Console
          </div>
          <div className="p-2 space-y-1">
            {[
              { id: 'profile', label: 'User Profile', icon: User },
              { id: 'status', label: 'System Engines', icon: Server },
              { id: 'notifs', label: 'Notification Rules', icon: Bell },
              { id: 'api', label: 'API Integrations', icon: Link2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer border-none transition-all text-left"
                  style={{
                    color: isSelected ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
                    background: isSelected ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
                    borderLeft: isSelected ? '3px solid var(--color-accent-blue)' : '3px solid transparent',
                  }}
                >
                  <Icon size={16} className={isSelected ? 'text-[var(--color-accent-blue)]' : 'text-[var(--color-text-muted)]'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Details Panel (Col span 9) */}
        <div className="lg:col-span-9 glass-card p-6 min-h-[400px] border border-[var(--color-border-primary)] shadow-sm relative overflow-hidden">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h2 className="text-sm font-bold uppercase text-[var(--color-text-primary)] tracking-wider mb-1">User Profile Context</h2>
                <p className="text-xs text-[var(--color-text-muted)]">Configure authority credentials for real-time dispatch authorization</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--color-text-secondary)]">Authority Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-lg px-3 py-2 text-xs text-[var(--color-text-primary)] focus:border-blue-500 outline-none font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--color-text-secondary)]">Official Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-lg px-3 py-2 text-xs text-[var(--color-text-primary)] focus:border-blue-500 outline-none font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--color-text-secondary)]">NDMA Badge ID</label>
                  <input
                    type="text"
                    name="badgeId"
                    value={profileForm.badgeId}
                    onChange={handleProfileChange}
                    className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-lg px-3 py-2 text-xs text-[var(--color-text-primary)] focus:border-blue-500 outline-none font-mono font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--color-text-secondary)]">Assigned Department</label>
                  <input
                    type="text"
                    name="department"
                    value={profileForm.department}
                    onChange={handleProfileChange}
                    className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-lg px-3 py-2 text-xs text-[var(--color-text-primary)] focus:border-blue-500 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border-secondary)] flex justify-end">
                <button className="btn-primary btn-sm px-6 py-2.5 rounded-lg text-xs font-bold">
                  Save Settings
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'status' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h2 className="text-sm font-bold uppercase text-[var(--color-text-primary)] tracking-wider mb-1">System core engine health</h2>
                <p className="text-xs text-[var(--color-text-muted)]">Real-time status tracking for spatial database engines and prediction modules</p>
              </div>

              <div className="space-y-4">
                {Object.entries(engines).map(([key, item]) => (
                  <div key={key} className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[var(--color-text-primary)]">{item.label}</div>
                      <div className="text-[0.65rem] text-[var(--color-text-muted)] mt-1 font-semibold flex gap-3">
                        <span>Latency: <strong>{item.latency}</strong></span>
                        <span>Uptime: <strong>{item.uptime}</strong></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-emerald-500 uppercase">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[var(--color-border-secondary)] flex justify-between items-center text-xs">
                <span className="text-[var(--color-text-muted)] font-semibold">Last checked: Just now</span>
                <button
                  onClick={() => {
                    const next = { ...engines };
                    Object.keys(next).forEach(k => {
                      next[k].latency = `${Math.floor(Math.random() * 80) + 15}ms`;
                    });
                    setEngines(next);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] border-none text-[0.65rem] font-bold cursor-pointer transition-colors"
                >
                  <RefreshCw size={12} /> Force Diagnostics
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifs' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h2 className="text-sm font-bold uppercase text-[var(--color-text-primary)] tracking-wider mb-1">Notification Dispatch Rules</h2>
                <p className="text-xs text-[var(--color-text-muted)]">Configure SMS gateways and emergency siren dispatch settings for local authorities</p>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'smsAlerts', title: 'Emergency SMS Broadcast', desc: 'Broadcast critical flood evacuation warnings to citizens within 500m of incident nodes.' },
                  { key: 'emailAlerts', title: 'Department Head Email Alarms', desc: 'Forward risk analysis logs and blockage maps to Municipal Commissioners instantly.' },
                  { key: 'sirenActivation', title: 'Physical Audio Siren Triggers', desc: 'Activate local municipal audio alert sirens in critical zones if water levels cross 1.5ft.' },
                  { key: 'autoEvacAlerts', title: 'Automated Evacuation Route Push', desc: 'Directly send recalculation routes to the Citizen Portal when a road blockage is confirmed.' },
                ].map((item) => (
                  <div key={item.key} className="flex items-start justify-between p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)] gap-6">
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[var(--color-text-primary)] mb-0.5">{item.title}</div>
                      <p className="text-[0.65rem] text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                      <input
                        type="checkbox"
                        checked={notifSettings[item.key]}
                        onChange={() => setNotifSettings({ ...notifSettings, [item.key]: !notifSettings[item.key] })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'api' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h2 className="text-sm font-bold uppercase text-[var(--color-text-primary)] tracking-wider mb-1">API Integrations</h2>
                <p className="text-xs text-[var(--color-text-muted)]">Configure routing layers, basemaps, and live satellite service integrations</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-tertiary)] space-y-3">
                  <div className="text-xs font-bold text-[var(--color-text-primary)]">Public OSRM Router Config</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      disabled
                      value="https://router.project-osrm.org/route/v1/"
                      className="bg-slate-50 border border-[var(--color-border-primary)] rounded-lg px-3 py-2 text-xs text-[var(--color-text-muted)] outline-none flex-1 font-mono"
                    />
                    <button className="px-3.5 py-2 rounded-lg bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] border-none text-xs font-bold">
                      Ping
                    </button>
                  </div>
                  <p className="text-[0.6rem] text-[var(--color-text-muted)]">OSRM is used to snap raw incident coordinates to high-fidelity street paths in real-time.</p>
                </div>

                <div className="p-4 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-tertiary)] space-y-3">
                  <div className="text-xs font-bold text-[var(--color-text-primary)]">CartoDB Voyager Basemap Tiles</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      disabled
                      value="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                      className="bg-slate-50 border border-[var(--color-border-primary)] rounded-lg px-3 py-2 text-xs text-[var(--color-text-muted)] outline-none flex-1 font-mono"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
