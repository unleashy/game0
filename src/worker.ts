import { type Packet } from "./Packet.ts";
import { EngineLoop, CanvasGraphics } from "./Engine";
import { Game, MS_PER_UPDATE, CANVAS_DIM } from "./Game";

// eslint-disable-next-line unicorn/prefer-add-event-listener
self.onmessage = (message) => {
  const packet = message.data as Packet;

  switch (packet.op) {
    case "start": {
      new EngineLoop(
        new Game(new CanvasGraphics(packet.canvas, CANVAS_DIM)),
        MS_PER_UPDATE,
      ).start();
    }
  }
};
