import { type Dim } from "./Engine";

export type Packet =
  | { op: "start"; canvas: OffscreenCanvas; dimensions: Dim }
  | { op: "keyDown"; code: string }
  | { op: "keyUp"; code: string };
