import { type Packet } from "./Packet.ts";
import {
  EngineLoop,
  CanvasGraphics,
  InputHandler,
  CanvasRectSprite,
} from "./Engine";
import { Player, Game, MS_PER_UPDATE, applyUnits, units } from "./Game";

interface WorkerState {
  player: Player;
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
      if (state) {
        state.engineLoop.stop();
        state = undefined;
      }

      let graphics = new CanvasGraphics(packet.canvas, packet.dimensions);
      let player = new Player(
        applyUnits(packet.settings, units),
        new CanvasRectSprite(graphics, { w: 10, h: 10 }, "plum"),
      );
      let game = new Game(graphics, player);
      let input = new InputHandler(game);
      let engineLoop = new EngineLoop(game, MS_PER_UPDATE);

      engineLoop.start();

      state = { player, game, input, engineLoop };
      break;
    }

    case "commitSettings": {
      if (state) state.player.settings = applyUnits(packet.settings, units);
      break;
    }

    case "keyDown": {
      state?.input.handleKeyDown(packet.code);
      break;
    }

    case "keyUp": {
      state?.input.handleKeyUp(packet.code);
      break;
    }

    default: {
      throw new Error(`Malformed packet ${JSON.stringify(packet)}`);
    }
  }
};
