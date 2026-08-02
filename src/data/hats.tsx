import { S } from '../art/garments';
import { OUTLINE, shade } from '../art/palette';
import { bat, bolt, flower, shell, starPoints } from '../art/shapes';
import { Motif } from '../art/motifs';
import type { Item } from '../types';
import { PRINCESSES } from './themes';

// Headwear sits on a skull that spans x 92-208, top y 36.

export const HATS: Item[] = [
  { id: 'none', name: 'No Hat', color: '#FFB3CB' },

  {
    id: 'witch',
    name: 'Witch Hat',
    theme: 'witch',
    color: '#7C5CD6',
    draw: ({ color }) => (
      <g>
        <ellipse cx={150} cy={70} rx={94} ry={23} fill={color} {...S} />
        <path d="M 112 66 C 126 -2 156 -12 182 8 C 172 32 182 52 190 68 Q 150 82 112 66 Z" fill={shade(color, 8)} {...S} />
        <path d="M 116 56 Q 152 70 188 56 L 190 68 Q 150 82 112 66 Z" fill={shade(color, -20)} {...S} />
        <rect x={144} y={58} width={16} height={13} rx={3} fill="#FFD166" stroke={OUTLINE} strokeWidth={3.5} />
        <polygon points={starPoints(162, 30, 11)} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3} />
      </g>
    ),
  },

  {
    id: 'fairy',
    name: 'Flower Crown',
    theme: 'fairy',
    color: '#5FD3A6',
    draw: ({ color }) => (
      <g>
        <path d="M 94 84 Q 150 44 206 84" fill="none" stroke={color} strokeWidth={11} strokeLinecap="round" />
        {[
          [100, 78],
          [122, 60],
          [150, 52],
          [178, 60],
          [200, 78],
        ].map(([x, y], i) => (
          <g key={i}>
            <path d={flower(x, y, 15)} fill={i % 2 ? '#FFB3CB' : '#FFFFFF'} {...S} strokeWidth={4} />
            <circle cx={x} cy={y} r={5} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3} />
          </g>
        ))}
      </g>
    ),
  },

  {
    id: 'cat',
    name: 'Cat Ears',
    theme: 'cat',
    color: '#3A3040',
    draw: ({ color }) => (
      <g>
        <path d="M 100 62 L 106 8 L 150 44 Z" fill={color} {...S} />
        <path d="M 200 62 L 194 8 L 150 44 Z" fill={color} {...S} />
        <path d="M 112 52 L 114 26 L 138 44 Z" fill="#FF8FB1" stroke={OUTLINE} strokeWidth={3.5} />
        <path d="M 188 52 L 186 26 L 162 44 Z" fill="#FF8FB1" stroke={OUTLINE} strokeWidth={3.5} />
      </g>
    ),
  },

  {
    id: 'dog',
    name: 'Puppy Ears',
    theme: 'dog',
    color: '#C98A5B',
    draw: ({ color }) => (
      <g>
        <path d="M 96 92 Q 150 40 204 92" fill="none" stroke={shade(color, -14)} strokeWidth={12} strokeLinecap="round" />
        <path d="M 100 70 C 68 82 62 140 84 164 C 108 168 116 120 114 84 Z" fill={color} {...S} />
        <path d="M 200 70 C 232 82 238 140 216 164 C 192 168 184 120 186 84 Z" fill={color} {...S} />
        <path d="M 100 92 C 82 104 80 138 92 152 C 104 150 108 118 108 96 Z" fill={shade(color, 16)} />
        <path d="M 200 92 C 218 104 220 138 208 152 C 196 150 192 118 192 96 Z" fill={shade(color, 16)} />
      </g>
    ),
  },

  {
    id: 'gothic',
    name: 'Bat Clip',
    theme: 'gothic',
    color: '#2B2130',
    draw: ({ color }) => (
      <g>
        <path d="M 94 86 Q 150 46 206 86" fill="none" stroke={color} strokeWidth={13} strokeLinecap="round" />
        <path d={bat(190, 52, 30)} fill={color} {...S} strokeWidth={4} />
        <circle cx={182} cy={46} r={3} fill="#FF5C8A" />
        <circle cx={198} cy={46} r={3} fill="#FF5C8A" />
        <path d="M 108 74 l 5 9 l 10 2 l -8 7 l 2 10 l -9 -5 l -9 5 l 2 -10 l -8 -7 l 10 -2 Z" fill="#A2437B" stroke={OUTLINE} strokeWidth={3} />
      </g>
    ),
  },

  {
    id: 'mermaid',
    name: 'Shell Crown',
    theme: 'mermaid',
    color: '#45C4C0',
    draw: ({ color }) => (
      <g>
        <path d="M 100 82 Q 150 48 200 82" fill="none" stroke={color} strokeWidth={11} strokeLinecap="round" />
        <path d={shell(150, 48, 26)} fill="#FF9FC4" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={116} cy={70} r={8} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3.5} />
        <circle cx={184} cy={70} r={8} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3.5} />
      </g>
    ),
  },

  {
    id: 'unicorn',
    name: 'Unicorn Horn',
    theme: 'unicorn',
    color: '#C79BFF',
    draw: ({ color }) => (
      <g>
        <path d="M 128 60 L 116 16 L 146 50 Z" fill={color} {...S} />
        <path d="M 172 60 L 184 16 L 154 50 Z" fill={color} {...S} />
        <path d="M 150 66 L 136 60 L 150 -4 L 164 60 Z" fill="#FFD166" {...S} />
        <path d="M 142 44 L 158 38 M 145 26 L 157 22" stroke={shade('#FFD166', -25)} strokeWidth={4} strokeLinecap="round" />
        <circle cx={124} cy={72} r={7} fill="#7FD6FF" stroke={OUTLINE} strokeWidth={3.5} />
        <circle cx={176} cy={72} r={7} fill="#FF9FC4" stroke={OUTLINE} strokeWidth={3.5} />
      </g>
    ),
  },

  {
    id: 'ballerina',
    name: 'Ballet Ribbon',
    theme: 'ballerina',
    color: '#FFC2D4',
    draw: ({ color }) => (
      <g>
        <path d="M 94 88 Q 150 50 206 88" fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" />
        <path d="M 144 54 C 118 34 98 46 106 66 C 114 82 138 72 146 62 Z" fill={color} {...S} />
        <path d="M 156 54 C 182 34 202 46 194 66 C 186 82 162 72 154 62 Z" fill={color} {...S} />
        <circle cx={150} cy={58} r={12} fill={shade(color, -12)} {...S} />
      </g>
    ),
  },

  {
    id: 'hero',
    name: 'Hero Band',
    theme: 'hero',
    color: '#FF4F5A',
    draw: ({ color }) => (
      <g>
        <path d="M 92 90 Q 150 48 208 90" fill="none" stroke={color} strokeWidth={16} strokeLinecap="round" />
        <path d="M 92 90 Q 150 48 208 90" fill="none" stroke={shade(color, -20)} strokeWidth={4} opacity={0.4} />
        <circle cx={150} cy={56} r={22} fill="#4F8CFF" {...S} />
        <path d={bolt(150, 56, 15)} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3} />
      </g>
    ),
  },

  {
    id: 'bunny',
    name: 'Bunny Ears',
    theme: 'bunny',
    color: '#FFFFFF',
    draw: ({ color }) => (
      <g>
        <g transform="rotate(-14 128 30)">
          <ellipse cx={128} cy={20} rx={17} ry={46} fill={color} {...S} />
          <ellipse cx={128} cy={22} rx={8} ry={32} fill="#FFB3CB" />
        </g>
        <g transform="rotate(14 172 30)">
          <ellipse cx={172} cy={20} rx={17} ry={46} fill={color} {...S} />
          <ellipse cx={172} cy={22} rx={8} ry={32} fill="#FFB3CB" />
        </g>
      </g>
    ),
  },

  // One crown shape, six princesses — the gem and emblem do the telling apart.
  ...PRINCESSES.map<Item>((p) => ({
    id: `crown-${p.id}`,
    name: p.name,
    theme: p.id,
    color: p.trim,
    draw: ({ color }) => (
      <g>
        <path d="M 104 76 L 104 36 L 126 56 L 150 26 L 174 56 L 196 36 L 196 76 Z" fill={color} {...S} />
        <path d="M 104 64 L 196 64" stroke={shade(color, -18)} strokeWidth={6} strokeLinecap="round" />
        <circle cx={126} cy={71} r={6} fill={p.gem} stroke={OUTLINE} strokeWidth={3} />
        <circle cx={174} cy={71} r={6} fill={p.gem} stroke={OUTLINE} strokeWidth={3} />
        <Motif kind={p.motif} x={150} y={16} r={17} color={p.gem} />
      </g>
    ),
  })),
];
