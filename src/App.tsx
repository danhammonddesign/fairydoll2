import { useMemo, useRef, useState } from 'react';
import { DollSvg } from './components/DollSvg';
import { CATEGORIES, DEFAULT_OUTFIT, DOLLS, randomOutfit, themeOf } from './data';
import { PALETTE } from './art/palette';
import type { CategoryId, Item, Outfit } from './types';

type OutfitKey = keyof Omit<Outfit, 'colors'>;

/** Fixed positions so the floating background never re-shuffles on render. */
const FLOATERS = [
  { e: '💖', x: 8, y: 14, s: 26, d: 0 },
  { e: '⭐', x: 84, y: 10, s: 22, d: 1.4 },
  { e: '🌸', x: 16, y: 74, s: 24, d: 2.2 },
  { e: '✨', x: 90, y: 62, s: 20, d: 0.8 },
  { e: '🦋', x: 6, y: 44, s: 22, d: 3 },
  { e: '💕', x: 92, y: 86, s: 20, d: 2.6 },
  { e: '⭐', x: 74, y: 34, s: 16, d: 1.9 },
  { e: '✨', x: 24, y: 30, s: 16, d: 3.4 },
];

export default function App() {
  const [outfit, setOutfit] = useState<Outfit>(DEFAULT_OUTFIT);
  const [active, setActive] = useState<CategoryId>('doll');
  const [cheer, setCheer] = useState<string | null>(null);
  const stageRef = useRef<SVGSVGElement>(null);

  const category = CATEGORIES.find((c) => c.id === active)!;
  const doll = DOLLS.find((d) => d.id === outfit.doll) ?? DOLLS[0];

  function choose(item: Item) {
    setOutfit((prev) => {
      const next: Outfit = { ...prev, colors: { ...prev.colors } };
      next[active as OutfitKey] = item.id;
      next.colors[active] = item.color;

      // A dress replaces a shirt-and-pants outfit, and vice versa.
      if (active === 'dress' && item.id !== 'none') {
        next.shirt = 'none';
        next.pants = 'none';
      }
      if ((active === 'shirt' || active === 'pants') && item.id !== 'none') {
        next.dress = 'none';
      }
      return next;
    });
  }

  function paint(color: string) {
    setOutfit((prev) => ({ ...prev, colors: { ...prev.colors, [active]: color } }));
  }

  function surprise() {
    setOutfit((prev) => randomOutfit(prev));
    flash('Ta-da! ✨');
  }

  function flash(msg: string) {
    setCheer(msg);
    window.setTimeout(() => setCheer(null), 1600);
  }

  function save() {
    const svg = stageRef.current;
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('width', '900');
    clone.setAttribute('height', '1410');
    const source = new XMLSerializer().serializeToString(clone);

    // Some hosts block blob: in img-src, others block data:. Try both.
    const sources = [
      `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`,
      URL.createObjectURL(new Blob([source], { type: 'image/svg+xml;charset=utf-8' })),
    ];

    const attempt = (i: number) => {
      if (i >= sources.length) {
        flash('Could not save 😢');
        return;
      }
      const img = new Image();
      img.onerror = () => attempt(i + 1);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 900;
        canvas.height = 1410;
        const c = canvas.getContext('2d');
        if (!c) return;
        c.fillStyle = '#FFEAF4';
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (!blob) {
            attempt(i + 1);
            return;
          }
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${doll.name}-dressup.png`;
          link.click();
          URL.revokeObjectURL(link.href);
          flash('Saved! 💾');
        });
      };
      img.src = sources[i];
    };

    attempt(0);
  }

  const selectedId = outfit[active as OutfitKey];
  const canPaint = active !== 'doll' && selectedId !== 'none';

  /** Outfit used to draw one option button. */
  const previewFor = useMemo(
    () =>
      (item: Item): Outfit => {
        if (active === 'doll') {
          return {
            ...outfit,
            doll: item.id,
            hat: 'none',
            shirt: 'none',
            pants: 'none',
            dress: 'none',
            accessory: 'none',
            makeup: 'none',
            shoes: 'none',
          };
        }
        const next: Outfit = { ...outfit, colors: { ...outfit.colors, [active]: item.color } };
        next[active as OutfitKey] = item.id;
        if (active === 'dress' && item.id !== 'none') {
          next.shirt = 'none';
          next.pants = 'none';
        }
        if (active === 'shirt' || active === 'pants') next.dress = 'none';
        // Long skirts would hide the shoes being previewed.
        if (active === 'shoes') {
          next.dress = 'none';
          next.pants = 'none';
        }
        return next;
      },
    [outfit, active],
  );

  return (
    <div className="h-[100dvh] w-full flex flex-col md:flex-row bg-[#FFEAF4] overflow-hidden">
      {/* ---------------------------------------------------------------- stage */}
      <main className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFE3F1] via-[#F6E6FF] to-[#E4F4FF]">
        <div className="pointer-events-none absolute inset-0">
          {FLOATERS.map((f, i) => (
            <span
              key={i}
              className="absolute float-soft select-none opacity-70"
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                fontSize: f.s,
                animationDelay: `${f.d}s`,
              }}
            >
              {f.e}
            </span>
          ))}
        </div>

        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <button
            onClick={surprise}
            aria-label="Surprise me with a random outfit"
            className="tap grid h-12 w-12 place-items-center rounded-full bg-white/90 text-xl shadow-lg ring-2 ring-pink-200"
          >
            🎲
          </button>
          <button
            onClick={save}
            aria-label="Save a picture of your doll"
            className="tap grid h-12 w-12 place-items-center rounded-full bg-white/90 text-xl shadow-lg ring-2 ring-pink-200"
          >
            💾
          </button>
        </div>

        <DollSvg ref={stageRef} outfit={outfit} className="h-full w-full max-h-full p-3 md:p-6 drop-shadow-xl" />

        {cheer && (
          <div className="pop absolute top-1/4 left-1/2 -translate-x-1/2 z-20 rounded-full bg-white/95 px-6 py-2 text-xl font-extrabold text-pink-500 shadow-lg ring-2 ring-pink-200">
            {cheer}
          </div>
        )}

      </main>

      {/* ----------------------------------------------------------------- tray */}
      <section className="shrink-0 md:w-[440px] md:h-full bg-white/95 shadow-[0_-8px_24px_rgba(255,150,190,0.25)] md:shadow-[-8px_0_24px_rgba(255,150,190,0.2)] flex flex-col gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {/* categories */}
        <div className="no-bar flex gap-2 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible">
          {CATEGORIES.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                onClick={(e) => {
                  setActive(c.id);
                  // Swiped-past tabs pull themselves back into view when tapped.
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }}
                className={`tap flex w-[72px] shrink-0 flex-col items-center justify-center rounded-2xl px-2 py-1.5 transition-colors md:w-auto ${
                  on ? 'bg-pink-400 text-white shadow-md' : 'bg-pink-50 text-pink-400'
                }`}
              >
                <span className="text-2xl leading-none">{c.emoji}</span>
                <span className="mt-1 text-[11px] font-extrabold uppercase tracking-wide">{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* options */}
        <div
          key={active}
          className="no-bar flex gap-2 overflow-x-auto py-1 md:grid md:grid-cols-4 md:auto-rows-min md:content-start md:gap-3 md:flex-1 md:overflow-y-auto"
        >
          {category.items.map((item) => {
            const on = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => choose(item)}
                aria-label={item.name}
                className={`tap relative shrink-0 w-[84px] md:w-full rounded-2xl border-4 bg-gradient-to-b from-[#FFF6FB] to-[#F3ECFF] p-0.5 transition-colors ${
                  on ? 'border-pink-400 shadow-md' : 'border-pink-100'
                }`}
              >
                <DollSvg outfit={previewFor(item)} viewBox={category.thumb} className="h-[74px] w-full md:h-[92px]" />
                {themeOf(item.theme) && (
                  <span
                    className="absolute -top-1.5 -left-1.5 grid h-6 w-6 place-items-center rounded-full bg-white text-xs shadow ring-1 ring-pink-100"
                    title={themeOf(item.theme)!.name}
                  >
                    {themeOf(item.theme)!.emoji}
                  </span>
                )}
                <span className="block truncate rounded-b-xl bg-white/70 text-[10px] font-bold text-pink-500">
                  {item.name}
                </span>
                {on && (
                  <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-pink-400 text-xs text-white shadow">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* colours */}
        {canPaint && (
          <div className="no-bar flex h-11 items-center gap-2 overflow-x-auto">
            <span className="shrink-0 text-lg" aria-hidden>
              🎨
            </span>
            {PALETTE.map((c) => (
              <button
                key={c}
                onClick={() => paint(c)}
                aria-label={`Colour ${c}`}
                className={`tap h-9 w-9 shrink-0 rounded-full border-4 ${
                  outfit.colors[active] === c ? 'border-pink-500' : 'border-white'
                } shadow`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
