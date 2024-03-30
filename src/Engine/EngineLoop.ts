import { type EngineGame } from "./EngineGame.ts";

export class EngineLoop {
  private loopRaf: number | undefined;

  constructor(
    private readonly game: EngineGame,
    private readonly msPerUpdate: number,
  ) {}

  public start() {
    this.stop();

    let lastRenderTime = 0;
    const loop = (currentTime: number) => {
      this.loopRaf = requestAnimationFrame(loop);

      let elapsedTime = currentTime - lastRenderTime;
      if (elapsedTime > this.msPerUpdate) {
        lastRenderTime = currentTime - (elapsedTime % this.msPerUpdate);

        this.game.update();
        this.game.draw();
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
