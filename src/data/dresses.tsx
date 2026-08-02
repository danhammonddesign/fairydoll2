import {
  BODICE,
  BODICE_STRAP,
  BellSleeves,
  CapSleeves,
  LongSleeves,
  PuffSleeves,
  S,
  Sash,
  bell,
  raggedHem,
} from '../art/garments';
import { Motif } from '../art/motifs';
import { OUTLINE, shade } from '../art/palette';
import { bolt, heartPath, paw, shell, starPoints } from '../art/shapes';
import type { Item } from '../types';
import { PRINCESSES, RAINBOW_BANDS } from './themes';

export const DRESSES: Item[] = [
  { id: 'none', name: 'No Dress', color: '#FFB3CB' },

  {
    id: 'witch',
    name: 'Witch Dress',
    theme: 'witch',
    color: '#7C5CD6',
    draw: ({ color }) => (
      <g>
        <BellSleeves color={color} />
        <path d={raggedHem(384, 34, 7)} fill={color} {...S} />
        <path d={BODICE} fill={shade(color, -8)} {...S} />
        <Sash color="#FFD166" />
        <path d="M 138 240 L 162 240 L 162 254 L 138 254 Z" fill={shade('#FFD166', -22)} {...S} strokeWidth={3.5} />
        {[
          [116, 300, 13],
          [186, 322, 11],
          [150, 350, 15],
        ].map(([x, y, r], i) => (
          <polygon key={i} points={starPoints(x, y, r)} fill="#FFD166" stroke={OUTLINE} strokeWidth={3} />
        ))}
        <path d="M 126 174 Q 150 200 174 174" fill="none" stroke="#FFD166" strokeWidth={7} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'fairy',
    name: 'Fairy Dress',
    theme: 'fairy',
    color: '#5FD3A6',
    draw: ({ color }) => (
      <g>
        <PuffSleeves color={shade(color, 14)} />
        <path
          d="M 118 238 L 182 238 C 202 282 214 316 220 342 L 196 318 L 182 350 L 164 320 L 150 356
             L 136 320 L 118 350 L 104 318 L 80 342 C 86 316 98 282 118 238 Z"
          fill={color}
          {...S}
        />
        <path d={BODICE_STRAP} fill={shade(color, 12)} {...S} />
        <Sash color="#FFB3CB" />
        {[
          [126, 288],
          [174, 288],
          [150, 268],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={7} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3} />
        ))}
        <path d="M 132 300 q 18 14 36 0" fill="none" stroke={shade(color, -20)} strokeWidth={4} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'cat',
    name: 'Kitty Dress',
    theme: 'cat',
    color: '#3A3040',
    draw: ({ color }) => (
      <g>
        <CapSleeves color={color} />
        <path d={bell(340, 24)} fill={color} {...S} />
        <path d={BODICE} fill={color} {...S} />
        <path d="M 118 176 Q 150 200 182 176 L 184 192 Q 150 218 116 192 Z" fill="#FF8FB1" {...S} />
        <circle cx={150} cy={204} r={11} fill="#FFD166" {...S} />
        <path d={paw(122, 296, 17)} fill="#FF8FB1" stroke={OUTLINE} strokeWidth={2.8} />
        <path d={paw(180, 316, 15)} fill="#FF8FB1" stroke={OUTLINE} strokeWidth={2.8} />
        <path d="M 84 330 q 22 16 44 0 q 22 16 44 0 q 20 14 42 -2" fill="none" stroke="#FF8FB1" strokeWidth={6} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'dog',
    name: 'Puppy Dress',
    theme: 'dog',
    color: '#C98A5B',
    draw: ({ color }) => (
      <g>
        <CapSleeves color={color} />
        <path d={bell(336, 22)} fill={color} {...S} />
        <path d={BODICE} fill={color} {...S} />
        <path d="M 118 176 Q 150 198 182 176 L 184 190 Q 150 214 116 190 Z" fill="#F6E3CE" {...S} />
        <circle cx={150} cy={202} r={10} fill="#FFD166" {...S} />
        {[
          [120, 292, 14],
          [178, 306, 12],
          [148, 322, 13],
        ].map(([x, y, r], i) => (
          <path key={i} d={paw(x, y, r)} fill={shade(color, 24)} stroke={OUTLINE} strokeWidth={2.6} />
        ))}
        <Sash color="#F6E3CE" />
      </g>
    ),
  },

  {
    id: 'gothic',
    name: 'Gothic Gown',
    theme: 'gothic',
    color: '#2B2130',
    draw: ({ color }) => (
      <g>
        <BellSleeves color={shade(color, 8)} />
        <path d={bell(400, 40)} fill={color} {...S} />
        <path d={BODICE} fill={shade(color, 8)} {...S} />
        <path d="M 128 182 L 172 182 L 174 240 L 126 240 Z" fill={shade(color, 18)} {...S} />
        {[196, 214].map((y) => (
          <g key={y} stroke="#A2437B" strokeWidth={3.5} strokeLinecap="round">
            <path d={`M 134 ${y} L 166 ${y + 10}`} />
            <path d={`M 166 ${y} L 134 ${y + 10}`} />
          </g>
        ))}
        <Sash color="#A2437B" />
        <path
          d="M 66 386 q 24 20 48 2 q 24 20 48 2 q 24 20 48 -4 l 4 16 q -76 24 -152 0 Z"
          fill="#A2437B"
          {...S}
        />
      </g>
    ),
  },

  {
    id: 'mermaid',
    name: 'Mermaid Gown',
    theme: 'mermaid',
    color: '#45C4C0',
    draw: ({ color }) => (
      <g>
        <path
          d="M 118 238 L 182 238 C 186 290 182 336 178 362 C 206 374 214 396 216 414 Q 150 430 84 414
             C 86 396 94 374 122 362 C 118 336 114 290 118 238 Z"
          fill={color}
          {...S}
        />
        <path d={BODICE_STRAP} fill={shade(color, 10)} {...S} />
        {[268, 292, 316, 340].map((y, r) =>
          [0, 1, 2].map((c) => (
            <path
              key={`${y}-${c}`}
              d={`M ${128 + c * 22 + (r % 2) * 11} ${y} a 11 11 0 0 1 22 0`}
              fill="none"
              stroke={shade(color, -20)}
              strokeWidth={3.5}
            />
          )),
        )}
        <path d={shell(150, 224, 20)} fill="#FF9FC4" stroke={OUTLINE} strokeWidth={3.5} strokeLinejoin="round" />
        <Sash color="#FF9FC4" />
      </g>
    ),
  },

  {
    id: 'unicorn',
    name: 'Unicorn Dress',
    theme: 'unicorn',
    color: '#C79BFF',
    draw: ({ color }) => (
      <g>
        <PuffSleeves color={shade(color, 12)} />
        <path d={bell(356, 32)} fill={color} {...S} />
        <path d={BODICE} fill={color} {...S} />
        {RAINBOW_BANDS.map((c, i) => (
          <path
            key={c}
            d={`M ${104 + i * 3} ${300 + i * 9} q ${46 - i * 3} ${26} ${92 - i * 6} 0`}
            fill="none"
            stroke={c}
            strokeWidth={8}
            strokeLinecap="round"
          />
        ))}
        <Sash color="#FFD166" />
        <path d="M 150 232 L 140 200 L 160 200 Z" fill="#FFD166" stroke={OUTLINE} strokeWidth={3.5} strokeLinejoin="round" />
      </g>
    ),
  },

  {
    id: 'ballerina',
    name: 'Ballet Dress',
    theme: 'ballerina',
    color: '#FFC2D4',
    draw: ({ color }) => (
      <g>
        <CapSleeves color={color} />
        <path
          d="M 118 238 L 182 238 C 220 256 244 280 248 296 Q 150 328 52 296 C 56 280 80 256 118 238 Z"
          fill={color}
          {...S}
        />
        <path
          d="M 62 290 q 22 16 44 2 q 22 16 46 2 q 22 16 46 -2 q 20 14 42 -2"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={6}
          strokeLinecap="round"
        />
        <path d={BODICE_STRAP} fill={color} {...S} />
        <path d="M 122 190 L 178 240 M 178 190 L 122 240" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" />
        <Sash color="#FFFFFF" />
      </g>
    ),
  },

  {
    id: 'hero',
    name: 'Hero Dress',
    theme: 'hero',
    color: '#FF4F5A',
    draw: ({ color }) => (
      <g>
        <LongSleeves color={color} cuff="#4F8CFF" />
        <path d={bell(342, 26)} fill={color} {...S} />
        <path d={BODICE} fill={color} {...S} />
        <circle cx={150} cy={212} r={28} fill="#FFD166" stroke={OUTLINE} strokeWidth={4} />
        <path d={bolt(150, 212, 20)} fill="#4F8CFF" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
        <Sash color="#4F8CFF" />
        <path d="M 78 330 L 222 330 L 224 348 L 76 348 Z" fill="#4F8CFF" {...S} />
      </g>
    ),
  },

  {
    id: 'bunny',
    name: 'Bunny Dress',
    theme: 'bunny',
    color: '#FFFFFF',
    draw: ({ color }) => (
      <g>
        <PuffSleeves color={color} />
        <path d={bell(336, 26)} fill={color} {...S} />
        <path d={BODICE} fill={color} {...S} />
        <path d="M 144 190 C 122 176 108 188 118 202 C 128 212 142 202 146 194 Z" fill="#FFB3CB" {...S} strokeWidth={4} />
        <path d="M 156 190 C 178 176 192 188 182 202 C 172 212 158 202 154 194 Z" fill="#FFB3CB" {...S} strokeWidth={4} />
        <circle cx={150} cy={195} r={9} fill="#FF8FB1" {...S} strokeWidth={3.5} />
        <circle cx={150} cy={314} r={24} fill={shade(color, -6)} {...S} />
        <path d="M 84 324 q 22 16 44 0 q 22 16 44 0 q 20 14 42 -2" fill="none" stroke="#FFB3CB" strokeWidth={6} strokeLinecap="round" />
      </g>
    ),
  },

  // Royal gowns: one silhouette, six palettes and emblems.
  ...PRINCESSES.map<Item>((p) => ({
    id: `gown-${p.id}`,
    name: `${p.name} Gown`,
    theme: p.id,
    color: p.color,
    draw: ({ color }) => (
      <g>
        <PuffSleeves color={shade(color, 12)} />
        <path d={bell(416, 46)} fill={color} {...S} />
        <path d={BODICE} fill={shade(color, 8)} {...S} />
        <path d="M 126 174 Q 150 198 174 174" fill="none" stroke={p.trim} strokeWidth={8} strokeLinecap="round" />
        <Sash color={p.trim} />
        <path
          d="M 68 398 q 24 20 48 2 q 24 20 48 2 q 24 20 48 -4 l 4 16 q -76 24 -152 0 Z"
          fill={p.trim}
          {...S}
        />
        <path d="M 150 254 C 116 302 100 358 92 404" fill="none" stroke={shade(color, -14)} strokeWidth={5} />
        <path d="M 150 254 C 184 302 200 358 208 404" fill="none" stroke={shade(color, -14)} strokeWidth={5} />
        <Motif kind={p.motif} x={150} y={218} r={22} color={p.gem} />
        <Motif kind={p.motif} x={116} y={330} r={13} color={p.gem} />
        <Motif kind={p.motif} x={186} y={352} r={11} color={p.gem} />
        {p.motif === 'heart' && <path d={heartPath(150, 300, 12)} fill={p.trim} stroke={OUTLINE} strokeWidth={3} />}
      </g>
    ),
  })),
];
