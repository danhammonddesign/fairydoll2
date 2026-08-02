import type { ReactNode } from 'react';
import { OUTLINE, shade } from './palette';

// Hair is drawn in two passes: `back` sits behind the whole body, `front`
// sits on top of the head. Both share the same skull arc so every style
// reads as the same doll underneath.

const CAP = 'M 92 104 A 58 62 0 0 1 208 104';

/** A long fall of hair behind the body, ending at `bottom`. */
const sweep = (bottom: number, flare = 8) =>
  `M 94 100 C 94 46 206 46 206 100 C ${206 + flare} 180 ${204 + flare} ${bottom - 40} ${
    198 + flare * 0.6
  } ${bottom} Q 150 ${bottom + 18} ${102 - flare * 0.6} ${bottom} C ${96 - flare} ${
    bottom - 40
  } ${94 - flare} 180 94 100 Z`;

const BANGS_STRAIGHT = `${CAP} L 206 90 C 190 80 178 94 164 86 C 154 96 146 86 136 92 C 124 84 108 82 94 90 Z`;
const BANGS_SIDE = `${CAP} L 205 94 C 176 104 146 98 118 86 C 106 82 97 90 94 96 Z`;
const BANGS_CURTAIN = `${CAP} L 205 94 C 204 76 186 62 158 74 Q 150 80 142 74 C 114 62 96 76 95 94 Z`;
const BANGS_WISPY = `${CAP} L 205 86 C 192 96 180 82 168 92 C 156 82 144 96 132 88 C 120 96 106 82 95 86 Z`;

/** A rope of hair: overlapping blobs that read as a braid. */
function Braid({ x, y, n, w, color }: { x: number; y: number; n: number; w: number; color: string }) {
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <ellipse
          key={i}
          cx={x + (i % 2 === 0 ? -2 : 2)}
          cy={y + i * (w * 0.8)}
          rx={w * 0.62}
          ry={w * 0.55}
          fill={color}
          stroke={OUTLINE}
          strokeWidth={4}
        />
      ))}
    </g>
  );
}

export interface HairStyle {
  back?: (color: string) => ReactNode;
  front: (color: string) => ReactNode;
}

const S = { stroke: OUTLINE, strokeWidth: 5, strokeLinejoin: 'round' as const };

