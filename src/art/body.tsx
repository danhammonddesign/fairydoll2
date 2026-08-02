import { OUTLINE, shade } from './palette';
import type { Doll } from '../types';

// ---------------------------------------------------------------------------
// The doll lives on a fixed 300 x 470 stage. Every hat, shirt and shoe in the
// game is drawn against these exact coordinates, which is why the layers
// always line up.
// ---------------------------------------------------------------------------

export const STAGE = '0 0 300 470';

export const HEAD = { cx: 150, cy: 100, rx: 54, ry: 58 };
export const ARM_L = 'M 120 190 C 104 216 98 250 102 284';
export const ARM_R = 'M 180 190 C 196 216 202 250 198 284';
export const LEG_L = 'M 130 272 C 126 312 126 352 128 394';
export const LEG_R = 'M 170 272 C 174 312 174 352 172 394';
export const TORSO =
  'M 118 176 C 106 184 102 208 112 236 C 104 252 104 268 108 280 L 192 280 ' +
  'C 196 268 196 252 188 236 C 198 208 194 184 182 176 C 168 168 132 168 118 176 Z';

/** Bare skin: legs, arms, torso, neck, head. */
export function Body({ skin }: { skin: string }) {
  const dark = shade(skin, -8);
  return (
    <g>
      {/* legs */}
      <path d={LEG_L} stroke={OUTLINE} strokeWidth={38} strokeLinecap="round" fill="none" />
      <path d={LEG_R} stroke={OUTLINE} strokeWidth={38} strokeLinecap="round" fill="none" />
      <path d={LEG_L} stroke={skin} strokeWidth={30} strokeLinecap="round" fill="none" />
      <path d={LEG_R} stroke={skin} strokeWidth={30} strokeLinecap="round" fill="none" />
      {/* bare feet */}
      <ellipse cx={126} cy={402} rx={19} ry={13} fill={skin} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={174} cy={402} rx={19} ry={13} fill={skin} stroke={OUTLINE} strokeWidth={5} />

      {/* arms */}
      <path d={ARM_L} stroke={OUTLINE} strokeWidth={32} strokeLinecap="round" fill="none" />
      <path d={ARM_R} stroke={OUTLINE} strokeWidth={32} strokeLinecap="round" fill="none" />
      <path d={ARM_L} stroke={skin} strokeWidth={24} strokeLinecap="round" fill="none" />
      <path d={ARM_R} stroke={skin} strokeWidth={24} strokeLinecap="round" fill="none" />
      <circle cx={102} cy={292} r={14} fill={skin} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={198} cy={292} r={14} fill={skin} stroke={OUTLINE} strokeWidth={5} />

      {/* torso */}
      <path d={TORSO} fill={skin} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      {/* neck */}
      <path
        d="M 136 140 L 136 178 Q 150 188 164 178 L 164 140 Z"
        fill={dark}
        stroke={OUTLINE}
        strokeWidth={5}
        strokeLinejoin="round"
      />

      {/* ears */}
      <ellipse cx={97} cy={104} rx={9} ry={13} fill={skin} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={203} cy={104} rx={9} ry={13} fill={skin} stroke={OUTLINE} strokeWidth={5} />
      {/* head */}
      <ellipse
        cx={HEAD.cx}
        cy={HEAD.cy}
        rx={HEAD.rx}
        ry={HEAD.ry}
        fill={skin}
        stroke={OUTLINE}
        strokeWidth={5}
      />
    </g>
  );
}

const EYE_L = 126;
const EYE_R = 174;
const EYE_Y = 108;

function Eye({ x, color, style }: { x: number; color: string; style: Doll['eyeStyle'] }) {
  const flip = x > 150 ? -1 : 1;

  if (style === 'happy') {
    // Upside-down U — the classic "^_^" smiling eye.
    return (
      <path
        d={`M ${x - 13} ${EYE_Y + 5} Q ${x} ${EYE_Y - 15} ${x + 13} ${EYE_Y + 5}`}
        fill="none"
        stroke={OUTLINE}
        strokeWidth={6}
        strokeLinecap="round"
      />
    );
  }

  const rx = style === 'cat' ? 11 : 13;
  const ry = style === 'cat' ? 14 : 16;

  return (
    <g>
      <ellipse cx={x} cy={EYE_Y} rx={rx} ry={ry} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={4} />
      <ellipse cx={x} cy={EYE_Y + 1} rx={rx - 2} ry={ry - 2} fill={color} />
      <ellipse cx={x} cy={EYE_Y + 3} rx={rx - 6} ry={ry - 6} fill="#33212C" />
      {style === 'sparkle' && (
        <>
          <circle cx={x - 4 * flip} cy={EYE_Y - 6} r={4.5} fill="#FFFFFF" />
          <circle cx={x + 5 * flip} cy={EYE_Y + 6} r={2.5} fill="#FFFFFF" opacity={0.85} />
        </>
      )}
      {style !== 'sparkle' && <circle cx={x - 4 * flip} cy={EYE_Y - 6} r={4} fill="#FFFFFF" />}
      {/* lash line */}
      <path
        d={`M ${x - rx} ${EYE_Y - ry + 4} Q ${x} ${EYE_Y - ry - 4} ${x + rx} ${EYE_Y - ry + 4}`}
        fill="none"
        stroke={OUTLINE}
        strokeWidth={6}
        strokeLinecap="round"
      />
      {style === 'cat' && (
        <path
          d={`M ${x + rx * flip * -1} ${EYE_Y - ry + 2} l ${-6 * flip} ${-6}`}
          stroke={OUTLINE}
          strokeWidth={5}
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

/** Eyes, brows, nose, mouth and a default hint of blush. */
export function Face({ doll }: { doll: Doll }) {
  const brow = shade(doll.hair, -20);
  return (
    <g>
      <ellipse cx={112} cy={128} rx={13} ry={7} fill="#FF9BB8" opacity={0.5} />
      <ellipse cx={188} cy={128} rx={13} ry={7} fill="#FF9BB8" opacity={0.5} />

      <Eye x={EYE_L} color={doll.eye} style={doll.eyeStyle} />
      <Eye x={EYE_R} color={doll.eye} style={doll.eyeStyle} />

      <path d="M 116 82 Q 126 76 136 81" fill="none" stroke={brow} strokeWidth={4.5} strokeLinecap="round" />
      <path d="M 164 81 Q 174 76 184 82" fill="none" stroke={brow} strokeWidth={4.5} strokeLinecap="round" />

      <path d="M 147 130 q 3 3 6 0" fill="none" stroke={OUTLINE} strokeWidth={3.5} strokeLinecap="round" />
      <path
        d="M 141 141 Q 150 150 159 141"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={4.5}
        strokeLinecap="round"
      />
    </g>
  );
}
