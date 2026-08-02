// Shared visual language for every piece of art in the game.
// Keeping these in one place is what makes the whole wardrobe look
// like it was drawn by the same hand.

export const OUTLINE = '#5A4453';
export const STROKE = 5;

/** Lighten (amt > 0) or darken (amt < 0) a hex colour by a percentage. */
export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = clamp(((n >> 16) & 255) + 255 * (amt / 100));
  const g = clamp(((n >> 8) & 255) + 255 * (amt / 100));
  const b = clamp((n & 255) + 255 * (amt / 100));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/** Colours kids can repaint the selected item with. */
export const PALETTE = [
  '#FF8FB1', '#FF5C8A', '#FF9E6D', '#FFD166', '#B8E986', '#5FD3A6',
  '#6EC6FF', '#7C8CF8', '#B98CFF', '#F27CD0', '#FFFFFF', '#6B5B73',
];
