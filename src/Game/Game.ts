import {
  type EngineGame,
  type Graphics,
  type Input,
  type InputObserver,
} from "../Engine";
import { type Player } from "./Player.ts";

export class Game implements EngineGame, InputObserver {
  public constructor(
    private readonly graphics: Graphics,
    private readonly player: Player,
  ) {}

  public onKeyDown(input: Input, code: string) {
    this.player.onKeyDown(input, code);
  }

  public onKeyUp(input: Input, code: string) {
    this.player.onKeyUp(input, code);
  }

  public update(): void {
    this.player.update();
  }

  public draw(): void {
    this.graphics.clear();

    this.player.draw(this.graphics);
  }
}
