import {
  Activity,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { CHAPTERS } from '../data/chapters'
import { ALL_TOPICS, getTopicsByChapter } from '../data/topics'
import type { ChapterId, MasteryLevel, ProgressState } from '../types/curriculum'

interface HomePageProps {
  progress: ProgressState
  onOpenTopic: (topicId: string) => void
  onStartQuickDrill: () => void
}

function masteryLabel(level: MasteryLevel | undefined) {
  if (level === 'mastered') return { text: '完璧', cls: 'badge-green' }
  if (level === 'almost') return { text: 'ほぼOK', cls: 'badge-primary' }
  if (level === 'review') return { text: '要復習', cls: 'badge-amber' }
  return null
}

export function HomePage({ progress, onOpenTopic, onStartQuickDrill }: HomePageProps) {
  const [selectedChapter, setSelectedChapter] = useState<'all' | ChapterId>('all')

  const totalTopics = ALL_TOPICS.length
  const completedCount = ALL_TOPICS.filter((t) => {
    const m = progress.topicMastery[t.id]
    return m === 'almost' || m === 'mastered'
  }).length
  const overallPercent = Math.round((completedCount / totalTopics) * 100)

  const resumeTopicId = progress.lastTopicId ?? ALL_TOPICS[0].id
  const resumeTopic = ALL_TOPICS.find((t) => t.id === resumeTopicId) ?? ALL_TOPICS[0]

  const visibleChapters =
    selectedChapter === 'all'
      ? CHAPTERS
      : CHAPTERS.filter((ch) => ch.id === selectedChapter)

  return (
    <main className="page-container stack-lg">
      {/* Compact Hero / Resume Card */}
      <section className="surface-card surface-card-padded stack-md">
        <div className="stack-xs">
          <div className="row-between">
            <span className="badge badge-primary">高校数学III・微分積分</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink-muted)' }}>
              全5章・{totalTopics}トピック
            </span>
          </div>
          <h1 style={{ fontSize: '1.45rem', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
            数III 微積ノート
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
            公式の丸暗記を卒業し、動くグラフと導出ステップで「定期テストの得点力」と「本質理解」を同時に固める学習教材。
          </p>
        </div>

        {/* Overall Progress */}
        <div className="stack-xs">
          <div className="row-between" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
            <span style={{ color: 'var(--ink-secondary)' }}>全体の学習進捗</span>
            <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
              {completedCount} / {totalTopics} 完了（{overallPercent}%）
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${overallPercent}%` }} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="stack-xs">
          <button
            id="btn-resume-study"
            type="button"
            className="btn btn-primary btn-full"
            onClick={() => onOpenTopic(resumeTopic.id)}
          >
            <span>
              {progress.lastTopicId ? '続きから学ぶ：' : '最初から学ぶ：'}
              {resumeTopic.order}. {resumeTopic.title}
            </span>
            <ArrowRight size={17} />
          </button>
          <button
            id="btn-quick-drill"
            type="button"
            className="btn btn-secondary btn-full"
            onClick={onStartQuickDrill}
          >
            <Sparkles size={16} color="var(--accent-teal)" />
            スキマ時間5分・計算トレーニングへ
          </button>
        </div>
      </section>

      {/* Chapter Filter Chips */}
      <section className="stack-sm" aria-label="章フィルター">
        <div className="chip-row">
          <button
            type="button"
            className={`chip ${selectedChapter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedChapter('all')}
          >
            すべて（5章）
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
        </div>
      </section>

      {/* Chapter Curriculum Lists */}
      <section className="stack-md" aria-label="カリキュラム一覧">
        {visibleChapters.map((chapter) => {
          const topics = getTopicsByChapter(chapter.id)
          const chDone = topics.filter((t) => {
            const m = progress.topicMastery[t.id]
            return m === 'almost' || m === 'mastered'
          }).length

          return (
            <article key={chapter.id} className="surface-card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '16px 16px 14px', background: 'var(--bg-surface-subtle)' }}>
                <div className="row-between">
                  <span className={`badge badge-${chapter.accent}`}>
                    第{chapter.number}章
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--ink-muted)',
                    }}
                  >
                    {chDone}/{topics.length} 完了
                  </span>
                </div>
                <h2 style={{ fontSize: '1.08rem', fontWeight: 700, marginTop: 6 }}>
                  {chapter.title}
                </h2>
                <p style={{ fontSize: '0.83rem', color: 'var(--ink-secondary)', marginTop: 3 }}>
                  {chapter.subtitle}
                </p>
              </div>

              <div>
                {topics.map((topic) => {
                  const mastery = progress.topicMastery[topic.id]
                  const badge = masteryLabel(mastery)
                  const isBookmarked = progress.bookmarks.includes(topic.id)

                  return (
                    <button
                      key={topic.id}
                      id={`topic-item-${topic.id}`}
                      type="button"
                      className="topic-row"
                      onClick={() => onOpenTopic(topic.id)}
                    >
                      <span
                        className={`topic-num-circle ${
                          mastery && mastery !== 'unstarted' ? mastery : ''
                        }`}
                      >
                        {mastery === 'mastered' ? (
                          <CheckCircle2 size={17} />
                        ) : (
                          topic.order
                        )}
                      </span>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="row-between" style={{ gap: 6 }}>
                          <span
                            style={{
                              fontSize: '0.95rem',
                              fontWeight: 700,
                              color: 'var(--ink-primary)',
                            }}
                          >
                            {topic.title}
                          </span>
                          {isBookmarked && (
                            <Bookmark
                              size={15}
                              fill="var(--accent-amber)"
                              color="var(--accent-amber)"
                              style={{ flexShrink: 0 }}
                            />
                          )}
                        </div>
                        <p
                          style={{
                            fontSize: '0.8rem',
                            color: 'var(--ink-muted)',
                            marginTop: 2,
                            lineHeight: 1.45,
                          }}
                        >
                          {topic.subtitle}
                        </p>
                        <div className="row-wrap" style={{ marginTop: 6, gap: 6 }}>
                          <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                            <Clock size={11} />
                            {topic.estimatedMinutes}分
                          </span>
                          {topic.examFrequency === '超頻出' && (
                            <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                              定期テスト超頻出
                            </span>
                          )}
                          {topic.simulatorId && (
                            <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                              <Activity size={11} />
                              動くグラフ
                            </span>
                          )}
                          {badge && (
                            <span className={`badge ${badge.cls}`} style={{ fontSize: '0.7rem' }}>
                              {badge.text}
                            </span>
                          )}
                        </div>
                      </div>

                      <ArrowRight size={16} color="var(--ink-muted)" style={{ flexShrink: 0 }} />
                    </button>
                  )
                })}
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}
