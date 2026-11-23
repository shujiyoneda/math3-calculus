export type ChapterId = 'ch1' | 'ch2' | 'ch3' | 'ch4' | 'ch5'

export type SimulatorId =
  | 'sinx-over-x'
  | 'euler-e'
  | 'derivative-zoom'
  | 'mean-value'
  | 'curve-analysis'
  | 'substitution'
  | 'solid-revolution'
  | 'riemann-sum'

export type MasteryLevel = 'unstarted' | 'review' | 'almost' | 'mastered'

export interface ChapterMeta {
  id: ChapterId
  number: number
  title: string
  shortTitle: string
  subtitle: string
  accent: 'primary' | 'teal' | 'amber' | 'green'
}

export interface DerivationStep {
  label: string
  math?: string
  explanation: string
  why?: string
}

export interface DerivationBlock {
  title: string
  goalMath: string
  intro: string
  steps: DerivationStep[]
}

export interface WorkedExample {
  title: string
  problem: string
  thoughtProcess: string
  solutionSteps: string[]
  pitfall: string
}

export interface MiniCheckItem {
  question: string
  hint: string
  answer: string
  explanation: string
}

export interface TopicData {
  id: string
  chapterId: ChapterId
  order: number
  title: string
  subtitle: string
  estimatedMinutes: number
  examFrequency: '頻出' | '超頻出' | '標準'
  simulatorId?: SimulatorId
  intuition: {
    hook: string
    paragraphs: string[]
    keyImage: string
  }
  derivation: DerivationBlock
  workedExample: WorkedExample
  miniCheck: MiniCheckItem
  examSummary: string[]
}

export interface DrillQuestion {
  id: string
  chapterId: ChapterId
  topicId: string
  tag: string
  difficulty: '基礎' | '標準' | '定期テスト頻出'
  prompt: string
  choices: string[]
  correctIndex: number
  hint1: string
  hint2: string
  solution: string
  isGenerated?: boolean
}

export interface FormulaItem {
  id: string
  chapterId: ChapterId
  topicId: string
  category: string
  name: string
  lhs: string
  rhs: string
  originNote: string
  examTip?: string
}

export interface DrillStat {
  attempted: number
  correct: number
}

export interface ProgressState {
  topicMastery: Record<string, MasteryLevel>
  bookmarks: string[]
  lastTopicId: string | null
  drillStatsByChapter: Record<ChapterId, DrillStat>
  wrongDrillIds: string[]
  totalDrillsSolved: number
  bestStreak: number
}
