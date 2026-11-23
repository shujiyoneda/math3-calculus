import type { DrillQuestion } from '../types/curriculum'

export const DRILL_BANK: DrillQuestion[] = [
  // ===== Chapter 1: 関数の極限と連続性 =====
  {
    id: 'd-ch1-1',
    chapterId: 'ch1',
    topicId: 'ch1-1',
    tag: '不定形の解消',
    difficulty: '基礎',
    prompt: '極限 $$\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$$ の値を求めよ。',
    choices: ['$3$', '$6$', '$0$', '$9$'],
    correctIndex: 1,
    hint1: '$x=3$ を代入すると $\\frac{0}{0}$ の不定形。分子を因数分解しよう。',
    hint2: '$x^2 - 9 = (x - 3)(x + 3)$ より $(x - 3)$ を約分できる。',
    solution: '与式 $= \\lim_{x \\to 3} \\frac{(x-3)(x+3)}{x-3} = \\lim_{x \\to 3} (x + 3) = 6$。',
  },
  {
    id: 'd-ch1-2',
    chapterId: 'ch1',
    topicId: 'ch1-1',
    tag: '負の無限大と根号',
    difficulty: '定期テスト頻出',
    prompt: '極限 $$\\lim_{x \\to -\\infty} \\frac{\\sqrt{9x^2 + 2x}}{x + 1}$$ の値を求めよ。',
    choices: ['$3$', '$-3$', '$9$', '$-9$'],
    correctIndex: 1,
    hint1: '$x \\to -\\infty$ のときは $x < 0$ なので $\\sqrt{x^2} = -x$ になる！$x = -t$ と置換しよう。',
    hint2: '$x = -t\\ (t \\to +\\infty)$ とおくと $\\frac{\\sqrt{9t^2 - 2t}}{-t + 1}$。分母分子を $t$ で割る。',
    solution: '$x = -t$ ($t \\to \\infty$) とおくと $\\lim_{t \\to \\infty} \\frac{\\sqrt{9 - 2/t}}{-1 + 1/t} = \\frac{3}{-1} = -3$。',
  },
  {
    id: 'd-ch1-3',
    chapterId: 'ch1',
    topicId: 'ch1-1',
    tag: '∞−∞ の有理化',
    difficulty: '標準',
    prompt: '極限 $$\\lim_{x \\to \\infty} \\left(\\sqrt{x^2 + 6x} - x\\right)$$ の値を求めよ。',
    choices: ['$0$', '$6$', '$3$', '$\\infty$'],
    correctIndex: 2,
    hint1: '$\\infty - \\infty$ 型は分子の有理化で $\\frac{\\infty}{\\infty}$ 型へ変える。',
    hint2: '$\\frac{6x}{\\sqrt{x^2 + 6x} + x}$ と変形し、分母分子を $x$ で割ろう。',
    solution: '有理化すると $\\frac{6x}{\\sqrt{x^2+6x}+x} = \\frac{6}{\\sqrt{1+6/x}+1} \\to \\frac{6}{1+1} = 3$。',
  },
  {
    id: 'd-ch1-4',
    chapterId: 'ch1',
    topicId: 'ch1-2',
    tag: '三角関数の極限',
    difficulty: '基礎',
    prompt: '極限 $$\\lim_{x \\to 0} \\frac{\\sin 4x}{3x}$$ の値を求めよ。',
    choices: ['$\\dfrac{4}{3}$', '$\\dfrac{3}{4}$', '$1$', '$12$'],
    correctIndex: 0,
    hint1: '$\\lim_{\\square \\to 0} \\frac{\\sin \\square}{\\square} = 1$ の形に揃える。',
    hint2: '$\\frac{\\sin 4x}{4x} \\cdot \\frac{4}{3}$ と書き換えよう。',
    solution: '$\\lim_{x \\to 0} \\frac{\\sin 4x}{4x} \\cdot \\frac{4}{3} = 1 \\cdot \\frac{4}{3} = \\frac{4}{3}$。',
  },
  {
    id: 'd-ch1-5',
    chapterId: 'ch1',
    topicId: 'ch1-2',
    tag: '1−cos x の極限',
    difficulty: '定期テスト頻出',
    prompt: '極限 $$\\lim_{x \\to 0} \\frac{1 - \\cos 3x}{x^2}$$ の値を求めよ。',
    choices: ['$\\dfrac{3}{2}$', '$\\dfrac{9}{2}$', '$9$', '$\\dfrac{1}{2}$'],
    correctIndex: 1,
    hint1: '$1 - \\cos 3x = 2\\sin^2\\frac{3x}{2}$、または分母分子に $(1 + \\cos 3x)$ を掛ける。',
    hint2: '$\\frac{1 - \\cos^2 3x}{x^2(1 + \\cos 3x)} = \\left(\\frac{\\sin 3x}{x}\\right)^2 \\cdot \\frac{1}{1 + \\cos 3x}$。',
    solution: '$\\frac{\\sin^2 3x}{x^2(1+\\cos 3x)} = 9\\left(\\frac{\\sin 3x}{3x}\\right)^2 \\frac{1}{1+\\cos 3x} \\to 9 \\cdot 1^2 \\cdot \\frac{1}{2} = \\frac{9}{2}$。',
  },
  {
    id: 'd-ch1-6',
    chapterId: 'ch1',
    topicId: 'ch1-3',
    tag: '自然対数の底 e',
    difficulty: '定期テスト頻出',
    prompt: '極限 $$\\lim_{x \\to \\infty} \\left(1 - \\frac{2}{x}\\right)^x$$ の値を求めよ。',
    choices: ['$e^2$', '$e^{-2}$', '$e^{-1/2}$', '$1$'],
    correctIndex: 1,
    hint1: 'カッコの中は $1 + \\left(-\\frac{2}{x}\\right)$。逆数ペア $-\\frac{x}{2}$ を指数に作ろう。',
    hint2: '$\\left\\{\\left(1 + \\frac{-2}{x}\\right)^{-\\frac{x}{2}}\\right\\}^{-2}$ と変形できる。',
    solution: '$t = -\\frac{x}{2}$ とおくと $t \\to -\\infty$ で $(1+\\frac{1}{t})^t \\to e$ となるため、与式 $= e^{-2}$。',
  },
  {
    id: 'd-ch1-7',
    chapterId: 'ch1',
    topicId: 'ch1-3',
    tag: '対数の極限',
    difficulty: '標準',
    prompt: '極限 $$\\lim_{x \\to 0} \\frac{\\log(1 + 5x)}{2x}$$ の値を求めよ。',
    choices: ['$\\dfrac{5}{2}$', '$\\dfrac{2}{5}$', '$\\log\\dfrac{5}{2}$', '$1$'],
    correctIndex: 0,
    hint1: '$\\lim_{t \\to 0} \\frac{\\log(1+t)}{t} = 1$ の形に揃える。',
    hint2: '$\\frac{\\log(1 + 5x)}{5x} \\cdot \\frac{5}{2}$ と変形する。',
    solution: '$5x = t$ とおくと $t \\to 0$ より $\\lim_{t\\to 0}\\frac{\\log(1+t)}{t} \\cdot \\frac{5}{2} = \\frac{5}{2}$。',
  },

  // ===== Chapter 2: 微分法 =====
  {
    id: 'd-ch2-1',
    chapterId: 'ch2',
    topicId: 'ch2-2',
    tag: '合成関数の微分',
    difficulty: '基礎',
    prompt: '関数 $y = \\sqrt{3x^2 + 1}$ の導関数 $y\'$ を求めよ。',
    choices: [
      '$\\dfrac{3x}{\\sqrt{3x^2 + 1}}$',
      '$\\dfrac{1}{2\\sqrt{3x^2 + 1}}$',
      '$\\dfrac{6x}{\\sqrt{3x^2 + 1}}$',
      '$\\dfrac{3}{2\\sqrt{3x^2 + 1}}$',
    ],
    correctIndex: 0,
    hint1: '$(\\sqrt{u})\' = \\frac{u\'}{2\\sqrt{u}}$ に当てはめよう。',
    hint2: '中身 $u = 3x^2 + 1$ の微分は $u\' = 6x$。分母の $2$ と約分する。',
    solution: '$y\' = \\frac{1}{2\\sqrt{3x^2+1}} \\cdot (3x^2+1)\' = \\frac{6x}{2\\sqrt{3x^2+1}} = \\frac{3x}{\\sqrt{3x^2+1}}$。',
  },
  {
    id: 'd-ch2-2',
    chapterId: 'ch2',
    topicId: 'ch2-2',
    tag: '商の微分',
    difficulty: '標準',
    prompt: '関数 $y = \\dfrac{x}{x^2 + 1}$ の導関数 $y\'$ を求めよ。',
    choices: [
      '$\\dfrac{1 - x^2}{(x^2 + 1)^2}$',
      '$\\dfrac{1 + x^2}{(x^2 + 1)^2}$',
      '$\\dfrac{x^2 - 1}{(x^2 + 1)^2}$',
      '$\\dfrac{1}{2x}$',
    ],
    correctIndex: 0,
    hint1: '商の微分 $\\left(\\frac{f}{g}\\right)\' = \\frac{f\'g - fg\'}{g^2}$ を使う。',
    hint2: '分子は $1 \\cdot (x^2 + 1) - x \\cdot 2x$。引き算の順番に注意！',
    solution: '$y\' = \\frac{1\\cdot(x^2+1) - x\\cdot(2x)}{(x^2+1)^2} = \\frac{1 - x^2}{(x^2+1)^2}$。',
  },
  {
    id: 'd-ch2-3',
    chapterId: 'ch2',
    topicId: 'ch2-3',
    tag: '積＋指数・三角の微分',
    difficulty: '定期テスト頻出',
    prompt: '関数 $y = e^{2x}\\cos x$ の導関数 $y\'$ を求めよ。',
    choices: [
      '$e^{2x}(2\\cos x - \\sin x)$',
      '$e^{2x}(2\\cos x + \\sin x)$',
      '$e^{2x}(\\cos x - \\sin x)$',
      '$-2e^{2x}\\sin x$',
    ],
    correctIndex: 0,
    hint1: '積の微分 $(fg)\' = f\'g + fg\'$ を使う。$(e^{2x})\' = 2e^{2x}$ に注意！',
    hint2: '$(\\cos x)\' = -\\sin x$ なので、2項目にマイナスが付く。',
    solution: '$y\' = 2e^{2x}\\cos x + e^{2x}(-\\sin x) = e^{2x}(2\\cos x - \\sin x)$。',
  },
  {
    id: 'd-ch2-4',
    chapterId: 'ch2',
    topicId: 'ch2-3',
    tag: '対数関数の微分',
    difficulty: '定期テスト頻出',
    prompt: '関数 $y = \\log\\left(x + \\sqrt{x^2 + 1}\\right)$ の導関数 $y\'$ を求めよ。',
    choices: [
      '$\\dfrac{1}{\\sqrt{x^2 + 1}}$',
      '$\\dfrac{1}{x + \\sqrt{x^2 + 1}}$',
      '$\\dfrac{x}{\\sqrt{x^2 + 1}}$',
      '$\\dfrac{2x}{x^2 + 1}$',
    ],
    correctIndex: 0,
    hint1: '$(\\log u)\' = \\frac{u\'}{u}$。まず $u\' = 1 + \\frac{x}{\\sqrt{x^2+1}}$ を通分してみよう！',
    hint2: '通分すると $u\' = \\frac{\\sqrt{x^2+1} + x}{\\sqrt{x^2+1}}$ となり、分子と分母の $u$ が丸ごと約分される！',
    solution: '$y\' = \\frac{1 + \\frac{x}{\\sqrt{x^2+1}}}{x + \\sqrt{x^2+1}} = \\frac{\\frac{\\sqrt{x^2+1}+x}{\\sqrt{x^2+1}}}{x + \\sqrt{x^2+1}} = \\frac{1}{\\sqrt{x^2+1}}$。超有名結果！',
  },
  {
    id: 'd-ch2-5',
    chapterId: 'ch2',
    topicId: 'ch2-3',
    tag: '三角関数の合成微分',
    difficulty: '基礎',
    prompt: '関数 $y = \\tan 3x$ の導関数 $y\'$ を求めよ。',
    choices: [
      '$\\dfrac{3}{\\cos^2 3x}$',
      '$\\dfrac{1}{\\cos^2 3x}$',
      '$\\dfrac{1}{3\\cos^2 3x}$',
      '$-\\dfrac{3}{\\sin^2 3x}$',
    ],
    correctIndex: 0,
    hint1: '$(\\tan u)\' = \\frac{u\'}{\\cos^2 u}$。',
    hint2: '中身 $3x$ の微分 $3$ を忘れずに掛ける。',
    solution: '$y\' = \\frac{1}{\\cos^2 3x} \\cdot (3x)\' = \\frac{3}{\\cos^2 3x}$。',
  },
  {
    id: 'd-ch2-6',
    chapterId: 'ch2',
    topicId: 'ch2-4',
    tag: '対数微分法',
    difficulty: '定期テスト頻出',
    prompt: '$x > 0$ で定義された関数 $y = x^{2x}$ の導関数 $y\'$ を求めよ。',
    choices: [
      '$2x^{2x}(\\log x + 1)$',
      '$2x \\cdot x^{2x-1}$',
      '$x^{2x}(\\log x + 2)$',
      '$2x^{2x}\\log x$',
    ],
    correctIndex: 0,
    hint1: '両辺の自然対数をとると $\\log y = 2x \\log x$。',
    hint2: '両辺を $x$ で微分すると $\\frac{y\'}{y} = 2\\log x + 2x \\cdot \\frac{1}{x} = 2(\\log x + 1)$。',
    solution: '$\\log y = 2x\\log x$ より $\\frac{y\'}{y} = 2\\log x + 2$。両辺に $y = x^{2x}$ を掛けて $y\' = 2x^{2x}(\\log x + 1)$。',
  },
  {
    id: 'd-ch2-7',
    chapterId: 'ch2',
    topicId: 'ch2-4',
    tag: '媒介変数微分',
    difficulty: '標準',
    prompt: '$x = t^2 + 1,\\ y = t^3 - 3t$ のとき、$t = 2$ における $\\dfrac{dy}{dx}$ の値を求めよ。',
    choices: ['$\\dfrac{9}{4}$', '$\\dfrac{4}{9}$', '$\\dfrac{3}{2}$', '$9$'],
    correctIndex: 0,
    hint1: '$\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}$ を使う。',
    hint2: '$\\frac{dx}{dt} = 2t$、$\\frac{dy}{dt} = 3t^2 - 3$ に $t = 2$ を代入する。',
    solution: '$\\frac{dy}{dx} = \\frac{3t^2 - 3}{2t}$。$t = 2$ を代入すると $\\frac{12 - 3}{4} = \\frac{9}{4}$。',
  },

  // ===== Chapter 3: 微分法の応用 =====
  {
    id: 'd-ch3-1',
    chapterId: 'ch3',
    topicId: 'ch3-1',
    tag: '接線の方程式',
    difficulty: '基礎',
    prompt: '曲線 $y = e^{x-1}$ 上の点 $(1, 1)$ における接線の方程式はどれか？',
    choices: ['$y = x$', '$y = ex - e + 1$', '$y = x + 1$', '$y = -x + 2$'],
    correctIndex: 0,
    hint1: '$y\' = e^{x-1}$ に接点の $x$ 座標 $1$ を代入して傾きを求めよう。',
    hint2: '傾きは $e^0 = 1$、通る点は $(1, 1)$。',
    solution: '$y\' = e^{x-1}$ より $x=1$ で傾き $1$。よって $y - 1 = 1(x - 1) \\implies y = x$。',
  },
  {
    id: 'd-ch3-2',
    chapterId: 'ch3',
    topicId: 'ch3-1',
    tag: '法線の方程式',
    difficulty: '標準',
    prompt: '曲線 $y = \\sin x$ 上の点 $(0, 0)$ における法線の方程式を求めよ。',
    choices: ['$y = -x$', '$y = x$', '$y = 0$', '$x = 0$'],
    correctIndex: 0,
    hint1: 'まず $(0, 0)$ での接線の傾き $f\'(0) = \\cos 0$ を求める。',
    hint2: '接線の傾きが $1$ なので、垂直な法線の傾きは $-1$。',
    solution: '$y\' = \\cos x$ より $x=0$ で接線の傾きは $1$。法線の傾きは $-1$ で原点を通るため $y = -x$。',
  },
  {
    id: 'd-ch3-3',
    chapterId: 'ch3',
    topicId: 'ch3-2',
    tag: '変曲点の座標',
    difficulty: '定期テスト頻出',
    prompt: '曲線 $y = x e^{-x}$ の変曲点の $x$ 座標はどれか？',
    choices: ['$x = 1$', '$x = 2$', '$x = 0$', '$x = e$'],
    correctIndex: 1,
    hint1: '$y\'$ と $y\'\'$ を計算して $y\'\' = 0$ となる点を探す。',
    hint2: '$y\' = (1-x)e^{-x}$、$y\'\' = (x-2)e^{-x}$。$x=2$ の前後で符号が負から正に変わる！',
    solution: '$y\'\' = (x-2)e^{-x} = 0 \\iff x = 2$。前後で符号が変わるため変曲点の $x$ 座標は $2$。',
  },
  {
    id: 'd-ch3-4',
    chapterId: 'ch3',
    topicId: 'ch3-2',
    tag: '極値と最大値',
    difficulty: '定期テスト頻出',
    prompt: '関数 $f(x) = \\dfrac{\\log x}{x}$ ($x > 0$) の最大値はどれか？',
    choices: ['$\\dfrac{1}{e}$', '$e$', '$1$', '$\\dfrac{2}{e^2}$'],
    correctIndex: 0,
    hint1: '$f\'(x) = \\frac{1 - \\log x}{x^2}$ の符号変化を調べる。',
    hint2: '$x = e$ で極大かつ最大になる。$f(e)$ を計算しよう。',
    solution: '$f\'(x)=0 \\iff x=e$。$0<x<e$ で増加、$x>e$ で減少より、最大値は $f(e) = \\frac{\\log e}{e} = \\frac{1}{e}$。',
  },
  {
    id: 'd-ch3-5',
    chapterId: 'ch3',
    topicId: 'ch3-3',
    tag: '実数解の個数',
    difficulty: '定期テスト頻出',
    prompt: '方程式 $x e^{-x} = k$ が**ちょうど2個**の異なる実数解をもつ定数 $k$ の範囲は？',
    choices: [
      '$0 < k < \\dfrac{1}{e}$',
      '$0 \\le k < \\dfrac{1}{e}$',
      '$k < \\dfrac{1}{e}$',
      '$k > \\dfrac{1}{e}$',
    ],
    correctIndex: 0,
    hint1: '$y = x e^{-x}$ の極大値は $\\frac{1}{e}$、$x \\to \\infty$ の漸近線は $y = 0$。',
    hint2: '$k = 0$ のとき交点は原点 $(0,0)$ の1個だけ！$0$ は含まない。',
    solution: '漸近線 $y = 0$ と極大値 $y = \\frac{1}{e}$ の間、すなわち $0 < k < \\frac{1}{e}$ のとき交点が2個になる。',
  },
  {
    id: 'd-ch3-6',
    chapterId: 'ch3',
    topicId: 'ch3-4',
    tag: '速度の大きさ（速さ）',
    difficulty: '標準',
    prompt: '座標が $x = 3\\cos 2t,\\ y = 3\\sin 2t$ で動く点の速さ $|\\vec{v}|$ はいくつか？',
    choices: ['$6$', '$3$', '$12$', '$3\\sqrt{2}$'],
    correctIndex: 0,
    hint1: '$\\frac{dx}{dt}$ と $\\frac{dy}{dt}$ を求め、$\\sqrt{(dx/dt)^2 + (dy/dt)^2}$ を計算する。',
    hint2: '$dx/dt = -6\\sin 2t,\\ dy/dt = 6\\cos 2t$。$\\sin^2 + \\cos^2 = 1$ を使おう。',
    solution: '$|\\vec{v}| = \\sqrt{(-6\\sin 2t)^2 + (6\\cos 2t)^2} = \\sqrt{36(\\sin^2 2t + \\cos^2 2t)} = 6$。',
  },

  // ===== Chapter 4: 積分法 =====
  {
    id: 'd-ch4-1',
    chapterId: 'ch4',
    topicId: 'ch4-1',
    tag: 'f\'(x)/f(x) 型積分',
    difficulty: '基礎',
    prompt: '不定積分 $$\\int \\frac{2x}{x^2 + 5}\\,dx$$ を求めよ（$C$ は積分定数）。',
    choices: [
      '$\\log(x^2 + 5) + C$',
      '$\\dfrac{1}{2}\\log(x^2 + 5) + C$',
      '$2\\log(x^2 + 5) + C$',
      '$-\\dfrac{2x}{(x^2 + 5)^2} + C$',
    ],
    correctIndex: 0,
    hint1: '分母 $x^2 + 5$ を微分するとちょうど分子 $2x$ になる！',
    hint2: '$\\int \\frac{f\'(x)}{f(x)}\\,dx = \\log|f(x)| + C$ を適用しよう。',
    solution: '$(x^2+5)\' = 2x$ かつ $x^2+5 > 0$ より、与式 $= \\log(x^2 + 5) + C$。',
  },
  {
    id: 'd-ch4-2',
    chapterId: 'ch4',
    topicId: 'ch4-1',
    tag: 'tan x の不定積分',
    difficulty: '定期テスト頻出',
    prompt: '不定積分 $$\\int \\tan x\\,dx$$ を求めよ（$C$ は積分定数）。',
    choices: [
      '$-\\log|\\cos x| + C$',
      '$\\log|\\cos x| + C$',
      '$\\dfrac{1}{\\cos^2 x} + C$',
      '$\\log|\\sin x| + C$',
    ],
    correctIndex: 0,
    hint1: '$\\tan x = \\frac{\\sin x}{\\cos x}$ と書き直し、分母 $\\cos x$ の微分が $-\\sin x$ であることに注目。',
    hint2: '$-\\int \\frac{(\\cos x)\'}{\\cos x}\\,dx$ の形になる！',
    solution: '$\\int \\frac{\\sin x}{\\cos x}\\,dx = -\\int \\frac{(\\cos x)\'}{\\cos x}\\,dx = -\\log|\\cos x| + C$。',
  },
  {
    id: 'd-ch4-3',
    chapterId: 'ch4',
    topicId: 'ch4-2',
    tag: '置換積分 (tan θ)',
    difficulty: '定期テスト頻出',
    prompt: '定積分 $$\\int_0^{\\sqrt{3}} \\frac{1}{x^2 + 3}\\,dx$$ の値を求めよ。',
    choices: ['$\\dfrac{\\pi}{4\\sqrt{3}}$', '$\\dfrac{\\pi}{3\\sqrt{3}}$', '$\\dfrac{\\pi}{4}$', '$\\dfrac{\\pi}{6}$'],
    correctIndex: 0,
    hint1: '$x = \\sqrt{3}\\tan\\theta$ と置換しよう。',
    hint2: '$dx = \\frac{\\sqrt{3}}{\\cos^2\\theta}\\,d\\theta$、$x: 0 \\to \\sqrt{3}$ で $\\theta: 0 \\to \\frac{\\pi}{4}$。',
    solution: '$x=\\sqrt{3}\\tan\\theta$ とおくと $\\int_0^{\\pi/4} \\frac{\\cos^2\\theta}{3} \\cdot \\frac{\\sqrt{3}}{\\cos^2\\theta}\\,d\\theta = \\frac{1}{\\sqrt{3}}\\cdot\\frac{\\pi}{4} = \\frac{\\pi}{4\\sqrt{3}}$。',
  },
  {
    id: 'd-ch4-4',
    chapterId: 'ch4',
    topicId: 'ch4-2',
    tag: '置換積分 (円の面積)',
    difficulty: '定期テスト頻出',
    prompt: '定積分 $$\\int_0^2 \\sqrt{4 - x^2}\\,dx$$ の値を求めよ。',
    choices: ['$\\pi$', '$2\\pi$', '$4\\pi$', '$\\dfrac{\\pi}{2}$'],
    correctIndex: 0,
    hint1: '$x = 2\\sin\\theta$ と置換してもよいが、$y = \\sqrt{4-x^2}$ は半径 $2$ の円の上半分！',
    hint2: '$0 \\le x \\le 2$ は半径 $2$ の四分円（円の $\\frac{1}{4}$）の面積と同じ。',
    solution: '半径 $2$ の四分円の面積なので $\\frac{1}{4} \\cdot \\pi \\cdot 2^2 = \\pi$（$x=2\\sin\\theta$ でも $\\int_0^{\\pi/2} 4\\cos^2\\theta\\,d\\theta = \\pi$）。',
  },
  {
    id: 'd-ch4-5',
    chapterId: 'ch4',
    topicId: 'ch4-3',
    tag: '部分積分 (x e^x)',
    difficulty: '基礎',
    prompt: '定積分 $$\\int_0^1 x e^x\\,dx$$ の値を求めよ。',
    choices: ['$1$', '$e - 1$', '$e$', '$e - 2$'],
    correctIndex: 0,
    hint1: '$x$ を微分側、$e^x$ を積分側にして部分積分する。',
    hint2: '$[x e^x]_0^1 - \\int_0^1 e^x\\,dx = e - (e - 1)$。',
    solution: '$[x e^x]_0^1 - [e^x]_0^1 = e - (e - 1) = 1$。とても綺麗な値になる超定番問題！',
  },
  {
    id: 'd-ch4-6',
    chapterId: 'ch4',
    topicId: 'ch4-3',
    tag: '部分積分 (log x)',
    difficulty: '定期テスト頻出',
    prompt: '定積分 $$\\int_1^e \\log x\\,dx$$ の値を求めよ。',
    choices: ['$1$', '$e - 1$', '$e$', '$0$'],
    correctIndex: 0,
    hint1: '$\\int \\log x\\,dx = x\\log x - x + C$ を使う。',
    hint2: '$[x\\log x - x]_1^e = (e\\cdot 1 - e) - (1\\cdot 0 - 1)$。',
    solution: '$[x\\log x - x]_1^e = (e - e) - (0 - 1) = 1$。',
  },
  {
    id: 'd-ch4-7',
    chapterId: 'ch4',
    topicId: 'ch4-4',
    tag: '三角関数の次数下げ',
    difficulty: '標準',
    prompt: '定積分 $$\\int_0^{\\frac{\\pi}{2}} \\sin^2 x\\,dx$$ の値を求めよ。',
    choices: ['$\\dfrac{\\pi}{4}$', '$\\dfrac{\\pi}{2}$', '$\\dfrac{1}{2}$', '$1$'],
    correctIndex: 0,
    hint1: '半角の公式 $\\sin^2 x = \\frac{1 - \\cos 2x}{2}$ で次数を下げよう。',
    hint2: '$\\left[\\frac{x}{2} - \\frac{\\sin 2x}{4}\\right]_0^{\\pi/2}$ を計算する。',
    solution: '$\\int_0^{\\pi/2} \\frac{1-\\cos 2x}{2}\\,dx = \\left[\\frac{x}{2} - \\frac{\\sin 2x}{4}\\right]_0^{\\pi/2} = \\frac{\\pi}{4}$。',
  },
  {
    id: 'd-ch4-8',
    chapterId: 'ch4',
    topicId: 'ch4-4',
    tag: '定積分で表された関数',
    difficulty: '定期テスト頻出',
    prompt: '$F(x) = \\int_0^{3x} \\cos(t^2)\\,dt$ のとき、$F\'(x)$ はどれか？',
    choices: [
      '$3\\cos(9x^2)$',
      '$\\cos(9x^2)$',
      '$\\cos(3x^2)$',
      '$3\\sin(9x^2)$',
    ],
    correctIndex: 0,
    hint1: '$\\frac{d}{dx}\\int_a^{g(x)} f(t)\\,dt = f(g(x)) \\cdot g\'(x)$。',
    hint2: '$t$ に $3x$ を代入して $\\cos((3x)^2)$、さらに $(3x)\' = 3$ を掛ける！',
    solution: '$F\'(x) = \\cos((3x)^2) \\cdot (3x)\' = 3\\cos(9x^2)$。',
  },

  // ===== Chapter 5: 積分法の応用 =====
  {
    id: 'd-ch5-1',
    chapterId: 'ch5',
    topicId: 'ch5-1',
    tag: '面積（横切り積分）',
    difficulty: '定期テスト頻出',
    prompt: '曲線 $y = \\log x$、$y$ 軸、および2直線 $y = 0, y = 1$ で囲まれた面積は？',
    choices: ['$e - 1$', '$1$', '$e$', '$e - 2$'],
    correctIndex: 0,
    hint1: '$x = e^y$ として $y$ 軸方向（横切り）で積分すると一瞬！',
    hint2: '$S = \\int_0^1 e^y\\,dy$ を計算しよう。',
    solution: '$S = \\int_0^1 e^y\\,dy = [e^y]_0^1 = e - 1$。',
  },
  {
    id: 'd-ch5-2',
    chapterId: 'ch5',
    topicId: 'ch5-2',
    tag: 'x軸回転体の体積',
    difficulty: '基礎',
    prompt: '曲線 $y = \\sqrt{x}$ ($0 \\le x \\le 2$) と $x$ 軸、直線 $x = 2$ で囲まれた部分を $x$ 軸まわりに1回転した体積 $V$ は？',
    choices: ['$2\\pi$', '$4\\pi$', '$\\pi$', '$\\dfrac{4\\sqrt{2}}{3}\\pi$'],
    correctIndex: 0,
    hint1: '$V = \\pi \\int_0^2 y^2\\,dx$ の公式に当てはめる。',
    hint2: '$y^2 = x$ なので $\\pi \\int_0^2 x\\,dx$。',
    solution: '$V = \\pi \\int_0^2 (\\sqrt{x})^2\\,dx = \\pi\\left[\\frac{x^2}{2}\\right]_0^2 = 2\\pi$。',
  },
  {
    id: 'd-ch5-3',
    chapterId: 'ch5',
    topicId: 'ch5-2',
    tag: 'y軸回転体の体積',
    difficulty: '定期テスト頻出',
    prompt: '曲線 $y = x^2$ ($x \\ge 0$) と $y$ 軸、直線 $y = 3$ で囲まれた部分を $y$ 軸まわりに1回転した体積 $V$ は？',
    choices: ['$\\dfrac{9}{2}\\pi$', '$9\\pi$', '$3\\pi$', '$\\dfrac{27}{5}\\pi$'],
    correctIndex: 0,
    hint1: '$y$ 軸回転の公式は $V = \\pi \\int_0^3 x^2\\,dy$。',
    hint2: '曲線の方程式より $x^2 = y$ をそのまま代入できる！',
    solution: '$V = \\pi \\int_0^3 x^2\\,dy = \\pi \\int_0^3 y\\,dy = \\pi\\left[\\frac{y^2}{2}\\right]_0^3 = \\frac{9}{2}\\pi$。',
  },
  {
    id: 'd-ch5-4',
    chapterId: 'ch5',
    topicId: 'ch5-2',
    tag: '2曲線間の回転体',
    difficulty: '定期テスト頻出',
    prompt: '$y = x$ と $y = x^2$ で囲まれた部分を $x$ 軸まわりに1回転した体積 $V$ は？',
    choices: ['$\\dfrac{2}{15}\\pi$', '$\\dfrac{1}{30}\\pi$', '$\\dfrac{1}{6}\\pi$', '$\\dfrac{1}{3}\\pi$'],
    correctIndex: 0,
    hint1: 'ドーナツ型断面なので $\\pi(x - x^2)^2$ ではなく $\\pi(x^2 - (x^2)^2)$！',
    hint2: '$V = \\pi \\int_0^1 (x^2 - x^4)\\,dx$ を計算する。',
    solution: '$V = \\pi\\left[\\frac{x^3}{3} - \\frac{x^5}{5}\\right]_0^1 = \\pi\\left(\\frac{1}{3} - \\frac{1}{5}\\right) = \\frac{2}{15}\\pi$。',
  },
  {
    id: 'd-ch5-5',
    chapterId: 'ch5',
    topicId: 'ch5-3',
    tag: '曲線の長さ',
    difficulty: '標準',
    prompt: '媒介変数 $x = 2\\cos t,\\ y = 2\\sin t$ ($0 \\le t \\le \\pi$) で表される曲線の長さ $L$ は？',
    choices: ['$2\\pi$', '$4\\pi$', '$\\pi$', '$2$'],
    correctIndex: 0,
    hint1: '$L = \\int_0^\\pi \\sqrt{(dx/dt)^2 + (dy/dt)^2}\\,dt$（半径2の半円の弧長でもある）。',
    hint2: '$\\sqrt{(-2\\sin t)^2 + (2\\cos t)^2} = 2$。',
    solution: '$L = \\int_0^\\pi 2\\,dt = 2\\pi$。半径 $2$ の半円周 $2\\pi$ と一致！',
  },
  {
    id: 'd-ch5-6',
    chapterId: 'ch5',
    topicId: 'ch5-4',
    tag: '区分求積法',
    difficulty: '定期テスト頻出',
    prompt: '極限 $$\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{k=1}^{n} \\frac{1}{1 + \\frac{k}{n}}$$ の値を求めよ。',
    choices: ['$\\log 2$', '$1$', '$\\dfrac{1}{2}$', '$\\log 3$'],
    correctIndex: 0,
    hint1: '$\\frac{1}{n} \\to dx$、$\\frac{k}{n} \\to x$、区間 $[0, 1]$ で定積分に書き換える。',
    hint2: '$\\int_0^1 \\frac{1}{1 + x}\\,dx = [\\log(1 + x)]_0^1$。',
    solution: '区分求積法より $\\int_0^1 \\frac{1}{1+x}\\,dx = [\\log(1+x)]_0^1 = \\log 2 - \\log 1 = \\log 2$。',
  },
  {
    id: 'd-ch5-7',
    chapterId: 'ch5',
    topicId: 'ch5-4',
    tag: '区分求積法（区間拡張）',
    difficulty: '定期テスト頻出',
    prompt: '極限 $$\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{k=1}^{2n} \\left(\\frac{k}{n}\\right)^2$$ の値を求めよ。',
    choices: ['$\\dfrac{8}{3}$', '$\\dfrac{1}{3}$', '$\\dfrac{4}{3}$', '$2$'],
    correctIndex: 0,
    hint1: '$k$ が $1$ から $2n$ まで動くので、$\\frac{k}{n}$ は $0$ から $2$ まで動く！',
    hint2: '積分区間は $[0, 2]$。$\\int_0^2 x^2\\,dx$ を計算しよう。',
    solution: '区分求積法より $\\int_0^2 x^2\\,dx = \\left[\\frac{x^3}{3}\\right]_0^2 = \\frac{8}{3}$。',
  },
]

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffleChoices(correct: string, distractors: string[]): { choices: string[]; correctIndex: number } {
  const unique = [correct, ...distractors.filter((d) => d !== correct)].slice(0, 4)
  const indexed = unique.map((text, idx) => ({ text, isCorrect: idx === 0 }))
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[indexed[i], indexed[j]] = [indexed[j], indexed[i]]
  }
  return {
    choices: indexed.map((x) => x.text),
    correctIndex: indexed.findIndex((x) => x.isCorrect),
  }
}

