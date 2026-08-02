import { DollSvg } from './components/DollSvg';
import { CATEGORIES, DEFAULT_OUTFIT, randomOutfit } from './data';
import type { Outfit } from './types';

/** Dev-only contact sheet: every option in the wardrobe on one page. */
export default function Showcase() {
  let seed: Outfit = DEFAULT_OUTFIT;
  const combos: Outfit[] = [];
  for (let i = 0; i < 6; i++) {
    seed = randomOutfit(seed);
    combos.push(seed);
  }

  return (
    <div className="p-4 bg-white">
      <div className="grid grid-cols-6 gap-2 mb-6">
        {combos.map((o, i) => (
          <DollSvg key={i} outfit={o} className="h-[300px] w-full bg-pink-50 rounded" />
        ))}
      </div>
      {CATEGORIES.map((c) => (
        <div key={c.id} className="mb-4">
          <h2 className="font-bold text-pink-600">{c.label}</h2>
          <div className="flex flex-wrap gap-1">
            {c.items.map((item) => {
              const o: Outfit = {
                ...DEFAULT_OUTFIT,
                hat: 'none',
                accessory: 'none',
                makeup: 'none',
                colors: { ...DEFAULT_OUTFIT.colors, [c.id]: item.color },
              };
              if (c.id === 'doll') {
                Object.assign(o, {
                  doll: item.id,
                  dress: 'none',
                  shoes: 'none',
                });
              } else {
                (o as unknown as Record<string, unknown>)[c.id] = item.id;
                if (c.id === 'shirt' || c.id === 'pants') o.dress = 'none';
                if (c.id === 'shoes') {
                  o.dress = 'none';
                  o.pants = 'none';
                }
              }
              return (
                <div key={item.id} className="w-[110px]">
                  <DollSvg outfit={o} viewBox={c.thumb} className="h-[110px] w-full bg-pink-50 rounded" />
                  <div className="text-[10px] text-center">{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
