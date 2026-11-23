import { Activity } from 'lucide-react'
import { useState } from 'react'

type CurveKey = 'xexp' | 'rational' | 'logx'

interface CurveDef {
  label: string
  f: (x: number) => number
  df: (x: number) => number
  ddf: (x: number) => number
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  defaultX: number
  extrema: { x: number; label: string }[]
  inflections: { x: number; label: string }[]
  asymptoteNote: string
}

const CURVES: Record<CurveKey, CurveDef> = {
  xexp: {
    label: 'x e⁻ˣ',
    f: (x) => x * Math.exp(-x),
    df: (x) => (1 - x) * Math.exp(-x),
    ddf: (x) => (x - 2) * Math.exp(-x),
    xMin: -0.6,
    xMax: 4.8,
    yMin: -0.5,
    yMax: 0.65,
    defaultX: 1.0,
    extrema: [{ x: 1, label: '極大(1, 1/e)' }],
    inflections: [{ x: 2, label: '変曲点(2, 2/e²)' }],
    asymptoteNote: 'x → ∞ で y → 0（漸近線 y = 0）',
  },
  rational: {
    label: 'x / (x² + 1)',
    f: (x) => x / (x * x + 1),
    df: (x) => (1 - x * x) / Math.pow(x * x + 1, 2),
    ddf: (x) => (2 * x * (x * x - 3)) / Math.pow(x * x + 1, 3),
    xMin: -3.6,
    xMax: 3.6,
    yMin: -0.75,
    yMax: 0.75,
    defaultX: 1.0,
    extrema: [
      { x: -1, label: '極小(-1, -1/2)' },
      { x: 1, label: '極大(1, 1/2)' },
    ],
    inflections: [
      { x: 0, label: '変曲点(0,0)' },
      { x: Math.sqrt(3), label: '変曲点(√3)' },
    ],
    asymptoteNote: 'x → ±∞ で y → 0（奇関数・原点対称）',
  },
  logx: {
    label: '(log x) / x',
    f: (x) => Math.log(x) / x,
    df: (x) => (1 - Math.log(x)) / (x * x),
    ddf: (x) => (2 * Math.log(x) - 3) / (x * x * x),
    xMin: 0.35,
    xMax: 6.5,
    yMin: -0.9,
    yMax: 0.6,
    defaultX: Math.E,
    extrema: [{ x: Math.E, label: '極大(e, 1/e)' }],
    inflections: [{ x: Math.exp(1.5), label: '変曲点(e^(3/2))' }],
    asymptoteNote: 'x → +0 で −∞、x → ∞ で 0（漸近線 x=0, y=0）',
  },
}

