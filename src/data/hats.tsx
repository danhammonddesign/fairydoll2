import { OUTLINE, shade } from '../art/palette';
import { flower, starPoints } from '../art/shapes';
import type { Item } from '../types';

const S = { stroke: OUTLINE, strokeWidth: 5, strokeLinejoin: 'round' as const };

export const HATS: Item[] = [
  { id: 'none', name: 'No Hat', color: '#FFB3CB' },

  {
    id: 'crown',
    name: 'Crown',
    color: '#FFD166',
    draw: ({ color }) => (
      <g>
        <path d="M 102 74 L 102 30 L 126 52 L 150 20 L 174 52 L 198 30 L 198 74 Z" fill={color} {...S} />
        <path d="M 102 62 L 198 62" stroke={shade(color, -18)} strokeWidth={6} strokeLinecap="round" />
        <circle cx={150} cy={20} r={8} fill="#FF7FA8" {...S} />
        <circle cx={124} cy={70} r={6} fill="#7FD6FF" stroke={OUTLINE} strokeWidth={3.5} />
        <circle cx={176} cy={70} r={6} fill="#7FD6FF" stroke={OUTLINE} strokeWidth={3.5} />
      </g>
    ),
  },

  {
    id: 'tiara',
    name: 'Tiara',
    color: '#B98CFF',
    draw: ({ color }) => (
      <g>
        <path d="M 104 72 Q 150 40 196 72 L 194 82 Q 150 54 106 82 Z" fill={color} {...S} />
        <polygon points={starPoints(150, 40, 15)} fill="#FFF0A8" {...S} />
        <circle cx={122} cy={62} r={6} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3.5} />
        <circle cx={178} cy={62} r={6} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3.5} />
      </g>
    ),
  },

  {
    id: 'bow',
    name: 'Big Bow',
    color: '#FF7FA8',
    draw: ({ color }) => (
      <g>
        <path d="M 146 40 C 116 8 86 20 92 44 C 96 66 126 66 146 50 Z" fill={color} {...S} />
        <path d="M 154 40 C 184 8 214 20 208 44 C 204 66 174 66 154 50 Z" fill={color} {...S} />
        <ellipse cx={150} cy={44} rx={14} ry={13} fill={shade(color, -12)} {...S} />
      </g>
    ),
  },

  {
    id: 'flowers',
    name: 'Flower Crown',
    color: '#FF9FC4',
    draw: ({ color }) => (
      <g>
        <path d="M 94 84 Q 150 44 206 84" fill="none" stroke="#7FCF8F" strokeWidth={10} strokeLinecap="round" />
        {[
          [100, 78],
          [122, 60],
          [150, 52],
          [178, 60],
          [200, 78],
        ].map(([x, y], i) => (
          <g key={i}>
            <path d={flower(x, y, 15)} fill={i % 2 ? shade(color, 10) : color} {...S} strokeWidth={4} />
            <circle cx={x} cy={y} r={5} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3} />
          </g>
        ))}
      </g>
    ),
  },

  {
    id: 'beanie',
    name: 'Beanie',
    color: '#6EC6FF',
    draw: ({ color }) => (
      <g>
        <path d="M 88 88 A 62 66 0 0 1 212 88 Q 150 106 88 88 Z" fill={color} {...S} />
        <path d="M 88 80 Q 150 100 212 80 L 212 94 Q 150 114 88 94 Z" fill={shade(color, -12)} {...S} />
        <circle cx={150} cy={22} r={18} fill="#FFFFFF" {...S} />
      </g>
    ),
  },

  {
    id: 'sunhat',
    name: 'Sun Hat',
    color: '#FFE29A',
    draw: ({ color }) => (
      <g>
        <ellipse cx={150} cy={78} rx={100} ry={26} fill={color} {...S} />
        <path d="M 106 80 C 106 22 194 22 194 80 Z" fill={shade(color, 6)} {...S} />
        <path d="M 106 66 Q 150 82 194 66" fill="none" stroke="#FF7FA8" strokeWidth={11} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'party',
    name: 'Party Hat',
    color: '#FF9E6D',
    draw: ({ color }) => (
      <g>
        <path d="M 150 6 L 188 66 Q 150 80 112 66 Z" fill={color} {...S} />
        <path d="M 128 44 L 172 44" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" />
        <path d="M 136 24 L 164 24" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" />
        <circle cx={150} cy={8} r={13} fill="#7FD6FF" {...S} />
      </g>
    ),
  },

  {
    id: 'catears',
    name: 'Cat Ears',
    color: '#3A3040',
    draw: ({ color }) => (
      <g>
        <path d="M 100 62 L 106 8 L 150 44 Z" fill={color} {...S} />
        <path d="M 200 62 L 194 8 L 150 44 Z" fill={color} {...S} />
        <path d="M 112 52 L 114 26 L 138 44 Z" fill="#FFB3CB" stroke={OUTLINE} strokeWidth={3.5} />
        <path d="M 188 52 L 186 26 L 162 44 Z" fill="#FFB3CB" stroke={OUTLINE} strokeWidth={3.5} />
      </g>
    ),
  },

  {
    id: 'bunnyears',
    name: 'Bunny Ears',
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

  {
    id: 'starband',
    name: 'Star Band',
    color: '#B8E986',
    draw: ({ color }) => (
      <g>
        <path d="M 92 88 Q 150 46 208 88" fill="none" stroke={color} strokeWidth={14} strokeLinecap="round" />
        <path d="M 92 88 Q 150 46 208 88" fill="none" stroke={OUTLINE} strokeWidth={4} opacity={0.25} />
        <polygon points={starPoints(190, 50, 20)} fill="#FFD166" {...S} />
        <polygon points={starPoints(116, 58, 12)} fill="#FF7FA8" {...S} strokeWidth={4} />
      </g>
    ),
  },

  {
    id: 'witch',
    name: 'Witch Hat',
    color: '#7C8CF8',
    draw: ({ color }) => (
      <g>
        <ellipse cx={150} cy={70} rx={92} ry={22} fill={color} {...S} />
        <path d="M 112 66 C 126 -2 156 -12 182 8 C 172 32 182 52 190 68 Q 150 82 112 66 Z" fill={shade(color, 8)} {...S} />
        <path d="M 116 56 Q 152 70 188 56 L 190 68 Q 150 82 112 66 Z" fill={shade(color, -18)} {...S} />
        <polygon points={starPoints(160, 32, 11)} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3.5} />
      </g>
    ),
  },

  {
    id: 'cap',
    name: 'Cap',
    color: '#FF5C8A',
    draw: ({ color }) => (
      <g>
        <path d="M 92 84 A 58 62 0 0 1 208 84 Q 150 98 92 84 Z" fill={color} {...S} />
        <path d="M 200 74 Q 254 72 256 92 Q 224 104 194 92 Z" fill={shade(color, -12)} {...S} />
        <circle cx={150} cy={26} r={8} fill={shade(color, -18)} stroke={OUTLINE} strokeWidth={3.5} />
      </g>
    ),
  },

  {
    id: 'earmuffs',
    name: 'Ear Muffs',
    color: '#F27CD0',
    draw: ({ color }) => (
      <g>
        <path d="M 96 96 Q 150 34 204 96" fill="none" stroke={shade(color, -14)} strokeWidth={13} strokeLinecap="round" />
        <circle cx={94} cy={102} r={24} fill={color} {...S} />
        <circle cx={206} cy={102} r={24} fill={color} {...S} />
        <circle cx={94} cy={102} r={12} fill={shade(color, 14)} />
        <circle cx={206} cy={102} r={12} fill={shade(color, 14)} />
      </g>
    ),
  },
];
