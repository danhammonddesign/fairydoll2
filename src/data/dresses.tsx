import { ARM_L, ARM_R } from '../art/body';
import { OUTLINE, shade } from '../art/palette';
import { heartPath, starPoints } from '../art/shapes';
import type { Item } from '../types';

const S = { stroke: OUTLINE, strokeWidth: 5, strokeLinejoin: 'round' as const };

/** Fitted top half of a dress, ending at the waist. */
const BODICE =
  'M 116 172 C 102 182 98 210 108 242 L 192 242 C 202 210 198 182 184 172 ' +
  'C 176 167 168 166 162 172 Q 150 188 138 172 C 132 166 124 167 116 172 Z';

/** Strappy version for sundresses. */
const BODICE_STRAP =
  'M 122 178 C 108 190 104 214 112 242 L 188 242 C 196 214 192 190 178 178 ' +
  'C 172 192 164 198 150 198 C 136 198 128 192 122 178 Z';

/** A skirt that flares to `bottom`, `w` controls how wide it gets. */
const bell = (bottom: number, w: number) =>
  `M 118 238 L 182 238 C ${182 + w * 0.5} ${bottom - 70} ${190 + w * 0.8} ${bottom - 26} ${196 + w} ${bottom} ` +
  `Q 150 ${bottom + 22} ${104 - w} ${bottom} C ${110 - w * 0.8} ${bottom - 26} ${118 - w * 0.5} ${
    bottom - 70
  } 118 238 Z`;

function PuffSleeves({ color }: { color: string }) {
  return (
    <g>
      <circle cx={104} cy={196} r={26} fill={color} {...S} />
      <circle cx={196} cy={196} r={26} fill={color} {...S} />
    </g>
  );
}

function LongSleeves({ color }: { color: string }) {
  return (
    <g>
      <path d={ARM_L} stroke={OUTLINE} strokeWidth={36} strokeLinecap="round" fill="none" />
      <path d={ARM_R} stroke={OUTLINE} strokeWidth={36} strokeLinecap="round" fill="none" />
      <path d={ARM_L} stroke={color} strokeWidth={28} strokeLinecap="round" fill="none" />
      <path d={ARM_R} stroke={color} strokeWidth={28} strokeLinecap="round" fill="none" />
    </g>
  );
}

function Sash({ color }: { color: string }) {
  return <path d="M 106 234 L 194 234 L 194 252 L 106 252 Z" fill={color} {...S} />;
}

