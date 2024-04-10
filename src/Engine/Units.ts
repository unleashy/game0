export class Units {
  public readonly perSecond: number;
  public readonly perSecondSquared: number;

  public constructor(msPerUpdate: number) {
    this.perSecond = msPerUpdate / 1000;
    this.perSecondSquared = this.perSecond * this.perSecond;
  }
}
