import { LEG_L, LEG_R } from '../art/body';
import { OUTLINE, shade } from '../art/palette';
import { starPoints } from '../art/shapes';
import type { Item } from '../types';

const S = { stroke: OUTLINE, strokeWidth: 5, strokeLinejoin: 'round' as const };

/** Hip block every bottom sits on. */
const HIPS = 'M 104 254 L 196 254 C 200 276 198 294 192 306 L 108 306 C 102 294 104 276 104 254 Z';

/** A-line skirt from the waist. */
const SKIRT = 'M 112 250 L 188 250 C 210 290 216 324 220 344 Q 150 364 80 344 C 84 324 90 290 112 250 Z';

const SHORT_L = 'M 130 280 C 127 302 126 318 127 332';
const SHORT_R = 'M 170 280 C 173 302 174 318 173 332';

function Legs({ color, width = 34, short = false }: { color: string; width?: number; short?: boolean }) {
  const l = short ? SHORT_L : LEG_L;
  const r = short ? SHORT_R : LEG_R;
  return (
    <g>
      <path d={l} stroke={OUTLINE} strokeWidth={width + 8} strokeLinecap="round" fill="none" />
      <path d={r} stroke={OUTLINE} strokeWidth={width + 8} strokeLinecap="round" fill="none" />
      <path d={l} stroke={color} strokeWidth={width} strokeLinecap="round" fill="none" />
      <path d={r} stroke={color} strokeWidth={width} strokeLinecap="round" fill="none" />
    </g>
  );
}

function Hips({ color }: { color: string }) {
  return <path d={HIPS} fill={color} {...S} />;
}

