import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Send, MapPin, Database, Cpu, Route, Building2,
  ShieldCheck, Loader2,
} from 'lucide-react';
import { askCopilot } from '../../services/mockApi';

const suggestedQuestions = [
  'Which areas require immediate attention?',
  'Which emergency facilities are suitable for Zone 17?',
  'Which route is safest from Kurla to Andheri?',
  'What happens if rainfall increases by 40%?',
  'Which hospitals are exposed to flood risk?',
];

const toolIcons = {
  gis: { icon: MapPin, label: 'GIS Engine' },
  riskEngine: { icon: Database, label: 'Risk Engine' },
  impactEngine: { icon: Cpu, label: 'Impact Engine' },
  facilityIntelligence: { icon: Building2, label: 'Facility Intel' },
  routing: { icon: Route, label: 'Routing' },
};

export default function Copilot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [tools, setTools] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (query) => {
    const q = query || input.trim();
    if (!q || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: q }]);
    setLoading(true);

    try {
      const res = await askCopilot(q);
      setTools(res.data.tools);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: res.data.answer,
          sources: res.data.sources,
          confidence: res.data.confidence,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Unable to process request. Please try again.' },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="page-container flex flex-col" style={{ height: 'calc(100vh - var(--spacing-header))', padding: 0 }}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--color-border-secondary)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(99,102,241,0.3)' }}>
              <Bot size={20} className="text-[var(--color-accent-indigo)]" />
            </div>
            <div>
              <h1 className="text-base font-bold text-[var(--color-text-primary)]">AI Disaster Copilot</h1>
              <p className="text-xs text-[var(--color-text-muted)]">Intelligence powered by real system data — not AI assumptions</p>
            </div>
          </div>
        </div>

        {/* Tool Status */}
        {tools && (
          <div className="flex flex-wrap gap-2 mt-3">
            {Object.entries(toolIcons).map(([key, { icon: Icon, label }]) => (
              <div
                key={key}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-medium"
                style={{
                  background: tools[key] ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                  color: tools[key] ? 'var(--color-status-live)' : 'var(--color-status-error)',
                  border: `1px solid ${tools[key] ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                }}
              >
                <Icon size={10} />
                {label} {tools[key] ? '✓' : '✗'}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot size={48} className="text-[var(--color-text-muted)] mb-4 opacity-30" />
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              Ask questions about the current disaster situation.
              <br />
              Answers are generated from real backend intelligence data.
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-xl">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs text-[var(--color-text-secondary)] px-3 py-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-text-primary)] transition-all cursor-pointer text-left"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] rounded-xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-[var(--color-accent-blue)] text-white'
                    : 'glass-card'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <Bot size={14} className="text-[var(--color-accent-indigo)]" />
                    <span className="text-[0.65rem] font-semibold text-[var(--color-accent-indigo)]">COPILOT</span>
                  </div>
                )}
                <div className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? '' : 'text-[var(--color-text-primary)]'}`}>
                  {msg.content.split('\n').map((line, li) => {
                    // Handle markdown-style bold
                    const parts = line.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={li} className={li > 0 ? 'mt-1.5' : ''}>
                        {parts.map((part, pi) =>
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={pi}>{part.slice(2, -2)}</strong>
                            : part
                        )}
                      </p>
                    );
                  })}
                </div>
                {msg.sources && (
                  <div className="mt-3 pt-2 border-t border-[var(--color-border-secondary)]">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-[0.55rem] text-[var(--color-text-muted)] uppercase tracking-wider">Data sources:</span>
                      {msg.sources.map((s) => (
                        <span key={s} className="text-[0.6rem] px-2 py-0.5 rounded bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]">
                          {s}
                        </span>
                      ))}
                    </div>
                    {msg.confidence && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <ShieldCheck size={10} className="text-[var(--color-risk-low)]" />
                        <span className="text-[0.6rem] text-[var(--color-text-muted)]">
                          Response confidence: {msg.confidence}%
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 size={16} className="animate-spin text-[var(--color-accent-indigo)]" />
            Analyzing data sources...
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-[var(--color-border-secondary)]" style={{ background: 'var(--color-bg-card)' }}>
        {messages.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {suggestedQuestions.slice(0, 3).map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-[0.6rem] text-[var(--color-text-muted)] px-2 py-1 rounded bg-[var(--color-bg-card)] border border-[var(--color-border-secondary)] hover:border-[var(--color-accent-blue)] cursor-pointer transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about disaster situation, zones, facilities, routes..."
            className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent-blue)] transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="btn-primary p-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