/** Generates fresh randomized Math III calculation drills for endless practice */
export function generateDynamicDrills(count = 6): DrillQuestion[] {
  const generators: Array<(idx: number) => DrillQuestion> = [
    // 1. Trig limit lim_{x->0} sin(ax)/(bx)
    (idx) => {
      const a = pickRandom([2, 3, 5, 6, 7])
      const b = pickRandom([2, 3, 4, 5].filter((v) => v !== a))
      const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y))
      const g = gcd(a, b)
      const num = a / g
      const den = b / g
      const ans = den === 1 ? `$${num}$` : `$\\dfrac{${num}}{${den}}$`
      const { choices, correctIndex } = shuffleChoices(ans, [
        num === 1 ? `$${den}$` : `$\\dfrac{${den}}{${num}}$`,
        `$1$`,
        `$${a * b}$`,
      ])
      return {
        id: `gen-lim-${Date.now()}-${idx}`,
        chapterId: 'ch1',
        topicId: 'ch1-2',
        tag: 'ランダム生成・極限',
        difficulty: '基礎',
        prompt: `極限 $$\\lim_{x \\to 0} \\frac{\\sin ${a}x}{${b}x}$$ の値を求めよ。`,
        choices,
        correctIndex,
        hint1: `分母を $${a}x$ に揃えて $\\frac{\\sin ${a}x}{${a}x}$ の塊を作ろう。`,
        hint2: `$\\frac{\\sin ${a}x}{${a}x} \\cdot \\frac{${a}}{${b}}$ に変形する。`,
        solution: `$\\lim_{x\\to 0}\\frac{\\sin ${a}x}{${a}x}\\cdot\\frac{${a}}{${b}} = 1 \\cdot \\frac{${a}}{${b}} = $ ${ans}。`,
        isGenerated: true,
      }
    },
    // 2. Chain rule derivative (e^{ax} sin(bx) or (ax+b)^n)
    (idx) => {
      const a = pickRandom([2, 3, 4, 5])
      const n = pickRandom([3, 4, 5])
      const b = pickRandom([1, 2, 3])
      const coef = a * n
      const ans = `$${coef}(${a}x + ${b})^{${n - 1}}$`
      const { choices, correctIndex } = shuffleChoices(ans, [
        `$${n}(${a}x + ${b})^{${n - 1}}$`,
        `$${coef}(${a}x + ${b})^{${n}}$`,
        `$${a}(${a}x + ${b})^{${n - 1}}$`,
      ])
      return {
        id: `gen-deriv-${Date.now()}-${idx}`,
        chapterId: 'ch2',
        topicId: 'ch2-2',
        tag: 'ランダム生成・合成微分',
        difficulty: '基礎',
        prompt: `関数 $y = (${a}x + ${b})^{${n}}$ の導関数 $y'$ を求めよ。`,
        choices,
        correctIndex,
        hint1: `外側の $u^{${n}}$ を微分して $${n}u^{${n - 1}}$、そこに中身の微分を掛ける。`,
        hint2: `中身 $(${a}x + ${b})' = ${a}$ を掛け忘れずに！`,
        solution: `$y' = ${n}(${a}x + ${b})^{${n - 1}} \\cdot (${a}x + ${b})' = ${coef}(${a}x + ${b})^{${n - 1}}$。`,
        isGenerated: true,
      }
    },
    // 3. Exponential derivative y = e^{ax}
    (idx) => {
      const a = pickRandom([2, 3, 4, 5])
      const k = pickRandom([2, 3])
      const ans = `$${a * k}e^{${a}x}$`
      const { choices, correctIndex } = shuffleChoices(ans, [
        `$${k}e^{${a}x}$`,
        `$\\dfrac{${k}}{${a}}e^{${a}x}$`,
        `$${a * k}e^{${a - 1}x}$`,
      ])
      return {
        id: `gen-exp-${Date.now()}-${idx}`,
        chapterId: 'ch2',
        topicId: 'ch2-3',
        tag: 'ランダム生成・指数微分',
        difficulty: '基礎',
        prompt: `関数 $y = ${k}e^{${a}x}$ の導関数 $y'$ を求めよ。`,
        choices,
        correctIndex,
        hint1: `$(e^{u})' = u' e^{u}$ を使おう。`,
        hint2: `指数 $${a}x$ の微分 $${a}$ が前に飛び出す。`,
        solution: `$y' = ${k} \\cdot ${a}e^{${a}x} = ${a * k}e^{${a}x}$。`,
        isGenerated: true,
      }
    },
    // 4. Integral of cos(ax) or sin(ax)
    (idx) => {
      const a = pickRandom([2, 3, 4, 5])
      const ans = `$\\dfrac{1}{${a}}\\sin ${a}x + C$`
      const { choices, correctIndex } = shuffleChoices(ans, [
        `$-\\dfrac{1}{${a}}\\sin ${a}x + C$`,
        `$${a}\\sin ${a}x + C$`,
        `$\\sin ${a}x + C$`,
      ])
      return {
        id: `gen-inttrig-${Date.now()}-${idx}`,
        chapterId: 'ch4',
        topicId: 'ch4-1',
        tag: 'ランダム生成・三角積分',
        difficulty: '基礎',
        prompt: `不定積分 $$\\int \\cos ${a}x\\,dx$$ を求めよ（$C$ は積分定数）。`,
        choices,
        correctIndex,
        hint1: `微分して $\\cos ${a}x$ になる関数を考える（符号はプラス）。`,
        hint2: `$(\\sin ${a}x)' = ${a}\\cos ${a}x$ なので、前に $\\frac{1}{${a}}$ を付けて打ち消す。`,
        solution: `$\\int \\cos ${a}x\\,dx = \\frac{1}{${a}}\\sin ${a}x + C$。`,
        isGenerated: true,
      }
    },
    // 5. Integral f'(x)/f(x) with linear denominator
    (idx) => {
      const a = pickRandom([2, 3, 4, 5])
      const b = pickRandom([1, 3, 5])
      const ans = `$\\dfrac{1}{${a}}\\log|${a}x + ${b}| + C$`
      const { choices, correctIndex } = shuffleChoices(ans, [
        `$\\log|${a}x + ${b}| + C$`,
        `$${a}\\log|${a}x + ${b}| + C$`,
        `$-\\dfrac{1}{(${a}x + ${b})^2} + C$`,
      ])
      return {
        id: `gen-intlog-${Date.now()}-${idx}`,
        chapterId: 'ch4',
        topicId: 'ch4-1',
        tag: 'ランダム生成・対数積分',
        difficulty: '標準',
        prompt: `不定積分 $$\\int \\frac{1}{${a}x + ${b}}\\,dx$$ を求めよ（$C$ は積分定数）。`,
        choices,
        correctIndex,
        hint1: `分母が1次式 $(ax+b)$ のときは $\\frac{1}{a}\\log|ax+b| + C$！`,
        hint2: `微分すると $\\frac{1}{${a}}\\cdot\\frac{${a}}{${a}x+${b}} = \\frac{1}{${a}x+${b}}$ で元に戻るか検算しよう。`,
        solution: `中身が1次式なので $\\frac{1}{${a}}$ を掛けて $\\frac{1}{${a}}\\log|${a}x + ${b}| + C$。`,
        isGenerated: true,
      }
    },
    // 6. Solid of revolution V = pi * int_0^b (sqrt(kx))^2 dx = pi * k * b^2 / 2
    (idx) => {
      const k = pickRandom([2, 4, 6])
      const b = pickRandom([1, 2, 3])
      const vCoef = (k * b * b) / 2
      const ans = `$${vCoef}\\pi$`
      const { choices, correctIndex } = shuffleChoices(ans, [
        `$${vCoef * 2}\\pi$`,
        `$${vCoef}$`,
        `$${k * b}\\pi$`,
      ])
      return {
        id: `gen-vol-${Date.now()}-${idx}`,
        chapterId: 'ch5',
        topicId: 'ch5-2',
        tag: 'ランダム生成・回転体体積',
        difficulty: '標準',
        prompt: `曲線 $y = \\sqrt{${k}x}$ と $x$ 軸、直線 $x = ${b}$ で囲まれた部分を $x$ 軸まわりに1回転した体積 $V$ は？`,
        choices,
        correctIndex,
        hint1: `$x$ 軸回転体の公式 $V = \\pi \\int_0^{${b}} y^2\\,dx$ を使う。`,
        hint2: `$y^2 = ${k}x$ なので $\\pi \\left[${k / 2}x^2\\right]_0^{${b}}$ を計算する。`,
        solution: `$V = \\pi \\int_0^{${b}} ${k}x\\,dx = \\pi\\left[${k / 2}x^2\\right]_0^{${b}} = ${vCoef}\\pi$。`,
        isGenerated: true,
      }
    },
  ]

  return Array.from({ length: count }, (_, idx) => generators[idx % generators.length](idx))
}
