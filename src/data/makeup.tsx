import type { ReactNode } from 'react';
import { Motif } from '../art/motifs';
import { OUTLINE, shade } from '../art/palette';
import { bolt, starPoints } from '../art/shapes';
import type { Item } from '../types';
import { PRINCESSES, RAINBOW_BANDS } from './themes';

/** Faces are symmetrical, so makeup is drawn once and mirrored. */
function pair(art: ReactNode): ReactNode {
  return (
    <g>
      {art}
      <g transform="translate(300 0) scale(-1 1)">{art}</g>
    </g>
  );
}

/** Eyes sit at (126,108) and (174,108); cheeks around (112,128). */
export const MAKEUP: Item[] = [
  { id: 'none', name: 'Natural', color: '#FF7FA8' },

  {
    id: 'witch',
    name: 'Witch Look',
    theme: 'witch',
    color: '#7C5CD6',
    draw: ({ color }) => (
      <g>
        {pair(
          <path d="M 112 94 Q 126 80 140 94 L 150 84" fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" />,
        )}
        <path
          d="M 136 139 Q 143 131 150 137 Q 157 131 164 139 Q 150 158 136 139 Z"
          fill={shade(color, -14)}
          stroke={OUTLINE}
          strokeWidth={3.2}
          strokeLinejoin="round"
        />
        <polygon points={starPoints(190, 132, 8)} fill="#FFD166" stroke={OUTLINE} strokeWidth={2.2} />
      </g>
    ),
  },

  {
    id: 'fairy',
    name: 'Fairy Sparkle',
    theme: 'fairy',
    color: '#5FD3A6',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 112 95 Q 126 82 140 95 Q 126 89 112 95 Z" fill={color} opacity={0.85} />
          <polygon points={starPoints(104, 120, 8)} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={2} />
          <polygon points={starPoints(118, 138, 6)} fill="#FFB3CB" stroke={OUTLINE} strokeWidth={1.8} />
          <circle cx={98} cy={136} r={3} fill="#FFF0A8" />
        </g>,
      ),
  },

  {
    id: 'cat',
    name: 'Kitty Face',
    theme: 'cat',
    color: '#FF8FB1',
    draw: ({ color }) => (
      <g>
        <path d="M 143 128 L 157 128 L 150 137 Z" fill={color} stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
        <path d="M 150 137 L 150 142 M 150 142 q -6 6 -11 1 M 150 142 q 6 6 11 1" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
        {pair(
          <g stroke={OUTLINE} strokeWidth={3} strokeLinecap="round">
            <path d="M 128 128 L 98 122" />
            <path d="M 128 134 L 97 134" />
            <path d="M 128 140 L 99 146" />
          </g>,
        )}
      </g>
    ),
  },

  {
    id: 'dog',
    name: 'Puppy Face',
    theme: 'dog',
    color: '#5A4453',
    draw: ({ color }) => (
      <g>
        <ellipse cx={150} cy={130} rx={12} ry={9} fill={color} stroke={OUTLINE} strokeWidth={3} />
        <ellipse cx={146} cy={127} rx={3} ry={2} fill="#FFFFFF" opacity={0.8} />
        <path d="M 150 139 L 150 144 M 150 144 q -7 7 -13 1 M 150 144 q 7 7 13 1" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
        <path d="M 143 152 q 7 12 14 0 q -7 6 -14 0 Z" fill="#FF8FB1" stroke={OUTLINE} strokeWidth={2.6} strokeLinejoin="round" />
        {pair(
          <g fill={OUTLINE}>
            <circle cx={116} cy={128} r={2.6} />
            <circle cx={110} cy={137} r={2.4} />
            <circle cx={122} cy={139} r={2.2} />
          </g>,
        )}
      </g>
    ),
  },

  {
    id: 'gothic',
    name: 'Dark Glam',
    theme: 'gothic',
    color: '#A2437B',
    draw: ({ color }) => (
      <g>
        {pair(
          <g>
            <path d="M 110 94 Q 126 78 142 94 Q 126 86 110 94 Z" fill="#2B2130" opacity={0.9} />
            <path d="M 110 94 Q 126 84 141 93 L 152 82" fill="none" stroke="#2B2130" strokeWidth={5.5} strokeLinecap="round" />
            <path d="M 120 130 l 5 8 l -5 8 l -5 -8 Z" fill={color} stroke={OUTLINE} strokeWidth={2.4} />
          </g>,
        )}
        <path
          d="M 132 139 Q 141 129 150 137 Q 159 129 168 139 Q 150 162 132 139 Z"
          fill="#5B1E3E"
          stroke={OUTLINE}
          strokeWidth={3.2}
          strokeLinejoin="round"
        />
      </g>
    ),
  },

  {
    id: 'mermaid',
    name: 'Sea Shimmer',
    theme: 'mermaid',
    color: '#45C4C0',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 112 95 Q 126 81 140 95 Q 126 88 112 95 Z" fill={color} opacity={0.9} />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <path
                key={`${r}-${c}`}
                d={`M ${100 + c * 11 + (r % 2) * 5} ${120 + r * 9} a 5.5 5.5 0 0 1 11 0`}
                fill="none"
                stroke={color}
                strokeWidth={2.4}
              />
            )),
          )}
        </g>,
      ),
  },

  {
    id: 'unicorn',
    name: 'Pastel Dream',
    theme: 'unicorn',
    color: '#C79BFF',
    draw: ({ color }) => (
      <g>
        {pair(
          <g>
            {RAINBOW_BANDS.slice(0, 3).map((c, i) => (
              <path
                key={c}
                d={`M ${113 + i * 2} ${94 - i * 3} Q 126 ${82 - i * 4} ${139 - i * 2} ${94 - i * 3}`}
                fill="none"
                stroke={c}
                strokeWidth={4.5}
                strokeLinecap="round"
              />
            ))}
            <polygon points={starPoints(112, 129, 11)} fill={color} stroke={OUTLINE} strokeWidth={2.4} />
          </g>,
        )}
      </g>
    ),
  },

  {
    id: 'ballerina',
    name: 'Soft Rose',
    theme: 'ballerina',
    color: '#FF9FC4',
    draw: ({ color }) => (
      <g>
        {pair(<ellipse cx={111} cy={128} rx={19} ry={11} fill={color} opacity={0.6} />)}
        <path
          d="M 138 140 Q 144 133 150 138 Q 156 133 162 140 Q 150 156 138 140 Z"
          fill={color}
          stroke={OUTLINE}
          strokeWidth={3}
          strokeLinejoin="round"
        />
      </g>
    ),
  },

  {
    id: 'hero',
    name: 'Hero Mask',
    theme: 'hero',
    color: '#4F8CFF',
    draw: ({ color }) => (
      <g>
        <path
          d="M 96 100 Q 150 84 204 100 Q 206 122 196 128 Q 174 132 162 118 Q 150 112 138 118
             Q 126 132 104 128 Q 94 122 96 100 Z"
          fill={color}
          stroke={OUTLINE}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <ellipse cx={126} cy={108} rx={15} ry={12} fill="#FFFFFF" />
        <ellipse cx={174} cy={108} rx={15} ry={12} fill="#FFFFFF" />
        <ellipse cx={126} cy={109} rx={8} ry={9} fill="#33212C" />
        <ellipse cx={174} cy={109} rx={8} ry={9} fill="#33212C" />
        <path d={bolt(150, 96, 9)} fill="#FFD166" stroke={OUTLINE} strokeWidth={2.2} />
      </g>
    ),
  },

  {
    id: 'bunny',
    name: 'Bunny Nose',
    theme: 'bunny',
    color: '#FF8FB1',
    draw: ({ color }) => (
      <g>
        <path d="M 141 126 L 159 126 L 150 137 Z" fill={color} stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
        <path d="M 150 137 L 150 143" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
        <path d="M 138 148 q 12 10 24 0" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
        <rect x={142} y={143} width={7} height={11} rx={3} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={2.4} />
        <rect x={151} y={143} width={7} height={11} rx={3} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={2.4} />
        {pair(
          <g stroke={OUTLINE} strokeWidth={2.6} strokeLinecap="round">
            <path d="M 130 128 L 104 124" />
            <path d="M 130 134 L 103 137" />
          </g>,
        )}
      </g>
    ),
  },

  // Royal faces: matching lids, cheek gems and lips.
  ...PRINCESSES.map<Item>((p) => ({
    id: `face-${p.id}`,
    name: `${p.name} Face`,
    theme: p.id,
    color: p.color,
    draw: ({ color }) => (
      <g>
        {pair(
          <g>
            <path d="M 112 95 Q 126 81 140 95 Q 126 88 112 95 Z" fill={color} opacity={0.9} />
            <Motif kind={p.motif} x={110} y={130} r={9} color={p.gem} width={2.2} />
          </g>,
        )}
        <path
          d="M 137 139 Q 143.5 131 150 137 Q 156.5 131 163 139 Q 150 157 137 139 Z"
          fill={p.gem}
          stroke={OUTLINE}
          strokeWidth={3}
          strokeLinejoin="round"
        />
      </g>
    ),
  })),
];
