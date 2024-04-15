import { useEffect, useState } from "react";
import { type WorkerPacket, type WorkerPacketOf } from "../Packet.ts";
import { type PlayerProperties, units } from "../Game";

export interface PropertiesPanelProps {
  onPacket: <Op extends WorkerPacket["op"]>(
    op: Op,
    f: (packet: WorkerPacketOf<Op>) => void,
  ) => () => void;
}

export function PropertiesPanel({ onPacket }: PropertiesPanelProps) {
  const [properties, setProperties] = useState<PlayerProperties>({
    pos: { x: 0, y: 0 },
    vel: { x: 0, y: 0 },
    acc: { x: 0, y: 0 },
  });

  useEffect(() => {
    let rafId: number;
    let removeListener = onPacket("ready", (packet) => {
      const reader = packet.propertiesStream.getReader();
      const update = () => {
        reader
          .read()
          .then(({ done, value }) => {
            if (done) {
              cancelAnimationFrame(rafId);
            } else {
              rafId = requestAnimationFrame(update);
              setProperties(value);
            }
          })
          .catch((error: unknown) => {
            console.error(error);
            cancelAnimationFrame(rafId);
          });
      };

      rafId = requestAnimationFrame(update);
    });

    return () => {
      clearInterval(rafId);
      removeListener();
    };
  }, [onPacket]);

  function formatNum(n: number): string {
    return n.toFixed(3);
  }

  return (
    <div>
      <h2 className="panel-header">Properties</h2>

      <dl className="dl-panel">
        <dt>Position</dt>
        <dd>{formatNum(properties.pos.x)}</dd>
        <dd>{formatNum(properties.pos.y)}</dd>

        <dt>Velocity</dt>
        <dd>{formatNum(properties.vel.x / units.perSecond)}</dd>
        <dd>{formatNum(properties.vel.y / units.perSecond)}</dd>

        <dt>Acceleration</dt>
        <dd>{formatNum(properties.acc.x / units.perSecondSquared)}</dd>
        <dd>{formatNum(properties.acc.y / units.perSecondSquared)}</dd>
      </dl>
    </div>
  );
}
