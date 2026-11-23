import type { TopicData } from '../../types/curriculum'

export const CH4_TOPICS: TopicData[] = [
  {
    id: 'ch4-1',
    chapterId: 'ch4',
    order: 13,
    title: '不定積分の基本と「微分の逆算」',
    subtitle: '公式暗記ではなく「何を微分したらこれになるか？」で瞬殺する発想',
    estimatedMinutes: 14,
    examFrequency: '超頻出',
    intuition: {
      hook: '積分計算が速い人は、置換する前にまず「微分の逆再生」を探している！',
      paragraphs: [
        '不定積分は「微分して $f(x)$ になる関数（原始関数）を探すゲーム」です。特に数IIIでは $\\int \\frac{1}{x}\\,dx = \\log|x| + C$（絶対値忘れに注意！）や $\\int \\frac{1}{\\cos^2 x}\\,dx = \\tan x + C$ など、第2章の微分公式をすべて逆向きに読みます。',
        'さらに最強のショートカットが**合成関数型 $\\int f(g(x))g\'(x)\\,dx$** です。式の中に「あるパーツとその微分」がセットで隠れていたら、わざわざ置換せず一瞬で積分できます！',
      ],
      keyImage: '積分計算の第1手＝「まず微分の逆算（特に $\\frac{f\'(x)}{f(x)}$ 型や $f(g(x))g\'(x)$ 型）が隠れていないか探す！」',
    },
    derivation: {
      title: '超頻出2大ショートカット「分子が分母の微分」「1次式の中身」',
      goalMath: "\\int \\frac{f'(x)}{f(x)}\\,dx = \\log|f(x)| + C,\\qquad \\int f(ax+b)\\,dx = \\frac{1}{a}F(ax+b) + C",
      intro: '「微分して元に戻るか検算する」だけで、なぜこの2公式が正しいのか一発で納得できます。',
      steps: [
        {
          label: '$\\log|f(x)|$ を合成関数の微分で微分してみる',
          math: "\\left(\\log|f(x)|\\right)' = \\frac{1}{f(x)} \\cdot f'(x) = \\frac{f'(x)}{f(x)}",
          explanation: 'まさに「分母の微分が分子に乗っている」形が現れました！',
          why: '代表例：$\\int \\tan x\\,dx = \\int \\frac{\\sin x}{\\cos x}\\,dx = -\\int \\frac{(\\cos x)\'}{\\cos x}\\,dx = -\\log|\\cos x| + C$。丸暗記不要！',
        },
        {
          label: '1次式 $(ax+b)$ が中にあるときの「$\\frac{1}{a}$ 補正」',
          math: "\\left(\\frac{1}{a}F(ax+b)\\right)' = \\frac{1}{a} \\cdot f(ax+b) \\cdot a = f(ax+b)",
          explanation: '微分すると係数 $a$ が前に飛び出すので、積分ではあらかじめ $\\frac{1}{a}$ を掛けて打ち消します。',
          why: '例：$\\int \\cos(3x+1)\\,dx = \\frac{1}{3}\\sin(3x+1) + C$、$\\int e^{-2x}\\,dx = -\\frac{1}{2}e^{-2x} + C$。',
        },
        {
          label: 'べき関数 $x^\\alpha$ の積分（$\\alpha = -1$ だけ別世界！）',
          math: "\\int x^\\alpha\\,dx = \\begin{cases} \\dfrac{1}{\\alpha+1}x^{\\alpha+1} + C & (\\alpha \\neq -1) \\\\ \\log|x| + C & (\\alpha = -1) \\end{cases}",
          explanation: '$\\alpha = -1$ のとき分母 $\\alpha+1$ が $0$ になる代わりに $\\log|x|$ が穴を埋めてくれます。',
        },
      ],
    },
    workedExample: {
      title: '微分の逆算で3秒で解く分数・三角積分',
      problem: '次の不定積分を求めよ。 $$\\int \\frac{x}{x^2 + 3}\\,dx$$',
      thoughtProcess: '分母 $x^2 + 3$ を微分すると $2x$。分子は $x$ なので、係数 $\\frac{1}{2}$ を調整すれば完全に $\\frac{f\'(x)}{f(x)}$ 型です！',
      solutionSteps: [
        '分母の微分 $(x^2 + 3)\' = 2x$ に注目する。',
        '与式 $= \\frac{1}{2} \\int \\frac{(x^2 + 3)\'}{x^2 + 3}\\,dx$',
        '$= \\frac{1}{2}\\log|x^2 + 3| + C$',
        '$x^2 + 3 > 0$ より絶対値は外せて、$\\frac{1}{2}\\log(x^2 + 3) + C$（$C$ は積分定数）。',
      ],
      pitfall: '不定積分では**「$+ C$（積分定数）」の書き忘れ**と、$\\int \\frac{1}{x}\\,dx = \\log|x| + C$ の**絶対値忘れ**が減点の定番です。また答えが出たら頭の中で1回微分して元の式に戻るか検算すればミスはゼロになります！',
    },
    miniCheck: {
      question: '$\\int \\sin^2 x \\cos x\\,dx$ を求めよ。',
      hint: '$(\\sin x)\' = \\cos x$ なので、$\\sin x$ をひとつの塊 $u$ と見れば $\\int u^2 u\'\\,dx$ です！',
      answer: '$\\dfrac{1}{3}\\sin^3 x + C$',
      explanation: '$\\left(\\frac{1}{3}\\sin^3 x\\right)\' = \\sin^2 x \\cdot \\cos x$ となるので一瞬で求まります。',
    },
    examSummary: [
      '積分を見たら最初に「$\\frac{f\'(x)}{f(x)}$ 型」と「$f(g(x))g\'(x)$ 型」がないかチェックする。',
      '中身が1次式 $(ax+b)$ なら、そのまま積分して $\\frac{1}{a}$ を掛けるだけ（いちいち置換しない）。',
      '不定積分は必ず「微分して元に戻るか」を3秒検算する習慣をつける。',
    ],
  },
  {
    id: 'ch4-2',
    chapterId: 'ch4',
    order: 14,
    title: '置換積分法',
    subtitle: '変数を乗り換えて面積をそのまま計算！定番置換パターンの完全整理',
    estimatedMinutes: 17,
    examFrequency: '超頻出',
    simulatorId: 'substitution',
    intuition: {
      hook: 'なぜ $dx$ を勝手に $dt$ に変えてはいけないのか？「横軸の伸び縮み」の補正！',
      paragraphs: [
        '置換積分は、複雑なグラフを別の変数 $t$ の世界に引っ越させてシンプルな形に直す技です。ただし $t = g(x)$ で変数を変えると、横軸の幅 $dx$ が伸び縮みして $dt = g\'(x)\\,dx$ に変わります。',
        'この $g\'(x)$ がちょうど「横の伸縮による面積のズレ」を補正してくれるため、引っ越し前と後で面積は完全に一致します。下のシミュレーターで $b$ を動かして確認してみましょう！',
      ],
      keyImage: '置換の3点セット：①式の変換、② $dx$ の変換（$dt = g\'(x)dx$）、③（定積分なら）積分区間の変更！',
    },
    derivation: {
      title: '定積分の超定番置換2大パターン（円の面積と $\\tan\\theta$）',
      goalMath: '\\int_0^a \\sqrt{a^2 - x^2}\\,dx = \\frac{\\pi a^2}{4},\\qquad \\int_0^a \\frac{1}{a^2 + x^2}\\,dx = \\frac{\\pi}{4a}',
      intro: '定期テストで100%出題される「$\\sqrt{a^2 - x^2}$ は $x=a\\sin\\theta$」「$\\frac{1}{a^2 + x^2}$ は $x=a\\tan\\theta$」の仕組みをステップで追いかけましょう。',
      steps: [
        {
          label: 'パターン①：$\\sqrt{a^2 - x^2}$ を見たら $x = a\\sin\\theta$（$-\\frac{\\pi}{2} \\le \\theta \\le \\frac{\\pi}{2}$）',
          math: 'dx = a\\cos\\theta\\,d\\theta,\\qquad \\sqrt{a^2 - x^2} = a\\cos\\theta \\quad (\\cos\\theta \\ge 0)',
          explanation: '$1 - \\sin^2\\theta = \\cos^2\\theta$ を使って鬱陶しいルートを外すのが狙いです。',
          why: '区間を $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$ に限定するのは $\\cos\\theta \\ge 0$ にして絶対値を外すため！',
        },
        {
          label: '半角の公式で次数を下げて積分する',
          math: '\\int_0^{\\frac{\\pi}{2}} a^2 \\cos^2\\theta\\,d\\theta = a^2 \\int_0^{\\frac{\\pi}{2}} \\frac{1 + \\cos 2\\theta}{2}\\,d\\theta = \\frac{\\pi a^2}{4}',
          explanation: '幾何学的には半径 $a$ の四分円の面積 $\\frac{1}{4}\\pi a^2$ と見事に一致します！',
        },
        {
          label: 'パターン②：$\\frac{1}{a^2 + x^2}$ を見たら $x = a\\tan\\theta$（$-\\frac{\\pi}{2} < \\theta < \\frac{\\pi}{2}$）',
          math: 'dx = \\frac{a}{\\cos^2\\theta}\\,d\\theta,\\qquad a^2 + x^2 = a^2(1 + \\tan^2\\theta) = \\frac{a^2}{\\cos^2\\theta}',
          explanation: '分母にも $dx$ にも $\\frac{1}{\\cos^2\\theta}$ が現れて、なんと丸ごと約分されて消えます！',
          why: 'これが $x = a\\tan\\theta$ と置く唯一にして最大の理由です。',
        },
        {
          label: '定数の積分になって一発で終了！',
          math: '\\int_0^{\\frac{\\pi}{4}} \\frac{\\cos^2\\theta}{a^2} \\cdot \\frac{a}{\\cos^2\\theta}\\,d\\theta = \\int_0^{\\frac{\\pi}{4}} \\frac{1}{a}\\,d\\theta = \\frac{\\pi}{4a}',
          explanation: '見た目は厳つい分数関数が、たった定数 $\\frac{1}{a}$ の積分に変身しました。',
        },
      ],
    },
    workedExample: {
      title: 'ルート丸ごと置換する定番計算',
      problem: '次の定積分を求めよ。 $$\\int_0^3 x\\sqrt{x + 1}\\,dx$$',
      thoughtProcess: 'ルートの中身 $x+1$ を $t$ と置いてもよいですが、**$t = \\sqrt{x+1}$ とルート丸ごと置換**すると分数指数が出ずに多項式だけで計算できて圧倒的に楽です！',
      solutionSteps: [
        '$t = \\sqrt{x + 1}$ とおくと、$t^2 = x + 1 \\implies x = t^2 - 1$、両辺微分して $dx = 2t\\,dt$。',
        '積分区間の対応：$x: 0 \\to 3$ のとき $t: 1 \\to 2$。',
        '与式 $= \\int_1^2 (t^2 - 1) \\cdot t \\cdot 2t\\,dt = 2\\int_1^2 (t^4 - t^2)\\,dt$',
        '$= 2\\left[\\frac{t^5}{5} - \\frac{t^3}{3}\\right]_1^2 = 2\\left(\\frac{31}{5} - \\frac{7}{3}\\right) = 2 \\cdot \\frac{58}{15} = \\frac{116}{15}$。',
      ],
      pitfall: '定積分の置換で**「積分区間を $t$ の範囲に変え忘れる」**、または不定積分の置換で**「最後に $t$ を元の $x$ の式に戻し忘れる」**ミスが超頻発します。置換したら必ず「$dx$ と区間」を真っ先に書き出しましょう！',
    },
    miniCheck: {
      question: '定積分 $\\int_0^1 \\frac{1}{1 + x^2}\\,dx$ の値を求めよ。',
      hint: '$x = \\tan\\theta$ とおくと $x: 0 \\to 1$ で $\\theta: 0 \\to \\frac{\\pi}{4}$、$dx = \\frac{1}{\\cos^2\\theta}\\,d\\theta$ です。',
      answer: '$\\dfrac{\\pi}{4}$',
      explanation: '$\\int_0^{\\frac{\\pi}{4}} \\frac{1}{1+\\tan^2\\theta}\\cdot\\frac{1}{\\cos^2\\theta}\\,d\\theta = \\int_0^{\\frac{\\pi}{4}} 1\\,d\\theta = \\frac{\\pi}{4}$。',
    },
    examSummary: [
      '置換の鉄則：$\\sqrt{a^2-x^2} \\to x=a\\sin\\theta$、$\\frac{1}{a^2+x^2} \\to x=a\\tan\\theta$、$\\sqrt{ax+b} \\to t$ と丸ごと置換。',
      '定積分では「元の $x$ に戻さず、新しい $t$ の積分区間でそのまま計算しきってしまう」のが速くて正確。',
      '置換後は必ず「①被積分関数、②$dx \\to dt$、③積分区間」の3点が全部 $t$ に切り替わったか指差し確認！',
    ],
  },
  {
    id: 'ch4-3',
    chapterId: 'ch4',
    order: 15,
    title: '部分積分法',
    subtitle: '積の微分の逆再生！「どっちを微分・どっちを積分するか」の迷いをゼロにする',
    estimatedMinutes: 16,
    examFrequency: '超頻出',
    intuition: {
      hook: '$\\int x e^x\\,dx$ や $\\int \\log x\\,dx$ みたいに「異なる種類の関数の掛け算」はどう積分する？',
      paragraphs: [
        '置換積分が「合成関数の微分の逆」なら、**部分積分は「積の微分の逆」**です。掛け算の一方を積分し、もう一方を微分することで、「積分の中身を簡単な形にすり替える」技です。',
        '迷いやすい「どっちを微分側に回すか？」には明確な優先ルールがあります。**ログ（対数）→ 多項式 → 三角 → 指数（ロ・タ・サ・シ）**の順に「微分する側」に選ぶと、ほぼ確実に式が簡単になります！',
      ],
      keyImage: '微分側に回す優先順位：**「対数 ($\\log$) ＞ 多項式 ($x^n$) ＞ 三角・指数」**（$\\log$ は微分すると $1/x$ になって消える！）',
    },
    derivation: {
      title: '積の微分から部分積分公式を導き、$\\int \\log x\\,dx$ を解く',
      goalMath: "\\int f(x)g'(x)\\,dx = f(x)g(x) - \\int f'(x)g(x)\\,dx",
      intro: '公式の符号や順番をど忘れしても、積の微分 $(fg)\' = f\'g + fg\'$ から10秒で再現できます。',
      steps: [
        {
          label: '積の微分の式を書き出す',
          math: "\\{f(x)g(x)\\}' = f'(x)g(x) + f(x)g'(x)",
          explanation: '第2章の積の微分そのものです。',
        },
        {
          label: '両辺を $x$ で積分して移項する',
          math: "f(x)g(x) = \\int f'(x)g(x)\\,dx + \\int f(x)g'(x)\\,dx \\implies \\int f(x)g'(x)\\,dx = f(x)g(x) - \\int f'(x)g(x)\\,dx",
          explanation: '「そのまま × 積分 − ∫(微分 × 積分)」の合言葉で口ずさめるようにしましょう！',
        },
        {
          label: '応用：$\\int \\log x\\,dx$ は「$1 \\times \\log x$」と見る！',
          math: "\\int 1 \\cdot \\log x\\,dx = \\int (x)' \\log x\\,dx = x\\log x - \\int x \\cdot \\frac{1}{x}\\,dx",
          explanation: '隠れた係数 $1$ を積分側（$1 \\to x$）、$\\log x$ を微分側（$\\log x \\to \\frac{1}{x}$）に回します。',
          why: '$x \\cdot \\frac{1}{x} = 1$ と綺麗に約分されて $\\log$ が消滅します！',
        },
        {
          label: '仕上げて超重要公式が完成',
          math: "\\int \\log x\\,dx = x\\log x - x + C",
          explanation: '定期テストで頻出なので導出法ごと頭に入れておくと面積計算でも大活躍します。',
        },
      ],
    },
    workedExample: {
      title: '同形出現（ループ型）の部分積分：$e^x \\sin x$',
      problem: '不定積分 $I = \\int e^x \\sin x\\,dx$ を求めよ。',
      thoughtProcess: '$e^x$ も $\\sin x$ も何度微分しても消えません。ところが**部分積分を同じ向きで2回続ける**と、右辺にもう一度元の $I$ がマイナス付きで現れ、一次方程式のように $I$ を解けます！',
      solutionSteps: [
        '$e^x = (e^x)\'$ として1回目の部分積分：$I = e^x\\sin x - \\int e^x\\cos x\\,dx$。',
        'もう一度 $e^x = (e^x)\'$ として2回目の部分積分：$I = e^x\\sin x - \\left(e^x\\cos x - \\int e^x(-\\sin x)\\,dx\\right)$。',
        '整理すると $I = e^x(\\sin x - \\cos x) - I$。',
        '$-I$ を左辺に移項して $2I = e^x(\\sin x - \\cos x)$。よって $I = \\frac{1}{2}e^x(\\sin x - \\cos x) + C$。',
      ],
      pitfall: '2回目の部分積分で1回目と逆の選び方（$\\cos x$ を積分側にするなど）をしてしまうと、$I = I$ という恒等式に戻ってしまいます！2回とも同じ側を積分するのが絶対ルールです。',
    },
    miniCheck: {
      question: '$\\int x e^x\\,dx$ を求めよ。',
      hint: '$x$ を微分側、$e^x$ を積分側に選んで部分積分します。',
      answer: '$(x - 1)e^x + C$',
      explanation: '$\\int x (e^x)\'\\,dx = x e^x - \\int 1 \\cdot e^x\\,dx = x e^x - e^x + C = (x-1)e^x + C$。',
    },
    examSummary: [
      '部分積分の合言葉：「そのまま × 積分 − ∫(微分 × 積分)」。',
      '微分側に回す優先順位は **$\\log x$ ＞ 多項式 $x^n$ ＞ 三角・指数**。',
      '$\\int \\log x\\,dx = x\\log x - x + C$ は「$1 \\cdot \\log x$」の部分積分。$e^x\\sin x$ 型は2回同じ向きで同形出現！',
    ],
  },
  {
    id: 'ch4-4',
    chapterId: 'ch4',
    order: 16,
    title: '三角・分数・無理関数の積分と定積分の性質',
    subtitle: '部分分数分解・次数下げ・偶奇性・定積分で表された関数の総仕上げ',
    estimatedMinutes: 16,
    examFrequency: '超頻出',
    intuition: {
      hook: '積分計算は「最初の1行目の変形」で9割が決まる！',
      paragraphs: [
        '数IIIの積分が難しく感じる最大の理由は、「どの道具を使えばいいか迷う」ことです。実は定期テストに出る変形の引き出しはたった4つしかありません。',
        '① **分数関数**：分子の次数 $\\ge$ 分母なら割り算、因数分解できれば**部分分数分解**。② **三角関数**：2乗は**半角で次数下げ**、積は**積和公式**。③ **対称区間 $[-a, a]$**：**偶関数・奇関数**で計算を半分〜ゼロに。④ **定積分で表された関数**：$\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)$ で微分して正体を暴く！',
      ],
      keyImage: '積分前の「下ごしらえ4選」：割り算・部分分数分解・次数下げ・偶奇性チェック！',
    },
    derivation: {
      title: '分数関数の部分分数分解と「定積分で表された関数」の微分',
      goalMath: "\\frac{d}{dx}\\int_a^{g(x)} f(t)\\,dt = f(g(x))\\cdot g'(x)",
      intro: '定期テストで頻出の「上端が $g(x)$ の定積分微分」と「部分分数分解」の仕組みを確認しましょう。',
      steps: [
        {
          label: '部分分数分解の基本形',
          math: "\\frac{1}{(x-1)(x+2)} = \\frac{1}{3}\\left(\\frac{1}{x-1} - \\frac{1}{x+2}\\right)",
          explanation: '分母が因数分解できたら引き算に分解します。これで各項が一瞬で $\\log$ の積分に変わります！',
          why: '分子の次数が分母以上のときは、まず筆算で「商＋余り/分母」に割り算するのが先決です。',
        },
        {
          label: '三角関数の2乗は半角の公式で1乗へ次数下げ',
          math: "\\sin^2 x = \\frac{1 - \\cos 2x}{2},\\qquad \\cos^2 x = \\frac{1 + \\cos 2x}{2}",
          explanation: '1乗の $\\cos 2x$ にしてしまえば即座に $\\frac{1}{2}\\sin 2x$ と積分できます。',
        },
        {
          label: '定積分で表された関数の微分（微積分学の基本定理）',
          math: "\\int_a^{g(x)} f(t)\\,dt = F(g(x)) - F(a) \\quad (F'(t) = f(t))",
          explanation: '原始関数 $F$ を使って書き直します。$F(a)$ は定数なので微分すると $0$ です。',
        },
        {
          label: '両辺を $x$ で微分（合成関数の微分！）',
          math: "\\frac{d}{dx}\\int_a^{g(x)} f(t)\\,dt = F'(g(x))\\cdot g'(x) = f(g(x))\\cdot g'(x)",
          explanation: '上端が $x^2$ や $2x$ のとき、最後に **$g\'(x)$ を掛け忘れない**ことが最重要ポイントです！',
        },
      ],
    },
    workedExample: {
      title: '偶関数・奇関数と部分分数分解の合わせ技',
      problem: '次の定積分を求めよ。 $$\\int_{-1}^{1} \\left(x^3\\cos x + \\frac{1}{x^2 - 4}\\right)dx$$',
      thoughtProcess: '積分区間が $[-1, 1]$ と原点対称！まず $x^3\\cos x$ が奇関数（$\\text{奇}\\times\\text{偶}=\\text{奇}$）なので $0$ に消し、残りの偶関数を $2\\int_0^1$ にして部分分数分解します。',
      solutionSteps: [
        '$g(x) = x^3\\cos x$ は $g(-x) = (-x)^3\\cos(-x) = -g(x)$ より奇関数なので $\\int_{-1}^1 x^3\\cos x\\,dx = 0$。',
        '$h(x) = \\frac{1}{x^2 - 4}$ は偶関数なので、与式 $= 2\\int_0^1 \\frac{1}{(x-2)(x+2)}\\,dx$。',
        '部分分数分解すると $\\frac{1}{(x-2)(x+2)} = \\frac{1}{4}\\left(\\frac{1}{x-2} - \\frac{1}{x+2}\\right)$。',
        '$= \\frac{1}{2}\\left[\\log\\left|\\frac{x-2}{x+2}\\right|\\right]_0^1 = \\frac{1}{2}\\left(\\log\\frac{1}{3} - \\log 1\\right) = -\\frac{1}{2}\\log 3$。',
      ],
      pitfall: '定積分で $\\log|x-2|$ の絶対値を忘れると、$x=1$ を代入したとき $\\log(-1)$ になってパニックになります！対数の積分では区間内で真数が負になることがあるため、必ず絶対値をつけましょう。',
    },
    miniCheck: {
      question: '$F(x) = \\int_1^{x^2} \\sqrt{t^3 + 1}\\,dt$ のとき、$F\'(x)$ を求めよ。',
      hint: '$\\frac{d}{dx}\\int_a^{g(x)} f(t)\\,dt = f(g(x))g\'(x)$ を使います。$g(x) = x^2$ なので $g\'(x) = 2x$ を掛けます！',
      answer: '$2x\\sqrt{x^6 + 1}$',
      explanation: '$t$ に $x^2$ を代入した $\\sqrt{(x^2)^3 + 1} = \\sqrt{x^6 + 1}$ に、上端の微分 $(x^2)\' = 2x$ を掛けて $2x\\sqrt{x^6+1}$。',
    },
    examSummary: [
      '分数関数は「次数下げ（割り算）→ 因数分解して部分分数分解」または「$\\frac{f\'}{f}$ 型」「$a\\tan\\theta$ 置換」のどれかに必ず落ちる。',
      '積分区間 $[-a, a]$ を見たら即「偶関数・奇関数」チェック（奇関数＝$0$、偶関数＝$2\\int_0^a$）。',
      '定積分で表された関数は「①下端と同じ値を代入して条件を得る」「②両辺を $x$ で微分する」の2点セットが王道！',
    ],
  },
]
