import { Boot, FLAT, S, SHOE, SOLE, pair, shaft } from '../art/garments';
import { Motif } from '../art/motifs';
import { OUTLINE, shade } from '../art/palette';
import { bolt, paw, shell, starPoints } from '../art/shapes';
import type { Item } from '../types';
import { PRINCESSES, RAINBOW_BANDS } from './themes';

export const SHOES: Item[] = [
  { id: 'none', name: 'Bare Feet', color: '#FFB3CB' },

  {
    id: 'witch',
    name: 'Witch Boots',
    theme: 'witch',
    color: '#7C5CD6',
    draw: ({ color }) =>
      pair(
        <g>
          <path d={shaft(336)} fill={color} {...S} />
          {/* curled pointed toe */}
          <path d="M 108 388 C 92 394 88 412 104 418 L 142 418 C 148 412 148 392 142 388 Z" fill={color} {...S} />
          <path d="M 96 414 C 82 412 82 398 92 396 C 88 404 90 410 100 410 Z" fill={color} {...S} strokeWidth={4} />
          <path d={SOLE} fill={shade(color, -28)} {...S} />
          <rect x={112} y={352} width={32} height={13} rx={3} fill="#FFD166" stroke={OUTLINE} strokeWidth={3.5} />
          <polygon points={starPoints(128, 344, 9)} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={2.6} />
        </g>,
      ),
  },

  {
    id: 'fairy',
    name: 'Leaf Slippers',
    theme: 'fairy',
    color: '#5FD3A6',
    draw: ({ color }) =>
      pair(
        <g>
          <path d={FLAT} fill={color} {...S} />
          <path d="M 110 396 C 116 382 132 378 142 384 C 138 396 124 402 112 400 Z" fill={shade(color, 14)} {...S} strokeWidth={3.5} />
          <path d="M 114 398 q 14 -10 26 -13" fill="none" stroke={shade(color, -22)} strokeWidth={3} />
          <path d="M 108 388 q -8 -14 4 -22" fill="none" stroke={shade(color, -10)} strokeWidth={5} strokeLinecap="round" />
          <circle cx={126} cy={410} r={4} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={2.4} />
        </g>,
      ),
  },

  {
    id: 'cat',
    name: 'Paw Boots',
    theme: 'cat',
    color: '#3A3040',
    draw: ({ color }) =>
      pair(
        <g>
          <Boot color={color} top={348} sole="#FF8FB1" />
          <path d={paw(127, 372, 15)} fill="#FF8FB1" stroke={OUTLINE} strokeWidth={2.6} />
        </g>,
      ),
  },

  {
    id: 'dog',
    name: 'Puppy Boots',
    theme: 'dog',
    color: '#C98A5B',
    draw: ({ color }) =>
      pair(
        <g>
          <Boot color={color} top={352} />
          <ellipse cx={128} cy={352} rx={22} ry={11} fill="#F6E3CE" {...S} />
          <path d={paw(127, 378, 13)} fill={shade(color, 24)} stroke={OUTLINE} strokeWidth={2.4} />
        </g>,
      ),
  },

  {
    id: 'gothic',
    name: 'Platform Boots',
    theme: 'gothic',
    color: '#2B2130',
    draw: ({ color }) =>
      pair(
        <g>
          <path d={shaft(310)} fill={color} {...S} />
          <path d={SHOE} fill={color} {...S} />
          <path d="M 104 406 C 94 408 94 424 108 426 L 144 426 C 150 424 150 408 144 406 Z" fill={shade(color, 22)} {...S} />
          {[322, 342, 362, 382].map((y) => (
            <g key={y} stroke="#A2437B" strokeWidth={3} strokeLinecap="round">
              <path d={`M 114 ${y} L 142 ${y + 8}`} />
              <path d={`M 142 ${y} L 114 ${y + 8}`} />
            </g>
          ))}
        </g>,
      ),
  },

  {
    id: 'mermaid',
    name: 'Shell Flats',
    theme: 'mermaid',
    color: '#45C4C0',
    draw: ({ color }) =>
      pair(
        <g>
          <path d={FLAT} fill={color} {...S} />
          <path d={shell(127, 394, 16)} fill="#FF9FC4" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
          <path d="M 110 412 q 8 6 16 0 q 8 6 16 0" fill="none" stroke={shade(color, -20)} strokeWidth={3} />
        </g>,
      ),
  },

  {
    id: 'unicorn',
    name: 'Unicorn Boots',
    theme: 'unicorn',
    color: '#C79BFF',
    draw: ({ color }) =>
      pair(
        <g>
          <path d={shaft(342)} fill={color} {...S} />
          <path d={SHOE} fill={color} {...S} />
          <path d={SOLE} fill="#FFFFFF" {...S} />
          {RAINBOW_BANDS.slice(0, 4).map((c, i) => (
            <path key={c} d={`M 112 ${352 + i * 9} L 144 ${352 + i * 9}`} stroke={c} strokeWidth={6} strokeLinecap="round" />
          ))}
          <polygon points={starPoints(128, 392, 10)} fill="#FFD166" stroke={OUTLINE} strokeWidth={2.6} />
        </g>,
      ),
  },

  {
    id: 'ballerina',
    name: 'Pointe Shoes',
    theme: 'ballerina',
    color: '#FFC2D4',
    draw: ({ color }) =>
      pair(
        <g>
          <path d={FLAT} fill={color} {...S} />
          <path d="M 116 340 L 122 396 M 140 340 L 134 396" stroke={color} strokeWidth={6} strokeLinecap="round" />
          <path d="M 116 340 L 122 396 M 140 340 L 134 396" stroke={shade(color, -18)} strokeWidth={2} opacity={0.6} />
          <path d="M 118 364 L 138 358" stroke={color} strokeWidth={6} strokeLinecap="round" />
          <path d="M 120 396 q 8 -10 16 0" fill="none" stroke={shade(color, -18)} strokeWidth={3.5} />
        </g>,
      ),
  },

  {
    id: 'hero',
    name: 'Hero Boots',
    theme: 'hero',
    color: '#FF4F5A',
    draw: ({ color }) =>
      pair(
        <g>
          <path d={shaft(338)} fill={color} {...S} />
          <path d={SHOE} fill={color} {...S} />
          <path d={SOLE} fill="#4F8CFF" {...S} />
          <path d="M 108 338 L 148 338 L 144 356 L 112 356 Z" fill="#4F8CFF" {...S} />
          <path d={bolt(128, 382, 13)} fill="#FFD166" stroke={OUTLINE} strokeWidth={2.6} />
        </g>,
      ),
  },

  {
    id: 'bunny',
    name: 'Bunny Slippers',
    theme: 'bunny',
    color: '#FFFFFF',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 104 396 C 92 400 92 416 108 420 L 142 420 C 150 416 150 398 142 396 Z" fill={color} {...S} />
          <ellipse cx={116} cy={378} rx={7} ry={16} fill={color} {...S} strokeWidth={4} />
          <ellipse cx={134} cy={376} rx={7} ry={16} fill={color} {...S} strokeWidth={4} />
          <ellipse cx={116} cy={379} rx={3} ry={10} fill="#FFB3CB" />
          <ellipse cx={134} cy={377} rx={3} ry={10} fill="#FFB3CB" />
          <circle cx={119} cy={404} r={3} fill={OUTLINE} />
          <circle cx={133} cy={404} r={3} fill={OUTLINE} />
          <path d="M 122 412 l 4 3 l 4 -3" fill="none" stroke="#FF8FB1" strokeWidth={3} strokeLinecap="round" />
        </g>,
      ),
  },

  // Royal heels: one shape, six palettes and emblems.
  ...PRINCESSES.map<Item>((p) => ({
    id: `heels-${p.id}`,
    name: `${p.name} Heels`,
    theme: p.id,
    color: p.color,
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 100 400 C 92 406 96 416 110 416 L 140 416 C 148 412 148 396 140 392 Z" fill={color} {...S} />
          <path d="M 138 414 L 138 428 L 148 428 L 146 412 Z" fill={p.trim} {...S} />
          <Motif kind={p.motif} x={120} y={400} r={11} color={p.gem} width={2.4} />
        </g>,
      ),
  })),
];
