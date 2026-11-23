import { Activity } from 'lucide-react'
import { useState } from 'react'

type SolidKey = 'sqrt' | 'sin' | 'parabolaY'

const SOLIDS: Record<
  SolidKey,
  {
    label: string
    axis: 'x' | 'y'
    formulaText: string
    radiusAt: (u: number) => number // u in [0, 1]
    exactVolumeText: string
    maxU: number
  }
> = {
  sqrt: {
    label: 'y = √x (x軸回転)',
    axis: 'x',
    formulaText: 'V = π ∫₀⁴ (√x)² dx = 8π',
    radiusAt: (u) => Math.sqrt(u),
    exactVolumeText: '8π ≈ 25.13',
    maxU: 4,
  },
  sin: {
    label: 'y = sin x (x軸回転)',
    axis: 'x',
    formulaText: 'V = π ∫₀^π sin²x dx = π²/2',
    radiusAt: (u) => Math.sin(u * Math.PI),
    exactVolumeText: 'π²/2 ≈ 4.93',
    maxU: Math.PI,
  },
  parabolaY: {
    label: 'y = x² (y軸回転)',
    axis: 'y',
    formulaText: 'V = π ∫₀⁴ x² dy = π ∫₀⁴ y dy = 8π',
    radiusAt: (u) => Math.sqrt(u),
    exactVolumeText: '8π ≈ 25.13',
    maxU: 4,
  },
}

