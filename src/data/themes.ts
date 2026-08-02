import type { MotifKind } from '../art/motifs';

/**
 * Costumes. Every category has one piece per theme, so a whole outfit can be
 * built from a single theme — or deliberately mixed up.
 */
export interface Theme {
  id: string;
  name: string;
  emoji: string;
  /** Signature colour, used as the default for that theme's garments. */
  color: string;
  trim: string;
}

/** The princesses share one silhouette and differ by palette and emblem. */
export interface Princess extends Theme {
  gem: string;
  motif: MotifKind;
}

const CHARACTERS: Theme[] = [
  { id: 'witch', name: 'Witch', emoji: '🧙‍♀️', color: '#7C5CD6', trim: '#FFD166' },
  { id: 'fairy', name: 'Fairy', emoji: '🧚', color: '#5FD3A6', trim: '#FFB3CB' },
  { id: 'cat', name: 'Cat', emoji: '🐱', color: '#3A3040', trim: '#FF8FB1' },
  { id: 'dog', name: 'Puppy', emoji: '🐶', color: '#C98A5B', trim: '#F6E3CE' },
  { id: 'gothic', name: 'Gothic', emoji: '🖤', color: '#2B2130', trim: '#A2437B' },
  { id: 'mermaid', name: 'Mermaid', emoji: '🧜‍♀️', color: '#45C4C0', trim: '#FF9FC4' },
  { id: 'unicorn', name: 'Unicorn', emoji: '🦄', color: '#C79BFF', trim: '#7FD6FF' },
  { id: 'ballerina', name: 'Ballerina', emoji: '🩰', color: '#FFC2D4', trim: '#FFFFFF' },
  { id: 'hero', name: 'Superhero', emoji: '🦸‍♀️', color: '#FF4F5A', trim: '#4F8CFF' },
  { id: 'bunny', name: 'Bunny', emoji: '🐰', color: '#FFFFFF', trim: '#FFB3CB' },
];

export const PRINCESSES: Princess[] = [
  { id: 'pinkP', name: 'Pink Princess', emoji: '👑', color: '#FF9FC4', trim: '#FFD166', gem: '#FF5C8A', motif: 'heart' },
  { id: 'iceP', name: 'Ice Princess', emoji: '❄️', color: '#A8E6FF', trim: '#EAF7FF', gem: '#7FD6FF', motif: 'snow' },
  { id: 'fireP', name: 'Fire Princess', emoji: '🔥', color: '#FF7A3C', trim: '#FFD166', gem: '#FF3B30', motif: 'flame' },
  { id: 'rainbowP', name: 'Rainbow Princess', emoji: '🌈', color: '#FF6F91', trim: '#FFF0A8', gem: '#6EC6FF', motif: 'rainbow' },
  { id: 'midnightP', name: 'Midnight Princess', emoji: '🌙', color: '#241C2E', trim: '#C9A9FF', gem: '#B98CFF', motif: 'moon' },
  { id: 'oceanP', name: 'Ocean Princess', emoji: '🌊', color: '#2E9BD6', trim: '#9FE8E0', gem: '#45C4C0', motif: 'wave' },
];

export const THEMES: Theme[] = [...CHARACTERS, ...PRINCESSES];

export const RAINBOW_BANDS = ['#FF6F91', '#FF9E6D', '#FFD166', '#B8E986', '#6EC6FF', '#B98CFF'];

export function themeOf(id?: string): Theme | undefined {
  return THEMES.find((t) => t.id === id);
}
