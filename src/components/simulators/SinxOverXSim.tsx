import { Activity } from 'lucide-react'
import { useState } from 'react'

export function SinxOverXSim() {
  const [x, setX] = useState(0.75)

  const cx = 64
  const cy = 195
  const R = 148

  const cosX = Math.cos(x)
  const sinX = Math.sin(x)
  const tanX = Math.tan(x)
  const ratio = sinX / x

  const px = cx + R * cosX
  const py = cy - R * sinX
  const ax = cx + R
  const ay = cy
  const tx = cx + R
  const ty = cy - Math.min(R * tanX, 178)

  const arcPath = `M ${ax} ${ay} A ${R} ${R} 0 0 0 ${px} ${py}`
  const sectorPath = `M ${cx} ${cy} L ${ax} ${ay} A ${R} ${R} 0 0 0 ${px} ${py} Z`

  return (
    <div className="sim-card">
      <div className="sim-header">
        <div>
          <div className="sim-title">
            <Activity size={17} color="var(--accent-teal)" />
            単位円で見る sin x / x → 1 の本質
          </div>
          <div className="sim-subtitle">
            角度 x を 0 に近づけると「高さ sin x」「弧の長さ x」「接線 tan x」が重なる
          </div>
        </div>
        <span className="badge badge-teal">操作可能</span>
      </div>

      <div className="sim-body">
        <div className="sim-canvas-box">
          <svg viewBox="0 0 320 225" role="img" aria-label="単位円におけるsin x, x, tan xの幾何学的比較">
            {/* Axes */}
            <line x1="20" y1={cy} x2="300" y2={cy} stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1={cx} y1="15" x2={cx} y2="215" stroke="#cbd5e1" strokeWidth="1.2" />

            {/* Quarter unit circle */}
            <path
              d={`M ${ax} ${ay} A ${R} ${R} 0 0 0 ${cx} ${cy - R}`}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Outer right triangle (area = 1/2 tan x) */}
            <polygon
              points={`${cx},${cy} ${ax},${ay} ${tx},${ty}`}
              fill="rgba(180, 83, 9, 0.08)"
              stroke="#b45309"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />

            {/* Sector (area = 1/2 x) */}
            <path d={sectorPath} fill="rgba(14, 124, 123, 0.14)" />

            {/* Inner triangle OAP (area = 1/2 sin x) */}
            <polygon
              points={`${cx},${cy} ${ax},${ay} ${px},${py}`}
              fill="rgba(29, 84, 181, 0.16)"
              stroke="#1d54b5"
              strokeWidth="1.5"
            />

            {/* Arc x */}
            <path d={arcPath} fill="none" stroke="#0e7c7b" strokeWidth="3.2" strokeLinecap="round" />

            {/* Height sin x */}
            <line x1={px} y1={py} x2={px} y2={cy} stroke="#1d54b5" strokeWidth="2.8" />

            {/* Tangent segment tan x */}
            <line x1={ax} y1={ay} x2={tx} y2={ty} stroke="#b45309" strokeWidth="2.6" />

            {/* Ray O -> P -> T */}
            <line x1={cx} y1={cy} x2={tx} y2={ty} stroke="#172033" strokeWidth="1.5" />

            {/* Points */}
            <circle cx={cx} cy={cy} r="3.5" fill="#172033" />
            <circle cx={ax} cy={ay} r="3.5" fill="#172033" />
            <circle cx={px} cy={py} r="4.5" fill="#1d54b5" />
            <circle cx={tx} cy={ty} r="4" fill="#b45309" />

            {/* Labels */}
            <text x={cx - 14} y={cy + 16} fontSize="11" fill="#4a5568" fontWeight="600">O</text>
            <text x={ax - 4} y={cy + 16} fontSize="11" fill="#4a5568" fontWeight="600">A(1,0)</text>
            <text x={px - 18} y={py - 8} fontSize="11" fill="#1d54b5" fontWeight="700">P</text>
            <text x={px - 34} y={(py + cy) / 2 + 4} fontSize="11" fill="#1d54b5" fontWeight="700">sin x</text>
            <text x={ax + 8} y={(ay + ty) / 2 + 4} fontSize="11" fill="#b45309" fontWeight="700">tan x</text>
            <text x={cx + 26} y={cy - 8} fontSize="11" fill="#0e7c7b" fontWeight="700">x</text>

            {/* Legend */}
            <g transform="translate(18, 16)">
              <rect x="0" y="0" width="128" height="58" rx="6" fill="rgba(255,255,255,0.92)" stroke="#e6e2d8" />
              <line x1="10" y1="15" x2="26" y2="15" stroke="#1d54b5" strokeWidth="2.5" />
              <text x="32" y="19" fontSize="10.5" fill="#172033">sin x（内側の高さ）</text>
              <line x1="10" y1="31" x2="26" y2="31" stroke="#0e7c7b" strokeWidth="2.8" />
              <text x="32" y="35" fontSize="10.5" fill="#172033">x（円弧の長さ）</text>
              <line x1="10" y1="47" x2="26" y2="47" stroke="#b45309" strokeWidth="2.5" />
              <text x="32" y="51" fontSize="10.5" fill="#172033">tan x（外側の接線）</text>
            </g>
          </svg>
        </div>

        <div className="sim-slider-group">
          <div className="sim-slider-header">
            <span>中心角 x（ラジアン）を 0 に近づけてみよう</span>
            <span className="sim-slider-value">
              x = {x.toFixed(2)} rad（{((x * 180) / Math.PI).toFixed(1)}°）
            </span>
          </div>
          <input
            type="range"
            className="sim-range"
            min={0.04}
            max={1.15}
            step={0.01}
            value={x}
            onChange={(e) => setX(parseFloat(e.target.value))}
            aria-label="中心角x"
          />
        </div>

        <div className="sim-metrics">
          <div className="sim-metric-box">
            <div className="sim-metric-label">sin x</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-primary)' }}>
              {sinX.toFixed(4)}
            </div>
          </div>
          <div className="sim-metric-box">
            <div className="sim-metric-label">x（弧）</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-teal)' }}>
              {x.toFixed(4)}
            </div>
          </div>
          <div className="sim-metric-box">
            <div className="sim-metric-label">tan x</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-amber)' }}>
              {tanX.toFixed(4)}
            </div>
          </div>
          <div className="sim-metric-box" style={{ background: 'var(--accent-teal-soft)' }}>
            <div className="sim-metric-label">sin x / x</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-teal)' }}>
              {ratio.toFixed(5)}
            </div>
          </div>
        </div>

        <div className="sim-insight">
          常に <strong>sin x &lt; x &lt; tan x</strong> が成り立ちます。x を 0.04 近くまで小さくすると、
          円弧と縦の線分がほぼ重なり、比 <strong>sin x / x</strong> が限りなく <strong>1</strong> に近づくことが体感できます。
        </div>
      </div>
    </div>
  )
}
