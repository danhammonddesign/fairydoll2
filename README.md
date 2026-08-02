# ✨ Dress-Up Dolls ✨

A cute, mobile-first dress-up game for kids. Pick a doll, then mix and match
hats, dresses, shirts, pants, shoes, accessories and makeup — and recolour any
piece with a tap.

## Costumes

The wardrobe is built around **16 costumes**, and every category has a matching
piece for each one — so a witch hat, witch dress and witch boots are all there
to be found together.

🧙‍♀️ Witch · 🧚 Fairy · 🐱 Cat · 🐶 Puppy · 🖤 Gothic · 🧜‍♀️ Mermaid ·
🦄 Unicorn · 🩰 Ballerina · 🦸‍♀️ Superhero · 🐰 Bunny

The princesses are a family of six that share one silhouette and differ by
palette and emblem:
👑 Pink · ❄️ Ice · 🔥 Fire · 🌈 Rainbow · 🌙 Midnight · 🌊 Ocean

Each option button carries its costume's badge, so matching pieces are easy to
spot without reading. Mixing costumes is entirely allowed.

| Category | Options |
| --- | --- |
| 👧 Dolls | 12 characters, each with their own skin tone, hair style, hair colour and eye style |
| 👑 Hats | 16 + "no hat" — one per costume |
| 👗 Dresses | 16 + "no dress" |
| 👚 Shirts | 16 + "no shirt" |
| 👖 Pants | 16 + "no pants" — skirts, tutus, leggings and shorts |
| 👟 Shoes | 16 + bare feet |
| 🧚 Extras | 16 + "nothing" — wings, tails, capes, wands, collars |
| 💄 Makeup | 16 + natural — whiskers, masks, gems, themed lids and lips |

Picking a dress puts away the shirt and pants, and picking a shirt or pants puts
away the dress — the way a real dress-up box works. **Surprise!** dresses the
doll head-to-toe in one random costume, and **Save** downloads her as a PNG.

## How the art works

Every item is hand-drawn SVG on a shared 300 × 470 stage. `src/art/body.tsx`
holds the head, arm, leg and torso coordinates that all clothing is drawn
against, and one outline colour and stroke weight are used everywhere — so the
whole wardrobe looks like it came from the same sketchbook. Nothing is generated
or downloaded at runtime, so outfits change instantly and the game works
offline.

Layers stack back-to-front in `src/components/DollSvg.tsx`:
wings → back hair → body → face → makeup → clothes → shoes → front hair → hat →
front accessories.

- `src/art/` — palette, shape and motif helpers, body and hair art, and
  `garments.tsx`: the shared sleeves, skirts, bodices and boots every costume
  is assembled from
- `src/data/themes.ts` — the 16 costumes and their palettes
- `src/data/` — one file per wardrobe category
- `src/App.tsx` — the kid-facing UI
- `src/Showcase.tsx` — dev-only contact sheet of every item, at `/?showcase`

## Run locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # type-check
```

No API keys or network access required.
