import { type Packet } from "./packet.ts";
import { Game } from "./Game/Game.ts";
import { CanvasGraphics } from "./Game/Graphics.ts";

// eslint-disable-next-line unicorn/prefer-add-event-listener
self.onmessage = (message) => {
  const packet = message.data as Packet;

  switch (packet.op) {
    case "start": {
      const game = new Game({
        msPerUpdate: 16,
        maxUpdatesPerCycle: 65,
        graphics: new CanvasGraphics(packet.canvas),
      });

      game.start();
    }
  }
};
