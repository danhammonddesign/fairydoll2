import type { ReactNode } from 'react';
import { ARM_L, ARM_R, LEG_L, LEG_R } from './body';
import { OUTLINE, shade } from './palette';

// Garment primitives. Every costume is assembled from these, which is what
// keeps a witch's boot and a ballerina's slipper looking like the same set.

export const S = { stroke: OUTLINE, strokeWidth: 5, strokeLinejoin: 'round' as const };

/** Mirror left-side art across the doll (x = 150) to make a matching pair. */
export function pair(art: ReactNode): ReactNode {
  return (
    <g>
      {art}
      <g transform="translate(300 0) scale(-1 1)">{art}</g>
    </g>
  );
}

// ---------------------------------------------------------------- tops

/** Top that reaches the hips. */
export const FULL =
  'M 116 172 C 102 182 98 210 108 240 C 100 256 100 272 104 286 L 196 286 ' +
  'C 200 272 200 256 192 240 C 202 210 198 182 184 172 ' +
  'C 176 167 168 166 162 172 Q 150 188 138 172 C 132 166 124 167 116 172 Z';

/** Top that stops above the waist. */
export const CROP =
  'M 116 172 C 102 182 98 202 104 228 L 196 228 C 202 202 198 182 184 172 ' +
  'C 176 167 168 166 162 172 Q 150 188 138 172 C 132 166 124 167 116 172 Z';

/** Fitted dress top, ending at the waist. */
export const BODICE =
  'M 116 172 C 102 182 98 210 108 242 L 192 242 C 202 210 198 182 184 172 ' +
  'C 176 167 168 166 162 172 Q 150 188 138 172 C 132 166 124 167 116 172 Z';

/** Sleeveless dress top. */
export const BODICE_STRAP =
  'M 122 178 C 108 190 104 214 112 242 L 188 242 C 196 214 192 190 178 178 ' +
  'C 172 192 164 198 150 198 C 136 198 128 192 122 178 Z';

export function ShortSleeves({ color }: { color: string }) {
  return (
    <g>
      <path d="M 118 170 C 100 176 92 196 96 216 C 108 226 124 220 128 206 Z" fill={color} {...S} />
      <path d="M 182 170 C 200 176 208 196 204 216 C 192 226 176 220 172 206 Z" fill={color} {...S} />
    </g>
  );
}

export function LongSleeves({ color, cuff }: { color: string; cuff?: string }) {
  return (
    <g>
      <path d={ARM_L} stroke={OUTLINE} strokeWidth={36} strokeLinecap="round" fill="none" />
      <path d={ARM_R} stroke={OUTLINE} strokeWidth={36} strokeLinecap="round" fill="none" />
      <path d={ARM_L} stroke={color} strokeWidth={28} strokeLinecap="round" fill="none" />
      <path d={ARM_R} stroke={color} strokeWidth={28} strokeLinecap="round" fill="none" />
      {cuff && (
        <g>
          <circle cx={102} cy={278} r={16} fill={cuff} {...S} />
          <circle cx={198} cy={278} r={16} fill={cuff} {...S} />
        </g>
      )}
    </g>
  );
}

/** Wide bell sleeves — witches, wizards and gowns. */
export function BellSleeves({ color }: { color: string }) {
  return (
    <g>
      <path d="M 122 186 C 96 214 82 262 84 296 L 128 296 C 122 258 122 218 132 196 Z" fill={color} {...S} />
      <path d="M 178 186 C 204 214 218 262 216 296 L 172 296 C 178 258 178 218 168 196 Z" fill={color} {...S} />
    </g>
  );
}

export function PuffSleeves({ color }: { color: string }) {
  return (
    <g>
      <circle cx={104} cy={196} r={26} fill={color} {...S} />
      <circle cx={196} cy={196} r={26} fill={color} {...S} />
    </g>
  );
}

export function CapSleeves({ color }: { color: string }) {
  return (
    <g>
      <path d="M 120 172 C 106 178 100 192 104 204 C 114 210 126 204 128 194 Z" fill={color} {...S} />
      <path d="M 180 172 C 194 178 200 192 196 204 C 186 210 174 204 172 194 Z" fill={color} {...S} />
    </g>
  );
}

// ------------------------------------------------------------- bottoms

export const HIPS = 'M 104 254 L 196 254 C 200 276 198 294 192 306 L 108 306 C 102 294 104 276 104 254 Z';

/** Classic A-line skirt. */
export const SKIRT = 'M 112 250 L 188 250 C 210 290 216 324 220 344 Q 150 364 80 344 C 84 324 90 290 112 250 Z';

/** Skirt that flares to `bottom`; `w` controls how wide it gets. */
export const bell = (bottom: number, w: number) =>
  `M 118 238 L 182 238 C ${182 + w * 0.5} ${bottom - 70} ${190 + w * 0.8} ${bottom - 26} ${196 + w} ${bottom} ` +
  `Q 150 ${bottom + 22} ${104 - w} ${bottom} C ${110 - w * 0.8} ${bottom - 26} ${118 - w * 0.5} ${
    bottom - 70
  } 118 238 Z`;

const SHORT_L = 'M 130 280 C 127 302 126 318 127 332';
const SHORT_R = 'M 170 280 C 173 302 174 318 173 332';

export function Legs({ color, width = 34, short = false }: { color: string; width?: number; short?: boolean }) {
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

export function Hips({ color }: { color: string }) {
  return <path d={HIPS} fill={color} {...S} />;
}

export function Sash({ color }: { color: string }) {
  return <path d="M 106 234 L 194 234 L 194 252 L 106 252 Z" fill={color} {...S} />;
}

/** A waistband for skirts that start at the waist. */
export function Waistband({ color }: { color: string }) {
  return <path d="M 112 250 L 188 250 L 190 268 L 110 268 Z" fill={color} {...S} />;
}

/** Torn, pointed hem — witches and fairies. */
export const raggedHem = (bottom: number, w: number, teeth = 6) => {
  let d = `M 118 238 L 182 238 C ${182 + w * 0.5} ${bottom - 70} ${190 + w * 0.8} ${bottom - 30} ${
    196 + w
  } ${bottom - 16} `;
  const left = 104 - w;
  const right = 196 + w;
  const step = (right - left) / teeth;
  for (let i = 0; i < teeth; i++) {
    const x = right - step * (i + 1);
    d += `L ${(x + step / 2).toFixed(1)} ${bottom + 22} L ${x.toFixed(1)} ${bottom - 16} `;
  }
  d += `C ${110 - w * 0.8} ${bottom - 30} ${118 - w * 0.5} ${bottom - 70} 118 238 Z`;
  return d;
};

// --------------------------------------------------------------- shoes

/** Left shoe; wrap in `pair()` for both feet. */
export const SHOE = 'M 108 388 C 96 394 96 412 110 418 L 142 418 C 148 412 148 392 142 388 Z';
export const SOLE = 'M 106 408 C 96 410 98 418 110 420 L 142 420 C 148 418 148 410 142 408 Z';
export const FLAT = 'M 106 396 C 96 400 96 414 110 418 L 142 418 C 148 414 148 398 142 396 Z';

/** Boot shaft rising from the shoe to `top`. */
export const shaft = (top: number) => `M 110 ${top} L 146 ${top} L 146 396 L 110 396 Z`;

export function Boot({ color, top = 344, sole }: { color: string; top?: number; sole?: string }) {
  return (
    <g>
      <path d={shaft(top)} fill={color} {...S} />
      <path d={SHOE} fill={color} {...S} />
      <path d={SOLE} fill={sole ?? shade(color, -25)} {...S} />
    </g>
  );
}
