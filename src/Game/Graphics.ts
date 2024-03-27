export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Graphics {
  clear(): void;
}

export class CanvasGraphics implements Graphics {
  private readonly ctx: OffscreenCanvasRenderingContext2D;

  public constructor(canvas: OffscreenCanvas) {
    let ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) throw new Error("Cannot create canvas context");

    this.ctx = ctx;
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
