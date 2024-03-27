import { type Packet } from "./Packet.ts";
import "./style.css";

const worker = new Worker(new URL("worker.ts", import.meta.url), {
  type: "module",
});

const canvas: HTMLCanvasElement | null = document.querySelector("#main-canvas");
if (!canvas) throw new Error("No canvas");
const offscreen = canvas.transferControlToOffscreen();
requestIdleCallback(
  () => {
    worker.postMessage({ op: "start", canvas: offscreen } satisfies Packet, [
      offscreen,
    ]);
  },
  { timeout: 3000 },
);
