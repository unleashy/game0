export type Packet =
  | { op: "worker ready" }
  | { op: "start"; canvas: OffscreenCanvas };
