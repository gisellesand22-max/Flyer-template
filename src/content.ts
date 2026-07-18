export type Bg = 'green' | 'cream';
export type Variant = 'normal' | 'emphasis' | 'big';

export type Segment = {text: string; variant?: Variant};
export type Line = Segment[];

export type StatementScene = {
  kind: 'statement';
  bg: Bg;
  durationInFrames: number;
  lines: Line[];
};

export type WordCycleScene = {
  kind: 'wordCycle';
  bg: Bg;
  durationInFrames: number;
  words: string[];
};

export type CtaScene = {
  kind: 'cta';
  bg: Bg;
  durationInFrames: number;
  text: string;
};

export type Scene = StatementScene | WordCycleScene | CtaScene;

// 30fps, total = 600 frames = 20s
export const SCENES: Scene[] = [
  {
    kind: 'statement',
    bg: 'green',
    durationInFrames: 60,
    lines: [
      [{text: 'We asked'}],
      [{text: '10', variant: 'big'}, {text: ' Canadians'}],
      [{text: 'how much their life insurance costs.'}],
    ],
  },
  {
    kind: 'statement',
    bg: 'cream',
    durationInFrames: 60,
    lines: [
      [{text: '8', variant: 'big'}, {text: ' of them'}],
      [{text: 'were overpaying.', variant: 'emphasis'}],
    ],
  },
  {
    kind: 'statement',
    bg: 'green',
    durationInFrames: 45,
    lines: [[{text: '...and had no idea.'}]],
  },
  {
    kind: 'statement',
    bg: 'cream',
    durationInFrames: 75,
    lines: [
      [{text: 'Rates vary '}, {text: 'significantly', variant: 'emphasis'}],
      [{text: 'across insurers —'}],
      [{text: 'for the '}, {text: 'exact same coverage', variant: 'emphasis'}, {text: '.'}],
    ],
  },
  {
    kind: 'statement',
    bg: 'green',
    durationInFrames: 45,
    lines: [[{text: 'Most people'}], [{text: 'never find out.', variant: 'emphasis'}]],
  },
  {
    kind: 'statement',
    bg: 'cream',
    durationInFrames: 60,
    lines: [[{text: 'Introducing a'}], [{text: 'free calculator.', variant: 'emphasis'}]],
  },
  {
    kind: 'wordCycle',
    bg: 'green',
    durationInFrames: 60,
    words: ['YOUR AGE', 'YOUR COVERAGE', 'YOUR PROVINCE'],
  },
  {
    kind: 'statement',
    bg: 'cream',
    durationInFrames: 60,
    lines: [
      [{text: '15+', variant: 'big'}, {text: ' Canadian insurers'}],
      [{text: 'Real quotes.'}],
      [{text: 'Side by side.', variant: 'emphasis'}],
    ],
  },
  {
    kind: 'wordCycle',
    bg: 'green',
    durationInFrames: 60,
    words: ['FREE', '60 SECONDS', 'NO MEDICAL EXAM'],
  },
  {
    kind: 'statement',
    bg: 'cream',
    durationInFrames: 45,
    lines: [[{text: 'Coverage from'}], [{text: '$29', variant: 'big'}, {text: ' /month'}]],
  },
  {
    kind: 'cta',
    bg: 'green',
    durationInFrames: 30,
    text: 'Try our calculator',
  },
];
