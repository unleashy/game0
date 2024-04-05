import { type Packet } from "./Packet.ts";
import "./style.css";

const worker = new Worker(new URL("worker.ts", import.meta.url), {
  type: "module",
});

function sendPacket(packet: Packet, transfer: Transferable[] = []): void {
  worker.postMessage(packet, transfer);
}

const canvas: HTMLCanvasElement | null = document.querySelector("#main-canvas");
if (!canvas) throw new Error("No canvas");
const offscreen = canvas.transferControlToOffscreen();
requestIdleCallback(
  () => {
    sendPacket(
      {
        op: "start",
        canvas: offscreen,
        dimensions: { w: canvas.width, h: canvas.height },
      },
      [offscreen],
    );

    document.addEventListener("keydown", (event) => {
      sendPacket({ op: "keyDown", code: event.code, repeat: event.repeat });
    });

    document.addEventListener("keyup", (event) => {
      sendPacket({ op: "keyUp", code: event.code });
    });
  },
  { timeout: 3000 },
);
