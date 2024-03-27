import { type EngineGame } from "./EngineGame.ts";
import { type Graphics } from "./Graphics.ts";

export interface EngineLoopOptions {
  msPerUpdate: number;
  graphics: Graphics;
}

export class EngineLoop {
  private readonly game: EngineGame;
  private readonly msPerUpdate: number;
  private readonly graphics: Graphics;

  private loopRaf: number | undefined;

  constructor(game: EngineGame, { msPerUpdate, graphics }: EngineLoopOptions) {
    this.game = game;
    this.msPerUpdate = msPerUpdate;
    this.graphics = graphics;
  }

  public start() {
    this.stop();

    let lastRenderTime = 0;
    const loop = (currentTime: number) => {
      this.loopRaf = requestAnimationFrame(loop);

      let elapsedTime = currentTime - lastRenderTime;
      if (elapsedTime > this.msPerUpdate) {
        lastRenderTime = currentTime - (elapsedTime % this.msPerUpdate);

        this.game.update();
        this.graphics.clear();
        this.game.draw(this.graphics);
      }
    };

    this.loopRaf = requestAnimationFrame(loop);
  }

  public stop() {
    if (this.loopRaf !== undefined) {
      cancelAnimationFrame(this.loopRaf);
      this.loopRaf = undefined;
    }
  }
}
