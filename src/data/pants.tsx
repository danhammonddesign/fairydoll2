import { Hips, Legs, S, SKIRT, Waistband, bell, raggedHem } from '../art/garments';
import { Motif } from '../art/motifs';
import { OUTLINE, shade } from '../art/palette';
import { bolt, paw, starPoints } from '../art/shapes';
import type { Item } from '../types';
import { PRINCESSES, RAINBOW_BANDS } from './themes';

export const PANTS: Item[] = [
  { id: 'none', name: 'No Pants', color: '#FFB3CB' },

  {
    id: 'witch',
    name: 'Witch Skirt',
    theme: 'witch',
    color: '#7C5CD6',
    draw: ({ color }) => (
      <g>
        <path d={raggedHem(336, 22, 7)} fill={color} {...S} />
        <Waistband color={shade(color, -18)} />
        <polygon points={starPoints(120, 296, 11)} fill="#FFD166" stroke={OUTLINE} strokeWidth={3} />
        <polygon points={starPoints(180, 308, 9)} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={2.6} />
      </g>
    ),
  },

  {
    id: 'fairy',
    name: 'Petal Skirt',
    theme: 'fairy',
    color: '#5FD3A6',
    draw: ({ color }) => (
      <g>
        <path
          d="M 112 250 L 188 250 C 208 288 216 316 220 336 L 196 314 L 182 340 L 166 316 L 150 344
             L 134 316 L 118 340 L 104 314 L 80 336 C 84 316 92 288 112 250 Z"
          fill={color}
          {...S}
        />
        <path d="M 130 288 q 20 16 40 0" fill="none" stroke={shade(color, -18)} strokeWidth={4.5} strokeLinecap="round" />
        <Waistband color="#FFB3CB" />
      </g>
    ),
  },

  {
    id: 'cat',
    name: 'Paw Leggings',
    theme: 'cat',
    color: '#3A3040',
    draw: ({ color }) => (
      <g>
        <Legs color={color} width={28} />
        <Hips color={color} />
        <path d={paw(130, 322, 13)} fill="#FF8FB1" stroke={OUTLINE} strokeWidth={2.6} />
        <path d={paw(170, 352, 13)} fill="#FF8FB1" stroke={OUTLINE} strokeWidth={2.6} />
        <path d="M 104 266 L 196 266" stroke="#FF8FB1" strokeWidth={6} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'dog',
    name: 'Puppy Shorts',
    theme: 'dog',
    color: '#C98A5B',
    draw: ({ color }) => (
      <g>
        <Legs color={color} width={38} short />
        <Hips color={color} />
        <path d="M 108 330 q 20 12 40 2" fill="none" stroke={shade(color, -20)} strokeWidth={7} strokeLinecap="round" />
        <path d="M 152 332 q 20 10 40 -2" fill="none" stroke={shade(color, -20)} strokeWidth={7} strokeLinecap="round" />
        <path d={paw(126, 292, 12)} fill={shade(color, 22)} stroke={OUTLINE} strokeWidth={2.6} />
        <path d={paw(174, 292, 12)} fill={shade(color, 22)} stroke={OUTLINE} strokeWidth={2.6} />
      </g>
    ),
  },

  {
    id: 'gothic',
    name: 'Lace Mini',
    theme: 'gothic',
    color: '#2B2130',
    draw: ({ color }) => (
      <g>
        <path d="M 112 250 L 188 250 C 206 282 212 306 214 320 Q 150 338 86 320 C 88 306 94 282 112 250 Z" fill={color} {...S} />
        {[-2, -1, 0, 1, 2].map((i) => (
          <path key={i} d={`M ${150 + i * 14} 264 L ${150 + i * 22} 322`} stroke={shade(color, 14)} strokeWidth={4} strokeLinecap="round" />
        ))}
        <path
          d="M 88 316 q 14 18 28 2 q 14 18 28 2 q 14 18 28 0 q 12 16 26 -4 l 2 12 q -64 20 -114 0 Z"
          fill="#A2437B"
          {...S}
          strokeWidth={4}
        />
        <Waistband color="#A2437B" />
      </g>
    ),
  },

  {
    id: 'mermaid',
    name: 'Scale Skirt',
    theme: 'mermaid',
    color: '#45C4C0',
    draw: ({ color }) => (
      <g>
        <path
          d="M 114 250 L 186 250 C 190 296 186 330 182 352 Q 150 366 118 352 C 114 330 110 296 114 250 Z"
          fill={color}
          {...S}
        />
        {[276, 300, 324].map((y, r) =>
          [0, 1, 2, 3].map((c) => (
            <path
              key={`${y}-${c}`}
              d={`M ${124 + c * 18 + (r % 2) * 9} ${y} a 9 9 0 0 1 18 0`}
              fill="none"
              stroke={shade(color, -20)}
              strokeWidth={3.5}
            />
          )),
        )}
        <Waistband color="#FF9FC4" />
      </g>
    ),
  },

  {
    id: 'unicorn',
    name: 'Star Tutu',
    theme: 'unicorn',
    color: '#C79BFF',
    draw: ({ color }) => (
      <g>
        {[
          [86, 316, 30],
          [116, 326, 32],
          [150, 330, 34],
          [184, 326, 32],
          [214, 316, 30],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={shade(color, 10)} {...S} />
        ))}
        {[
          [104, 296, 26],
          [150, 300, 28],
          [196, 296, 26],
        ].map(([x, y, r], i) => (
          <circle key={`b${i}`} cx={x} cy={y} r={r} fill={color} {...S} />
        ))}
        {[
          [110, 312],
          [150, 322],
          [192, 312],
        ].map(([x, y], i) => (
          <polygon key={`s${i}`} points={starPoints(x, y, 11)} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={2.8} />
        ))}
        <path d="M 106 254 L 194 254 L 196 278 L 104 278 Z" fill={shade(color, -16)} {...S} />
      </g>
    ),
  },

  {
    id: 'ballerina',
    name: 'Tutu',
    theme: 'ballerina',
    color: '#FFC2D4',
    draw: ({ color }) => (
      <g>
        <path
          d="M 108 252 L 192 252 C 226 268 246 288 250 302 Q 150 330 50 302 C 54 288 74 268 108 252 Z"
          fill={color}
          {...S}
        />
        <path
          d="M 60 296 q 22 16 44 2 q 22 16 46 2 q 22 16 46 -2 q 20 14 44 -2"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={6}
          strokeLinecap="round"
        />
        <path d="M 106 250 L 194 250 L 194 268 L 106 268 Z" fill="#FFFFFF" {...S} />
      </g>
    ),
  },

  {
    id: 'hero',
    name: 'Hero Leggings',
    theme: 'hero',
    color: '#4F8CFF',
    draw: ({ color }) => (
      <g>
        <Legs color={color} width={30} />
        <Hips color={color} />
        <path d="M 118 280 L 114 396 M 182 280 L 186 396" stroke="#FFD166" strokeWidth={6} strokeLinecap="round" />
        <path d="M 104 262 L 196 262 L 196 280 L 104 280 Z" fill="#FF4F5A" {...S} />
        <path d={bolt(150, 271, 11)} fill="#FFD166" stroke={OUTLINE} strokeWidth={2.6} />
      </g>
    ),
  },

  {
    id: 'bunny',
    name: 'Fluffy Shorts',
    theme: 'bunny',
    color: '#FFFFFF',
    draw: ({ color }) => (
      <g>
        <Legs color={color} width={40} short />
        <Hips color={color} />
        <circle cx={150} cy={318} r={22} fill={shade(color, -6)} {...S} />
        <path d="M 112 330 q 18 12 36 2" fill="none" stroke="#FFB3CB" strokeWidth={6} strokeLinecap="round" />
        <path d="M 152 332 q 18 10 36 -2" fill="none" stroke="#FFB3CB" strokeWidth={6} strokeLinecap="round" />
        <path d="M 104 264 L 196 264" stroke="#FFB3CB" strokeWidth={7} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'witchtights',
    name: 'Spell Tights',
    theme: 'witch',
    color: '#4B3B77',
    draw: ({ color }) => (
      <g>
        <Legs color={color} width={28} />
        <Hips color={color} />
        {[
          [130, 312],
          [170, 340],
          [130, 368],
        ].map(([x, y], i) => (
          <polygon key={i} points={starPoints(x, y, 9)} fill="#FFD166" stroke={OUTLINE} strokeWidth={2.4} />
        ))}
      </g>
    ),
  },

  {
    id: 'rainbowskirt',
    name: 'Rainbow Skirt',
    theme: 'rainbowP',
    color: '#FF6F91',
    draw: () => (
      <g>
        <clipPath id="clip-skirt-rainbow">
          <path d={SKIRT} />
        </clipPath>
        <path d={SKIRT} fill="#FFFFFF" {...S} />
        <g clipPath="url(#clip-skirt-rainbow)">
          {RAINBOW_BANDS.map((c, i) => (
            <rect key={c} x={70} y={252 + i * 17} width={160} height={18} fill={c} />
          ))}
        </g>
        <path d={SKIRT} fill="none" {...S} />
        <Waistband color="#FFF0A8" />
      </g>
    ),
  },

  // Royal skirts: one A-line, six palettes and emblems.
  ...PRINCESSES.map<Item>((p) => ({
    id: `skirt-${p.id}`,
    name: `${p.name} Skirt`,
    theme: p.id,
    color: p.color,
    draw: ({ color }) => (
      <g>
        <path d={bell(344, 22)} fill={color} {...S} />
        <path
          d="M 82 330 q 22 20 44 2 q 22 20 44 2 q 22 20 44 -4 l 4 14 q -70 22 -140 0 Z"
          fill={p.trim}
          {...S}
        />
        <Waistband color={p.trim} />
        <Motif kind={p.motif} x={150} y={296} r={17} color={p.gem} />
      </g>
    ),
  })),
];
