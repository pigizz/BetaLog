// A bouldering problem: holds connected by a line that draws upwards on load.
const holds = [
  [70, 380, 14], [140, 330, 10], [95, 260, 12], [175, 205, 9],
  [130, 140, 13], [205, 85, 10], [180, 30, 15],
]

export default function Route({ className = '' }) {
  const path = holds.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ')

  return (
    <svg viewBox="0 0 260 410" className={className} aria-hidden="true">
      <path
        d={path}
        pathLength="1"
        fill="none"
        stroke="var(--color-tea)"
        strokeWidth="2.5"
        strokeDasharray="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="route-draw"
      />
      {holds.map(([x, y, r], i) => (
        <g key={i} className="route-hold" style={{ animationDelay: `${0.25 + i * 0.25}s` }}>
          <circle cx={x} cy={y} r={r} fill="var(--color-tea)" />
          <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.28} fill="var(--color-moss-dark)" opacity="0.35" />
        </g>
      ))}
      {/* Top-out marker */}
      <path d="M160,8 h40" stroke="var(--color-lichen)" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  )
}