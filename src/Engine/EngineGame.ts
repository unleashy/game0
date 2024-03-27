import { type Graphics } from "./Graphics.ts";

export interface EngineGame {
  update(msPerUpdate: number): void;
  draw(graphics: Graphics, lag: number): void;
}
