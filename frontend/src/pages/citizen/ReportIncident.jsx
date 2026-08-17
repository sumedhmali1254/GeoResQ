import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Clock, Send, CheckCircle, ShieldCheck, AlertTriangle } from 'lucide-react';
import ConfidenceIndicator from '../../components/ConfidenceIndicator';

const disasterTypes = [
  'Flooded Road',
  'Building Waterlogging',
  'Drain Overflow',
  'Road Blockage',
  'Power Outage',
  'Stranded Vehicles',
  'Landslide Risk',
  'Other',
];

export default function ReportIncident() {
  const [form, setForm] = useState({
    type: '',
    description: '',
    hasPhoto: false,
    location: 'Auto-detected (19.073, 72.884)',
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
  });
  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.type) return;

    setSubmitted({
      id: `INC-${Math.floor(Math.random() * 900) + 100}`,
      confidence: 35,
      verificationStatus: 'unverified',
      message: 'Report submitted successfully. Your report will be verified against other data sources.',
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--color-border-secondary)' }}>
        <div>
          <h1 className="text-xl font-extrabold text-[var(--color-text-primary)]">Report Disaster Incident</h1>
          <p className="text-xs text-[var(--color-text-muted)]">Your reports help verify ground conditions. Multiple reports increase confidence.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Left Column: Disaster Type & GPS */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">
                  Select Incident Category *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {disasterTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, type }))}
                      className={`p-3.5 rounded-lg text-xs font-semibold text-left border transition-all cursor-pointer ${
                        form.type === type
                          ? 'bg-[var(--color-accent-blue)]/10 border-[var(--color-accent-blue)] text-[var(--color-text-primary)] font-extrabold shadow-xs'
                          : 'bg-[var(--color-bg-card)] border-[var(--color-border-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-primary)]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">
                  Detected GPS Coordinates
                </label>
                <div className="flex items-center gap-2 px-3 py-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)]">
                  <MapPin size={16} className="text-[var(--color-accent-blue)]" />
                  <span className="text-sm font-semibold text-[var(--color-text-secondary)] font-mono">{form.location}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Photo Evidence, Description, and Submit */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">
                    Upload Photo Evidence
                  </label>
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, hasPhoto: !p.hasPhoto }))}
                    className={`w-full p-6 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all ${
                      form.hasPhoto
                        ? 'border-[var(--color-accent-blue)] bg-[var(--color-accent-blue)]/5'
                        : 'border-[var(--color-border-primary)] bg-[var(--color-bg-input)] hover:border-[var(--color-text-muted)]'
                    }`}
                  >
                    <Camera size={28} className={form.hasPhoto ? 'text-[var(--color-accent-blue)] animate-pulse' : 'text-[var(--color-text-muted)]'} />
                    <span className="text-xs font-bold text-[var(--color-text-muted)]">
                      {form.hasPhoto ? '📷 Photo attached successfully' : 'Tap to capture / upload photo'}
                    </span>
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">
                    Additional Situation Details
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Provide details about water depth, road passability, or immediate safety hazards..."
                    rows={4}
                    className="w-full px-3.5 py-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent-blue)] transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)]">
                  <Clock size={14} className="text-[var(--color-accent-blue)]" />
                  <span>Report Time: {form.time}</span>
                </div>
              </div>

              <button type="submit" className="btn-danger btn-lg w-full flex items-center justify-center gap-2 shadow-sm font-bold" disabled={!form.type}>
                <Send size={16} />
                <span>Submit Emergency Report</span>
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="glass-card p-6 text-center shadow-xs">
              <CheckCircle size={48} className="text-[var(--color-risk-low)] mx-auto mb-3" />
              <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-1">Report Logged Successfully</h2>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">{submitted.message}</p>

              <div className="space-y-2.5 text-left">
                <div className="flex justify-between p-3 rounded-lg bg-[var(--color-bg-tertiary)] border">
                  <span className="text-xs font-semibold text-[var(--color-text-muted)]">Incident Token ID</span>
                  <span className="text-sm font-mono font-bold text-[var(--color-text-primary)]">{submitted.id}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-[var(--color-bg-tertiary)] border">
                  <span className="text-xs font-semibold text-[var(--color-text-muted)]">Verification Status</span>
                  <span className="text-sm font-extrabold text-[var(--color-risk-moderate)] uppercase">{submitted.verificationStatus}</span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-bg-tertiary)] border">
                  <ConfidenceIndicator value={submitted.confidence} size="sm" />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-4">
              <div className="glass-card-subtle p-5 border">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck size={16} className="text-[var(--color-accent-blue)] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    Thank you. Your submission has been broadcasted to the NDMA emergency feed.
                    Verification score will increase automatically as nearby citizens report matching details.
                  </p>
                </div>
              </div>

              <button className="btn-secondary btn-lg w-full flex items-center justify-center" onClick={() => { setSubmitted(null); setForm({ type: '', description: '', hasPhoto: false, location: form.location, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }); }}>
                Submit Another Report
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
