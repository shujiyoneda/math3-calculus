import { ArrowUpRight, Eye, EyeOff, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { MathBlock } from '../components/MathText'
import { CHAPTERS } from '../data/chapters'
import { FORMULA_SHEET } from '../data/formulas'
import type { ChapterId } from '../types/curriculum'

interface FormulaSheetPageProps {
  onOpenTopic: (topicId: string) => void
}

export function FormulaSheetPage({ onOpenTopic }: FormulaSheetPageProps) {
  const [selectedChapter, setSelectedChapter] = useState<'all' | ChapterId>('all')
  const [redSheetMode, setRedSheetMode] = useState(false)
  const [revealedIds, setRevealedIds] = useState<string[]>([])

  const items =
    selectedChapter === 'all'
      ? FORMULA_SHEET
      : FORMULA_SHEET.filter((f) => f.chapterId === selectedChapter)

  const toggleRedSheet = () => {
    setRedSheetMode((prev) => !prev)
    setRevealedIds([])
  }

  const toggleRevealItem = (id: string) => {
    if (!redSheetMode) return
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <main className="page-container stack-md">
      <section className="stack-xs">
        <div className="row-between">
          <h1 style={{ fontSize: '1.35rem', fontWeight: 700 }}>テスト直前・公式まとめ</h1>
          <span className="badge badge-neutral">{items.length}公式</span>
        </div>
        <p style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)' }}>
          すべての公式に「導出の起点」を添えています。赤シートモードで右辺を隠し、テスト直前の高速チェックに使えます。
        </p>
      </section>

      {/* Red Sheet Mode Toggle */}
      <section className="surface-card surface-card-padded row-between">
        <div>
          <div style={{ fontSize: '0.93rem', fontWeight: 700, color: 'var(--ink-primary)' }}>
            赤シート暗記モード
          </div>
          <div style={{ fontSize: '0.79rem', color: 'var(--ink-muted)' }}>
            右辺を隠してタップで1つずつ確認
          </div>
        </div>
        <button
          id="btn-toggle-redsheet"
          type="button"
          className={`btn btn-sm ${redSheetMode ? 'btn-primary' : 'btn-secondary'}`}
          style={
            redSheetMode
              ? { background: 'var(--accent-red)', color: '#fff' }
              : undefined
          }
          onClick={toggleRedSheet}
        >
          {redSheetMode ? <EyeOff size={15} /> : <Eye size={15} />}
          {redSheetMode ? '赤シート：ON' : '赤シートで隠す'}
        </button>
      </section>

      {/* Chapter Filter */}
      <section className="chip-row" aria-label="章別フィルター">
        <button
          type="button"
          className={`chip ${selectedChapter === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedChapter('all')}
        >
          全章
        </button>
        {CHAPTERS.map((ch) => (
          <button
            key={ch.id}
            type="button"
            className={`chip ${selectedChapter === ch.id ? 'active' : ''}`}
            onClick={() => setSelectedChapter(ch.id)}
          >
            {ch.shortTitle}
          </button>
        ))}
      </section>

      {/* Formula Cards */}
      <section className="stack-sm">
        {items.map((item) => {
          const isHidden = redSheetMode && !revealedIds.includes(item.id)
          const chapter = CHAPTERS.find((c) => c.id === item.chapterId)

          return (
            <article key={item.id} className="surface-card surface-card-padded stack-sm">
              <div className="row-between">
                <div className="row-wrap" style={{ gap: 6 }}>
                  <span className="badge badge-primary">{chapter?.shortTitle}</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-muted)' }}>
                    {item.category}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ minHeight: 30, padding: '2px 8px', fontSize: '0.74rem' }}
                  onClick={() => onOpenTopic(item.topicId)}
                >
                  解説へ
                  <ArrowUpRight size={13} />
                </button>
              </div>

              <h2 style={{ fontSize: '0.96rem', fontWeight: 700 }}>{item.name}</h2>

              {/* Formula Display Box */}
              <div
                style={{
                  background: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 12px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  overflowX: 'auto',
                }}
              >
                <MathBlock tex={item.lhs} display={false} />
                <span style={{ fontWeight: 700, color: 'var(--ink-muted)' }}>=</span>
                <button
                  type="button"
                  className={`formula-mask ${isHidden ? 'hidden' : ''}`}
                  onClick={() => toggleRevealItem(item.id)}
                  aria-label={isHidden ? '公式の右辺を表示する' : '公式の右辺'}
                  style={{
                    background: isHidden ? undefined : 'var(--bg-surface)',
                    border: isHidden ? 'none' : '1px solid var(--border-subtle)',
                  }}
                >
                  <MathBlock tex={item.rhs} display={false} />
                </button>
              </div>

              {/* Derivation Origin */}
              <div
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--ink-secondary)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 6,
                }}
              >
                <Sparkles size={14} color="var(--accent-teal)" style={{ marginTop: 3, flexShrink: 0 }} />
                <span>
                  <strong style={{ color: 'var(--accent-teal)' }}>導出の起点：</strong>
                  {item.originNote}
                </span>
              </div>

              {item.examTip && (
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--accent-amber)',
                    background: 'var(--accent-amber-soft)',
                    padding: '6px 10px',
                    borderRadius: 6,
                    fontWeight: 600,
                  }}
                >
                  テスト注意：{item.examTip}
                </div>
              )}
            </article>
          )
        })}
      </section>
    </main>
  )
}
