import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpenCheck,
  CheckCircle2,
  Compass,
  FileCheck2,
  Lightbulb,
} from 'lucide-react'
import { useEffect } from 'react'
import { MathText } from '../components/MathText'
import { MiniCheck } from '../components/MiniCheck'
import { StepDerivation } from '../components/StepDerivation'
import { SimulatorView } from '../components/simulators/SimulatorRegistry'
import { CHAPTERS } from '../data/chapters'
import { ALL_TOPICS } from '../data/topics'
import type { MasteryLevel, TopicData } from '../types/curriculum'

interface TopicDetailPageProps {
  topic: TopicData
  mastery: MasteryLevel
  isBookmarked: boolean
  onBack: () => void
  onSelectTopic: (topicId: string) => void
  onSetMastery: (level: MasteryLevel) => void
  onToggleBookmark: () => void
  onOpenChapterDrill: (chapterId: TopicData['chapterId']) => void
}

export function TopicDetailPage({
  topic,
  mastery,
  isBookmarked,
  onBack,
  onSelectTopic,
  onSetMastery,
  onToggleBookmark,
  onOpenChapterDrill,
}: TopicDetailPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [topic.id])

  const chapter = CHAPTERS.find((c) => c.id === topic.chapterId)
  const idx = ALL_TOPICS.findIndex((t) => t.id === topic.id)
  const prevTopic = idx > 0 ? ALL_TOPICS[idx - 1] : null
  const nextTopic = idx >= 0 && idx < ALL_TOPICS.length - 1 ? ALL_TOPICS[idx + 1] : null

  return (
    <div>
      {/* Sticky Top Navigation Bar */}
      <header className="sticky-header">
        <div className="sticky-header-inner">
          <button
            id="btn-back-curriculum"
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onBack}
            style={{ minHeight: 36, padding: '4px 10px' }}
          >
            <ArrowLeft size={16} />
            一覧
          </button>

          <div
            style={{
              fontSize: '0.84rem',
              fontWeight: 700,
              color: 'var(--ink-secondary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              textAlign: 'center',
            }}
          >
            {chapter?.shortTitle} ・ #{topic.order}
          </div>

          <button
            id="btn-toggle-bookmark"
            type="button"
            className={`icon-btn ${isBookmarked ? 'active' : ''}`}
            onClick={onToggleBookmark}
            aria-label={isBookmarked ? 'ブックマークを解除' : '要復習ブックマークに追加'}
          >
            <Bookmark size={19} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </header>

      <main className="page-container stack-lg">
        {/* Title Header */}
        <section className="stack-xs">
          <div className="row-wrap">
            <span className="badge badge-primary">
              第{chapter?.number}章・トピック {topic.order}
            </span>
            <span className="badge badge-amber">テスト出題度：{topic.examFrequency}</span>
            <span className="badge badge-neutral">目安 {topic.estimatedMinutes}分</span>
          </div>
          <h1 style={{ fontSize: '1.4rem', lineHeight: 1.38, marginTop: 4 }}>{topic.title}</h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)' }}>{topic.subtitle}</p>
        </section>

        {/* 1. Intuitive Introduction */}
        <section className="surface-card surface-card-padded stack-md" aria-label="直感的な導入">
          <div className="row-between">
            <span className="badge badge-teal">
              <Compass size={13} />
              1. まずは直感でつかむ
            </span>
          </div>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink-primary)' }}>
            <MathText text={topic.intuition.hook} />
          </h2>
          <div className="stack-sm" style={{ fontSize: '0.94rem', color: 'var(--ink-primary)' }}>
            {topic.intuition.paragraphs.map((p, i) => (
              <p key={i}>
                <MathText text={p} />
              </p>
            ))}
          </div>
          <div className="callout callout-primary">
            <div className="callout-title">
              <Lightbulb size={15} />
              核心イメージ
            </div>
            <MathText text={topic.intuition.keyImage} />
          </div>
        </section>

        {/* 2. Interactive Visual Simulator (when available) */}
        {topic.simulatorId && <SimulatorView id={topic.simulatorId} />}

        {/* 3. Tap-to-Reveal Formula Derivation */}
        <StepDerivation key={topic.id} derivation={topic.derivation} />

        {/* 4. Worked Example & Exam Pitfalls */}
        <section className="surface-card surface-card-padded stack-md" aria-label="定期テスト典型例題">
          <div className="row-between">
            <span className="badge badge-amber">
              <BookOpenCheck size={13} />
              定期テスト典型例題
            </span>
          </div>

          <h2 style={{ fontSize: '1.04rem', fontWeight: 700 }}>{topic.workedExample.title}</h2>

          <div
            style={{
              background: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px',
              fontSize: '0.95rem',
              fontWeight: 600,
            }}
          >
            <MathText text={topic.workedExample.problem} />
          </div>

          <div className="callout callout-teal">
            <div className="callout-title">
              <Lightbulb size={15} />
              解法の糸口（思考プロセス）
            </div>
            <MathText text={topic.workedExample.thoughtProcess} />
          </div>

          <div className="stack-xs">
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--ink-secondary)' }}>
              解答の流れ
            </div>
            <ol
              style={{
                paddingLeft: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                fontSize: '0.92rem',
              }}
            >
              {topic.workedExample.solutionSteps.map((st, i) => (
                <li key={i}>
                  <MathText text={st} />
                </li>
              ))}
            </ol>
          </div>

          <div className="callout callout-red">
            <div className="callout-title">
              <AlertTriangle size={15} />
              よくある減点・計算ミスに注意！
            </div>
            <MathText text={topic.workedExample.pitfall} />
          </div>
        </section>

        {/* 5. Mini Self-Check */}
        <MiniCheck key={`mini-${topic.id}`} item={topic.miniCheck} />

        {/* 6. Pre-exam Summary */}
        <section className="surface-card surface-card-padded stack-sm" aria-label="テスト直前チェック">
          <span className="badge badge-primary" style={{ alignSelf: 'flex-start' }}>
            <FileCheck2 size={13} />
            テスト直前 3行まとめ
          </span>
          <ul
            style={{
              paddingLeft: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              fontSize: '0.92rem',
              color: 'var(--ink-primary)',
            }}
          >
            {topic.examSummary.map((line, i) => (
              <li key={i}>
                <MathText text={line} />
              </li>
            ))}
          </ul>
        </section>

        {/* 7. Self Mastery Recording & Chapter Drill Link */}
        <section className="surface-card surface-card-padded stack-md" aria-label="理解度の記録">
          <div className="row-between">
            <h2 style={{ fontSize: '0.98rem', fontWeight: 700 }}>このトピックの理解度を記録</h2>
            {mastery !== 'unstarted' && (
              <span className="badge badge-green">
                <CheckCircle2 size={12} />
                保存済み
              </span>
            )}
          </div>

          <div className="mastery-grid">
            <button
              type="button"
              className={`mastery-btn ${mastery === 'review' ? 'selected-review' : ''}`}
              onClick={() => onSetMastery('review')}
            >
              <span>要復習</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 500 }}>もう1回読む</span>
            </button>
            <button
              type="button"
              className={`mastery-btn ${mastery === 'almost' ? 'selected-almost' : ''}`}
              onClick={() => onSetMastery('almost')}
            >
              <span>ほぼOK</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 500 }}>演習で定着</span>
            </button>
            <button
              type="button"
              className={`mastery-btn ${mastery === 'mastered' ? 'selected-mastered' : ''}`}
              onClick={() => onSetMastery('mastered')}
            >
              <span>完璧！</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 500 }}>説明できる</span>
            </button>
          </div>

          <button
            type="button"
            className="btn btn-soft btn-full"
            onClick={() => onOpenChapterDrill(topic.chapterId)}
          >
            この章（{chapter?.shortTitle}）の計算ドリルを解く
          </button>
        </section>

        {/* Prev / Next Navigation */}
        <nav className="row-between" aria-label="前後のトピック" style={{ gap: 10 }}>
          {prevTopic ? (
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: 1, justifyContent: 'flex-start', padding: '10px 12px', fontSize: '0.84rem' }}
              onClick={() => onSelectTopic(prevTopic.id)}
            >
              <ArrowLeft size={16} style={{ flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {prevTopic.order}. {prevTopic.title}
              </span>
            </button>
          ) : (
            <div style={{ flex: 1 }} />
          )}

          {nextTopic ? (
            <button
              type="button"
              className="btn btn-primary"
              style={{ flex: 1, justifyContent: 'flex-end', padding: '10px 12px', fontSize: '0.84rem' }}
              onClick={() => onSelectTopic(nextTopic.id)}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {nextTopic.order}. {nextTopic.title}
              </span>
              <ArrowRight size={16} style={{ flexShrink: 0 }} />
            </button>
          ) : (
            <button type="button" className="btn btn-teal" style={{ flex: 1 }} onClick={onBack}>
              全20トピック完走！一覧へ
            </button>
          )}
        </nav>
      </main>
    </div>
  )
}
