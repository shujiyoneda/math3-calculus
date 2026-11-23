import { Activity } from 'lucide-react'
import { useState } from 'react'

export function SubstitutionSim() {
  // Visualize ∫_0^b 2x cos(x^2) dx = ∫_0^{b^2} cos(t) dt (with t = x^2, dt = 2x dx)
  const [b, setB] = useState(1.1)

  const tUpper = b * b
  const exactArea = Math.sin(tUpper) // ∫_0^b 2x cos(x^2) dx = [sin(x^2)]_0^b = sin(b^2)

  // Left chart: y = 2x cos(x^2) on x in [0, 1.3], y in [-0.6, 2.2]
  const lx = (v: number) => 26 + (v / 1.3) * 120
  const ly = (v: number) => 136 - ((v + 0.5) / 2.6) * 116

  // Right chart: y = cos(t) on t in [0, 1.7], y in [-0.6, 1.4]
  const rx = (v: number) => 184 + (v / 1.7) * 120
  const ry = (v: number) => 136 - ((v + 0.5) / 2.6) * 116

  const leftCurve = Array.from({ length: 60 }, (_, i) => {
    const xv = (i / 59) * 1.25
    const yv = 2 * xv * Math.cos(xv * xv)
    return `${lx(xv).toFixed(1)},${ly(yv).toFixed(1)}`
  }).join(' ')

  const leftFill = [
    `${lx(0).toFixed(1)},${ly(0).toFixed(1)}`,
    ...Array.from({ length: 45 }, (_, i) => {
      const xv = (i / 44) * b
      const yv = 2 * xv * Math.cos(xv * xv)
      return `${lx(xv).toFixed(1)},${ly(yv).toFixed(1)}`
    }),
    `${lx(b).toFixed(1)},${ly(0).toFixed(1)}`,
  ].join(' ')

  const rightCurve = Array.from({ length: 60 }, (_, i) => {
    const tv = (i / 59) * 1.65
    const yv = Math.cos(tv)
    return `${rx(tv).toFixed(1)},${ry(yv).toFixed(1)}`
  }).join(' ')

  const rightFill = [
    `${rx(0).toFixed(1)},${ry(0).toFixed(1)}`,
    ...Array.from({ length: 45 }, (_, i) => {
      const tv = (i / 44) * tUpper
      const yv = Math.cos(tv)
      return `${rx(tv).toFixed(1)},${ry(yv).toFixed(1)}`
    }),
    `${rx(tUpper).toFixed(1)},${ry(0).toFixed(1)}`,
  ].join(' ')

  return (
    <div className="sim-card">
      <div className="sim-header">
        <div>
          <div className="sim-title">
            <Activity size={17} color="var(--accent-teal)" />
            置換積分「面積が変わらない」ビジュアライザー
          </div>
          <div className="sim-subtitle">
            t = x² で変数を乗り換えると、横幅と高さは変形しても「塗りつぶし面積」は完全一致！
          </div>
        </div>
        <span className="badge badge-teal">操作可能</span>
      </div>

      <div className="sim-body">
        <div className="sim-canvas-box">
          <svg viewBox="0 0 320 175" role="img" aria-label="置換積分前後で面積が等しいことの比較図">
            {/* Left panel: x-world */}
            <text x="24" y="18" fontSize="10.5" fontWeight="700" fill="#1d54b5">
              置換前：y = 2x cos(x²)
            </text>
            <line x1="22" y1={ly(0)} x2="150" y2={ly(0)} stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1={lx(0)} y1="24" x2={lx(0)} y2="152" stroke="#cbd5e1" strokeWidth="1.2" />
            <polygon points={leftFill} fill="rgba(29, 84, 181, 0.22)" />
            <polyline fill="none" stroke="#1d54b5" strokeWidth="2.3" points={leftCurve} />
            <line x1={lx(b)} y1={ly(0)} x2={lx(b)} y2={ly(2 * b * Math.cos(b * b))} stroke="#1d54b5" strokeWidth="1.4" strokeDasharray="3 2" />
            <text x={lx(b) - 10} y="164" fontSize="10" fill="#1d54b5" fontWeight="700">
              x={b.toFixed(2)}
            </text>

            {/* Arrow between worlds */}
            <text x="155" y="90" fontSize="15" fill="#0e7c7b" fontWeight="700">⇒</text>
            <text x="151" y="105" fontSize="9" fill="#0e7c7b" fontWeight="700">t=x²</text>

            {/* Right panel: t-world */}
            <text x="182" y="18" fontSize="10.5" fontWeight="700" fill="#0e7c7b">
              置換後：y = cos t
            </text>
            <line x1="180" y1={ry(0)} x2="308" y2={ry(0)} stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1={rx(0)} y1="24" x2={rx(0)} y2="152" stroke="#cbd5e1" strokeWidth="1.2" />
            <polygon points={rightFill} fill="rgba(14, 124, 123, 0.24)" />
            <polyline fill="none" stroke="#0e7c7b" strokeWidth="2.3" points={rightCurve} />
            <line x1={rx(tUpper)} y1={ry(0)} x2={rx(tUpper)} y2={ry(Math.cos(tUpper))} stroke="#0e7c7b" strokeWidth="1.4" strokeDasharray="3 2" />
            <text x={Math.min(266, rx(tUpper) - 10)} y="164" fontSize="10" fill="#0e7c7b" fontWeight="700">
              t={tUpper.toFixed(2)}
            </text>
          </svg>
        </div>

        <div className="sim-slider-group">
          <div className="sim-slider-header">
            <span>積分の上端 b を動かしてみよう</span>
            <span className="sim-slider-value">
              x: 0→{b.toFixed(2)} ／ t: 0→{tUpper.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            className="sim-range"
            min={0.2}
            max={1.25}
            step={0.02}
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            aria-label="積分の上端b"
          />
        </div>

        <div className="sim-metrics">
          <div className="sim-metric-box">
            <div className="sim-metric-label">左の面積 (x の積分)</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-primary)' }}>
              {exactArea.toFixed(4)}
            </div>
          </div>
          <div className="sim-metric-box" style={{ background: 'var(--accent-teal-soft)' }}>
            <div className="sim-metric-label">右の面積 (t の積分)</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-teal)' }}>
              {exactArea.toFixed(4)}
            </div>
          </div>
        </div>

        <div className="sim-insight">
          dx を dt に変換するときに掛ける <strong>2x (= dt/dx)</strong> は、横軸の伸縮率をちょうど打ち消す「面積保存の補正係数」です。だから形が変わっても面積はぴったり一致します！
        </div>
      </div>
    </div>
  )
}
