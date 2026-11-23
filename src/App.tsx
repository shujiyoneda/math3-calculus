import { useState } from 'react'
import { BottomNav, type NavTab } from './components/BottomNav'
import { getTopicById } from './data/topics'
import { useProgress } from './hooks/useProgress'
import { DrillPage } from './pages/DrillPage'
import { FormulaSheetPage } from './pages/FormulaSheetPage'
import { HomePage } from './pages/HomePage'
import { ProgressPage } from './pages/ProgressPage'
import { TopicDetailPage } from './pages/TopicDetailPage'
import type { ChapterId } from './types/curriculum'

export function App() {
  const {
    progress,
    setTopicMastery,
    toggleBookmark,
    markTopicVisited,
    recordDrillResult,
    resetProgress,
  } = useProgress()

  const [activeTab, setActiveTab] = useState<NavTab>('learn')
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null)
  const [drillScope, setDrillScope] = useState<'all' | ChapterId | 'wrong' | 'infinite'>('all')
  const [drillResetNonce, setDrillResetNonce] = useState(0)

  const handleOpenTopic = (topicId: string) => {
    markTopicVisited(topicId)
    setActiveTopicId(topicId)
    setActiveTab('learn')
  }

  const handleSelectTab = (tab: NavTab) => {
    if (tab === 'learn' && activeTab === 'learn') {
      // Tapping learn again returns to curriculum list
      setActiveTopicId(null)
    } else if (tab !== 'learn') {
      setActiveTopicId(null)
    }
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenChapterDrill = (chapterId: ChapterId) => {
    setDrillScope(chapterId)
    setDrillResetNonce((n) => n + 1)
    setActiveTopicId(null)
    setActiveTab('drill')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activeTopic = activeTopicId ? getTopicById(activeTopicId) : undefined

  return (
    <div className="app-shell">
      {activeTab === 'learn' && activeTopic ? (
        <TopicDetailPage
          topic={activeTopic}
          mastery={progress.topicMastery[activeTopic.id] ?? 'unstarted'}
          isBookmarked={progress.bookmarks.includes(activeTopic.id)}
          onBack={() => setActiveTopicId(null)}
          onSelectTopic={handleOpenTopic}
          onSetMastery={(lvl) => setTopicMastery(activeTopic.id, lvl)}
          onToggleBookmark={() => toggleBookmark(activeTopic.id)}
          onOpenChapterDrill={handleOpenChapterDrill}
        />
      ) : activeTab === 'learn' ? (
        <HomePage
          progress={progress}
          onOpenTopic={handleOpenTopic}
          onStartQuickDrill={() => {
            setDrillScope('all')
            setDrillResetNonce((n) => n + 1)
            setActiveTab('drill')
          }}
        />
      ) : activeTab === 'drill' ? (
        <DrillPage
          key={`${drillScope}-${drillResetNonce}`}
          initialScope={drillScope}
          progress={progress}
          onRecordResult={recordDrillResult}
          onOpenTopic={handleOpenTopic}
        />
      ) : activeTab === 'formulas' ? (
        <FormulaSheetPage onOpenTopic={handleOpenTopic} />
      ) : (
        <ProgressPage
          progress={progress}
          onOpenTopic={handleOpenTopic}
          onOpenWrongDrill={() => {
            setDrillScope('wrong')
            setDrillResetNonce((n) => n + 1)
            setActiveTab('drill')
          }}
          onResetProgress={resetProgress}
        />
      )}

      <BottomNav
        activeTab={activeTab}
        onSelect={handleSelectTab}
        wrongCount={progress.wrongDrillIds.length}
      />
    </div>
  )
}

export default App
