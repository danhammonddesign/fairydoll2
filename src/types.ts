import type { ReactNode } from 'react';

export type CategoryId =
  | 'doll'
  | 'hat'
  | 'shirt'
  | 'pants'
  | 'dress'
  | 'accessory'
  | 'makeup'
  | 'shoes';

/** Everything a drawing function is allowed to know about the doll. */
export interface DrawCtx {
  /** The colour the player picked for this category. */
  color: string;
  skin: string;
  hair: string;
}

export interface Item {
  id: string;
  name: string;
  /** Default colour, used until the player repaints it. */
  color: string;
  /** Drawn in front of the body. */
  draw?: (ctx: DrawCtx) => ReactNode;
  /** Drawn behind the body (wings, tails, backpacks). */
  back?: (ctx: DrawCtx) => ReactNode;
}

export interface Doll {
  id: string;
  name: string;
  skin: string;
  hair: string;
  hairStyle: string;
  eye: string;
  eyeStyle: 'round' | 'sparkle' | 'happy' | 'cat';
}

export interface Outfit {
  doll: string;
  hat: string;
  shirt: string;
  pants: string;
  dress: string;
  accessory: string;
  makeup: string;
  shoes: string;
  colors: Record<CategoryId, string>;
}
