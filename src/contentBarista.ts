import {Bg, Line} from './content';
import {IconName} from './components/IconBadge';

export type BaristaScene =
  | {
      kind: 'icon-statement';
      bg: Bg;
      durationInFrames: number;
      icon: IconName;
      lines: Line[];
      strikeFirstLine?: boolean;
    }
  | {
      kind: 'cta';
      bg: Bg;
      durationInFrames: number;
      icon?: IconName;
      text: string;
    };

// 30fps, total = 600 frames = 20s
export const BARISTA_SCENES: BaristaScene[] = [
  {
    kind: 'icon-statement',
    bg: 'green',
    durationInFrames: 90,
    icon: 'coffee',
    lines: [[{text: 'barista for tax advice?'}]],
    strikeFirstLine: true,
  },
  {
    kind: 'icon-statement',
    bg: 'cream',
    durationInFrames: 90,
    icon: 'bank',
    lines: [[{text: 'bank for life insurance?'}]],
  },
  {
    kind: 'icon-statement',
    bg: 'green',
    durationInFrames: 90,
    icon: 'policy',
    lines: [[{text: 'SOLD.', variant: 'emphasis'}], [{text: 'NOT ADVISED.', variant: 'emphasis'}]],
  },
  {
    kind: 'icon-statement',
    bg: 'cream',
    durationInFrames: 90,
    icon: 'magnifier',
    lines: [[{text: 'For taxes, you go to a'}], [{text: 'specialist.', variant: 'emphasis'}]],
  },
  {
    kind: 'icon-statement',
    bg: 'green',
    durationInFrames: 105,
    icon: 'shield',
    lines: [
      [{text: 'Do the same for life insurance.'}],
      [{text: 'Use a local advisor —'}],
      [{text: 'trusted and recommended.', variant: 'emphasis'}],
    ],
  },
  {
    kind: 'icon-statement',
    bg: 'cream',
    durationInFrames: 60,
    icon: 'cursor',
    lines: [[{text: 'You know where to click.'}]],
  },
  {
    kind: 'cta',
    bg: 'green',
    durationInFrames: 75,
    icon: 'arrow',
    text: 'Try our free calculator',
  },
];
