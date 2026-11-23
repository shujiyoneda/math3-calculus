import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Flame,
  Lightbulb,
  PenTool,
  RefreshCw,
  RotateCcw,
  Shuffle,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { MathText } from '../components/MathText'
import { CHAPTERS } from '../data/chapters'
import { DRILL_BANK, generateDynamicDrills } from '../data/drills'
import type { ChapterId, DrillQuestion, ProgressState } from '../types/curriculum'

type DrillScope = 'all' | ChapterId | 'wrong' | 'infinite'

interface DrillPageProps {
  initialScope: DrillScope
  progress: ProgressState
  onRecordResult: (
    questionId: string,
    chapterId: ChapterId,
    isCorrect: boolean,
    streak: number,
    trackWrong?: boolean
  ) => void
  onOpenTopic: (topicId: string) => void
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function DrillPage({
  initialScope,
  progress,
  onRecordResult,
  onOpenTopic,
}: DrillPageProps) {
  const [scope, setScope] = useState<DrillScope>(initialScope)
  const [paperMode, setPaperMode] = useState(false)
  const [sessionKey, setSessionKey] = useState(0)

  const queue: DrillQuestion[] = useMemo(() => {
    void sessionKey
    if (scope === 'infinite') {
      return generateDynamicDrills(8)
    }
    if (scope === 'wrong') {
      const wrongQs = DRILL_BANK.filter((q) => progress.wrongDrillIds.includes(q.id))
      return shuffle(wrongQs)
    }
    if (scope === 'all') {
      return shuffle(DRILL_BANK).slice(0, 10)
    }
    return shuffle(DRILL_BANK.filter((q) => q.chapterId === scope))
  }, [scope, sessionKey, progress.wrongDrillIds])

  const [index, setIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [paperRevealed, setPaperRevealed] = useState(false)
  const [paperResult, setPaperResult] = useState<'correct' | 'wrong' | null>(null)
  const [hintLevel, setHintLevel] = useState<0 | 1 | 2>(0)
  const [streak, setStreak] = useState(0)
  const [sessionCorrect, setSessionCorrect] = useState(0)
  const [sessionDone, setSessionDone] = useState(false)

  const current = queue[index]

  const startFresh = (nextScope: DrillScope) => {
    setScope(nextScope)
    setSessionKey((k) => k + 1)
    setIndex(0)
    setSelectedChoice(null)
    setPaperRevealed(false)
    setPaperResult(null)
    setHintLevel(0)
    setSessionCorrect(0)
    setSessionDone(false)
  }

  const handleSelectChoice = (choiceIdx: number) => {
    if (!current || selectedChoice !== null) return
    setSelectedChoice(choiceIdx)
    const ok = choiceIdx === current.correctIndex
    const nextStreak = ok ? streak + 1 : 0
    setStreak(nextStreak)
    if (ok) setSessionCorrect((c) => c + 1)
    onRecordResult(current.id, current.chapterId, ok, nextStreak, !current.isGenerated)
  }

  const handlePaperSelfGrade = (ok: boolean) => {
    if (!current || paperResult !== null) return
    setPaperResult(ok ? 'correct' : 'wrong')
    const nextStreak = ok ? streak + 1 : 0
    setStreak(nextStreak)
    if (ok) setSessionCorrect((c) => c + 1)
    onRecordResult(current.id, current.chapterId, ok, nextStreak, !current.isGenerated)
  }

  const handleNext = () => {
    if (index + 1 >= queue.length) {
      setSessionDone(true)
      return
    }
    setIndex((i) => i + 1)
    setSelectedChoice(null)
    setPaperRevealed(false)
    setPaperResult(null)
    setHintLevel(0)
  }

  const isAnswered = paperMode ? paperResult !== null : selectedChoice !== null
  const isCorrect = paperMode
    ? paperResult === 'correct'
    : selectedChoice !== null && current && selectedChoice === current.correctIndex

  return (
    <main className="page-container stack-md">
      {/* Header */}
      <section className="stack-xs">
        <div className="row-between">
          <h1 style={{ fontSize: '1.35rem', fontWeight: 700 }}>計算トレーニングドリル</h1>
          <span className="badge badge-amber">
            <Flame size={13} />
            連続正解 {streak}
          </span>
        </div>
        <p style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)' }}>
          定期テストの計算スピードと正確性を鍛えよう。選択式と「紙とペンで解くモード」を切り替えられます。
        </p>
      </section>

      {/* Scope Filter Chips */}
      <section className="stack-xs">
        <div className="chip-row">
          <button
            type="button"
            className={`chip ${scope === 'all' ? 'active' : ''}`}
            onClick={() => startFresh('all')}
          >
            ランダム10問
          </button>
          <button
            type="button"
            className={`chip ${scope === 'infinite' ? 'active' : ''}`}
            onClick={() => startFresh('infinite')}
          >
            無限生成ドリル
          </button>
          <button
            type="button"
            className={`chip ${scope === 'wrong' ? 'active' : ''}`}
            onClick={() => startFresh('wrong')}
          >
            苦手リトライ（{progress.wrongDrillIds.length}）
          </button>
          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              type="button"
              className={`chip ${scope === ch.id ? 'active' : ''}`}
              onClick={() => startFresh(ch.id)}
            >
              {ch.shortTitle}
            </button>
          ))}
        </div>

        <div className="row-between" style={{ marginTop: 4 }}>
          <button
            type="button"
            className={`btn btn-sm ${paperMode ? 'btn-teal' : 'btn-secondary'}`}
            onClick={() => {
              setPaperMode((p) => !p)
              setSelectedChoice(null)
              setPaperRevealed(false)
              setPaperResult(null)
            }}
          >
            <PenTool size={14} />
            {paperMode ? '紙ペン演習モード：ON' : '選択式モード（タップで切替）'}
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => startFresh(scope)}
          >
            <Shuffle size={14} />
            問題を入れ替え
          </button>
        </div>
      </section>

      {/* Empty Wrong Queue */}
      {queue.length === 0 ? (
        <section className="surface-card surface-card-padded stack-md" style={{ textAlign: 'center' }}>
          <CheckCircle2 size={38} color="var(--accent-green)" style={{ margin: '0 auto' }} />
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
            現在、間違えた問題（苦手リスト）はありません！
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)' }}>
            素晴らしいペースです。ランダム10問や無限生成ドリルで計算力をさらに盤石にしましょう。
          </p>
          <button
            type="button"
            className="btn btn-primary btn-full"
            onClick={() => startFresh('all')}
          >
            ランダム10問に挑戦する
          </button>
        </section>
      ) : sessionDone ? (
        /* Session Completion Summary */
        <section className="surface-card surface-card-padded stack-md" style={{ textAlign: 'center' }}>
          <span className="badge badge-green" style={{ margin: '0 auto' }}>
            セット完了！
          </span>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
            {sessionCorrect} / {queue.length} 問正解（
            {Math.round((sessionCorrect / queue.length) * 100)}%）
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
            {sessionCorrect === queue.length
              ? '全問正解！定期テストの計算スピードもバッチリです。'
              : '間違えた問題は自動的に「苦手リトライ」に保存されました。解説を確認して再挑戦しましょう！'}
          </p>
          <div className="stack-xs">
            <button
              type="button"
              className="btn btn-primary btn-full"
              onClick={() => startFresh(scope)}
            >
              <RefreshCw size={16} />
              同じモードでもう1セット解く
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-full"
              onClick={() => startFresh('infinite')}
            >
              無限生成ドリルで計算練習を続ける
            </button>
          </div>
        </section>
      ) : (
        /* Active Question Card */
        current && (
          <section className="surface-card surface-card-padded stack-md">
            {/* Question Progress */}
            <div className="stack-xs">
              <div className="row-between">
                <div className="row-wrap" style={{ gap: 6 }}>
                  <span className="badge badge-primary">{current.tag}</span>
                  <span className="badge badge-neutral">{current.difficulty}</span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--ink-muted)',
                  }}
                >
                  Q.{index + 1} / {queue.length}
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill teal"
                  style={{ width: `${((index + 1) / queue.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Prompt */}
            <div
              style={{
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px 14px',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              <MathText text={current.prompt} />
            </div>

            {/* Staged Hints */}
            {!isAnswered && (
              <div className="stack-xs">
                <div className="row-wrap">
                  {hintLevel < 2 && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setHintLevel((h) => (h === 0 ? 1 : 2))}
                    >
                      <Lightbulb size={15} color="var(--accent-amber)" />
                      {hintLevel === 0 ? 'ヒント1：方針を見る' : 'ヒント2：途中式を見る'}
                    </button>
                  )}
                </div>

                {hintLevel >= 1 && (
                  <div className="callout callout-amber">
                    <div className="callout-title">ヒント1（方針）</div>
                    <MathText text={current.hint1} />
                  </div>
                )}
                {hintLevel >= 2 && (
                  <div className="callout callout-primary">
                    <div className="callout-title">ヒント2（途中式）</div>
                    <MathText text={current.hint2} />
                  </div>
                )}
              </div>
            )}

            {/* Answer Interaction Area */}
            {!paperMode ? (
              <div className="stack-xs">
                {current.choices.map((choice, ci) => {
                  let cls = 'drill-option'
                  if (selectedChoice !== null) {
                    if (ci === current.correctIndex) cls += ' correct'
                    else if (ci === selectedChoice) cls += ' wrong'
                  }
                  const label = ['A', 'B', 'C', 'D'][ci] ?? String(ci + 1)
                  return (
                    <button
                      key={ci}
                      id={`drill-choice-${ci}`}
                      type="button"
                      className={cls}
                      disabled={selectedChoice !== null}
                      onClick={() => handleSelectChoice(ci)}
                    >
                      <span className="drill-option-label">{label}</span>
                      <span style={{ flex: 1, fontSize: '0.96rem', fontWeight: 600 }}>
                        <MathText text={choice} />
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="stack-sm">
                {!paperRevealed ? (
                  <button
                    type="button"
                    className="btn btn-teal btn-full"
                    onClick={() => setPaperRevealed(true)}
                  >
                    ノートで計算した！答えと解説を見る
                  </button>
                ) : (
                  <div className="stack-sm">
                    <div className="callout callout-primary">
                      <div className="callout-title">正解</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                        <MathText text={current.choices[current.correctIndex]} />
                      </div>
                    </div>
                    {paperResult === null && (
                      <div className="row-between" style={{ gap: 10 }}>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          style={{ flex: 1, borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}
                          onClick={() => handlePaperSelfGrade(false)}
                        >
                          <XCircle size={17} />
                          間違えた・曖昧
                        </button>
                        <button
                          type="button"
                          className="btn btn-teal"
                          style={{ flex: 1 }}
                          onClick={() => handlePaperSelfGrade(true)}
                        >
                          <CheckCircle2 size={17} />
                          自力で正解！
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Detailed Solution After Answering */}
            {isAnswered && (
              <div className="stack-sm">
                <div className={`callout ${isCorrect ? 'callout-teal' : 'callout-red'}`}>
                  <div className="callout-title">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 size={16} />
                        正解！ナイス計算！
                      </>
                    ) : (
                      <>
                        <XCircle size={16} />
                        惜しい！途中式を確認しよう
                      </>
                    )}
                  </div>
                  <MathText text={current.solution} />
                </div>

                <div className="row-between" style={{ gap: 8, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => onOpenTopic(current.topicId)}
                  >
                    <BookOpen size={15} />
                    この単元の解説を復習
                  </button>

                  <button
                    id="btn-next-drill"
                    type="button"
                    className="btn btn-primary"
                    style={{ flex: '1 1 160px' }}
                    onClick={handleNext}
                  >
                    {index + 1 >= queue.length ? '結果を見る' : '次の問題へ'}
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            )}

            {/* Reset button if stuck */}
            {!isAnswered && hintLevel > 0 && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ alignSelf: 'flex-end' }}
                onClick={() => setHintLevel(0)}
              >
                <RotateCcw size={13} />
                ヒントを隠す
              </button>
            )}
          </section>
        )
      )}
    </main>
  )
}
