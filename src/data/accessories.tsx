import { S, pair } from '../art/garments';
import { Motif } from '../art/motifs';
import { OUTLINE, shade } from '../art/palette';
import { bat, bone, flower, shell, starPoints } from '../art/shapes';
import type { Item } from '../types';
import { PRINCESSES, RAINBOW_BANDS } from './themes';

export const ACCESSORIES: Item[] = [
  { id: 'none', name: 'Nothing', color: '#FFB3CB' },

  {
    id: 'witch',
    name: 'Broomstick',
    theme: 'witch',
    color: '#C98A5B',
    draw: ({ color }) => (
      <g>
        <path d="M 206 300 L 250 176" stroke={OUTLINE} strokeWidth={15} strokeLinecap="round" />
        <path d="M 206 300 L 250 176" stroke={color} strokeWidth={9} strokeLinecap="round" />
        <path d="M 196 336 L 216 276 L 244 286 L 224 346 Z" fill="#FFD166" {...S} />
        <path d="M 200 322 L 238 334" stroke={shade('#FFD166', -28)} strokeWidth={5} />
        <path d="M 206 344 L 200 366 M 216 348 L 214 370 M 226 348 L 230 368" stroke="#FFD166" strokeWidth={5} strokeLinecap="round" />
        <path d="M 206 344 L 200 366 M 216 348 L 214 370 M 226 348 L 230 368" stroke={OUTLINE} strokeWidth={1.6} opacity={0.5} />
      </g>
    ),
  },

  {
    id: 'fairy',
    name: 'Fairy Wings',
    theme: 'fairy',
    color: '#B8E4FF',
    back: ({ color }) =>
      pair(
        <g opacity={0.94}>
          <path d="M 122 194 C 84 138 26 148 36 200 C 44 240 98 236 124 208 Z" fill={color} {...S} />
          <path d="M 124 216 C 92 228 50 252 68 284 C 88 310 122 266 126 232 Z" fill={shade(color, 6)} {...S} />
          <path d="M 108 200 q -30 -14 -50 -4 M 108 232 q -22 6 -32 26" fill="none" stroke={shade(color, -22)} strokeWidth={3.5} />
          <path d={flower(52, 190, 11)} fill="#FFB3CB" stroke={OUTLINE} strokeWidth={2.4} />
        </g>,
      ),
  },

  {
    id: 'cat',
    name: 'Tail & Bell',
    theme: 'cat',
    color: '#3A3040',
    back: ({ color }) => (
      <g>
        <path d="M 192 288 C 244 302 258 248 230 218" stroke={OUTLINE} strokeWidth={26} fill="none" strokeLinecap="round" />
        <path d="M 192 288 C 244 302 258 248 230 218" stroke={color} strokeWidth={18} fill="none" strokeLinecap="round" />
        <path d="M 234 224 l 10 8 M 250 252 l 12 2" stroke="#FF8FB1" strokeWidth={7} strokeLinecap="round" />
      </g>
    ),
    draw: () => (
      <g>
        <path d="M 124 168 Q 150 190 176 168" fill="none" stroke="#FF8FB1" strokeWidth={9} strokeLinecap="round" />
        <circle cx={150} cy={186} r={12} fill="#FFD166" {...S} />
        <path d="M 144 188 L 156 188" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
        <circle cx={150} cy={193} r={2.6} fill={OUTLINE} />
      </g>
    ),
  },

  {
    id: 'dog',
    name: 'Bone Collar',
    theme: 'dog',
    color: '#FF5C8A',
    back: () => (
      <g>
        <path d="M 190 292 C 232 296 246 258 232 232" stroke={OUTLINE} strokeWidth={24} fill="none" strokeLinecap="round" />
        <path d="M 190 292 C 232 296 246 258 232 232" stroke="#C98A5B" strokeWidth={16} fill="none" strokeLinecap="round" />
        <ellipse cx={233} cy={230} rx={13} ry={11} fill="#F6E3CE" {...S} strokeWidth={4} />
      </g>
    ),
    draw: ({ color }) => (
      <g>
        <path d="M 124 166 Q 150 190 176 166" fill="none" stroke={color} strokeWidth={11} strokeLinecap="round" />
        <path d={bone(150, 188, 17)} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
      </g>
    ),
  },

  {
    id: 'gothic',
    name: 'Bat Wings',
    theme: 'gothic',
    color: '#2B2130',
    back: ({ color }) =>
      pair(
        <g>
          <path
            d="M 124 196 C 96 150 40 142 30 178 L 58 190 L 34 216 L 68 214 L 50 250 L 88 236 L 82 274
               C 106 262 122 232 124 196 Z"
            fill={color}
            {...S}
          />
          <path d="M 110 200 L 56 186 M 106 226 L 62 218 M 104 250 L 78 248" stroke="#A2437B" strokeWidth={3.5} strokeLinecap="round" />
        </g>,
      ),
  },

  {
    id: 'mermaid',
    name: 'Pearl Shells',
    theme: 'mermaid',
    color: '#FF9FC4',
    draw: ({ color }) => (
      <g>
        {Array.from({ length: 9 }).map((_, i) => {
          const t = i / 8;
          const x = 124 + t * 52;
          const y = 166 + Math.sin(Math.PI * t) * 24;
          return <circle key={i} cx={x} cy={y} r={5.5} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={2.6} />;
        })}
        <path d={shell(150, 196, 17)} fill={color} stroke={OUTLINE} strokeWidth={3.2} strokeLinejoin="round" />
      </g>
    ),
  },

  {
    id: 'unicorn',
    name: 'Rainbow Tail',
    theme: 'unicorn',
    color: '#C79BFF',
    back: () => (
      <g>
        {RAINBOW_BANDS.map((c, i) => (
          <path
            key={c}
            d={`M ${196 + i * 3} ${278} C ${240 + i * 4} ${296 + i * 6} ${248 + i * 4} ${340 + i * 6} ${228 + i * 3} ${372 + i * 5}`}
            fill="none"
            stroke={c}
            strokeWidth={12}
            strokeLinecap="round"
          />
        ))}
      </g>
    ),
  },

  {
    id: 'ballerina',
    name: 'Rose Bouquet',
    theme: 'ballerina',
    color: '#FF7FA8',
    draw: ({ color }) => (
      <g>
        <path d="M 200 296 L 212 250" stroke="#7FCF8F" strokeWidth={7} strokeLinecap="round" />
        <path d="M 206 274 q 14 -6 18 -18" fill="none" stroke="#7FCF8F" strokeWidth={6} strokeLinecap="round" />
        <path d={flower(214, 234, 17)} fill={color} {...S} strokeWidth={4} />
        <path d={flower(234, 248, 13)} fill={shade(color, 12)} {...S} strokeWidth={3.5} />
        <circle cx={214} cy={234} r={6} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={2.6} />
      </g>
    ),
  },

  {
    id: 'hero',
    name: 'Hero Cape',
    theme: 'hero',
    color: '#4F8CFF',
    back: ({ color }) => (
      <g>
        <path
          d="M 118 176 L 182 176 C 214 232 232 316 236 386 L 220 372 L 202 392 L 184 372 L 166 392
             L 150 372 L 134 392 L 116 372 L 98 392 L 80 372 L 64 386 C 68 316 86 232 118 176 Z"
          fill={color}
          {...S}
        />
        <path d="M 118 176 Q 150 206 182 176" fill="none" stroke={shade(color, -20)} strokeWidth={6} />
      </g>
    ),
  },

  {
    id: 'bunny',
    name: 'Cottontail',
    theme: 'bunny',
    color: '#FFFFFF',
    back: ({ color }) => (
      <g>
        <circle cx={216} cy={300} r={26} fill={color} {...S} />
        <circle cx={234} cy={282} r={16} fill={color} {...S} />
        <circle cx={238} cy={310} r={14} fill={color} {...S} />
        <circle cx={216} cy={300} r={26} fill={color} />
        <circle cx={210} cy={294} r={7} fill="#FFB3CB" opacity={0.5} />
      </g>
    ),
  },

  {
    id: 'batclip',
    name: 'Bat Swarm',
    theme: 'gothic',
    color: '#2B2130',
    back: ({ color }) => (
      <g>
        <path d={bat(58, 168, 26)} fill={color} {...S} strokeWidth={3.5} />
        <path d={bat(38, 240, 18)} fill={color} {...S} strokeWidth={3} />
        <path d={bat(244, 196, 22)} fill={color} {...S} strokeWidth={3.2} />
        <path d={bat(262, 264, 15)} fill={color} {...S} strokeWidth={3} />
      </g>
    ),
  },

  // Royal wands: one shape, six palettes and emblems.
  ...PRINCESSES.map<Item>((p) => ({
    id: `wand-${p.id}`,
    name: `${p.name} Wand`,
    theme: p.id,
    color: p.trim,
    draw: ({ color }) => (
      <g>
        <path d="M 200 296 L 244 208" stroke={OUTLINE} strokeWidth={13} strokeLinecap="round" />
        <path d="M 200 296 L 244 208" stroke={color} strokeWidth={7} strokeLinecap="round" />
        <circle cx={248} cy={198} r={25} fill={p.color} {...S} />
        <Motif kind={p.motif} x={248} y={198} r={16} color={p.gem} width={2.6} />
        <polygon points={starPoints(222, 164, 9)} fill={color} stroke={OUTLINE} strokeWidth={2.4} />
        <polygon points={starPoints(276, 230, 8)} fill={color} stroke={OUTLINE} strokeWidth={2.4} />
      </g>
    ),
  })),
];
