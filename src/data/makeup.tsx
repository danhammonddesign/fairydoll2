import type { ReactNode } from 'react';
import { OUTLINE, shade } from '../art/palette';
import { heartPath, starPoints } from '../art/shapes';
import type { Item } from '../types';

/** Makeup is symmetrical, so it is drawn once and mirrored. */
function pair(art: ReactNode): ReactNode {
  return (
    <g>
      {art}
      <g transform="translate(300 0) scale(-1 1)">{art}</g>
    </g>
  );
}

export const MAKEUP: Item[] = [
  { id: 'none', name: 'Natural', color: '#FF7FA8' },

  {
    id: 'blush',
    name: 'Blush',
    color: '#FF7FA8',
    draw: ({ color }) => pair(<ellipse cx={110} cy={128} rx={19} ry={11} fill={color} opacity={0.6} />),
  },

  {
    id: 'lips',
    name: 'Rosy Lips',
    color: '#FF5C8A',
    draw: ({ color }) => (
      <g>
        <path
          d="M 136 140 Q 143 132 150 138 Q 157 132 164 140 Q 150 158 136 140 Z"
          fill={color}
          stroke={OUTLINE}
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
        <path d="M 143 144 q 7 4 14 0" fill="none" stroke="#FFFFFF" strokeWidth={2.5} opacity={0.7} />
      </g>
    ),
  },

  {
    id: 'eyeshadow',
    name: 'Eyeshadow',
    color: '#B98CFF',
    draw: ({ color }) =>
      pair(
        <path
          d="M 112 96 Q 126 82 140 96 Q 126 90 112 96 Z"
          fill={color}
          opacity={0.85}
          stroke={shade(color, -18)}
          strokeWidth={2}
        />,
      ),
  },

  {
    id: 'rainbowshadow',
    name: 'Rainbow Lids',
    color: '#FF9E6D',
    draw: () =>
      pair(
        <g>
          {['#FF6F91', '#FFD166', '#6EC6FF'].map((c, i) => (
            <path
              key={c}
              d={`M ${113 + i * 2} ${94 - i * 3} Q 126 ${82 - i * 4} ${139 - i * 2} ${94 - i * 3}`}
              fill="none"
              stroke={c}
              strokeWidth={5}
              strokeLinecap="round"
            />
          ))}
        </g>,
      ),
  },

  {
    id: 'liner',
    name: 'Winged Liner',
    color: '#4A3A45',
    draw: ({ color }) =>
      pair(
        <path
          d="M 112 92 Q 126 84 139 92 L 148 84"
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
        />,
      ),
  },

  {
    id: 'lashes',
    name: 'Long Lashes',
    color: '#4A3A45',
    draw: ({ color }) =>
      pair(
        <g stroke={color} strokeWidth={5} strokeLinecap="round">
          <path d="M 112 94 l -9 -8" />
          <path d="M 119 88 l -6 -10" />
          <path d="M 128 86 l -1 -11" />
        </g>,
      ),
  },

  {
    id: 'freckles',
    name: 'Freckles',
    color: '#C98A5B',
    draw: ({ color }) =>
      pair(
        <g fill={color}>
          <circle cx={110} cy={124} r={3.2} />
          <circle cx={120} cy={130} r={2.8} />
          <circle cx={106} cy={134} r={2.6} />
          <circle cx={118} cy={118} r={2.4} />
          <circle cx={138} cy={128} r={2.4} />
        </g>,
      ),
  },

  {
    id: 'starcheeks',
    name: 'Star Cheeks',
    color: '#FFD166',
    draw: ({ color }) =>
      pair(
        <g>
          <polygon points={starPoints(112, 128, 12)} fill={color} stroke={OUTLINE} strokeWidth={3} />
          <polygon points={starPoints(128, 138, 6)} fill={color} stroke={OUTLINE} strokeWidth={2.2} />
        </g>,
      ),
  },

  {
    id: 'heartcheeks',
    name: 'Heart Cheeks',
    color: '#FF5C8A',
    draw: ({ color }) =>
      pair(
        <g>
          <path d={heartPath(112, 128, 11)} fill={color} stroke={OUTLINE} strokeWidth={3} />
          <path d={heartPath(128, 140, 6)} fill={color} stroke={OUTLINE} strokeWidth={2.2} />
        </g>,
      ),
  },

  {
    id: 'gems',
    name: 'Face Gems',
    color: '#7FD6FF',
    draw: ({ color }) =>
      pair(
        <g>
          <path d="M 112 130 l 7 8 l -7 8 l -7 -8 Z" fill={color} stroke={OUTLINE} strokeWidth={3} />
          <path d="M 126 120 l 5 6 l -5 6 l -5 -6 Z" fill="#FFFFFF" stroke={OUTLINE} strokeWidth={2.5} />
        </g>,
      ),
  },

  {
    id: 'glitter',
    name: 'Glitter',
    color: '#FFF0A8',
    draw: ({ color }) =>
      pair(
        <g fill={color} stroke={OUTLINE} strokeWidth={2}>
          <polygon points={starPoints(104, 118, 8)} />
          <polygon points={starPoints(118, 138, 6)} />
          <polygon points={starPoints(98, 138, 5)} />
          <polygon points={starPoints(132, 74, 7)} />
        </g>,
      ),
  },

  {
    id: 'sparkleeyes',
    name: 'Sparkle Eyes',
    color: '#FFFFFF',
    draw: ({ color }) =>
      pair(
        <g>
          <circle cx={121} cy={102} r={6} fill={color} opacity={0.95} />
          <circle cx={131} cy={115} r={3.5} fill={color} opacity={0.9} />
          <polygon points={starPoints(136, 92, 9)} fill={color} stroke={OUTLINE} strokeWidth={2.2} />
        </g>,
      ),
  },

  {
    id: 'boldlips',
    name: 'Bold Lips',
    color: '#C0345E',
    draw: ({ color }) => (
      <g>
        <path
          d="M 132 139 Q 141 129 150 137 Q 159 129 168 139 Q 150 162 132 139 Z"
          fill={color}
          stroke={OUTLINE}
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
        <ellipse cx={110} cy={128} rx={17} ry={10} fill={color} opacity={0.35} />
        <ellipse cx={190} cy={128} rx={17} ry={10} fill={color} opacity={0.35} />
      </g>
    ),
  },
];