export function SolidRevolutionSim() {
  const [solidKey, setSolidKey] = useState<SolidKey>('sqrt')
  const [slicePos, setSlicePos] = useState(0.55)
  const [tilt, setTilt] = useState(0.36)

  const solid = SOLIDS[solidKey]
  const isX = solid.axis === 'x'

  // Draw isometric-like 3D projection of slices along axis
  const numRings = 16
  const startCoord = 48
  const length = 220
  const centerCross = 112
  const maxRad = 68

  const projectEllipse = (u: number) => {
    const r = solid.radiusAt(u) * maxRad
    if (isX) {
      const cx = startCoord + u * length
      const cy = centerCross
      const rx = Math.max(1, r * tilt)
      const ry = Math.max(1, r)
      return { cx, cy, rx, ry, r }
    } else {
      // y-axis vertical (bottom to top)
      const cx = 160
      const cy = 185 - u * 145
      const rx = Math.max(1, r)
      const ry = Math.max(1, r * tilt)
      return { cx, cy, rx, ry, r }
    }
  }

  // Outer silhouette curve
  const upperOutline = Array.from({ length: 41 }, (_, i) => {
    const u = i / 40
    const p = projectEllipse(u)
    return isX ? `${p.cx.toFixed(1)},${(p.cy - p.ry).toFixed(1)}` : `${(p.cx - p.rx).toFixed(1)},${p.cy.toFixed(1)}`
  }).join(' ')

  const lowerOutline = Array.from({ length: 41 }, (_, i) => {
    const u = i / 40
    const p = projectEllipse(u)
    return isX ? `${p.cx.toFixed(1)},${(p.cy + p.ry).toFixed(1)}` : `${(p.cx + p.rx).toFixed(1)},${p.cy.toFixed(1)}`
  }).join(' ')

  const activeSlice = projectEllipse(slicePos)
  const currentCoordVal = slicePos * solid.maxU
  const currentRadiusVal =
    solidKey === 'sqrt'
      ? Math.sqrt(currentCoordVal)
      : solidKey === 'sin'
        ? Math.sin(currentCoordVal)
        : Math.sqrt(currentCoordVal)
  const crossSectionArea = Math.PI * currentRadiusVal * currentRadiusVal

  return (
    <div className="sim-card">
      <div className="sim-header">
        <div>
          <div className="sim-title">
            <Activity size={17} color="var(--accent-teal)" />
            回転体 3D断面スライス・シミュレーター
          </div>
          <div className="sim-subtitle">
            立体は「薄い円板 πr² の積み重ね」。スライス位置と見る角度を動かして確認しよう
          </div>
        </div>
        <span className="badge badge-teal">操作可能</span>
      </div>

      <div className="sim-body">
        <div className="chip-row">
          {(Object.keys(SOLIDS) as SolidKey[]).map((k) => (
            <button
              key={k}
              type="button"
              className={`chip ${solidKey === k ? 'active' : ''}`}
              onClick={() => setSolidKey(k)}
            >
              {SOLIDS[k].label}
            </button>
          ))}
        </div>

        <div className="sim-canvas-box">
          <svg viewBox="0 0 320 220" role="img" aria-label="回転体と断面積円板の3D投影図">
            {/* Rotation axis */}
            {isX ? (
              <>
                <line x1="22" y1={centerCross} x2="298" y2={centerCross} stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="5 4" />
                <text x="288" y={centerCross - 7} fontSize="11" fill="#64748b" fontWeight="700">x軸</text>
              </>
            ) : (
              <>
                <line x1="160" y1="16" x2="160" y2="206" stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="5 4" />
                <text x="168" y="26" fontSize="11" fill="#64748b" fontWeight="700">y軸</text>
              </>
            )}

            {/* Wireframe rings for 3D depth */}
            {Array.from({ length: numRings + 1 }, (_, i) => {
              const u = i / numRings
              const p = projectEllipse(u)
              return (
                <ellipse
                  key={i}
                  cx={p.cx}
                  cy={p.cy}
                  rx={p.rx}
                  ry={p.ry}
                  fill="rgba(29, 84, 181, 0.04)"
                  stroke="rgba(29, 84, 181, 0.25)"
                  strokeWidth="1"
                />
              )
            })}

            {/* Silhouettes */}
            <polyline fill="none" stroke="#1d54b5" strokeWidth="2.4" points={upperOutline} />
            <polyline fill="none" stroke="#1d54b5" strokeWidth="2.4" points={lowerOutline} />

            {/* Highlighted active cross-section disk */}
            <ellipse
              cx={activeSlice.cx}
              cy={activeSlice.cy}
              rx={activeSlice.rx}
              ry={activeSlice.ry}
              fill="rgba(14, 124, 123, 0.34)"
              stroke="#0e7c7b"
              strokeWidth="2.5"
            />

            {/* Radius indicator on active disk */}
            {isX ? (
              <>
                <line
                  x1={activeSlice.cx}
                  y1={activeSlice.cy}
                  x2={activeSlice.cx}
                  y2={activeSlice.cy - activeSlice.ry}
                  stroke="#b45309"
                  strokeWidth="2.4"
                />
                <circle cx={activeSlice.cx} cy={activeSlice.cy} r="3" fill="#172033" />
                <text
                  x={activeSlice.cx + 6}
                  y={activeSlice.cy - activeSlice.ry / 2}
                  fontSize="11"
                  fill="#b45309"
                  fontWeight="700"
                >
                  r = {currentRadiusVal.toFixed(2)}
                </text>
              </>
            ) : (
              <>
                <line
                  x1={activeSlice.cx}
                  y1={activeSlice.cy}
                  x2={activeSlice.cx + activeSlice.rx}
                  y2={activeSlice.cy}
                  stroke="#b45309"
                  strokeWidth="2.4"
                />
                <circle cx={activeSlice.cx} cy={activeSlice.cy} r="3" fill="#172033" />
                <text
                  x={activeSlice.cx + activeSlice.rx / 2 - 14}
                  y={activeSlice.cy - 8}
                  fontSize="11"
                  fill="#b45309"
                  fontWeight="700"
                >
                  r = {currentRadiusVal.toFixed(2)}
                </text>
              </>
            )}
          </svg>
        </div>

        <div className="sim-slider-group">
          <div className="sim-slider-header">
            <span>切り口（円板）の位置をスライド</span>
            <span className="sim-slider-value">
              {isX ? 'x' : 'y'} = {currentCoordVal.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            className="sim-range"
            min={0.05}
            max={0.96}
            step={0.01}
            value={slicePos}
            onChange={(e) => setSlicePos(parseFloat(e.target.value))}
            aria-label="断面の位置"
          />
        </div>

        <div className="sim-slider-group">
          <div className="sim-slider-header">
            <span>立体を見る角度（奥行き）</span>
            <span className="sim-slider-value">{Math.round(tilt * 100)}%</span>
          </div>
          <input
            type="range"
            className="sim-range"
            min={0.14}
            max={0.55}
            step={0.01}
            value={tilt}
            onChange={(e) => setTilt(parseFloat(e.target.value))}
            aria-label="3D奥行き角度"
          />
        </div>

        <div className="sim-metrics">
          <div className="sim-metric-box">
            <div className="sim-metric-label">現在の断面積 S = πr²</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-teal)' }}>
              {crossSectionArea.toFixed(2)}
            </div>
          </div>
          <div className="sim-metric-box">
            <div className="sim-metric-label">全体の体積 V</div>
            <div className="sim-metric-val" style={{ color: 'var(--accent-primary)' }}>
              {solid.exactVolumeText}
            </div>
          </div>
        </div>

        <div className="sim-insight">
          <strong>公式の成り立ち：</strong>{solid.formulaText}<br />
          回転軸に垂直に切ると必ず<strong>円</strong>になり、半径は「軸から曲線までの距離」です。y軸回転では半径が <strong>x</strong>、厚さが <strong>dy</strong> になる点に注意！
        </div>
      </div>
    </div>
  )
}
