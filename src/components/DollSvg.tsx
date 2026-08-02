import { forwardRef } from 'react';
import { Body, Face, STAGE } from '../art/body';
import { HAIR_STYLES } from '../art/hair';
import { DOLLS, findItem } from '../data';
import type { CategoryId, DrawCtx, Outfit } from '../types';

interface Props {
  outfit: Outfit;
  viewBox?: string;
  className?: string;
}

/**
 * Draws the whole doll. Every category is one layer, stacked back to front:
 * wings → hair → body → face → makeup → clothes → shoes → hair → hat → extras.
 */
export const DollSvg = forwardRef<SVGSVGElement, Props>(function DollSvg(
  { outfit, viewBox = STAGE, className },
  ref,
) {
  const doll = DOLLS.find((d) => d.id === outfit.doll) ?? DOLLS[0];
  const hair = HAIR_STYLES[doll.hairStyle];

  const ctx = (cat: CategoryId): DrawCtx => ({
    color: outfit.colors[cat],
    skin: doll.skin,
    hair: doll.hair,
  });

  const layer = (cat: CategoryId, which: 'draw' | 'back' = 'draw') => {
    const item = findItem(cat, outfit[cat as keyof Omit<Outfit, 'colors'>] as string);
    const fn = item?.[which];
    return fn ? fn(ctx(cat)) : null;
  };

  const wearingDress = outfit.dress !== 'none';

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <g strokeLinejoin="round" strokeLinecap="round">
        {layer('accessory', 'back')}
        {hair.back?.(doll.hair)}

        <Body skin={doll.skin} />
        <Face doll={doll} />
        {layer('makeup')}

        {!wearingDress && layer('pants')}
        {!wearingDress && layer('shirt')}
        {wearingDress && layer('dress')}

        {layer('shoes')}

        {hair.front(doll.hair)}
        {layer('hat')}
        {layer('accessory')}
      </g>
    </svg>
  );
});
