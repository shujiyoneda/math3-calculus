import type { TopicData } from '../../types/curriculum'

export const CH5_TOPICS: TopicData[] = [
  {
    id: 'ch5-1',
    chapterId: 'ch5',
    order: 17,
    title: '面積の計算（縦切り・横切り・媒介変数）',
    subtitle: '「上の式 − 下の式」と「右の式 − 左の式」を自在に使い分ける',
    estimatedMinutes: 15,
    examFrequency: '超頻出',
    intuition: {
      hook: 'なぜ $y$ で積分した方が圧倒的に速い問題があるのか？',
      paragraphs: [
        '面積の本質は「細い短冊（幅 $dx$、長さ $y_{\\text{上}} - y_{\\text{下}}$）を左から右へ足し合わせること」です。しかし、$y = \\log x$ や $x = y^2$ のように $x$ 方向に上下の境界が途中で切り替わる図形を無理に縦切り（$dx$）すると、積分を2つに分割する羽目になります。',
        'そんなときは首を90度傾けて**横切り（幅 $dy$、長さ $x_{\\text{右}} - x_{\\text{左}}$）**にすると、たった1本の積分でスッキリ解けます！',
      ],
      keyImage: '縦切り＝$\\int_a^b (\\text{上} - \\text{下})\\,dx$、横切り＝$\\int_c^d (\\text{右} - \\text{左})\\,dy$（図を描いて上下左右を必ず確認！）',
    },
    derivation: {
      title: '媒介変数表示の曲線が囲む面積の導出',
      goalMath: 'S = \\int_a^b y\\,dx = \\int_\\alpha^\\beta y(t) \\frac{dx}{dt}\\,dt',
      intro: 'サイクロイドや楕円など、$y = f(x)$ に直せない曲線でも、置換積分の要領でそのまま $t$ の積分にできます。',
      steps: [
        {
          label: 'まず通常の $x$ による面積の式を書く',
          math: 'S = \\int_a^b y\\,dx \\quad (y \\ge 0,\\ a < b)',
          explanation: '必ず「$x$ が小さい方 $a$ から大きい方 $b$ へ」積分します。',
        },
        {
          label: '$x = x(t),\\ y = y(t)$ を置換積分のように代入する',
          math: 'dx = \\frac{dx}{dt}\\,dt,\\qquad x: a \\to b \\iff t: \\alpha \\to \\beta',
          explanation: '$x = a$ に対応する $t = \\alpha$ が下端、$x = b$ に対応する $t = \\beta$ が上端になります。',
          why: '楕円のように「$t$ が増えると $x$ が減る」場合は、$\\alpha > \\beta$ になってもそのまま対応通り書けば自動的に正の面積が出ます！',
        },
        {
          label: '具体例：サイクロイド1アーチの面積',
          math: 'x = t - \\sin t,\\ y = 1 - \\cos t \\implies S = \\int_0^{2\\pi} (1 - \\cos t)^2\\,dt = 3\\pi',
          explanation: '$\\frac{dx}{dt} = 1 - \\cos t$ なので、被積分関数が $(1-\\cos t)^2$ と綺麗になり、円の面積 $\\pi$ のちょうど3倍になります！',
        },
      ],
    },
    workedExample: {
      title: '横切り（$y$ 積分）で劇的に楽になる面積問題',
      problem: '曲線 $y = \\log x$、$y$ 軸、および2直線 $y = 0, y = 2$ で囲まれた部分の面積 $S$ を求めよ。',
      thoughtProcess: '縦切り（$x$ 積分）だと $x: 0 \\to 1$（長方形）と $x: 1 \\to e^2$（$2 - \\log x$）に分ける必要があります。一方、$x = e^y$ と見直して**横切り（$y$ 積分）**にすれば1行で終わります！',
      solutionSteps: [
        '$y = \\log x \\iff x = e^y$。$0 \\le y \\le 2$ の範囲で右端は $x = e^y$、左端は $y$ 軸（$x = 0$）。',
        '横切りの面積公式より $S = \\int_0^2 (e^y - 0)\\,dy$。',
        '$= \\left[e^y\\right]_0^2 = e^2 - 1$。',
      ],
      pitfall: '面積計算で答えがマイナスになったら「上下（または左右）の引き算が逆」か「交点の途中での入れ替わりを見落とした」サインです。計算前に必ず簡単な略図と交点チェックを行いましょう！',
    },
    miniCheck: {
      question: '曲線 $y = \\sin x$ ($0 \\le x \\le \\pi$) と $x$ 軸で囲まれた部分の面積 $S$ を求めよ。',
      hint: '$0 \\le x \\le \\pi$ で $\\sin x \\ge 0$ なのでそのまま定積分します。',
      answer: '$2$',
      explanation: '$S = \\int_0^\\pi \\sin x\\,dx = [-\\cos x]_0^\\pi = -(-1) - (-1) = 2$。サインの1山は面積2！超有名結果です。',
    },
    examSummary: [
      '面積はまず「略図＋交点」を描き、縦切り（$dx$）と横切り（$dy$）の楽な方を選ぶ。',
      '媒介変数表示では「$x: a \\to b$ に対応する $t: \\alpha \\to \\beta$」を正確に対応させ、$dx = x\'(t)dt$ を掛ける。',
      '対数や逆三角絡みの面積は、$x = g(y)$ に直した横切り積分が劇的に速いことが多い！',
    ],
  },
  {
    id: 'ch5-2',
    chapterId: 'ch5',
    order: 18,
    title: '体積の計算（断面積・x軸/y軸回転体）',
    subtitle: '「薄い輪切り $S(x)\\,dx$ を積み上げる」だけでどんな立体も攻略できる',
    estimatedMinutes: 17,
    examFrequency: '超頻出',
    simulatorId: 'solid-revolution',
    intuition: {
      hook: '回転体の公式 $V = \\pi \\int y^2\\,dx$ の「$\\pi$」と「$2$ 乗」はなぜ付くのか？',
      paragraphs: [
        '大根を薄く輪切りにしていく場面を想像してください。位置 $x$ での切り口の面積を $S(x)$、輪切りの厚さを $dx$ とすると、1枚の体積は $S(x)\\,dx$。これを端から端まで全部足し合わせたものが体積 $V = \\int_a^b S(x)\\,dx$ です。',
        '特に $x$ 軸まわりに回転させた立体では、切り口が**半径 $|y|$ の円**になるため、断面積が $S(x) = \\pi y^2$ になります。下の3Dシミュレーターで切り口を動かして立体感を掴みましょう！',
      ],
      keyImage: 'すべての体積の原点＝ $V = \\int_a^b S(x)\\,dx$。回転体なら切り口は「円（$\\pi r^2$）」または「ドーナツ（$\\pi(R^2 - r^2)$）」！',
    },
    derivation: {
      title: '円錐の体積 $V = \\frac{1}{3}\\pi r^2 h$ と、$y$ 軸回転体の導出',
      goalMath: 'V_x = \\pi \\int_a^b y^2\\,dx,\\qquad V_y = \\pi \\int_c^d x^2\\,dy',
      intro: '中学で丸暗記した「円錐の体積になぜ $\\frac{1}{3}$ が付くのか」も、断面積の積分で一瞬で証明できます。',
      steps: [
        {
          label: '底面の半径 $r$、高さ $h$ の円錐を $x$ 軸上に置く',
          math: 'y = \\frac{r}{h}x \\quad (0 \\le x \\le h)',
          explanation: '原点に頂点、$x=h$ に底面が来るように直線を引きます。',
        },
        {
          label: '位置 $x$ での切り口（円）の面積 $S(x)$ を書く',
          math: 'S(x) = \\pi y^2 = \\pi \\left(\\frac{r}{h}x\\right)^2 = \\frac{\\pi r^2}{h^2}x^2',
          explanation: '半径が $x$ に比例するので、面積は $x^2$ に比例します。',
        },
        {
          label: '$0$ から $h$ まで輪切りを足し合わせる',
          math: 'V = \\int_0^h \\frac{\\pi r^2}{h^2}x^2\\,dx = \\frac{\\pi r^2}{h^2}\\left[\\frac{x^3}{3}\\right]_0^h = \\frac{1}{3}\\pi r^2 h',
          explanation: '$x^2$ を積分すると $\\frac{x^3}{3}$ になるから「$\\frac{1}{3}$」が生まれるのです！',
          why: '角錐でも断面が $x^2$ に比例するので、すべての錐体の体積に $\\frac{1}{3}$ が付きます。',
        },
        {
          label: '$y$ 軸回転体の公式は $x$ と $y$ の役割を入れ替えるだけ',
          math: 'V_y = \\pi \\int_c^d x^2\\,dy',
          explanation: '回転軸（$y$ 軸）に垂直＝真横に輪切りにするので、円の半径は $|x|$、厚さは $dy$ です！',
        },
      ],
    },
    workedExample: {
      title: '2曲線に囲まれた図形の回転体（ドーナツ型断面）',
      problem: '2曲線 $y = x^2$ と $y = \\sqrt{x}$ で囲まれた部分を $x$ 軸のまわりに1回転してできる立体の体積 $V$ を求めよ。',
      thoughtProcess: '交点は $(0,0)$ と $(1,1)$。$0 \\le x \\le 1$ では $\\sqrt{x} \\ge x^2$ なので、切り口は**外半径 $\\sqrt{x}$、内半径 $x^2$ のドーナツ型**になります。',
      solutionSteps: [
        '位置 $x$ における断面積は、外側の円から内側の円を引いて $S(x) = \\pi\\left\\{(\\sqrt{x})^2 - (x^2)^2\\right\\} = \\pi(x - x^4)$。',
        '体積 $V = \\pi \\int_0^1 (x - x^4)\\,dx$',
        '$= \\pi \\left[\\frac{x^2}{2} - \\frac{x^5}{5}\\right]_0^1 = \\pi\\left(\\frac{1}{2} - \\frac{1}{5}\\right) = \\frac{3}{10}\\pi$。',
      ],
      pitfall: 'ドーナツ型の断面積を $\\pi(y_1 - y_2)^2$ と書いてしまう致命的ミスが最も多いです！正しくは「大円 − 小円」＝ **$\\pi(y_1^2 - y_2^2)$** です。また、回転軸をまたぐ図形では回転後に重なる部分に注意！',
    },
    miniCheck: {
      question: '曲線 $y = e^x$ と $x$ 軸、および2直線 $x=0, x=1$ で囲まれた部分を $x$ 軸のまわりに1回転した体積 $V$ を求めよ。',
      hint: '$V = \\pi \\int_0^1 (e^x)^2\\,dx = \\pi \\int_0^1 e^{2x}\\,dx$ を計算します。',
      answer: '$\\dfrac{\\pi}{2}(e^2 - 1)$',
      explanation: '$\\pi\\left[\\frac{1}{2}e^{2x}\\right]_0^1 = \\frac{\\pi}{2}(e^2 - 1)$。',
    },
    examSummary: [
      '体積は常に「軸に垂直な切り口の面積 $S$ を求める → 軸方向に積分する」の2ステップ。',
      '2曲線間の回転体は $\\pi(y_1 - y_2)^2$ ではなく **$\\pi(y_1^2 - y_2^2)$**（大円引く小円）！',
      '非回転体（切り口が正方形や正三角形など）でも、$S(x)$ を $x$ で表して $\\int_a^b S(x)\\,dx$ で全く同じに解ける。',
    ],
  },
  {
    id: 'ch5-3',
    chapterId: 'ch5',
    order: 19,
    title: '曲線の長さと道のり',
    subtitle: '曲線を極小の線分に刻んで「三平方の定理」で足し合わせるだけ！',
    estimatedMinutes: 13,
    examFrequency: '頻出',
    intuition: {
      hook: 'ぐねぐね曲がった曲線の長さはどう測る？「超細かい折れ線」の合計！',
      paragraphs: [
        '曲がった道に沿って歩いた距離（道のり）を測るには、道を極限まで短い直線パーツに刻んで足し合わせます。1つの極小パーツで横に $dx$、縦に $dy$ 進むとき、その斜辺の長さは中学で習った**三平方の定理**より $\\sqrt{(dx)^2 + (dy)^2}$ です！',
        'この式から $dt$ や $dx$ をルートの外にくくり出すだけで、教科書に載っている2つの曲線の長さ公式が丸暗記なしで一瞬で導けます。',
      ],
      keyImage: '微小な長さ $ds = \\sqrt{(dx)^2 + (dy)^2}$ をスタートからゴールまで積分するだけ！',
    },
    derivation: {
      title: '三平方の定理から曲線の長さの2公式を導出する',
      goalMath: 'L = \\int_\\alpha^\\beta \\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2}\\,dt = \\int_a^b \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2}\\,dx',
      intro: '媒介変数型と $y = f(x)$ 型は別の公式に見えますが、実はまったく同じ式です。',
      steps: [
        {
          label: '微小な線分の長さ $ds$ を三平方の定理で書く',
          math: 'ds = \\sqrt{(dx)^2 + (dy)^2}',
          explanation: '微小範囲では曲線は直線（接線）とみなせるため、斜辺の長さが曲線の微小長になります。',
        },
        {
          label: '媒介変数型：$dt$（$>0$）を外にくくり出す',
          math: 'ds = \\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2}\\,dt = |\\vec{v}(t)|\\,dt',
          explanation: 'ルートの中身は第3章で学んだ「速さ $|\\vec{v}|$」そのもの！つまり「道のり＝速さ×時間 の積分」です。',
        },
        {
          label: '$y = f(x)$ 型：$dx$（$>0$）を外にくくり出す',
          math: 'ds = \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2}\\,dx',
          explanation: '媒介変数で $x = t$ と置いた特別版にすぎません。',
          why: '実際の入試・定期テスト問題では、ルートの中身 $1 + (y\')^2$ が「必ず何かの2乗に因数分解できてルートが外れる」ように作られています！',
        },
      ],
    },
    workedExample: {
      title: '懸垂線（カテナリー）の曲線の長さ（超定番！）',
      problem: '曲線 $y = \\frac{e^x + e^{-x}}{2}$ の $0 \\le x \\le 1$ の部分の長さ $L$ を求めよ。',
      thoughtProcess: '$1 + (y\')^2$ を計算すると、必ず「$(A + B)^2$」の完全平方式になってルートが気持ちよく外れる仕掛けになっています！',
      solutionSteps: [
        '$y\' = \\frac{e^x - e^{-x}}{2}$。',
        '$1 + (y\')^2 = 1 + \\frac{e^{2x} - 2 + e^{-2x}}{4} = \\frac{e^{2x} + 2 + e^{-2x}}{4} = \\left(\\frac{e^x + e^{-x}}{2}\\right)^2$。',
        '$\\frac{e^x + e^{-x}}{2} > 0$ よりルートがそのまま外れて、$\\sqrt{1+(y\')^2} = \\frac{e^x + e^{-x}}{2}$。',
        '$L = \\int_0^1 \\frac{e^x + e^{-x}}{2}\\,dx = \\left[\\frac{e^x - e^{-x}}{2}\\right]_0^1 = \\frac{e - e^{-1}}{2}$。',
      ],
      pitfall: 'ルートを外すとき $\\sqrt{A^2} = |A|$ を忘れて符号を間違えるケースがあります（例：$\\sqrt{\\sin^2 t} = |\\sin t|$）。積分区間内で中身が正か負か必ず確認しましょう！',
    },
    miniCheck: {
      question: '曲線 $y = \\frac{2}{3}x^{\\frac{3}{2}}$ の $0 \\le x \\le 3$ の部分の長さ $L$ を求めよ。',
      hint: '$y\' = x^{\\frac{1}{2}} = \\sqrt{x}$ なので、$1 + (y\')^2 = 1 + x$ となりシンプルに積分できます！',
      answer: '$\\dfrac{14}{3}$',
      explanation: '$L = \\int_0^3 \\sqrt{1+x}\\,dx = \\left[\\frac{2}{3}(1+x)^{\\frac{3}{2}}\\right]_0^3 = \\frac{2}{3}(8 - 1) = \\frac{14}{3}$。',
    },
    examSummary: [
      '「道のり＝速さの積分 $\\int |\\vec{v}|\\,dt$」、「曲線の長さ＝$\\int \\sqrt{1+(y\')^2}\\,dx$」。どちらも原点は三平方の定理。',
      'テストでルートが外れないときは、まず計算ミスか「半角の公式 $1 - \\cos t = 2\\sin^2\\frac{t}{2}$」の見落としを疑う！',
      'ルートを外すときは $\\sqrt{A^2} = |A|$ の符号チェックを忘れずに。',
    ],
  },
  {
    id: 'ch5-4',
    chapterId: 'ch5',
    order: 20,
    title: '区分求積法と定積分・不等式評価',
    subtitle: '「極限のシグマ」を定積分で瞬殺する！積分の原点に立ち返る最終章',
    estimatedMinutes: 16,
    examFrequency: '超頻出',
    simulatorId: 'riemann-sum',
    intuition: {
      hook: '難しそうな極限 $\\lim_{n\\to\\infty}\\frac{1}{n}\\sum_{k=1}^n f\\left(\\frac{k}{n}\\right)$ の正体は「長方形の面積の合計」だった！',
      paragraphs: [
        '区間 $[0, 1]$ を $n$ 等分すると、1枚の短冊の横幅は $\\frac{1}{n}$、$k$ 番目の短冊の高さは $f\\left(\\frac{k}{n}\\right)$ です。したがって $\\frac{1}{n}\\sum_{k=1}^n f\\left(\\frac{k}{n}\\right)$ は「$n$ 枚の長方形の面積の合計」にほかなりません。',
        '$n \\to \\infty$ と細かく刻めばギザギザが消えて曲線下の面積 $\\int_0^1 f(x)\\,dx$ に一致します！下のシミュレーターで $n$ を動かして確かめましょう。',
      ],
      keyImage: '区分求積法の変換辞書：$\\frac{1}{n} \\to dx$、$\\frac{k}{n} \\to x$、$\\lim_{n\\to\\infty}\\sum_{k=1}^n \\to \\int_0^1$',
    },
    derivation: {
      title: '区分求積法の変換ルールと「積分と不等式」の仕組み',
      goalMath: '\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{k=1}^{n} f\\left(\\frac{k}{n}\\right) = \\int_0^1 f(x)\\,dx',
      intro: 'シグマの極限を定積分に書き換える手順と、長方形の面積比較による不等式証明の原理を確認します。',
      steps: [
        {
          label: '① まず式の先頭に「$\\frac{1}{n}$」を無理やりくくり出す',
          math: '\\sum_{k=1}^n \\frac{n}{n^2 + k^2} = \\frac{1}{n} \\sum_{k=1}^n \\frac{1}{1 + \\left(\\frac{k}{n}\\right)^2}',
          explanation: 'これが横幅 $dx$ になるパーツです。分子分母を $n^2$ 等で割って残りをすべて「$\\frac{k}{n}$ の式」に統一します。',
        },
        {
          label: '② 変換辞書で定積分に書き換える',
          math: '\\lim_{n\\to\\infty}\\frac{1}{n}\\sum_{k=1}^n \\frac{1}{1+\\left(\\frac{k}{n}\\right)^2} = \\int_0^1 \\frac{1}{1+x^2}\\,dx = \\frac{\\pi}{4}',
          explanation: '$k$ が $1 \\to n$ なら $\\frac{k}{n}$ は $0 \\to 1$（区間 $[0, 1]$）。$k$ が $1 \\to 2n$ なら区間は $[0, 2]$ になります！',
          why: '区間が $[0, 1]$ 以外の問題（例：$k=n+1$ から $2n$ なら $[1, 2]$）が定期テストの定番ひねり問題です。',
        },
        {
          label: '③ 面積比較による不等式評価（定積分と不等式）',
          math: 'f(x)\\text{ が単調減少} \\implies \\int_k^{k+1} f(x)\\,dx < f(k)',
          explanation: '幅 $1$ の区間 $[k, k+1]$ で「長方形の面積（左端の高さ $f(k)$）」と「曲線下の面積」を比べるだけで、和 $\\sum \\frac{1}{k}$ などの評価が一瞬でできます！',
          why: 'たとえば $y = \\frac{1}{x}$ で $k=1\\dots n$ を足し合わせると $\\log(n+1) < 1 + \\frac{1}{2} + \\dots + \\frac{1}{n}$ が幾何学的に即証明できます。',
        },
      ],
    },
    workedExample: {
      title: '区間が $[0, 1]$ ではない区分求積法（ひねり定番）',
      problem: '次の極限を求めよ。 $$\\lim_{n \\to \\infty} \\left(\\frac{1}{n+1} + \\frac{1}{n+2} + \\cdots + \\frac{1}{3n}\\right)$$',
      thoughtProcess: '和の項数が $2n$ 個あります！$\\sum_{k=1}^{2n} \\frac{1}{n+k}$ と書き、$\\frac{1}{n}$ をくくり出して $\\frac{k}{n}$ の動く範囲（$0 \\to 2$）を正確に読み取ります。',
      solutionSteps: [
        'シグマで表すと $\\sum_{k=1}^{2n} \\frac{1}{n + k} = \\frac{1}{n} \\sum_{k=1}^{2n} \\frac{1}{1 + \\frac{k}{n}}$。',
        '$k = 1 \\to 2n$ のとき $\\frac{k}{n}$ は $\\frac{1}{n} (\\to 0)$ から $\\frac{2n}{n} = 2$ まで動くので、積分区間は $[0, 2]$！',
        '区分求積法より、与式 $= \\int_0^2 \\frac{1}{1 + x}\\,dx$',
        '$= \\left[\\log(1 + x)\\right]_0^2 = \\log 3 - \\log 1 = \\log 3$。',
      ],
      pitfall: '項数が $2n$ なのに機械的に区間を $[0, 1]$ にして $\\log 2$ と誤答するミスが多発します！必ず「$k$ の最小値$/n$」と「$k$ の最大値$/n$」を積分区間の下端・上端にしてください。',
    },
    miniCheck: {
      question: '$\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{k=1}^{n} e^{\\frac{k}{n}}$ の値を求めよ。',
      hint: '$\\frac{1}{n} \\to dx$、$\\frac{k}{n} \\to x$、区間 $[0, 1]$ でそのまま定積分 $\\int_0^1 e^x\\,dx$ になります。',
      answer: '$e - 1$',
      explanation: '$\\int_0^1 e^x\\,dx = [e^x]_0^1 = e - 1$。',
    },
    examSummary: [
      '区分求積法は「①$\\sum$ で書く → ②$\\frac{1}{n}$ を外へ → ③中身を $\\frac{k}{n}$ だけで表す → ④下端・上端を確認して $\\int$ へ」。',
      '積分の前に掛け算 $\\sqrt[n]{\\cdots}$ が出たら、まず自然対数 $\\log$ をとって足し算（$\\sum$）に変えてから区分求積！',
      '定積分と不等式は「単調増加・減少グラフに幅1の長方形を描いて面積比較する」のが最強の視覚解法。',
    ],
  },
]
