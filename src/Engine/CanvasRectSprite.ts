import { type Vec } from "./Vec.ts";
import { type Dim } from "./Dim.ts";
import { type Sprite } from "./Sprite.ts";
import { type CanvasGraphics } from "./CanvasGraphics.ts";

export class CanvasRectSprite implements Sprite {
  public constructor(
    private readonly graphics: CanvasGraphics,
    private readonly size: Dim,
    private readonly colour: string,
  ) {}

  public draw(at: Vec): void {
    this.graphics.fillRect({ ...at, ...this.size }, this.colour);
  }
}
