import { Activity } from 'lucide-react'
import { useState } from 'react'

export function EulerESim() {
  const [mode, setMode] = useState<'compound' | 'slope'>('compound')
  const [n, setN] = useState(8)
  const [baseA, setBaseA] = useState(2.0)

  const approxE = Math.pow(1 + 1 / n, n)
  const slopeAtZero = Math.log(baseA)

  // Compound chart mapping
  const sampleNs = [1, 2, 3, 4, 5, 8, 12, 20, 35, 60, 100, 150, 200]
  const mapNX = (val: number) => 42 + (Math.log(val) / Math.log(200)) * 255
  const mapNY = (yVal: number) => 182 - ((yVal - 1.8) / 1.2) * 150

  // Slope chart mapping for y = a^x on x in [-1.5, 1.5], y in [0, 4.5]
  const mapSX = (xVal: number) => 160 + xVal * 82
  const mapSY = (yVal: number) => 185 - yVal * 38

  const expCurvePoints = Array.from({ length: 61 }, (_, i) => {
    const xv = -1.5 + (i / 60) * 3.0
    const yv = Math.pow(baseA, xv)
    return `${mapSX(xv).toFixed(1)},${Math.max(10, mapSY(yv)).toFixed(1)}`
  }).join(' ')

  return (
    <div className="sim-card">
      <div className="sim-header">
        <div>
          <div className="sim-title">
            <Activity size={17} color="var(--accent-teal)" />
            自然対数の底 e の正体を体験する
          </div>
          <div className="sim-subtitle">
            「複利の極限」と「x=0 での傾きが1になる底」の2つの顔を確認しよう
          </div>
        </div>
        <span className="badge badge-teal">操作可能</span>
      </div>

      <div className="sim-body">
        <div className="chip-row">
          <button
            type="button"
            className={`chip ${mode === 'compound' ? 'active' : ''}`}
            onClick={() => setMode('compound')}
          >
            ① (1 + 1/n)ⁿ の収束
          </button>
          <button
            type="button"
            className={`chip ${mode === 'slope' ? 'active' : ''}`}
            onClick={() => setMode('slope')}
          >
            ② y = aˣ の傾きが 1 になる点
          </button>
        </div>

        {mode === 'compound' ? (
          <>
            <div className="sim-canvas-box">
              <svg viewBox="0 0 320 205" role="img" aria-label="(1+1/n)^nがeに収束するグラフ">
                {/* Grid & axes */}
                <line x1="36" y1="182" x2="305" y2="182" stroke="#cbd5e1" strokeWidth="1.2" />
                <line x1="36" y1="18" x2="36" y2="182" stroke="#cbd5e1" strokeWidth="1.2" />

                {/* y = e horizontal asymptote */}
                <line
                  x1="36"
                  y1={mapNY(Math.E)}
                  x2="305"
                  y2={mapNY(Math.E)}
                  stroke="#b45309"
                  strokeWidth="1.6"
                  strokeDasharray="5 4"
                />
                <text x="42" y={mapNY(Math.E) - 6} fontSize="10.5" fill="#b45309" fontWeight="700">
                  y = e ≈ 2.71828...
                </text>

                {/* y = 2 reference */}
                <line x1="36" y1={mapNY(2)} x2="305" y2={mapNY(2)} stroke="#e2e8f0" strokeWidth="1" />
                <text x="12" y={mapNY(2) + 4} fontSize="10" fill="#64748b">2.0</text>
                <text x="12" y={mapNY(2.5) + 4} fontSize="10" fill="#64748b">2.5</text>

                {/* Reference points polyline */}
                <polyline
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.6"
                  points={sampleNs
                    .map((sn) => `${mapNX(sn).toFixed(1)},${mapNY(Math.pow(1 + 1 / sn, sn)).toFixed(1)}`)
                    .join(' ')}
                />

                {/* Current n point */}
                <line
                  x1={mapNX(n)}
                  y1={mapNY(approxE)}
                  x2={mapNX(n)}
                  y2={182}
                  stroke="#0e7c7b"
                  strokeWidth="1.4"
                  strokeDasharray="3 3"
                />
                <circle cx={mapNX(n)} cy={mapNY(approxE)} r="6" fill="#0e7c7b" stroke="#ffffff" strokeWidth="2" />
                <text
                  x={Math.min(235, mapNX(n) + 8)}
                  y={Math.max(30, mapNY(approxE) + 18)}
                  fontSize="11"
                  fill="#0e7c7b"
                  fontWeight="700"
                >
                  n={n}: {approxE.toFixed(4)}
                </text>

                <text x="276" y="197" fontSize="10" fill="#64748b">n (対数軸)</text>
              </svg>
            </div>

            <div className="sim-slider-group">
              <div className="sim-slider-header">
                <span>分割数 n を大きくしてみよう</span>
                <span className="sim-slider-value">n = {n}</span>
              </div>
              <input
                type="range"
                className="sim-range"
                min={1}
                max={200}
                step={1}
                value={n}
                onChange={(e) => setN(parseInt(e.target.value, 10))}
                aria-label="分割数n"
              />
            </div>

            <div className="sim-metrics">
              <div className="sim-metric-box">
                <div className="sim-metric-label">(1 + 1/n)ⁿ</div>
                <div className="sim-metric-val" style={{ color: 'var(--accent-teal)' }}>
                  {approxE.toFixed(5)}
                </div>
              </div>
              <div className="sim-metric-box">
                <div className="sim-metric-label">真の値 e</div>
                <div className="sim-metric-val" style={{ color: 'var(--accent-amber)' }}>
                  2.71828
                </div>
              </div>
              <div className="sim-metric-box">
                <div className="sim-metric-label">差 e − 近似値</div>
                <div className="sim-metric-val">{(Math.E - approxE).toFixed(5)}</div>
              </div>
            </div>

            <div className="sim-insight">
              「年利100%を n 回に細かく複利計算」しても無限大には発散せず、<strong>約 2.71828</strong> という一定の壁（これが e）に収束します。
            </div>
          </>
        ) : (
          <>
            <div className="sim-canvas-box">
              <svg viewBox="0 0 320 205" role="img" aria-label="y=a^xのx=0における接線の傾き">
                <line x1="20" y1="185" x2="300" y2="185" stroke="#cbd5e1" strokeWidth="1.2" />
                <line x1="160" y1="12" x2="160" y2="195" stroke="#cbd5e1" strokeWidth="1.2" />

                {/* Reference line y = x + 1 (slope = 1) */}
                <line
                  x1={mapSX(-1.1)}
                  y1={mapSY(-0.1)}
                  x2={mapSX(1.4)}
                  y2={mapSY(2.4)}
                  stroke="#b45309"
                  strokeWidth="1.6"
                  strokeDasharray="5 4"
                />
                <text x={mapSX(0.55)} y={mapSY(2.35)} fontSize="10.5" fill="#b45309" fontWeight="700">
                  目標の傾き 1 (y=x+1)
                </text>

                {/* Curve y = a^x */}
                <polyline fill="none" stroke="#1d54b5" strokeWidth="2.5" points={expCurvePoints} />

                {/* Tangent line at x=0: y = (ln a) x + 1 */}
                <line
                  x1={mapSX(-1.2)}
                  y1={mapSY(1 + slopeAtZero * -1.2)}
                  x2={mapSX(1.2)}
                  y2={mapSY(1 + slopeAtZero * 1.2)}
                  stroke="#0e7c7b"
                  strokeWidth="2.2"
                />
                <circle cx={mapSX(0)} cy={mapSY(1)} r="5" fill="#172033" stroke="#fff" strokeWidth="2" />
                <text x={mapSX(0) + 8} y={mapSY(1) + 14} fontSize="10.5" fill="#172033" fontWeight="600">
                  (0, 1)
                </text>
              </svg>
            </div>

            <div className="sim-slider-group">
              <div className="sim-slider-header">
                <span>底 a を動かして傾きを 1.00 に合わせよう</span>
                <span className="sim-slider-value">a = {baseA.toFixed(2)}</span>
              </div>
              <input
                type="range"
                className="sim-range"
                min={1.3}
                max={4.0}
                step={0.01}
                value={baseA}
                onChange={(e) => setBaseA(parseFloat(e.target.value))}
                aria-label="指数関数の底a"
              />
            </div>

            <div className="row-wrap">
              <button
                type="button"
                className="btn btn-soft btn-sm"
                onClick={() => setBaseA(Number(Math.E.toFixed(2)))}
              >
                a = e (2.72) にぴったり合わせる
              </button>
            </div>

            <div className="sim-metrics">
              <div className="sim-metric-box">
                <div className="sim-metric-label">底 a</div>
                <div className="sim-metric-val">{baseA.toFixed(2)}</div>
              </div>
              <div className="sim-metric-box" style={{ background: Math.abs(slopeAtZero - 1) < 0.03 ? 'var(--accent-green-soft)' : undefined }}>
                <div className="sim-metric-label">x=0 での接線の傾き</div>
                <div className="sim-metric-val" style={{ color: 'var(--accent-teal)' }}>
                  {slopeAtZero.toFixed(3)}
                </div>
              </div>
            </div>

            <div className="sim-insight">
              <strong>a = e ≈ 2.718</strong> のときだけ、点 (0, 1) での接線の傾きがぴったり <strong>1</strong> になります。だからこそ <strong>(eˣ)&apos; = eˣ</strong> という最も美しい微分公式が生まれます！
            </div>
          </>
        )}
      </div>
    </div>
  )
}
