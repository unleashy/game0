import { useCallback, useEffect } from "react";
import { type Packet } from "../Packet.ts";

export interface AppProps {
  sendPacket: (packet: Packet, transfer?: Transferable[]) => void;
}

export function App({ sendPacket }: AppProps) {
  const acceptCanvas = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return;

      try {
        const offscreen = canvas.transferControlToOffscreen();
        sendPacket(
          {
            op: "start",
            canvas: offscreen,
            dimensions: { w: canvas.width, h: canvas.height },
          },
          [offscreen],
        );
      } catch (error: unknown) {
        // canvas.transferControlToOffscreen will fail with InvalidStateError if
        // the canvas has been transferred already, so detect this here and
        // ignore it (as the worker will still work fine)
        if (
          !(error instanceof DOMException && error.name === "InvalidStateError")
        ) {
          throw error;
        }
      }
    },
    [sendPacket],
  );

  useEffect(() => {
    function isApplicable(event: KeyboardEvent): boolean {
      return !(
        event.repeat ||
        event.isComposing ||
        (event.target as Node).nodeName === "INPUT"
      );
    }

    const controller = new AbortController();
    document.addEventListener(
      "keydown",
      (event) => {
        if (isApplicable(event))
          sendPacket({ op: "keyDown", code: event.code });
      },
      { signal: controller.signal },
    );
    document.addEventListener(
      "keyup",
      (event) => {
        if (isApplicable(event)) sendPacket({ op: "keyUp", code: event.code });
      },
      { signal: controller.signal },
    );
    return () => controller.abort();
  }, [sendPacket]);

  return (
    <main>
      <div>
        <h2 className="panel-header">Properties</h2>

        <dl className="dl-panel">
          <dt>Position</dt>
          <dd>0.000</dd>
          <dd>0.000</dd>

          <dt>Velocity</dt>
          <dd>0.000</dd>
          <dd>0.000</dd>

          <dt>Acceleration</dt>
          <dd>0.000</dd>
          <dd>0.000</dd>
        </dl>
      </div>
      <canvas width="320" height="240" ref={acceptCanvas}></canvas>
      <div className="grid-panel">
        <h2 className="panel-header">Settings</h2>

        <label htmlFor="gravity">Gravity</label>
        <input
          id="gravity"
          type="number"
          defaultValue={980}
          className="numeric-input"
        />

        <label htmlFor="friction">Coefficient of friction</label>
        <input
          id="friction"
          type="number"
          step="0.01"
          defaultValue={0.9}
          className="numeric-input"
        />

        <label htmlFor="movement-accel">Movement acceleration</label>
        <input
          id="movement-accel"
          type="number"
          defaultValue={2000}
          className="numeric-input"
        />

        <label htmlFor="max-vel-x">Maximum velocity (x)</label>
        <input
          id="max-vel-x"
          type="number"
          min="0"
          defaultValue={300}
          className="numeric-input"
        />

        <label htmlFor="max-vel-y">Maximum velocity (y)</label>
        <input
          id="max-vel-y"
          type="number"
          min="0"
          defaultValue={550}
          className="numeric-input"
        />
      </div>
    </main>
  );
}
