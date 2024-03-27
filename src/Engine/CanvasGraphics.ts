import { type Rect } from "./Rect.ts";
import { type Graphics } from "./Graphics.ts";
import { type Dim } from "./Dim.ts";

export class CanvasGraphics implements Graphics {
  private readonly ctx: OffscreenCanvasRenderingContext2D;

  public constructor(canvas: OffscreenCanvas, canvasDim: Dim) {
    canvas.width = canvasDim.w;
    canvas.height = canvasDim.h;

    let ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) throw new Error("Cannot create canvas context");

    this.ctx = ctx;
  }

  public clear(): void {
    this.ctx.reset();
  }

  public fillRect(rect: Rect, colour: string) {
    this.ctx.fillStyle = colour;
    this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  }
}
