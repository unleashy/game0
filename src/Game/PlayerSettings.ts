import { type Units, type Vec } from "../Engine";

export interface PlayerSettings {
  readonly gravity: number;
  readonly friction: number;
  readonly moveAccel: number;
  readonly maxVelocity: Readonly<Vec>;
}

export function applyUnits(
  { gravity, friction, moveAccel, maxVelocity }: PlayerSettings,
  units: Units,
): PlayerSettings {
  return {
    gravity: gravity * units.perSecondSquared,
    friction: friction * gravity * units.perSecondSquared,
    moveAccel: moveAccel * units.perSecondSquared,
    maxVelocity: {
      x: maxVelocity.x * units.perSecond,
      y: maxVelocity.y * units.perSecond,
    },
  };
}
