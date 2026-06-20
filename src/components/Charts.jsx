import React from 'react'

/* NLACE — Charts
   Gráficos SVG sin dependencias, con la paleta de marca.
   API uniforme:
     · BarChart / LineChart / AreaChart  → { labels:string[], series:[{name,color,values:number[]}] }
     · PieChart / DonutChart             → { data:[{label,value,color?}] }
   Todos heredan tipografía y colores del sistema. Listos para PDF (sin animación). */

export const NL_CHART_PALETTE = [
  '#5869f7', // primary
  '#fc624b', // accent
  '#42cf8a', // success
  '#b717af', // magenta
  '#ff8c42', // accent-warm
  '#f76dee', // pink
  '#2d3bc4', // primary-dark
  '#a5f3fc', // cyan
]

const FONT_BODY = 'Inter, system-ui, sans-serif'
const FONT_DISPLAY = '"Space Grotesk", sans-serif'
const C_GRID = '#dbdcd7'
const C_AXIS = '#a1a1aa'
const C_LABEL = '#71717a'
const C_VALUE = '#0f1011'

function niceMax(v) {
  if (v <= 0) return 1
  const pow = Math.pow(10, Math.floor(Math.log10(v)))
  const n = v / pow
  let nice
  if (n <= 1) nice = 1
  else if (n <= 2) nice = 2
  else if (n <= 2.5) nice = 2.5
  else if (n <= 5) nice = 5
  else nice = 10
  return nice * pow
}

function fmtTick(v) {
  if (Math.abs(v) >= 1000000) return (v / 1000000).toFixed(v % 1000000 ? 1 : 0) + 'M'
  if (Math.abs(v) >= 1000) return (v / 1000).toFixed(v % 1000 ? 1 : 0) + 'k'
  return String(Math.round(v * 100) / 100)
}

/* ── Leyenda compartida ─────────────────────────────── */
function Legend({ items, style }) {
  if (!items || items.length < 2) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', ...style }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: it.color, flex: 'none' }} />
          <span style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C_LABEL }}>{it.name}</span>
        </div>
      ))}
    </div>
  )
}

/* ── BarChart ───────────────────────────────────────── */
export function BarChart({
  labels = [],
  series = [],
  height = 240,
  stacked = false,
  showValues = true,
  legend = true,
  className = '',
  ...props
}) {
  const W = 580
  const H = height
  const pad = { top: 18, right: 14, bottom: 30, left: 38 }
  const iw = W - pad.left - pad.right
  const ih = H - pad.top - pad.bottom

  const colors = series.map((s, i) => s.color || NL_CHART_PALETTE[i % NL_CHART_PALETTE.length])
  let max
  if (stacked) {
    max = niceMax(Math.max(1, ...labels.map((_, gi) => series.reduce((a, s) => a + (s.values[gi] || 0), 0))))
  } else {
    max = niceMax(Math.max(1, ...series.flatMap((s) => s.values)))
  }
  const ticks = [0, max / 2, max]
  const step = iw / Math.max(1, labels.length)
  const single = series.length === 1

  return (
    <div className={className} {...props}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', height: 'auto', overflow: 'visible' }} role="img">
        {ticks.map((t, i) => {
          const y = pad.top + ih - (t / max) * ih
          return (
            <g key={i}>
              <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke={C_GRID} strokeWidth="1" strokeDasharray={i === 0 ? '0' : '3 4'} />
              <text x={pad.left - 8} y={y + 4} textAnchor="end" fontFamily={FONT_BODY} fontSize="11" fill={C_AXIS}>{fmtTick(t)}</text>
            </g>
          )
        })}
        {labels.map((lab, gi) => {
          const gx = pad.left + step * gi
          const inner = single ? step * 0.5 : step * 0.66
          const bw = inner / (single ? 1 : series.length)
          const startX = gx + (step - inner) / 2
          let stackTop = pad.top + ih
          return (
            <g key={gi}>
              {series.map((s, si) => {
                const v = s.values[gi] || 0
                const h = (v / max) * ih
                let x, y
                if (stacked) {
                  x = gx + (step - step * 0.5) / 2
                  y = stackTop - h
                  stackTop = y
                  return <rect key={si} x={x} y={y} width={step * 0.5} height={Math.max(0, h)} rx="3" fill={colors[si]} />
                }
                x = startX + bw * si
                y = pad.top + ih - h
                return (
                  <g key={si}>
                    <rect x={x} y={y} width={Math.max(1, bw - 3)} height={Math.max(0, h)} rx="4" fill={colors[si]} />
                    {showValues && single && (
                      <text x={x + (bw - 3) / 2} y={y - 6} textAnchor="middle" fontFamily={FONT_DISPLAY} fontSize="12" fontWeight="600" fill={C_VALUE}>{fmtTick(v)}</text>
                    )}
                  </g>
                )
              })}
              <text x={gx + step / 2} y={H - pad.bottom + 18} textAnchor="middle" fontFamily={FONT_BODY} fontSize="11.5" fill={C_LABEL}>{lab}</text>
            </g>
          )
        })}
      </svg>
      {legend && <Legend items={series.map((s, i) => ({ name: s.name, color: colors[i] }))} style={{ marginTop: 12, paddingLeft: 4 }} />}
    </div>
  )
}

