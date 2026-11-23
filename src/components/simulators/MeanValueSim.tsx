import { Activity } from 'lucide-react'
import { useState } from 'react'

type MvtKey = 'cubic' | 'sin' | 'log'

const MVT_FUNCS: Record<
  MvtKey,
  {
    label: string
    f: (x: number) => number
    df: (x: number) => number
    xMin: number
    xMax: number
    yMin: number
    yMax: number
  }
> = {
  cubic: {
    label: '0.25x³ − x',
    f: (x) => 0.25 * x * x * x - x,
    df: (x) => 0.75 * x * x - 1,
    xMin: -2.4,
    xMax: 2.6,
    yMin: -2.2,
    yMax: 2.8,
  },
  sin: {
    label: 'sin x',
    f: Math.sin,
    df: Math.cos,
    xMin: -0.5,
    xMax: 3.6,
    yMin: -1.3,
    yMax: 1.4,
  },
  log: {
    label: 'log(x + 2)',
    f: (x) => Math.log(x + 2),
    df: (x) => 1 / (x + 2),
    xMin: -1.6,
    xMax: 3.4,
    yMin: -1.0,
    yMax: 2.0,
  },
}

function findPointC(df: (x: number) => number, a: number, b: number, targetSlope: number): number {
  const samples = 200
  let bestC = (a + b) / 2
  let bestErr = Infinity
  for (let i = 1; i < samples; i++) {
    const x = a + (i / samples) * (b - a)
    const err = Math.abs(df(x) - targetSlope)
    if (err < bestErr) {
      bestErr = err
      bestC = x
    }
  }
  return bestC
}

