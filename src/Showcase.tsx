import { DollSvg } from './components/DollSvg';
import { CATEGORIES, DEFAULT_OUTFIT, DRESSES, PANTS, randomOutfit } from './data';
import type { Item, Outfit } from './types';

/** Dev-only contact sheet: every option in the wardrobe on one page. */
export default function Showcase() {
  let seed: Outfit = DEFAULT_OUTFIT;
  const combos: Outfit[] = [];
  for (let i = 0; i < 6; i++) {
    seed = randomOutfit(seed);
    combos.push(seed);
  }

  /** Every hem over a loud pair of boots, to prove nothing hides the shoes. */
  const hemCheck = (items: Item[], cat: 'dress' | 'pants') =>
    items.map((item) => {
      const o: Outfit = {
        ...DEFAULT_OUTFIT,
        hat: 'none',
        accessory: 'none',
        makeup: 'none',
        shoes: 'hero',
        dress: cat === 'dress' ? item.id : 'none',
        pants: cat === 'pants' ? item.id : 'none',
        shirt: cat === 'pants' ? 'none' : DEFAULT_OUTFIT.shirt,
        colors: { ...DEFAULT_OUTFIT.colors, [cat]: item.color, shoes: '#FF4F5A' },
      };
      return (
        <div key={item.id} className="w-[104px]">
          <DollSvg outfit={o} viewBox="30 230 240 220" className="h-[95px] w-full bg-lime-50 rounded" />
          <div className="text-[9px] text-center">{item.name}</div>
        </div>
      );
    });

  return (
    <div className="p-4 bg-white">
      <div className="grid grid-cols-6 gap-2 mb-6">
        {combos.map((o, i) => (
          <DollSvg key={i} outfit={o} className="h-[300px] w-full bg-pink-50 rounded" />
        ))}
      </div>

      <h2 className="font-bold text-lime-700">Focus — hems and leg coverage</h2>
      <div className="grid grid-cols-4 gap-2 mb-6">
        {(
          [
            ['Mermaid + platform boots', { dress: 'mermaid', shoes: 'gothic' }],
            ['Mermaid, no shoes', { dress: 'mermaid', shoes: 'none' }],
            ['Ice gown + platform boots', { dress: 'gown-iceP', shoes: 'gothic' }],
            ['Paw leggings + hero boots', { dress: 'none', pants: 'cat', shirt: 'cat', shoes: 'hero' }],
          ] as [string, Partial<Outfit>][]
        ).map(([label, patch]) => (
          <div key={label}>
            <DollSvg
              outfit={{ ...DEFAULT_OUTFIT, hat: 'none', accessory: 'none', ...patch }}
              viewBox="40 200 220 260"
              className="h-[320px] w-full bg-lime-50 rounded"
            />
            <div className="text-[11px] text-center font-bold">{label}</div>
          </div>
        ))}
      </div>

      <h2 className="font-bold text-lime-700">Hem check — dresses over boots</h2>
      <div className="flex flex-wrap gap-1 mb-4">{hemCheck(DRESSES, 'dress')}</div>
      <h2 className="font-bold text-lime-700">Hem check — bottoms over boots</h2>
      <div className="flex flex-wrap gap-1 mb-6">{hemCheck(PANTS, 'pants')}</div>

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
