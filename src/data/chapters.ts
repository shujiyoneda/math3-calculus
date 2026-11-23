import type { ChapterMeta } from '../types/curriculum'

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'ch1',
    number: 1,
    title: '関数の極限と連続性',
    shortTitle: '第1章 極限',
    subtitle: '微積分の土台となる極限・三角極限・自然対数の底 e を視覚的に固める',
    accent: 'primary',
  },
  {
    id: 'ch2',
    number: 2,
    title: '微分法',
    shortTitle: '第2章 微分法',
    subtitle: '丸暗記を卒業！合成・逆・三角・指数・対数の微分を本質から導出する',
    accent: 'teal',
  },
  {
    id: 'ch3',
    number: 3,
    title: '微分法の応用',
    shortTitle: '第3章 微分応用',
    subtitle: '平均値の定理・増減と凹凸・漸近線から、複雑なグラフと不等式を自在に操る',
    accent: 'amber',
  },
  {
    id: 'ch4',
    number: 4,
    title: '積分法',
    shortTitle: '第4章 積分法',
    subtitle: '置換積分・部分積分・定番パターンの「見抜き方」と計算スピードを徹底強化',
    accent: 'primary',
  },
  {
    id: 'ch5',
    number: 5,
    title: '積分法の応用',
    shortTitle: '第5章 積分応用',
    subtitle: '面積・回転体の体積・曲線の長さ・区分求積法を「微小要素の足し算」で統一理解',
    accent: 'green',
  },
]
