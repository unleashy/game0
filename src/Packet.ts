import { type Dim } from "./Engine";
import { type PlayerProperties, type PlayerSettings } from "./Game";

export type MainPacket =
  | {
      op: "start";
      canvas: OffscreenCanvas;
      dimensions: Dim;
      settings: PlayerSettings;
    }
  | { op: "commitSettings"; settings: PlayerSettings }
  | { op: "keyDown"; code: string }
  | { op: "keyUp"; code: string };

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type WorkerPacket = {
  op: "ready";
  propertiesStream: ReadableStream<PlayerProperties>;
};

export type WorkerPacketOf<Op extends WorkerPacket["op"]> = Extract<
  WorkerPacket,
  { op: Op }
>;
