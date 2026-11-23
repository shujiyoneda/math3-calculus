import { useCallback, useEffect, useState } from 'react'
import type { ChapterId, MasteryLevel, ProgressState } from '../types/curriculum'

const STORAGE_KEY = 'math3-calculus-progress-v1'

const DEFAULT_STATE: ProgressState = {
  topicMastery: {},
  bookmarks: [],
  lastTopicId: null,
  drillStatsByChapter: {
    ch1: { attempted: 0, correct: 0 },
    ch2: { attempted: 0, correct: 0 },
    ch3: { attempted: 0, correct: 0 },
    ch4: { attempted: 0, correct: 0 },
    ch5: { attempted: 0, correct: 0 },
  },
  wrongDrillIds: [],
  totalDrillsSolved: 0,
  bestStreak: 0,
}

function loadState(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    return {
      ...DEFAULT_STATE,
      ...parsed,
      drillStatsByChapter: {
        ...DEFAULT_STATE.drillStatsByChapter,
        ...(parsed.drillStatsByChapter ?? {}),
      },
    }
  } catch {
    return DEFAULT_STATE
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => loadState())

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // Ignore storage quota / private mode errors
    }
  }, [progress])

  const setTopicMastery = useCallback((topicId: string, level: MasteryLevel) => {
    setProgress((prev) => ({
      ...prev,
      topicMastery: {
        ...prev.topicMastery,
        [topicId]: level,
      },
    }))
  }, [])

  const toggleBookmark = useCallback((topicId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarks.includes(topicId)
      return {
        ...prev,
        bookmarks: exists
          ? prev.bookmarks.filter((id) => id !== topicId)
          : [...prev.bookmarks, topicId],
      }
    })
  }, [])

  const markTopicVisited = useCallback((topicId: string) => {
    setProgress((prev) => ({
      ...prev,
      lastTopicId: topicId,
    }))
  }, [])

  const recordDrillResult = useCallback(
    (
      questionId: string,
      chapterId: ChapterId,
      isCorrect: boolean,
      currentStreak: number,
      trackWrong = true
    ) => {
      setProgress((prev) => {
        const chapterStat = prev.drillStatsByChapter[chapterId] ?? { attempted: 0, correct: 0 }
        let nextWrong = prev.wrongDrillIds
        if (trackWrong) {
          if (isCorrect) {
            nextWrong = prev.wrongDrillIds.filter((id) => id !== questionId)
          } else if (!prev.wrongDrillIds.includes(questionId)) {
            nextWrong = [...prev.wrongDrillIds, questionId]
          }
        }
        return {
          ...prev,
          drillStatsByChapter: {
            ...prev.drillStatsByChapter,
            [chapterId]: {
              attempted: chapterStat.attempted + 1,
              correct: chapterStat.correct + (isCorrect ? 1 : 0),
            },
          },
          wrongDrillIds: nextWrong,
          totalDrillsSolved: prev.totalDrillsSolved + 1,
          bestStreak: Math.max(prev.bestStreak, currentStreak),
        }
      })
    },
    []
  )

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_STATE)
  }, [])

  return {
    progress,
    setTopicMastery,
    toggleBookmark,
    markTopicVisited,
    recordDrillResult,
    resetProgress,
  }
}
