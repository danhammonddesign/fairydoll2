import type { CategoryId, Item, Outfit } from '../types';
import { DOLLS } from './dolls';
import { HATS } from './hats';
import { SHIRTS } from './shirts';
import { PANTS } from './pants';
import { DRESSES } from './dresses';
import { ACCESSORIES } from './accessories';
import { MAKEUP } from './makeup';
import { SHOES } from './shoes';

export { DOLLS, HATS, SHIRTS, PANTS, DRESSES, ACCESSORIES, MAKEUP, SHOES };

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
  items: Item[];
  /** Region of the doll shown in this category's preview buttons. */
  thumb: string;
}

/** Dolls are picked as whole characters, so they get a stand-in item list. */
const DOLL_ITEMS: Item[] = DOLLS.map((d) => ({ id: d.id, name: d.name, color: d.hair }));

export const CATEGORIES: Category[] = [
  { id: 'doll', label: 'Doll', emoji: '👧', items: DOLL_ITEMS, thumb: '78 0 144 160' },
  { id: 'hat', label: 'Hats', emoji: '👑', items: HATS, thumb: '64 0 172 150' },
  { id: 'dress', label: 'Dresses', emoji: '👗', items: DRESSES, thumb: '48 150 204 220' },
  { id: 'shirt', label: 'Shirts', emoji: '👚', items: SHIRTS, thumb: '72 150 156 160' },
  { id: 'pants', label: 'Pants', emoji: '👖', items: PANTS, thumb: '64 232 172 160' },
  { id: 'shoes', label: 'Shoes', emoji: '👟', items: SHOES, thumb: '84 330 132 116' },
  { id: 'accessory', label: 'Extras', emoji: '🧚', items: ACCESSORIES, thumb: '10 60 280 270' },
  { id: 'makeup', label: 'Makeup', emoji: '💄', items: MAKEUP, thumb: '94 56 112 112' },
];

export const ITEMS: Record<CategoryId, Item[]> = {
  doll: DOLL_ITEMS,
  hat: HATS,
  shirt: SHIRTS,
  pants: PANTS,
  dress: DRESSES,
  accessory: ACCESSORIES,
  makeup: MAKEUP,
  shoes: SHOES,
};

export function findItem(cat: CategoryId, id: string): Item | undefined {
  return ITEMS[cat].find((i) => i.id === id);
}

export const DEFAULT_OUTFIT: Outfit = {
  doll: 'lily',
  hat: 'bow',
  shirt: 'none',
  pants: 'none',
  dress: 'princess',
  accessory: 'fairywings',
  makeup: 'blush',
  shoes: 'flats',
  colors: {
    doll: '#FF9FC4',
    hat: '#FF7FA8',
    shirt: '#6EC6FF',
    pants: '#FF7FA8',
    dress: '#FF9FC4',
    accessory: '#B8E4FF',
    makeup: '#FF7FA8',
    shoes: '#FF9FC4',
  },
};

/** Picks a random dress-up, biased away from the "none" options. */
export function randomOutfit(current: Outfit): Outfit {
  const pick = (cat: CategoryId) => {
    const list = ITEMS[cat].filter((i) => i.id !== 'none');
    return list[Math.floor(Math.random() * list.length)];
  };

  const wearDress = Math.random() < 0.5;
  const next: Outfit = { ...current, colors: { ...current.colors } };

  (['doll', 'hat', 'accessory', 'makeup', 'shoes'] as CategoryId[]).forEach((cat) => {
    const item = pick(cat);
    next[cat as keyof Omit<Outfit, 'colors'>] = item.id;
    next.colors[cat] = item.color;
  });

  if (wearDress) {
    const d = pick('dress');
    next.dress = d.id;
    next.colors.dress = d.color;
    next.shirt = 'none';
    next.pants = 'none';
  } else {
    next.dress = 'none';
    const s = pick('shirt');
    const p = pick('pants');
    next.shirt = s.id;
    next.pants = p.id;
    next.colors.shirt = s.color;
    next.colors.pants = p.color;
  }

  return next;
}
