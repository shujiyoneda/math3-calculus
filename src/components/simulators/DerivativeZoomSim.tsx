import { Activity, ZoomIn } from 'lucide-react'
import { useState } from 'react'

type FuncKey = 'sin' | 'exp' | 'quad'

const FUNCS: Record<
  FuncKey,
  { label: string; f: (x: number) => number; df: (x: number) => number; defaultA: number }
> = {
  sin: { label: 'sin x', f: Math.sin, df: Math.cos, defaultA: 0.7 },
  exp: { label: 'eˣ / 2', f: (x) => Math.exp(x) / 2, df: (x) => Math.exp(x) / 2, defaultA: 0.5 },
  quad: { label: '0.5x²', f: (x) => 0.5 * x * x, df: (x) => x, defaultA: 1.0 },
}

export function DerivativeZoomSim() {
  const [fnKey, setFnKey] = useState<FuncKey>('sin')
  const [a, setA] = useState(0.7)
  const [h, setH] = useState(0.9)
  const [zoomed, setZoomed] = useState(false)

  const fn = FUNCS[fnKey]
  const fa = fn.f(a)
  const fah = fn.f(a + h)
  const secantSlope = (fah - fa) / h
  const tangentSlope = fn.df(a)

  // Viewport bounds
  const span = zoomed ? 0.25 : 2.2
  const xMin = a - span
  const xMax = a + span
  const yCenter = fa
  const ySpan = span * 0.68
  const yMin = yCenter - ySpan
  const yMax = yCenter + ySpan

  const toX = (xv: number) => 20 + ((xv - xMin) / (xMax - xMin)) * 280
  const toY = (yv: number) => 195 - ((yv - yMin) / (yMax - yMin)) * 175

  const curvePts = Array.from({ length: 81 }, (_, i) => {
    const xv = xMin + (i / 80) * (xMax - xMin)
    const yv = fn.f(xv)
    return `${toX(xv).toFixed(1)},${toY(yv).toFixed(1)}`
  }).join(' ')

  // Tangent line endpoints
  const tY1 = fa + tangentSlope * (xMin - a)
  const tY2 = fa + tangentSlope * (xMax - a)

  // Secant line endpoints
  const sY1 = fa + secantSlope * (xMin - a)
  const sY2 = fa + secantSlope * (xMax - a)

  return (
    <div className="sim-card">
      <div className="sim-header">
        <div>
          <div className="sim-title">
            <Activity size={17} color="var(--accent-teal)" />
            割線 → 接線 ＆ 局所直線化ズーム
          </div>
          <div className="sim-subtitle">
            h を 0 に近づけると平均変化率が接線の傾きに一致し、拡大すると曲線が直線になる
          </div>
        </div>
        <span className="badge badge-teal">操作可能</span>
      </div>

      <div className="sim-body">
        <div className="row-between" style={{ flexWrap: 'wrap' }}>
          <div className="chip-row">
            {(Object.keys(FUNCS) as FuncKey[]).map((k) => (
              <button
                key={k}
                type="button"
                className={`chip ${fnKey === k ? 'active' : ''}`}
                onClick={() => {
                  setFnKey(k)
                  setA(FUNCS[k].defaultA)
                }}
              >
                y = {FUNCS[k].label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`btn btn-sm ${zoomed ? 'btn-teal' : 'btn-secondary'}`}
            onClick={() => setZoomed((z) => !z)}
          >
            <ZoomIn size={15} />
            {zoomed ? 'ズーム解除 (1x)' : '9倍に拡大ズーム'}
          </button>
        </div>

        <div className="sim-canvas-box">
          <svg viewBox="0 0 320 210" role="img" aria-label="割線が接線に近づく微分シミュレーター">
            <defs>
              <clipPath id="deriv-clip">
                <rect x="16" y="12" width="288" height="186" rx="4" />
              </clipPath>
            </defs>

            <g clipPath="url(#deriv-clip)">
              {/* Axes if visible */}
              {xMin <= 0 && xMax >= 0 && (
                <line x1={toX(0)} y1="12" x2={toX(0)} y2="198" stroke="#cbd5e1" strokeWidth="1.2" />
              )}
              {yMin <= 0 && yMax >= 0 && (
                <line x1="16" y1={toY(0)} x2="304" y2={toY(0)} stroke="#cbd5e1" strokeWidth="1.2" />
              )}

              {/* True tangent line */}
              <line
                x1={toX(xMin)}
                y1={toY(tY1)}
                x2={toX(xMax)}
                y2={toY(tY2)}
                stroke="#0e7c7b"
                strokeWidth="2"
                strokeDasharray="6 4"
              />

              {/* Secant line */}
              <line
                x1={toX(xMin)}
                y1={toY(sY1)}
                x2={toX(xMax)}
                y2={toY(sY2)}
                stroke="#b45309"
                strokeWidth="2"
              />

              {/* Curve */}
              <polyline fill="none" stroke="#1d54b5" strokeWidth="2.8" points={curvePts} />

              {/* Right triangle dx=h, dy */}
              <line x1={toX(a)} y1={toY(fa)} x2={toX(a + h)} y2={toY(fa)} stroke="#b45309" strokeWidth="1.3" strokeDasharray="3 3" />
              <line x1={toX(a + h)} y1={toY(fa)} x2={toX(a + h)} y2={toY(fah)} stroke="#b45309" strokeWidth="1.3" strokeDasharray="3 3" />

              {/* Points */}
              <circle cx={toX(a)} cy={toY(fa)} r="5" fill="#172033" stroke="#fff" strokeWidth="2" />
              <circle cx={toX(a + h)} cy={toY(fah)} r="4.5" fill="#b45309" stroke="#fff" strokeWidth="1.5" />
            </g>

            {/* Legend */}
            <g transform="translate(20, 16)">
              <rect x="0" y="0" width="136" height="44" rx="6" fill="rgba(255,255,255,0.92)" stroke="#e6e2d8" />
              <line x1="10" y1="15" x2="26" y2="15" stroke="#b45309" strokeWidth="2.2" />
              <text x="32" y="19" fontSize="10.5" fill="#172033">割線（平均変化率）</text>
              <line x1="10" y1="31" x2="26" y2="31" stroke="#0e7c7b" strokeWidth="2.2" strokeDasharray="4 3" />
              <text x="32" y="35" fontSize="10.5" fill="#172033">接線（微分係数 f&apos;(a)）</text>
            </g>
          </svg>
        </div>

        <div className="sim-slider-group">
          <div className="sim-slider-header">
            <span>幅 h を 0 に近づけてみよう</span>
            <span className="sim-slider-value">h = {h.toFixed(2)}</span>
          </div>
          <input
            type="range"
            className="sim-range"
            min={0.01}
            max={1.4}
            step={0.01}
            value={h}
            onChange={(e) => setH(parseFloat(e.target.value))}
            aria-label="幅h"
          />
        </div>

        <div className="sim-slider-group">
          <div className="sim-slider-header">
            <span>基準点 a の位置</span>
            <span className="sim-slider-value">a = {a.toFixed(2)}</span>
          </div>
          <input
            type="range"
            className="sim-range"
            min={-1.0}
            max={1.6}
            step={0.05}
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
            aria-label="基準点a"
          />
        </div>

        <div className="sim-metrics">
          <div className="sim-metric-box">
            <div className="sim-metric-label">割線の傾き</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-amber)' }}>
              {secantSlope.toFixed(4)}
            </div>
          </div>
          <div className="sim-metric-box" style={{ background: 'var(--accent-teal-soft)' }}>
            <div className="sim-metric-label">接線の傾き f&apos;(a)</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-teal)' }}>
              {tangentSlope.toFixed(4)}
            </div>
          </div>
          <div className="sim-metric-box">
            <div className="sim-metric-label">誤差</div>
            <div className="sim-metric-val">{Math.abs(secantSlope - tangentSlope).toFixed(4)}</div>
          </div>
        </div>

        <div className="sim-insight">
          {zoomed
            ? '9倍に拡大すると、青い曲線と緑の破線（接線）がほとんど区別できないほど一致します。「微分可能＝拡大すると直線に見える」これが微分の本質です。'
            : '「9倍に拡大ズーム」ボタンを押すと、滑らかな曲線が局所的には1本の直線（接線）に見えることを直感的に確認できます。'}
        </div>
      </div>
    </div>
  )
}
