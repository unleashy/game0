import { type Packet } from "./Packet.ts";
import {
  EngineLoop,
  CanvasGraphics,
  InputHandler,
  CanvasRectSprite,
} from "./Engine";
import { Player, Game, MS_PER_UPDATE } from "./Game";

interface WorkerState {
  game: Game;
  input: InputHandler;
  engineLoop: EngineLoop;
}
let state: WorkerState | undefined;

// eslint-disable-next-line unicorn/prefer-add-event-listener
self.onmessage = (message) => {
  let packet = message.data as Packet;

  switch (packet.op) {
    case "start": {
      if (state) throw new Error("Invalid state for start packet");

      let graphics = new CanvasGraphics(packet.canvas, packet.dimensions);
      let game = new Game(
        graphics,
        new Player(new CanvasRectSprite(graphics, { w: 10, h: 10 }, "plum")),
      );
      let input = new InputHandler(game);
      let engineLoop = new EngineLoop(game, MS_PER_UPDATE);

      engineLoop.start();

      state = { game, input, engineLoop };
      break;
    }

    case "keyDown": {
      if (!state) throw new Error("Invalid state for keyDown packet");

      state.input.handleKeyDown(packet.code, packet.repeat);
      break;
    }

    case "keyUp": {
      if (!state) throw new Error("Invalid state for keyUp packet");

      state.input.handleKeyUp(packet.code);
      break;
    }

    default: {
      throw new Error(`Malformed packet ${JSON.stringify(packet)}`);
    }
  }
};
