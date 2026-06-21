export function LearnAiArt() {
  return (
    <div className="feat-art" style={{ background: "linear-gradient(135deg, #f6f3fb 0%, #ece6f7 100%)", borderColor: "#d9cff0", padding: 0, overflow: "hidden", position: "relative" }}>
      <svg viewBox="0 0 480 240" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <pattern id="learn-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0 L0 0 0 24" fill="none" stroke="#d9cff0" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="learn-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f6f3fb" />
          </linearGradient>
        </defs>
        <rect width="480" height="240" fill="url(#learn-grid)" />

        {/* Back card (offset, faded) */}
        <g opacity="0.55" transform="translate(80,40) rotate(-4 130 70)">
          <rect width="260" height="140" rx="8" fill="#ffffff" stroke="#d9cff0" strokeWidth="1" />
          <rect x="18" y="18" width="36" height="36" rx="6" fill="#ece6f7" />
          <rect x="66" y="22" width="110" height="8" rx="3" fill="#d9cff0" />
          <rect x="66" y="38" width="70" height="6" rx="3" fill="#e7dff3" />
          <rect x="18" y="74" width="224" height="4" rx="2" fill="#ece6f7" />
          <rect x="18" y="86" width="180" height="4" rx="2" fill="#ece6f7" />
          <rect x="18" y="98" width="200" height="4" rx="2" fill="#ece6f7" />
        </g>

        {/* Middle card */}
        <g opacity="0.85" transform="translate(100,52) rotate(2 130 70)">
          <rect width="260" height="140" rx="8" fill="url(#learn-card)" stroke="#c4b3e6" strokeWidth="1" />
          <rect x="18" y="18" width="36" height="36" rx="6" fill="#ece6f7" />
          <text x="36" y="42" textAnchor="middle" fontFamily="var(--mono)" fontSize="16" fontWeight="700" fill="#4c1d95">
            C
          </text>
          <rect x="66" y="22" width="120" height="8" rx="3" fill="#b39ddb" />
          <rect x="66" y="38" width="60" height="6" rx="3" fill="#d9cff0" />
          <rect x="18" y="74" width="224" height="4" rx="2" fill="#e7dff3" />
          <rect x="18" y="86" width="180" height="4" rx="2" fill="#e7dff3" />
          <rect x="18" y="98" width="200" height="4" rx="2" fill="#e7dff3" />
        </g>

        {/* Front card — in focus, with annotation circle + marks */}
        <g transform="translate(120,64)">
          <rect width="260" height="140" rx="10" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5" />
          <rect x="18" y="18" width="40" height="40" rx="8" fill="#7c3aed" />
          <circle cx="38" cy="38" r="7" fill="none" stroke="#ffffff" strokeWidth="2.5" />
          <rect x="70" y="22" width="130" height="10" rx="3" fill="#4c1d95" />
          <rect x="70" y="40" width="80" height="6" rx="3" fill="#b39ddb" />
          <rect x="18" y="78" width="224" height="5" rx="2" fill="#ece6f7" />
          <rect x="18" y="92" width="190" height="5" rx="2" fill="#ece6f7" />
          <rect x="18" y="106" width="170" height="5" rx="2" fill="#ece6f7" />
          <circle cx="100" cy="95" r="22" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 3" />
          <g transform="translate(140,82)">
            <rect width="58" height="18" rx="4" fill="#4c1d95" />
            <text x="29" y="12" textAnchor="middle" fontFamily="var(--mono)" fontSize="7" fill="#fff" letterSpacing="0.6">
              LESSON 03
            </text>
          </g>
        </g>

        {/* Progress dots */}
        <g transform="translate(180,218)">
          <circle cx="0" cy="0" r="4" fill="#7c3aed" />
          <circle cx="16" cy="0" r="4" fill="#7c3aed" />
          <circle cx="32" cy="0" r="4" fill="#7c3aed" />
          <circle cx="48" cy="0" r="4" fill="#b39ddb" />
          <circle cx="64" cy="0" r="4" fill="#b39ddb" />
          <circle cx="80" cy="0" r="4" fill="#d9cff0" />
          <circle cx="96" cy="0" r="4" fill="#d9cff0" />
          <circle cx="112" cy="0" r="4" fill="#d9cff0" />
        </g>
      </svg>
    </div>
  );
}

export function EcosystemArt() {
  return (
    <div className="feat-art" style={{ background: "linear-gradient(135deg, #ece6f7 0%, #f6f3fb 100%)", borderColor: "#d9cff0", padding: 0, overflow: "hidden", position: "relative" }}>
      <svg viewBox="0 0 480 240" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <pattern id="eco-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0 L0 0 0 24" fill="none" stroke="#d9cff0" strokeWidth="0.5" />
          </pattern>
          <marker id="eco-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="#7c3aed" />
          </marker>
        </defs>
        <rect width="480" height="240" fill="url(#eco-grid)" />

        <path d="M 90,110 C 100,140 150,170 180,170" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#eco-arrow)" />
        <path d="M 320,170 C 350,170 390,140 390,110" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#eco-arrow)" />

        <g fill="#b39ddb" opacity="0.45">
          <circle cx="40" cy="25" r="2" />
          <circle cx="90" cy="220" r="1.5" />
          <circle cx="250" cy="35" r="1.5" />
          <circle cx="430" cy="25" r="2" />
          <circle cx="440" cy="220" r="1.5" />
        </g>

        <g transform="translate(20,50)">
          <rect width="140" height="60" rx="10" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5" />
          <rect x="10" y="12" width="28" height="28" rx="6" fill="#ece6f7" />
          <text x="24" y="32" textAnchor="middle" fontFamily="var(--mono)" fontSize="14" fontWeight="700" fill="#4c1d95">
            P
          </text>
          <text x="48" y="24" fontFamily="var(--sans)" fontSize="11" fontWeight="700" fill="#1a1325">
            Perplexity
          </text>
          <text x="48" y="40" fontFamily="var(--mono)" fontSize="8" fill="#9087a8" letterSpacing="1">
            SEARCH
          </text>
        </g>

        <g transform="translate(180,140)">
          <rect width="140" height="60" rx="10" fill="#7c3aed" stroke="#7c3aed" strokeWidth="1.5" />
          <rect x="10" y="12" width="28" height="28" rx="6" fill="#ffffff" opacity="0.2" />
          <text x="24" y="32" textAnchor="middle" fontFamily="var(--mono)" fontSize="14" fontWeight="700" fill="#ffffff">
            C
          </text>
          <text x="48" y="24" fontFamily="var(--sans)" fontSize="11" fontWeight="700" fill="#ffffff">
            Claude
          </text>
          <text x="48" y="40" fontFamily="var(--mono)" fontSize="8" fill="#d9cff0" letterSpacing="1">
            REASON
          </text>
        </g>

        <g transform="translate(320,50)">
          <rect width="140" height="60" rx="10" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5" />
          <rect x="10" y="12" width="28" height="28" rx="6" fill="#ece6f7" />
          <text x="24" y="32" textAnchor="middle" fontFamily="var(--mono)" fontSize="14" fontWeight="700" fill="#4c1d95">
            ◈
          </text>
          <text x="48" y="24" fontFamily="var(--sans)" fontSize="11" fontWeight="700" fill="#1a1325">
            Midjourney
          </text>
          <text x="48" y="40" fontFamily="var(--mono)" fontSize="8" fill="#9087a8" letterSpacing="1">
            VISUAL
          </text>
        </g>
      </svg>
    </div>
  );
}