export function MeanValueSim() {
  const [fnKey, setFnKey] = useState<MvtKey>('cubic')
  const [a, setA] = useState(-1.4)
  const [b, setB] = useState(2.0)

  const fn = MVT_FUNCS[fnKey]
  const safeA = Math.min(a, b - 0.35)
  const safeB = Math.max(b, safeA + 0.35)

  const fa = fn.f(safeA)
  const fb = fn.f(safeB)
  const avgSlope = (fb - fa) / (safeB - safeA)
  const c = findPointC(fn.df, safeA, safeB, avgSlope)
  const fc = fn.f(c)

  const toX = (xv: number) => 24 + ((xv - fn.xMin) / (fn.xMax - fn.xMin)) * 272
  const toY = (yv: number) => 190 - ((yv - fn.yMin) / (fn.yMax - fn.yMin)) * 168

  const pts = Array.from({ length: 85 }, (_, i) => {
    const xv = fn.xMin + (i / 84) * (fn.xMax - fn.xMin)
    return `${toX(xv).toFixed(1)},${toY(fn.f(xv)).toFixed(1)}`
  }).join(' ')

  const tSpan = (fn.xMax - fn.xMin) * 0.25

  return (
    <div className="sim-card">
      <div className="sim-header">
        <div>
          <div className="sim-title">
            <Activity size={17} color="var(--accent-teal)" />
            平均値の定理シミュレーター
          </div>
          <div className="sim-subtitle">
            両端 A, B を結ぶ直線と「平行な接線」を引ける点 c が必ず間に存在する
          </div>
        </div>
        <span className="badge badge-teal">操作可能</span>
      </div>

      <div className="sim-body">
        <div className="chip-row">
          {(Object.keys(MVT_FUNCS) as MvtKey[]).map((k) => (
            <button
              key={k}
              type="button"
              className={`chip ${fnKey === k ? 'active' : ''}`}
              onClick={() => {
                setFnKey(k)
                if (k === 'cubic') {
                  setA(-1.4)
                  setB(2.0)
                } else if (k === 'sin') {
                  setA(0.1)
                  setB(2.6)
                } else {
                  setA(-1.0)
                  setB(2.5)
                }
              }}
            >
              y = {MVT_FUNCS[k].label}
            </button>
          ))}
        </div>

        <div className="sim-canvas-box">
          <svg viewBox="0 0 320 205" role="img" aria-label="平均値の定理における割線と平行な接線">
            <defs>
              <clipPath id="mvt-clip">
                <rect x="18" y="12" width="284" height="184" rx="4" />
              </clipPath>
            </defs>
            <g clipPath="url(#mvt-clip)">
              <line x1="18" y1={toY(0)} x2="302" y2={toY(0)} stroke="#cbd5e1" strokeWidth="1.2" />
              <line x1={toX(0)} y1="12" x2={toX(0)} y2="196" stroke="#cbd5e1" strokeWidth="1.2" />

              {/* Curve */}
              <polyline fill="none" stroke="#1d54b5" strokeWidth="2.5" points={pts} />

              {/* Secant AB */}
              <line
                x1={toX(safeA)}
                y1={toY(fa)}
                x2={toX(safeB)}
                y2={toY(fb)}
                stroke="#b45309"
                strokeWidth="2.2"
              />

              {/* Parallel tangent at c */}
              <line
                x1={toX(c - tSpan)}
                y1={toY(fc - avgSlope * tSpan)}
                x2={toX(c + tSpan)}
                y2={toY(fc + avgSlope * tSpan)}
                stroke="#0e7c7b"
                strokeWidth="2.4"
                strokeDasharray="5 3"
              />

              {/* Vertical drop from c */}
              <line x1={toX(c)} y1={toY(fc)} x2={toX(c)} y2={toY(0)} stroke="#0e7c7b" strokeWidth="1.2" strokeDasharray="3 3" />

              {/* Points A, B, C */}
              <circle cx={toX(safeA)} cy={toY(fa)} r="4.5" fill="#b45309" stroke="#fff" strokeWidth="1.5" />
              <circle cx={toX(safeB)} cy={toY(fb)} r="4.5" fill="#b45309" stroke="#fff" strokeWidth="1.5" />
              <circle cx={toX(c)} cy={toY(fc)} r="5.5" fill="#0e7c7b" stroke="#fff" strokeWidth="2" />

              <text x={toX(safeA) - 6} y={toY(fa) - 9} fontSize="11" fill="#b45309" fontWeight="700">A</text>
              <text x={toX(safeB) + 5} y={toY(fb) - 9} fontSize="11" fill="#b45309" fontWeight="700">B</text>
              <text x={toX(c) + 7} y={toY(fc) + 14} fontSize="11" fill="#0e7c7b" fontWeight="700">
                c ≈ {c.toFixed(2)}
              </text>
            </g>
          </svg>
        </div>

        <div className="sim-slider-group">
          <div className="sim-slider-header">
            <span>左端 a</span>
            <span className="sim-slider-value">a = {safeA.toFixed(2)}</span>
          </div>
          <input
            type="range"
            className="sim-range"
            min={fn.xMin + 0.2}
            max={fn.xMax - 0.8}
            step={0.05}
            value={safeA}
            onChange={(e) => setA(parseFloat(e.target.value))}
            aria-label="左端a"
          />
        </div>

        <div className="sim-slider-group">
          <div className="sim-slider-header">
            <span>右端 b</span>
            <span className="sim-slider-value">b = {safeB.toFixed(2)}</span>
          </div>
          <input
            type="range"
            className="sim-range"
            min={fn.xMin + 0.8}
            max={fn.xMax - 0.2}
            step={0.05}
            value={safeB}
            onChange={(e) => setB(parseFloat(e.target.value))}
            aria-label="右端b"
          />
        </div>

        <div className="sim-metrics">
          <div className="sim-metric-box">
            <div className="sim-metric-label">平均変化率 (ABの傾き)</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-amber)' }}>
              {avgSlope.toFixed(3)}
            </div>
          </div>
          <div className="sim-metric-box" style={{ background: 'var(--accent-teal-soft)' }}>
            <div className="sim-metric-label">平行な接点 c</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-teal)' }}>
              {c.toFixed(3)}
            </div>
          </div>
          <div className="sim-metric-box">
            <div className="sim-metric-label">接線の傾き f&apos;(c)</div>
            <div className="sim-metric-val">{fn.df(c).toFixed(3)}</div>
          </div>
        </div>

        <div className="sim-insight">
          区間 [a, b] をどう動かしても、オレンジの直線 AB と<strong>ぴったり平行な緑の接線</strong>を持つ点 c が必ず a &lt; c &lt; b の間に現れます。
        </div>
      </div>
    </div>
  )
}
