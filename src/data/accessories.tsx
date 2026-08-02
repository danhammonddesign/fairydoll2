import type { ReactNode } from 'react';
import { OUTLINE, shade } from '../art/palette';
import { heartPath, starPoints } from '../art/shapes';
import type { Item } from '../types';

const S = { stroke: OUTLINE, strokeWidth: 5, strokeLinejoin: 'round' as const };

/** Mirror a left-side wing across the doll to make a matching pair. */
function pair(art: ReactNode): ReactNode {
  return (
    <g>
      {art}
      <g transform="translate(300 0) scale(-1 1)">{art}</g>
    </g>
  );
}

export const ACCESSORIES: Item[] = [
  { id: 'none', name: 'Nothing', color: '#FFB3CB' },

  {
    id: 'fairywings',
    name: 'Fairy Wings',
    color: '#B8E4FF',
    back: ({ color }) =>
      pair(
        <g opacity={0.92}>
          <path d="M 122 194 C 84 138 26 148 36 200 C 44 240 98 236 124 208 Z" fill={color} {...S} />
          <path d="M 124 216 C 92 228 50 252 68 284 C 88 310 122 266 126 232 Z" fill={shade(color, 6)} {...S} />
          <path d="M 108 200 q -30 -14 -50 -4 M 108 232 q -22 6 -32 26" fill="none" stroke={shade(color, -22)} strokeWidth={3.5} />
        </g>,
      ),
  },

  {
    id: 'butterfly',
    name: 'Butterfly Wings',
    color: '#F27CD0',
    back: ({ color }) =>
      pair(
        <g opacity={0.95}>
          <circle cx={72} cy={186} r={50} fill={color} {...S} />
          <circle cx={84} cy={256} r={38} fill={shade(color, 10)} {...S} />
          <circle cx={64} cy={178} r={13} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3.5} />
          <circle cx={88} cy={258} r={10} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3.5} />
        </g>,
      ),
  },

  {
    id: 'angelwings',
    name: 'Angel Wings',
    color: '#FFFFFF',
    back: ({ color }) =>
      pair(
        <g>
          <path
            d="M 124 200 C 96 150 40 140 34 184 C 22 196 34 216 48 218 C 34 236 48 262 68 258
               C 66 282 92 292 106 274 C 118 262 124 232 124 200 Z"
            fill={color}
            {...S}
          />
          <path d="M 100 198 q -30 -10 -54 -4 M 96 226 q -28 -4 -48 6 M 98 254 q -20 2 -30 12" fill="none" stroke={shade(color, -18)} strokeWidth={4} strokeLinecap="round" />
        </g>,
      ),
  },

  {
    id: 'cattail',
    name: 'Cat Tail',
    color: '#3A3040',
    back: ({ color }) =>
      <g>
        <path d="M 192 288 C 244 302 258 248 230 218" stroke={OUTLINE} strokeWidth={26} fill="none" strokeLinecap="round" />
        <path d="M 192 288 C 244 302 258 248 230 218" stroke={color} strokeWidth={18} fill="none" strokeLinecap="round" />
        <path d="M 234 224 l 10 8 M 250 252 l 12 2" stroke="#FFFFFF" strokeWidth={7} strokeLinecap="round" />
      </g>,
  },

  {
    id: 'backpack',
    name: 'Backpack',
    color: '#5FD3A6',
    back: ({ color }) => (
      <path
        d="M 80 196 C 80 172 220 172 220 196 C 226 244 224 288 216 306 L 84 306 C 76 288 74 244 80 196 Z"
        fill={color}
        {...S}
      />
    ),
    draw: ({ color }) => (
      <g>
        <path d="M 122 176 C 112 214 112 254 116 290" fill="none" stroke={shade(color, -14)} strokeWidth={13} strokeLinecap="round" />
        <path d="M 178 176 C 188 214 188 254 184 290" fill="none" stroke={shade(color, -14)} strokeWidth={13} strokeLinecap="round" />
        <path d="M 116 236 L 184 236" stroke={shade(color, -14)} strokeWidth={9} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'necklace',
    name: 'Heart Necklace',
    color: '#FFD166',
    draw: ({ color }) => (
      <g>
        <path d="M 128 168 Q 150 202 172 168" fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" />
        <path d={heartPath(150, 196, 14)} fill="#FF5C8A" stroke={OUTLINE} strokeWidth={4} />
      </g>
    ),
  },

  {
    id: 'pearls',
    name: 'Pearls',
    color: '#FFFFFF',
    draw: ({ color }) => (
      <g>
        {Array.from({ length: 9 }).map((_, i) => {
          const t = i / 8;
          const x = 126 + t * 48;
          const y = 168 + Math.sin(Math.PI * t) * 22;
          return <circle key={i} cx={x} cy={y} r={6} fill={color} stroke={OUTLINE} strokeWidth={3} />;
        })}
      </g>
    ),
  },

  {
    id: 'glasses',
    name: 'Glasses',
    color: '#FF5C8A',
    draw: ({ color }) => (
      <g>
        <circle cx={126} cy={108} r={22} fill="#FFFFFF" fillOpacity={0.35} stroke={color} strokeWidth={6} />
        <circle cx={174} cy={108} r={22} fill="#FFFFFF" fillOpacity={0.35} stroke={color} strokeWidth={6} />
        <path d="M 148 106 q 2 -6 4 0" fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" />
        <path d="M 104 104 L 96 100 M 196 104 L 204 100" stroke={color} strokeWidth={6} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'wand',
    name: 'Magic Wand',
    color: '#FFD166',
    draw: ({ color }) => (
      <g>
        <path d="M 200 296 L 244 208" stroke={OUTLINE} strokeWidth={13} strokeLinecap="round" />
        <path d="M 200 296 L 244 208" stroke="#FFFFFF" strokeWidth={7} strokeLinecap="round" />
        <polygon points={starPoints(248, 198, 26)} fill={color} {...S} />
        <polygon points={starPoints(224, 168, 10)} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3} />
        <polygon points={starPoints(272, 232, 9)} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3} />
      </g>
    ),
  },

  {
    id: 'halo',
    name: 'Halo',
    color: '#FFF0A8',
    draw: ({ color }) => (
      <g>
        <ellipse cx={150} cy={16} rx={38} ry={11} fill="none" stroke={OUTLINE} strokeWidth={13} />
        <ellipse cx={150} cy={16} rx={38} ry={11} fill="none" stroke={color} strokeWidth={7} />
      </g>
    ),
  },

  {
    id: 'scarf',
    name: 'Cozy Scarf',
    color: '#FF6F91',
    draw: ({ color }) => (
      <g>
        <path d="M 164 180 L 190 254 L 164 262 L 148 190 Z" fill={shade(color, 8)} {...S} />
        <path d="M 120 162 Q 150 190 180 162 L 184 184 Q 150 214 116 184 Z" fill={color} {...S} />
        <path d="M 168 210 L 186 206 M 172 232 L 190 228" stroke={shade(color, -18)} strokeWidth={4} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'purse',
    name: 'Little Purse',
    color: '#B98CFF',
    draw: ({ color }) => (
      <g>
        <path d="M 124 178 C 140 214 166 240 186 252" fill="none" stroke={shade(color, -14)} strokeWidth={7} />
        <path d="M 172 250 L 210 250 C 214 268 214 282 210 290 L 172 290 C 168 282 168 268 172 250 Z" fill={color} {...S} />
        <path d="M 180 250 q 11 -16 22 0" fill="none" stroke={shade(color, -20)} strokeWidth={5} />
        <circle cx={191} cy={270} r={7} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3.5} />
      </g>
    ),
  },

  {
    id: 'bowtie',
    name: 'Bow Tie',
    color: '#FF5C8A',
    draw: ({ color }) => (
      <g>
        <path d="M 144 172 C 118 156 102 168 110 186 C 118 200 138 190 146 180 Z" fill={color} {...S} />
        <path d="M 156 172 C 182 156 198 168 190 186 C 182 200 162 190 154 180 Z" fill={color} {...S} />
        <circle cx={150} cy={177} r={11} fill={shade(color, -14)} {...S} />
      </g>
    ),
  },
];
