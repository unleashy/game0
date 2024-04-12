import { Vec, type Sprite, type InputObserver, type Input } from "../Engine";
import { units } from "./units.ts";

const GRAVITY = 980 * units.perSecondSquared;
const FRICTION = 2 * GRAVITY;
const MOVE_ACCEL = 4000 * units.perSecondSquared;
const MAX_VELOCITY: Vec = {
  x: 300 * units.perSecond,
  y: 550 * units.perSecond,
};

export class Player implements InputObserver {
  private pos: Vec = { x: 0, y: 0 };
  private vel: Vec = { x: 0, y: 0 };
  private accel: Vec = { x: 0, y: GRAVITY };
  private moveDir: string | undefined;

  public constructor(private readonly sprite: Sprite) {}

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
    let moveForceX = 0;
    // prettier-ignore
    switch (this.moveDir) {
      case "→": { moveForceX = +MOVE_ACCEL; break; }
      case "←": { moveForceX = -MOVE_ACCEL; break; }
    }

    let frictionForceX = Math.sign(this.vel.x + moveForceX) * FRICTION;

    this.accel.x = moveForceX - frictionForceX;

    let prevVelX = this.vel.x;
    this.vel = Vec.add(this.vel, this.accel);
    this.vel = Vec.limit(this.vel, MAX_VELOCITY);
    if (moveForceX === 0 && Math.sign(prevVelX) !== Math.sign(this.vel.x)) {
      this.vel.x = 0;
    }

    this.pos = Vec.add(this.pos, this.vel);
    this.pos.y = Math.min(this.pos.y, 230);
  }

  public draw(): void {
    this.sprite.draw(Vec.floor(this.pos));
  }
}
