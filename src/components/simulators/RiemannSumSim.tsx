import { Activity } from 'lucide-react'
import { useState } from 'react'

type RFuncKey = 'quad' | 'inv' | 'exp'

const RFUNCS: Record<
  RFuncKey,
  { label: string; f: (x: number) => number; exact: number; exactLabel: string; yMax: number }
> = {
  quad: { label: 'x²', f: (x) => x * x, exact: 1 / 3, exactLabel: '1/3 ≈ 0.3333', yMax: 1.15 },
  inv: {
    label: '1 / (1 + x²)',
    f: (x) => 1 / (1 + x * x),
    exact: Math.PI / 4,
    exactLabel: 'π/4 ≈ 0.7854',
    yMax: 1.15,
  },
  exp: {
    label: 'e⁻ˣ',
    f: (x) => Math.exp(-x),
    exact: 1 - Math.exp(-1),
    exactLabel: '1 − 1/e ≈ 0.6321',
    yMax: 1.15,
  },
}

export function RiemannSumSim() {
  const [fnKey, setFnKey] = useState<RFuncKey>('quad')
  const [n, setN] = useState(6)
  const [rule, setRule] = useState<'right' | 'left'>('right')

  const fn = RFUNCS[fnKey]
  const toX = (xv: number) => 36 + xv * 252
  const toY = (yv: number) => 182 - (yv / fn.yMax) * 156

  const rects = Array.from({ length: n }, (_, i) => {
    const x0 = i / n
    const x1 = (i + 1) / n
    const sampleX = rule === 'right' ? x1 : x0
    const h = fn.f(sampleX)
    return { x0, x1, h }
  })

  const sum = rects.reduce((acc, r) => acc + r.h / n, 0)
  const error = Math.abs(sum - fn.exact)

  const curvePts = Array.from({ length: 61 }, (_, i) => {
    const xv = i / 60
    return `${toX(xv).toFixed(1)},${toY(fn.f(xv)).toFixed(1)}`
  }).join(' ')

  return (
    <div className="sim-card">
      <div className="sim-header">
        <div>
          <div className="sim-title">
            <Activity size={17} color="var(--accent-teal)" />
            区分求積法シミュレーター（長方形の和 → 定積分）
          </div>
          <div className="sim-subtitle">
            分割数 n を増やすと、短冊の合計が曲線下の真の面積へ収束していく
          </div>
        </div>
        <span className="badge badge-teal">操作可能</span>
      </div>

      <div className="sim-body">
        <div className="row-between" style={{ flexWrap: 'wrap' }}>
          <div className="chip-row">
            {(Object.keys(RFUNCS) as RFuncKey[]).map((k) => (
              <button
                key={k}
                type="button"
                className={`chip ${fnKey === k ? 'active' : ''}`}
                onClick={() => setFnKey(k)}
              >
                y = {RFUNCS[k].label}
              </button>
            ))}
          </div>
          <div className="chip-row">
            <button
              type="button"
              className={`chip ${rule === 'right' ? 'active' : ''}`}
              onClick={() => setRule('right')}
            >
              右端 (k=1..n)
            </button>
            <button
              type="button"
              className={`chip ${rule === 'left' ? 'active' : ''}`}
              onClick={() => setRule('left')}
            >
              左端 (k=0..n-1)
            </button>
          </div>
        </div>

        <div className="sim-canvas-box">
          <svg viewBox="0 0 320 205" role="img" aria-label="区分求積法の長方形近似グラフ">
            {/* Axes */}
            <line x1="30" y1="182" x2="300" y2="182" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="36" y1="16" x2="36" y2="188" stroke="#cbd5e1" strokeWidth="1.2" />

            {/* Rectangles */}
            {rects.map((r, i) => {
              const rx = toX(r.x0)
              const rw = toX(r.x1) - rx
              const ry = toY(r.h)
              const rh = 182 - ry
              return (
                <rect
                  key={i}
                  x={rx}
                  y={ry}
                  width={Math.max(0.5, rw)}
                  height={Math.max(0, rh)}
                  fill="rgba(14, 124, 123, 0.22)"
                  stroke="#0e7c7b"
                  strokeWidth={n > 35 ? 0.5 : 1}
                />
              )
            })}

            {/* True curve */}
            <polyline fill="none" stroke="#1d54b5" strokeWidth="2.6" points={curvePts} />

            {/* Axis labels */}
            <text x="32" y="196" fontSize="10" fill="#64748b">0</text>
            <text x="158" y="196" fontSize="10" fill="#64748b">0.5</text>
            <text x="284" y="196" fontSize="10" fill="#64748b">1</text>
            <text x="16" y={toY(1) + 4} fontSize="10" fill="#64748b">1</text>
          </svg>
        </div>

        <div className="sim-slider-group">
          <div className="sim-slider-header">
            <span>分割数 n（短冊の枚数）を増やしてみよう</span>
            <span className="sim-slider-value">n = {n} 等分（幅 1/{n}）</span>
          </div>
          <input
            type="range"
            className="sim-range"
            min={2}
            max={60}
            step={1}
            value={n}
            onChange={(e) => setN(parseInt(e.target.value, 10))}
            aria-label="分割数n"
          />
        </div>

        <div className="sim-metrics">
          <div className="sim-metric-box">
            <div className="sim-metric-label">短冊の面積和</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-teal)' }}>
              {sum.toFixed(4)}
            </div>
          </div>
          <div className="sim-metric-box">
            <div className="sim-metric-label">定積分の真値</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-primary)', fontSize: '0.82rem' }}>
              {fn.exactLabel}
            </div>
          </div>
          <div className="sim-metric-box">
            <div className="sim-metric-label">誤差</div>
            <div className="sim-metric-val">{error.toFixed(4)}</div>
          </div>
        </div>

        <div className="sim-insight">
          右端（はみ出し）でも左端（不足）でも、n を増やすとギザギザが消えて同じ極限値に収束します。これが「<strong>1/n → dx、k/n → x、Σ → ∫₀¹</strong>」という変換の正体です！
        </div>
      </div>
    </div>
  )
}
