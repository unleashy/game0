export interface GameOptions {
  msPerUpdate: number;
  maxUpdatesPerCycle: number;
}

export class Game {
  private readonly msPerUpdate: number;
  private readonly maxUpdatesPerCycle: number;

  private loopRaf: number | undefined;

  constructor({ msPerUpdate, maxUpdatesPerCycle }: GameOptions) {
    this.msPerUpdate = msPerUpdate;
    this.maxUpdatesPerCycle = maxUpdatesPerCycle;
  }

  public start() {
    this.stop();

    let previousTime: DOMHighResTimeStamp | undefined;
    let lag = this.msPerUpdate;

    const loop = (currentTime: DOMHighResTimeStamp) => {
      this.loopRaf = requestAnimationFrame(loop);

      let elapsedTime = currentTime - (previousTime ?? currentTime);
      previousTime = currentTime;
      lag += elapsedTime;

      let iters = this.maxUpdatesPerCycle;
      while (lag >= this.msPerUpdate && --iters > 0) {
        this.update();
        lag -= this.msPerUpdate;
      }

      this.draw(lag / this.msPerUpdate);
    };

    this.loopRaf = requestAnimationFrame(loop);
  }

  public stop() {
    if (this.loopRaf !== undefined) {
      cancelAnimationFrame(this.loopRaf);
      this.loopRaf = undefined;
    }
  }

  private update() {
    /* todo */
  }

  private draw(interp: number) {
    /* todo */
  }
}
