export function CircuitDiagram() {
  return (
    <svg viewBox="0 0 400 120" className="w-full h-28 opacity-60" fill="none">
      <line x1="20" y1="60" x2="80" y2="60" stroke="#14dcbe" strokeWidth="1.5" className="circuit-line" />
      <rect x="80" y="44" width="40" height="32" rx="3" stroke="#14dcbe" strokeWidth="1.5" fill="hsl(220 18% 12%)" />
      <text x="100" y="63" textAnchor="middle" fill="#14dcbe" fontSize="8" fontFamily="IBM Plex Mono">SEN</text>
      <line x1="120" y1="60" x2="180" y2="60" stroke="#14dcbe" strokeWidth="1.5" className="circuit-line" />
      <circle cx="180" cy="60" r="4" fill="#f5c842" className="pulse-dot" />
      <line x1="184" y1="60" x2="240" y2="60" stroke="#f5c842" strokeWidth="1.5" className="circuit-line" />
      <rect x="240" y="44" width="40" height="32" rx="3" stroke="#f5c842" strokeWidth="1.5" fill="hsl(220 18% 12%)" />
      <text x="260" y="63" textAnchor="middle" fill="#f5c842" fontSize="8" fontFamily="IBM Plex Mono">ADC</text>
      <line x1="280" y1="60" x2="340" y2="60" stroke="#14dcbe" strokeWidth="1.5" className="circuit-line" />
      <rect x="340" y="44" width="40" height="32" rx="3" stroke="#14dcbe" strokeWidth="1.5" fill="hsl(220 18% 12%)" />
      <text x="360" y="63" textAnchor="middle" fill="#14dcbe" fontSize="8" fontFamily="IBM Plex Mono">ПЛК</text>
      <text x="100" y="30" textAnchor="middle" fill="hsl(220 10% 50%)" fontSize="7" fontFamily="IBM Plex Mono">Датчик</text>
      <text x="260" y="30" textAnchor="middle" fill="hsl(220 10% 50%)" fontSize="7" fontFamily="IBM Plex Mono">АЦП</text>
      <text x="360" y="30" textAnchor="middle" fill="hsl(220 10% 50%)" fontSize="7" fontFamily="IBM Plex Mono">Контроллер</text>
      <path d="M 184 56 L 184 20 L 260 20" stroke="#f5c842" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      <text x="222" y="15" textAnchor="middle" fill="hsl(220 10% 50%)" fontSize="6" fontFamily="IBM Plex Mono">4–20мА / RS-485</text>
    </svg>
  );
}

export function SignalChart({ color }: { color: string }) {
  const heights = [20, 45, 35, 70, 55, 80, 60, 75, 40, 85, 50, 65];
  return (
    <div className="flex items-end gap-0.5 h-10">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm signal-bar"
          style={{
            height: `${h}%`,
            background: color,
            opacity: 0.7,
            animationDelay: `${i * 0.12}s`,
            animationDuration: `${1.2 + (i % 3) * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

export function StatusDot({ active = true }: { active?: boolean }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${active ? "bg-neon pulse-dot" : "bg-red-500"}`}
      style={{ boxShadow: active ? "0 0 8px #14dcbe" : "0 0 8px #ef4444" }}
    />
  );
}
