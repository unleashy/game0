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

    // stop after 500 ms of updating
    const maxUpdatesPerCycle = Math.floor(500 / this.msPerUpdate);

    let previousTime: DOMHighResTimeStamp | undefined;
    let lag = 0;
    const loop = (currentTime: DOMHighResTimeStamp) => {
      this.loopRaf = requestAnimationFrame(loop);

      let elapsedTime = currentTime - (previousTime ?? currentTime);
      previousTime = currentTime;
      lag += elapsedTime;

      let iters = maxUpdatesPerCycle;
      while (lag >= this.msPerUpdate && --iters > 0) {
        this.game.update(this.msPerUpdate);
        lag -= this.msPerUpdate;
      }

      this.graphics.clear();
      this.game.draw(this.graphics, lag / this.msPerUpdate);
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