export function CurveAnalysisSim() {
  const [curveKey, setCurveKey] = useState<CurveKey>('xexp')
  const curve = CURVES[curveKey]
  const [x, setX] = useState(curve.defaultX)

  const clampedX = Math.max(curve.xMin + 0.05, Math.min(curve.xMax - 0.05, x))
  const fx = curve.f(clampedX)
  const dfx = curve.df(clampedX)
  const ddfx = curve.ddf(clampedX)

  const toX = (xv: number) => 24 + ((xv - curve.xMin) / (curve.xMax - curve.xMin)) * 276
  const toY = (yv: number) => 188 - ((yv - curve.yMin) / (curve.yMax - curve.yMin)) * 168

  // Split curve segments by concavity sign so students literally SEE convex up vs down!
  const samples = 110
  const segments: { pts: string; concaveUp: boolean }[] = []
  let currentPts: string[] = []
  let currentConcave = curve.ddf(curve.xMin + 0.02) >= 0

  for (let i = 0; i <= samples; i++) {
    const xv = curve.xMin + (i / samples) * (curve.xMax - curve.xMin)
    const yv = curve.f(xv)
    const isUp = curve.ddf(xv) >= 0
    const pt = `${toX(xv).toFixed(1)},${toY(yv).toFixed(1)}`
    if (isUp !== currentConcave && currentPts.length > 0) {
      currentPts.push(pt)
      segments.push({ pts: currentPts.join(' '), concaveUp: currentConcave })
      currentPts = [pt]
      currentConcave = isUp
    } else {
      currentPts.push(pt)
    }
  }
  if (currentPts.length > 1) {
    segments.push({ pts: currentPts.join(' '), concaveUp: currentConcave })
  }

  const tangentSpan = (curve.xMax - curve.xMin) * 0.16
  const slopeStatus =
    Math.abs(dfx) < 0.03 ? '0（極値付近）' : dfx > 0 ? '+（増加 ↗）' : '− （減少 ↘）'
  const concaveStatus =
    Math.abs(ddfx) < 0.03 ? '0（変曲点付近）' : ddfx > 0 ? '+（下に凸 ∪）' : '− （上に凸 ∩）'

  return (
    <div className="sim-card">
      <div className="sim-header">
        <div>
          <div className="sim-title">
            <Activity size={17} color="var(--accent-teal)" />
            増減・凹凸・変曲点 ライブ解析グラフ
          </div>
          <div className="sim-subtitle">
            数III頻出グラフをなぞって f&apos;(x)（傾き）と f&apos;&apos;(x)（凹凸の色分け）を体感しよう
          </div>
        </div>
        <span className="badge badge-teal">操作可能</span>
      </div>

      <div className="sim-body">
        <div className="chip-row">
          {(Object.keys(CURVES) as CurveKey[]).map((k) => (
            <button
              key={k}
              type="button"
              className={`chip ${curveKey === k ? 'active' : ''}`}
              onClick={() => {
                setCurveKey(k)
                setX(CURVES[k].defaultX)
              }}
            >
              y = {CURVES[k].label}
            </button>
          ))}
        </div>

        <div className="sim-canvas-box">
          <svg viewBox="0 0 320 205" role="img" aria-label="関数の増減と凹凸の連動グラフ">
            <defs>
              <clipPath id="curve-clip">
                <rect x="18" y="10" width="286" height="184" rx="4" />
              </clipPath>
            </defs>

            <g clipPath="url(#curve-clip)">
              {/* Axes */}
              <line x1="18" y1={toY(0)} x2="304" y2={toY(0)} stroke="#cbd5e1" strokeWidth="1.2" />
              {curve.xMin <= 0 && curve.xMax >= 0 && (
                <line x1={toX(0)} y1="10" x2={toX(0)} y2="194" stroke="#cbd5e1" strokeWidth="1.2" />
              )}

              {/* Concavity-colored curve segments */}
              {segments.map((seg, idx) => (
                <polyline
                  key={idx}
                  fill="none"
                  stroke={seg.concaveUp ? '#0e7c7b' : '#1d54b5'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  points={seg.pts}
                />
              ))}

              {/* Extrema markers */}
              {curve.extrema.map((ex, i) => (
                <g key={`ex-${i}`}>
                  <circle cx={toX(ex.x)} cy={toY(curve.f(ex.x))} r="4" fill="#ffffff" stroke="#1d54b5" strokeWidth="2" />
                </g>
              ))}

              {/* Inflection markers */}
              {curve.inflections.map((inf, i) => (
                <g key={`inf-${i}`}>
                  <rect
                    x={toX(inf.x) - 3.5}
                    y={toY(curve.f(inf.x)) - 3.5}
                    width="7"
                    height="7"
                    fill="#ffffff"
                    stroke="#b45309"
                    strokeWidth="2"
                    transform={`rotate(45 ${toX(inf.x)} ${toY(curve.f(inf.x))})`}
                  />
                </g>
              ))}

              {/* Tangent line at current x */}
              <line
                x1={toX(clampedX - tangentSpan)}
                y1={toY(fx - dfx * tangentSpan)}
                x2={toX(clampedX + tangentSpan)}
                y2={toY(fx + dfx * tangentSpan)}
                stroke="#b45309"
                strokeWidth="2.2"
              />

              {/* Current point */}
              <circle cx={toX(clampedX)} cy={toY(fx)} r="5.5" fill="#172033" stroke="#fff" strokeWidth="2" />
            </g>

            {/* Legend */}
            <g transform="translate(22, 14)">
              <rect x="0" y="0" width="160" height="44" rx="6" fill="rgba(255,255,255,0.92)" stroke="#e6e2d8" />
              <line x1="10" y1="15" x2="26" y2="15" stroke="#1d54b5" strokeWidth="3" />
              <text x="32" y="19" fontSize="10" fill="#172033">上に凸 (f&apos;&apos; &lt; 0)</text>
              <line x1="10" y1="31" x2="26" y2="31" stroke="#0e7c7b" strokeWidth="3" />
              <text x="32" y="35" fontSize="10" fill="#172033">下に凸 (f&apos;&apos; &gt; 0)  ◆変曲点</text>
            </g>
          </svg>
        </div>

        <div className="sim-slider-group">
          <div className="sim-slider-header">
            <span>点 x を動かして増減表を体感しよう</span>
            <span className="sim-slider-value">x = {clampedX.toFixed(2)}</span>
          </div>
          <input
            type="range"
            className="sim-range"
            min={curve.xMin + 0.1}
            max={curve.xMax - 0.1}
            step={0.04}
            value={clampedX}
            onChange={(e) => setX(parseFloat(e.target.value))}
            aria-label="点x"
          />
        </div>

        <div className="sim-metrics">
          <div className="sim-metric-box">
            <div className="sim-metric-label">f(x)</div>
            <div className="sim-metric-val">{fx.toFixed(3)}</div>
          </div>
          <div className="sim-metric-box">
            <div className="sim-metric-label">f&apos;(x) の符号</div>
            <div className="sim-metric-val" style={{ color: dfx >= 0 ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: '0.8rem' }}>
              {slopeStatus}
            </div>
          </div>
          <div className="sim-metric-box">
            <div className="sim-metric-label">f&apos;&apos;(x) の符号</div>
            <div className="sim-metric-val" style={{ color: ddfx >= 0 ? 'var(--accent-teal)' : 'var(--accent-primary)', fontSize: '0.8rem' }}>
              {concaveStatus}
            </div>
          </div>
        </div>

        <div className="sim-insight">
          <strong>漸近線・特徴：</strong>{curve.asymptoteNote}。<br />
          ◆の変曲点を境に、青（上に凸 ∩）と緑（下に凸 ∪）が切り替わり、接線がグラフの上側から下側へ通り抜ける様子に注目してください。
        </div>
      </div>
    </div>
  )
}
