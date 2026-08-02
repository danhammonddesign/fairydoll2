import type { ReactNode } from 'react';
import { OUTLINE } from './palette';
import { flame, heartPath, moon, snowflake, starPoints, wave } from './shapes';

export type MotifKind = 'heart' | 'snow' | 'flame' | 'rainbow' | 'moon' | 'wave';

const BANDS = ['#FF6F91', '#FFD166', '#6EC6FF'];

/**
 * The emblem that tells one princess from another — on her crown, her
 * bodice, her shoes and her wand.
 */
export function Motif({
  kind,
  x,
  y,
  r,
  color,
  line = OUTLINE,
  width = 3,
}: {
  kind: MotifKind;
  x: number;
  y: number;
  r: number;
  color: string;
  line?: string;
  width?: number;
}): ReactNode {
  switch (kind) {
    case 'heart':
      return <path d={heartPath(x, y, r * 0.95)} fill={color} stroke={line} strokeWidth={width} strokeLinejoin="round" />;

    case 'snow':
      return (
        <g>
          <path d={snowflake(x, y, r)} fill="none" stroke={line} strokeWidth={width + 2.5} strokeLinecap="round" />
          <path d={snowflake(x, y, r)} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />
        </g>
      );

    case 'flame':
      return (
        <g>
          <path d={flame(x, y, r)} fill={color} stroke={line} strokeWidth={width} strokeLinejoin="round" />
          <path d={flame(x, y + r * 0.28, r * 0.5)} fill="#FFF0A8" />
        </g>
      );

    case 'rainbow':
      return (
        <g>
          {BANDS.map((c, i) => (
            <path
              key={c}
              d={`M ${x - r + i * r * 0.26} ${y + r * 0.5} A ${r - i * r * 0.26} ${r - i * r * 0.26} 0 0 1 ${
                x + r - i * r * 0.26
              } ${y + r * 0.5}`}
              fill="none"
              stroke={c}
              strokeWidth={r * 0.26}
            />
          ))}
          <path
            d={`M ${x - r} ${y + r * 0.5} A ${r} ${r} 0 0 1 ${x + r} ${y + r * 0.5}`}
            fill="none"
            stroke={line}
            strokeWidth={width * 0.8}
          />
        </g>
      );

    case 'moon':
      return (
        <g>
          <path d={moon(x + r * 0.2, y, r)} fill={color} stroke={line} strokeWidth={width} strokeLinejoin="round" />
          <polygon points={starPoints(x - r * 0.75, y - r * 0.6, r * 0.42)} fill={color} stroke={line} strokeWidth={width * 0.75} />
        </g>
      );

    case 'wave':
      return (
        <g>
          <path d={wave(x, y, r)} fill={color} stroke={line} strokeWidth={width} strokeLinejoin="round" />
          <circle cx={x + r * 0.55} cy={y + r * 0.2} r={r * 0.16} fill="#FFFFFF" />
        </g>
      );
  }
}
