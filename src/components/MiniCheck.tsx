import { CheckCircle2, HelpCircle, Lightbulb } from 'lucide-react'
import { useState } from 'react'
import type { MiniCheckItem } from '../types/curriculum'
import { MathText } from './MathText'

interface MiniCheckProps {
  item: MiniCheckItem
}

export function MiniCheck({ item }: MiniCheckProps) {
  const [showHint, setShowHint] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <section className="surface-card surface-card-padded stack-sm" aria-label="理解度ミニチェック">
      <div className="row-between">
        <span className="badge badge-teal">
          <HelpCircle size={13} />
          1分確認チェック
        </span>
        <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
          まず頭の中で方針を立てよう
        </span>
      </div>

      <div style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--ink-primary)' }}>
        <MathText text={item.question} />
      </div>

      <div className="row-wrap">
        {!showHint && !showAnswer && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setShowHint(true)}
          >
            <Lightbulb size={15} />
            ヒントを見る
          </button>
        )}
        <button
          type="button"
          className={`btn btn-sm ${showAnswer ? 'btn-secondary' : 'btn-teal'}`}
          onClick={() => setShowAnswer((v) => !v)}
        >
          <CheckCircle2 size={15} />
          {showAnswer ? '解答を閉じる' : '解答・解説を見る'}
        </button>
      </div>

      {showHint && !showAnswer && (
        <div className="callout callout-amber">
          <div className="callout-title">
            <Lightbulb size={15} />
            方針ヒント
          </div>
          <MathText text={item.hint} />
        </div>
      )}

      {showAnswer && (
        <div className="callout callout-teal stack-xs">
          <div className="callout-title">
            <CheckCircle2 size={15} />
            解答
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>
            <MathText text={item.answer} />
          </div>
          <div style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', marginTop: 4 }}>
            <MathText text={item.explanation} />
          </div>
        </div>
      )}
    </section>
  )
}
