import { type Input } from "./Input.ts";

export interface InputObserver {
  onKeyDown(input: Input, code: string): void;
  onKeyUp(input: Input, code: string): void;
}
