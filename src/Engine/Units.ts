export class Units {
  public readonly perSecond: number;

  public constructor(msPerUpdate: number) {
    this.perSecond = msPerUpdate / 1000;
  }
}