/* ── LineChart / AreaChart ──────────────────────────── */
export function LineChart({
  labels = [],
  series = [],
  height = 240,
  area = false,
  showDots = true,
  legend = true,
  className = '',
  ...props
}) {
  const W = 580
  const H = height
  const pad = { top: 18, right: 16, bottom: 30, left: 38 }
  const iw = W - pad.left - pad.right
  const ih = H - pad.top - pad.bottom
  const colors = series.map((s, i) => s.color || NL_CHART_PALETTE[i % NL_CHART_PALETTE.length])
  const max = niceMax(Math.max(1, ...series.flatMap((s) => s.values)))
  const ticks = [0, max / 2, max]
  const n = labels.length
  const xAt = (i) => pad.left + (n <= 1 ? iw / 2 : (iw * i) / (n - 1))
  const yAt = (v) => pad.top + ih - (v / max) * ih
  const gid = React.useId ? React.useId().replace(/:/g, '') : 'g' + Math.random().toString(36).slice(2, 8)

  return (
    <div className={className} {...props}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', height: 'auto', overflow: 'visible' }} role="img">
        <defs>
          {area && series.map((s, si) => (
            <linearGradient key={si} id={`${gid}-a${si}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors[si]} stopOpacity="0.26" />
              <stop offset="100%" stopColor={colors[si]} stopOpacity="0.02" />
            </linearGradient>
          ))}
        </defs>
        {ticks.map((t, i) => {
          const y = yAt(t)
          return (
            <g key={i}>
              <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke={C_GRID} strokeWidth="1" strokeDasharray={i === 0 ? '0' : '3 4'} />
              <text x={pad.left - 8} y={y + 4} textAnchor="end" fontFamily={FONT_BODY} fontSize="11" fill={C_AXIS}>{fmtTick(t)}</text>
            </g>
          )
        })}
        {series.map((s, si) => {
          const pts = s.values.map((v, i) => [xAt(i), yAt(v)])
          const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ')
          const fill = `${line} L ${xAt(n - 1).toFixed(1)} ${yAt(0).toFixed(1)} L ${xAt(0).toFixed(1)} ${yAt(0).toFixed(1)} Z`
          return (
            <g key={si}>
              {area && <path d={fill} fill={`url(#${gid}-a${si})`} />}
              <path d={line} fill="none" stroke={colors[si]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {showDots && pts.map((p, i) => (
                <circle key={i} cx={p[0]} cy={p[1]} r="3.4" fill="#fff" stroke={colors[si]} strokeWidth="2" />
              ))}
            </g>
          )
        })}
        {labels.map((lab, i) => (
          <text key={i} x={xAt(i)} y={H - pad.bottom + 18} textAnchor="middle" fontFamily={FONT_BODY} fontSize="11.5" fill={C_LABEL}>{lab}</text>
        ))}
      </svg>
      {legend && <Legend items={series.map((s, i) => ({ name: s.name, color: colors[i] }))} style={{ marginTop: 12, paddingLeft: 4 }} />}
    </div>
  )
}

export function AreaChart(props) {
  return <LineChart area {...props} />
}

/* ── PieChart / DonutChart ──────────────────────────── */
function polar(cx, cy, r, ang) {
  return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]
}
function ringPath(cx, cy, r, ir, a0, a1) {
  const [x0, y0] = polar(cx, cy, r, a0)
  const [x1, y1] = polar(cx, cy, r, a1)
  const large = a1 - a0 > Math.PI ? 1 : 0
  if (ir <= 0) {
    return `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`
  }
  const [x2, y2] = polar(cx, cy, ir, a1)
  const [x3, y3] = polar(cx, cy, ir, a0)
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${ir} ${ir} 0 ${large} 0 ${x3} ${y3} Z`
}

export function PieChart({
  data = [],
  size = 200,
  donut = false,
  thickness = 0.42,
  centerLabel,
  centerValue,
  legend = true,
  className = '',
  ...props
}) {
  const total = data.reduce((a, d) => a + (d.value || 0), 0) || 1
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 2
  const ir = donut ? r * (1 - thickness) : 0
  const colors = data.map((d, i) => d.color || NL_CHART_PALETTE[i % NL_CHART_PALETTE.length])
  let a = -Math.PI / 2
  const slices = data.map((d, i) => {
    const frac = (d.value || 0) / total
    const a0 = a
    const a1 = a + frac * Math.PI * 2
    a = a1
    return { d: ringPath(cx, cy, r, ir, a0, a1), color: colors[i], pct: frac }
  })

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }} {...props}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ flex: 'none', overflow: 'visible' }} role="img">
        {slices.map((s, i) => (
          <path key={i} d={s.d} fill={s.color} stroke="#fff" strokeWidth={donut ? 0 : 2} />
        ))}
        {donut && (centerValue != null || centerLabel) && (
          <g>
            {centerValue != null && (
              <text x={cx} y={cy + (centerLabel ? -2 : 6)} textAnchor="middle" fontFamily={FONT_DISPLAY} fontSize={size * 0.18} fontWeight="700" fill={C_VALUE}>{centerValue}</text>
            )}
            {centerLabel && (
              <text x={cx} y={cy + size * 0.13} textAnchor="middle" fontFamily={FONT_BODY} fontSize={size * 0.075} fill={C_LABEL}>{centerLabel}</text>
            )}
          </g>
        )}
      </svg>
      {legend && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {data.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ width: 11, height: 11, borderRadius: 3, background: colors[i], flex: 'none' }} />
              <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: '#3f3f46', minWidth: 90 }}>{d.label}</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 600, color: C_VALUE }}>{Math.round((d.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function DonutChart(props) {
  return <PieChart donut {...props} />
}
