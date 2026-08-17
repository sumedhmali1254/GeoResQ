import { motion } from 'framer-motion';

const riskColors = {
  critical: '#ef4444',
  high: '#f97316',
  moderate: '#eab308',
  low: '#22c55e',
};

function getRiskLevel(score) {
  if (score >= 75) return 'critical';
  if (score >= 50) return 'high';
  if (score >= 30) return 'moderate';
  return 'low';
}

export default function RiskGauge({ score, size = 120, label = 'Risk Score' }) {
  const level = getRiskLevel(score);
  const color = riskColors[level];
  const radius = (size - 16) / 2;
  const circumference = Math.PI * radius; // semicircle
  const progress = (score / 100) * circumference;
  const center = size / 2;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size / 2 + 16} viewBox={`0 0 ${size} ${size / 2 + 16}`}>
        {/* Background arc */}
        <path
          d={`M ${8} ${center} A ${radius} ${radius} 0 0 1 ${size - 8} ${center}`}
          fill="none"
          stroke="var(--color-bg-elevated)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <motion.path
          d={`M ${8} ${center} A ${radius} ${radius} 0 0 1 ${size - 8} ${center}`}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {/* Score text */}
        <text
          x={center}
          y={center - 4}
          textAnchor="middle"
          className="text-2xl font-bold"
          fill="var(--color-text-primary)"
          fontFamily="var(--font-sans)"
          fontSize={size * 0.2}
          fontWeight="700"
        >
          {score}
        </text>
        <text
          x={center}
          y={center + 12}
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-sans)"
          fontSize={size * 0.08}
          fontWeight="500"
        >
          / 100
        </text>
      </svg>
      <div className="flex flex-col items-center">
        <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">{label}</span>
        <span
          className="text-xs font-bold uppercase tracking-wider mt-0.5"
          style={{ color }}
        >
          {level}
        </span>
      </div>
    </div>
  );
}
