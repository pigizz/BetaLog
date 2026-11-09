// Topographic contour lines, drawn procedurally so no image file is needed.
function contour(cx, cy, r, seed, points = 64) {
  let d = ''
  for (let i = 0; i <= points; i++) {
    const a = (i / points) * Math.PI * 2
    const wobble =
      1 +
      0.18 * Math.sin(3 * a + seed) +
      0.09 * Math.sin(5 * a - seed * 1.7) +
      0.05 * Math.cos(9 * a + seed * 0.6)
    const x = cx + Math.cos(a) * r * wobble * 1.25
    const y = cy + Math.sin(a) * r * wobble
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
  }
  return d + 'Z'
}

const peaks = [
  { cx: 120, cy: 160, rings: 9, step: 26, seed: 1.2 },
  { cx: 470, cy: 610, rings: 11, step: 30, seed: 3.4 },
]

export default function Topo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 600 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        {peaks.flatMap((p) =>
          Array.from({ length: p.rings }, (_, i) => (
            <path
              key={`${p.seed}-${i}`}
              d={contour(p.cx, p.cy, 18 + i * p.step, p.seed + i * 0.35)}
              opacity={i % 4 === 0 ? 0.55 : 0.28}
            />
          )),
        )}
      </g>
    </svg>
  )
}