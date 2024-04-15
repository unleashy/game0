import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  type MainPacket,
  type WorkerPacket,
  type WorkerPacketOf,
} from "./Packet.ts";
import { App } from "./UI";
import "./style.css";

const worker = new Worker(new URL("worker.ts", import.meta.url), {
  type: "module",
});

function sendPacket(packet: MainPacket, transfer: Transferable[] = []): void {
  worker.postMessage(packet, transfer);
}

const listeners = new Map<
  WorkerPacket["op"],
  Array<((packet: WorkerPacket) => void) | undefined>
>();
// eslint-disable-next-line unicorn/prefer-add-event-listener
worker.onmessage = (message) => {
  const packet = message.data as WorkerPacket;
  const listenersForOp = listeners.get(packet.op) ?? [];
  for (const listener of listenersForOp) {
    listener?.(packet);
  }
};

function onPacket<Op extends WorkerPacket["op"]>(
  op: Op,
  f: (packet: WorkerPacketOf<Op>) => void,
): () => void {
  const listenersForOp = listeners.get(op) ?? [];
  listenersForOp.push(f as (packet: WorkerPacket) => void);
  listeners.set(op, listenersForOp);

  const index = listenersForOp.length - 1;
  return () => {
    listenersForOp[index] = undefined;
  };
}

const root = document.querySelector("#root");
if (!root) throw new Error("No root");
createRoot(root).render(
  <StrictMode>
    <App
      sendPacket={sendPacket}
      onPacket={onPacket}
      initialSettings={{
        gravity: 980,
        friction: 0.9,
        moveAccel: 4000,
        maxVelocity: { x: 300, y: 550 },
      }}
    />
  </StrictMode>,
);
