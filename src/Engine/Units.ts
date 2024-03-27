export class Units {
  readonly perSecond: number;

  constructor(msPerUpdate: number) {
    this.perSecond = msPerUpdate / 1000;
  }
}
