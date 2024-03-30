import {
  type Dim,
  type EngineGame,
  type Graphics,
  type Vec,
  Units,
} from "../Engine";

export const MS_PER_UPDATE = 1000 / 60;
export const CANVAS_DIM: Dim = { w: 320, h: 240 };

const units = new Units(MS_PER_UPDATE);

export class Game implements EngineGame {
  private pos: Vec = { x: 0, y: 0 };
  private vel: Vec = { x: 0, y: 0 };
  private accel: Vec = { x: 10 * units.perSecond, y: 0 };

  constructor(private readonly graphics: Graphics) {}

  update(): void {
    if (this.pos.x < 310) {
      this.pos.x += this.vel.x;
      this.vel.x += this.accel.x;

      this.vel.x = Math.min(this.vel.x, 240 * units.perSecond);
    } else {
      this.pos.x = 310;
      this.vel.x = 0;
      this.accel.x = 0;
    }
  }

  draw(): void {
    this.graphics.clear();

    this.graphics.fillRect(
      { x: Math.floor(this.pos.x), y: 100, w: 10, h: 10 },
      "plum",
    );
  }
}