export const PANTS: Item[] = [
  { id: 'none', name: 'No Pants', color: '#FFB3CB' },

  {
    id: 'jeans',
    name: 'Jeans',
    color: '#6EA8E8',
    draw: ({ color }) => (
      <g>
        <Legs color={color} />
        <Hips color={color} />
        <path d="M 104 268 L 196 268" stroke={shade(color, -18)} strokeWidth={7} />
        <path d="M 118 282 q 10 10 20 2" fill="none" stroke={shade(color, -18)} strokeWidth={4} />
        <path d="M 182 282 q -10 10 -20 2" fill="none" stroke={shade(color, -18)} strokeWidth={4} />
      </g>
    ),
  },

  {
    id: 'leggings',
    name: 'Leggings',
    color: '#7C8CF8',
    draw: ({ color }) => (
      <g>
        <Legs color={color} width={28} />
        <Hips color={color} />
        <path d="M 104 266 L 196 266" stroke={shade(color, -18)} strokeWidth={6} />
      </g>
    ),
  },

  {
    id: 'starleggings',
    name: 'Star Tights',
    color: '#B98CFF',
    draw: ({ color }) => (
      <g>
        <Legs color={color} width={28} />
        <Hips color={color} />
        {[
          [130, 320],
          [170, 344],
          [130, 372],
          [170, 296],
        ].map(([x, y], i) => (
          <polygon key={i} points={starPoints(x, y, 10)} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3} />
        ))}
      </g>
    ),
  },

  {
    id: 'joggers',
    name: 'Joggers',
    color: '#5FD3A6',
    draw: ({ color }) => (
      <g>
        <Legs color={color} width={38} />
        <Hips color={color} />
        <path d="M 110 376 q 20 12 38 0" fill="none" stroke={shade(color, -18)} strokeWidth={6} />
        <path d="M 152 376 q 20 12 38 0" fill="none" stroke={shade(color, -18)} strokeWidth={6} />
        <path d="M 150 258 L 150 282" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'capris',
    name: 'Capris',
    color: '#FF9E6D',
    draw: ({ color }) => (
      <g>
        <path d="M 130 280 C 127 312 126 336 127 352" stroke={OUTLINE} strokeWidth={42} strokeLinecap="round" fill="none" />
        <path d="M 170 280 C 173 312 174 336 173 352" stroke={OUTLINE} strokeWidth={42} strokeLinecap="round" fill="none" />
        <path d="M 130 280 C 127 312 126 336 127 352" stroke={color} strokeWidth={34} strokeLinecap="round" fill="none" />
        <path d="M 170 280 C 173 312 174 336 173 352" stroke={color} strokeWidth={34} strokeLinecap="round" fill="none" />
        <Hips color={color} />
      </g>
    ),
  },

  {
    id: 'shorts',
    name: 'Shorts',
    color: '#FF5C8A',
    draw: ({ color }) => (
      <g>
        <Legs color={color} width={38} short />
        <Hips color={color} />
        <path d="M 150 300 L 150 336" stroke={shade(color, -18)} strokeWidth={5} />
      </g>
    ),
  },

  {
    id: 'denimshorts',
    name: 'Denim Shorts',
    color: '#8FB8E8',
    draw: ({ color }) => (
      <g>
        <Legs color={color} width={38} short />
        <Hips color={color} />
        <path d="M 108 330 q 20 12 40 2" fill="none" stroke={shade(color, -20)} strokeWidth={7} strokeLinecap="round" />
        <path d="M 152 332 q 20 10 40 -2" fill="none" stroke={shade(color, -20)} strokeWidth={7} strokeLinecap="round" />
        <path d="M 150 258 L 150 300" stroke={shade(color, -20)} strokeWidth={4} />
      </g>
    ),
  },

  {
    id: 'bells',
    name: 'Bell Bottoms',
    color: '#F27CD0',
    draw: ({ color }) => (
      <g>
        <path d="M 112 288 L 148 288 L 146 348 L 156 406 L 102 406 L 112 348 Z" fill={color} {...S} />
        <path d="M 188 288 L 152 288 L 154 348 L 144 406 L 198 406 L 188 348 Z" fill={color} {...S} />
        <Hips color={color} />
        <path d="M 104 268 L 196 268" stroke={shade(color, -18)} strokeWidth={7} />
      </g>
    ),
  },

  {
    id: 'skirt',
    name: 'Skirt',
    color: '#FF7FA8',
    draw: ({ color }) => (
      <g>
        <path d={SKIRT} fill={color} {...S} />
        <path d="M 112 250 L 188 250 L 190 268 L 110 268 Z" fill={shade(color, -14)} {...S} />
      </g>
    ),
  },

  {
    id: 'pleated',
    name: 'Pleated Skirt',
    color: '#7C8CF8',
    draw: ({ color }) => (
      <g>
        <path d={SKIRT} fill={color} {...S} />
        {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M ${150 + i * 12} 262 L ${150 + i * 21} 350`}
            stroke={shade(color, -18)}
            strokeWidth={4}
            strokeLinecap="round"
          />
        ))}
        <path d="M 112 250 L 188 250 L 190 266 L 110 266 Z" fill={shade(color, -14)} {...S} />
      </g>
    ),
  },

  {
    id: 'polkaskirt',
    name: 'Polka Skirt',
    color: '#FFD166',
    draw: ({ color }) => (
      <g>
        <clipPath id="clip-skirt">
          <path d={SKIRT} />
        </clipPath>
        <path d={SKIRT} fill={color} {...S} />
        <g clipPath="url(#clip-skirt)">
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3, 4, 5].map((c) => (
              <circle
                key={`${r}-${c}`}
                cx={86 + c * 26 + (r % 2) * 13}
                cy={266 + r * 24}
                r={7}
                fill="#FFFFFF"
              />
            )),
          )}
        </g>
        <path d={SKIRT} fill="none" {...S} />
      </g>
    ),
  },

  {
    id: 'tutu',
    name: 'Tutu',
    color: '#FFB3CB',
    draw: ({ color }) => (
      <g>
        <g opacity={0.95}>
          {[
            [86, 316, 30],
            [116, 326, 32],
            [150, 330, 34],
            [184, 326, 32],
            [214, 316, 30],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={shade(color, 8)} {...S} />
          ))}
          {[
            [104, 296, 26],
            [150, 300, 28],
            [196, 296, 26],
          ].map(([x, y, r], i) => (
            <circle key={`b${i}`} cx={x} cy={y} r={r} fill={color} {...S} />
          ))}
        </g>
        <path d="M 106 254 L 194 254 L 196 278 L 104 278 Z" fill={shade(color, -16)} {...S} />
      </g>
    ),
  },

  {
    id: 'longskirt',
    name: 'Long Skirt',
    color: '#5FD3A6',
    draw: ({ color }) => (
      <g>
        <path
          d="M 112 250 L 188 250 C 214 300 226 360 230 396 Q 150 418 70 396 C 74 360 86 300 112 250 Z"
          fill={color}
          {...S}
        />
        <path
          d="M 74 388 q 20 16 40 0 q 20 16 38 0 q 20 16 38 0 q 18 14 36 0"
          fill="none"
          stroke={shade(color, -16)}
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path d="M 112 250 L 188 250 L 190 268 L 110 268 Z" fill={shade(color, -14)} {...S} />
      </g>
    ),
  },
];
