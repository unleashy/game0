import { type Vec } from "./Vec.ts";
import { type Dim } from "./Dim.ts";
import { type Rect } from "./Rect.ts";

export interface Graphics {
  readonly dimensions: Dim;

  clear(): void;
  fillRect(rect: Rect, colour: string): void;
  draw(image: ImageBitmap, at: Vec, slice?: Rect): void;
}
