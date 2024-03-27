import { type Rect } from "./Rect.ts";

export interface Graphics {
  clear(): void;

  fillRect(rect: Rect, colour: string): void;
}
