import { type Dim, type EngineGame, type Graphics } from "../Engine";

export const MS_PER_UPDATE = 16;
export const CANVAS_DIM: Dim = { w: 320, h: 240 };

export class Game implements EngineGame {
  private x = 0;
  private dx = 0;

  update(): void {
    if (this.x < 310) {
      this.dx = (MS_PER_UPDATE / 1000) * 240;
      this.x += this.dx;
    } else {
      this.x = 310;
      this.dx = 0;
    }
  }

  draw(graphics: Graphics, lag: number): void {
    graphics.fillRect(
      { x: Math.floor(this.x + this.dx * lag), y: 100, w: 10, h: 10 },
      "plum",
    );
  }
}
