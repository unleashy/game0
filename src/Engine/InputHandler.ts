import { type Input } from "./Input.ts";
import { type InputObserver } from "./InputObserver.ts";

export class InputHandler implements Input {
  private readonly pressedKeys = new Set<string>();

  public constructor(private readonly observer: InputObserver) {}

  public isPressed(code: string): boolean {
    return this.pressedKeys.has(code);
  }

  public handleKeyDown(code: string): void {
    this.pressedKeys.add(code);
    this.observer.onKeyDown(this, code);
  }

  public handleKeyUp(code: string): void {
    this.pressedKeys.delete(code);
    this.observer.onKeyUp(this, code);
  }
}
