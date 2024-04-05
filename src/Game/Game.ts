import {
  type EngineGame,
  type Graphics,
  type Input,
  type InputObserver,
  type Vec,
  Units,
} from "../Engine";

export const MS_PER_UPDATE = 1000 / 60;

const units = new Units(MS_PER_UPDATE);

export class Game implements EngineGame, InputObserver {
  private pos: Vec = { x: 0, y: 0 };
  private vel: Vec = { x: 0, y: 0 };
  private accel: Vec = { x: 0, y: 0 };
  private moveDir: string | undefined;

  public constructor(private readonly graphics: Graphics) {}

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
        this.vel.x *= 0.8;
      } else {
        this.vel.x = 0;
      }
    } else {
      this.vel.x += this.accel.x;
    }

    this.vel.x = clamp(
      -240 * units.perSecond,
      this.vel.x,
      240 * units.perSecond,
    );

    let rightWall = this.graphics.dimensions.w - 10;
    this.pos.x = clamp(0, this.pos.x, rightWall);
  }

  public draw(): void {
    this.graphics.clear();

    this.graphics.fillRect(
      { x: Math.floor(this.pos.x), y: 100, w: 10, h: 10 },
      "plum",
    );
  }
}

function clamp(min: number, n: number, max: number) {
  return Math.max(min, Math.min(n, max));
}
