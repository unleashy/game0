import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { type Packet } from "./Packet.ts";
import { App } from "./UI";
import "./style.css";

const worker = new Worker(new URL("worker.ts", import.meta.url), {
  type: "module",
});

function sendPacket(packet: Packet, transfer: Transferable[] = []): void {
  worker.postMessage(packet, transfer);
}

const root = document.querySelector("#root");
if (!root) throw new Error("No root");
createRoot(root).render(
  <StrictMode>
    <App sendPacket={sendPacket} />
  </StrictMode>,
);
