import { useEffect, useRef } from "react";

export interface CanvasProps {
  width: number;
  height: number;
  onInit: (canvas: OffscreenCanvas) => void;
}

export function Canvas({ width, height, onInit }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const offscreen = canvas.transferControlToOffscreen();
      onInit(offscreen);
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
  }, [onInit]);

  return <canvas width={width} height={height} ref={canvasRef}></canvas>;
}
