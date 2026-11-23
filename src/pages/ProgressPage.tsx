import { ArrowRight, Bookmark, CheckCircle2, Flame, RotateCcw, Target } from 'lucide-react'
import { useState } from 'react'
import { CHAPTERS } from '../data/chapters'
import { ALL_TOPICS, getTopicsByChapter } from '../data/topics'
import type { ProgressState } from '../types/curriculum'

interface ProgressPageProps {
  progress: ProgressState
  onOpenTopic: (topicId: string) => void
  onOpenWrongDrill: () => void
  onResetProgress: () => void
}

export function ProgressPage({
  progress,
  onOpenTopic,
  onOpenWrongDrill,
  onResetProgress,
}: ProgressPageProps) {
  const [confirmReset, setConfirmReset] = useState(false)

  const totalTopics = ALL_TOPICS.length
  const masteredCount = ALL_TOPICS.filter((t) => progress.topicMastery[t.id] === 'mastered').length
  const almostCount = ALL_TOPICS.filter((t) => progress.topicMastery[t.id] === 'almost').length
  const reviewTopics = ALL_TOPICS.filter(
    (t) => progress.topicMastery[t.id] === 'review' || progress.bookmarks.includes(t.id)
  )

  const totalDrillAttempted = Object.values(progress.drillStatsByChapter).reduce(
    (acc, s) => acc + s.attempted,
    0
  )
  const totalDrillCorrect = Object.values(progress.drillStatsByChapter).reduce(
    (acc, s) => acc + s.correct,
    0
  )
  const drillRate =
    totalDrillAttempted > 0 ? Math.round((totalDrillCorrect / totalDrillAttempted) * 100) : 0

  return (
    <main className="page-container stack-lg">
      <section className="stack-xs">
        <h1 style={{ fontSize: '1.35rem', fontWeight: 700 }}>学習進捗・復習リスト</h1>
        <p style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)' }}>
          学習記録はこの端末のブラウザ内に自動保存されます（登録不要）。
        </p>
      </section>

      {/* Summary KPI Grid */}
      <section className="sim-metrics" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="surface-card surface-card-padded" style={{ textAlign: 'center', padding: '14px 10px' }}>
          <CheckCircle2 size={20} color="var(--accent-green)" style={{ margin: '0 auto 4px' }} />
          <div style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', fontWeight: 600 }}>習得済み</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, marginTop: 2 }}>
            {masteredCount + almostCount}/{totalTopics}
          </div>
        </div>
        <div className="surface-card surface-card-padded" style={{ textAlign: 'center', padding: '14px 10px' }}>
          <Target size={20} color="var(--accent-primary)" style={{ margin: '0 auto 4px' }} />
          <div style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', fontWeight: 600 }}>ドリル正答率</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, marginTop: 2 }}>
            {totalDrillAttempted > 0 ? `${drillRate}%` : '—'}
          </div>
        </div>
        <div className="surface-card surface-card-padded" style={{ textAlign: 'center', padding: '14px 10px' }}>
          <Flame size={20} color="var(--accent-amber)" style={{ margin: '0 auto 4px' }} />
          <div style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', fontWeight: 600 }}>最高連続正解</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, marginTop: 2 }}>
            {progress.bestStreak}
          </div>
        </div>
      </section>

      {/* Chapter Progress Breakdown */}
      <section className="surface-card surface-card-padded stack-md">
        <h2 style={{ fontSize: '1.02rem', fontWeight: 700 }}>章ごとの達成状況</h2>
        <div className="stack-md">
          {CHAPTERS.map((ch) => {
            const topics = getTopicsByChapter(ch.id)
            const done = topics.filter((t) => {
              const m = progress.topicMastery[t.id]
              return m === 'almost' || m === 'mastered'
            }).length
            const pct = Math.round((done / topics.length) * 100)
            const dStat = progress.drillStatsByChapter[ch.id]
            const dPct =
              dStat.attempted > 0 ? Math.round((dStat.correct / dStat.attempted) * 100) : null

            return (
              <div key={ch.id} className="stack-xs">
                <div className="row-between" style={{ fontSize: '0.86rem' }}>
                  <span style={{ fontWeight: 700 }}>{ch.shortTitle}：{ch.title}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                    {done}/{topics.length} 完了
                    {dPct !== null ? `・ドリル ${dPct}%` : ''}
                  </span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill green" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Needs Review / Bookmarked Topics */}
      <section className="surface-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px', background: 'var(--bg-surface-subtle)' }}>
          <div className="row-between">
            <h2 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Bookmark size={16} color="var(--accent-amber)" />
              要復習・ブックマークした単元
            </h2>
            <span className="badge badge-amber">{reviewTopics.length}件</span>
          </div>
        </div>

        {reviewTopics.length === 0 ? (
          <div style={{ padding: '18px 16px', fontSize: '0.86rem', color: 'var(--ink-muted)' }}>
            現在ブックマークや「要復習」の単元はありません。学習画面の右上アイコンや理解度ボタンから追加できます。
          </div>
        ) : (
          reviewTopics.map((topic) => (
            <button
              key={topic.id}
              type="button"
              className="topic-row"
              onClick={() => onOpenTopic(topic.id)}
            >
              <span className="topic-num-circle review">{topic.order}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.92rem', fontWeight: 700 }}>{topic.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>{topic.subtitle}</div>
              </div>
              <ArrowRight size={16} color="var(--ink-muted)" />
            </button>
          ))
        )}
      </section>

      {/* Wrong Drills Quick Action */}
      {progress.wrongDrillIds.length > 0 && (
        <section className="surface-card surface-card-padded stack-sm">
          <div className="row-between">
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
              計算ドリルで間違えた問題が {progress.wrongDrillIds.length} 問あります
            </span>
          </div>
          <button type="button" className="btn btn-primary btn-full" onClick={onOpenWrongDrill}>
            苦手問題だけリトライする
          </button>
        </section>
      )}

      {/* Reset Progress */}
      <section className="surface-card surface-card-padded stack-sm">
        <div className="row-between">
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>学習データのリセット</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
              進捗・ブックマーク・ドリル履歴を初期化します
            </div>
          </div>
          {!confirmReset ? (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setConfirmReset(true)}
            >
              <RotateCcw size={14} />
              リセット
            </button>
          ) : (
            <div className="row-wrap">
              <button
                type="button"
                className="btn btn-sm"
                style={{ background: 'var(--accent-red)', color: '#fff' }}
                onClick={() => {
                  onResetProgress()
                  setConfirmReset(false)
                }}
              >
                本当に初期化する
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setConfirmReset(false)}
              >
                キャンセル
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
