import type { TopicData } from '../../types/curriculum'

export const CH2_TOPICS: TopicData[] = [
  {
    id: 'ch2-1',
    chapterId: 'ch2',
    order: 5,
    title: '微分可能性と連続性',
    subtitle: '「拡大すると1本の直線に見える」が微分の本質！尖った点との違い',
    estimatedMinutes: 13,
    examFrequency: '頻出',
    simulatorId: 'derivative-zoom',
    intuition: {
      hook: 'つながっている（連続）のに、微分できないグラフってどんな形？',
      paragraphs: [
        '代表的なのが $y = |x|$ の原点 $x = 0$ です。グラフは V 字型につながっていますが、原点をどれだけ虫眼鏡で拡大しても「尖った角」のまま直線になりません。右からの傾きは $+1$、左からの傾きは $-1$ で食い違うからです。',
        '一方、$y = \\sin x$ や $y = e^x$ のような滑らかな曲線は、1点を拡大していくとどんどんまっすぐな**接線**に近づきます。下のシミュレーターで $h \\to 0$ と「9倍ズーム」を体験してみましょう。',
      ],
      keyImage: '微分可能 ＝「滑らかで、拡大すると1本の接線に見える」⇒ 必ずつながっている（連続）！',
    },
    derivation: {
      title: '「微分可能ならば連続」の2行証明',
      goalMath: 'f(x) \\text{ が } x=a \\text{ で微分可能} \\implies \\lim_{x \\to a} f(x) = f(a)',
      intro: '「微分できるなら必ずつながっている」ことを、導関数の定義式から直接示します（逆は成り立ちません）。',
      steps: [
        {
          label: '微分可能の定義を確認する',
          math: "\\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a} = f'(a) \\quad (\\text{有限な極限値が存在})",
          explanation: '平均変化率の極限（右からも左からも同じ値）が存在することが仮定です。',
        },
        {
          label: '$f(x) - f(a)$ に分母 $(x-a)$ を無理やり作って掛ける',
          math: 'f(x) - f(a) = \\frac{f(x) - f(a)}{x - a} \\cdot (x - a)',
          explanation: '$x \\neq a$ のとき恒等的に成り立つ変形です。',
          why: '知っている極限 $f\'(a)$ の形を式の中に作り出す常套手段です。',
        },
        {
          label: '$x \\to a$ の極限をとる',
          math: "\\lim_{x \\to a} \\{f(x) - f(a)\\} = f'(a) \\cdot 0 = 0 \\implies \\lim_{x \\to a} f(x) = f(a)",
          explanation: '有限な数 $f\'(a)$ に $0$ を掛けると必ず $0$ になるため、連続性が証明されました！',
        },
      ],
    },
    workedExample: {
      title: '絶対値を含む関数の微分可能性の判定',
      problem: '$f(x) = x|x|$ は $x = 0$ で微分可能か調べ、微分可能なら $f\'(0)$ を求めよ。',
      thoughtProcess: '絶対値があるからといって反射的に「微分不可能」と決めつけてはいけません！$h \\to +0$ と $h \\to -0$ の極限を定義通りに計算して一致するか確認します。',
      solutionSteps: [
        '定義より $\\frac{f(0+h) - f(0)}{h} = \\frac{h|h| - 0}{h} = |h|$。',
        '右極限：$\\lim_{h \\to +0} |h| = 0$。',
        '左極限：$\\lim_{h \\to -0} |h| = 0$。',
        '両者が一致して有限値 $0$ をとるため、$x = 0$ で**微分可能**であり、$f\'(0) = 0$。',
      ],
      pitfall: '$|x|$ は $x=0$ で微分不可能ですが、$x|x|$ は原点で滑らかにつながるため微分可能です。必ず定義式 $\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$ の左右極限で判定しましょう。',
    },
    miniCheck: {
      question: '$f(x) = |x - 1|$ について、$x = 1$ における連続性と微分可能性を述べよ。',
      hint: '$x=1$ でグラフはつながっていますが、右と左で傾きが変わります。',
      answer: '**連続だが、微分可能ではない**',
      explanation: '$\\lim_{x\\to 1}|x-1|=0=f(1)$ より連続。しかし $\\lim_{h\\to +0}\\frac{|h|}{h}=1$、$\\lim_{h\\to -0}\\frac{|h|}{h}=-1$ と一致しないため微分不可能。',
    },
    examSummary: [
      '微分可能 $\\implies$ 連続（逆は偽。反例は $y = |x|$ の $x=0$）。',
      '微分可能性を問われたら、$\\lim_{h\\to +0}$ と $\\lim_{h\\to -0}$ の極限が一致するかを定義で調べる。',
      '定義式 $\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}=f\'(a)$ は極限問題のショートカットにも頻出！',
    ],
  },
  {
    id: 'ch2-2',
    chapterId: 'ch2',
    order: 6,
    title: '積・商・合成・逆関数の微分',
    subtitle: '数III微分の4大ルールを「なぜそうなるか」から完全習得',
    estimatedMinutes: 16,
    examFrequency: '超頻出',
    intuition: {
      hook: 'なぜ $(fg)\' = f\'g\'$ ではないのか？長方形の面積で一瞬でわかる！',
      paragraphs: [
        '横が $f(x)$、縦が $g(x)$ の長方形を思い浮かべてください。$x$ がほんの少し増えると、横が $\\Delta f$、縦が $\\Delta g$ 伸びます。増えた面積は「右側の細長い短冊 $g\\Delta f$」と「上側の細長い短冊 $f\\Delta g$」の合計です（角の極小四角 $\\Delta f\\Delta g$ は無視できるほど小さい）。だから $(fg)\' = f\'g + fg\'$ になります！',
        'また合成関数の微分（連鎖律）は**ギアの噛み合わせ**と同じです。$x$ を回すと $u$ が $u\'$ 倍の速さで回り、さらに $y$ が $\\frac{dy}{du}$ 倍の速さで回るなら、全体の回転比は掛け算 $\\frac{dy}{du}\\cdot\\frac{du}{dx}$ になります。',
      ],
      keyImage: '積の微分＝「片方ずつ微分して足す」、合成関数＝「外側の微分 × 中身の微分」',
    },
    derivation: {
      title: '商の微分と合成関数の微分の導出',
      goalMath: "\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2},\\qquad \\{f(g(x))\\}' = f'(g(x))\\cdot g'(x)",
      intro: '商の微分で「分子の引き算の順番」をど忘れしても、積の微分と $\\left(\\frac{1}{g}\\right)\'$ から一瞬で再現できます。',
      steps: [
        {
          label: 'まず $\\left(\\frac{1}{g(x)}\\right)\'$ を定義から導く',
          math: "\\lim_{h\\to 0}\\frac{\\frac{1}{g(x+h)}-\\frac{1}{g(x)}}{h} = \\lim_{h\\to 0}\\frac{-\\{g(x+h)-g(x)\\}}{h\\cdot g(x+h)g(x)} = -\\frac{g'(x)}{\\{g(x)\\}^2}",
          explanation: '通分すると分子にマイナス付きで $g(x+h)-g(x)$ が現れます。',
        },
        {
          label: '積の微分を使って $\\frac{f}{g} = f \\cdot \\frac{1}{g}$ を微分する',
          math: "\\left(f \\cdot \\frac{1}{g}\\right)' = f' \\cdot \\frac{1}{g} + f \\cdot \\left(-\\frac{g'}{g^2}\\right) = \\frac{f'g - fg'}{g^2}",
          explanation: '通分するだけで商の微分公式が完成！「分子の微分が先（プラス）、分母の微分が後（マイナス）」と確認できます。',
          why: '分子が定数 $1$ のときはわざわざ商の公式を使わず $-\\frac{g\'}{g^2}$ を使う方が圧倒的に速くミスも減ります。',
        },
        {
          label: '合成関数の微分（連鎖律）の構造',
          math: '\\frac{\\Delta y}{\\Delta x} = \\frac{\\Delta y}{\\Delta u} \\cdot \\frac{\\Delta u}{\\Delta x} \\xrightarrow{\\Delta x \\to 0} \\frac{dy}{du} \\cdot \\frac{du}{dx}',
          explanation: 'ライプニッツ記法 $\\frac{dy}{dx}$ を使うと、まるで分数のように $du$ が約分されるイメージで確実に覚えられます。',
        },
        {
          label: '逆関数の微分も分数イメージで一発',
          math: '\\frac{dy}{dx} = \\frac{1}{\\frac{dx}{dy}}',
          explanation: '$y = f(x)$ を $x = g(y)$ と見直したとき、横軸と縦軸が入れ替わるので傾きはちょうど逆数になります。',
        },
      ],
    },
    workedExample: {
      title: '合成＋商が絡む定期テスト定番計算',
      problem: '$y = \\frac{x}{\\sqrt{x^2 + 1}}$ を微分せよ。',
      thoughtProcess: '商の微分と合成関数の微分（$\\sqrt{u}$ の微分は $\\frac{1}{2\\sqrt{u}}$）を組み合わせ、最後に分母分子に $\\sqrt{x^2+1}$ を掛けてスッキリ整理します。',
      solutionSteps: [
        'まず $\\left(\\sqrt{x^2+1}\\right)\' = \\frac{1}{2\\sqrt{x^2+1}} \\cdot 2x = \\frac{x}{\\sqrt{x^2+1}}$ を準備する。',
        '商の微分より：$y\' = \\frac{1 \\cdot \\sqrt{x^2+1} - x \\cdot \\frac{x}{\\sqrt{x^2+1}}}{x^2 + 1}$',
        '分母分子に $\\sqrt{x^2+1}$ を掛けて繁分数を解消する：$y\' = \\frac{(x^2+1) - x^2}{(x^2+1)\\sqrt{x^2+1}}$',
        '整理して $y\' = \\frac{1}{(x^2+1)\\sqrt{x^2+1}}$。',
      ],
      pitfall: '合成関数の微分で「中身の微分 $2x$」を掛け忘れるミスがダントツの1位です！また、$(\\sqrt{u})\' = \\frac{u\'}{2\\sqrt{u}}$ は頻出なので塊で瞬時に出せるようにしましょう。',
    },
    miniCheck: {
      question: '$y = (2x - 3)^4$ を微分せよ。',
      hint: '外側の $(\\square)^4$ を微分して $4(\\square)^3$、そこに中身の微分 $(2x-3)\'=2$ を掛けます。',
      answer: '$y\' = 8(2x - 3)^3$',
      explanation: '$4(2x-3)^3 \\cdot (2x-3)\' = 4(2x-3)^3 \\cdot 2 = 8(2x-3)^3$。',
    },
    examSummary: [
      '積：$(fg)\'=f\'g+fg\'$、商：$\\left(\\frac{f}{g}\\right)\'=\\frac{f\'g-fg\'}{g^2}$（分子先・引き算に注意）。',
      '合成関数：外側の微分をした直後に、必ず「× 中身の微分」を添える習慣をつける。',
      '$(\\sqrt{x})\' = \\frac{1}{2\\sqrt{x}}$、$\\left(\\frac{1}{x}\\right)\' = -\\frac{1}{x^2}$ は息をするように使えると計算速度が倍増する。',
    ],
  },
  {
    id: 'ch2-3',
    chapterId: 'ch2',
    order: 7,
    title: '三角・指数・対数関数の微分',
    subtitle: '第1章の極限公式がついに結実！基本関数の導関数をすべて導く',
    estimatedMinutes: 15,
    examFrequency: '超頻出',
    intuition: {
      hook: 'なぜ $(\\sin x)\' = \\cos x$ で、なぜ $(\\log x)\' = \\frac{1}{x}$ なの？',
      paragraphs: [
        '第1章で苦労して証明した $\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1$ や $e$ の定義は、実はすべてこのトピックのために準備されていました！',
        'たとえば $y = \\sin x$ のグラフを思い浮かべると、$x=0$ で傾きは $+1$、$x=\\frac{\\pi}{2}$ の頂点で傾きは $0$、$x=\\pi$ で傾きは $-1$。傾きのグラフを描くと見事に $\\cos x$ と一致します。さらに $e^x$ は「微分しても自分自身のまま」という最強の性質を持ちます。',
      ],
      keyImage: '数IIIの基本微分公式は、すべて第1章の極限3兄弟から自動的に生まれる！',
    },
    derivation: {
      title: '$(\\sin x)\'=\\cos x$ と $(\\log |x|)\'=\\frac{1}{x}$ と $(e^x)\'=e^x$ の導出',
      goalMath: "(\\sin x)' = \\cos x,\\qquad (\\log |x|)' = \\frac{1}{x},\\qquad (e^x)' = e^x",
      intro: '3大公式がどう導かれるか、ステップごとに確認しましょう。',
      steps: [
        {
          label: '$(\\sin x)\'$ は和積公式＋$\\frac{\\sin h}{h} \\to 1$ で一撃',
          math: "\\frac{\\sin(x+h)-\\sin x}{h} = \\frac{2\\cos\\left(x+\\frac{h}{2}\\right)\\sin\\frac{h}{2}}{h} = \\cos\\left(x+\\frac{h}{2}\\right)\\cdot\\frac{\\sin\\frac{h}{2}}{\\frac{h}{2}} \\xrightarrow{h\\to 0} \\cos x",
          explanation: '和積の公式で $\\sin\\frac{h}{2}$ を切り出せば、第1章の極限公式そのものです。',
          why: '角度がラジアンでないと余計な定数 $\\frac{\\pi}{180}$ が飛び出してしまいます。',
        },
        {
          label: '$(\\tan x)\'$ は商の微分で導出',
          math: "(\\tan x)' = \\left(\\frac{\\sin x}{\\cos x}\\right)' = \\frac{\\cos^2 x - (-\\sin^2 x)}{\\cos^2 x} = \\frac{1}{\\cos^2 x}",
          explanation: '$\\cos^2 x + \\sin^2 x = 1$ が鮮やかに効いて $\\frac{1}{\\cos^2 x}$ になります。',
        },
        {
          label: '$(\\log x)\'$ ($x>0$) は $\\frac{\\log(1+t)}{t} \\to 1$ から',
          math: "\\frac{\\log(x+h)-\\log x}{h} = \\frac{1}{x}\\cdot\\frac{\\log\\left(1+\\frac{h}{x}\\right)}{\\frac{h}{x}} \\xrightarrow{h\\to 0} \\frac{1}{x}",
          explanation: '$x < 0$ のときは $\\log(-x)$ に合成関数の微分を使うと $\\frac{1}{-x}\\cdot(-1) = \\frac{1}{x}$ で同じ結果！だから $(\\log|x|)\' = \\frac{1}{x}$ です。',
        },
        {
          label: '$(e^x)\'$ は $\\frac{e^h - 1}{h} \\to 1$ から',
          math: "\\frac{e^{x+h}-e^x}{h} = e^x \\cdot \\frac{e^h - 1}{h} \\xrightarrow{h\\to 0} e^x",
          explanation: '一般の底 $a^x = e^{x\\log a}$ に合成関数の微分を使えば $(a^x)\' = a^x \\log a$ も即座に得られます。',
        },
      ],
    },
    workedExample: {
      title: '対数の性質で先にバラしてから微分するコツ',
      problem: '$y = \\log\\sqrt{\\frac{1+x}{1-x}}$ を微分せよ。',
      thoughtProcess: 'そのまま合成関数＋商の微分をすると地獄のように煩雑になります。**対数は微分する前に必ず $\\log$ の法則で足し算・引き算に分解する**のが鉄則です！',
      solutionSteps: [
        '対数の性質より $y = \\frac{1}{2}\\{\\log(1+x) - \\log(1-x)\\}$ と変形する。',
        '各項を微分する：$y\' = \\frac{1}{2}\\left(\\frac{1}{1+x} - \\frac{-1}{1-x}\\right)$',
        '通分して整理：$y\' = \\frac{1}{2}\\cdot\\frac{(1-x)+(1+x)}{(1+x)(1-x)} = \\frac{1}{1 - x^2}$。',
      ],
      pitfall: '$(\\log(1-x))\'$ で中身の微分 $(-1)$ を掛け忘れるミス、および $(a^x)\' = a^x\\log a$ と $(\\log_a x)\' = \\frac{1}{x\\log a}$ の $\\log a$ が「分子か分母か」の混同に注意しましょう。',
    },
    miniCheck: {
      question: '$y = e^{-x}\\sin 2x$ を微分せよ。',
      hint: '積の微分と合成関数の微分の組み合わせです。$(e^{-x})\' = -e^{-x}$、$(\\sin 2x)\' = 2\\cos 2x$。',
      answer: '$y\' = e^{-x}(2\\cos 2x - \\sin 2x)$',
      explanation: '$y\' = (-e^{-x})\\sin 2x + e^{-x}(2\\cos 2x) = e^{-x}(2\\cos 2x - \\sin 2x)$。$e^{-x}$ でくくると増減表も作りやすい！',
    },
    examSummary: [
      '$(\\sin x)\'=\\cos x$, $(\\cos x)\'=-\\sin x$, $(\\tan x)\'=\\frac{1}{\\cos^2 x}$。',
      '$(e^x)\'=e^x$, $(a^x)\'=a^x\\log a$, $(\\log|x|)\'=\\frac{1}{x}$, $(\\log_a|x|)\'=\\frac{1}{x\\log a}$。',
      '対数関数の微分は「まず対数の法則で分解してから微分」で計算量が1/5になる！',
    ],
  },
  {
    id: 'ch2-4',
    chapterId: 'ch2',
    order: 8,
    title: '対数微分法・媒介変数・陰関数・高次導関数',
    subtitle: '「x の x 乗」や「楕円の接線」など複雑な形をスマートに微分する',
    estimatedMinutes: 15,
    examFrequency: '頻出',
    intuition: {
      hook: '$y = x^x$ はべき関数？指数関数？どちらの公式も使えない！',
      paragraphs: [
        '底にも指数にも変数 $x$ が入っている $y = x^x$ は、$(x^n)\'=nx^{n-1}$ も $(a^x)\'=a^x\\log a$ も使えません。そこで登場するのが**対数微分法**。両辺の自然対数をとると、肩に乗っていた $x$ が前に降りてきて $\\log y = x\\log x$ と普通の積の形に変わります！',
        'また、円 $x^2+y^2=1$ のような**陰関数**や、サイクロイドのような**媒介変数表示**も、無理に $y = \\dots$ に直さず「合成関数の微分」でそのまま $\\frac{dy}{dx}$ を取り出せます。',
      ],
      keyImage: '「$y$ は $x$ の関数」と意識して、$y$ を微分したら必ず後ろに $y\'$ ($\\frac{dy}{dx}$) を掛ける！',
    },
    derivation: {
      title: '対数微分法・陰関数・媒介変数微分の統一ルール',
      goalMath: "(x^x)' = x^x(\\log x + 1),\\qquad \\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}",
      intro: '3つのテクニックに共通する「合成関数の微分」の使い方をステップで確認します。',
      steps: [
        {
          label: '対数微分法：両辺に $\\log |\\cdot|$ をとる',
          math: 'y = x^x \\ (x>0) \\implies \\log y = x\\log x',
          explanation: '絶対値をとることで $y < 0$ の場合もまとめて扱えます（$x^x$ は常に正なので $\\log y$ でOK）。',
        },
        {
          label: '両辺を $x$ で微分（左辺に合成関数の微分！）',
          math: "\\frac{y'}{y} = 1 \\cdot \\log x + x \\cdot \\frac{1}{x} = \\log x + 1",
          explanation: '$\\log y$ を $x$ で微分すると、まず $y$ で微分して $\\frac{1}{y}$、そこに中身の微分 $y\'$ を掛けます。',
          why: '最後に両辺に $y$（元の式 $x^x$）を掛ければ $y\' = x^x(\\log x + 1)$ が完成します。',
        },
        {
          label: '陰関数の微分：$y$ の項は微分して $\\frac{dy}{dx}$ を添える',
          math: '\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\implies \\frac{2x}{a^2} + \\frac{2y}{b^2}\\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = -\\frac{b^2 x}{a^2 y}',
          explanation: '$y^2$ を $x$ で微分すると $2y\\frac{dy}{dx}$。これで楕円の接線公式も一瞬で出ます。',
        },
        {
          label: '媒介変数表示：$t$ でそれぞれ微分して割り算',
          math: '\\frac{dy}{dx} = \\frac{\\frac{dy}{dt}}{\\frac{dx}{dt}} \\quad \\left(\\frac{dx}{dt} \\neq 0\\right)',
          explanation: 'さらに2階微分 $\\frac{d^2 y}{dx^2}$ を求めるときは、$\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right) \\div \\frac{dx}{dt}$ と「もう一度 $\\frac{dx}{dt}$ で割る」のが超重要！',
        },
      ],
    },
    workedExample: {
      title: 'サイクロイドの媒介変数微分（定期テスト頻出）',
      problem: '$x = t - \\sin t,\\ y = 1 - \\cos t$ ($0 < t < 2\\pi$) のとき、$\\frac{dy}{dx}$ を $t$ で表せ。',
      thoughtProcess: '$\\frac{dx}{dt}$ と $\\frac{dy}{dt}$ を別々に計算して割り算し、半角の公式で綺麗に約分します。',
      solutionSteps: [
        '$\\frac{dx}{dt} = 1 - \\cos t$、$\\frac{dy}{dt} = \\sin t$。',
        '$0 < t < 2\\pi$ より $1 - \\cos t \\neq 0$ なので、$\\frac{dy}{dx} = \\frac{\\sin t}{1 - \\cos t}$。',
        '2倍角・半角公式より $\\sin t = 2\\sin\\frac{t}{2}\\cos\\frac{t}{2}$、$1 - \\cos t = 2\\sin^2\\frac{t}{2}$。',
        '約分して $\\frac{dy}{dx} = \\frac{\\cos\\frac{t}{2}}{\\sin\\frac{t}{2}} = \\frac{1}{\\tan\\frac{t}{2}}$。',
      ],
      pitfall: '媒介変数の2階微分 $\\frac{d^2y}{dx^2}$ を $\\frac{d^2y/dt^2}{d^2x/dt^2}$ と誤計算するミスが非常に多いです！正しくは $\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right) \\cdot \\frac{1}{dx/dt}$ です。',
    },
    miniCheck: {
      question: '曲線 $x^2 + xy + y^2 = 3$ 上の点 $(1, 1)$ における $\\frac{dy}{dx}$ の値を求めよ。',
      hint: '両辺を $x$ で微分します。$xy$ の部分は積の微分で $1\\cdot y + x\\frac{dy}{dx}$ になります。',
      answer: '$-1$',
      explanation: '$2x + y + x\\frac{dy}{dx} + 2y\\frac{dy}{dx} = 0$ に $x=1, y=1$ を代入すると $3 + 3\\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = -1$。',
    },
    examSummary: [
      '対数微分法は「$x^x$ 型」や「複雑な積・商・累乗のかたまり」に絶大な威力を発揮。',
      '陰関数では $y$ の式を微分したら必ず後ろに $\\frac{dy}{dx}$ を掛ける。',
      '高次導関数（$n$ 階微分）は $y\', y\'\', y\'\'\'$ と3回書いて規則性を推測し、数学的帰納法で示すのが定番。',
    ],
  },
]
