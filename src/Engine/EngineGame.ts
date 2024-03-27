import { type Graphics } from "./Graphics.ts";

export interface EngineGame {
  update(): void;
  draw(graphics: Graphics, lag: number): void;
}
