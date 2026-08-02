# ✨ Dress-Up Dolls ✨

A cute, mobile-first dress-up game for kids. Pick a doll, then mix and match
hats, dresses, shirts, pants, shoes, accessories and makeup — and recolour any
piece with a tap.

## What's in the wardrobe

| Category | Options |
| --- | --- |
| 👧 Dolls | 12 characters, each with their own skin tone, hair style, hair colour and eye style |
| 👑 Hats | 12 + "no hat" — crown, tiara, big bow, flower crown, beanie, sun hat, party hat, cat ears, bunny ears, star band, witch hat, cap, ear muffs |
| 👗 Dresses | 12 + "no dress" — princess, ball gown, sundress, party, fairy, mermaid, polka, tutu, winter, rainbow, star, pinafore, kimono |
| 👚 Shirts | 12 + "no shirt" — tee, heart tee, stripes, tank, crop, hoodie, sweater, bow blouse, sailor, cardigan, turtleneck, star top, ruffle |
| 👖 Pants | 12 + "no pants" — jeans, leggings, star tights, joggers, capris, shorts, denim shorts, bell bottoms, skirt, pleated skirt, polka skirt, tutu, long skirt |
| 👟 Shoes | 12 + bare feet — sneakers, ballet flats, mary janes, boots, star boots, rain boots, snow boots, sandals, flip flops, heels, slippers, roller skates, clogs |
| 🧚 Extras | 12 + "nothing" — fairy/butterfly/angel wings, cat tail, backpack, necklace, pearls, glasses, magic wand, halo, scarf, purse, bow tie |
| 💄 Makeup | 12 + natural — blush, rosy lips, eyeshadow, rainbow lids, winged liner, lashes, freckles, star cheeks, heart cheeks, gems, glitter, sparkle eyes, bold lips |

Picking a dress puts away the shirt and pants, and picking a shirt or pants puts
away the dress — the way a real dress-up box works. **Surprise!** rolls a random
outfit and **Save** downloads the doll as a PNG.

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

- `src/art/` — shared palette, shape helpers, body and hair art
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
