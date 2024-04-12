import { type Dim } from "./Engine";
import { type PlayerSettings } from "./Game";

export type Packet =
  | {
      op: "start";
      canvas: OffscreenCanvas;
      dimensions: Dim;
      settings: PlayerSettings;
    }
  | { op: "commitSettings"; settings: PlayerSettings }
  | { op: "keyDown"; code: string }
  | { op: "keyUp"; code: string };
