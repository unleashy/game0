import { type Packet } from "./Packet.ts";
import { EngineLoop, CanvasGraphics, InputHandler } from "./Engine";
import { Game, MS_PER_UPDATE, CANVAS_DIM } from "./Game";

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

      let game = new Game(new CanvasGraphics(packet.canvas, CANVAS_DIM));
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
