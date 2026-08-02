import type { ReactNode } from 'react';
import { OUTLINE, shade } from '../art/palette';
import { heartPath, starPoints } from '../art/shapes';
import type { Item } from '../types';

const S = { stroke: OUTLINE, strokeWidth: 5, strokeLinejoin: 'round' as const };

/** Shoes are drawn once for the left foot, then mirrored across the doll. */
function pair(art: ReactNode): ReactNode {
  return (
    <g>
      {art}
      <g transform="translate(300 0) scale(-1 1)">{art}</g>
    </g>
  );
}

const SHOE = 'M 108 388 C 96 394 96 412 110 418 L 142 418 C 148 412 148 392 142 388 Z';
const SOLE = 'M 106 408 C 96 410 98 418 110 420 L 142 420 C 148 418 148 410 142 408 Z';

export const SHOES: Item[] = [
  { id: 'none', name: 'Bare Feet', color: '#FFB3CB' },

  {
    id: 'sneakers',
    name: 'Sneakers',
    color: '#FF5C8A',
    draw: ({ color }) =>
      pair(
        <g>
          <path d={SHOE} fill={color} {...S} />
          <path d={SOLE} fill="#FFFFFF" {...S} />
          <path d="M 116 394 l 20 6 M 116 402 l 20 6" stroke="#FFFFFF" strokeWidth={4.5} strokeLinecap="round" />
        </g>,
      ),
  },

  {
    id: 'flats',
    name: 'Ballet Flats',
    color: '#FF9FC4',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 106 396 C 96 400 96 414 110 418 L 142 418 C 148 414 148 398 142 396 Z" fill={color} {...S} />
          <path d="M 124 396 C 116 390 110 396 116 400 C 121 402 124 399 126 397 Z" fill={shade(color, -14)} {...S} strokeWidth={3} />
          <path d="M 128 396 C 136 390 142 396 136 400 C 131 402 128 399 126 397 Z" fill={shade(color, -14)} {...S} strokeWidth={3} />
          <circle cx={126} cy={397} r={3.5} fill={shade(color, -14)} stroke={OUTLINE} strokeWidth={2.5} />
        </g>,
      ),
  },

  {
    id: 'maryjanes',
    name: 'Mary Janes',
    color: '#6B5B73',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 106 396 C 96 400 96 414 110 418 L 142 418 C 148 414 148 398 142 396 Z" fill={color} {...S} />
          <path d="M 110 396 L 142 396" stroke={shade(color, 25)} strokeWidth={6} strokeLinecap="round" />
          <circle cx={140} cy={396} r={5} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3} />
        </g>,
      ),
  },

  {
    id: 'boots',
    name: 'Boots',
    color: '#B98CFF',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 110 344 L 146 344 L 146 396 L 110 396 Z" fill={color} {...S} />
          <path d={SHOE} fill={color} {...S} />
          <path d={SOLE} fill={shade(color, -25)} {...S} />
          <path d="M 110 352 L 146 352" stroke={shade(color, -18)} strokeWidth={5} />
        </g>,
      ),
  },

  {
    id: 'starboots',
    name: 'Star Boots',
    color: '#7C8CF8',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 110 340 L 146 340 L 146 396 L 110 396 Z" fill={color} {...S} />
          <path d={SHOE} fill={color} {...S} />
          <path d={SOLE} fill="#FFFFFF" {...S} />
          <polygon points={starPoints(128, 364, 15)} fill="#FFD166" stroke={OUTLINE} strokeWidth={3.5} />
        </g>,
      ),
  },

  {
    id: 'rainboots',
    name: 'Rain Boots',
    color: '#FFD166',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 108 316 L 148 316 L 148 396 L 108 396 Z" fill={color} {...S} />
          <path d={SHOE} fill={color} {...S} />
          <path d={SOLE} fill={shade(color, -30)} {...S} />
          <path d="M 108 328 L 148 328" stroke={shade(color, -20)} strokeWidth={6} />
          <circle cx={128} cy={356} r={8} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3.5} />
        </g>,
      ),
  },

  {
    id: 'winterboots',
    name: 'Snow Boots',
    color: '#FF7FA8',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 110 340 L 146 340 L 146 396 L 110 396 Z" fill={color} {...S} />
          <path d={SHOE} fill={color} {...S} />
          <path d={SOLE} fill={shade(color, -25)} {...S} />
          <ellipse cx={128} cy={340} rx={22} ry={12} fill="#FFFFFF" {...S} />
        </g>,
      ),
  },

  {
    id: 'sandals',
    name: 'Sandals',
    color: '#FF9E6D',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 104 406 C 96 408 98 420 110 421 L 142 421 C 150 419 150 408 142 406 Z" fill={color} {...S} />
          <path d="M 112 406 L 134 394" stroke={color} strokeWidth={8} strokeLinecap="round" />
          <path d="M 124 406 L 142 396" stroke={color} strokeWidth={8} strokeLinecap="round" />
          <path d={heartPath(130, 398, 9)} fill="#FF5C8A" stroke={OUTLINE} strokeWidth={3} />
        </g>,
      ),
  },

  {
    id: 'flipflops',
    name: 'Flip Flops',
    color: '#5FD3A6',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 104 408 C 96 410 98 421 110 422 L 142 422 C 150 420 150 409 142 408 Z" fill={color} {...S} />
          <path d="M 116 408 L 132 398 L 144 408" fill="none" stroke="#FFFFFF" strokeWidth={7} strokeLinecap="round" />
          <circle cx={132} cy={398} r={5} fill="#FFD166" stroke={OUTLINE} strokeWidth={3} />
        </g>,
      ),
  },

  {
    id: 'heels',
    name: 'Party Heels',
    color: '#F27CD0',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 100 400 C 92 406 96 416 110 416 L 140 416 C 148 412 148 396 140 392 Z" fill={color} {...S} />
          <path d="M 138 414 L 138 426 L 148 426 L 146 412 Z" fill={shade(color, -20)} {...S} />
          <polygon points={starPoints(120, 400, 9)} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3} />
        </g>,
      ),
  },

  {
    id: 'slippers',
    name: 'Fluffy Slippers',
    color: '#FFB3CB',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 104 398 C 94 402 94 416 108 420 L 142 420 C 150 416 150 400 142 398 Z" fill={color} {...S} />
          <circle cx={124} cy={394} r={13} fill={shade(color, 12)} {...S} />
          <circle cx={140} cy={396} r={9} fill={shade(color, 12)} {...S} />
        </g>,
      ),
  },

  {
    id: 'skates',
    name: 'Roller Skates',
    color: '#FFFFFF',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 110 348 L 146 348 L 146 396 L 110 396 Z" fill={color} {...S} />
          <path d={SHOE} fill={color} {...S} />
          <path d="M 102 414 L 148 414 L 148 422 L 102 422 Z" fill="#FF5C8A" {...S} />
          <circle cx={112} cy={428} r={9} fill="#FFD166" {...S} />
          <circle cx={140} cy={428} r={9} fill="#FFD166" {...S} />
          <path d="M 114 356 l 20 4 M 114 366 l 20 4" stroke="#FF7FA8" strokeWidth={4.5} strokeLinecap="round" />
        </g>,
      ),
  },

  {
    id: 'clogs',
    name: 'Garden Clogs',
    color: '#B8E986',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 104 392 C 94 398 94 414 108 420 L 142 420 C 150 414 150 392 142 392 Z" fill={color} {...S} />
          <circle cx={116} cy={400} r={4} fill={shade(color, -22)} />
          <circle cx={130} cy={398} r={4} fill={shade(color, -22)} />
          <circle cx={124} cy={410} r={4} fill={shade(color, -22)} />
          <path d="M 102 414 L 148 414" stroke={shade(color, -22)} strokeWidth={5} />
        </g>,
      ),
  },
];
