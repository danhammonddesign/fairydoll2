import { ARM_L, ARM_R } from '../art/body';
import { OUTLINE, shade } from '../art/palette';
import { heartPath, starPoints } from '../art/shapes';
import type { Item } from '../types';

const S = { stroke: OUTLINE, strokeWidth: 5, strokeLinejoin: 'round' as const };

/** Body of a top that reaches the hips. */
const FULL =
  'M 116 172 C 102 182 98 210 108 240 C 100 256 100 272 104 286 L 196 286 ' +
  'C 200 272 200 256 192 240 C 202 210 198 182 184 172 ' +
  'C 176 167 168 166 162 172 Q 150 188 138 172 C 132 166 124 167 116 172 Z';

/** Body of a top that stops above the waist. */
const CROP =
  'M 116 172 C 102 182 98 202 104 228 L 196 228 C 202 202 198 182 184 172 ' +
  'C 176 167 168 166 162 172 Q 150 188 138 172 C 132 166 124 167 116 172 Z';

function ShortSleeves({ color }: { color: string }) {
  return (
    <g>
      <path d="M 118 170 C 100 176 92 196 96 216 C 108 226 124 220 128 206 Z" fill={color} {...S} />
      <path d="M 182 170 C 200 176 208 196 204 216 C 192 226 176 220 172 206 Z" fill={color} {...S} />
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

function PuffSleeves({ color }: { color: string }) {
  return (
    <g>
      <circle cx={104} cy={196} r={26} fill={color} {...S} />
      <circle cx={196} cy={196} r={26} fill={color} {...S} />
    </g>
  );
}

export const SHIRTS: Item[] = [
  { id: 'none', name: 'No Shirt', color: '#FFB3CB' },

  {
    id: 'tee',
    name: 'T-Shirt',
    color: '#6EC6FF',
    draw: ({ color }) => (
      <g>
        <ShortSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
      </g>
    ),
  },

  {
    id: 'hearttee',
    name: 'Heart Tee',
    color: '#FFFFFF',
    draw: ({ color }) => (
      <g>
        <ShortSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <path d={heartPath(150, 224, 26)} fill="#FF5C8A" stroke={OUTLINE} strokeWidth={4} />
      </g>
    ),
  },

  {
    id: 'striped',
    name: 'Stripes',
    color: '#FFFFFF',
    draw: ({ color }) => (
      <g>
        <ShortSleeves color={color} />
        <clipPath id="clip-shirt-full">
          <path d={FULL} />
        </clipPath>
        <path d={FULL} fill={color} {...S} />
        <g clipPath="url(#clip-shirt-full)">
          {[186, 208, 230, 252, 274].map((y) => (
            <rect key={y} x={94} y={y} width={112} height={11} fill="#FF5C8A" />
          ))}
        </g>
        <path d={FULL} fill="none" {...S} />
      </g>
    ),
  },

  {
    id: 'tank',
    name: 'Tank Top',
    color: '#B8E986',
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
      </g>
    ),
  },

  {
    id: 'crop',
    name: 'Crop Top',
    color: '#F27CD0',
    draw: ({ color }) => (
      <g>
        <ShortSleeves color={color} />
        <path d={CROP} fill={color} {...S} />
        <path d="M 106 214 L 194 214" stroke={shade(color, -14)} strokeWidth={5} strokeLinecap="round" />
      </g>
    ),
  },

  {
    id: 'hoodie',
    name: 'Hoodie',
    color: '#FF9E6D',
    draw: ({ color }) => (
      <g>
        <LongSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <path d="M 116 172 Q 150 208 184 172 Q 176 152 150 152 Q 124 152 116 172 Z" fill={shade(color, -12)} {...S} />
        <path d="M 138 186 L 134 216" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" />
        <path d="M 162 186 L 166 216" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" />
        <path d="M 120 244 Q 150 264 180 244 L 180 268 Q 150 282 120 268 Z" fill={shade(color, -10)} {...S} />
      </g>
    ),
  },

  {
    id: 'sweater',
    name: 'Sweater',
    color: '#B98CFF',
    draw: ({ color }) => (
      <g>
        <LongSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <path d="M 128 174 Q 150 196 172 174" fill="none" stroke={shade(color, -16)} strokeWidth={8} strokeLinecap="round" />
        <path d="M 104 270 L 196 270" stroke={shade(color, -16)} strokeWidth={6} strokeLinecap="round" />
        {[126, 150, 174].map((x) => (
          <path key={x} d={`M ${x} 200 l 10 12 l -10 12 l -10 -12 Z`} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3.5} />
        ))}
      </g>
    ),
  },

  {
    id: 'blouse',
    name: 'Bow Blouse',
    color: '#FFFFFF',
    draw: ({ color }) => (
      <g>
        <PuffSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <path d="M 144 178 C 126 166 112 176 120 190 C 128 200 142 192 146 184 Z" fill="#FF7FA8" {...S} strokeWidth={4} />
        <path d="M 156 178 C 174 166 188 176 180 190 C 172 200 158 192 154 184 Z" fill="#FF7FA8" {...S} strokeWidth={4} />
        <circle cx={150} cy={183} r={8} fill="#FF5C8A" stroke={OUTLINE} strokeWidth={3.5} />
      </g>
    ),
  },

  {
    id: 'sailor',
    name: 'Sailor Top',
    color: '#FFFFFF',
    draw: ({ color }) => (
      <g>
        <ShortSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <path d="M 118 170 L 182 170 L 186 214 L 150 232 L 114 214 Z" fill="#7FB6F5" {...S} />
        <path d="M 122 178 L 178 178" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" />
        <path d="M 150 208 L 140 236 L 150 246 L 160 236 Z" fill="#FF5C8A" {...S} strokeWidth={4} />
      </g>
    ),
  },

  {
    id: 'cardigan',
    name: 'Cardigan',
    color: '#FFE29A',
    draw: ({ color }) => (
      <g>
        <LongSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <path d="M 150 174 L 150 286" stroke={shade(color, -18)} strokeWidth={5} />
        {[196, 218, 240, 262].map((y) => (
          <circle key={y} cx={162} cy={y} r={6} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3.5} />
        ))}
      </g>
    ),
  },

  {
    id: 'turtleneck',
    name: 'Turtleneck',
    color: '#5FD3A6',
    draw: ({ color }) => (
      <g>
        <LongSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <path d="M 130 138 L 170 138 L 172 178 Q 150 190 128 178 Z" fill={shade(color, 8)} {...S} />
        <path d="M 129 158 Q 150 168 171 158" fill="none" stroke={shade(color, -16)} strokeWidth={4} />
      </g>
    ),
  },

  {
    id: 'star',
    name: 'Star Top',
    color: '#7C8CF8',
    draw: ({ color }) => (
      <g>
        <PuffSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <polygon points={starPoints(150, 222, 30)} fill="#FFD166" stroke={OUTLINE} strokeWidth={4} />
        <polygon points={starPoints(120, 258, 12)} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3} />
        <polygon points={starPoints(180, 258, 12)} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={3} />
      </g>
    ),
  },

  {
    id: 'ruffle',
    name: 'Ruffle Top',
    color: '#FF5C8A',
    draw: ({ color }) => (
      <g>
        <PuffSleeves color={color} />
        <path d={FULL} fill={color} {...S} />
        <path
          d="M 104 268 q 15 20 30 0 q 15 20 31 0 q 15 20 31 0 L 196 286 L 104 286 Z"
          fill={shade(color, 12)}
          {...S}
        />
        <path d="M 126 178 Q 150 198 174 178" fill="none" stroke="#FFFFFF" strokeWidth={7} strokeLinecap="round" />
      </g>
    ),
  },
];
