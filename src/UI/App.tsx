import { useEffect, useMemo } from "react";
import { type Packet } from "../Packet.ts";
import { type PlayerSettings } from "../Game";
import { Canvas } from "./Canvas.tsx";
import { SettingsPanel } from "./SettingsPanel.tsx";

export interface AppProps {
  sendPacket: (packet: Packet, transfer?: Transferable[]) => void;
  initialSettings: PlayerSettings;
}

export function App({ sendPacket, initialSettings }: AppProps) {
  const on = useMemo(
    () => ({
      canvasInit: (canvas: OffscreenCanvas) =>
        sendPacket(
          {
            op: "start",
            canvas,
            dimensions: { w: canvas.width, h: canvas.height },
            settings: initialSettings,
          },
          [canvas],
        ),

      settingsCommit: (settings: PlayerSettings) =>
        sendPacket({ op: "commitSettings", settings }),

      keyDown: (event: KeyboardEvent) =>
        sendPacket({ op: "keyDown", code: event.code }),
      keyUp: (event: KeyboardEvent) =>
        sendPacket({ op: "keyUp", code: event.code }),
    }),
    [sendPacket, initialSettings],
  );

  useGlobalKeyboard(on.keyDown, on.keyUp);

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

      <Canvas width={320} height={240} onInit={on.canvasInit} />

      <SettingsPanel
        initialSettings={initialSettings}
        onCommit={on.settingsCommit}
      />
    </main>
  );
}

function useGlobalKeyboard(
  onKeyDown: (event: KeyboardEvent) => void,
  onKeyUp: (event: KeyboardEvent) => void,
): void {
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
        if (isApplicable(event)) onKeyDown(event);
      },
      { signal: controller.signal },
    );
    document.addEventListener(
      "keyup",
      (event) => {
        if (isApplicable(event)) onKeyUp(event);
      },
      { signal: controller.signal },
    );
    return () => controller.abort();
  }, [onKeyDown, onKeyUp]);
}