export const HAIR_STYLES: Record<string, HairStyle> = {
  longWavy: {
    back: (c) => (
      <g>
        <path d={sweep(330, 12)} fill={shade(c, -8)} {...S} />
        <path
          d="M 96 300 q 18 22 34 2 q 16 20 34 0 q 16 22 34 -4"
          fill="none"
          stroke={shade(c, -18)}
          strokeWidth={5}
          strokeLinecap="round"
        />
      </g>
    ),
    front: (c) => <path d={BANGS_CURTAIN} fill={c} {...S} />,
  },

  longStraight: {
    back: (c) => <path d={sweep(348, 4)} fill={shade(c, -8)} {...S} />,
    front: (c) => <path d={BANGS_STRAIGHT} fill={c} {...S} />,
  },

  bob: {
    back: (c) => <path d={sweep(178, 14)} fill={shade(c, -8)} {...S} />,
    front: (c) => <path d={BANGS_STRAIGHT} fill={c} {...S} />,
  },

  pixie: {
    back: (c) => <path d={sweep(132, 2)} fill={shade(c, -8)} {...S} />,
    front: (c) => (
      <g>
        <path d={BANGS_WISPY} fill={c} {...S} />
        <path d="M 96 96 q -14 26 -4 44" fill="none" stroke={c} strokeWidth={11} strokeLinecap="round" />
      </g>
    ),
  },

  twinTails: {
    back: (c) => (
      <g>
        <path d={sweep(168, 6)} fill={shade(c, -8)} {...S} />
        <path d="M 84 122 C 46 150 42 220 62 268 C 84 258 96 200 100 150 Z" fill={shade(c, -6)} {...S} />
        <path d="M 216 122 C 254 150 258 220 238 268 C 216 258 204 200 200 150 Z" fill={shade(c, -6)} {...S} />
      </g>
    ),
    front: (c) => (
      <g>
        <path d={BANGS_STRAIGHT} fill={c} {...S} />
        <circle cx={88} cy={118} r={13} fill="#FF7FA8" {...S} />
        <circle cx={212} cy={118} r={13} fill="#FF7FA8" {...S} />
      </g>
    ),
  },

  ponytail: {
    back: (c) => (
      <g>
        <path d={sweep(150, 4)} fill={shade(c, -8)} {...S} />
        <path
          d="M 206 104 C 250 128 258 210 232 276 C 216 282 204 262 210 232 C 216 190 206 150 194 130 Z"
          fill={shade(c, -6)}
          {...S}
        />
      </g>
    ),
    front: (c) => (
      <g>
        <path d={BANGS_SIDE} fill={c} {...S} />
        <circle cx={204} cy={104} r={12} fill="#FFD166" {...S} />
      </g>
    ),
  },

  afro: {
    back: (c) => (
      <g>
        <circle cx={150} cy={92} r={78} fill={shade(c, -6)} {...S} />
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={150 + Math.cos(a) * 74}
              cy={92 + Math.sin(a) * 74}
              r={17}
              fill={shade(c, -6)}
              {...S}
            />
          );
        })}
        <circle cx={150} cy={92} r={78} fill={shade(c, -6)} />
      </g>
    ),
    front: (c) => <path d={BANGS_WISPY} fill={c} {...S} />,
  },

  braids: {
    back: (c) => (
      <g>
        <path d={sweep(158, 6)} fill={shade(c, -8)} {...S} />
        <Braid x={84} y={130} n={9} w={22} color={shade(c, -4)} />
        <Braid x={216} y={130} n={9} w={22} color={shade(c, -4)} />
      </g>
    ),
    front: (c) => (
      <g>
        <path d={BANGS_STRAIGHT} fill={c} {...S} />
        <circle cx={84} cy={302} r={10} fill="#FF7FA8" {...S} />
        <circle cx={216} cy={302} r={10} fill="#FF7FA8" {...S} />
      </g>
    ),
  },

  sideBraid: {
    back: (c) => <path d={sweep(160, 6)} fill={shade(c, -8)} {...S} />,
    front: (c) => (
      <g>
        <path d={BANGS_SIDE} fill={c} {...S} />
        <Braid x={96} y={140} n={9} w={24} color={shade(c, -4)} />
        <circle cx={96} cy={330} r={11} fill="#B98CFF" {...S} />
      </g>
    ),
  },

  spaceBuns: {
    back: (c) => <path d={sweep(150, 4)} fill={shade(c, -8)} {...S} />,
    front: (c) => (
      <g>
        <circle cx={96} cy={48} r={30} fill={shade(c, -4)} {...S} />
        <circle cx={204} cy={48} r={30} fill={shade(c, -4)} {...S} />
        <path d={BANGS_STRAIGHT} fill={c} {...S} />
        <circle cx={96} cy={48} r={13} fill="none" stroke={shade(c, -22)} strokeWidth={4} />
        <circle cx={204} cy={48} r={13} fill="none" stroke={shade(c, -22)} strokeWidth={4} />
      </g>
    ),
  },

  messyBun: {
    back: (c) => <path d={sweep(146, 4)} fill={shade(c, -8)} {...S} />,
    front: (c) => (
      <g>
        <circle cx={150} cy={34} r={31} fill={shade(c, -4)} {...S} />
        <path d={BANGS_WISPY} fill={c} {...S} />
        <path d="M 94 100 q -16 34 -6 58" fill="none" stroke={c} strokeWidth={11} strokeLinecap="round" />
        <path d="M 206 100 q 16 34 6 58" fill="none" stroke={c} strokeWidth={11} strokeLinecap="round" />
        <path
          d="M 132 30 q 18 -14 36 0"
          fill="none"
          stroke={shade(c, -20)}
          strokeWidth={4.5}
          strokeLinecap="round"
        />
      </g>
    ),
  },

  halfUp: {
    back: (c) => (
      <g>
        <path d={sweep(310, 10)} fill={shade(c, -8)} {...S} />
        <path
          d="M 100 286 q 16 20 32 0 q 16 20 34 0 q 16 20 32 -2"
          fill="none"
          stroke={shade(c, -18)}
          strokeWidth={5}
          strokeLinecap="round"
        />
      </g>
    ),
    front: (c) => (
      <g>
        <path d={BANGS_CURTAIN} fill={c} {...S} />
        <path d="M 150 42 C 116 30 104 60 128 62 C 140 62 148 54 150 44 Z" fill={shade(c, -4)} {...S} />
        <path d="M 150 42 C 184 30 196 60 172 62 C 160 62 152 54 150 44 Z" fill={shade(c, -4)} {...S} />
        <circle cx={150} cy={48} r={8} fill="#FF7FA8" {...S} />
      </g>
    ),
  },
};