export const DRESSES: Item[] = [
  { id: 'none', name: 'No Dress', color: '#FFB3CB' },

  {
    id: 'princess',
    name: 'Princess',
    color: '#FF9FC4',
    draw: ({ color }) => (
      <g>
        <PuffSleeves color={color} />
        <path d={bell(414, 44)} fill={color} {...S} />
        <path d={BODICE} fill={shade(color, 8)} {...S} />
        <Sash color={shade(color, -20)} />
        <path
          d="M 78 396 q 24 20 48 0 q 24 20 48 0 q 24 20 48 0"
          fill="none"
          stroke={shade(color, -16)}
          strokeWidth={6}
          strokeLinecap="round"
        />
        {[
          [116, 320],
          [184, 340],
          [150, 380],
        ].map(([x, y], i) => (
          <polygon key={i} points={starPoints(x, y, 13)} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3.5} />
        ))}
      </g>
    ),
  },

  {
    id: 'ballgown',
    name: 'Ball Gown',
    color: '#B98CFF',
    draw: ({ color }) => (
      <g>
        <path d={bell(422, 58)} fill={color} {...S} />
        <path d={BODICE_STRAP} fill={shade(color, 10)} {...S} />
        <Sash color="#FFF0A8" />
        <path d="M 150 254 C 118 300 104 360 96 410" fill="none" stroke={shade(color, -14)} strokeWidth={5} />
        <path d="M 150 254 C 182 300 196 360 204 410" fill="none" stroke={shade(color, -14)} strokeWidth={5} />
        <path d={heartPath(150, 246, 16)} fill="#FF5C8A" stroke={OUTLINE} strokeWidth={4} />
      </g>
    ),
  },

  {
    id: 'sundress',
    name: 'Sundress',
    color: '#FFD166',
    draw: ({ color }) => (
      <g>
        <path d={bell(342, 26)} fill={color} {...S} />
        <path d={BODICE_STRAP} fill={color} {...S} />
        <path d="M 126 180 Q 132 158 142 172" fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" />
        <path d="M 174 180 Q 168 158 158 172" fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" />
        <Sash color="#FFFFFF" />
        <path d="M 138 232 q 12 -14 24 0" fill="none" stroke="#FF7FA8" strokeWidth={6} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'party',
    name: 'Party Dress',
    color: '#FF5C8A',
    draw: ({ color }) => (
      <g>
        <PuffSleeves color={color} />
        <path d={bell(332, 32)} fill={color} {...S} />
        <path d={BODICE} fill={color} {...S} />
        <path
          d="M 72 316 q 22 24 44 4 q 22 24 44 0 q 22 24 44 -6"
          fill="none"
          stroke={shade(color, 14)}
          strokeWidth={9}
          strokeLinecap="round"
        />
        <Sash color="#FFFFFF" />
        <path d="M 144 243 C 126 232 114 242 122 254 C 130 262 142 254 146 248 Z" fill="#FFD166" {...S} strokeWidth={4} />
        <path d="M 156 243 C 174 232 186 242 178 254 C 170 262 158 254 154 248 Z" fill="#FFD166" {...S} strokeWidth={4} />
        <circle cx={150} cy={247} r={8} fill="#FFB347" stroke={OUTLINE} strokeWidth={3.5} />
      </g>
    ),
  },

  {
    id: 'fairy',
    name: 'Fairy Dress',
    color: '#5FD3A6',
    draw: ({ color }) => (
      <g>
        <path
          d="M 118 238 L 182 238 C 200 280 212 312 218 336 L 196 316 L 184 344 L 168 318 L 150 350
             L 132 318 L 116 344 L 104 316 L 82 336 C 88 312 100 280 118 238 Z"
          fill={color}
          {...S}
        />
        <path d={BODICE_STRAP} fill={shade(color, 10)} {...S} />
        <Sash color="#FFF0A8" />
        {[
          [124, 292],
          [176, 292],
          [150, 274],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={7} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3} />
        ))}
      </g>
    ),
  },

  {
    id: 'mermaid',
    name: 'Mermaid',
    color: '#6EC6FF',
    draw: ({ color }) => (
      <g>
        <path
          d="M 118 238 L 182 238 C 186 290 182 336 178 362 C 206 374 214 396 216 414 Q 150 430 84 414
             C 86 396 94 374 122 362 C 118 336 114 290 118 238 Z"
          fill={color}
          {...S}
        />
        <path d={BODICE_STRAP} fill={shade(color, 10)} {...S} />
        <Sash color="#FFFFFF" />
        {[
          [132, 300],
          [168, 300],
          [150, 330],
          [132, 348],
          [168, 348],
        ].map(([x, y], i) => (
          <path key={i} d={`M ${x - 9} ${y} a 9 9 0 0 1 18 0`} fill="none" stroke={shade(color, -18)} strokeWidth={4} />
        ))}
      </g>
    ),
  },

  {
    id: 'polka',
    name: 'Polka Dress',
    color: '#FFFFFF',
    draw: ({ color }) => (
      <g>
        <PuffSleeves color={color} />
        <clipPath id="clip-dress-polka">
          <path d={bell(348, 30)} />
        </clipPath>
        <path d={bell(348, 30)} fill={color} {...S} />
        <g clipPath="url(#clip-dress-polka)">
          {[0, 1, 2, 3, 4].map((r) =>
            [0, 1, 2, 3, 4, 5, 6].map((c) => (
              <circle key={`${r}-${c}`} cx={70 + c * 26 + (r % 2) * 13} cy={252 + r * 22} r={7} fill="#FF7FA8" />
            )),
          )}
        </g>
        <path d={bell(348, 30)} fill="none" {...S} />
        <path d={BODICE} fill={color} {...S} />
        <Sash color="#FF7FA8" />
      </g>
    ),
  },

  {
    id: 'tutudress',
    name: 'Tutu Dress',
    color: '#F27CD0',
    draw: ({ color }) => (
      <g>
        {[
          [82, 320, 30],
          [114, 332, 34],
          [150, 336, 36],
          [186, 332, 34],
          [218, 320, 30],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={shade(color, 10)} {...S} />
        ))}
        {[
          [102, 292, 28],
          [150, 298, 30],
          [198, 292, 28],
        ].map(([x, y, r], i) => (
          <circle key={`b${i}`} cx={x} cy={y} r={r} fill={color} {...S} />
        ))}
        <path d={BODICE_STRAP} fill={shade(color, -6)} {...S} />
        <Sash color="#FFFFFF" />
      </g>
    ),
  },

  {
    id: 'winter',
    name: 'Winter Dress',
    color: '#FF7FA8',
    draw: ({ color }) => (
      <g>
        <LongSleeves color={color} />
        <path d={bell(340, 26)} fill={color} {...S} />
        <path d={BODICE} fill={color} {...S} />
        <path
          d="M 76 330 q 22 22 44 6 q 22 22 44 2 q 22 20 44 -6 l 4 18 q -70 22 -140 0 Z"
          fill="#FFFFFF"
          {...S}
        />
        <path d="M 124 174 Q 150 196 176 174 Q 168 162 150 162 Q 132 162 124 174 Z" fill="#FFFFFF" {...S} />
        <circle cx={102} cy={288} r={13} fill="#FFFFFF" {...S} />
        <circle cx={198} cy={288} r={13} fill="#FFFFFF" {...S} />
      </g>
    ),
  },

  {
    id: 'rainbow',
    name: 'Rainbow',
    color: '#FF9E6D',
    draw: () => {
      const bands = ['#FF6F91', '#FF9E6D', '#FFD166', '#B8E986', '#6EC6FF', '#B98CFF'];
      return (
        <g>
          <clipPath id="clip-dress-rainbow">
            <path d={bell(360, 34)} />
          </clipPath>
          <path d={bell(360, 34)} fill="#FFFFFF" {...S} />
          <g clipPath="url(#clip-dress-rainbow)">
            {bands.map((b, i) => (
              <rect key={b} x={60} y={244 + i * 22} width={180} height={23} fill={b} />
            ))}
          </g>
          <path d={bell(360, 34)} fill="none" {...S} />
          <path d={BODICE_STRAP} fill="#FFFFFF" {...S} />
          <Sash color="#FF6F91" />
        </g>
      );
    },
  },

  {
    id: 'stardress',
    name: 'Star Dress',
    color: '#7C8CF8',
    draw: ({ color }) => (
      <g>
        <PuffSleeves color={color} />
        <path d={bell(352, 30)} fill={color} {...S} />
        <path d={BODICE} fill={color} {...S} />
        {[
          [112, 296, 12],
          [150, 320, 15],
          [190, 292, 11],
          [130, 342, 10],
          [176, 340, 12],
        ].map(([x, y, r], i) => (
          <polygon key={i} points={starPoints(x, y, r)} fill="#FFF0A8" stroke={OUTLINE} strokeWidth={3} />
        ))}
        <Sash color="#FFD166" />
      </g>
    ),
  },

  {
    id: 'pinafore',
    name: 'Pinafore',
    color: '#B8E986',
    draw: ({ color }) => (
      <g>
        <path d={bell(330, 24)} fill={color} {...S} />
        <path d="M 124 186 L 176 186 L 176 242 L 124 242 Z" fill={color} {...S} />
        <path d="M 126 188 Q 122 168 112 172" fill="none" stroke={color} strokeWidth={11} strokeLinecap="round" />
        <path d="M 174 188 Q 178 168 188 172" fill="none" stroke={color} strokeWidth={11} strokeLinecap="round" />
        <circle cx={116} cy={176} r={7} fill="#FFD166" stroke={OUTLINE} strokeWidth={3.5} />
        <circle cx={184} cy={176} r={7} fill="#FFD166" stroke={OUTLINE} strokeWidth={3.5} />
        <path d={heartPath(150, 214, 17)} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={4} />
      </g>
    ),
  },

  {
    id: 'kimono',
    name: 'Kimono',
    color: '#FF6F91',
    draw: ({ color }) => (
      <g>
        <LongSleeves color={color} />
        <path d="M 86 200 L 122 200 L 122 268 L 86 268 Z" fill={shade(color, 8)} {...S} />
        <path d="M 178 200 L 214 200 L 214 268 L 178 268 Z" fill={shade(color, 8)} {...S} />
        <path d={bell(376, 14)} fill={color} {...S} />
        <path d={BODICE} fill={color} {...S} />
        <path d="M 122 172 L 150 236 L 178 172" fill="none" stroke="#FFFFFF" strokeWidth={12} strokeLinejoin="round" />
        <path d="M 104 236 L 196 236 L 196 262 L 104 262 Z" fill="#FFD166" {...S} />
        <path d="M 136 240 L 164 240 L 164 258 L 136 258 Z" fill="#FF5C8A" {...S} strokeWidth={4} />
      </g>
    ),
  },
];
