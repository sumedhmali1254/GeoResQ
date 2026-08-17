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
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Report Disaster</h1>
      <p className="text-xs text-[var(--color-text-muted)] mb-5">
        Your report helps verify ground conditions. Multiple reports increase confidence.
      </p>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Disaster Type */}
            <div>
              <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">
                Disaster Type *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {disasterTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, type }))}
                    className={`p-2.5 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                      form.type === type
                        ? 'bg-[var(--color-accent-blue)]/10 border-[var(--color-accent-blue)] text-[var(--color-text-primary)]'
                        : 'bg-[var(--color-bg-card)] border-[var(--color-border-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-primary)]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* GPS Location */}
            <div>
              <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">
                GPS Location
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)]">
                <MapPin size={14} className="text-[var(--color-accent-blue)]" />
                <span className="text-sm text-[var(--color-text-secondary)]">{form.location}</span>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">
                Photo Evidence
              </label>
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, hasPhoto: !p.hasPhoto }))}
                className={`w-full p-4 rounded-lg border-2 border-dashed flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  form.hasPhoto
                    ? 'border-[var(--color-accent-blue)] bg-[var(--color-accent-blue)]/5'
                    : 'border-[var(--color-border-primary)] bg-[var(--color-bg-input)] hover:border-[var(--color-text-muted)]'
                }`}
              >
                <Camera size={24} className={form.hasPhoto ? 'text-[var(--color-accent-blue)]' : 'text-[var(--color-text-muted)]'} />
                <span className="text-xs text-[var(--color-text-muted)]">
                  {form.hasPhoto ? '📷 Photo attached' : 'Tap to add photo'}
                </span>
              </button>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="Describe the situation..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent-blue)] transition-colors resize-none"
              />
            </div>

            {/* Time */}
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <Clock size={14} />
              <span>Time: {form.time}</span>
            </div>

            {/* Submit */}
            <button type="submit" className="btn-danger btn-lg w-full" disabled={!form.type}>
              <Send size={18} /> Submit Report
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="glass-card p-6 text-center">
              <CheckCircle size={48} className="text-[var(--color-risk-low)] mx-auto mb-3" />
              <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-1">Report Submitted</h2>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">{submitted.message}</p>

              <div className="space-y-3 text-left">
                <div className="flex justify-between p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
                  <span className="text-xs text-[var(--color-text-muted)]">Incident ID</span>
                  <span className="text-sm font-mono font-bold text-[var(--color-text-primary)]">{submitted.id}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
                  <span className="text-xs text-[var(--color-text-muted)]">Status</span>
                  <span className="text-sm font-medium text-[var(--color-risk-moderate)]">{submitted.verificationStatus}</span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
                  <ConfidenceIndicator value={submitted.confidence} size="sm" />
                </div>
              </div>
            </div>

            <div className="glass-card-subtle p-4">
              <div className="flex items-start gap-2">
                <ShieldCheck size={14} className="text-[var(--color-accent-blue)] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Your report confidence will increase as more citizens report from the same location
                  and as official data sources corroborate the information.
                </p>
              </div>
            </div>

            <button className="btn-secondary w-full" onClick={() => { setSubmitted(null); setForm({ type: '', description: '', hasPhoto: false, location: form.location, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }); }}>
              Submit Another Report
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
