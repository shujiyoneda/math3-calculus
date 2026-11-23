import type { ChapterId, TopicData } from '../../types/curriculum'
import { CH1_TOPICS } from './ch1'
import { CH2_TOPICS } from './ch2'
import { CH3_TOPICS } from './ch3'
import { CH4_TOPICS } from './ch4'
import { CH5_TOPICS } from './ch5'

export const ALL_TOPICS: TopicData[] = [
  ...CH1_TOPICS,
  ...CH2_TOPICS,
  ...CH3_TOPICS,
  ...CH4_TOPICS,
  ...CH5_TOPICS,
]

export function getTopicById(id: string): TopicData | undefined {
  return ALL_TOPICS.find((t) => t.id === id)
}

export function getTopicsByChapter(chapterId: ChapterId): TopicData[] {
  return ALL_TOPICS.filter((t) => t.chapterId === chapterId)
}
