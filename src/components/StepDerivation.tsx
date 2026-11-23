import { ChevronDown, Eye, RotateCcw, Sparkles } from 'lucide-react'
import { useState } from 'react'
import type { DerivationBlock } from '../types/curriculum'
import { MathBlock, MathText } from './MathText'

interface StepDerivationProps {
  derivation: DerivationBlock
}

export function StepDerivation({ derivation }: StepDerivationProps) {
  const [visibleCount, setVisibleCount] = useState(1)
  const total = derivation.steps.length
  const isComplete = visibleCount >= total

  return (
    <section className="derivation-card" aria-label="公式のステップ導出">
      <div className="derivation-header">
        <div className="row-between">
          <span className="badge badge-primary">
            <Sparkles size={13} />
            丸暗記しない導出ステップ
          </span>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-muted)' }}>
            {Math.min(visibleCount, total)} / {total} ステップ
          </span>
        </div>
        <h3 style={{ fontSize: '1.02rem', fontWeight: 700, marginTop: 2 }}>
          {derivation.title}
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)' }}>
          <MathText text={derivation.intro} />
        </p>
        <div className="derivation-goal">
          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
            導くゴール
          </div>
          <MathBlock tex={derivation.goalMath} />
        </div>
      </div>

      <div className="derivation-steps">
        {derivation.steps.slice(0, visibleCount).map((step, index) => (
          <div key={index} className="derivation-step">
            <div className="derivation-step-num">
              <span>STEP {index + 1}</span>
              <span style={{ color: 'var(--ink-primary)' }}>{step.label}</span>
            </div>
            {step.math && <MathBlock tex={step.math} />}
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-primary)' }}>
              <MathText text={step.explanation} />
            </p>
            {step.why && (
              <div className="derivation-why">
                <strong style={{ color: 'var(--accent-teal)' }}>なぜ？ </strong>
                <MathText text={step.why} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="derivation-actions">
        {!isComplete ? (
          <button
            type="button"
            className="btn btn-primary"
            style={{ flex: '1 1 180px' }}
            onClick={() => setVisibleCount((c) => Math.min(total, c + 1))}
          >
            <ChevronDown size={18} />
            次のステップを見る（{visibleCount + 1}/{total}）
          </button>
        ) : (
          <div
            className="badge badge-green"
            style={{ padding: '8px 14px', fontSize: '0.84rem', flex: '1 1 160px', justifyContent: 'center' }}
          >
            導出完了！自分の頭でも流れを再現してみよう
          </div>
        )}
        {!isComplete && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setVisibleCount(total)}
          >
            <Eye size={15} />
            すべて表示
          </button>
        )}
        {visibleCount > 1 && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setVisibleCount(1)}
          >
            <RotateCcw size={15} />
            最初から
          </button>
        )}
      </div>
    </section>
  )
}
