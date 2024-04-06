import { type Vec } from "./Vec.ts";

export interface Sprite {
  draw(at: Vec): void;
}
