import type { TopicData } from '../../types/curriculum'

export const CH1_TOPICS: TopicData[] = [
  {
    id: 'ch1-1',
    chapterId: 'ch1',
    order: 1,
    title: '関数の極限と不定形の解消',
    subtitle: '0/0・∞/∞・∞−∞ を「式変形で正体を暴く」基本戦略',
    estimatedMinutes: 12,
    examFrequency: '超頻出',
    intuition: {
      hook: 'なぜ「そのまま代入」できない形（不定形）がテストに出るのか？',
      paragraphs: [
        '極限 $\\lim_{x \\to a} f(x)$ の基本は、まず $x = a$ を代入してみることです。ところが、$\\frac{0}{0}$ や $\\frac{\\infty}{\\infty}$ や $\\infty - \\infty$ になると、「分子と分母のどちらが速く $0$（または $\\infty$）に向かうか」の力比べになり、そのままでは値が決まりません。',
        'この「力比べの正体」を見えるようにする式変形こそが、**因数分解・有理化・最高次の項で割る**という操作です。',
      ],
      keyImage: '不定形＝「原因となる $0$ 因子や $\\infty$ の主役を約分・くくり出しで取り除くパズル」',
    },
    derivation: {
      title: '不定形3パターンを見抜いて解消する手順',
      goalMath: '\\lim_{x \\to \\infty} \\left(\\sqrt{x^2 + 4x} - x\\right) = 2',
      intro: '$\\infty - \\infty$ 型はそのままでは引き算できません。有理化で $\\frac{\\infty}{\\infty}$ 型へ変換する流れを確認しましょう。',
      steps: [
        {
          label: 'そのまま代入して型を判定する',
          math: 'x \\to \\infty \\implies \\sqrt{x^2+4x} \\to \\infty,\\quad x \\to \\infty',
          explanation: '$\\infty - \\infty$ の不定形になっていることを確認します。',
          why: '型を判定せずに変形すると、不要な有理化をして計算ミスを招きます。',
        },
        {
          label: '分子の有理化で引き算を分数に変える',
          math: '\\sqrt{x^2+4x} - x = \\frac{(\\sqrt{x^2+4x}-x)(\\sqrt{x^2+4x}+x)}{\\sqrt{x^2+4x}+x} = \\frac{4x}{\\sqrt{x^2+4x}+x}',
          explanation: '$(A-B)(A+B) = A^2 - B^2$ を使って根号と「マイナス」を消します。',
          why: 'これで $\\frac{\\infty}{\\infty}$ 型（分母分子の力比べ）に帰着しました。',
        },
        {
          label: '分母分子を最高次 $x$ ($x>0$) で割る',
          math: '= \\frac{4}{\\sqrt{1 + \\frac{4}{x}} + 1}',
          explanation: '$x > 0$ より $\\sqrt{x^2} = x$ なので、根号の中は $x^2$ で割ります。',
          why: '$x \\to -\\infty$ のときは $x < 0$ なので $\\sqrt{x^2} = -x$ となる超重要ポイントに注意！',
        },
        {
          label: '$x \\to \\infty$ で $\\frac{4}{x} \\to 0$ を適用する',
          math: '\\lim_{x \\to \\infty} \\frac{4}{\\sqrt{1 + \\frac{4}{x}} + 1} = \\frac{4}{\\sqrt{1+0}+1} = 2',
          explanation: '不定形が完全に解消され、極限値 $2$ が得られました。',
        },
      ],
    },
    workedExample: {
      title: '負の無限大 $x \\to -\\infty$ の落とし穴',
      problem: '次の極限を求めよ。 $$\\lim_{x \\to -\\infty} \\frac{\\sqrt{4x^2 + x}}{x - 1}$$',
      thoughtProcess: '$x \\to -\\infty$ では $x < 0$ なので、根号の外に $x$ を出すと符号が反転します。ミスを防ぐ最強の技は **$x = -t$ ($t \\to +\\infty$) と置換すること**です。',
      solutionSteps: [
        '$x = -t$ とおくと、$x \\to -\\infty$ のとき $t \\to +\\infty$ となる。',
        '与式 $= \\lim_{t \\to \\infty} \\frac{\\sqrt{4t^2 - t}}{-t - 1}$',
        '$t > 0$ より分母分子を $t$ で割ると $\\lim_{t \\to \\infty} \\frac{\\sqrt{4 - \\frac{1}{t}}}{-1 - \\frac{1}{t}}$',
        '$\\frac{1}{t} \\to 0$ より、$\\frac{\\sqrt{4}}{-1} = -2$',
      ],
      pitfall: '$x < 0$ のまま $\\sqrt{4x^2 + x} = x\\sqrt{4 + 1/x}$ と誤変換して $+2$ と答えるミスが定期テストで最も多発します。迷ったら必ず $x = -t$ と置き換えましょう！',
    },
    miniCheck: {
      question: '$\\lim_{x \\to 2} \\frac{\\sqrt{x+2} - 2}{x - 2}$ を求めよ。',
      hint: '$x=2$ を代入すると $\\frac{0}{0}$ の不定形です。分子を有理化すると $(x-2)$ が約分できます。',
      answer: '$\\dfrac{1}{4}$',
      explanation: '分子を有理化すると $\\frac{(x+2)-4}{(x-2)(\\sqrt{x+2}+2)} = \\frac{1}{\\sqrt{x+2}+2}$。$x \\to 2$ で $\\frac{1}{2+2} = \\frac{1}{4}$。',
    },
    examSummary: [
      '$\\frac{0}{0}$ は因数分解・有理化で「$0$ になる因子」を約分する。',
      '$\\frac{\\infty}{\\infty}$ は分母の最高次で割る。$x \\to -\\infty$ で根号があれば即 $x = -t$ と置換！',
      '片側極限（$x \\to a+0$ と $x \\to a-0$）が一致して初めて極限が存在する。',
    ],
  },
  {
    id: 'ch1-2',
    chapterId: 'ch1',
    order: 2,
    title: '三角関数の極限',
    subtitle: 'sin x / x → 1 を単位円の面積比較から納得し、自在に使いこなす',
    estimatedMinutes: 15,
    examFrequency: '超頻出',
    simulatorId: 'sinx-over-x',
    intuition: {
      hook: 'なぜ「角度がラジアン（弧度法）」のときに限り $\\frac{\\sin x}{x} \\to 1$ になるのか？',
      paragraphs: [
        '数IIIの微積分で度数法（$30^\\circ$ など）を使わず**弧度法（ラジアン）**を使う最大の理由がここにあります。半径 $1$ の円では、中心角 $x$ ラジアンはそのまま「円弧の長さ」を意味します。',
        '角度 $x$ をうんと小さくすると、円弧の曲がり具合はほぼまっすぐな縦線になり、高さ $\\sin x$ と弧の長さ $x$ がほとんど区別できなくなります。下のシミュレーターで $x$ を $0$ に近づけて確かめてみましょう。',
      ],
      keyImage: '微小な角度では「高さ $\\sin x \\approx$ 弧の長さ $x \\approx$ 接線 $\\tan x$」が3つとも重なる',
    },
    derivation: {
      title: 'はさみうちの原理による $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ の証明',
      goalMath: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1',
      intro: 'まずは $0 < x < \\frac{\\pi}{2}$ の範囲で、内側の三角形・扇形・外側の三角形の面積を比べます。',
      steps: [
        {
          label: '3つの図形の面積を不等式で比べる',
          math: '\\frac{1}{2}\\sin x < \\frac{1}{2}x < \\frac{1}{2}\\tan x',
          explanation: '半径 $1$ の単位円上で、$\\triangle OAP < \\text{扇形} OAP < \\triangle OAT$ が幾何学的に成り立ちます。',
          why: '弧度法だからこそ扇形の面積が $\\frac{1}{2} r^2 x = \\frac{1}{2}x$ とシンプルに表せます。',
        },
        {
          label: '全体を $\\frac{1}{2}\\sin x$ ($>0$) で割る',
          math: '1 < \\frac{x}{\\sin x} < \\frac{1}{\\cos x}',
          explanation: '$\\tan x = \\frac{\\sin x}{\\cos x}$ を用いて整理します。',
          why: '目標の形 $\\frac{\\sin x}{x}$ の逆数を作り出すための変形です。',
        },
        {
          label: '逆数をとって不等号の向きを反転させる',
          math: '\\cos x < \\frac{\\sin x}{x} < 1',
          explanation: 'すべての辺が正なので、逆数をとると大小関係が逆転します。',
        },
        {
          label: 'はさみうちの原理を適用（負の側も偶関数で同様）',
          math: '\\lim_{x \\to +0} \\cos x = 1 \\implies \\lim_{x \\to +0} \\frac{\\sin x}{x} = 1',
          explanation: '$x < 0$ のときは $x = -t$ とおけば $\\frac{\\sin(-t)}{-t} = \\frac{\\sin t}{t} \\to 1$ となり、両側から $1$ に収束します。',
        },
      ],
    },
    workedExample: {
      title: '定期テスト超頻出：$1 - \\cos x$ を含む極限',
      problem: '次の極限を求めよ。 $$\\lim_{x \\to 0} \\frac{1 - \\cos 2x}{x^2}$$',
      thoughtProcess: '$1 - \\cos\\theta$ を見たら「分子分母に $1 + \\cos\\theta$ を掛ける」か「半角の公式 $1 - \\cos 2x = 2\\sin^2 x$」を使って、$\\frac{\\sin(\\text{塊})}{\\text{同じ塊}}$ の形を作ります。',
      solutionSteps: [
        '半角（2倍角）の公式 $1 - \\cos 2x = 2\\sin^2 x$ を使う。',
        '与式 $= \\lim_{x \\to 0} \\frac{2\\sin^2 x}{x^2} = \\lim_{x \\to 0} 2 \\left(\\frac{\\sin x}{x}\\right)^2$',
        '$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ より、$2 \\times 1^2 = 2$',
      ],
      pitfall: '$\\lim_{x \\to 0} \\frac{\\sin 3x}{x} = 1$ と勘違いするミスに注意！必ず「分母を角の中身 $3x$ に揃える」ため $\\frac{\\sin 3x}{3x} \\times 3 = 3$ と調整しましょう。',
    },
    miniCheck: {
      question: '$\\lim_{x \\to 0} \\frac{\\tan 5x}{2x}$ の値を求めよ。',
      hint: '$\\tan 5x = \\frac{\\sin 5x}{\\cos 5x}$ に直し、$\\frac{\\sin 5x}{5x}$ の形を作りましょう。',
      answer: '$\\dfrac{5}{2}$',
      explanation: '$\\frac{\\sin 5x}{5x} \\cdot \\frac{5}{2} \\cdot \\frac{1}{\\cos 5x} \\to 1 \\cdot \\frac{5}{2} \\cdot 1 = \\frac{5}{2}$。',
    },
    examSummary: [
      '$\\lim_{\\square \\to 0} \\frac{\\sin \\square}{\\square} = 1$（$\\square$ の中身を完全に揃えるのが鉄則）。',
      '$\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}$ は導出込みで覚えておくと検算が爆速になる。',
      '$x \\to \\frac{\\pi}{2}$ や $x \\to \\pi$ など $0$ 以外へ近づくときは、$t = x - a$ と置いて $t \\to 0$ に持ち込む。',
    ],
  },
  {
    id: 'ch1-3',
    chapterId: 'ch1',
    order: 3,
    title: '自然対数の底 e の本質',
    subtitle: 'なぜ 2.71828... という不思議な数が微積分の主役なのか',
    estimatedMinutes: 15,
    examFrequency: '超頻出',
    simulatorId: 'euler-e',
    intuition: {
      hook: '「年利100%を毎日・毎秒・無限回複利で増やすと、お金は無限大になる？」',
      paragraphs: [
        '1万円を年利100%で預けると1年後には $(1 + 1)^1 = 2$ 万円。半年ごとに50%ずつ2回複利にすると $(1 + \\frac{1}{2})^2 = 2.25$ 万円。毎月なら $(1 + \\frac{1}{12})^{12} \\approx 2.613$ 万円です。',
        'では、分割数 $n$ を無限に細かくするとどうなるか？実は無限には増えず、**$2.718281828\\dots$** という一定の値にピタッと収束します。これが**自然対数の底 $e$** の定義です。さらに、底を $e$ に選ぶと「$y = e^x$ の $x=0$ での接線の傾きがちょうど $1$」という奇跡が起きます。',
      ],
      keyImage: '$e = \\lim_{n\\to\\infty}(1+\\frac{1}{n})^n \\approx 2.718$ ＝「連続成長の上限」かつ「微分しても形が変わらない唯一の底」',
    },
    derivation: {
      title: 'e の定義から重要極限2公式を導く',
      goalMath: '\\lim_{x \\to 0} \\frac{\\log(1+x)}{x} = 1,\\qquad \\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1',
      intro: '定期テストで頻出の対数・指数の極限公式は、すべて $e$ の定義 $\\lim_{t \\to 0}(1+t)^{\\frac{1}{t}} = e$ から2行で導けます。',
      steps: [
        {
          label: '対数の性質で係数を指数へ上げる',
          math: '\\frac{\\log(1+x)}{x} = \\frac{1}{x}\\log(1+x) = \\log\\left((1+x)^{\\frac{1}{x}}\\right)',
          explanation: '$a \\log M = \\log M^a$ を使って $\\frac{1}{x}$ を肩に乗せます。',
          why: '$e$ の定義の形 $(1 + \\square)^{\\frac{1}{\\square}}$ を出現させるためです。',
        },
        {
          label: '$x \\to 0$ の極限をとる',
          math: '\\lim_{x \\to 0} \\log\\left((1+x)^{\\frac{1}{x}}\\right) = \\log e = 1',
          explanation: '底が $e$ の自然対数なので $\\log e = 1$ です。これで第1公式が完成！',
        },
        {
          label: '指数公式は $e^x - 1 = t$ と置換する',
          math: 'e^x = 1 + t \\implies x = \\log(1+t)\\quad (x \\to 0 \\text{ で } t \\to 0)',
          explanation: '指数の式を対数の式にひっくり返します。',
        },
        {
          label: '第1公式の逆数に持ち込む',
          math: '\\lim_{x \\to 0} \\frac{e^x - 1}{x} = \\lim_{t \\to 0} \\frac{t}{\\log(1+t)} = \\frac{1}{1} = 1',
          explanation: '2つの公式は表裏一体！どちらも丸暗記せず一瞬で再生できます。',
        },
      ],
    },
    workedExample: {
      title: '$e$ の定義の形に無理やり揃える計算',
      problem: '次の極限を求めよ。 $$\\lim_{x \\to \\infty} \\left(1 + \\frac{3}{x}\\right)^{2x}$$',
      thoughtProcess: 'カッコの中が $1 + \\frac{3}{x}$ なので、指数をその**逆数 $\\frac{x}{3}$** に揃えて、帳尻合わせのべき乗を外側に出します。',
      solutionSteps: [
        '指数 $2x$ を $\\frac{x}{3} \\times 6$ に分解する。',
        '$\\left(1 + \\frac{3}{x}\\right)^{2x} = \\left\\{\\left(1 + \\frac{3}{x}\\right)^{\\frac{x}{3}}\\right\\}^6$',
        '$t = \\frac{x}{3}$ とおくと $x \\to \\infty$ で $t \\to \\infty$ より、中カッコは $\\lim_{t\\to\\infty}(1+\\frac{1}{t})^t = e$ に収束する。',
        'よって極限値は $e^6$。',
      ],
      pitfall: 'マイナス符号の $\\lim_{x\\to\\infty}(1 - \\frac{2}{x})^x$ では、逆数は $-\\frac{x}{2}$ になります。符号を忘れて $e^2$ としてしまうミスが多いので、必ず $(1 + \\square)^{\\frac{1}{\\square}}$ で確認！',
    },
    miniCheck: {
      question: '$\\lim_{x \\to 0} \\frac{e^{3x} - 1}{x}$ の値を求めよ。',
      hint: '分母を $3x$ に揃えて、$\\lim_{t \\to 0} \\frac{e^t - 1}{t} = 1$ を使いましょう。',
      answer: '$3$',
      explanation: '$\\frac{e^{3x}-1}{3x} \\cdot 3 \\to 1 \\cdot 3 = 3$。',
    },
    examSummary: [
      '$e = \\lim_{x\\to\\infty}(1+\\frac{1}{x})^x = \\lim_{t\\to 0}(1+t)^{\\frac{1}{t}}$ の「逆数ペア」を揃える。',
      '$\\lim_{x\\to 0}\\frac{\\log(1+x)}{x}=1$ と $\\lim_{x\\to 0}\\frac{e^x-1}{x}=1$ は第2章の微分公式の直接の土台。',
      '指数と対数の極限で迷ったら、$t = \\text{塊}$ と置換するとミスが激減する。',
    ],
  },
  {
    id: 'ch1-4',
    chapterId: 'ch1',
    order: 4,
    title: '関数の連続性と中間値の定理',
    subtitle: 'グラフが「一筆書きでつながっている」ことの厳密な定義と威力',
    estimatedMinutes: 12,
    examFrequency: '標準',
    intuition: {
      hook: '富士山を麓（標高0m）から頂上（3776m）まで歩けば、必ず標高2000m地点を通る！',
      paragraphs: [
        '当たり前に聞こえるこの事実こそが**中間値の定理**の本質です。ただし、もし途中でワープ（グラフが途切れる＝不連続）できたら2000m地点を飛び越えてしまいます。',
        'つまり「ワープせずに一筆書きでつながっている」という性質を数学の言葉で厳密に書いたのが**連続性**であり、これを使うと「複雑な方程式にも実数解が必ず存在する」ことが鮮やかに証明できます。',
      ],
      keyImage: '連続＝「左右からの極限値」と「その点の値 $f(a)$」がピタリと一致して穴も段差もない状態',
    },
    derivation: {
      title: '連続の定義3条件と中間値の定理の論理',
      goalMath: '\\lim_{x \\to a} f(x) = f(a)',
      intro: '関数 $f(x)$ が $x = a$ で連続であるためには、実は次の3つのチェックがすべて通る必要があります。',
      steps: [
        {
          label: '① 値 $f(a)$ が定義されている',
          math: 'f(a) \\text{ が存在する}',
          explanation: 'その点に「穴」が空いていないことを確認します（例：$y=\\frac{1}{x}$ は $x=0$ で値なし）。',
        },
        {
          label: '② 極限値 $\\lim_{x \\to a} f(x)$ が存在する',
          math: '\\lim_{x \\to a+0} f(x) = \\lim_{x \\to a-0} f(x)',
          explanation: '右から近づいた高さと、左から近づいた高さが一致し、「段差（ジャンプ）」がないこと。',
          why: 'ガウス記号 $[x]$ は整数点で左極限と右極限が食い違うため不連続になります。',
        },
        {
          label: '③ 極限値と関数の値が一致する',
          math: '\\lim_{x \\to a} f(x) = f(a)',
          explanation: '近づいていった目標地点に、ちゃんと実際の点 $f(a)$ が置かれていることで「連続」が完成します。',
        },
        {
          label: '中間値の定理（解の存在証明の切り札）',
          math: 'f(a)\\cdot f(b) < 0 \\implies f(c) = 0 \\text{ となる } c \\in (a, b) \\text{ が少なくとも1つ存在}',
          explanation: '閉区間 $[a, b]$ で連続かつ両端の符号が異なれば、グラフは必ず $x$ 軸を横切ります。',
        },
      ],
    },
    workedExample: {
      title: '方程式が実数解をもつことの証明',
      problem: '方程式 $e^x - 3x = 0$ は、区間 $(0, 1)$ に少なくとも1つの実数解をもつことを示せ。',
      thoughtProcess: '解の公式では絶対に解けない方程式です。$f(x) = e^x - 3x$ とおき、①連続である、②$f(0)$ と $f(1)$ が異符号、の2点を示して中間値の定理を使います。',
      solutionSteps: [
        '$f(x) = e^x - 3x$ とおくと、$f(x)$ は閉区間 $[0, 1]$ で連続である。',
        '$f(0) = e^0 - 0 = 1 > 0$',
        '$f(1) = e - 3$。ここで $e \\approx 2.718 < 3$ なので $f(1) < 0$。',
        'したがって $f(0) > 0$ かつ $f(1) < 0$ なので、中間値の定理により $f(c) = 0$ すなわち $e^c - 3c = 0$ となる実数 $c$ が $0 < c < 1$ に少なくとも1つ存在する。',
      ],
      pitfall: '記述問題で「**閉区間 $[0, 1]$ で連続であるから**」の一言を書き落とすと減点されます！また $e \\approx 2.718$（$2.7 < e < 2.8$）の近似値は常識として使えるようにしておきましょう。',
    },
    miniCheck: {
      question: '$f(x) = \\begin{cases} \\frac{\\sin 2x}{x} & (x \\neq 0) \\\\ k & (x = 0) \\end{cases}$ が $x = 0$ で連続になる定数 $k$ を求めよ。',
      hint: '$x=0$ で連続 $\\iff \\lim_{x\\to 0} f(x) = f(0) = k$ を計算します。',
      answer: '$k = 2$',
      explanation: '$\\lim_{x\\to 0} \\frac{\\sin 2x}{x} = \\lim_{x\\to 0} 2\\cdot\\frac{\\sin 2x}{2x} = 2$。よって $k = 2$。',
    },
    examSummary: [
      '連続のチェックは「左右の極限が一致」かつ「それが $f(a)$ と等しい」。',
      '中間値の定理の記述テンプレ：「閉区間 $[a,b]$ で連続」＋「$f(a)f(b)<0$」→「$(a,b)$ に解が存在」。',
      '「ただ1つの解」を示すときは、さらに微分して単調増加（減少）を付け加える（第3章で活用）。',
    ],
  },
]
