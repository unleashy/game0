export type Packet =
  | { op: "start"; canvas: OffscreenCanvas }
  | { op: "keyDown"; code: string; repeat: boolean }
  | { op: "keyUp"; code: string };
