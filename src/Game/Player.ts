import {
  type Vec,
  type Graphics,
  type InputObserver,
  type Input,
} from "../Engine";
import { units } from "./units.ts";

export class Player implements InputObserver {
  private pos: Vec = { x: 0, y: 100 };
  private vel: Vec = { x: 0, y: 0 };
  private accel: Vec = { x: 0, y: 0 };
  private moveDir: string | undefined;

  public onKeyDown(_input: Input, code: string) {
    if (code === "ArrowLeft") {
      this.moveDir = "←";
    } else if (code === "ArrowRight") {
      this.moveDir = "→";
    }
  }

  public onKeyUp(input: Input, code: string) {
    if (code === "ArrowLeft") {
      this.moveDir = input.isPressed("ArrowRight") ? "→" : undefined;
    } else if (code === "ArrowRight") {
      this.moveDir = input.isPressed("ArrowLeft") ? "←" : undefined;
    }
  }

  public update(): void {
    // prettier-ignore
    switch (this.moveDir) {
      case "→": { this.accel.x = +240 * units.perSecond; break; }
      case "←": { this.accel.x = -240 * units.perSecond; break; }
      default:  { this.accel.x = 0; break; }
    }

    this.pos.x += this.vel.x;

    if (this.accel.x === 0) {
      if (this.vel.x <= -0.01 || 0.01 <= this.vel.x) {
        this.vel.x *= 0.7;
      } else {
        this.vel.x = 0;
      }
    } else {
      this.vel.x += this.accel.x;
    }

    this.vel.x = limit(this.vel.x, 240 * units.perSecond);
  }

  public draw(graphics: Graphics): void {
    graphics.fillRect(
      { x: Math.floor(this.pos.x), y: Math.floor(this.pos.y), w: 10, h: 10 },
      "plum",
    );
  }
}

function clamp(min: number, n: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

function limit(n: number, max: number) {
  return clamp(-max, n, max);
}
