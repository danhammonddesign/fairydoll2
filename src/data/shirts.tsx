import {
  BellSleeves,
  CROP,
  CapSleeves,
  FULL,
  LongSleeves,
  PuffSleeves,
  S,
  ShortSleeves,
} from '../art/garments';
import { Motif } from '../art/motifs';
import { OUTLINE, shade } from '../art/palette';
import { bolt, bone, heartPath, paw, shell, starPoints } from '../art/shapes';
import type { Item } from '../types';
import { PRINCESSES, RAINBOW_BANDS } from './themes';

export const SHIRTS: Item[] = [
  { id: 'none', name: 'No Shirt', color: '#FFB3CB' },

  {
    id: 'witch',
    name: 'Witch Top',
    theme: 'witch',
    color: '#7C5CD6',
    draw: ({ color }) => (
      <g>
        <BellSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <path d="M 126 174 Q 150 198 174 174" fill="none" stroke="#FFD166" strokeWidth={7} strokeLinecap="round" />
        <polygon points={starPoints(150, 224, 22)} fill="#FFD166" stroke={OUTLINE} strokeWidth={3.5} />
        <polygon points={starPoints(120, 258, 10)} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={2.5} />
        <polygon points={starPoints(180, 258, 10)} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={2.5} />
      </g>
    ),
  },

  {
    id: 'fairy',
    name: 'Petal Top',
    theme: 'fairy',
    color: '#5FD3A6',
    draw: ({ color }) => (
      <g>
        <PuffSleeves color={shade(color, 12)} />
        <path
          d="M 116 172 C 102 182 98 202 104 226 L 118 214 L 132 232 L 150 216 L 168 232 L 182 214 L 196 226
             C 202 202 198 182 184 172 C 176 167 168 166 162 172 Q 150 188 138 172 C 132 166 124 167 116 172 Z"
          fill={color}
          {...S}
        />
        <path d="M 126 186 Q 150 206 174 186" fill="none" stroke="#FFB3CB" strokeWidth={6} strokeLinecap="round" />
        <circle cx={150} cy={200} r={7} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3} />
      </g>
    ),
  },

  {
    id: 'cat',
    name: 'Kitty Tee',
    theme: 'cat',
    color: '#3A3040',
    draw: ({ color }) => (
      <g>
        <ShortSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <circle cx={150} cy={224} r={27} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={4} />
        <path d="M 132 206 L 130 190 L 144 200 Z" fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3.5} />
        <path d="M 168 206 L 170 190 L 156 200 Z" fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3.5} />
        <circle cx={141} cy={220} r={3.4} fill={OUTLINE} />
        <circle cx={159} cy={220} r={3.4} fill={OUTLINE} />
        <path d="M 146 230 l 4 3 l 4 -3" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
        <path d="M 124 224 l 12 2 M 176 224 l -12 2" stroke={OUTLINE} strokeWidth={2.6} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'dog',
    name: 'Puppy Hoodie',
    theme: 'dog',
    color: '#C98A5B',
    draw: ({ color }) => (
      <g>
        <LongSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <path d="M 116 172 Q 150 208 184 172 Q 176 152 150 152 Q 124 152 116 172 Z" fill={shade(color, -12)} {...S} />
        <path d={paw(150, 230, 22)} fill={shade(color, 22)} stroke={OUTLINE} strokeWidth={3} />
        <path d="M 120 244 Q 150 264 180 244 L 180 268 Q 150 282 120 268 Z" fill={shade(color, -8)} {...S} />
      </g>
    ),
  },

  {
    id: 'gothic',
    name: 'Corset Top',
    theme: 'gothic',
    color: '#2B2130',
    draw: ({ color }) => (
      <g>
        <LongSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <path d="M 128 182 L 172 182 L 176 268 L 124 268 Z" fill={shade(color, 10)} {...S} />
        {[196, 214, 232, 250].map((y, i) => (
          <g key={y} stroke="#A2437B" strokeWidth={3.5} strokeLinecap="round">
            <path d={`M 132 ${y} L 168 ${y + 9}`} />
            <path d={`M 168 ${y} L 132 ${y + 9}`} />
            {i === 0 && <path d="M 132 190 L 168 190" opacity={0} />}
          </g>
        ))}
        <path d="M 106 278 q 12 14 24 0 q 12 14 24 0 q 12 14 24 0 q 10 12 18 -2" fill="none" stroke="#A2437B" strokeWidth={4.5} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'mermaid',
    name: 'Shell Top',
    theme: 'mermaid',
    color: '#45C4C0',
    draw: ({ color }) => (
      <g>
        <path
          d="M 122 176 C 108 188 104 212 112 240 C 104 256 104 272 108 286 L 192 286 C 196 272 196 256 188 240
             C 196 212 192 188 178 176 C 172 190 164 196 150 196 C 136 196 128 190 122 176 Z"
          fill={color}
          {...S}
        />
        <path d="M 126 178 Q 134 158 142 172" fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" />
        <path d="M 174 178 Q 166 158 158 172" fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" />
        <path d={shell(129, 208, 21)} fill="#FF9FC4" stroke={OUTLINE} strokeWidth={3.5} strokeLinejoin="round" />
        <path d={shell(171, 208, 21)} fill="#FF9FC4" stroke={OUTLINE} strokeWidth={3.5} strokeLinejoin="round" />
        {[250, 266].map((y) => (
          <path key={y} d={`M 112 ${y} q 12 12 24 0 q 12 12 24 0 q 12 12 24 0`} fill="none" stroke={shade(color, -18)} strokeWidth={4} />
        ))}
      </g>
    ),
  },

  {
    id: 'unicorn',
    name: 'Unicorn Sweater',
    theme: 'unicorn',
    color: '#C79BFF',
    draw: ({ color }) => (
      <g>
        <LongSleeves color={color} cuff={shade(color, -14)} />
        <path d={FULL} fill={color} {...S} />
        <path d="M 128 174 Q 150 196 172 174" fill="none" stroke={shade(color, -16)} strokeWidth={8} strokeLinecap="round" />
        <path d="M 150 246 L 140 208 L 160 208 Z" fill="#FFD166" stroke={OUTLINE} strokeWidth={3.5} strokeLinejoin="round" />
        {RAINBOW_BANDS.slice(0, 4).map((c, i) => (
          <path
            key={c}
            d={`M ${120 + i * 6} 262 q ${30 - i * 6} ${-26 - i * 4} ${60 - i * 12} 0`}
            fill="none"
            stroke={c}
            strokeWidth={6}
            strokeLinecap="round"
          />
        ))}
        <path d="M 104 272 L 196 272" stroke={shade(color, -16)} strokeWidth={6} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'ballerina',
    name: 'Leotard',
    theme: 'ballerina',
    color: '#FFC2D4',
    draw: ({ color }) => (
      <g>
        <CapSleeves color={color} />
        <path
          d="M 122 176 C 108 188 104 212 112 240 C 104 256 104 272 108 286 L 192 286 C 196 272 196 256 188 240
             C 196 212 192 188 178 176 C 172 190 164 196 150 196 C 136 196 128 190 122 176 Z"
          fill={color}
          {...S}
        />
        <path d="M 118 190 L 182 246 M 182 190 L 118 246" stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" />
        <path d="M 106 268 L 194 268" stroke={shade(color, -14)} strokeWidth={5} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'hero',
    name: 'Hero Top',
    theme: 'hero',
    color: '#FF4F5A',
    draw: ({ color }) => (
      <g>
        <LongSleeves color={color} cuff="#4F8CFF" />
        <path d={FULL} fill={color} {...S} />
        <circle cx={150} cy={220} r={30} fill="#FFD166" stroke={OUTLINE} strokeWidth={4} />
        <path d={bolt(150, 220, 22)} fill="#4F8CFF" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
        <path d="M 104 268 L 196 268 L 196 286 L 104 286 Z" fill="#4F8CFF" {...S} />
      </g>
    ),
  },

  {
    id: 'bunny',
    name: 'Fluffy Top',
    theme: 'bunny',
    color: '#FFFFFF',
    draw: ({ color }) => (
      <g>
        <LongSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <circle cx={150} cy={222} r={26} fill={shade(color, -6)} stroke={OUTLINE} strokeWidth={4} />
        <ellipse cx={140} cy={206} rx={7} ry={16} fill="#FFB3CB" stroke={OUTLINE} strokeWidth={3} />
        <ellipse cx={160} cy={206} rx={7} ry={16} fill="#FFB3CB" stroke={OUTLINE} strokeWidth={3} />
        <circle cx={143} cy={220} r={3.2} fill={OUTLINE} />
        <circle cx={157} cy={220} r={3.2} fill={OUTLINE} />
        <path d={heartPath(150, 231, 6)} fill="#FF8FB1" stroke={OUTLINE} strokeWidth={2.4} />
        <path d="M 110 272 q 14 14 28 0 q 14 14 28 0 q 12 12 26 -2" fill="none" stroke="#FFB3CB" strokeWidth={6} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'dogbone',
    name: 'Bone Tee',
    theme: 'dog',
    color: '#F6E3CE',
    draw: ({ color }) => (
      <g>
        <ShortSleeves color={color} />
        <path d={CROP} fill={color} {...S} />
        <path d={bone(150, 202, 26)} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3.5} strokeLinejoin="round" />
        <path d="M 106 214 L 194 214" stroke={shade(color, -18)} strokeWidth={5} strokeLinecap="round" />
      </g>
    ),
  },

  // Royal bodices: same cut, six palettes and emblems.
  ...PRINCESSES.map<Item>((p) => ({
    id: `top-${p.id}`,
    name: `${p.name} Top`,
    theme: p.id,
    color: p.color,
    draw: ({ color }) => (
      <g>
        <PuffSleeves color={shade(color, 10)} />
        <path d={FULL} fill={color} {...S} />
        <path d="M 126 174 Q 150 196 174 174" fill="none" stroke={p.trim} strokeWidth={8} strokeLinecap="round" />
        <path d="M 104 262 L 196 262 L 196 280 L 104 280 Z" fill={p.trim} {...S} />
        <Motif kind={p.motif} x={150} y={222} r={24} color={p.gem} />
      </g>
    ),
  })),
];
