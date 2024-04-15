import { type Vec } from "../Engine";
import { type Player } from "./Player.ts";

export interface PlayerProperties {
  pos: Vec;
  vel: Vec;
  acc: Vec;
}

export function createPlayerPropertiesStream(
  player: Player,
): ReadableStream<PlayerProperties> {
  return new ReadableStream({
    pull(controller) {
      controller.enqueue(player.properties);
    },
  });
}
